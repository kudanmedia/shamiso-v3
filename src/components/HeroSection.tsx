"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Fingerprint, TrendingUp } from "lucide-react";

const genrePills = [
    { label: "Lekompo", href: "/distribute-lekompo" },
    { label: "3-Step", href: "/distribute-3-step" },
    { label: "Maskandi", href: "/distribute-maskandi" },
    { label: "Afro House", href: "/distribute-lekompo#afro-house" },
];

const trustPartners = [
    { name: "Paystack", logo: "/paystack-2.svg" },
    { name: "Too Lost", logo: "/logo.png" },
    { name: "Merlin", logo: null },
    { name: "Beatbread", logo: "/beatbread.svg" },
    { name: "TikTok", logo: "/tiktok-logo-2--1.svg" },
    { name: "Apple Music", logo: "/apple-music-3.svg" },
    { name: "Spotify", logo: "/spotify-2.svg" },
    { name: "Deezer", logo: "/deezer-new-logo.svg" },
    { name: "Groover", logo: "/Groover_Logo_Main_White.png" },
    { name: "Roto", logo: "/rotor-logo-full-white-4a612660f893ff6eccba4f8e79769d01de704cf49d875e40c57041c9f77b421a.svg" },
];

export function HeroSection() {
    return (
        <section className="relative min-h-screen overflow-hidden pt-16">
            {/* Rich layered background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a00] via-[#1a1400] to-[#0d0800]" />

            {/* Gold ambient glow - top right */}
            <div className="absolute -top-32 -right-32 h-[700px] w-[700px] rounded-full bg-shamiso-gold-bright/10 blur-[150px]" />
            {/* Gold ambient glow - bottom left */}
            <div className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-shamiso-gold/8 blur-[120px]" />
            {/* Warm center glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-amber-900/15 blur-[100px]" />

            {/* Subtle golden grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,215,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.4) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Radial vignette for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(141,111,18,0.15),rgba(124,61,54,0.1),transparent_50%)]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-20">
                    <div className="max-w-4xl">
                        {/* System Ticker */}
                        <div className="mb-12 inline-flex items-center gap-6 rounded-full border border-shamiso-gold/20 bg-shamiso-gold/5 px-6 py-2.5 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Live System Ticker</span>
                            </div>
                            <div className="h-4 w-px bg-shamiso-gold/20" />
                            <div className="flex gap-4 overflow-hidden text-xs font-medium text-shamiso-gold-bright">
                                <span className="flex items-center gap-1.5 whitespace-nowrap">
                                    USD/ZAR 19.12 <TrendingUp className="h-3 w-3 text-emerald-500" />
                                </span>
                                <span className="flex items-center gap-1.5 whitespace-nowrap">
                                    USD/NGN 1,450.00 <TrendingUp className="h-3 w-3 text-emerald-500" />
                                </span>
                                <div className="h-4 w-px bg-shamiso-gold/10" />
                                <span className="whitespace-nowrap font-bold text-white">RECAPTURED: $14.2M</span>
                            </div>
                        </div>

                        {/* H1 */}
                        <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                            The Global Financial Bridge<br />
                            <span className="gradient-text">For African Music.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
                            Stop losing 30% of your US royalties to foreign taxes. Claim your sovereignty with Africa&apos;s first institutional-grade music investment infrastructure.
                        </p>

                        {/* CTAs */}
                        <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                            <Link href="/signup">
                                <Button
                                    size="lg"
                                    className="bg-shamiso-gold-bright px-10 py-6 text-base font-black uppercase text-black shadow-xl shadow-shamiso-gold/30 transition-all hover:shadow-shamiso-gold-bright/50 hover:scale-105 hover:brightness-110"
                                >
                                    <Fingerprint className="mr-2 h-5 w-5" />
                                    RECLAIM YOUR 30% NOW
                                </Button>
                            </Link>
                            <Link href="#valuation">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white/80 px-10 py-6 text-base font-bold uppercase text-white transition-all hover:bg-white/10 hover:border-white"
                                >
                                    VIEW CATALOG VALUATION
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        {/* Genre Pills */}
                        <div className="mb-12">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-500">
                                Specializing in
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {genrePills.map((pill) => (
                                    <Link key={pill.label} href={pill.href}>
                                        <Badge
                                            variant="outline"
                                            className="cursor-pointer border-shamiso-gold/30 bg-shamiso-gold/8 px-4 py-1.5 text-sm font-medium text-shamiso-gold-bright transition-all hover:border-shamiso-gold-bright hover:bg-shamiso-gold/20 hover:shadow-md hover:shadow-shamiso-gold/10"
                                        >
                                            {pill.label}
                                        </Badge>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Trust partners ticker */}
                    <div className="w-full overflow-hidden rounded-xl border border-shamiso-gold/15 bg-black/40 py-4 backdrop-blur-md">
                        <div className="flex animate-ticker items-center gap-12 whitespace-nowrap">
                            {[...trustPartners, ...trustPartners].map((partner, i) => (
                                <div
                                    key={`${partner.name}-${i}`}
                                    className="flex items-center justify-center opacity-50 transition-opacity hover:opacity-100 grayscale hover:grayscale-0"
                                >
                                    {partner.logo ? (
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className={`w-auto object-contain ${(partner.name === "Spotify" || partner.name === "TikTok") ? "" : "brightness-0 invert"
                                                } ${partner.name === "Groover"
                                                    ? "h-16 max-w-[180px]"
                                                    : "h-10 max-w-[140px]"
                                                }`}
                                        />
                                    ) : (
                                        <span className="text-xl font-bold text-white/40 hover:text-white transition-colors">
                                            {partner.name}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
