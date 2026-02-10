import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Shield, Globe, Lock } from "lucide-react";

const solutions = [
    { label: "Distribute Lekompo", href: "/distribute-lekompo" },
    { label: "Distribute 3-Step", href: "/distribute-3-step" },
    { label: "Distribute Maskandi", href: "/distribute-maskandi" },
    { label: "Distribute Afro House", href: "/distribute-lekompo#afro-house" },
];

const quickLinks = [
    { label: "Distribute Music", href: "#services" },
    { label: "Promote Music", href: "#partners" },
    { label: "Funding Advances", href: "https://shamisomusic.chordcash.com/" },
    { label: "Partners", href: "#partners" },
    { label: "Terms of Use", href: "#terms" },
];

const services = [
    { label: "Beatbread (Funding)", href: "https://shamisomusic.chordcash.com/" },
    { label: "Feature:FM", href: "https://developers.feature.fm/" },
    { label: "Groover", href: "https://www.groover.co/en/?utm_source=Indirect&utm_medium=partner&utm_campaign=shamiso_music" },
    { label: "ROEX (AI Mixing)", href: "#" },
    { label: "Roto Videos", href: "https://rotorvideos.com/shamiso" },
    { label: "Song Tools", href: "https://amplifiedpro.songtools.io/" },
];

export function Footer() {
    return (
        <footer className="border-t border-shamiso-gold/10 bg-black">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/">
                            <Image
                                src="/SiteLogo.svg"
                                alt="Shamiso Music Distribution"
                                width={160}
                                height={38}
                                className="h-8 w-auto"
                            />
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            The Sovereign Distributor for African Music. Distribution,
                            Fintech, and AI-Driven Infrastructure for the SSA-UK Corridor.
                        </p>
                        <p className="text-xs text-muted-foreground/60">
                            South Africa, Zimbabwe, Nigeria, USA, Ghana, Tanzania, Eswatini,
                            Zambia, Botswana, DRC & Congo Brazzaville.
                        </p>
                    </div>

                    {/* Solutions */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-shamiso-gold-bright">
                            Solutions
                        </h3>
                        <ul className="space-y-3">
                            {solutions.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-shamiso-gold-bright">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-shamiso-gold-bright">
                            Services
                        </h3>
                        <ul className="space-y-3">
                            {services.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="text-sm text-muted-foreground transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <Separator className="my-10 bg-shamiso-gold/10" />

                {/* Compliance Badges */}
                <div className="mb-8 flex flex-wrap items-center justify-center gap-6 md:gap-10">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="h-4 w-4 text-shamiso-gold-bright" />
                        <span className="text-xs font-medium">FCA Regulated</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4 text-shamiso-gold-bright" />
                        <span className="text-xs font-medium">GDPR Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="h-4 w-4 text-shamiso-gold-bright" />
                        <span className="text-xs font-medium">SOC2 Certified</span>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
                    <p className="text-xs text-muted-foreground/60">
                        © {new Date().getFullYear()} Shamiso Music Group. All rights
                        reserved.
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                        Powered by{" "}
                        <span className="font-medium text-muted-foreground">Too Lost</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
