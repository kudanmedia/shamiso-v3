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
    Video
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const powerCards = [
    {
        icon: Banknote,
        title: "Sovereign Capital Vault",
        subtitle: "FINANCE",
        description:
            "Access non-dilutive funding from $1k to $5M. Keep 100% of your masters. Institutional capital backed by your sovereign data.",
        cta: "Unlock Funding",
        href: "https://shamisomusic.chordcash.com",
        gradient: "from-emerald-500/20 to-emerald-900/5",
        iconColor: "text-emerald-400",
        borderColor: "hover:border-emerald-500/40",
        features: ["Up to $5 Million", "Keep 100% Masters", "30% TAX RECLAIM", "Automated Repayment"]
    },
    {
        icon: Zap,
        title: "Sovereign Growth Engine",
        subtitle: "MARKETING",
        description:
            "AI-powered ad-targeting and fan-finding in the SSA → UK → USA → Global corridor. Integrated fan data analytics at your fingertips.",
        cta: "Scale My Growth",
        href: "/#promote",
        gradient: "from-blue-500/20 to-blue-900/5",
        iconColor: "text-blue-400",
        borderColor: "hover:border-blue-500/40",
        features: ["Automated Ad-Pilot", "Global Fan-Finding", "Corridor Analytics"]
    },
    {
        icon: Mic2,
        title: "AI Studio Suite",
        subtitle: "PRODUCTION",
        description:
            "Grammy-quality AI Mixing & Mastering to -14 LUFS global standards. Professional sound optimized for every major streaming platform.",
        cta: "Polish My Sound",
        href: "/#promote",
        gradient: "from-purple-500/20 to-purple-900/5",
        iconColor: "text-purple-400",
        borderColor: "hover:border-purple-500/40",
        features: ["AI Mastering", "Mix Auditing", "LUFS Optimization"]
    },
    {
        icon: Video,
        title: "Visualizer Lab",
        subtitle: "VISUALS",
        description:
            "Auto-generate high-performance music videos, promo clips, and Spotify Canvas visuals in minutes from your dashboard.",
        cta: "Create Visuals",
        href: "https://rotorvideos.com/shamiso",
        gradient: "from-pink-500/20 to-pink-900/5",
        iconColor: "text-pink-400",
        borderColor: "hover:border-pink-500/40",
        features: ["Music Videos", "YouTube Shorts", "Spotify Canvas"]
    },
    {
        icon: Share2,
        title: "Curator Pitch Portal",
        subtitle: "PROMOTION",
        description:
            "Direct access to global curator networks and internal editorial desks. Pitch your music to the world's biggest tastemakers.",
        cta: "Pitch Curators",
        href: "/signup",
        gradient: "from-orange-500/20 to-orange-900/5",
        iconColor: "text-orange-400",
        borderColor: "hover:border-orange-500/40",
        features: ["1.2M+ Subscriber Engines", "YouTube Content ID", "Direct Editorial Access"]
    },
];

export function PowerStack() {
    return (
        <section id="services" className="relative py-24 overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest">
                        THE SOVEREIGN STACK™ (Music-as-a-Service)
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl">
                        Unified Creative <span className="gradient-text">Infrastructure</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        Stop juggling 10 different subscriptions. The Sovereign Stack integrates the world&apos;s most powerful creative and financial tools into a single, high-performance dashboard.
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
