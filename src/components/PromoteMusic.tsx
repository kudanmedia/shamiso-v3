import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
    DollarSign,
    Megaphone,
    Share2,
    Volume2,
    Video,
    Headphones,
    Music,
    Radio,
    Sparkles,
    LogIn,
} from "lucide-react";
import { FAQ } from "@/components/FAQ";

const services = [
    {
        category: "FINANCE",
        items: [
            {
                name: "Sovereign Capital Vault",
                description: "Non-dilutive funding from $1K to $5M — Keep your masters",
                icon: DollarSign,
                href: "https://shamisomusic.chordcash.com/",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
        ],
    },
    {
        category: "MARKETING",
        items: [
            {
                name: "Sovereign Growth Engine",
                description: "Integrated campaign links and automated fan-finding ad technology.",
                icon: Volume2,
                href: "https://unhurd-staging.webflow.io/p/shamiso",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            {
                name: "Pre-Save & Smartlink Suite",
                description: "Integrated campaign links for every release within your dashboard.",
                icon: Share2,
                href: "#",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            {
                name: "Fan Data Analytics",
                description: "Comprehensive artist growth insights and corridor data intelligence.",
                icon: Music,
                href: "https://amplifiedpro.songtools.io/",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
        ],
    },
    {
        category: "PROMOTION",
        items: [
            {
                name: "Curator Pitch Portal",
                description: "Direct outreach to top curators with access to Mr Luu's Editorial Desk.",
                icon: Radio,
                href: "https://www.groover.co/en/?utm_source=Indirect&utm_medium=partner&utm_campaign=shamiso_music",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            {
                name: "Visualizer Lab",
                description: "Auto-generate music videos, promo clips, and Spotify Canvas visuals.",
                icon: Video,
                href: "https://rotorvideos.com/shamiso",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
        ],
    },
    {
        category: "PRODUCTION",
        items: [
            {
                name: "AI Audio Auditor",
                description: "Automated mix analysis for global -14 LUFS standards.",
                icon: Headphones,
                href: "https://mixcheckstudio.roexaudio.com/?via=07431b",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            {
                name: "AI Master Lab",
                description: "Cloud-based AI mixing & high-performance mastering engine.",
                icon: Headphones,
                href: "https://automix.roexaudio.com/?via=06e63a",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
        ],
    },
];

export function PromoteMusic() {
    return (
        <section id="promote" className="relative py-24">
            <div className="absolute inset-0 bg-linear-to-b from-[#0a0800] to-black" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest">
                        Unified Creative Infrastructure
                    </Badge>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
                        The <span className="gradient-text">Sovereign Stack</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        Stop juggling 10 different subscriptions. The Sovereign Stack integrates the world&apos;s most powerful creative and financial tools into a single, high-performance dashboard. One login. One ecosystem. Total control.
                    </p>
                </div>


                {/* Service categories */}
                <div className="space-y-12">
                    {services.map((category) => (
                        <div key={category.category}>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-linear-to-r from-shamiso-gold/30 to-transparent" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-shamiso-gold/60">
                                    {category.category}
                                </span>
                                <div className="h-px flex-1 bg-linear-to-l from-shamiso-gold/30 to-transparent" />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {category.items.map((service) => (
                                    <a
                                        key={service.name}
                                        href={service.href}
                                        target={service.href.startsWith("http") ? "_blank" : undefined}
                                        rel={service.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className={`glass-card group flex w-full max-w-full items-center gap-4 rounded-xl border ${service.borderColor} ${service.bgColor} p-4 sm:p-5 transition-all duration-300 overflow-hidden`}
                                    >
                                        <div
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-shamiso-surface/80 ${service.color}`}
                                        >
                                            <service.icon className="h-6 w-6" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-base font-semibold text-white">
                                                {service.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {service.description}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Distribution Portal Login */}
                <div className="mt-16 flex flex-col items-center">
                    <div className="glass-card animate-pulse-glow w-full max-w-md rounded-2xl border border-shamiso-gold/20 p-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-shamiso-gold to-shamiso-gold-bright">
                            <LogIn className="h-8 w-8 text-black" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">
                            Distribution Portal
                        </h3>
                        <p className="mb-6 text-sm text-muted-foreground">
                            Already a Shamiso artist? Access your dashboard, analytics, and
                            royalties.
                        </p>
                        <a href="https://portal.shamiso-music.com/signup">
                            <Button
                                size="lg"
                                className="w-full bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright font-bold text-black shadow-lg shadow-shamiso-gold/20 transition-all hover:shadow-shamiso-gold/40"
                            >
                                <Sparkles className="mr-2 h-5 w-5" />
                                Sign Up for Distribution Portal
                            </Button>
                        </a>
                    </div>
                </div>
            </div>

            <FAQ />
        </section>
    );
}
