import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function POST() {
    const response = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        prompt: "how can I become an ai engineer",
    })

    return Response.json({ Response });
}