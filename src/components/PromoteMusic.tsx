"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
    DollarSign,
    ShieldCheck,
    Globe,
    Zap,
    Video,
    Mic2,
    Radio,
    MapPin,
    ArrowRight,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

const pillars = [
    {
        id: "finance",
        title: "Pillar 1: Finance & Protection",
        subtitle: "(The Founder Layer)",
        focus: "Wealth creation and capital access.",
        items: [
            {
                name: "Non-Dilutive Funding",
                description: "Access music loans from $1K to $10M+ via beatBread. Keep your masters while fueling your tour or next studio session.",
                cta: "Claim My Funding",
                href: "/services/funding",
                icon: DollarSign,
                color: "text-emerald-400",
                bgColor: "bg-emerald-500/10",
                borderColor: "border-emerald-500/20"
            },
            {
                name: "Royalty Recovery & Tax Optimization",
                description: "Use Mogul to find missing global revenue and automate your 30% US tax recapture.",
                cta: "Audit My Royalties",
                href: "/services/mogul",
                icon: ShieldCheck,
                color: "text-emerald-400",
                bgColor: "bg-emerald-500/10",
                borderColor: "border-emerald-500/20"
            }
        ],
        gridSpan: "lg:col-span-2"
    },
    {
        id: "marketing",
        title: "Pillar 2: Marketing & Discovery",
        subtitle: "(The Fan Layer)",
        focus: "Turning data into a global audience.",
        items: [
            {
                name: "Unified Smartlinks",
                description: "High-performance landing pages for every release via feature.fm. Capture fan data before they even hit \"Play.\"",
                cta: "Build My Smartlink",
                href: "/services/feature-fm",
                icon: Globe,
                color: "text-blue-400",
                bgColor: "bg-blue-500/10",
                borderColor: "border-blue-500/20"
            },
            {
                name: "Algorithmic Promotion",
                description: "Automated digital ads and Spotify playlisting through Song Tools.",
                cta: "Boost My Streams",
                href: "/services/songtools",
                icon: Zap,
                color: "text-blue-400",
                bgColor: "bg-blue-500/10",
                borderColor: "border-blue-500/20"
            }
        ],
        gridSpan: "lg:col-span-2"
    },
    {
        id: "production",
        title: "Pillar 3: Production & Content",
        subtitle: "(The Studio Layer)",
        focus: "Ensuring the product meets global standards.",
        items: [
            {
                name: "Visualizer Lab",
                description: "Auto-generate music videos, Spotify Canvas visuals, and high-impact social clips in seconds.",
                cta: "Generate My Visuals",
                href: "/services/roex",
                icon: Video,
                color: "text-purple-400",
                bgColor: "bg-purple-500/10",
                borderColor: "border-purple-500/20"
            },
            {
                name: "Mix Check Studio",
                description: "AI-powered technical feedback on your frequency balance and dynamics to ensure radio-ready sound.",
                cta: "Check My Mix",
                href: "/services/roex",
                icon: Mic2,
                color: "text-purple-400",
                bgColor: "bg-purple-500/10",
                borderColor: "border-purple-500/20"
            }
        ],
        gridSpan: "lg:col-span-2"
    },
    {
        id: "connections",
        title: "Pillar 4: Connections & Live",
        subtitle: "(The Stage Layer)",
        focus: "Breaking the digital bubble into real-world influence.",
        items: [
            {
                name: "Direct Curator Outreach",
                description: "Send your music to top DJs and influencers with guaranteed feedback via Groover.",
                cta: "Reach Curators",
                href: "/services/groover",
                icon: Radio,
                color: "text-orange-400",
                bgColor: "bg-orange-500/10",
                borderColor: "border-orange-500/20"
            },
            {
                name: "Fan-Demand Touring",
                description: "Use Toorly's data-driven platform to book shows where your fans actually live.",
                cta: "Plan My Tour",
                href: "/services/toorly",
                icon: MapPin,
                color: "text-orange-400",
                bgColor: "bg-orange-500/10",
                borderColor: "border-orange-500/20"
            }
        ],
        gridSpan: "lg:col-span-2"
    }
];

export function PromoteMusic() {
    return (
        <section id="sovereign-suite" className="relative py-24 bg-zinc-950 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.05),transparent_50%)]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-20 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-[0.3em] px-6 py-1">
                        The Shamiso Sovereign Stack
                    </Badge>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl mb-6">
                        Four Pillars of <span className="gradient-text">Sovereignty</span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg text-neutral-400 font-light">
                        The infrastructure of the modern mogule. Each pillar represents an Integrated Inflection Point—a hand-selected partner tool designed to solve a specific barrier to growth.
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <p className="text-2xl font-bold text-shamiso-gold-bright uppercase tracking-widest">One Login. One Ecosystem.</p>
                        <p className="text-lg text-white font-medium">Total Sovereignty for the modern artist and label. Non-dilutive funding up to $10M.</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {pillars.map((pillar) => (
                        <div key={pillar.id} className={`${pillar.gridSpan} flex flex-col gap-6`}>
                            <div className="flex flex-col gap-2 mb-2">
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">
                                    {pillar.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-shamiso-gold-bright uppercase tracking-widest">{pillar.subtitle}</span>
                                    <div className="h-px flex-1 bg-white/5" />
                                </div>
                                <p className="text-xs text-neutral-500 uppercase font-bold">{pillar.focus}</p>
                            </div>

                            <div className="grid gap-6 h-full">
                                {pillar.items.map((item) => (
                                    <div
                                        key={item.name}
                                        className={`group relative flex flex-col justify-between rounded-3xl border ${item.borderColor} bg-zinc-900/40 p-8 transition-all hover:bg-zinc-900/60 overflow-hidden`}
                                    >
                                        <div className="relative z-10">
                                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${item.bgColor} ${item.color} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                                                <item.icon className="h-7 w-7" />
                                            </div>
                                            <h4 className="mb-3 text-xl font-bold text-white group-hover:text-shamiso-gold-bright transition-colors">
                                                {item.name}
                                            </h4>
                                            <p className="mb-8 text-sm text-neutral-400 leading-relaxed font-light">
                                                {item.description}
                                            </p>
                                        </div>

                                        <div className="relative z-10 mt-auto">
                                            <Link href={item.href}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full border-white/10 hover:border-shamiso-gold-bright hover:bg-shamiso-gold-bright hover:text-black transition-all font-bold uppercase text-xs tracking-widest"
                                                >
                                                    {item.cta}
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>

                                        {/* Background Decoration */}
                                        <div className={`absolute -bottom-12 -right-12 h-48 w-48 rounded-full ${item.bgColor} blur-3xl opacity-0 transition-opacity group-hover:opacity-40`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trusted By Scroll Bar Placeholder */}
                <div className="mt-32 pt-16 border-t border-white/5">
                    <p className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500 mb-12">Trusted Infrastructure Partners</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col items-center gap-2">
                             <img src="/beatbread.svg" alt="beatBread" className="h-6 w-auto brightness-0 invert" />
                        </div>

                        <div className="flex flex-col items-center gap-2">
                             <span className="text-xl font-black text-white/40 tracking-tighter italic">VERTO FX</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                             <img src="/paystack-2.svg" alt="Verto" className="h-6 w-auto brightness-0 invert opacity-50" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
