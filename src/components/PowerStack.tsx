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
        subtitle: "CAPITAL",
        description:
            "Access non-dilutive funding from $1k to $5M. Keep 100% of your masters. Institutional capital backed by your data.",
        cta: "Unlock Funding",
        href: "https://shamisomusic.chordcash.com",
        gradient: "from-emerald-500/20 to-emerald-900/5",
        iconColor: "text-emerald-400",
        borderColor: "hover:border-emerald-500/40",
        features: ["Up to $5 Million", "Keep 100% Masters", "Automated Repayment"]
    },
    {
        icon: Zap,
        title: "AI Growth Engine",
        subtitle: "GROWTH",
        description:
            "Let AI find your fans on TikTok & Spotify. Automated playlisting and ad-targeting in the SSA-UK-USA corridor.",
        cta: "Scale My Growth",
        href: "/#promote",
        gradient: "from-blue-500/20 to-blue-900/5",
        iconColor: "text-blue-400",
        borderColor: "hover:border-blue-500/40",
        features: ["Spotify Playlisting", "TikTok Ad Auto-Pilot", "Fan Data Analytics"]
    },
    {
        icon: Mic2,
        title: "AI Studio Suite",
        subtitle: "STUDIO",
        description:
            "Grammy-quality AI Mixing & Mastering. Professional sound optimized for global streaming standards.",
        cta: "Master My Track",
        href: "/#promote",
        gradient: "from-purple-500/20 to-purple-900/5",
        iconColor: "text-purple-400",
        borderColor: "hover:border-purple-500/40",
        features: ["AI Mastering", "Stem Separation", "-14 LUFS Standards"]
    },
    {
        icon: Video,
        title: "MUSIC VIDEO CREATOR",
        subtitle: "VISUALISE",
        description:
            "Make music videos, promo videos, Spotify canvas videos and lyric videos in minutes.",
        cta: "Online Music Video Creation",
        href: "https://rotorvideos.com/shamiso",
        gradient: "from-pink-500/20 to-pink-900/5",
        iconColor: "text-pink-400",
        borderColor: "hover:border-pink-500/40",
        features: ["Visualizers", "Lyric videos", "Spotify Canvas"]
    },
    {
        icon: Share2,
        title: "Direct-To-Fan",
        subtitle: "SELL",
        description:
            "Sell music directly to fans before global release. Keep 100% of your data and revenue with our integrated Even™ engine.",
        cta: "Start Your D2C Campaign",
        href: "https://portal.shamiso-music.com",
        gradient: "from-orange-500/20 to-orange-900/5",
        iconColor: "text-orange-400",
        borderColor: "hover:border-orange-500/40",
        features: ["Early access sales", "Collect fan emails", "Instant payouts"]
    },
];

export function PowerStack() {
    return (
        <section id="services" className="relative py-24 overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright">
                        THE SHAMISO MUSIC DISTRIBUTION POWER STACK (Music-as-a-Service)
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl">
                        Everything You Need <span className="gradient-text">to Win</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        We don&apos;t just distribute your music. We fund your career, find your fans, create music videos and polish your sound.
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
