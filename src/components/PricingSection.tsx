"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Badge, Building2, Check, Crown, Zap, type LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import type { PricingComparisonRow, PricingData, PricingPlan } from "@/lib/pricing";

const ICON_MAP: Record<PricingPlan["icon"], LucideIcon> = {
    Zap,
    Crown,
    Building2,
};

interface PricingSectionProps {
    data: PricingData;
}

export function PricingSection({ data }: PricingSectionProps) {
    const { artistPlans, labelPlans, artistComparison, labelComparison } = data;

    return (
        <section id="pricing" className="relative py-24 bg-black/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest">
                        SMD Subscription Pricing and Benefits Plan
                    </Badge>
                    <h2 className="text-4xl font-black text-white uppercase sm:text-5xl">
                        Music distribution <span className="gradient-text">redefined</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        Transparent, high-performance plans for independent artists, content creators, producers, labels, distributors, telcos and banks.
                    </p>
                </div>

                <Tabs defaultValue="artists" className="w-full">
                    <div className="flex justify-center mb-12">
                        <TabsList className="bg-zinc-900 border border-white/5 p-1 h-14">
                            <TabsTrigger
                                value="artists"
                                className="px-8 py-3 text-sm font-bold uppercase tracking-widest data-[state=active]:bg-shamiso-gold-bright data-[state=active]:text-black"
                            >
                                Artists
                            </TabsTrigger>
                            <TabsTrigger
                                value="labels"
                                className="px-8 py-3 text-sm font-bold uppercase tracking-widest data-[state=active]:bg-shamiso-gold-bright data-[state=active]:text-black"
                            >
                                Labels & Enterprises
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="artists" className="space-y-20">
                        <div className="grid gap-8 md:grid-cols-3">
                            {artistPlans.map((plan) => (
                                <PlanCard key={plan.slug} plan={plan} tierLabel="Artist Tier" />
                            ))}
                        </div>

                        <ComparisonTable
                            title="Advanced Benefits Structure"
                            pillarHeader="Feature Pillar"
                            columns={artistPlans.map((plan) => plan.name)}
                            rows={artistComparison}
                            highlightColumn={1}
                        />
                    </TabsContent>

                    <TabsContent value="labels" className="space-y-20">
                        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                            {labelPlans.map((plan) => (
                                <PlanCard key={plan.slug} plan={plan} tierLabel="Label Tier" />
                            ))}
                        </div>

                        <ComparisonTable
                            title="Advanced Benefits Structure"
                            pillarHeader="Benefit Category"
                            columns={labelPlans.map((plan) => plan.name)}
                            rows={labelComparison}
                            highlightColumn={1}
                        />
                    </TabsContent>
                </Tabs>

                <div className="mt-16 text-center">
                    <p className="text-sm text-neutral-500">
                        Subscription Pricing and Benefit Plan (comparable to modern high-performance distribution).
                    </p>
                </div>
            </div>
        </section>
    );
}

function ComparisonTable({
    title,
    pillarHeader,
    columns,
    rows,
    highlightColumn,
}: {
    title: string;
    pillarHeader: string;
    columns: string[];
    rows: PricingComparisonRow[];
    highlightColumn: number;
}) {
    const values = ["col1", "col2", "col3"] as const;

    return (
        <div className="mt-20">
            <h3 className="text-2xl font-black text-white uppercase mb-8 text-center">{title}</h3>
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5">
                            <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">{pillarHeader}</th>
                            {columns.map((column, index) => (
                                <th
                                    key={column}
                                    className={`px-6 py-4 text-xs font-bold uppercase ${index === highlightColumn ? "text-shamiso-gold-bright" : "text-white"}`}
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {rows.map((row) => (
                            <tr key={row.slug} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4 text-sm font-bold text-neutral-400">{row.pillar}</td>
                                {values.slice(0, columns.length).map((key, index) => (
                                    <td
                                        key={key}
                                        className={`px-6 py-4 text-sm ${index === highlightColumn ? "text-shamiso-gold-bright font-medium" : "text-neutral-300"}`}
                                    >
                                        {row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function PlanCard({ plan, tierLabel }: { plan: PricingPlan; tierLabel: string }) {
    const Icon = ICON_MAP[plan.icon] || Zap;

    return (
        <Card
            className={`relative overflow-hidden border-zinc-800 bg-zinc-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${plan.highlight ? "border-shamiso-gold/40 ring-1 ring-shamiso-gold/20 shadow-2xl shadow-shamiso-gold/10" : ""}`}
        >
            {plan.highlight && (
                <div className="absolute top-0 right-0 bg-shamiso-gold-bright px-4 py-1 text-[10px] font-black uppercase text-black">
                    Most Popular
                </div>
            )}

            <div className="p-8">
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${plan.highlight ? "text-shamiso-gold-bright" : "text-neutral-500"}`}>
                    <Icon className="h-6 w-6" />
                </div>

                <div className="text-[10px] font-black uppercase tracking-widest text-shamiso-gold/60 mb-1">{tierLabel}</div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="ml-1 text-sm text-neutral-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-500 min-h-[40px]">{plan.description}</p>

                <div className="my-8 h-px bg-white/5" />

                <ul className="mb-8 space-y-4 min-h-[220px]">
                    {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-neutral-300">
                            <Check className="h-4 w-4 shrink-0 text-shamiso-gold-bright" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <a href={plan.href} className="w-full">
                    <Button
                        className={`w-full font-black uppercase tracking-tight transition-all hover:scale-[1.02] ${plan.highlight
                            ? "bg-shamiso-gold-bright text-black shadow-lg shadow-shamiso-gold/20"
                            : "bg-white/5 text-white hover:bg-white/10"}`}
                    >
                        {plan.cta}
                    </Button>
                </a>
            </div>
        </Card>
    );
}
