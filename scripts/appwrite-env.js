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

const endpoint = requireEnv("NEXT_PUBLIC_APPWRITE_ENDPOINT");
const projectId = requireEnv("NEXT_PUBLIC_APPWRITE_PROJECT_ID");
const apiKey = requireEnv("APPWRITE_API_KEY");
const databaseId = requireEnv("DATABASE_ID");

module.exports = {
    endpoint,
    projectId,
    apiKey,
    databaseId,
};
