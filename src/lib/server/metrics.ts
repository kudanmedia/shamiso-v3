import { Query, createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID } from "@/lib/database-id";
import { getSiteSettings } from "@/lib/server/site-settings";

function formatRecapturedAmount(totalDollars: number): string {
    if (totalDollars >= 1_000_000) {
        return `$${(totalDollars / 1_000_000).toFixed(1)}M`;
    }
    if (totalDollars >= 1_000) {
        return `$${(totalDollars / 1_000).toFixed(1)}K`;
    }
    return `$${Math.round(totalDollars).toLocaleString()}`;
}

export async function getHeroRecapturedAmount(): Promise<string> {
    const settings = await getSiteSettings();

    try {
        const { databases } = await createAdminClient();
        const result = await databases.listDocuments(DATABASE_ID, "ledger_entries", [
            Query.equal("status", "paid"),
            Query.limit(5000),
        ]);

        const totalCents = result.documents.reduce(
            (sum, doc) => sum + Number((doc as { total_cents?: number }).total_cents || 0),
            0
        );

        if (totalCents > 0) {
            return formatRecapturedAmount(totalCents / 100);
        }
    } catch {
        // Fall through to site setting.
    }

    return settings.hero_recaptured_amount;
}
