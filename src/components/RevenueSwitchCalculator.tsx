"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, DollarSign, Wallet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RevenueSwitchCalculator() {
    const [streams, setStreams] = useState(100000);

    // Constants
    const REVENUE_PER_1K = 4; // USD (approx for Spotify/Apple blended)
    const ZAR_RATE = 19;
    const US_TAX_RATE = 0.30;
    const SWIFT_FEE_USD = 30;

    // Calculations
    const monthlyRevenueUSD = (streams / 1000) * REVENUE_PER_1K;

    // Legacy Calculation
    const taxLeakageUSD = monthlyRevenueUSD * US_TAX_RATE;
    const westernTotalUSD = Math.max(0, monthlyRevenueUSD - taxLeakageUSD - SWIFT_FEE_USD); // Cannot be negative

    // SMD Calculation (0% Tax, 0 Swift)
    const smdTotalUSD = monthlyRevenueUSD;

    const monthlySavingUSD = smdTotalUSD - westernTotalUSD;
    const monthlySavingZAR = monthlySavingUSD * ZAR_RATE;

    return (
        <section id="vault" className="relative py-24 bg-black/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright">
                        The Sovereign Bonus
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl">
                        Calculate Your <span className="gradient-text">Bonus</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        See exactly how much extra cash you earn just by switching your infrastructure.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                    {/* Controls */}
                    <Card className="lg:col-span-12 border-shamiso-gold/15 bg-black/60 p-8 backdrop-blur-md rounded-3xl">
                        <div className="flex flex-col lg:flex-row gap-12">

                            {/* Input Section */}
                            <div className="flex-1 space-y-8">
                                <div>
                                    <label className="mb-6 block text-sm font-bold uppercase tracking-widest text-neutral-400">
                                        How many global streams do you have per month?
                                    </label>
                                    <div className="mb-6 text-5xl font-black text-white tabular-nums tracking-tight">
                                        {streams.toLocaleString()}
                                    </div>
                                    <input
                                        type="range"
                                        min="5000"
                                        max="1000000"
                                        step="5000"
                                        value={streams}
                                        onChange={(e) => setStreams(parseInt(e.target.value))}
                                        className="h-3 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-shamiso-gold-bright hover:accent-shamiso-gold-bright transition-all"
                                    />
                                    <div className="mt-3 flex justify-between text-xs font-bold uppercase text-neutral-600">
                                        <span>5K</span>
                                        <span>500K</span>
                                        <span>1M+</span>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-neutral-900/50 border border-white/5">
                                    <div className="flex items-center gap-3 text-neutral-400 mb-2">
                                        <DollarSign className="h-4 w-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Estimated Gross Revenue</span>
                                    </div>
                                    <div className="text-2xl font-black text-white">
                                        ${monthlyRevenueUSD.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </div>
                                </div>
                            </div>

                            {/* Comparison Section */}
                            <div className="flex-[1.5] grid gap-6 sm:grid-cols-2">
                                {/* Legacy */}
                                <div className="relative overflow-hidden rounded-2xl bg-neutral-900/40 border border-white/5 p-8 flex flex-col justify-between group hover:bg-neutral-900/60 transition-colors">
                                    <div>
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="text-xs font-black uppercase tracking-widest text-neutral-500">Legacy Distributor</span>
                                            <TrendingDown className="h-5 w-5 text-red-500/80" />
                                        </div>
                                        <div className="space-y-3 mb-8">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">30% US Tax Leak</span>
                                                <span className="font-bold text-red-500/80">-${taxLeakageUSD.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-500">SWIFT Fees</span>
                                                <span className="font-bold text-red-500/80">-${SWIFT_FEE_USD.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="h-px bg-white/5 mb-4" />
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs font-bold text-neutral-400 uppercase">Net Pay</span>
                                            <span className="text-2xl font-black text-neutral-300">
                                                ${westernTotalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* SMD */}
                                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-shamiso-gold/20 to-shamiso-gold/5 border border-shamiso-gold/30 p-8 flex flex-col justify-between shadow-2xl shadow-shamiso-gold/10">
                                    {/* Glow effect */}
                                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-shamiso-gold-bright/20 blur-3xl pointer-events-none" />

                                    <div>
                                        <div className="mb-6 flex items-center justify-between relative z-10">
                                            <span className="text-xs font-black uppercase tracking-widest text-shamiso-gold-bright">SMD Sovereign</span>
                                            <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 text-[10px] px-2 py-0.5 h-auto">RECOMMENDED</Badge>
                                        </div>
                                        <div className="space-y-3 mb-8 relative z-10">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-300">Tax Efficiency</span>
                                                <span className="font-bold text-emerald-400">0% Withholding</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-neutral-300">Payout Fees</span>
                                                <span className="font-bold text-emerald-400">R0.00</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="h-px bg-shamiso-gold/20 mb-4" />
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs font-bold text-shamiso-gold-bright/80 uppercase">Net Pay</span>
                                            <span className="text-3xl font-black text-white">
                                                ${smdTotalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Footer */}
                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-shamiso-gold-bright/10 flex items-center justify-center text-shamiso-gold-bright">
                                    <Wallet className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Your Monthly Sovereign Bonus</p>
                                    <p className="text-3xl font-black text-white leading-none mt-1">
                                        +R{monthlySavingZAR.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}<span className="text-lg text-neutral-500 font-medium">/mo</span>
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-sm text-neutral-400 mb-1">This isn&apos;t a gift. It&apos;s your right.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
