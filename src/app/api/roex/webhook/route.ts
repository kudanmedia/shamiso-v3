import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const webhookSecret = process.env.ROEX_WEBHOOK_SECRET;
        const signature = request.headers.get("x-roex-signature");

        if (webhookSecret && signature !== webhookSecret) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const body = await request.json();
        console.log("RoEx webhook event:", body);

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("RoEx webhook error:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
