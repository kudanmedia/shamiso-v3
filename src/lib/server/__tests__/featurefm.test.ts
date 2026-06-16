import { describe, expect, it } from "vitest";
import { getCampaigns, getPreSaveAnalytics, getSmartLinks } from "@/lib/server/featurefm";

describe("Feature.fm server client", () => {
    it("returns mocked campaigns when credentials are not set", async () => {
        const campaigns = await getCampaigns("test-user");
        expect(campaigns.length).toBeGreaterThan(0);
        expect(campaigns[0]).toHaveProperty("id");
    });

    it("returns mocked smart links when credentials are not set", async () => {
        const smartLinks = await getSmartLinks("test-user");
        expect(smartLinks.length).toBeGreaterThan(0);
        expect(smartLinks[0]).toHaveProperty("clicks");
    });

    it("returns aggregate analytics", async () => {
        const analytics = await getPreSaveAnalytics("test-user");
        expect(analytics.totalClicks).toBeGreaterThan(0);
        expect(analytics.totalPreSaves).toBeGreaterThan(0);
        expect(analytics.topSmartLink.length).toBeGreaterThan(0);
    });
});
