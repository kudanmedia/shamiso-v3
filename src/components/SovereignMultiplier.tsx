"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft, BarChart3, ShieldCheck, Gauge, Zap } from "lucide-react";

export function SovereignMultiplier() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        annualRevenue: 50000,
        usPercentage: 50,
        catalogAge: "developing", // new, developing, evergreen
    });

    const calculateValuation = () => {
        const taxAlpha = 1.30;
        const usRevenue = data.annualRevenue * (data.usPercentage / 100);
        const nonUsRevenue = data.annualRevenue - usRevenue;

        // Revenue after recapturing US tax
        const sovereignAnnualRevenue = (usRevenue * taxAlpha) + nonUsRevenue;

        let multiplier = 5;
        if (data.catalogAge === "developing") multiplier = 9;
        if (data.catalogAge === "evergreen") multiplier = 15;

        const marketValue = data.annualRevenue * multiplier;
        const sovereignValue = sovereignAnnualRevenue * multiplier;

        return {
            marketValue,
            sovereignValue,
            lift: sovereignValue - marketValue,
            annualLift: sovereignAnnualRevenue - data.annualRevenue
        };
    };

    const valuation = calculateValuation();

    return (
        <section id="valuation" className="relative py-24 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.05),transparent_70%)]" />

            <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright">
                        The Sovereign Multiplier™
                    </Badge>
                    <h2 className="text-4xl font-black text-white uppercase sm:text-5xl">
                        Catalog <span className="gradient-text">Valuation</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        Our proprietary engine calculates the true institutional value of your IP after Sovereign Tax Alpha.
                    </p>
                </div>

                <div className="overflow-hidden rounded-3xl border border-shamiso-gold/20 bg-black/60 shadow-2xl backdrop-blur-xl">
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-white/5">
                        <div
                            className="h-full bg-shamiso-gold-bright transition-all duration-500 ease-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>

                    <div className="p-8 sm:p-12">
                        {step === 1 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-shamiso-gold/10 text-shamiso-gold-bright">
                                        <BarChart3 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white uppercase">Step 01: Revenue Audit</h3>
                                        <p className="text-sm text-neutral-500">Analyze your current global yield and exposure.</p>
                                    </div>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="annualRevenue" className="text-xs font-bold uppercase tracking-widest text-neutral-400">Annual Royalties (USD)</Label>
                                        <Input
                                            id="annualRevenue"
                                            type="number"
                                            value={data.annualRevenue}
                                            onChange={(e) => setData({ ...data, annualRevenue: parseInt(e.target.value) || 0 })}
                                            className="h-14 border-shamiso-gold/20 bg-white/5 text-xl font-bold text-white focus:border-shamiso-gold-bright"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="usPercentage" className="text-xs font-bold uppercase tracking-widest text-neutral-400">US Streaming Exposure (%)</Label>
                                        <Input
                                            id="usPercentage"
                                            type="number"
                                            max="100"
                                            value={data.usPercentage}
                                            onChange={(e) => setData({ ...data, usPercentage: parseInt(e.target.value) || 0 })}
                                            className="h-14 border-shamiso-gold/20 bg-white/5 text-xl font-bold text-white focus:border-shamiso-gold-bright"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        onClick={() => setStep(2)}
                                        size="lg"
                                        className="bg-shamiso-gold-bright px-8 font-black uppercase text-black hover:scale-105 transition-transform"
                                    >
                                        Next Component
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-shamiso-gold/10 text-shamiso-gold-bright">
                                        <Gauge className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white uppercase">Step 02: Asset Maturity</h3>
                                        <p className="text-sm text-neutral-500">Determining the risk-adjusted multiplier for your IP.</p>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3">
                                    {[
                                        { id: "new", label: "New", desc: "< 3 Years", multiplier: "4-6x" },
                                        { id: "developing", label: "Developing", desc: "3-7 Years", multiplier: "7-10x" },
                                        { id: "evergreen", label: "Evergreen", desc: "> 7 Years", multiplier: "12-18x" },
                                    ].map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setData({ ...data, catalogAge: type.id })}
                                            className={`flex flex-col items-center gap-2 rounded-2xl border p-6 text-center transition-all ${data.catalogAge === type.id
                                                    ? "border-shamiso-gold-bright bg-shamiso-gold/10 text-white"
                                                    : "border-white/5 bg-white/[0.02] text-neutral-400 hover:border-white/10 hover:bg-white/[0.04]"
                                                }`}
                                        >
                                            <span className="text-lg font-black uppercase">{type.label}</span>
                                            <span className="text-xs">{type.desc}</span>
                                            <Badge variant="secondary" className="mt-2 bg-white/10 text-[10px] font-bold uppercase tracking-tighter">{type.multiplier}</Badge>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-between">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setStep(1)}
                                        className="text-neutral-400 hover:text-white"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Button>
                                    <Button
                                        onClick={() => setStep(3)}
                                        size="lg"
                                        className="bg-shamiso-gold-bright px-8 font-black uppercase text-black hover:scale-105 transition-transform"
                                    >
                                        Calculate Valuation
                                        <Zap className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-10 animate-in fade-in zoom-in duration-700">
                                <div className="text-center">
                                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                                        <ShieldCheck className="h-10 w-10" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tight">Valuation Report</h3>
                                    <p className="mt-2 text-neutral-400 uppercase text-xs font-bold tracking-widest">Asset optimized for the Sovereign Corridor.</p>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <Card className="border-white/5 bg-white/[0.02] p-8">
                                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Legacy Market Value</p>
                                        <div className="mt-2 text-4xl font-black text-neutral-300">
                                            ${valuation.marketValue.toLocaleString()}
                                        </div>
                                        <p className="mt-2 text-[10px] text-red-500 font-bold uppercase">Subject to 30% US Withholding Leak</p>
                                    </Card>

                                    <Card className="relative overflow-hidden border-shamiso-gold-bright bg-shamiso-gold/5 p-8 shadow-2xl shadow-shamiso-gold/20">
                                        <div className="absolute top-0 right-0 -mr-4 -mt-4 rotate-12 bg-shamiso-gold-bright px-8 py-1 text-[10px] font-black uppercase text-black">
                                            Recaptured
                                        </div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-shamiso-gold-bright">Sovereign Asset Value</p>
                                        <div className="mt-2 text-4xl font-black text-white">
                                            ${valuation.sovereignValue.toLocaleString()}
                                        </div>
                                        <p className="mt-2 text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Tax Alpha & Institutional Multiple Applied</p>
                                    </Card>
                                </div>

                                <div className="rounded-2xl border border-shamiso-gold/20 bg-shamiso-gold/10 p-8 text-center">
                                    <p className="text-sm font-bold uppercase tracking-widest text-shamiso-gold-bright mb-2">The Multiplier Effect</p>
                                    <h4 className="text-2xl font-black text-white uppercase leading-tight">
                                        SMD unlocks <span className="text-emerald-500">${valuation.lift.toLocaleString()}</span> in hidden equity.
                                    </h4>
                                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                        <Button
                                            size="lg"
                                            className="bg-shamiso-gold-bright px-10 py-6 text-base font-black uppercase text-black shadow-xl shadow-shamiso-gold/30 hover:scale-105 transition-transform"
                                        >
                                            RECLAIM YOUR ASSET NOW
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setStep(1)}
                                            size="lg"
                                            className="border-white/20 text-white hover:bg-white/5"
                                        >
                                            RESET ENGINE
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
