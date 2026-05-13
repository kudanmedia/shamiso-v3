"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, DollarSign, Wallet } from "lucide-react";

/** Fixed locale so SSR and client produce identical number strings (avoids hydration mismatch). */
const DISPLAY_LOCALE = "en-US";

const getSovereignAnalysis = (grossUSD: number, brandKey: string, localRate = 19.0) => {
    // Competitor Profile Map
    const profiles: Record<string, { c: number; t: number; f: number }> = {
        'distrokid': { c: 0.00, t: 0.30, f: 35.00 },
        'onerpm': { c: 0.15, t: 0.30, f: 30.00 },
        'cdbaby': { c: 0.09, t: 0.30, f: 25.00 },
        'free': { c: 0.15, t: 0.30, f: 35.00 }
    };

    const target = profiles[brandKey] || profiles['distrokid'];

    // 1. Calculate Legacy Leakage
    const postComm = grossUSD * (1 - target.c);
    const postTax = postComm * (1 - target.t);
    const legacyNet = Math.max(0, postTax - target.f);

    // 2. Calculate SMD Retention (Optimized Path)
    const smdNet = grossUSD;

    return {
        legacyTax: postComm * target.t,
        legacyFee: target.f,
        legacyComm: grossUSD * target.c,
        legacyNet,
        smdNet,
        usdBonus: Math.max(0, smdNet - legacyNet),
        localBonus: ((smdNet - legacyNet) * localRate),
        impact: (((smdNet - legacyNet) / (legacyNet || 1)) * 100)
    };
};

