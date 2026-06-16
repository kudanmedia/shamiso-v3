import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";
import { getJobStatus } from "@/lib/server/roex";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
    try {
        const { id } = await params;
        const authHeader = request.headers.get("x-appwrite-jwt");
        const { account } = await createSessionClient(authHeader || undefined);
        const user = await account.get();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const job = await getJobStatus(user.$id, id);
        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }
        return NextResponse.json({ job });
    } catch (error) {
        console.error("RoEx job detail error:", error);
        return NextResponse.json({ error: "Failed to fetch RoEx job" }, { status: 500 });
    }
}
