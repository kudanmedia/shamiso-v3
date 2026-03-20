"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Music2, Disc, Play, Zap, Globe } from "lucide-react";

const genres = [
    {
        name: "Lekompo",
        description: "South Africa's authentic home-grown sound, scaling globally.",
        href: "/distribute-lekompo",
        cta: "Distribute Lekompo",
        icon: Disc,
        gradient: "from-orange-500/20 to-red-600/20",
        border: "border-orange-500/30",
    },
    {
        name: "3-Step",
        description: "The evolution of the beat, leading the new wave of dance.",
        href: "/distribute-3-step",
        cta: "Distribute 3-Step",
        icon: Play,
        gradient: "from-blue-500/20 to-indigo-600/20",
        border: "border-blue-500/30",
    },
    {
        name: "Amapiano",
        description: "The global soundtrack born in the streets of South Africa.",
        href: "/distribute-amapiano",
        cta: "Distribute Amapiano",
        icon: Zap,
        gradient: "from-yellow-500/20 to-amber-600/20",
        border: "border-yellow-500/30",
    },
    {
        name: "Afro House / Maskandi",
        description: "Deep rhythmic pulses and cultural heritage imagery.",
        href: "/distribute-afro-house",
        cta: "Distribute Now",
        icon: Globe,
        gradient: "from-emerald-500/20 to-teal-600/20",
        border: "border-emerald-500/30",
    },
];

export function StrategicGenres() {
    return (
        <section id="choose-your-sound" className="relative py-24 bg-black overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold/5 blur-[120px]" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold/5 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest">
                        Strategic Genre Hubs
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl">
                        Tailored Distribution for <span className="gradient-text">Africa&apos;s Leading Sounds</span>
                    </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {genres.map((genre) => (
                        <Link
                            key={genre.name}
                            href={genre.href}
                            className={`group relative flex flex-col overflow-hidden rounded-3xl border ${genre.border} bg-zinc-900/40 p-8 transition-all duration-500 hover:scale-[1.02] hover:bg-zinc-900/60`}
                        >
                            {/* Vibe Background Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${genre.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800/80 group-hover:bg-zinc-700/80 transition-colors">
                                    <genre.icon className="h-7 w-7 text-shamiso-gold transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
                                </div>
                                
                                <h3 className="mb-3 text-2xl font-black text-white uppercase tracking-tight">
                                    {genre.name}
                                </h3>
                                
                                <p className="mb-8 text-sm text-neutral-400 leading-relaxed">
                                    {genre.description}
                                </p>
                                
                                <div className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-shamiso-gold-bright group-hover:text-white transition-colors">
                                    {genre.cta}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-2" />
                                </div>
                            </div>

                            {/* Corner Glow */}
                            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-shamiso-gold/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
