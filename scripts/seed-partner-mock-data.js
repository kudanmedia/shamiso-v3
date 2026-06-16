const path = require("path");
const { Client, Databases, ID, Query } = require("node-appwrite");
const { loadEnv } = require("./load-env");

loadEnv();

const DEFAULT_PROJECT_ID = "69b7d2fc0023faf8fc46";
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || DEFAULT_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY || "";
const databaseId = process.env.DATABASE_ID || "69b7fdaa001b7da3d224";

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

const DEFAULT_PARTNER_LINKS = {
    groover: "https://www.groover.co/en/?utm_source=Indirect&utm_medium=partner&utm_campaign=shamiso_music",
    featureFm: "http://feature.fm/shamiso",
    rotor: "https://rotorvideos.com/shamiso",
    automix: "https://automix.roexaudio.com/?via=06e63a",
    mixCheckStudio: "https://mixcheckstudio.roexaudio.com/?via=07431b",
    roex: "https://roexaudio.com/",
    funding: "https://www.beatbread.com/go/shamisomusic",
    songtools: "https://amplifiedpro.songtools.io/",
    symphonyOs:
        process.env.NEXT_PUBLIC_SYMPHONY_OS_URL ||
        "https://symphonyos.example.com/?utm_source=shamiso&utm_medium=partner&utm_campaign=symphony_os",
    mogul: "https://www.usemogul.com/shamiso-music",
    toorly: "https://toorly.com/",
    unhurd: "https://www.unhurdmusic.com/p/shamiso",
};

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
    for (const [slug, url] of Object.entries(DEFAULT_PARTNER_LINKS)) {
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

async function run() {
    console.log("Seeding partner links...");
    await seedPartnerLinks();
    console.log("Seeding partner fallback data...");
    await seedFeatureFm();
    await seedRoex();
    console.log("Seed complete.");
}

run().catch((error) => {
    console.error("Seed failed:", error.message);
    process.exit(1);
});
