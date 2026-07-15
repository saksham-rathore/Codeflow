import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// const google = createGoogleGenerativeAI({
//     apiKey: "AQ.Ab8RN6KVvOzrrMUVM3JeN4XHi74FVEYnKihEY9hx1zs5sJma0Q",
// });

export async function POST() {
    const response = await generateText({
        model: google('gemini-2.5-flash'),
        prompt: 'write a vegetarian lasagna recipe for 4 prople.'
    });

    return Response.json({ response });
}