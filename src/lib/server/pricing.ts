import { Query, createAdminClient } from "@/lib/server/appwrite";
import { DATABASE_ID } from "@/lib/database-id";
import {
    buildPricingData,
    DEFAULT_PRICING_DATA,
    type PricingComparisonRow,
    type PricingData,
    type PricingPlan,
} from "@/lib/pricing";

const PRICING_PLANS_COLLECTION = "pricing_plans";
const PRICING_COMPARISON_COLLECTION = "pricing_comparison_rows";

function parseFeatures(raw: unknown): string[] {
    if (Array.isArray(raw)) return raw.map(String);
    if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed.map(String) : [];
        } catch {
            return [];
        }
    }
    return [];
}

function mapPlan(doc: Record<string, unknown>): PricingPlan {
    return {
        slug: String(doc.slug || ""),
        name: String(doc.name || ""),
        audience: doc.audience === "label" ? "label" : "artist",
        price: String(doc.price || ""),
        period: String(doc.period || ""),
        description: String(doc.description || ""),
        features: parseFeatures(doc.features),
        cta: String(doc.cta || "Get Started"),
        href: String(doc.href || "/signup"),
        highlight: Boolean(doc.highlight),
        icon: (doc.icon === "Crown" || doc.icon === "Building2" ? doc.icon : "Zap") as PricingPlan["icon"],
        sort_order: Number(doc.sort_order || 0),
    };
}

function mapComparison(doc: Record<string, unknown>): PricingComparisonRow {
    return {
        slug: String(doc.slug || ""),
        audience: doc.audience === "label" ? "label" : "artist",
        pillar: String(doc.pillar || ""),
        col1: String(doc.col1 || ""),
        col2: String(doc.col2 || ""),
        col3: String(doc.col3 || ""),
        sort_order: Number(doc.sort_order || 0),
    };
}

export async function getPricingData(): Promise<PricingData> {
    try {
        const { databases } = await createAdminClient();
        const [plansResult, comparisonResult] = await Promise.all([
            databases.listDocuments(DATABASE_ID, PRICING_PLANS_COLLECTION, [
                Query.equal("active", true),
                Query.limit(100),
            ]),
            databases.listDocuments(DATABASE_ID, PRICING_COMPARISON_COLLECTION, [
                Query.equal("active", true),
                Query.limit(100),
            ]),
        ]);

        if (plansResult.documents.length === 0) {
            return DEFAULT_PRICING_DATA;
        }

        const plans = plansResult.documents.map((doc) => mapPlan(doc as Record<string, unknown>));
        const comparison =
            comparisonResult.documents.length > 0
                ? comparisonResult.documents.map((doc) => mapComparison(doc as Record<string, unknown>))
                : DEFAULT_PRICING_DATA.artistComparison.concat(DEFAULT_PRICING_DATA.labelComparison);

        return buildPricingData(plans, comparison);
    } catch {
        return DEFAULT_PRICING_DATA;
    }
}
