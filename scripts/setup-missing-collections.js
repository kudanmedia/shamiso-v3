/**
 * Creates collections added after initial setup (site_settings, pricing_*, etc.)
 * Use when full setup-appwrite.js fails on legacy collection attribute waits.
 */
const { Client, Databases, Permission, Role } = require("node-appwrite");
const { loadEnv } = require("./load-env");

loadEnv();

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "69b7d2fc0023faf8fc46")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);
const databaseId = process.env.DATABASE_ID || "69b7fdaa001b7da3d224";

async function waitForAttribute(collectionId, attributeKey) {
    console.log(`  waiting for ${collectionId}.${attributeKey}...`);
    for (let i = 0; i < 120; i++) {
        try {
            const attribute = await databases.getAttribute(databaseId, collectionId, attributeKey);
            if (attribute.status === "available") return;
            if (attribute.status === "failed") {
                throw new Error(`Attribute ${attributeKey} failed creation`);
            }
        } catch (error) {
            if (i === 119) throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}

async function ensureCollection(id, name, permissions) {
    try {
        await databases.createCollection(databaseId, id, name, permissions);
        console.log(`Created collection: ${id}`);
    } catch {
        console.log(`Collection exists: ${id}`);
    }
}

async function ensureString(collectionId, key, size, required) {
    try {
        await databases.createStringAttribute(databaseId, collectionId, key, size, required);
    } catch {}
}

async function ensureBool(collectionId, key, required) {
    try {
        await databases.createBooleanAttribute(databaseId, collectionId, key, required);
    } catch {}
}

async function ensureInt(collectionId, key, required) {
    try {
        await databases.createIntegerAttribute(databaseId, collectionId, key, required);
    } catch {}
}

async function ensureEnum(collectionId, key, elements, required) {
    try {
        await databases.createEnumAttribute(databaseId, collectionId, key, elements, required);
    } catch {}
}

async function ensureDatetime(collectionId, key, required) {
    try {
        await databases.createDatetimeAttribute(databaseId, collectionId, key, required);
    } catch {}
}

async function ensureIndex(collectionId, key, type, attributes) {
    try {
        await databases.createIndex(databaseId, collectionId, key, type, attributes);
    } catch {}
}

async function setupSiteSettings() {
    console.log("site_settings...");
    await ensureCollection("site_settings", "Site Settings", [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
    ]);
    await ensureString("site_settings", "key", 100, true);
    await ensureString("site_settings", "value", 2000, true);
    await ensureEnum("site_settings", "category", ["url", "integration", "metric"], true);
    await ensureDatetime("site_settings", "updated_at", true);
    await waitForAttribute("site_settings", "key");
    await ensureIndex("site_settings", "idx_site_setting_key", "unique", ["key"]);
}

async function setupPricingPlans() {
    console.log("pricing_plans...");
    await ensureCollection("pricing_plans", "Pricing Plans", [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
    ]);
    await ensureString("pricing_plans", "slug", 100, true);
    await ensureString("pricing_plans", "name", 100, true);
    await ensureEnum("pricing_plans", "audience", ["artist", "label"], true);
    await ensureString("pricing_plans", "price", 50, false);
    await ensureString("pricing_plans", "period", 50, false);
    await ensureString("pricing_plans", "description", 500, false);
    await ensureString("pricing_plans", "features", 5000, false);
    await ensureString("pricing_plans", "cta", 100, false);
    await ensureString("pricing_plans", "href", 500, false);
    await ensureBool("pricing_plans", "highlight", true);
    await ensureEnum("pricing_plans", "icon", ["Zap", "Crown", "Building2"], false);
    await ensureInt("pricing_plans", "sort_order", true);
    await ensureBool("pricing_plans", "active", true);
    await waitForAttribute("pricing_plans", "slug");
    await ensureIndex("pricing_plans", "idx_pricing_plan_slug", "unique", ["slug"]);
}

async function setupPricingComparison() {
    console.log("pricing_comparison_rows...");
    await ensureCollection("pricing_comparison_rows", "Pricing Comparison Rows", [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
    ]);
    await ensureString("pricing_comparison_rows", "slug", 100, true);
    await ensureEnum("pricing_comparison_rows", "audience", ["artist", "label"], true);
    await ensureString("pricing_comparison_rows", "pillar", 100, true);
    await ensureString("pricing_comparison_rows", "col1", 500, false);
    await ensureString("pricing_comparison_rows", "col2", 500, false);
    await ensureString("pricing_comparison_rows", "col3", 500, false);
    await ensureInt("pricing_comparison_rows", "sort_order", true);
    await ensureBool("pricing_comparison_rows", "active", true);
    await waitForAttribute("pricing_comparison_rows", "slug");
    await ensureIndex("pricing_comparison_rows", "idx_pricing_compare_slug", "unique", ["slug"]);
}

async function run() {
    console.log(`Database: ${databaseId}`);
    console.log(`Project: ${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);
    await setupSiteSettings();
    await setupPricingPlans();
    await setupPricingComparison();
    console.log("Missing collections setup complete.");
}

run().catch((error) => {
    console.error("Setup failed:", error.message);
    process.exit(1);
});
