// src/inngest/functions.ts
import { firecrawl } from '@/lib/firecrawl';
import { inngest } from './client';
import { groq } from '@ai-sdk/groq';
import { generateText } from "ai";

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const processTask = inngest.createFunction(

    { id: "codeflow", triggers: { event: "app/task.created" } },

    async ({ event, step }) => {

        const { prompt } = event.data as { prompt: string }

        const urls = await step.run("extract-urls", async () => {
            return prompt.match(URL_REGEX) ?? [];
        }) as string[];

        const scrapedContent = await step.run("scrape-urls", async () => {
            const result = await Promise.all(
                urls.map(async (url) => {
                    const result = await firecrawl.scrape(
                        url,
                        { formats: ["markdown"] },
                    );
                    return result.markdown ?? null
                })
            );
            return result.filter(Boolean).join("\n\n");
        })

        const finalPrompt = scrapedContent
            ? `Context:\n${scrapedContent}\n\nQuestion: ${prompt}`
            : prompt;


        const result = await step.run("handle-task", async () => {

            const response = await generateText({
                model: groq("llama-3.3-70b-versatile"),
                prompt: finalPrompt,
                experimental_telemetry: {
                    isEnabled: true,
                    recordInputs: true,
                    recordOutputs: true
                }
            });

            return {
                processed: true,
                id: event.data.id,
                aiResponse: response.text,
            }

        });

        await step.sleep("pause", "1s");

        return { message: `Task ${event.data.id} complete`, result };
    }
);