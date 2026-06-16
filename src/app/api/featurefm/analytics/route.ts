import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";
import { getPreSaveAnalytics } from "@/lib/server/featurefm";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("x-appwrite-jwt");
        const { account } = await createSessionClient(authHeader || undefined);
        const user = await account.get();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const analytics = await getPreSaveAnalytics(user.$id);
        return NextResponse.json({ analytics });
    } catch (error) {
        console.error("Feature.fm analytics error:", error);
        return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
    }
}
