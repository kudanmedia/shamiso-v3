import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PartnerRedirect } from "@/components/PartnerRedirect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Network, Music2, ExternalLink } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { getPartnerLinks } from "@/lib/server/partner-links";

export const metadata: Metadata = {
    title: "Symphony OS | Artist Operating Intelligence | Shamiso",
    description: "Connect your artist operations and campaign workflows with Symphony OS through Shamiso.",
};

export default async function SymphonyPage() {
    const links = await getPartnerLinks();

    return (
        <div className="min-h-screen bg-black text-white">
            <StructuredData
                type="service"
                serviceName="Symphony OS"
                serviceDescription="Operational intelligence for artist campaign execution and release workflows."
                serviceUrl={`${process.env.NEXT_PUBLIC_SITE_URL || "https://shamiso.com"}/services/symphony`}
            />
            <PartnerRedirect partnerUrl={links.symphonyOs} />
            <Header />
            <main className="pt-32 pb-24">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl space-y-6 mb-12">
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400 uppercase tracking-widest px-4 py-1 bg-blue-500/5">
                            Symphony OS
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95]">
                            Run Campaigns With
                            <span className="text-blue-400"> Operational Precision</span>
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            Symphony OS unifies planning, execution, and team coordination for release workflows.
                        </p>
                        <Link href={links.symphonyOs} target="_blank">
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-widest">
                                Open Symphony OS
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Bot, title: "Workflow Automation", desc: "Reduce manual campaign coordination with connected playbooks." },
                            { icon: Network, title: "Team Alignment", desc: "Keep artists, managers, and partners aligned on rollout milestones." },
                            { icon: Music2, title: "Release Ops", desc: "Track campaign readiness and execute release tasks in one place." },
                        ].map((item) => (
                            <div key={item.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
                                <item.icon className="h-6 w-6 text-blue-400 mb-4" />
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
