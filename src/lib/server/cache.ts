import { ID, Query, createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID } from "@/lib/database-id";

const CACHE_COLLECTION_ID = "api_cache";

interface CacheDocument {
    $id: string;
    cache_key: string;
    payload: string;
    expires_at: string;
    partner: string;
    user_id: string;
}

export async function getCached<T>(cacheKey: string) {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.listDocuments(
            DATABASE_ID,
            CACHE_COLLECTION_ID,
            [Query.equal("cache_key", cacheKey), Query.limit(1)]
        );
        const doc = result.documents[0] as unknown as CacheDocument | undefined;
        if (!doc) {
            return null;
        }

        if (new Date(doc.expires_at).getTime() <= Date.now()) {
            await databases.deleteDocument(DATABASE_ID, CACHE_COLLECTION_ID, doc.$id);
            return null;
        }

        return JSON.parse(doc.payload) as T;
    } catch {
        return null;
    }
}

export async function setCached<T>(
    cacheKey: string,
    data: T,
    ttlSeconds: number,
    partner: string,
    userId: string
) {
    try {
        const { databases } = await createAdminClient();
        const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
        const existing = await databases.listDocuments(
            DATABASE_ID,
            CACHE_COLLECTION_ID,
            [Query.equal("cache_key", cacheKey), Query.limit(1)]
        );

        if (existing.total > 0) {
            const doc = existing.documents[0] as unknown as CacheDocument;
            await databases.updateDocument(DATABASE_ID, CACHE_COLLECTION_ID, doc.$id, {
                payload: JSON.stringify(data),
                expires_at: expiresAt,
                partner,
                user_id: userId,
            });
            return;
        }

        await databases.createDocument(DATABASE_ID, CACHE_COLLECTION_ID, ID.unique(), {
            cache_key: cacheKey,
            payload: JSON.stringify(data),
            expires_at: expiresAt,
            partner,
            user_id: userId,
        });
    } catch {
        // Cache failures are non-fatal for API responses.
    }
}

export async function invalidate(cacheKey: string) {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.listDocuments(
            DATABASE_ID,
            CACHE_COLLECTION_ID,
            [Query.equal("cache_key", cacheKey), Query.limit(1)]
        );
        const doc = result.documents[0] as unknown as CacheDocument | undefined;
        if (!doc) {
            return;
        }
        await databases.deleteDocument(DATABASE_ID, CACHE_COLLECTION_ID, doc.$id);
    } catch {
        // Non-fatal.
    }
}
