export const SITE_SETTINGS_DEFAULTS = {
    whatsapp_invite_url: "https://chat.whatsapp.com/invitelinkplaceholder",
    songtools_widget_campaign: "CampaignTestX",
    songtools_app_key: "5C61EF6E5D714CB083C4329C77580B81",
    songtools_widget_base_url: "https://widgets.songtools.io/v1",
    songtools_script_url: "https://amplifiedpro.songtools.io/js/wixgetcontent.js?v=1738787616",
    songtools_jquery_url:
        "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6706d724bb0e4c6b5a5c849b",
    hero_recaptured_amount: "$14.2M",
} as const;

export type SiteSettingKey = keyof typeof SITE_SETTINGS_DEFAULTS;
export type SiteSettingsMap = Record<SiteSettingKey, string>;

/** Keys safe to expose via the public site-settings API. */
export const PUBLIC_SITE_SETTING_KEYS: SiteSettingKey[] = ["whatsapp_invite_url", "hero_recaptured_amount"];
