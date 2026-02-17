"use client";

import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const comparisonData = [
    {
        feature: "Payout Rail",
        legacy: "SWIFT (3–5 Days)",
        smd: "Stitch/Mukuru (Instant RTC)",
    },
    {
        feature: "Tax Status",
        legacy: "30% US Withholding",
        smd: "0% (DTA Optimized)",
    },
    {
        feature: "Local Payout",
        legacy: "PayPal / Bank only",
        smd: "Mobile Money (M-Pesa, MoMo, AirTel)",
    },
    {
        feature: "Genre IQ",
        legacy: "Generic 'House/Afrobeats'",
        smd: "Native (Lekompo, 3-Step, Gqom)",
    },
];

export function SovereignCorridorTable() {
    return (
        <section id="infrastructure" className="relative py-24 bg-black/20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright">
                        The Infrastructure
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl">
                        Sovereign <span className="gradient-text">Vs</span> Legacy
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        Institutional-grade financial rails purpose-built for the African music economy.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-shamiso-gold/15 bg-black/40 backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-shamiso-gold/10 bg-shamiso-gold/5">
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Feature</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-neutral-500">Legacy (DistroKid/UM)</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-shamiso-gold-bright">SMD Sovereign Corridor</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {comparisonData.map((row) => (
                                    <tr key={row.feature} className="transition-colors hover:bg-white/[0.02]">
                                        <td className="px-6 py-6 text-sm font-bold text-white uppercase tracking-tight">{row.feature}</td>
                                        <td className="px-6 py-6 text-sm text-neutral-500">
                                            <div className="flex items-center gap-2">
                                                <X className="h-4 w-4 text-red-500/50" />
                                                {row.legacy}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-sm text-white font-medium">
                                            <div className="flex items-center gap-2">
                                                <Check className="h-4 w-4 text-shamiso-gold-bright" />
                                                {row.smd}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-neutral-500 italic">
                        * Based on standard DTA agreements and localized fintech integration.
                    </p>
                </div>
            </div>
        </section>
    );
}
