import { Query, createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID } from "@/lib/database-id";
import { PARTNER_LINKS, type PartnerLinksMap } from "@/lib/partner-links";

const PARTNER_LINKS_COLLECTION_ID = "partner_links";

interface PartnerLinkDocument {
    slug: keyof PartnerLinksMap;
    url: string;
    active: boolean;
}

export async function getPartnerLinks(): Promise<PartnerLinksMap> {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.listDocuments(
            DATABASE_ID,
            PARTNER_LINKS_COLLECTION_ID,
            [Query.equal("active", true), Query.limit(200)]
        );

        const dynamicLinks = Object.assign({}, PARTNER_LINKS) as PartnerLinksMap;
        for (const rawDoc of result.documents) {
            const doc = rawDoc as unknown as PartnerLinkDocument;
            if (doc.slug && doc.url && doc.slug in dynamicLinks) {
                dynamicLinks[doc.slug] = doc.url;
            }
        }

        return dynamicLinks;
    } catch {
        return PARTNER_LINKS as PartnerLinksMap;
    }
}
