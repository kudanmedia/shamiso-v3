import { NextResponse } from "next/server";
import { getNewsArticles } from "@/lib/server/news";

export async function GET() {
    const articles = await getNewsArticles();
    return NextResponse.json(articles, {
        headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
    });
}
