import { PartnerRedirect } from "@/components/PartnerRedirect";
import { getPartnerLinks } from "@/lib/server/partner-links";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
    Target,
    Users,
    BarChart3,
    DollarSign,
    Target as TargetIcon,
    Zap,
    TrendingUp,
    CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Song Tools Promotion | One-Click Music Growth | Shamiso Music Distribution",
    description: "Automate your digital ads and playlisting for just $10/day. Reach real fans across TikTok, Instagram, and more with Song Tools on Shamiso.",
};

const features = [
    {
        title: "Automated Ad Campaigns",
        description: "Launch beautiful, effective ads on TikTok, Instagram, and Facebook in seconds. No Ad Manager experience required.",
        icon: Target,
        color: "text-green-500",
        bgColor: "bg-green-500/10"
    },
    {
        title: "Algorithmic Playlisting",
        description: "We match your track to our community of 150,000+ pre-vetted curators for authentic listener growth.",
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    {
        title: "Total Budget Control",
        description: "Start at just $10/day and cancel anytime. You decide the budget; our AI handles the optimization.",
        icon: DollarSign,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10"
    },
    {
        title: "Real-Time VYBE Insights",
        description: "See exactly how your campaigns translate into listeners, followers, and saves across all major platforms.",
        icon: BarChart3,
        color: "text-shamiso-gold-bright",
        bgColor: "bg-shamiso-gold/10"
    }
];

export default async function SongToolsPage() {
    const links = await getPartnerLinks();
    return (
        <div className="min-h-screen bg-black text-white">
            <PartnerRedirect partnerUrl={links.songtools} />
            <Header />

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <Badge variant="outline" className="border-green-500/30 text-green-400 uppercase tracking-widest px-4 py-1 bg-green-500/5">
                                    One-Click Music Promotion
                                </Badge>
                                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                                    Reach Real <span className="text-green-500">Fans,</span> <br /> Fast.
                                </h1>
                                <p className="text-xl text-neutral-400 leading-relaxed max-w-xl">
                                    Distribution is just the beginning. Automate the complex world of digital ads and playlisting for just <span className="text-white font-bold">$10/day</span>.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link href={links.songtools} target="_blank">
                                    <Button size="lg" className="bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest h-16 px-10 rounded-2xl shadow-xl shadow-green-600/20 transition-all hover:scale-105">
                                        <Zap className="mr-2 h-5 w-5 fill-current" />
                                        Launch Promotion
                                    </Button>
                                </Link>
                                <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                                    Used by 100,000+ Independent Artists
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-900">
                                <div>
                                    <div className="text-3xl font-black text-white">2M+</div>
                                    <div className="text-[10px] uppercase tracking-widest text-neutral-500">Playlist Placements</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-white">150K+</div>
                                    <div className="text-[10px] uppercase tracking-widest text-neutral-500">Vetted Curators</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500/10 blur-[100px] rounded-full opacity-30" />
                            <div className="relative rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl p-8 overflow-hidden animate-pulse-glow">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                                            <TrendingUp className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">Current Campaign</div>
                                            <div className="text-sm font-bold">VYBE Engine Scaling</div>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-600/20 text-green-500 border-none">Active</Badge>
                                </div>

                                <div className="space-y-6">
                                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[65%] animate-[shimmer_2s_infinite]" />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { l: "Reach", v: "14.2K" },
                                            { l: "Saves", v: "842" },
                                            { l: "ROI", v: "3.4x" }
                                        ].map(stat => (
                                            <div key={stat.l} className="text-center">
                                                <div className="text-xs text-neutral-500 uppercase font-bold">{stat.l}</div>
                                                <div className="text-lg font-black text-white">{stat.v}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-zinc-800 flex justify-center">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                                                {i}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="ml-4 flex flex-col justify-center">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-green-500">Live Growth</div>
                                        <div className="text-xs text-neutral-400">Artists scaling now</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="bg-zinc-900/10 py-24 border-y border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black uppercase mb-4 tracking-tight">The Growth Stack</h2>
                            <p className="text-neutral-400 max-w-2xl mx-auto">Everything you need to turn listeners into superfans.</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature) => (
                                <div key={feature.title} className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 hover:border-green-500/30 transition-all hover:translate-y-[-4px]">
                                    <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6`}>
                                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                    </div>
                                    <h3 className="text-lg font-black mb-3 uppercase tracking-tight leading-tight">{feature.title}</h3>
                                    <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Impact Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black uppercase leading-[1.1]">Why This Matters <br /> for <span className="text-green-500">SMD Artists.</span></h2>
                            <p className="text-neutral-400 leading-relaxed italic border-l-2 border-green-500 pl-6">
                                &apos;The difference between a track that flops and a track that explodes is often just visibility. We&apos;re giving every artist the keys to the kingdom.&apos;
                            </p>
                            <div className="space-y-4">
                                {[
                                    "No bots. Only 100% verified human listeners.",
                                    "Direct algorithmic feed integration.",
                                    "Daily budget flexibility — start/stop anytime.",
                                    "Industry-leading 3.2x average ROI for SMD users."
                                ].map(text => (
                                    <div key={text} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                                        </div>
                                        <span className="text-sm font-medium">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-zinc-800 bg-linear-to-br from-zinc-900 to-black p-12 text-center">
                            <h3 className="text-2xl font-bold uppercase mb-4">Launch Your First VYBE</h3>
                            <p className="text-neutral-400 mb-8 text-sm leading-relaxed">
                                Join 100,000+ artists who have moved past passive distribution into active promotion. Your fans are waiting. Go find them.
                            </p>
                            <Link href={links.songtools} target="_blank">
                                <Button size="lg" className="w-full bg-white text-black hover:bg-neutral-200 font-black uppercase tracking-widest h-16 rounded-2xl">
                                    Start Promoting at $10/Day
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
