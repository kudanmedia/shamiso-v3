const { Client, Databases, ID, Query } = require("node-appwrite");

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);
const databaseId = process.env.DATABASE_ID || "69b7fdaa001b7da3d224";

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

async function run() {
    console.log("Seeding partner fallback data...");
    await seedFeatureFm();
    await seedRoex();
    console.log("Seed complete.");
}

run().catch((error) => {
    console.error("Seed failed:", error.message);
    process.exit(1);
});
