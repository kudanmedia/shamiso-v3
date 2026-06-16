import { describe, expect, it } from "vitest";
import { getJobStatus, getMasteringJobs } from "@/lib/server/roex";

describe("RoEx server client", () => {
    it("returns mocked jobs when API key is not set", async () => {
        const jobs = await getMasteringJobs("test-user");
        expect(jobs.length).toBeGreaterThan(0);
        expect(jobs[0]).toHaveProperty("status");
    });

    it("returns job detail for known mocked id", async () => {
        const jobs = await getMasteringJobs("test-user");
        const detail = await getJobStatus("test-user", jobs[0].id);
        expect(detail?.id).toBe(jobs[0].id);
    });
});
