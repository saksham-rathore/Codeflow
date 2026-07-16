// src/inngest/functions.ts
import { generateText } from "ai";
import { inngest } from "./client";
import { google } from "@ai-sdk/google";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: [{ event: "app/task.created" }] },
  async ({ event, step }) => {
    const result = await step.run("handle-task", async () => {
      return await generateText({
        model: google('gemini-flash-latest'),
        prompt: 'write a vegetarian lasagna recipe for 4 prople.'
      });
    })
  });