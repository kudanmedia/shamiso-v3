"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Music2 } from "lucide-react";

const genres = [
    {
        name: "Amapiano",
        description: "The global soundtrack born in the streets of South Africa.",
        href: "/distribute-amapiano",
    },
    {
        name: "Afro House",
        description: "Deep rhythmic pulses connecting tradition with the future.",
        href: "/distribute-afro-house",
    },
    {
        name: "3-Step",
        description: "The evolution of the beat, leading the new wave of dance.",
        href: "/distribute-3-step",
    },
    {
        name: "Lekompo",
        description: "South Africa's authentic home-grown sound, scaling globally.",
        href: "/distribute-lekompo",
    },
    {
        name: "Maskandi",
        description: "The soul of the Zulu tradition, distributed to the world.",
        href: "/distribute-maskandi",
    },
    {
        name: "Afro Tech",
        description: "High-octane electronic energy with a distinctly African soul.",
        href: "/distribute-afro-tech",
    },
];

export function StrategicGenres() {
    return (
        <section id="strategic-genres" className="relative py-24 bg-black">
            <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold/5 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest">
                        Strategic Genre Hubs
                    </Badge>
                    <h2 className="text-4xl font-black text-white uppercase sm:text-5xl">
                        Sovereign <span className="gradient-text">Specialization</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        We provide world-class, specialized distribution infrastructure for Africa&apos;s most influential musical exports.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {genres.map((genre) => (
                        <Link
                            key={genre.name}
                            href={genre.href}
                            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 p-8 transition-all hover:border-shamiso-gold/30 hover:bg-zinc-900/60"
                        >
                            <div className="relative z-10">
                                <Music2 className="mb-4 h-8 w-8 text-shamiso-gold transition-transform group-hover:scale-110" />
                                <h3 className="mb-2 text-xl font-bold text-white uppercase tracking-tight">
                                    {genre.name}
                                </h3>
                                <p className="mb-6 text-sm text-neutral-400 leading-relaxed">
                                    {genre.description}
                                </p>
                                <div className="flex items-center text-xs font-bold uppercase tracking-widest text-shamiso-gold-bright">
                                    Explore Specialist Distribution
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>

                            {/* Subtle hover background decoration */}
                            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-shamiso-gold/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
