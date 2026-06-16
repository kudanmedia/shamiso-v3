import { getCached, setCached } from "@/lib/server/cache";
import { Query, createAdminClient } from "@/lib/server/appwrite";

export interface RoExJob {
    id: string;
    trackName: string;
    status: "queued" | "processing" | "complete" | "failed";
    progress: number;
    updatedAt: string;
    outputUrl?: string;
}

const defaultBaseUrl = "https://api.roexaudio.com";

function useMockMode() {
    return !process.env.ROEX_API_KEY;
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

async function roexFetch<T>(path: string) {
    const apiKey = process.env.ROEX_API_KEY;
    if (!apiKey) {
        throw new Error("RoEx API key not configured");
    }

    const response = await withRetry(() =>
        fetch(`${process.env.ROEX_API_BASE_URL || defaultBaseUrl}${path}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })
    );

    if (!response.ok) {
        throw new Error(`RoEx request failed (${response.status})`);
    }

    return response.json() as Promise<T>;
}

import { DATABASE_ID } from "@/lib/database-id";

type RoExJobDocument = {
    external_id: string;
    track_name: string;
    status: "queued" | "processing" | "complete" | "failed";
    progress: number;
    updated_at: string;
    output_url?: string;
};

async function getSeededJobs(userId: string): Promise<RoExJob[]> {
    const { databases } = await createAdminClient();
    const result = await databases.listDocuments(
        DATABASE_ID,
        "roex_jobs",
        [Query.equal("user_id", [userId, "global"]), Query.limit(100)]
    );

    return result.documents.map((doc) => {
        const item = doc as unknown as RoExJobDocument;
        return {
            id: item.external_id,
            trackName: item.track_name,
            status: item.status,
            progress: item.progress,
            updatedAt: item.updated_at,
            outputUrl: item.output_url,
        };
    });
}

function normalizeJob(job: Partial<RoExJob> & { id?: string; trackName?: string }): RoExJob {
    return {
        id: job.id || "unknown",
        trackName: job.trackName || "Untitled Track",
        status: job.status || "queued",
        progress: Math.max(0, Math.min(100, Number(job.progress || 0))),
        updatedAt: job.updatedAt || new Date().toISOString(),
        outputUrl: job.outputUrl,
    };
}

export async function getMasteringJobs(userId: string): Promise<RoExJob[]> {
    const cacheKey = `roex:jobs:${userId}`;
    const cached = await getCached<RoExJob[]>(cacheKey);
    if (cached) {
        return cached;
    }

    const data = useMockMode() ? await getSeededJobs(userId) : await roexFetch<RoExJob[]>("/v1/mastering/jobs");
    const jobs = data.map((job) => normalizeJob(job));

    await setCached(cacheKey, jobs, 900, "roex", userId);
    return jobs;
}

export async function getJobStatus(userId: string, jobId: string): Promise<RoExJob | null> {
    const jobs = await getMasteringJobs(userId);
    const cachedMatch = jobs.find((job) => job.id === jobId);
    if (cachedMatch) {
        return cachedMatch;
    }

    if (useMockMode()) {
        return null;
    }

    const direct = await roexFetch<RoExJob>(`/v1/mastering/jobs/${jobId}`);
    return normalizeJob(direct);
}
