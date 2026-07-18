// src/inngest/functions.ts
import { generateText } from "ai";
import { inngest } from "./client";
import { google } from "@ai-sdk/google";
import { firecrawl } from "@/lib/firecrawl";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: [{ event: "app/task.created" }] },
  async ({ event, step }) => {

    return await step.run("summarize-website", async () => {
      const page = await firecrawl.scrape("https://nextjs.org/docs");

      const response = await generateText({
        model: google("gemini-1.5-flash"),
        prompt: `
        You are an expert technical writer.

        Read the following website content and provide:
        1. A short summary.
        2. The main topics.
        3. Key takeaways.

        Website content:
        
        ${page.markdown}
        `,
      });

      return response.text;
    })
  });