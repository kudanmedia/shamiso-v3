"use client";

import { Check, Crown, Zap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const plans = [
    {
        name: "PRO",
        price: "$19.99",
        period: "/ year",
        description: "For serious indies & DIY artists.",
        features: [
            "100% Streaming Royalties",
            "Priority Delivery (48h)",
            "Advanced Analytics",
            "Sovereign Tax Reclaim",
            "Instant MoMo Payouts",
        ],
        cta: "Go Pro",
        href: "/signup?plan=pro",
        highlight: true,
        icon: Zap,
    },
    {
        name: "LABEL",
        price: "$499",
        period: "/ year",
        description: "For boutique labels & collectives.",
        features: [
            "Unlimited Artists",
            "100% Streaming Royalties",
            "Multi-User Dashboard",
            "Automated Split Pay",
            "Dedicated Account Manager",
            "Custom Label Name",
        ],
        cta: "Launch Label",
        href: "/signup?plan=label",
        highlight: false,
        icon: Building2,
    },
    {
        name: "SOVEREIGN",
        price: "Invite",
        period: "Only",
        description: "For legacy catalogs & viral stars.",
        features: [
            "Institutional Valuations",
            "Catalog Acquisition Ops",
            "Zero Tax Leakage Desk",
            "Global Rights Lobbying",
            "White-Glove Migration",
        ],
        cta: "Request Access",
        href: "mailto:vault@shamiso-music.com",
        highlight: false,
        icon: Crown,
    },
];

export function PricingSection() {
    return (
        <section id="pricing" className="relative py-24 bg-black/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest">
                        The Sovereignty Cost
                    </Badge>
                    <h2 className="text-4xl font-black text-white uppercase sm:text-5xl">
                        Institutional <span className="gradient-text">Pricing</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        Transparent, flat-rate access to Africa&apos;s most powerful financial music infrastructure.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`relative overflow-hidden border-zinc-800 bg-zinc-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${plan.highlight ? "border-shamiso-gold/40 ring-1 ring-shamiso-gold/20 shadow-2xl shadow-shamiso-gold/10" : ""
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 right-0 bg-shamiso-gold-bright px-4 py-1 text-[10px] font-black uppercase text-black rotate-0">
                                    Most Efficient
                                </div>
                            )}

                            <div className="p-8">
                                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${plan.highlight ? "text-shamiso-gold-bright" : "text-neutral-500"}`}>
                                    <plan.icon className="h-6 w-6" />
                                </div>

                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{plan.name}</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-black text-white">{plan.price}</span>
                                    <span className="ml-1 text-sm text-neutral-500">{plan.period}</span>
                                </div>
                                <p className="mt-2 text-sm text-neutral-500">{plan.description}</p>

                                <div className="my-8 h-px bg-white/5" />

                                <ul className="mb-8 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-neutral-300">
                                            <Check className="h-4 w-4 shrink-0 text-shamiso-gold-bright" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link href={plan.href} className="w-full">
                                    <Button
                                        className={`w-full font-black uppercase tracking-tight transition-all hover:scale-[1.02] ${plan.highlight
                                            ? "bg-shamiso-gold-bright text-black shadow-lg shadow-shamiso-gold/20"
                                            : "bg-white/5 text-white hover:bg-white/10"
                                            }`}
                                    >
                                        {plan.cta}
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-neutral-500">
                        Need a custom enterprise solution? <Link href="mailto:vault@shamiso-music.com" className="text-shamiso-gold-bright hover:underline font-bold">Contact our desk</Link>.
                    </p>
                </div>

                {/* Feature Ticker */}
                <div className="mt-20 w-full overflow-hidden rounded-xl border border-shamiso-gold/15 bg-black/40 py-6 backdrop-blur-md">
                    <div className="flex animate-ticker items-center gap-12 whitespace-nowrap">
                        {[
                            "Own your masters",
                            "split pay",
                            "funding",
                            "ai marketing",
                            "playlist pitching",
                            "music distributions",
                            "promotional tools",
                            "streaming analytics",
                            "artist relations",
                            "catalog valuation",
                            "AI mastering",
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-shamiso-gold-bright" />
                                <span className="text-sm font-bold uppercase tracking-widest text-white/70">
                                    {feature}
                                </span>
                            </div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {[
                            "Own your masters",
                            "split pay",
                            "funding",
                            "ai marketing",
                            "playlist pitching",
                            "music distributions",
                            "promotional tools",
                            "streaming analytics",
                            "artist relations",
                            "catalog valuation",
                            "AI mastering",
                        ].map((feature, i) => (
                            <div key={`dup-${i}`} className="flex items-center gap-3">
                                <span className="h-1.5 w-1.5 rounded-full bg-shamiso-gold-bright" />
                                <span className="text-sm font-bold uppercase tracking-widest text-white/70">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
