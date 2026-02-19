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
    { label: "Promote Music", href: "#promote" },
    { label: "Funding Advances", href: "https://shamisomusic.chordcash.com/" },
    { label: "Pricing", href: "/pricing" },
    { label: "Partners", href: "#promote" },
    { label: "Terms of Use", href: "#terms" },
];

const services = [
    { label: "Beatbread (Funding)", href: "https://shamisomusic.chordcash.com/" },
    { label: "Feature:FM", href: "https://developers.feature.fm/" },
    { label: "Groover", href: "https://www.groover.co/en/?utm_source=Indirect&utm_medium=partner&utm_campaign=shamiso_music" },
    { label: "ROEX (Coming Soon)", href: "#" },
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
                            The Sovereign Music Investment Infrastructure & MaaS Architecture for the Global South: A Fintech led & Data Intelligence Ecosystem uniting the SSA, UK, and USA Creative Corridors.
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
                {/* Compliance Footer */}
                <div className="mb-12 text-center">
                    <p className="mx-auto max-w-4xl text-[10px] leading-relaxed text-neutral-500">
                        Shamiso Music Group (Pty) Ltd and its subsidiaries (collectively &quot;Shamiso&quot;) are financial technology and digital infrastructure providers. Shamiso is not a bank. Investment and Capital Infrastructure services (including Advances and Funding) are powered by Beatbread and other institutional capital partners. Payment and Remittance services are facilitated through regulated partners including Stitch (Pty) Ltd, Paystack, and Mukuru, which are authorized Financial Services Providers (FSPs) and/or regulated by the South African Reserve Bank (SARB), the Financial Conduct Authority (UK), and relevant authorities in the USA.
                    </p>
                    <p className="mx-auto mt-4 max-w-4xl text-[10px] leading-relaxed text-neutral-500">
                        Capital at Risk. Music catalogs are alternative assets. Future earnings and valuation projections are estimates based on historical data and are not guaranteed. Any funding provided is subject to technical eligibility and credit assessment.
                    </p>
                    <p className="mx-auto mt-4 max-w-4xl text-[10px] leading-relaxed text-neutral-500 font-bold uppercase">
                        Data Protection: Compliant with the AU Malabo Convention. SOC2 Type II & ISO 27001 Certified.
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
