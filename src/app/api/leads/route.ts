import { NextResponse } from "next/server";
import { createAdminClient, createSessionClient, ID } from "@/lib/server/appwrite";

import { DATABASE_ID } from "@/lib/database-id";
const COLLECTION_ID = 'smd_funding_leads';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { artistName, email, spotifyUrl, monthlyRevenue } = body;

        if (!artistName || !email || !spotifyUrl || !monthlyRevenue) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const authHeader = request.headers.get("x-appwrite-jwt");
        let databases;

        try {
            const session = await createSessionClient(authHeader || undefined);
            databases = session.databases;
        } catch (e) {
            // Fallback to admin if no session
            const admin = await createAdminClient();
            databases = admin.databases;
        }

        // Save to Appwrite
        // Note: The collection must exist in Appwrite for this to work.
        // If it doesn't exist, this will fail.
        await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            {
                artist_name: artistName,
                email: email,
                spotify_url: spotifyUrl,
                monthly_revenue: monthlyRevenue,
            }
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Lead Capture Error:", error);
        return NextResponse.json({ error: error.message || "Failed to capture lead" }, { status: 500 });
    }
}
