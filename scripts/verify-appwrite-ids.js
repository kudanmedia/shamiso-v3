const { Client, Databases, Functions, Storage } = require("node-appwrite");
const {
    endpoint,
    projectId,
    apiKey,
    databaseId,
    royaltyCsvBucketId,
    ingestCsvFunctionId,
    executeAdminFunctionId,
} = require("./appwrite-env");

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
const databases = new Databases(client);
const functions = new Functions(client);
const storage = new Storage(client);

async function verify() {
    console.log("Verifying Appwrite IDs against live project...\n");
    console.log(`Project ID:  ${projectId}`);
    console.log(`Database ID: ${databaseId}`);
    console.log(`Bucket ID:   ${royaltyCsvBucketId}`);
    console.log(`Ingest fn:   ${ingestCsvFunctionId}`);
    console.log(`Admin fn:    ${executeAdminFunctionId}\n`);

    let failed = false;

    try {
        const db = await databases.get(databaseId);
        console.log(`✓ Database "${db.name}" (${db.$id})`);
    } catch (error) {
        console.error(`✗ Database ${databaseId} not found: ${error.message}`);
        failed = true;
    }

    try {
        await storage.getBucket(royaltyCsvBucketId);
        console.log(`✓ Storage bucket "${royaltyCsvBucketId}"`);
    } catch (error) {
        console.error(`✗ Bucket ${royaltyCsvBucketId} not found: ${error.message}`);
        failed = true;
    }

    const functionList = await functions.list();
    const byId = new Map(functionList.functions.map((fn) => [fn.$id, fn.name]));
    const byName = new Map(functionList.functions.map((fn) => [fn.name, fn.$id]));

    for (const [label, configuredId] of [
        ["Ingest CSV function", ingestCsvFunctionId],
        ["Execute admin function", executeAdminFunctionId],
    ]) {
        if (byId.has(configuredId)) {
            console.log(`✓ ${label}: ${configuredId} (${byId.get(configuredId)})`);
            continue;
        }

        if (byName.has(configuredId)) {
            const liveId = byName.get(configuredId);
            console.error(`✗ ${label}: env has "${configuredId}" but live function ID is "${liveId}"`);
            console.error(`  Update NEXT_PUBLIC_APPWRITE_* in .env to: ${liveId}`);
            failed = true;
            continue;
        }

        console.error(`✗ ${label}: "${configuredId}" not found in project`);
        console.error("  Available functions:");
        for (const fn of functionList.functions) {
            console.error(`    - ${fn.name} => ${fn.$id}`);
        }
        failed = true;
    }

    if (process.env.NEXT_PUBLIC_DATABASE_ID && process.env.DATABASE_ID &&
        process.env.NEXT_PUBLIC_DATABASE_ID !== process.env.DATABASE_ID) {
        console.error("✗ DATABASE_ID and NEXT_PUBLIC_DATABASE_ID do not match");
        failed = true;
    }

    if (failed) {
        process.exit(1);
    }

    console.log("\nAll Appwrite resource IDs match the live project.");
}

verify().catch((error) => {
    console.error("Verification failed:", error.message);
    process.exit(1);
});