export function RevenueSwitchCalculator() {
    const [grossRevenue, setGrossRevenue] = useState<number>(1000);
    const [competitor, setCompetitor] = useState<string>('distrokid');

    const analysis = getSovereignAnalysis(grossRevenue, competitor);

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
                        See exactly how much extra cash you earn just by switching to Shamiso Music Distribution.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                    {/* Controls */}
                    <Card className="lg:col-span-12 border-shamiso-gold/15 bg-black/60 p-8 backdrop-blur-md rounded-3xl">
                        <div className="flex flex-col lg:flex-row gap-12">

                            {/* Input Section */}
                            <div className="flex-1 space-y-8">
                                <div>
                                    <label className="mb-2 flex text-sm font-bold uppercase tracking-widest text-neutral-400 items-center gap-2">
                                        How much royalty were you paid last month?
                                        <div className="relative group cursor-help">
                                            <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/50 border border-white/20">?</div>
                                            <div className="absolute hidden group-hover:block bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-zinc-900 border border-white/10 rounded-xl text-xs text-neutral-300 shadow-2xl z-20 normal-case tracking-normal">
                                                Enter your Gross total before your distributor takes their cut.
                                            </div>
                                        </div>
                                    </label>

                                    {grossRevenue >= 50000 && (
                                        <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-shamiso-gold/50 bg-shamiso-gold/10 px-3 py-1 text-xs font-bold text-shamiso-gold-bright uppercase tracking-wider">
                                            Custom Review Recommended
                                        </div>
                                    )}

                                    <div className="mb-6 flex items-baseline tracking-tight">
                                        <span className="text-3xl font-bold text-neutral-500 mr-1">$</span>
                                        <span className="text-5xl font-black text-white tabular-nums">
                                            {grossRevenue.toLocaleString(DISPLAY_LOCALE)}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="100"
                                        max="50000"
                                        step="100"
                                        value={grossRevenue}
                                        onChange={(e) => setGrossRevenue(parseInt(e.target.value))}
                                        className="h-3 w-full cursor-pointer appearance-none rounded-full bg-neutral-800 accent-shamiso-gold-bright hover:accent-shamiso-gold-bright transition-all"
                                    />
                                    <div className="mt-3 flex justify-between text-xs font-bold uppercase text-neutral-600">
                                        <span>$100</span>
                                        <span>$50,000</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-sm font-bold uppercase tracking-widest text-neutral-400">
                                        Select Your Current Plan
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => setCompetitor('distrokid')}
                                            className={`p-4 rounded-xl border text-sm font-bold transition-all ${competitor === 'distrokid' ? 'bg-shamiso-gold/20 border-shamiso-gold text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:bg-neutral-800'}`}
                                        >
                                            Paid Tiers
                                            <div className="text-[10px] font-normal text-neutral-500 mt-1 capitalize tracking-normal">E.g., DistroKid, TuneCore</div>
                                        </button>
                                        <button
                                            onClick={() => setCompetitor('free')}
                                            className={`p-4 rounded-xl border text-sm font-bold transition-all ${competitor === 'free' ? 'bg-shamiso-gold/20 border-shamiso-gold text-white' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:bg-neutral-800'}`}
                                        >
                                            Free Tiers
                                            <div className="text-[10px] font-normal text-neutral-500 mt-1 capitalize tracking-normal">Takes a ~15% cut</div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Comparison Section */}
                            <div className="flex-[1.5] grid gap-6 sm:grid-cols-2">
                                {/* Legacy */}
                                <div className="relative overflow-hidden rounded-2xl bg-neutral-900/40 border border-white/5 p-8 flex flex-col justify-between group hover:bg-neutral-900/60 transition-colors">
                                    <div>
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="text-xs font-black uppercase tracking-widest text-neutral-500">Your Distributor</span>
                                            <TrendingDown className="h-5 w-5 text-red-500/80" />
                                        </div>
                                        <div className="space-y-3 mb-8">
                                            {analysis.legacyComm > 0 && (
                                                <div className="flex justify-between text-sm group/tip relative">
                                                    <span className="text-neutral-500 flex items-center gap-1 cursor-help border-b border-dashed border-neutral-600">Commission Cut</span>
                                                    <span className="font-bold text-red-500/80">-${analysis.legacyComm.toLocaleString(DISPLAY_LOCALE, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                                    <div className="absolute hidden group-hover/tip:block bottom-full mb-2 left-0 w-48 p-2 bg-zinc-800 border border-white/10 rounded-lg text-xs text-neutral-300 z-20">
                                                        Most &apos;Free&apos; plans aren&apos;t free; they are a 15% success tax.
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-sm group/tip relative">
                                                <span className="text-neutral-500 flex items-center gap-1 cursor-help border-b border-dashed border-neutral-600">30% US Tax Leak</span>
                                                <span className="font-bold text-red-500/80">-${analysis.legacyTax.toLocaleString(DISPLAY_LOCALE, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                                <div className="absolute hidden group-hover/tip:block bottom-full mb-2 left-0 w-64 p-3 bg-zinc-800 border border-white/10 rounded-xl text-xs text-neutral-300 shadow-xl z-20 leading-relaxed">
                                                    Legacy distributors are US-bound and must withhold 30%. SMD&apos;s localized infrastructure uses tax treaties to keep that 30% in your pocket.
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-sm group/tip relative">
                                                <span className="text-neutral-500 flex items-center gap-1 cursor-help border-b border-dashed border-neutral-600">SWIFT Fees</span>
                                                <span className="font-bold text-red-500/80">-${analysis.legacyFee.toLocaleString(DISPLAY_LOCALE, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                                <div className="absolute hidden group-hover/tip:block bottom-full mb-2 right-0 w-56 p-3 bg-zinc-800 border border-white/10 rounded-xl text-xs text-neutral-300 shadow-xl z-20 leading-relaxed">
                                                    Stop paying $35 to receive your own money. We pay directly to local bank/mobile rails for $0.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="h-px bg-white/5 mb-4" />
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs font-bold text-neutral-400 uppercase">Net Pay</span>
                                            <span className="text-2xl font-black text-neutral-300">
                                                ${analysis.legacyNet.toLocaleString(DISPLAY_LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                                            <span className="text-xs font-black uppercase tracking-widest text-shamiso-gold-bright leading-tight max-w-[120px]">Shamiso Music</span>
                                            <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 text-[10px] px-2 py-0.5 h-auto">(RECOMMENDED)</Badge>
                                        </div>
                                        <div className="space-y-3 mb-8 relative z-10">
                                            <div className="flex justify-between text-sm group/tip relative">
                                                <span className="text-neutral-300 flex items-center gap-1 cursor-help border-b border-dashed border-shamiso-gold/30">Tax Efficiency</span>
                                                <span className="font-bold text-emerald-400">0% Withholding</span>
                                                <div className="absolute hidden group-hover/tip:block bottom-full mb-2 left-0 w-64 p-3 bg-zinc-900 border border-shamiso-gold/30 rounded-xl text-xs text-neutral-300 shadow-2xl z-20 leading-relaxed">
                                                    SMD uses localized tax optimization to bypass the mandatory 30% US Withholding.
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-sm group/tip relative">
                                                <span className="text-neutral-300 flex items-center gap-1 cursor-help border-b border-dashed border-shamiso-gold/30">Payout Fees</span>
                                                <span className="font-bold text-emerald-400">$0.00</span>
                                                <div className="absolute hidden group-hover/tip:block bottom-full mb-2 right-0 w-56 p-3 bg-zinc-900 border border-shamiso-gold/30 rounded-xl text-xs text-neutral-300 shadow-2xl z-20 leading-relaxed">
                                                    We pay directly to local bank/mobile accounts, bypassing the $35 SWIFT toll gate.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative z-10">
                                        <div className="h-px bg-shamiso-gold/20 mb-4" />
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs font-bold text-shamiso-gold-bright/80 uppercase">Net Pay</span>
                                            <span className="text-3xl font-black text-white">
                                                ${analysis.smdNet.toLocaleString(DISPLAY_LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Footer */}
                        <div className="mt-8 pt-8 border-t border-white/5 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-shamiso-gold-bright/10 flex items-center justify-center text-shamiso-gold-bright shrink-0">
                                    <Wallet className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Monthly Sovereign Bonus</p>
                                    <p className="text-3xl font-black text-white leading-none mt-1">
                                        +${analysis.usdBonus.toLocaleString(DISPLAY_LOCALE, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}<span className="text-lg text-neutral-500 font-medium">/mo</span>
                                    </p>
                                    <p className="text-xs text-neutral-400 mt-1 pb-1">(extra money you keep)</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-shamiso-gold-bright/20 flex items-center justify-center text-shamiso-gold-bright shadow-lg shadow-shamiso-gold/20 shrink-0">
                                    <TrendingUp className="h-6 w-6" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold uppercase tracking-widest text-shamiso-gold-bright">Annual Sovereign Bonus</p>
                                    <p className="text-4xl font-black text-white leading-none mt-1">
                                        +${(analysis.usdBonus * 12).toLocaleString(DISPLAY_LOCALE, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}<span className="text-xl text-shamiso-gold-bright font-medium">/yr</span>
                                    </p>
                                    <p className="text-xs text-neutral-400 mt-1 pb-1">(recaptured yearly revenue)</p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center items-center md:items-end text-right">
                                <p className="text-lg font-bold text-white mb-1 uppercase italic tracking-tighter">This isn&apos;t a gift. It&apos;s your right.</p>
                                <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Switch to Sovereign Infrastructure</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
