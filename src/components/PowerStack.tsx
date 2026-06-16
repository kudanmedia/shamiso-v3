"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Banknote,
    Zap,
    ArrowRight,
    Mic2,
    CheckCircle2,
    Share2,
    Video,
    Landmark,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { usePartnerLinks } from "@/hooks/use-partner-links";
import type { PartnerLinksMap } from "@/lib/partner-links";

const powerCardTemplates = [
    {
        icon: Banknote,
        title: "Funding & Advances",
        subtitle: "FINANCE",
        description:
            "Access non-dilutive funding from $1k to $10M+. Keep 100% of your masters. Partnered with beatBread for data-driven artist advances.",
        cta: "Get Funded",
        href: "/services/funding",
        gradient: "from-emerald-500/20 to-emerald-900/5",
        iconColor: "text-emerald-400",
        borderColor: "hover:border-emerald-500/40",
        features: ["Up to $10 Million+", "Keep 100% Masters", "Artists & Label Tiers", "Institutional Capital"]
    },
    {
        icon: Zap,
        title: "feature.fm Engine",
        subtitle: "MARKETING",
        description:
            "The industry's leading marketing & ad suite. Smart links, audience data, and retargeting pixels to grow your fan connection.",
        cta: "Scale My Growth",
        hrefKey: "featureFm" as const,
        href: "/services/feature-fm",
        gradient: "from-blue-500/20 to-blue-900/5",
        iconColor: "text-blue-400",
        borderColor: "hover:border-blue-500/40",
        features: ["Smart Links & Pre-Saves", "Audience Data", "Retargeting Pixels"]
    },
    {
        icon: Mic2,
        title: "Roex Studio Suite",
        subtitle: "PRODUCTION",
        description:
            "AI-powered mix analysis and professional mastering checks. Ensure your tracks are streaming-ready before the world hears them.",
        cta: "Polish My Sound",
        href: "/services/roex",
        gradient: "from-purple-500/20 to-purple-900/5",
        iconColor: "text-purple-400",
        borderColor: "hover:border-purple-500/40",
        features: ["AI Mix Analysis", "Mastering+ Polish", "Streaming Optimized"]
    },
    {
        icon: Video,
        title: "Visualizer Lab",
        subtitle: "VISUALS",
        description:
            "Auto-generate high-performance music videos, promo clips, and Spotify Canvas visuals in minutes from your dashboard.",
        cta: "Create Visuals",
        href: "/signup",
        gradient: "from-pink-500/20 to-pink-900/5",
        iconColor: "text-pink-400",
        borderColor: "hover:border-pink-500/40",
        features: ["Music Videos", "YouTube Shorts", "Spotify Canvas"]
    },
    {
        icon: Share2,
        title: "Song Tools Promo",
        subtitle: "PROMOTION",
        description:
            "Automated digital ads and algorithmic playlisting. Get label-grade marketing for your releases starting at just $10/day.",
        cta: "Start Promoting",
        hrefKey: "songtools" as const,
        href: "/services/songtools",
        gradient: "from-orange-500/20 to-orange-900/5",
        iconColor: "text-orange-400",
        borderColor: "hover:border-orange-500/40",
        features: ["Automated Ad Campaigns", "Playlist Pitching", "Real-Time Insights"]
    },
    {
        icon: Landmark,
        title: "Mogul Partnerships",
        subtitle: "WEALTH/FINANCE",
        description:
            "Automated tax optimization and wealth management specialized for music creators. Secure your financial future while you build your catalog.",
        cta: "Explore Mogul",
        href: "/services/mogul",
        gradient: "from-amber-500/20 to-amber-900/5",
        iconColor: "text-emerald-400",
        borderColor: "hover:border-emerald-500/40",
        features: ["IRS Compliance", "Tax Optimization", "Wealth Management"]
    },
    {
        icon: MapPin,
        title: "TOORLY Touring",
        subtitle: "TOURING",
        description:
            "Stop guessing where your fans are. Start showing them where you're going. Fan-demand driven touring data to book with certainty.",
        cta: "Request Tour",
        hrefKey: "toorly" as const,
        href: "/services/toorly",
        gradient: "from-sky-500/20 to-sky-900/5",
        iconColor: "text-sky-400",
        borderColor: "hover:border-sky-500/40",
        features: ["Fan-Demand Metrics", "Risk-Free Routing", "Direct Ticket Intent"]
    },
    {
        icon: MapPin,
        title: "Groover Networking",
        subtitle: "NETWORKING",
        description:
            "Connect directly with 3,000+ industry pros. Guaranteed feedback from playlist curators, labels, and blogs in 7 days.",
        cta: "Pitch Industry",
        hrefKey: "groover" as const,
        href: "/services/groover",
        gradient: "from-red-500/20 to-red-900/5",
        iconColor: "text-red-400",
        borderColor: "hover:border-red-500/40",
        features: ["Guaranteed Feedback", "Direct Label Pitching", "Radio & Blogs"]
    },
];

function resolvePowerCards(links: PartnerLinksMap) {
    return powerCardTemplates.map((card) => ({
        ...card,
        href: "hrefKey" in card && card.hrefKey ? links[card.hrefKey] : card.href,
    }));
}

export function PowerStack() {
    const partnerLinks = usePartnerLinks();
    const powerCards = resolvePowerCards(partnerLinks);
    return (
        <section id="sovereign-suite" className="relative py-24 overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest">
                        THE SHAMISO SOVEREIGN SUITE
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl lg:text-6xl">
                        WHY ARTISTS CHOOSE <span className="gradient-text">SHAMISO MUSIC</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400 leading-relaxed font-light">
                        Stop juggling 10 different subscriptions. The Shamiso Sovereign Suite integrates the world&apos;s most powerful creative and financial tools into a single, high-performance dashboard.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
                    {powerCards.map((card) => (
                        <Card
                            key={card.title}
                            className={`glass-card group cursor-pointer border-white/5 bg-gradient-to-b ${card.gradient} ${card.borderColor} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50`}
                        >
                            <CardHeader className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-black/40 ${card.iconColor} shadow-lg ring-1 ring-white/10`}
                                    >
                                        <card.icon className="h-7 w-7" />
                                    </div>
                                    <Badge variant="secondary" className="bg-black/40 text-xs font-bold text-white/70 hover:bg-black/60">
                                        {card.subtitle}
                                    </Badge>
                                </div>

                                <div className="space-y-2">
                                    <CardTitle className="text-2xl font-black text-white uppercase tracking-tight">
                                        {card.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm leading-relaxed text-neutral-400 font-medium">
                                        {card.description}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Feature list */}
                                <ul className="space-y-2">
                                    {card.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wide">
                                            <CheckCircle2 className={`h-3.5 w-3.5 ${card.iconColor}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link href={card.href} className="block">
                                    <Button
                                        className="w-full bg-white/5 hover:bg-white/10 text-white font-bold uppercase border border-white/10 group-hover:border-white/20"
                                    >
                                        {card.cta}
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
