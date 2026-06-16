import partnerDefaults from "@/data/partner-links.defaults.json";

type PartnerDefaults = typeof partnerDefaults;

export const PARTNER_LINKS: Record<keyof PartnerDefaults, string> = {
    ...partnerDefaults,
    symphonyOs:
        process.env.NEXT_PUBLIC_SYMPHONY_OS_URL ||
        partnerDefaults.symphonyOs,
};

export type PartnerLinkSlug = keyof typeof PARTNER_LINKS;
export type PartnerLinksMap = Record<PartnerLinkSlug, string>;
