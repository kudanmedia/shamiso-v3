function requireEnv(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

function getAppwriteFunctionEnv() {
    const apiKey = process.env.APPWRITE_FUNCTION_API_KEY || process.env.APPWRITE_API_KEY;
    if (!apiKey) {
        throw new Error("Missing required environment variable: APPWRITE_FUNCTION_API_KEY or APPWRITE_API_KEY");
    }

    return {
        endpoint: requireEnv("APPWRITE_FUNCTION_ENDPOINT"),
        projectId: requireEnv("APPWRITE_FUNCTION_PROJECT_ID"),
        apiKey,
        databaseId: requireEnv("DATABASE_ID"),
    };
}

module.exports = { getAppwriteFunctionEnv };
