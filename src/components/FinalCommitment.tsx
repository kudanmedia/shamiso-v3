"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Fingerprint } from "lucide-react";

export function FinalCommitment() {
    return (
        <section className="relative py-32 bg-black overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-shamiso-gold/10 blur-[120px] opacity-50" />
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
                    The Infrastructure of the <span className="gradient-text">Modern Mogule.</span>
                </h2>
                
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    Join 100,000+ creators using the Sovereign Stack to bypass the traditional gatekeepers and own their financial future.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/signup">
                        <Button
                            size="lg"
                            className="bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright px-12 py-8 text-lg font-black uppercase text-black shadow-2xl shadow-shamiso-gold/20 transition-all hover:scale-105 hover:shadow-shamiso-gold/40"
                        >
                            <Fingerprint className="mr-3 h-6 w-6" />
                            Enter the Ecosystem
                        </Button>
                    </Link>
                </div>
                
                <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-600">
                    Sovereignty is a choice. Make it today.
                </p>
            </div>
        </section>
    );
}
