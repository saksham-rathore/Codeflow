import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST() {
    const response = await generateText({
        model: google('gemini-flash-latest'),
        prompt: 'write a vegetarian lasagna recipe for 4 prople.'
    });

    return Response.json({ response });
}