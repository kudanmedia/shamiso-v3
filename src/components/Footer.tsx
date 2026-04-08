import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Shield, Globe, Lock, Linkedin, Twitter, Instagram, Music } from "lucide-react";

const aboutShamiso = [
    { label: "About Us", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Our 30-Year Heritage", href: "/about#heritage" },
    { label: "Partners (beatBread, Mogul, Verto FX)", href: "/about#partners" },
];

const legalTrust = [
    { label: "Terms of Use", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Tax & W-8BEN Support", href: "/support/tax" },
];

const contact = [
    { label: "Support Center", href: "/support" },
    { label: "Office: Sandton, South Africa", href: "#" },
    { label: "Office: West Orange, NJ, USA", href: "#" },
];

export function Footer() {
    return (
        <footer className="border-t border-shamiso-gold/10 bg-black">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-3">
                    {/* Column 1: About Shamiso */}
                    <div className="space-y-8">
                        <div>
                            <Link href="/" className="inline-block mb-6">
                                <Image
                                    src="/SiteLogo.svg"
                                    alt="Shamiso Music Distribution"
                                    width={160}
                                    height={38}
                                    className="h-8 w-auto"
                                />
                            </Link>
                            <p className="max-w-xs text-sm leading-relaxed text-neutral-400 mb-6">
                                The Sovereign Music Investment Infrastructure & MaaS Architecture for the Global South.
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-shamiso-gold-bright">
                                About Shamiso
                            </h3>
                            <ul className="space-y-4">
                                {aboutShamiso.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-400 transition-colors hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Column 2: Legal & Trust */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-shamiso-gold-bright">
                            Legal & Trust
                        </h3>
                        <ul className="space-y-4">
                            {legalTrust.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-neutral-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-shamiso-gold-bright">
                            Contact
                        </h3>
                        <ul className="space-y-4 mb-8">
                            {contact.map((link) => (
                                <li key={link.label}>
                                    {link.href !== "#" ? (
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-400 transition-colors hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <span className="text-sm text-neutral-400">
                                            {link.label}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                        
                        <div className="flex gap-4">
                            <a href="https://www.linkedin.com/company/shamiso-music-distribution/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-shamiso-gold hover:bg-shamiso-gold hover:text-black transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com/MusicShamiso" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-shamiso-gold hover:bg-shamiso-gold hover:text-black transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://www.instagram.com/shamiso_music_distribution?igsh=bjJsZDBsaXJjNnFz" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-shamiso-gold hover:bg-shamiso-gold hover:text-black transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://soundcloud.com/shamisomusic" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-zinc-900 flex items-center justify-center text-shamiso-gold hover:bg-shamiso-gold hover:text-black transition-colors">
                                <Music className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <Separator className="my-10 bg-shamiso-gold/10" />

                {/* Compliance Badges */}
                {/* Compliance Footer */}
                <div className="mb-12 text-center">
                    <p className="mx-auto max-w-4xl text-[10px] leading-relaxed text-neutral-500">
                        Shamiso is a fintech and digital infrastructure provider, not a bank. Capital services and funding are provided via institutional partners. All payment and remittance services are facilitated through regulated FSPs and entities authorized by the SARB, FCA, and relevant US regulators.
                    </p>
                    <p className="mx-auto mt-4 max-w-4xl text-[10px] leading-relaxed text-neutral-500">
                        Asset Disclosure: Music catalogs are alternative assets; capital is at risk. Projections are estimates and not guaranteed. Funding is subject to technical assessment.
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
                    <p className="text-xs text-muted-foreground/60">
                        © {new Date().getFullYear()} Shamiso Music Group. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
