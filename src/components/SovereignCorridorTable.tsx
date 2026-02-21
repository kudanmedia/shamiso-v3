"use client";

import { Check, X, ShieldCheck, Banknote, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const comparisonData = [
    {
        feature: "Taxes",
        icon: ShieldCheck,
        smd: "Keep 100%. You don't lose money to US tax withholding.",
        rivals: "Lose up to 30%. They take a large chunk for US taxes.",
        highlight: true
    },
    {
        feature: "Funding",
        icon: Banknote,
        smd: "Easy access. You can get up to $5M to grow your career.",
        rivals: "Hard to get. Usually no funding, or you have to be invited.",
        highlight: true
    },
    {
        feature: "Getting Paid",
        icon: Clock,
        smd: "Instant. Money hits your account immediately.",
        rivals: "Slow. You have to wait 1 to 5 days for transfers.",
        highlight: false
    },
    {
        feature: "AI Tools",
        icon: Zap,
        smd: "Full Support. AI helps you make and promote music.",
        rivals: "Basic. AI only helps with basic promotion.",
        highlight: false
    },
];

export function SovereignCorridorTable() {
    return (
        <section id="infrastructure" className="relative py-24 bg-neutral-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright">
                        The Competitive Moat
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl">
                        Why Artists choose <span className="gradient-text">Shamiso Music Distribution</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        Institutional-grade financial rails (modern, bank-level) technology vs. Legacy distribution (old-school) systems. The choice is yours.
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-shamiso-gold/15 bg-black/40 backdrop-blur-md shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5">
                                    <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-neutral-500 w-1/3">Feature</th>
                                    <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-shamiso-gold-bright w-1/3 bg-shamiso-gold/5 border-t-4 border-shamiso-gold-bright">
                                        SMD (The Displacer)
                                    </th>
                                    <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-neutral-500 w-1/3 opacity-60">Traditional Rivals (DistroKid, etc.)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {comparisonData.map((row) => (
                                    <tr key={row.feature} className="transition-colors hover:bg-white/[0.02] group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-white/5 text-neutral-400">
                                                    <row.icon className="h-5 w-5" />
                                                </div>
                                                <span className="text-sm font-bold text-white uppercase tracking-tight">{row.feature}</span>
                                            </div>
                                        </td>

                                        {/* SMD Column */}
                                        <td className="px-8 py-6 bg-shamiso-gold/[0.02] group-hover:bg-shamiso-gold/[0.05] transition-colors relative">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                                                    <Check className="h-4 w-4" />
                                                </div>
                                                <span className={`text-base font-black ${row.highlight ? 'text-shamiso-gold-bright' : 'text-white'}`}>
                                                    {row.smd}
                                                </span>
                                            </div>
                                            {row.highlight && (
                                                <div className="absolute inset-y-0 left-0 w-1 bg-shamiso-gold-bright/20" />
                                            )}
                                        </td>

                                        {/* Rivals Column */}
                                        <td className="px-8 py-6 opacity-60">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-red-500">
                                                    <X className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm font-medium text-neutral-400">
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
                    <p className="text-sm text-neutral-500 italic max-w-lg mx-auto">
                        * Comparison based on standard "Indie" tiers vs. SMD's "Sovereign" tier. Competitor data sourced from public pricing pages as of 2026.
                    </p>
                </div>
            </div>
        </section>
    );
}
