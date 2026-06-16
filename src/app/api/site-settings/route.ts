import { NextResponse } from "next/server";
import { getPublicSiteSettings } from "@/lib/server/site-settings";

export async function GET() {
    const settings = await getPublicSiteSettings();
    return NextResponse.json(settings, {
        headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
    });
}
