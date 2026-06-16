import { Query, createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID } from "@/lib/database-id";

const NEWS_COLLECTION_ID = "news_articles";

export interface NewsArticle {
    $id: string;
    title: string;
    summary: string;
    content?: string;
    category: string;
    image_url: string;
    published_at: string;
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
    try {
        const { databases } = await createAdminClient();
        const result = await databases.listDocuments(DATABASE_ID, NEWS_COLLECTION_ID, [
            Query.orderDesc("published_at"),
            Query.limit(100),
        ]);

        return result.documents as unknown as NewsArticle[];
    } catch {
        return [];
    }
}
