"use client";

import { useEffect, useState } from "react";
import { PARTNER_LINKS, type PartnerLinksMap } from "@/lib/partner-links";

export function usePartnerLinks() {
    const [links, setLinks] = useState<PartnerLinksMap>(PARTNER_LINKS);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const response = await fetch("/api/partner-links");
                if (!response.ok) return;
                const data = (await response.json()) as PartnerLinksMap;
                if (!cancelled) setLinks(data);
            } catch {
                // Keep static fallback on failure.
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, []);

    return links;
}
