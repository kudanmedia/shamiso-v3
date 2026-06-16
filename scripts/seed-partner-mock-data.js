const path = require("path");
const { Client, Databases, ID, Query } = require("node-appwrite");
const { loadEnv } = require("./load-env");

loadEnv();

const DEFAULT_PROJECT_ID = "69b7d2fc0023faf8fc46";
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || DEFAULT_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY || "";
const databaseId = process.env.DATABASE_ID || "69b7fdaa001b7da3d224";

const DEFAULT_PARTNER_LINKS = require("../src/data/partner-links.defaults.json");
const DEFAULT_NEWS_ARTICLES = require("../src/data/news-articles.seed.json");
const DEFAULT_PRICING_PLANS = require("../src/data/pricing-plans.seed.json");
const DEFAULT_PRICING_COMPARISON = require("../src/data/pricing-comparison.seed.json");

const DEFAULT_SITE_SETTINGS = {
    whatsapp_invite_url: {
        value: "https://chat.whatsapp.com/invitelinkplaceholder",
        category: "url",
    },
    songtools_widget_campaign: {
        value: "CampaignTestX",
        category: "integration",
    },
    songtools_app_key: {
        value: "5C61EF6E5D714CB083C4329C77580B81",
        category: "integration",
    },
    songtools_widget_base_url: {
        value: "https://widgets.songtools.io/v1",
        category: "integration",
    },
    songtools_script_url: {
        value: "https://amplifiedpro.songtools.io/js/wixgetcontent.js?v=1738787616",
        category: "integration",
    },
    songtools_jquery_url: {
        value: "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6706d724bb0e4c6b5a5c849b",
        category: "integration",
    },
    hero_recaptured_amount: {
        value: "$14.2M",
        category: "metric",
    },
};

function assertConfig() {
    const missing = [];
    if (!projectId) missing.push("NEXT_PUBLIC_APPWRITE_PROJECT_ID");
    if (!apiKey) missing.push("APPWRITE_API_KEY");

    if (missing.length === 0) return;

    console.error("Seed failed: missing required Appwrite environment variables:");
    for (const key of missing) {
        console.error(`  - ${key}`);
    }
    console.error(`\nAdd them to ${path.join(process.cwd(), ".env")} and run again.`);
    process.exit(1);
}

assertConfig();

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);

const databases = new Databases(client);

function resolvePartnerLinks() {
    return {
        ...DEFAULT_PARTNER_LINKS,
        symphonyOs:
            process.env.NEXT_PUBLIC_SYMPHONY_OS_URL ||
            DEFAULT_PARTNER_LINKS.symphonyOs,
    };
}

async function upsertByKey(collectionId, key, payload) {
    const existing = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("key", key),
        Query.limit(1),
    ]);

    if (existing.total > 0) {
        const doc = existing.documents[0];
        await databases.updateDocument(databaseId, collectionId, doc.$id, payload);
        return;
    }

    await databases.createDocument(databaseId, collectionId, ID.unique(), payload);
}
async function upsertBySlug(collectionId, slug, payload) {
    const existing = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("slug", slug),
        Query.limit(1),
    ]);

    if (existing.total > 0) {
        const doc = existing.documents[0];
        await databases.updateDocument(databaseId, collectionId, doc.$id, payload);
        return;
    }

    await databases.createDocument(databaseId, collectionId, ID.unique(), payload);
}

async function upsertByExternalId(collectionId, externalId, payload) {
    const existing = await databases.listDocuments(databaseId, collectionId, [
        Query.equal("external_id", externalId),
        Query.limit(1),
    ]);

    if (existing.total > 0) {
        const doc = existing.documents[0];
        await databases.updateDocument(databaseId, collectionId, doc.$id, payload);
        return;
    }

    await databases.createDocument(databaseId, collectionId, ID.unique(), payload);
}

async function seedFeatureFm() {
    const campaigns = [
        { external_id: "seed_camp_1", user_id: "global", name: "Winter Launch", status: "active", starts_at: new Date().toISOString() },
        { external_id: "seed_camp_2", user_id: "global", name: "Amapiano Friday", status: "scheduled", starts_at: new Date(Date.now() + 86400000).toISOString() },
    ];
    const smartLinks = [
        { external_id: "seed_link_1", user_id: "global", title: "Winter Launch Smart Link", clicks: 1240, pre_saves: 312 },
        { external_id: "seed_link_2", user_id: "global", title: "Amapiano Friday", clicks: 980, pre_saves: 201 },
    ];

    for (const item of campaigns) {
        await upsertByExternalId("featurefm_campaigns", item.external_id, item);
    }
    for (const item of smartLinks) {
        await upsertByExternalId("featurefm_smartlinks", item.external_id, item);
    }
}

