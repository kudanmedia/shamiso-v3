import { Button } from "@/components/ui/button";
import {
    Shield,
    TrendingUp,
    FileText,
    BadgeCheck,
    ArrowRight,
} from "lucide-react";

export function ComplianceTrust() {
    return (
        <section className="relative py-24">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0800] to-black" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-shamiso-gold-bright">
                        Institutional Grade. Artist Driven.
                    </p>
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Compliance &{" "}
                        <span className="gradient-text">Trust</span>
                    </h2>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Save 30% card */}
                    <div className="glass-card group overflow-hidden rounded-2xl border border-shamiso-gold/20 p-8 transition-all hover:border-shamiso-gold/40">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-shamiso-gold/10">
                            <TrendingUp className="h-7 w-7 text-shamiso-gold-bright" />
                        </div>
                        <h3 className="mb-3 text-2xl font-extrabold text-white">
                            Save{" "}
                            <span className="gradient-text">30%</span> on US Tax
                        </h3>
                        <p className="mb-6 leading-relaxed text-muted-foreground">
                            Don&apos;t lose 30% of your US royalties to withholding tax. Our
                            sovereign structure ensures your money stays where it belongs —
                            with you. It&apos;s not a discount, it&apos;s your right.
                        </p>
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-3xl font-extrabold text-shamiso-gold-bright">
                                    $0
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Withholding on US Royalties
                                </p>
                            </div>
                            <div className="h-12 w-px bg-shamiso-gold/20" />
                            <div>
                                <p className="text-3xl font-extrabold text-shamiso-gold-bright">
                                    100%
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Your Masters. Your Right.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Institutional Report card */}
                    <div className="glass-card group overflow-hidden rounded-2xl border border-shamiso-gold/15 p-8 transition-all hover:border-shamiso-gold/35">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-shamiso-gold/10">
                            <FileText className="h-7 w-7 text-shamiso-gold-bright" />
                        </div>
                        <h3 id="maas" className="mb-3 text-xl font-bold text-white uppercase tracking-tight">
                            The Institutional MaaS Report
                        </h3>
                        <p className="mb-2 text-sm font-medium text-shamiso-gold-bright">
                            Sovereign Infrastructure for the African Creator Economy
                        </p>
                        <p className="mb-6 text-sm leading-relaxed text-muted-foreground/80">
                            Download our comprehensive whitepaper on the transition to Music-as-a-Service,
                            cross-border liquidity models, and institutional metadata taxonomies.
                        </p>
                        <Button
                            variant="outline"
                            className="border-shamiso-gold/30 text-muted-foreground transition-all hover:border-shamiso-gold-bright hover:text-shamiso-gold-bright"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Download MaaS Report
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Trust badges */}
                <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            icon: Shield,
                            title: "FCA Regulated (UK)",
                            desc: "Institutional financial rails",
                        },
                        {
                            icon: Shield,
                            title: "ISO 27001",
                            desc: "Global security standard",
                        },
                        {
                            icon: BadgeCheck,
                            title: "SARB Compliant",
                            desc: "South African Reserve Bank standards",
                        },
                        {
                            icon: BadgeCheck,
                            title: "Merlin Member",
                            desc: "Institutional-grade rights advocacy",
                        },
                    ].map((badge) => (
                        <div
                            key={badge.title}
                            className="flex items-start gap-3 rounded-xl border border-shamiso-gold/10 bg-white/[0.02] p-4 transition-colors hover:border-shamiso-gold/25"
                        >
                            <badge.icon className="h-5 w-5 shrink-0 text-shamiso-gold-bright" />
                            <div>
                                <p className="text-sm font-semibold text-white">
                                    {badge.title}
                                </p>
                                <p className="text-xs text-muted-foreground">{badge.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
