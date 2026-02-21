"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Fingerprint, TrendingUp, ShieldCheck } from "lucide-react";

const trustPartners = [
    { name: "TikTok", logo: "/tiktok-logo-2--1.svg" },
    { name: "Apple Music", logo: "/apple-music-3.svg" },
    { name: "Spotify", logo: "/spotify-2.svg" },
    { name: "Deezer", logo: "/deezer-new-logo.svg" },
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
                        {/* Recapture Ticker */}
                        <div className="mb-12 inline-flex items-center gap-6 rounded-full border border-shamiso-gold/20 bg-shamiso-gold/5 px-6 py-2.5 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">Live Recapture Ticker</span>
                            </div>
                            <div className="h-4 w-px bg-shamiso-gold/20" />
                            <div className="flex gap-4 overflow-hidden text-xs font-medium text-shamiso-gold-bright">
                                <span className="flex items-center gap-1.5 whitespace-nowrap">
                                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                                    <span className="font-bold text-white tracking-wide">RECAPTURED FOR ARTISTS: $14.2M</span>
                                </span>
                            </div>
                        </div>

                        {/* H1 */}
                        <h1 className="mb-6 text-4xl font-black leading-[1.1] tracking-tight text-white uppercase sm:text-5xl md:text-6xl lg:text-7xl">
                            Stop Losing 30% of Your Money.<br />
                            <span className="gradient-text">Get Paid Like a Global Star.</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-neutral-300 sm:text-xl font-light">
                            Join Africa&apos;s first institutional music infrastructure. Return your rightful earnings, access funding up to <span className="text-white font-bold">$5 Million</span>, and master your sound with AI—all in one Sovereign Vault.
                        </p>

                        {/* Additional Info */}
                        <div className="mb-10 grid gap-4 sm:grid-cols-2 max-w-2xl">
                            <div className="flex flex-col gap-2 p-4 rounded-xl border border-shamiso-gold/20 bg-shamiso-gold/5">
                                <p className="text-sm font-bold text-white uppercase tracking-tight">Non-Dilutive Funding</p>
                                <p className="text-xs text-neutral-400">Get non dilutive funding up to $5M. Keep 100% of your masters</p>
                                <Link href="https://shamisomusic.chordcash.com" target="_blank">
                                    <Button variant="link" className="p-0 h-auto text-shamiso-gold-bright text-xs font-bold uppercase">
                                        Check funding eligibility <ArrowRight className="ml-1 h-3 w-3" />
                                    </Button>
                                </Link>
                            </div>
                            <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/10 bg-white/5">
                                <p className="text-sm font-bold text-white uppercase tracking-tight">Sovereign Distributor</p>
                                <p className="text-xs text-neutral-400">The Sovereign distributor Lekompo, 3-Step, Afro House, Amapiano</p>
                                <Link href="/#services">
                                    <Button variant="link" className="p-0 h-auto text-white/60 text-xs font-bold uppercase">
                                        View Strategic Genres <ArrowRight className="ml-1 h-3 w-3" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="mb-16 flex flex-col gap-4 sm:flex-row">
                            <Link href="/signup">
                                <Button
                                    size="lg"
                                    className="bg-shamiso-gold-bright px-10 py-7 text-base font-black uppercase text-black shadow-xl shadow-shamiso-gold/30 transition-all hover:shadow-shamiso-gold-bright/50 hover:scale-105 hover:brightness-110 w-full sm:w-auto"
                                >
                                    <Fingerprint className="mr-2 h-5 w-5" />
                                    Reclaim My 30% Now
                                </Button>
                            </Link>
                            <Link href="#valuation">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white/80 px-10 py-7 text-base font-bold uppercase text-white transition-all hover:bg-white/10 hover:border-white w-full sm:w-auto"
                                >
                                    Check My Catalog Value
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Trust partners ticker */}
                    <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-shamiso-gold/60 text-center sm:text-left ml-2">
                            Distribute your songs to over 450 top music streaming stores and platforms
                        </p>
                        <div className="w-full overflow-hidden rounded-xl border border-shamiso-gold/15 bg-black/40 py-6 backdrop-blur-md">
                            <div className="flex animate-ticker items-center gap-12 whitespace-nowrap">
                                {[...trustPartners, ...trustPartners, ...trustPartners, ...trustPartners, ...trustPartners, ...trustPartners].map((partner, i) => (
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
            </div>
        </section >
    );
}
