import type { Metadata } from "next";
import { PartnerRedirect } from "@/components/PartnerRedirect";
import { PARTNER_LINKS } from "@/lib/partner-links";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
    Headphones, 
    Zap, 
    BarChart, 
    Shield, 
    Music, 
    CheckCircle2,
    Play,
    Settings,
    Layers,
    DollarSign,
    Globe,
    ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Roex x Shamiso | Your Sound, Globalized | Shamiso Music Distribution",
    description: "AI-powered studio suite for the modern creator. Master your tracks and perfect your sound with Roex on Shamiso.",
};

export default function RoexPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <Header />
            
            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
                    
                    <div className="space-y-6 max-w-4xl mx-auto">
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400 uppercase tracking-widest px-4 py-1 bg-blue-500/5">
                            Shamiso x Roex Partnership
                        </Badge>
                        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-none">
                            Your Sound, <br /> 
                            <span className="text-blue-500 italic">Globalized.</span>
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                            Roex is a powerhouse of sonic innovation. By partnering with Shamiso Music Distribution, we ensure your music doesn&apos;t just sit on a hard drive - it reaches every corner of the globe with precision, transparency, and style.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-4 pt-8">
                            <Link href={PARTNER_LINKS.automix} target="_blank" className="group p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-blue-500/30 transition-all text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Zap className="h-24 w-24 text-blue-500" />
                                </div>
                                <h3 className="text-2xl font-black uppercase mb-2">Automix</h3>
                                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">Studio-quality AI mastering optimized for global streaming standards.</p>
                                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12">
                                    Start Mastering
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            
                            <Link href={PARTNER_LINKS.mixCheckStudio} target="_blank" className="group p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 hover:border-blue-500/30 transition-all text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <BarChart className="h-24 w-24 text-blue-500" />
                                </div>
                                <h3 className="text-2xl font-black uppercase mb-2">Mix Check Studio</h3>
                                <p className="text-sm text-neutral-400 mb-6 leading-relaxed">AI-powered feedback on your frequency balance, stereo width, and dynamics.</p>
                                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold h-12">
                                    Check Your Mix
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Core Value Pillars */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-900">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                                <Globe className="w-7 h-7 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">🚀 Distribution Without Borders</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                We take your tracks to 450+ digital stores and streaming platforms, including Spotify, Apple Music, Deezer, and Boomplay.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-tight">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Keep 100% of Your Rights
                                </li>
                                <li className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-tight">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Fast-Track Delivery
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                                <DollarSign className="w-7 h-7 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">💰 Monetize Your Craft</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                Roex and Shamiso don&apos;t just &quot;upload&quot; music; we manage your career&apos;s financial ecosystem.
                            </p>
                            <div className="bg-zinc-900/40 rounded-2xl border border-white/5 overflow-hidden">
                                <div className="grid grid-cols-2 text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-white/5 p-3">
                                    <div>Feature</div>
                                    <div>What You Get</div>
                                </div>
                                <div className="p-3 space-y-2">
                                    <div className="grid grid-cols-2 text-xs">
                                        <div className="font-bold">Content ID</div>
                                        <div className="text-neutral-400">Earn on YouTube</div>
                                    </div>
                                    <div className="grid grid-cols-2 text-xs">
                                        <div className="font-bold">Sync</div>
                                        <div className="text-neutral-400">Film & TV Ops</div>
                                    </div>
                                    <div className="grid grid-cols-2 text-xs">
                                        <div className="font-bold">Payouts</div>
                                        <div className="text-neutral-400">Monthly Reports</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                                <Zap className="w-7 h-7 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tight">🎨 The Roex Creative Edge</h3>
                            <p className="text-neutral-400 leading-relaxed italic">
                                &quot;Music is more than sound; it&apos;s a movement. We provide the infrastructure so you can focus on the art.&quot;
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-tight">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Custom Smart Links
                                </li>
                                <li className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-tight">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Playlist Pitching
                                </li>
                                <li className="flex items-center gap-3 text-sm font-bold text-white uppercase tracking-tight">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Cover Art Support
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="text-center py-24 bg-linear-to-b from-transparent to-blue-900/10 border-b border-zinc-900">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Ready to Release?</h2>
                    <p className="text-lg text-neutral-400 mb-10 max-w-2xl mx-auto">
                        Don&apos;t let your masters collect digital dust. Join the Roex family on Shamiso Music Distribution and start your journey toward global recognition today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={PARTNER_LINKS.roex} target="_blank">
                            <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-black uppercase tracking-widest h-16 px-12 rounded-2xl">
                                Get Started Now
                            </Button>
                        </Link>
                        <div className="flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-neutral-500">
                            <Link href="/pricing" className="hover:text-blue-400 transition-colors">View Pricing</Link>
                            <Link href="/support" className="hover:text-blue-400 transition-colors">Support</Link>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
