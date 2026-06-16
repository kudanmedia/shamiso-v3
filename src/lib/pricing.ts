import pricingPlansSeed from "@/data/pricing-plans.seed.json";
import pricingComparisonSeed from "@/data/pricing-comparison.seed.json";

export type PricingAudience = "artist" | "label";
export type PricingIcon = "Zap" | "Crown" | "Building2";

export interface PricingPlan {
    slug: string;
    name: string;
    audience: PricingAudience;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    href: string;
    highlight: boolean;
    icon: PricingIcon;
    sort_order: number;
}

export interface PricingComparisonRow {
    slug: string;
    audience: PricingAudience;
    pillar: string;
    col1: string;
    col2: string;
    col3: string;
    sort_order: number;
}

export interface PricingData {
    artistPlans: PricingPlan[];
    labelPlans: PricingPlan[];
    artistComparison: PricingComparisonRow[];
    labelComparison: PricingComparisonRow[];
}

export const DEFAULT_PRICING_PLANS = pricingPlansSeed as PricingPlan[];
export const DEFAULT_PRICING_COMPARISON = pricingComparisonSeed as PricingComparisonRow[];

export const PRICING_FACTS = {
    entryCommission: "15%",
    proRoyaltyKeep: "100%",
    contentIdFee: "$4.99/rel",
    labelPlatformFee: "2%",
    sovereignPlatformFee: "1.5%",
    storeSpeedDays: "14",
} as const;

export function buildPricingData(
    plans: PricingPlan[] = DEFAULT_PRICING_PLANS,
    comparison: PricingComparisonRow[] = DEFAULT_PRICING_COMPARISON
): PricingData {
    const sortPlans = (items: PricingPlan[]) =>
        [...items].sort((a, b) => a.sort_order - b.sort_order);
    const sortComparison = (items: PricingComparisonRow[]) =>
        [...items].sort((a, b) => a.sort_order - b.sort_order);

    return {
        artistPlans: sortPlans(plans.filter((plan) => plan.audience === "artist")),
        labelPlans: sortPlans(plans.filter((plan) => plan.audience === "label")),
        artistComparison: sortComparison(comparison.filter((row) => row.audience === "artist")),
        labelComparison: sortComparison(comparison.filter((row) => row.audience === "label")),
    };
}

export const DEFAULT_PRICING_DATA = buildPricingData();
