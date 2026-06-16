"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, Loader2 } from "lucide-react";
import { DATABASE_ID } from "@/lib/database-id";
import { DEFAULT_PRICING_PLANS, DEFAULT_PRICING_COMPARISON } from "@/lib/pricing";

const PLANS_COLLECTION = "pricing_plans";
const COMPARISON_COLLECTION = "pricing_comparison_rows";

type PlanRow = {
    $id?: string;
    slug: string;
    name: string;
    audience: "artist" | "label";
    price: string;
    period: string;
    description: string;
    featuresText: string;
    cta: string;
    href: string;
    highlight: boolean;
    icon: string;
    sort_order: number;
    active: boolean;
};

type ComparisonRow = {
    $id?: string;
    slug: string;
    audience: "artist" | "label";
    pillar: string;
    col1: string;
    col2: string;
    col3: string;
    sort_order: number;
    active: boolean;
};

function featuresToText(features: string[] | string): string {
    if (Array.isArray(features)) return features.join("\n");
    try {
        return JSON.parse(features).join("\n");
    } catch {
        return String(features || "");
    }
}

export default function AdminPricingPage() {
    const [plans, setPlans] = useState<PlanRow[]>([]);
    const [comparisonRows, setComparisonRows] = useState<ComparisonRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const [plansRes, comparisonRes] = await Promise.all([
                    databases.listDocuments(DATABASE_ID, PLANS_COLLECTION, [Query.limit(100)]),
                    databases.listDocuments(DATABASE_ID, COMPARISON_COLLECTION, [Query.limit(100)]),
                ]);

                const planDocs = plansRes.documents as unknown as Array<Record<string, unknown>>;
                const fromDbPlans = new Map(planDocs.map((doc) => [String(doc.slug), doc]));
                const mergedPlans: PlanRow[] = DEFAULT_PRICING_PLANS.map((plan) => {
                    const existing = fromDbPlans.get(plan.slug);
                    return {
                        $id: existing?.$id as string | undefined,
                        slug: plan.slug,
                        name: String(existing?.name || plan.name),
                        audience: (existing?.audience as "artist" | "label") || plan.audience,
                        price: String(existing?.price ?? plan.price),
                        period: String(existing?.period ?? plan.period),
                        description: String(existing?.description || plan.description),
                        featuresText: featuresToText((existing?.features as string) || plan.features),
                        cta: String(existing?.cta || plan.cta),
                        href: String(existing?.href || plan.href),
                        highlight: Boolean(existing?.highlight ?? plan.highlight),
                        icon: String(existing?.icon || plan.icon),
                        sort_order: Number(existing?.sort_order ?? plan.sort_order),
                        active: existing?.active !== false,
                    };
                });

                const comparisonDocs = comparisonRes.documents as unknown as Array<Record<string, unknown>>;
                const fromDbComparison = new Map(comparisonDocs.map((doc) => [String(doc.slug), doc]));
                const mergedComparison: ComparisonRow[] = DEFAULT_PRICING_COMPARISON.map((row) => {
                    const existing = fromDbComparison.get(row.slug);
                    return {
                        $id: existing?.$id as string | undefined,
                        slug: row.slug,
                        audience: (existing?.audience as "artist" | "label") || row.audience,
                        pillar: String(existing?.pillar || row.pillar),
                        col1: String(existing?.col1 ?? row.col1),
                        col2: String(existing?.col2 ?? row.col2),
                        col3: String(existing?.col3 ?? row.col3),
                        sort_order: Number(existing?.sort_order ?? row.sort_order),
                        active: existing?.active !== false,
                    };
                });

                setPlans(mergedPlans);
                setComparisonRows(mergedComparison);
            } catch {
                setPlans(
                    DEFAULT_PRICING_PLANS.map((plan) => ({
                        slug: plan.slug,
                        name: plan.name,
                        audience: plan.audience,
                        price: plan.price,
                        period: plan.period,
                        description: plan.description,
                        featuresText: plan.features.join("\n"),
                        cta: plan.cta,
                        href: plan.href,
                        highlight: plan.highlight,
                        icon: plan.icon,
                        sort_order: plan.sort_order,
                        active: true,
                    }))
                );
                setComparisonRows(
                    DEFAULT_PRICING_COMPARISON.map((row) => ({
                        slug: row.slug,
                        audience: row.audience,
                        pillar: row.pillar,
                        col1: row.col1,
                        col2: row.col2,
                        col3: row.col3,
                        sort_order: row.sort_order,
                        active: true,
                    }))
                );
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const saveAll = async () => {
        setIsSaving(true);
        setMessage("");
        try {
            for (const plan of plans) {
                const payload = {
                    slug: plan.slug,
                    name: plan.name,
                    audience: plan.audience,
                    price: plan.price,
                    period: plan.period,
                    description: plan.description,
                    features: JSON.stringify(
                        plan.featuresText.split("\n").map((line) => line.trim()).filter(Boolean)
                    ),
                    cta: plan.cta,
                    href: plan.href,
                    highlight: plan.highlight,
                    icon: plan.icon,
                    sort_order: plan.sort_order,
                    active: plan.active,
                };
                if (plan.$id) {
                    await databases.updateDocument(DATABASE_ID, PLANS_COLLECTION, plan.$id, payload);
                } else {
                    await databases.createDocument(DATABASE_ID, PLANS_COLLECTION, ID.unique(), payload);
                }
            }

            for (const row of comparisonRows) {
                const payload = {
                    slug: row.slug,
                    audience: row.audience,
                    pillar: row.pillar,
                    col1: row.col1,
                    col2: row.col2,
                    col3: row.col3,
                    sort_order: row.sort_order,
                    active: row.active,
                };
                if (row.$id) {
                    await databases.updateDocument(DATABASE_ID, COMPARISON_COLLECTION, row.$id, payload);
                } else {
                    await databases.createDocument(DATABASE_ID, COMPARISON_COLLECTION, ID.unique(), payload);
                }
            }

            setMessage("Pricing data saved.");
        } catch (error: any) {
            setMessage(error.message || "Failed to save pricing data.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-6xl mx-auto space-y-6 pb-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black uppercase">Pricing Management</h1>
                        <p className="text-zinc-400 mt-1">Manage subscription tiers and comparison tables shown on pricing pages.</p>
                    </div>
                    <Button onClick={saveAll} disabled={isSaving} className="bg-shamiso-gold-bright text-black hover:bg-shamiso-gold font-bold uppercase">
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save All
                    </Button>
                </div>

                {message ? (
                    <Card className="bg-zinc-900/40 border-zinc-800">
                        <CardContent className="pt-4 text-sm text-zinc-300">{message}</CardContent>
                    </Card>
                ) : null}

                <Card className="bg-zinc-900/40 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Plan Cards</CardTitle>
                        <CardDescription className="text-zinc-400">One feature per line in the features field.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {plans.map((plan, index) => (
                            <div key={plan.slug} className="rounded-xl border border-zinc-800 p-4 bg-black/20 space-y-3">
                                <div className="flex items-center justify-between">
                                    <Badge className="uppercase tracking-widest text-[10px] bg-shamiso-gold/10 text-shamiso-gold-bright border border-shamiso-gold/30">
                                        {plan.slug}
                                    </Badge>
                                    <Badge variant="outline" className="text-[10px] uppercase">{plan.audience}</Badge>
                                </div>
                                <Input value={plan.name} onChange={(e) => setPlans((rows) => rows.map((row, i) => i === index ? { ...row, name: e.target.value } : row))} className="bg-zinc-950 border-zinc-800" />
                                <div className="grid grid-cols-2 gap-3">
                                    <Input value={plan.price} placeholder="Price" onChange={(e) => setPlans((rows) => rows.map((row, i) => i === index ? { ...row, price: e.target.value } : row))} className="bg-zinc-950 border-zinc-800" />
                                    <Input value={plan.period} placeholder="Period" onChange={(e) => setPlans((rows) => rows.map((row, i) => i === index ? { ...row, period: e.target.value } : row))} className="bg-zinc-950 border-zinc-800" />
                                </div>
                                <Input value={plan.description} onChange={(e) => setPlans((rows) => rows.map((row, i) => i === index ? { ...row, description: e.target.value } : row))} className="bg-zinc-950 border-zinc-800" />
                                <textarea
                                    value={plan.featuresText}
                                    onChange={(e) => setPlans((rows) => rows.map((row, i) => i === index ? { ...row, featuresText: e.target.value } : row))}
                                    className="w-full min-h-[120px] rounded-md bg-zinc-950 border border-zinc-800 p-3 text-sm"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <Input value={plan.cta} onChange={(e) => setPlans((rows) => rows.map((row, i) => i === index ? { ...row, cta: e.target.value } : row))} className="bg-zinc-950 border-zinc-800" />
                                    <Input value={plan.href} onChange={(e) => setPlans((rows) => rows.map((row, i) => i === index ? { ...row, href: e.target.value } : row))} className="bg-zinc-950 border-zinc-800" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900/40 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Comparison Rows</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {comparisonRows.map((row, index) => (
                            <div key={row.slug} className="rounded-xl border border-zinc-800 p-4 bg-black/20 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold">{row.pillar}</span>
                                    <Badge variant="outline" className="text-[10px] uppercase">{row.audience}</Badge>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <Input value={row.col1} onChange={(e) => setComparisonRows((rows) => rows.map((item, i) => i === index ? { ...item, col1: e.target.value } : item))} className="bg-zinc-950 border-zinc-800" />
                                    <Input value={row.col2} onChange={(e) => setComparisonRows((rows) => rows.map((item, i) => i === index ? { ...item, col2: e.target.value } : item))} className="bg-zinc-950 border-zinc-800" />
                                    <Input value={row.col3} onChange={(e) => setComparisonRows((rows) => rows.map((item, i) => i === index ? { ...item, col3: e.target.value } : item))} className="bg-zinc-950 border-zinc-800" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
