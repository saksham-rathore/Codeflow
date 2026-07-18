// src/inngest/functions.ts
import { generateText } from "ai";
import { inngest } from "./client";
import { groq } from "@ai-sdk/groq";
import { firecrawl } from "@/lib/firecrawl";
import * as Sentry from "@sentry/nextjs";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: [{ event: "app/task.created" }] },
  async ({ event, step }) => {

    try {
      const page = await step.run("scrape-website", async () => {
        return await firecrawl.scrape("https://nextjs.org/docs");
      });

      const responseText = await step.run("summarize-website", async () => {
        const response = await generateText({
          model: groq("llama-3.3-70b-versatile"),
          prompt: `
          You are an expert technical writer.
  
          Read the following website content and provide:
          1. A short summary.
          2. The main topics.
          3. Key takeaways.
  
          Website content:
          
          ${page.markdown}
          `,
          experimental_telemetry: {
            isEnabled: true,
            recordInputs: true,
            recordOutputs: true,
          }
        });

        return response.text;
      });

      return responseText;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  });