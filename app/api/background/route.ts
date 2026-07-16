//  POST localhost:3000/api/chat
import { inngest } from '@/app/inngest/client';

export async function POST() {
    await inngest.send({
        name: "processTask",
        data: {},
    })

    return Response.json({ status: "started" });
}