import { getCached, setCached } from "@/lib/server/cache";
import { Query, createAdminClient } from "@/lib/server/appwrite";

type FeatureFmAuthResponse = {
    access_token: string;
    expires_in?: number;
};

export interface FeatureFmCampaign {
    id: string;
    name: string;
    status: string;
    startsAt?: string;
}

export interface FeatureFmSmartLink {
    id: string;
    title: string;
    clicks: number;
    preSaves: number;
}

export interface FeatureFmAnalyticsSummary {
    totalClicks: number;
    totalPreSaves: number;
    activeCampaigns: number;
    topSmartLink: string;
}

const defaultBaseUrl = "https://api.feature.fm";

function useMockMode() {
    return !process.env.FEATUREFM_CLIENT_ID || !process.env.FEATUREFM_CLIENT_SECRET;
}

async function withRetry<T>(run: () => Promise<T>, retries = 2): Promise<T> {
    let currentError: unknown;
    for (let i = 0; i <= retries; i += 1) {
        try {
            return await run();
        } catch (error) {
            currentError = error;
            if (i < retries) {
                await new Promise((resolve) => setTimeout(resolve, (i + 1) * 300));
            }
        }
    }
    throw currentError;
}

async function getAccessToken() {
    const clientId = process.env.FEATUREFM_CLIENT_ID;
    const clientSecret = process.env.FEATUREFM_CLIENT_SECRET;
    const refreshToken = process.env.FEATUREFM_REFRESH_TOKEN;
    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error("Feature.fm credentials not configured");
    }

    const response = await withRetry(() =>
        fetch(`${process.env.FEATUREFM_API_BASE_URL || defaultBaseUrl}/oauth/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grant_type: "refresh_token",
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
            }),
        })
    );

    if (!response.ok) {
        throw new Error(`Feature.fm auth failed with ${response.status}`);
    }

    const data = (await response.json()) as FeatureFmAuthResponse;
    if (!data.access_token) {
        throw new Error("Feature.fm auth succeeded without access token");
    }
    return data.access_token;
}

async function featureFetch<T>(path: string) {
    const token = await getAccessToken();
    const response = await withRetry(() =>
        fetch(`${process.env.FEATUREFM_API_BASE_URL || defaultBaseUrl}${path}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })
    );

    if (!response.ok) {
        throw new Error(`Feature.fm request failed (${response.status})`);
    }

    return response.json() as Promise<T>;
}

const DEFAULT_DATABASE_ID = "69b7fdaa001b7da3d224";

type FeatureFmCampaignDocument = {
    external_id: string;
    name: string;
    status: string;
    starts_at?: string;
};

type FeatureFmSmartLinkDocument = {
    external_id: string;
    title: string;
    clicks: number;
    pre_saves: number;
};

async function getSeededCampaigns(userId: string): Promise<FeatureFmCampaign[]> {
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(
        process.env.DATABASE_ID || DEFAULT_DATABASE_ID,
        "featurefm_campaigns",
        [Query.equal("user_id", [userId, "global"]), Query.limit(100)]
    );

    return result.documents.map((doc) => {
        const item = doc as unknown as FeatureFmCampaignDocument;
        return {
            id: item.external_id,
            name: item.name,
            status: item.status,
            startsAt: item.starts_at,
        };
    });
}

async function getSeededSmartLinks(userId: string): Promise<FeatureFmSmartLink[]> {
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(
        process.env.DATABASE_ID || DEFAULT_DATABASE_ID,
        "featurefm_smartlinks",
        [Query.equal("user_id", [userId, "global"]), Query.limit(100)]
    );

    return result.documents.map((doc) => {
        const item = doc as unknown as FeatureFmSmartLinkDocument;
        return {
            id: item.external_id,
            title: item.title,
            clicks: item.clicks,
            preSaves: item.pre_saves,
        };
    });
}

export async function getCampaigns(userId: string) {
    const cacheKey = `featurefm:campaigns:${userId}`;
    const cached = await getCached<FeatureFmCampaign[]>(cacheKey);
    if (cached) {
        return cached;
    }

    const data = useMockMode()
        ? await getSeededCampaigns(userId)
        : await featureFetch<FeatureFmCampaign[]>("/v1/campaigns");

    await setCached(cacheKey, data, 900, "featurefm", userId);
    return data;
}

export async function getSmartLinks(userId: string) {
    const cacheKey = `featurefm:smartlinks:${userId}`;
    const cached = await getCached<FeatureFmSmartLink[]>(cacheKey);
    if (cached) {
        return cached;
    }

    const data = useMockMode()
        ? await getSeededSmartLinks(userId)
        : await featureFetch<FeatureFmSmartLink[]>("/v1/smart-links");

    await setCached(cacheKey, data, 900, "featurefm", userId);
    return data;
}

export async function getPreSaveAnalytics(userId: string): Promise<FeatureFmAnalyticsSummary> {
    const cacheKey = `featurefm:analytics:${userId}`;
    const cached = await getCached<FeatureFmAnalyticsSummary>(cacheKey);
    if (cached) {
        return cached;
    }

    const campaigns = await getCampaigns(userId);
    const smartLinks = await getSmartLinks(userId);

    const summary: FeatureFmAnalyticsSummary = {
        totalClicks: smartLinks.reduce((sum, item) => sum + item.clicks, 0),
        totalPreSaves: smartLinks.reduce((sum, item) => sum + item.preSaves, 0),
        activeCampaigns: campaigns.filter((campaign) => campaign.status === "active").length,
        topSmartLink: smartLinks.sort((a, b) => b.clicks - a.clicks)[0]?.title || "N/A",
    };

    await setCached(cacheKey, summary, 900, "featurefm", userId);
    return summary;
}
