import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Share2, Download, MessageCircle, Twitter, Instagram, Globe } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Welcome to Shamiso | Your Sound is Now Borderless",
    description: "Your release has been successfully submitted to our global review team.",
};

export default function WelcomeArtistPage() {
    return (
        <div className="relative min-h-[calc(100vh-4rem)] pt-24 pb-20 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0c0a00] via-[#1a1400] to-[#0d0800] -z-20" />
            <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-shamiso-gold/10 blur-[150px] -z-10" />
            <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px] -z-10" />

            {/* Subtle golden grid */}
            <div
                className="absolute inset-0 opacity-[0.03] -z-10"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,215,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.4) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 z-10">

                {/* Section 1: The Affirmation */}
                <div className="text-center mb-16 animate-in slide-in-from-bottom-8 duration-700 ease-out fade-in">
                    <div className="mx-auto w-20 h-20 mb-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>

                    <Badge variant="outline" className="mb-6 border-shamiso-gold/30 bg-shamiso-gold/10 text-shamiso-gold-bright tracking-widest uppercase py-1 px-4">
                        Upload Successful
                    </Badge>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
                        Your Sound is Now <span className="gradient-text">Borderless</span> 🌍
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
                        Great work! Your release has been successfully submitted to our global review team. We're currently preparing your music for over <strong className="text-white">150+ digital stores</strong>, from Spotify in London to Apple Music in Luanda.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Section 2: The Social Proof */}
                    <div className="md:col-span-7 bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md animate-in slide-in-from-bottom-12 duration-700 delay-150 ease-out fade-in">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-shamiso-gold/20">
                                <Globe className="w-5 h-5 text-shamiso-gold-bright" />
                            </div>
                            <h2 className="text-2xl font-bold text-white tracking-tight">Tell the world you've joined the movement.</h2>
                        </div>

                        <p className="text-neutral-400 mb-8">Share your momentum with your fans right now to build anticipation before your release day.</p>

                        <div className="space-y-4">
                            {/* Instagram Share Option */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Instagram className="w-4 h-4 text-pink-500" />
                                            <span className="text-white font-semibold text-sm">Instagram Stories</span>
                                        </div>
                                        <p className="text-xs text-neutral-300 italic mb-4 bg-black/30 p-3 rounded-lg border border-white/5">
                                            "Just submitted my new fire to @MusicShamiso. Global takeover loading... 🚀🎶 #SMDRise #AfricanMusicGlobal"
                                        </p>
                                    </div>
                                </div>
                                <Button className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold h-12">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Copy & Share to Stories
                                </Button>
                            </div>

                            {/* TikTok Share Option */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#ff0050]" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                                            <span className="text-white font-semibold text-sm">TikTok & Reels</span>
                                        </div>
                                        <p className="text-xs text-neutral-400 mb-4">
                                            Download a 5-second video clip of the SMD logo "pulse" with text: <span className="text-white">Music Distributed by Shamiso</span> to use as a greenscreen or background.
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full border-shamiso-gold/50 text-shamiso-gold-bright hover:bg-shamiso-gold/10 hover:text-shamiso-gold-bright h-12">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Success Overlay
                                </Button>
                            </div>

                            {/* X / Twitter Share Option */}
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Twitter className="w-4 h-4 text-blue-400" />
                                            <span className="text-white font-semibold text-sm">X (Twitter)</span>
                                        </div>
                                        <p className="text-xs text-neutral-300 italic mb-4 bg-black/30 p-3 rounded-lg border border-white/5">
                                            "My music is officially crossing borders. Shoutout to @MusicShamiso for the seamless global distribution. Watch this space! 🌍🔥"
                                        </p>
                                    </div>
                                </div>
                                <Button className="w-full bg-black border border-white/20 hover:bg-white/10 text-white font-bold h-12">
                                    <Twitter className="w-4 h-4 mr-2" />
                                    Post to X
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: The Community "Retention" Moat */}
                    <div className="md:col-span-5 h-full">
                        <div className="sticky top-24 bg-linear-to-b from-[#112411] to-black border border-emerald-500/30 rounded-2xl p-8 backdrop-blur-md h-full flex flex-col justify-between animate-in slide-in-from-bottom-12 duration-700 delay-300 ease-out fade-in">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Exclusive Access
                                </div>

                                <h3 className="text-3xl font-black text-white leading-tight mb-4 uppercase">
                                    Join the SMD<br /><span className="text-emerald-500">Inner Circle.</span>
                                </h3>

                                <p className="text-neutral-300 text-sm leading-relaxed mb-8">
                                    Don't wait for your royalty report to start growing. Join our Exclusive WhatsApp Community to get a direct line to our team and other top-tier artists.
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "Weekly Algorithmic Trigger tips.",
                                        "Early access to Collabo Engineering opportunities.",
                                        "Direct support from the SMD A&R team."
                                    ].map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                                            <span className="text-sm font-medium text-white">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8">
                                <Link href="/whatsapp-group" className="block w-full">
                                    <Button className="w-full bg-[#25D366] hover:bg-[#1fb355] text-black font-black uppercase tracking-wide h-14 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] transition-all hover:scale-[1.02]">
                                        <MessageCircle className="w-5 h-5 mr-3" />
                                        Join The WhatsApp Community
                                    </Button>
                                </Link>
                                <div className="mt-4 text-center">
                                    <Link href="https://portal.shamiso-music.com" className="text-neutral-400 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-1">
                                        Or return to dashboard <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
