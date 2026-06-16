import { Query, createAdminClient } from "@/lib/server/appwrite";
import { PARTNER_LINKS } from "@/lib/partner-links";

const DEFAULT_DATABASE_ID = "69b7fdaa001b7da3d224";
const PARTNER_LINKS_COLLECTION_ID = "partner_links";

type PartnerLinksMap = typeof PARTNER_LINKS;

interface PartnerLinkDocument {
    slug: keyof PartnerLinksMap;
    url: string;
    active: boolean;
}

export async function getPartnerLinks(): Promise<PartnerLinksMap> {
    try {
        const { databases } = await createAdminClient();
        const db = process.env.DATABASE_ID || DEFAULT_DATABASE_ID;
        const result = await databases.listDocuments(
            db,
            PARTNER_LINKS_COLLECTION_ID,
            [Query.equal("active", true), Query.limit(200)]
        );

        const dynamicLinks = { ...PARTNER_LINKS };
        for (const rawDoc of result.documents) {
            const doc = rawDoc as unknown as PartnerLinkDocument;
            if (doc.slug && doc.url && doc.slug in dynamicLinks) {
                dynamicLinks[doc.slug] = doc.url;
            }
        }

        return dynamicLinks;
    } catch {
        return PARTNER_LINKS;
    }
}
