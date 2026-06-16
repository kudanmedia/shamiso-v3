const { Client, Databases, Query } = require("node-appwrite");

module.exports = async ({ res, log, error }) => {
    const endpoint = process.env.APPWRITE_FUNCTION_ENDPOINT || "https://fra.cloud.appwrite.io/v1";
    const projectId = process.env.APPWRITE_FUNCTION_PROJECT_ID || process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
    const apiKey = process.env.APPWRITE_FUNCTION_API_KEY || process.env.APPWRITE_API_KEY;
    const databaseId = process.env.DATABASE_ID || "69b7fdaa001b7da3d224";
    const cacheCollectionId = "api_cache";

    try {
        const client = new Client().setEndpoint(endpoint).setProject(projectId);
        if (apiKey) {
            client.setKey(apiKey);
        }

        const databases = new Databases(client);
        const nowIso = new Date().toISOString();
        const expired = await databases.listDocuments(databaseId, cacheCollectionId, [
            Query.lessThanEqual("expires_at", nowIso),
            Query.limit(500),
        ]);

        let removed = 0;
        for (const doc of expired.documents) {
            await databases.deleteDocument(databaseId, cacheCollectionId, doc.$id);
            removed += 1;
        }

        log(`Removed ${removed} expired cache entries`);
        return res.json({ success: true, removed });
    } catch (err) {
        error(`refresh-partner-cache failed: ${err.message}`);
        return res.json({ success: false, error: err.message }, 500);
    }
};
