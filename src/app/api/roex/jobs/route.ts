import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";
import { getMasteringJobs } from "@/lib/server/roex";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("x-appwrite-jwt");
        const { account } = await createSessionClient(authHeader || undefined);
        const user = await account.get();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const jobs = await getMasteringJobs(user.$id);
        return NextResponse.json({ jobs });
    } catch (error) {
        console.error("RoEx jobs error:", error);
        return NextResponse.json({ error: "Failed to fetch RoEx jobs" }, { status: 500 });
    }
}
