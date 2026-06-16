import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PartnerRedirect } from "@/components/PartnerRedirect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clapperboard, Sparkles, ExternalLink, WandSparkles } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { getPartnerLinks } from "@/lib/server/partner-links";

export const metadata: Metadata = {
    title: "Rotor Visualizer Lab | Video Assets for Releases | Shamiso",
    description: "Create music videos, promo clips, and Spotify Canvas visuals with Rotor through Shamiso.",
};

export default async function RotorPage() {
    const links = await getPartnerLinks();

    return (
        <div className="min-h-screen bg-black text-white">
            <StructuredData
                type="service"
                serviceName="Rotor Visualizer Lab"
                serviceDescription="Music videos, promo clips, and Spotify Canvas visual generation."
                serviceUrl={`${process.env.NEXT_PUBLIC_SITE_URL || "https://shamiso.com"}/services/rotor`}
            />
            <PartnerRedirect partnerUrl={links.rotor} />
            <Header />
            <main className="pt-32 pb-24">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl space-y-6 mb-12">
                        <Badge variant="outline" className="border-sky-500/30 text-sky-400 uppercase tracking-widest px-4 py-1 bg-sky-500/5">
                            Visualizer Lab
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95]">
                            Turn Tracks Into
                            <span className="text-sky-400"> Video Assets</span>
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            Rotor helps you produce high-performing visuals quickly so every release has campaign-ready creative.
                        </p>
                        <Link href={links.rotor} target="_blank">
                            <Button className="bg-sky-600 hover:bg-sky-500 text-white font-bold uppercase tracking-widest">
                                Launch Rotor
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Clapperboard, title: "Music Videos", desc: "Generate videos optimized for YouTube and release campaigns." },
                            { icon: WandSparkles, title: "Promo Clips", desc: "Create short-form promos for social drops and ad creatives." },
                            { icon: Sparkles, title: "Spotify Canvas", desc: "Publish looping visuals that increase profile engagement." },
                        ].map((item) => (
                            <div key={item.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                                <item.icon className="h-6 w-6 text-sky-400 mb-4" />
                                <h2 className="font-bold text-lg mb-2">{item.title}</h2>
                                <p className="text-sm text-neutral-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
