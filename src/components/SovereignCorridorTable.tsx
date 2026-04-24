"use client";

import { Check, X, ShieldCheck, Banknote, Clock, Zap, Activity, Network, Users, MapPin, TrendingUp, Rocket, Target, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const comparisonData = [
    {
        feature: "Primary Role",
        icon: Activity,
        smd: "Sovereign Infrastructure. Full-stack distribution, finance, and growth engine.",
        mogul: "Financial Truth Engine. Aggregates metadata to find and audit missing royalties.",
        rivals: "Utility. Simple file delivery and 'dumb pipe' distribution.",
        highlight: true
    },
    {
        feature: "Taxes",
        icon: ShieldCheck,
        smd: "Keep 100%. No US tax withholding traps for international artists.",
        mogul: "Optimized. Identifies tax leaks in global payout systems.",
        rivals: "Lose up to 30%. Heavy cuts due to legacy US tax withholding traps.",
        highlight: true
    },
    {
        feature: "Funding",
        icon: Banknote,
        smd: "Institutional. Up to $3M for growth and $10M for catalog acquisition.",
        mogul: "Catalog Value Center. Provides valuations and connects you to finance partners.",
        rivals: "Rare. Usually non-existent or restricted to invite-only 'elite' tiers.",
        highlight: true
    },
    {
        feature: "Getting Paid",
        icon: Clock,
        smd: "Monthly. Modern rails (Mobile Money, Instant-pay).",
        mogul: "Transparency First. Tracks when you should be paid across 100+ sources.",
        rivals: "Slow. Legacy 45-day transfer cycles and fragmented bank transfers.",
        highlight: false
    },
    {
        feature: "AI Tools",
        icon: Zap,
        smd: "Full Suite. AI Mixing, Mastering, and Predictive Success Analysis.",
        mogul: "Audit Algorithms. AI that finds gaps in registrations and unpaid performance royalties.",
        rivals: "Basic. Limited to automated social media captions or basic promo tools.",
        highlight: false
    },
    {
        feature: "Financial Rails",
        icon: Network,
        smd: "Bank-Level. Institutional-grade tech integrated into the label ecosystem.",
        mogul: "Data Aggregator. Connects to your distributor/PRO to show a unified financial view.",
        rivals: "Legacy. Fragmented, old-school systems that rely on manual reporting.",
        highlight: true
    },
    {
        feature: "Direct-to-Fan",
        icon: Users,
        smd: "Integrated. Sell early, keep 100% of fan data and email/SMS lists.",
        mogul: "None. Purely a back-office financial and metadata tool.",
        rivals: "None. Reliant purely on DSP streaming platforms (Spotify, Apple).",
        highlight: true
    },
    {
        feature: "Tour Strategy",
        icon: MapPin,
        smd: "Data-Driven. Plan tours exactly where the 'sovereign' data shows heat.",
        mogul: "Metadata Review. Ensures live performance rights are registered for collection.",
        rivals: "Manual. Artists must guess their markets based on basic city-charts.",
        highlight: false
    },
    {
        feature: "Wealth Management",
        icon: TrendingUp,
        smd: "Automated. Full CFO-level tracking, tax-optimization, and wealth building.",
        mogul: "Audit-Only. Consolidates royalty sources to find 'black box' money.",
        rivals: "Fragmented. Basic charts with no long-term valuation or wealth strategy.",
        highlight: true
    },
    {
        feature: "Marketing Engine",
        icon: Rocket,
        smd: "High-Octane. Integrated PR, AI Playlisting, Smart Links, and Fanbase growth.",
        mogul: "None. Does not handle promotion or artist marketing.",
        rivals: "Minimal. Basic social share tools and pre-save buttons only.",
        highlight: true
    },
    {
        feature: "Growth Speed",
        icon: Target,
        smd: "8.2x Faster. Data-led acquisition and integrated capital infusion.",
        mogul: "Recovery Focus. Boosts revenue by ~20% via fixing broken registrations.",
        rivals: "Organic Only. No integrated marketing or capital stack to accelerate.",
        highlight: true
    }
];

export function SovereignCorridorTable() {
    return (
        <section id="infrastructure" className="relative py-24 bg-neutral-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright">
                        1. The Competitive Moat
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl">
                        SMD vs. <span className="gradient-text">Traditional Rivals</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        <strong className="text-white">Institutional-Grade Financial Rails vs. Legacy Systems.</strong><br className="mb-2" />This is the consolidated and finalized structure for Shamiso Music Distribution (SMD). It integrates all core features, your elite partner ecosystem, and the definitive "Competitive Moat" that displaces legacy distributors.
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-shamiso-gold/15 bg-black/40 backdrop-blur-md shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-white/5">
                                    <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-neutral-500 w-1/4 border-r border-white/5">Feature</th>
                                    <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-shamiso-gold-bright w-1/4 bg-shamiso-gold/5 border-t-4 border-shamiso-gold-bright border-r border-white/5">
                                        SMD (The Displacer)
                                    </th>
                                    <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-blue-400 w-1/4 border-r border-white/5 bg-blue-950/10 border-t-4 border-blue-500/50">
                                        Mogul (The Auditor)
                                    </th>
                                    <th className="px-6 py-6 text-xs font-bold uppercase tracking-widest text-neutral-500 w-1/4 opacity-60">Your Distributor</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {comparisonData.map((row) => (
                                    <tr key={row.feature} className="transition-colors hover:bg-white/[0.02] group">
                                        <td className="px-6 py-6 border-r border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white/5 text-neutral-400">
                                                    <row.icon className="h-5 w-5" />
                                                </div>
                                                <span className="text-sm font-bold text-white uppercase tracking-tight">{row.feature}</span>
                                            </div>
                                        </td>

                                        {/* SMD Column */}
                                        <td className="px-6 py-6 bg-shamiso-gold/[0.02] group-hover:bg-shamiso-gold/[0.05] transition-colors relative border-r border-white/5">
                                            <div className="flex gap-3">
                                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 mt-0.5">
                                                    <Check className="h-3 w-3" />
                                                </div>
                                                <span className={`text-sm leading-relaxed ${row.highlight ? 'text-shamiso-gold-bright font-black' : 'text-white font-medium'}`}>
                                                    {row.smd}
                                                </span>
                                            </div>
                                            {row.highlight && (
                                                <div className="absolute inset-y-0 left-0 w-1 bg-shamiso-gold-bright/30" />
                                            )}
                                        </td>

                                        {/* Mogul Column */}
                                        <td className="px-6 py-6 bg-blue-950/5 group-hover:bg-blue-950/10 transition-colors border-r border-white/5">
                                            <div className="flex gap-3">
                                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-500 mt-0.5">
                                                    <Search className="h-3 w-3" />
                                                </div>
                                                <span className="text-sm leading-relaxed text-neutral-300 font-medium">
                                                    {row.mogul}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Rivals Column */}
                                        <td className="px-6 py-6 opacity-60">
                                            <div className="flex gap-3">
                                                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-500 mt-0.5">
                                                    <X className="h-3 w-3" />
                                                </div>
                                                <span className="text-sm leading-relaxed text-neutral-400 font-medium">
                                                    {row.rivals}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-neutral-500 italic max-w-lg mx-auto mb-16">
                        * Comparison based on standard "Indie" tiers vs. SMD's "Sovereign" tier. Competitor data sourced from public pricing pages as of 2026.
                    </p>
                </div>

                {/* 30% Tax Eligible Countries Table */}
                <div className="mt-16">
                    <div className="mb-8 text-center">
                        <h3 className="text-2xl font-bold text-white uppercase tracking-tight">
                            Eligible <span className="text-shamiso-gold-bright">Tax Treaty</span> Corridors
                        </h3>
                        <p className="mt-2 text-sm text-neutral-400 max-w-2xl mx-auto">
                            Artists from these jurisdictions benefit from a 0% US Royalty Withholding Rate through our sovereign infrastructure, bypassing the standard 30% leak.
                        </p>
                    </div>

                    <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-950/10 backdrop-blur-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-emerald-900/20">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-emerald-400 w-1/2">Country / Region</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-emerald-400 w-1/4">Standard Rate</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-emerald-400 w-1/4">SMD Treaty Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-emerald-500/10">
                                {[
                                    { country: "South Africa (ZA)", standard: "30%", smd: "0%" },
                                    { country: "United Kingdom (UK)", standard: "30%", smd: "0%" },
                                    { country: "Canada (CA)", standard: "30%", smd: "0%" },
                                    { country: "Germany (DE)", standard: "30%", smd: "0%" },
                                    { country: "France (FR)", standard: "30%", smd: "0%" },
                                    { country: "Australia (AU)", standard: "30%", smd: "5% (Reduced)" },
                                ].map((row) => (
                                    <tr key={row.country} className="transition-colors hover:bg-emerald-500/5">
                                        <td className="px-6 py-4 text-sm font-bold text-white">{row.country}</td>
                                        <td className="px-6 py-4 text-sm text-red-400 line-through opacity-70">{row.standard}</td>
                                        <td className="px-6 py-4 text-sm font-black text-emerald-400">{row.smd}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}

