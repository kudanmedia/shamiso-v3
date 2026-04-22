"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function FoundersLetter() {
    return (
        <section className="relative py-24 bg-black overflow-hidden border-t border-white/5">
            {/* Subtle high-end background effects */}
            <div className="absolute inset-0 bg-[#0a0a0a]" />
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-shamiso-gold/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-shamiso-gold/10 to-transparent" />
            
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Portrait Column */}
                    <div className="lg:col-span-5 space-y-8 sticky top-32">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-shamiso-gold/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 grayscale-[0.5] hover:grayscale-0 transition-all duration-700 shadow-2xl shadow-black">
                                <Image
                                    src="/images/gilbert_muvavarirwa_portrait.png"
                                    alt="Gilbert Muvavarirwa - Founder & CEO"
                                    fill
                                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <p className="text-2xl font-black uppercase tracking-tight text-white">Gilbert Muvavarirwa</p>
                            <p className="text-shamiso-gold-bright font-bold uppercase tracking-[0.2em] text-xs">Founder & CEO, Shamiso Music Group</p>
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-6">
                            <Badge variant="outline" className="border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-[0.3em] px-4 py-1">
                                Statement of Intent
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.9]">
                                The End of <br />
                                <span className="text-shamiso-gold-bright">The Extraction Era.</span>
                            </h2>
                        </div>

                        <div className="space-y-8 text-neutral-300">
                            <div className="space-y-6 text-xl md:text-2xl font-light leading-relaxed italic text-white/90">
                                <p>To the Architects of the SSA Sound.</p>
                                <p>
                                    For too long, the African music story has been one of <span className="font-bold text-shamiso-gold-bright">The Miracle and The Leak.</span> For too long, the global music industry has treated the African and emerging market creator as an afterthought.
                                </p>
                            </div>

                            <div className="space-y-6 text-lg leading-relaxed font-light">
                                <p>
                                    The Miracle is you. In studios from Soweto to Lagos, and Nairobi to Accra, you’ve built a sound that has conquered the world’s dancefloors. You’ve turned the log drum into a global pulse.
                                </p>
                                
                                <p>
                                    But behind the billions of streams, there is a silent, systemic failure. When you use a Western distributor, you aren&apos;t just uploading music; you are entering an <span className="text-white font-medium uppercase tracking-wider">Extraction Engine.</span>
                                </p>

                                <div className="bg-white/5 border-l-2 border-shamiso-gold p-8 my-10 rounded-r-2xl italic">
                                    <p className="text-xl text-white font-medium">
                                        The industry&apos;s &quot;Dirty Secret&quot; is the 40% Leakage.
                                    </p>
                                    <p className="mt-4 text-sm text-neutral-400">
                                        Between 30% US Withholding Tax and unfavorable exchange rates, the emerging market artist is paying a &quot;tax on talent&quot; that their Western counterparts never see.
                                    </p>
                                </div>

                                <p>
                                    We didn&apos;t build a distribution company. We built a <span className="text-white font-bold">Central Bank for the Creator.</span> We built institutional-grade financial rails that respect your sovereignty, secure your wealth, and ensure that for every 100 Rand or Naira you earn, you keep 100.
                                </p>

                                <p className="text-2xl font-black text-white uppercase tracking-tight pt-8 leading-[0.9]">
                                    This is the House of Shamiso. <br /><br />
                                    <span className="text-shamiso-gold-bright uppercase tracking-tighter">Welcome to the Sovereign Era.</span>
                                </p>
                            </div>

                            <div className="pt-12">
                                {/* Placeholder for a digital signature approach or a nice script font */}
                                <div className="text-4xl font-serif text-shamiso-gold-bright italic opacity-80">
                                    Gilbert Muvavarirwa
                                </div>
                                <Separator className="w-24 h-px bg-shamiso-gold/30 mt-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
