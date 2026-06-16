const { loadEnv } = require("./load-env");

loadEnv();

function requireEnv(key) {
    const value = process.env[key];
    if (!value) {
        console.error(`Missing required environment variable: ${key}`);
        console.error("Add it to .env and run again.");
        process.exit(1);
    }
    return value;
}

function assertMatchingIds(label, a, b) {
    if (a && b && a !== b) {
        console.error(`${label} mismatch:`);
        console.error(`  ${a}`);
        console.error(`  ${b}`);
        process.exit(1);
    }
}

assertMatchingIds(
    "DATABASE_ID and NEXT_PUBLIC_DATABASE_ID",
    process.env.DATABASE_ID,
    process.env.NEXT_PUBLIC_DATABASE_ID
);

const endpoint = requireEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT");
const projectId = requireEnv("NEXT_PUBLIC_APPWRITE_PROJECT_ID");
const apiKey = requireEnv("APPWRITE_API_KEY");
const databaseId = requireEnv("DATABASE_ID");

module.exports = {
    endpoint,
    projectId,
    apiKey,
    databaseId,
    royaltyCsvBucketId: requireEnv("NEXT_PUBLIC_APPWRITE_ROYALTY_BUCKET_ID"),
    ingestCsvFunctionId: requireEnv("NEXT_PUBLIC_APPWRITE_INGEST_CSV_FUNCTION_ID"),
    executeAdminFunctionId: requireEnv("NEXT_PUBLIC_APPWRITE_EXECUTE_ADMIN_FUNCTION_ID"),
};
