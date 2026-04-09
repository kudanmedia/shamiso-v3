import type { Metadata } from "next";
import { PartnerRedirect } from "@/components/PartnerRedirect";
import { PARTNER_LINKS } from "@/lib/partner-links";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
    Zap, 
    Target, 
    BarChart3, 
    Users, 
    Globe, 
    TrendingUp,
    CheckCircle2,
    Music,
    Mic2,
    ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "un:hurd music | Automated Music Promotion | Shamiso Music Distribution",
    description: "Automated music promotion and custom marketing pages. Grow your audience with data-driven campaigns via un:hurd on Shamiso.",
};

const features = [
    {
        title: "Automated Promotion",
        description: "Launch targeted ad campaigns across social media and streaming platforms with just a few clicks.",
        icon: Zap,
    },
    {
        title: "Data-Driven Insights",
        description: "Get actionable advice based on your music's performance data to identify your next best move.",
        icon: BarChart3,
    },
    {
        title: "Artist Marketing Pages",
        description: "Professional landing pages that capture fan data and drive conversions for your latest releases.",
        icon: Globe,
    },
    {
        title: "Growth Roadmap",
        description: "A customized plan to help you reach new milestones, from your first 1,000 streams to global tours.",
        icon: TrendingUp,
    }
];

export default function UnhurdPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <PartnerRedirect partnerUrl={PARTNER_LINKS.unhurd} />
            <Header />
            
            <main className="pt-32 pb-24 text-white">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full -z-10" />
                    
                    <div className="text-center space-y-8 max-w-4xl mx-auto">
                        <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 uppercase tracking-widest px-4 py-1 bg-indigo-500/5">
                            Automated Artist Growth
                        </Badge>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.85]">
                            Scale Your <br />
                            <span className="text-indigo-500">Reach Instantly.</span>
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                            The music industry is complex. un:hurd makes it simple by automating your marketing and providing a clear path to growth.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/signup">
                                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest h-16 px-10 rounded-2xl">
                                    Start Promoting Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Multi-Column Feature Grid */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-32">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((f, idx) => (
                            <div key={f.title} className="p-8 rounded-[32px] bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <f.icon className="w-6 h-6 text-indigo-500" />
                                </div>
                                <h3 className="text-lg font-bold uppercase mb-3">{f.title}</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed">{f.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-zinc-950 py-24 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-24 items-center">
                            <div className="space-y-8">
                                <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">
                                    Stop Guessing. <br />
                                    <span className="text-indigo-500">Start Growing.</span>
                                </h2>
                                <p className="text-lg text-neutral-400 leading-relaxed">
                                    un:hurd analyzes your data across Spotify, Apple Music, and social media to tell you exactly where to spend your budget for maximum impact.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "Automated Ads on TikTok, Instagram, and Facebook",
                                        "Pitching to Playlists and Radio at Scale",
                                        "Data-Driven Marketing Strategy",
                                        "Custom Fan-Engagement Pages"
                                    ].map(item => (
                                        <div key={item} className="flex items-center gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-indigo-500" />
                                            <span className="font-bold text-sm uppercase tracking-wider">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-600/20 blur-[100px] rounded-full" />
                                <div className="relative rounded-[40px] border border-white/10 overflow-hidden bg-zinc-900 aspect-square flex items-center justify-center p-12">
                                    <ExternalLink className="w-32 h-32 text-indigo-500/20 absolute -right-8 -bottom-8 rotate-12" />
                                    <div className="text-center space-y-6">
                                        <div className="text-6xl font-black text-indigo-500">100K+</div>
                                        <div className="text-sm font-bold uppercase tracking-widest text-neutral-500">Artists Empowered Globally</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black uppercase">Ready to be <span className="text-indigo-500">Heard?</span></h2>
                        <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-medium">
                            Claim your un:hurd dashboard through Shamiso and start your journey to 1 million streams today.
                        </p>
                        <Link href="/signup">
                            <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-black uppercase tracking-widest h-16 px-12 rounded-2xl">
                                Join the Movement
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
