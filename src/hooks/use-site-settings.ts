"use client";

import { useEffect, useState } from "react";
import { SITE_SETTINGS_DEFAULTS, type SiteSettingsMap } from "@/lib/site-settings";

type PublicSiteSettings = Pick<SiteSettingsMap, "whatsapp_invite_url">;

export function useSiteSettings() {
    const [settings, setSettings] = useState<PublicSiteSettings>({
        whatsapp_invite_url: SITE_SETTINGS_DEFAULTS.whatsapp_invite_url,
    });

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const response = await fetch("/api/site-settings");
                if (!response.ok) return;
                const data = (await response.json()) as PublicSiteSettings;
                if (!cancelled) setSettings(data);
            } catch {
                // Keep static fallback on failure.
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    return settings;
}
