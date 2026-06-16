const { Client, Databases, Query } = require("node-appwrite");
const { getAppwriteFunctionEnv } = require("../../shared/appwrite-env");

module.exports = async ({ res, log, error }) => {
    const { endpoint, projectId, apiKey, databaseId } = getAppwriteFunctionEnv();
    const cacheCollectionId = "api_cache";

    try {
        const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);

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
