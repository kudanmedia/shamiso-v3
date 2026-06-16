import { NextResponse } from "next/server";
import { getPartnerLinks } from "@/lib/server/partner-links";

export async function GET() {
    const links = await getPartnerLinks();
    return NextResponse.json(links, {
        headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
    });
}
