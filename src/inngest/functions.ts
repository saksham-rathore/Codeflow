// src/inngest/functions.ts
import { inngest } from "./client";
import { groq } from '@ai-sdk/groq';
import { generateText } from "ai";

export const processTask = inngest.createFunction(

    { id: "process-task", triggers: { event: "app/task.created" } },

    async ({ event, step }) => {

        const result = await step.run("handle-task", async () => {


            const response = await generateText({
                model: groq("llama-3.3-70b-versatile"),
                prompt: "How do I become an AI engineer?",
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