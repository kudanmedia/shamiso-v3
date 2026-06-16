import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";
import { getSmartLinks } from "@/lib/server/featurefm";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("x-appwrite-jwt");
        const { account } = await createSessionClient(authHeader || undefined);
        const user = await account.get();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const smartLinks = await getSmartLinks(user.$id);
        return NextResponse.json({ smartLinks });
    } catch (error) {
        console.error("Feature.fm smart links error:", error);
        return NextResponse.json({ error: "Failed to fetch smart links" }, { status: 500 });
    }
}
