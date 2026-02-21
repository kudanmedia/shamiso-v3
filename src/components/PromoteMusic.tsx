import { Button } from "@/components/ui/button";
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

const services = [
    {
        category: "FUNDING",
        items: [
            {
                name: "Beatbread",
                description: "Advances from $1K to $5M — Keep your masters",
                icon: DollarSign,
                href: "https://shamisomusic.chordcash.com/",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
        ],
    },
    {
        category: "PROMOTE MUSIC",
        items: [
            {
                name: "Feature.fm (Coming Soon)",
                description: "Smart Links & Pre-Saves",
                icon: Share2,
                href: "#",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            {
                name: "Song Tools",
                description: "Artist growth toolkit",
                icon: Music,
                href: "https://amplifiedpro.songtools.io/",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            {
                name: "un:hurd",
                description: "The #1 marketing tool for artists. Automated Ads & Playlist pitching.",
                icon: Volume2,
                href: "https://www.unhurdmusic.com/p/shamiso",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            {
                name: "Groover",
                description: "Pitch your music to playlists, blogs, & labels",
                icon: Radio,
                href: "https://www.groover.co/en/?utm_source=Indirect&utm_medium=partner&utm_campaign=shamiso_music",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            {
                name: "Rotor Videos",
                description: "Create high-quality music videos in minutes",
                icon: Video,
                href: "https://rotorvideos.com/shamiso",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            // {
            //     name: "SymphonyOS — The AdBox (Coming Soon)",
            //     description: "Automated music advertising",
            //     icon: Megaphone,
            //     href: "#",
            //     color: "text-shamiso-gold-bright",
            //     borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
            //     bgColor: "bg-shamiso-gold/5",
            // },
        ],
    },
    {
        category: "AI MIXING",
        items: [
            {
                name: "ROEX Mix Check Studio",
                description: "Free automated mix analysis",
                icon: Headphones,
                href: "https://mixcheckstudio.roexaudio.com/?via=07431b",
                color: "text-shamiso-gold-bright",
                borderColor: "border-shamiso-gold/20 hover:border-shamiso-gold/50",
                bgColor: "bg-shamiso-gold/5",
            },
            {
                name: "ROEX AUTOMIX",
                description: "AI-powered mixing & mastering",
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0800] to-black" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-shamiso-gold-bright">
                        Your Toolkit
                    </p>
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Fund. Promote.{" "}
                        <span className="gradient-text">Create.</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Access world-class tools via our partner ecosystem. One landing
                        page, every service you need.
                    </p>
                </div>


                {/* Service categories */}
                <div className="space-y-12">
                    {services.map((category) => (
                        <div key={category.category}>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="h-px flex-1 bg-gradient-to-r from-shamiso-gold/30 to-transparent" />
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-shamiso-gold/60">
                                    {category.category}
                                </span>
                                <div className="h-px flex-1 bg-gradient-to-l from-shamiso-gold/30 to-transparent" />
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
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-shamiso-gold to-shamiso-gold-bright">
                            <LogIn className="h-8 w-8 text-black" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">
                            Distribution Portal
                        </h3>
                        <p className="mb-6 text-sm text-muted-foreground">
                            Already a Shamiso artist? Access your dashboard, analytics, and
                            royalties.
                        </p>
                        <a href="https://portal.shamiso-music.com" target="_blank" rel="noopener noreferrer">
                            <Button
                                size="lg"
                                className="w-full bg-gradient-to-r from-shamiso-gold to-shamiso-gold-bright font-bold text-black shadow-lg shadow-shamiso-gold/20 transition-all hover:shadow-shamiso-gold/40"
                            >
                                <Sparkles className="mr-2 h-5 w-5" />
                                Login to Distribution Portal
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
