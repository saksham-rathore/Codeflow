// src/inngest/functions.ts
import { generateText } from "ai";
import { inngest } from "./client";
import { google } from "@ai-sdk/google";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: [{ event: "app/task.created" }] },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      try {
        const response = await generateText({
          model: google("gemini-1.5-flash"),
          prompt: "write a vegetarian lasagna recipe for 4 people"
        });

        return response.text;
      } catch (error) {
        console.error("gemini error", error)
        return "Failed to generate response"
      }
    })
  });