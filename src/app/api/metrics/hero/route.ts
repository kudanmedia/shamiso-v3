import { NextResponse } from "next/server";
import { getHeroRecapturedAmount } from "@/lib/server/metrics";

export async function GET() {
    const amount = await getHeroRecapturedAmount();
    return NextResponse.json({ hero_recaptured_amount: amount }, {
        headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
    });
}
