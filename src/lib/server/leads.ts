import { Query, createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID } from "@/lib/database-id";

const LEADS_COLLECTION_ID = "smd_funding_leads";

export interface FundingLead {
    $id: string;
    artist_name: string;
    email: string;
    spotify_url: string;
    monthly_revenue: string;
    $createdAt?: string;
}

export async function getFundingLeads(): Promise<FundingLead[]> {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.listDocuments(DATABASE_ID, LEADS_COLLECTION_ID, [
            Query.orderDesc("$createdAt"),
            Query.limit(200),
        ]);
        return result.documents as unknown as FundingLead[];
    } catch {
        return [];
    }
}
