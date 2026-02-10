"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const genrePills = [
    { label: "Lekompo", href: "/distribute-lekompo" },
    { label: "3-Step", href: "/distribute-3-step" },
    { label: "Afro House", href: "/distribute-lekompo#afro-house" },
    { label: "Maskandi", href: "/distribute-maskandi" },
    { label: "Amapiano", href: "#" },
];

const trustPartners = [
    "Paystack",
    "Too Lost",
    "Merlin",
    "Beatbread",
    "TikTok",
    "Apple Music",
    "Spotify",
    "Deezer",
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
                        {/* Live ticker */}
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-shamiso-gold/25 bg-shamiso-gold/5 px-4 py-2 backdrop-blur-sm shadow-lg shadow-shamiso-gold/5">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-shamiso-gold-bright opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-shamiso-gold-bright" />
                            </span>
                            <span className="text-xs font-medium text-shamiso-gold-bright">
                                LIVE
                            </span>
                            <span className="text-xs text-neutral-400">
                                Total Payouts Last 24h:
                            </span>
                            <span className="text-xs font-bold text-white">
                                $1,450,890 USD
                            </span>
                        </div>

                        {/* H1 */}
                        <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                            Your Masters.<br />
                            Your Money.
                            <br />
                            <span className="gradient-text">Your Sovereignty.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl">
                            The Sovereign Home for Amapiano, 3-Step, Lekompo &amp; Afro House.
                            <br />
                            <strong className="text-white">Save 30% on US Tax</strong> and Get{" "}
                            <strong className="text-shamiso-gold-bright">Non-Dilutive Funding</strong>{" "}
                            up to <strong className="text-white">$5M</strong>.
                        </p>

                        {/* CTAs */}
                        <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="bg-shamiso-gold-bright px-10 py-6 text-base font-black uppercase text-black shadow-xl shadow-shamiso-gold/30 transition-all hover:shadow-shamiso-gold-bright/50 hover:scale-105 hover:brightness-110"
                            >
                                Join Shamiso
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-white/80 px-10 py-6 text-base font-bold uppercase text-white transition-all hover:bg-white/10 hover:border-white"
                            >
                                Check Funding Eligibility
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
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
                                <span
                                    key={`${partner}-${i}`}
                                    className="text-sm font-medium text-neutral-500 transition-colors hover:text-shamiso-gold-bright"
                                >
                                    {partner === "Paystack" && "💳 "}
                                    {partner === "Too Lost" && "🎵 "}
                                    {partner === "Merlin" && "🛡️ "}
                                    {partner === "Beatbread" && "🍞 "}
                                    {partner === "TikTok" && "🎬 "}
                                    {partner === "Apple Music" && "🎧 "}
                                    {partner === "Spotify" && "🎶 "}
                                    {partner === "Deezer" && "🎤 "}
                                    {partner}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