async function seedRoex() {
    const jobs = [
        {
            external_id: "seed_job_101",
            user_id: "global",
            track_name: "Night Drive",
            status: "processing",
            progress: 72,
            updated_at: new Date().toISOString(),
            output_url: "",
        },
        {
            external_id: "seed_job_102",
            user_id: "global",
            track_name: "Sunset Ritual",
            status: "complete",
            progress: 100,
            updated_at: new Date(Date.now() - 3600000).toISOString(),
            output_url: "https://roexaudio.com/",
        },
    ];

    for (const item of jobs) {
        await upsertByExternalId("roex_jobs", item.external_id, item);
    }
}

async function seedPartnerLinks() {
    const now = new Date().toISOString();
    const partnerLinks = resolvePartnerLinks();
    for (const [slug, url] of Object.entries(partnerLinks)) {
        await upsertBySlug("partner_links", slug, {
            slug,
            url,
            utm_params: "",
            active: true,
            updated_at: now,
        });
        console.log(`  partner_links/${slug}`);
    }
}

async function seedSiteSettings() {
    const now = new Date().toISOString();
    for (const [key, config] of Object.entries(DEFAULT_SITE_SETTINGS)) {
        await upsertByKey("site_settings", key, {
            key,
            value: config.value,
            category: config.category,
            updated_at: now,
        });
        console.log(`  site_settings/${key}`);
    }
}

async function seedNewsArticles() {
    const categoryMap = {
        Corporate: "business",
        Industry: "world",
        Heritage: "entertainment",
        Technology: "technology",
    };

    for (const article of DEFAULT_NEWS_ARTICLES) {
        const existing = await databases.listDocuments(databaseId, "news_articles", [
            Query.equal("slug", article.slug),
            Query.limit(1),
        ]);

        const payload = {
            title: article.title,
            summary: article.summary,
            content: article.content,
            category: categoryMap[article.category] || "business",
            image_url: article.image_url,
            slug: article.slug,
            published_at: article.published_at,
            authorId: 1,
        };

        if (existing.total > 0) {
            await databases.updateDocument(databaseId, "news_articles", existing.documents[0].$id, payload);
        } else {
            await databases.createDocument(databaseId, "news_articles", ID.unique(), payload);
        }
        console.log(`  news_articles/${article.slug}`);
    }
}

async function seedPricingPlans() {
    for (const plan of DEFAULT_PRICING_PLANS) {
        await upsertBySlug("pricing_plans", plan.slug, {
            slug: plan.slug,
            name: plan.name,
            audience: plan.audience,
            price: plan.price,
            period: plan.period,
            description: plan.description,
            features: JSON.stringify(plan.features),
            cta: plan.cta,
            href: plan.href,
            highlight: plan.highlight,
            icon: plan.icon,
            sort_order: plan.sort_order,
            active: true,
        });
        console.log(`  pricing_plans/${plan.slug}`);
    }
}

async function seedPricingComparison() {
    for (const row of DEFAULT_PRICING_COMPARISON) {
        await upsertBySlug("pricing_comparison_rows", row.slug, {
            slug: row.slug,
            audience: row.audience,
            pillar: row.pillar,
            col1: row.col1,
            col2: row.col2,
            col3: row.col3,
            sort_order: row.sort_order,
            active: true,
        });
        console.log(`  pricing_comparison_rows/${row.slug}`);
    }
}

async function run() {
    console.log("Seeding partner links...");
    await seedPartnerLinks();
    console.log("Seeding site settings...");
    await seedSiteSettings();
    console.log("Seeding news articles...");
    await seedNewsArticles();
    console.log("Seeding pricing plans...");
    await seedPricingPlans();
    console.log("Seeding pricing comparison rows...");
    await seedPricingComparison();
    console.log("Seeding partner fallback data...");
    await seedFeatureFm();
    await seedRoex();
    console.log("Seed complete.");
}

run().catch((error) => {
    console.error("Seed failed:", error.message);
    process.exit(1);
});
