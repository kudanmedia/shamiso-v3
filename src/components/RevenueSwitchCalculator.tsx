"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, DollarSign, Wallet } from "lucide-react";

export function RevenueSwitchCalculator() {
    const [streams, setStreams] = useState(200000);

    // Constants
    const REVENUE_PER_1K = 4; // USD
    const ZAR_RATE = 19;
    const US_TAX_RATE = 0.30;
    const SWIFT_FEE_USD = 30;

    // Calculations
    const monthlyRevenueUSD = (streams / 1000) * REVENUE_PER_1K;
    const taxLeakageUSD = monthlyRevenueUSD * US_TAX_RATE;
    const westernTotalUSD = monthlyRevenueUSD - taxLeakageUSD - SWIFT_FEE_USD;
    const smdTotalUSD = monthlyRevenueUSD;

    const monthlySavingUSD = smdTotalUSD - westernTotalUSD;
    const monthlySavingZAR = monthlySavingUSD * ZAR_RATE;

    return (
        <section id="vault" className="relative py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright">
                        The Displacer
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl">
                        Stop the <span className="gradient-text">Bleed</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        See exactly how much you&apos;re losing to foreign taxes and legacy banking fees.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                    {/* Controls */}
                    <Card className="lg:col-span-5 border-shamiso-gold/15 bg-black/40 p-8 backdrop-blur-md">
                        <div className="space-y-8">
                            <div>
                                <label className="mb-4 block text-sm font-bold uppercase tracking-widest text-neutral-500">
                                    Monthly Global Streams
                                </label>
                                <div className="mb-4 text-4xl font-black text-white">
                                    {streams.toLocaleString()}
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="5000000"
                                    step="10000"
                                    value={streams}
                                    onChange={(e) => setStreams(parseInt(e.target.value))}
                                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-shamiso-gold/20 accent-shamiso-gold-bright"
                                />
                                <div className="mt-2 flex justify-between text-xs font-medium text-neutral-500">
                                    <span>10K</span>
                                    <span>2.5M</span>
                                    <span>5M</span>
                                </div>
                            </div>

                            <div className="rounded-xl border border-shamiso-gold/10 bg-shamiso-gold/5 p-6">
                                <div className="flex items-center gap-3 text-shamiso-gold-bright">
                                    <DollarSign className="h-5 w-5" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Estimated Gross Revenue</span>
                                </div>
                                <div className="mt-2 text-3xl font-black text-white">
                                    ${monthlyRevenueUSD.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                </div>
                                <p className="mt-1 text-xs text-neutral-500 uppercase tracking-tighter">Gross Global Monthly Yield</p>
                            </div>
                        </div>
                    </Card>

                    {/* Comparison */}
                    <div className="lg:col-span-7">
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Western Distributor */}
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04]">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Legacy Distributor</span>
                                    <TrendingDown className="h-5 w-5 text-red-500" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-400">30% US Tax Leak</span>
                                        <span className="font-bold text-red-500">-${taxLeakageUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-400">SWIFT/Wire Fees</span>
                                        <span className="font-bold text-red-500">-${SWIFT_FEE_USD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <div className="flex justify-between">
                                        <span className="text-sm font-bold text-white uppercase">Net Payout</span>
                                        <span className="text-xl font-black text-white">
                                            ${westernTotalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* SMD Sovereign Corridor */}
                            <div className="relative overflow-hidden rounded-2xl border border-shamiso-gold/30 bg-shamiso-gold/5 p-6 shadow-2xl shadow-shamiso-gold/10 transition-all hover:bg-shamiso-gold/10">
                                <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-shamiso-gold-bright/10 blur-2xl" />

                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-shamiso-gold-bright">SMD Sovereign Corridor</span>
                                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-400">Tax Efficiency</span>
                                        <span className="font-bold text-emerald-500">0% Withholding</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-neutral-400">Payout</span>
                                        <span className="font-bold text-emerald-500">Instant RTC / MoMo</span>
                                    </div>
                                    <div className="h-px bg-shamiso-gold/20" />
                                    <div className="flex justify-between">
                                        <span className="text-sm font-bold text-white uppercase">Net Payout</span>
                                        <span className="text-xl font-black text-shamiso-gold-bright">
                                            ${smdTotalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary Result */}
                        <div className="mt-8 rounded-2xl bg-gradient-to-r from-shamiso-gold/20 to-transparent p-8 border-l-4 border-shamiso-gold-bright">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-shamiso-gold-bright">Asset Recovery Projection</p>
                                    <h3 className="mt-1 text-2xl font-black text-white uppercase leading-tight">
                                        You are losing R{monthlySavingZAR.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/month.
                                    </h3>
                                    <p className="text-neutral-400">Institutional routing recaptures your wealth instantly.</p>
                                </div>
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-shamiso-gold-bright/10 text-shamiso-gold-bright">
                                    <Wallet className="h-8 w-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
