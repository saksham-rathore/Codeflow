import { boolean, promise, z } from "zod";
import { groq } from "@ai-sdk/groq";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { firecrawl } from "@/lib/firecrawl";
import { generateText, Output } from "ai";

const quickEditSchema = z.object({
    editedCode: z
        .string()
        .describe(
            "The edited version of the selected code based on the instruction"
        ),
});


const URL_REGEX = /https?:\/\/[^\s)>\]]+/g;

const QUICK_EDIT_PROMPT = `You are a code editing assistant. Edit the selected code based on the user's instruction.

<context>
<selected_code>
{selectedCode}
</selected_code>
<full_code_context>
{fullCode}
</full_code_context>
</context>

{documentation}

<instruction>
{instruction}
</instruction>

<instructions>
Return ONLY the edited version of the selected code.
Maintain the same indentation level as the original.
Do not include any explanations or comments unless requested.
If the instruction is unclear or cannot be applied, return the original code unchanged.
</instructions>`;


export async function POST(requeste: Request) {
    try {
        const { userId } = await auth();
        const { selectedCode, instruction, fullCode } = await requeste.json();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 400 }
            );
        }

        if (!selectedCode) {
            return NextResponse.json(
                { error: "Selected code is required" },
                { status: 400 }
            );
        }

        if (!instruction) {
            return NextResponse.json(
                { error: "Instruction is required" },
                { status: 400 }
            );
        }

        const urls: string[] = instruction.match(URL_REGEX) || [];
        let documentationContent = "";

        if (urls.length > 0) {
            const scrapedResuts = await Promise.all(
                urls.map(async (url) => {
                    try {
                        const result = await firecrawl.scrape(url, {
                            formats: ["markdown"]
                        });

                        if (result.markdown) {
                            return `<doc url="${url}">\n${result.markdown}\n</doc>`;
                        }

                        return null;
                    } catch (error) {
                        return null;
                    }
                })
            );

            const validResults = scrapedResuts.filter(Boolean);

            if (validResults.length > 0) {
                documentationContent = `<documentation>\n${validResults.join("\n\n")}\n</documentation>`;
            }
        }

        const prompt = QUICK_EDIT_PROMPT
            .replace("{selectedCode}", selectedCode)
            .replace("{fullCode}", fullCode || "")
            .replace("{instruction}", instruction)
            .replace("{documentation}", documentationContent);

        const { output } = await generateText({
            model: groq("llama-3.3-70b-versatile"),
            output: Output.object({ schema: quickEditSchema }),
            prompt,
        });

        return NextResponse.json({ editedCode: output.editedCode });


    } catch (error) {
        console.error("Edit error:", error);
        return NextResponse.json(
            { error: "Failed to generate edit" },
            { status: 500 }
        );
    }
}