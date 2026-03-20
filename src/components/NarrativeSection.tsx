"use client";

import { Badge } from "@/components/ui/badge";

export function NarrativeSection() {
    return (
        <section className="relative py-24 bg-black overflow-hidden border-y border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(141,111,18,0.05),transparent_70%)]" />
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-8">
                    <Badge variant="outline" className="border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-[0.3em] px-4 py-1">
                        The Friction Paradox
                    </Badge>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
                    Globally Streamed. <br />
                    <span className="text-shamiso-gold-bright">Locally Underbanked.</span>
                </h2>
                
                <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-light">
                    Most artists are held back by <span className="text-white font-bold">&quot;The Friction Paradox&quot;</span>—globally streamed but locally underbanked, overtaxed, and delayed by 45-day payout cycles. The Sovereign Stack removes these hurdles, turning metadata into momentum and streams into instant liquidity.
                </p>
                
                <div className="mt-16 flex justify-center gap-12 opacity-30 grayscale">
                    {/* Placeholder for trusted partners/infrastructure logos */}
                    <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse" />
                    <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse" />
                    <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse" />
                    <div className="h-8 w-24 bg-neutral-700 rounded animate-pulse" />
                </div>
            </div>
        </section>
    );
}
