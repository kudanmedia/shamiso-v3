import { Query, createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID } from "@/lib/database-id";
import { SITE_SETTINGS_DEFAULTS, type SiteSettingKey, type SiteSettingsMap } from "@/lib/site-settings";

const SITE_SETTINGS_COLLECTION_ID = "site_settings";

interface SiteSettingDocument {
    key: SiteSettingKey;
    value: string;
    category: string;
}

export async function getSiteSettings(): Promise<SiteSettingsMap> {
    const settings = { ...SITE_SETTINGS_DEFAULTS } as SiteSettingsMap;

    if (process.env.SONGTOOLS_APP_KEY) {
        settings.songtools_app_key = process.env.SONGTOOLS_APP_KEY;
    }

    try {
        const { databases } = await createAdminClient();
        const result = await databases.listDocuments(DATABASE_ID, SITE_SETTINGS_COLLECTION_ID, [Query.limit(200)]);

        for (const rawDoc of result.documents) {
            const doc = rawDoc as unknown as SiteSettingDocument;
            if (doc.key && doc.value && doc.key in settings) {
                settings[doc.key] = doc.value;
            }
        }

        if (process.env.SONGTOOLS_APP_KEY) {
            settings.songtools_app_key = process.env.SONGTOOLS_APP_KEY;
        }
    } catch {
        // Keep defaults on failure.
    }

    return settings;
}

export async function getPublicSiteSettings(): Promise<
    Pick<SiteSettingsMap, "whatsapp_invite_url" | "hero_recaptured_amount">
> {
    const all = await getSiteSettings();
    return {
        whatsapp_invite_url: all.whatsapp_invite_url,
        hero_recaptured_amount: all.hero_recaptured_amount,
    };
}
