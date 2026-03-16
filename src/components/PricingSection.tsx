import Link from "next/link";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Badge, Building2, Check, Crown, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const artistPlans = [
    {
        name: "BANTU FREE",
        price: "$0",
        period: "per year",
        description: "Best for basics.",
        features: [
            "Keep 85% of royalties",
            "450+ top music services",
            "YouTube Content ID ($4.99/rel)",
            "Unlimited releases (1 artist)",
            "Self-service playlisting",
        ],
        cta: "Get Started For Free",
        href: "/signup",
        highlight: false,
        icon: Zap,
    },
    {
        name: "BANTU RISE",
        price: "$19.99",
        period: "/ year",
        description: "Most popular for growing artists.",
        features: [
            "Keep 100% of royalties",
            "450+ top music services",
            "Advanced marketing tools",
            "YouTube Content ID ($4.99/rel)",
            "Eligible for playlist invites",
            "Advances if eligible",
        ],
        cta: "Get Started",
        href: "/signup",
        highlight: true,
        icon: Zap,
    },
    {
        name: "BESPOKE",
        price: "Invite",
        period: "Only",
        description: "For heavyweights & viral stars.",
        features: [
            "Keep 100% of royalties",
            "Global bespoke marketing",
            "Pitched to curators",
            "Fund your future with advances",
            "Monthly payments",
            "White-glove priority",
        ],
        cta: "Learn More",
        href: "mailto:star@shamiso-music.com",
        highlight: false,
        icon: Crown,
    },
];

const labelPlans = [
    {
        name: "BANTU LABEL",
        price: "$79",
        period: "per year + $149 setup",
        description: "For boutique labels.",
        features: [
            "Keep 85% of royalties",
            "Unlimited artists & releases",
            "YouTube Content ID ($4.99/rel)",
            "Self-service playlisting",
            "Fund future with advances",
            "Monthly payments",
        ],
        cta: "Get Started",
        href: "/signup",
        highlight: false,
        icon: Building2,
    },
    {
        name: "BANTU HUB",
        price: "$119",
        period: "per year + $199.99 setup",
        description: "For full-service collectives.",
        features: [
            "Keep 100% of royalties",
            "Unlimited artists & releases",
            "YouTube Content ID Included",
            "Store delivery in 2 days",
            "Eligible for playlist invites",
            "Fund future with advances",
        ],
        cta: "Get Started",
        href: "/signup",
        highlight: true,
        icon: Building2,
    },
    {
        name: "BANTU ENTERPRISE",
        price: "Invite",
        period: "Only",
        description: "For elite music groups.",
        features: [
            "Keep 100% of royalties",
            "White-glove priority delivery",
            "Custom rollout strategy",
            "Bespoke royalty splits",
            "Daily payouts access",
            "Institutional valuations",
        ],
        cta: "Learn More",
        href: "mailto:enterprise@shamiso-music.com",
        highlight: false,
        icon: Crown,
    },
];

const advancedArtistBenefits = [
    { pillar: "Distribution", f: "Unlimited releases", r: "Unlimited releases", b: "Unlimited releases" },
    { pillar: "Store Speed", f: "14 business days", r: "14 business days", b: "White-glove priority" },
    { pillar: "Monetization", f: "Social Media (TikTok/IG)", r: "YouTube Content ID", b: "YouTube Content ID" },
    { pillar: "Financials", f: "Monthly Payments", r: "Monthly payments", b: "Monthly payments" },
    { pillar: "Collaborators", f: "Split Pay (Unlimited)", r: "Split Pay (Unlimited)", b: "Bespoke royalty splits" },
    { pillar: "Mastering", f: "Paid Service", r: "Paid Service", b: "Paid Service" },
    { pillar: "Fan Tools", f: "ArtistPages", r: "MasterLinks & Fan Data", b: "Custom Rollout Strategy" },
];

const advancedLabelBenefits = [
    { pillar: "Distribution", l: "Unlimited releases", h: "Unlimited releases", e: "Unlimited releases" },
    { pillar: "Store Speed", l: "14 business days", h: "2 business days", e: "White-glove priority" },
    { pillar: "Monetization", l: "Social Media (TikTok/IG)", h: "YouTube Content ID", e: "YouTube Content ID" },
    { pillar: "Financials", l: "Monthly", h: "Monthly", e: "Monthly payments" },
    { pillar: "Collaborators", l: "Split Pay (Unlimited)", h: "Split Pay (Unlimited)", e: "Bespoke royalty splits" },
    { pillar: "Fan Tools", l: "ArtistPages", h: "MasterLinks & Fan Data", e: "Custom Rollout Strategy" },
];

export function PricingSection() {
    return (
        <section id="pricing" className="relative py-24 bg-black/40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest">
                        SMD Subscription Pricing and Benefits Plan
                    </Badge>
                    <h2 className="text-4xl font-black text-white uppercase sm:text-5xl">
                        Music Distribution <span className="gradient-text">Redefined</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-400">
                        Transparent, high-performance plans for independent artists and high-growth labels.
                    </p>
                </div>

                <Tabs defaultValue="artists" className="w-full">
                    <div className="flex justify-center mb-12">
                        <TabsList className="bg-zinc-900 border border-white/5 p-1 h-14">
                            <TabsTrigger
                                value="artists"
                                className="px-8 py-3 text-sm font-bold uppercase tracking-widest data-[state=active]:bg-shamiso-gold-bright data-[state=active]:text-black"
                            >
                                Artists
                            </TabsTrigger>
                            <TabsTrigger
                                value="labels"
                                className="px-8 py-3 text-sm font-bold uppercase tracking-widest data-[state=active]:bg-shamiso-gold-bright data-[state=active]:text-black"
                            >
                                Labels & Enterprises
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="artists" className="space-y-20">
                        {/* Artist Plans Grid */}
                        <div className="grid gap-8 md:grid-cols-3">
                            {artistPlans.map((plan) => (
                                <PlanCard key={plan.name} plan={plan} />
                            ))}
                        </div>

                        {/* Advanced Benefits Table */}
                        <div className="mt-20">
                            <h3 className="text-2xl font-black text-white uppercase mb-8 text-center">Advanced Benefits Structure</h3>
                            <div className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5">
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">Feature Pillar</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-white">BANTU FREE</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-shamiso-gold-bright">BANTU RISE</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-white">BESPOKE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {advancedArtistBenefits.map((row) => (
                                            <tr key={row.pillar} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 text-sm font-bold text-neutral-400">{row.pillar}</td>
                                                <td className="px-6 py-4 text-sm text-neutral-300">{row.f}</td>
                                                <td className="px-6 py-4 text-sm text-shamiso-gold-bright font-medium">{row.r}</td>
                                                <td className="px-6 py-4 text-sm text-neutral-300">{row.b}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="labels" className="space-y-20">
                        {/* Label Plans Grid */}
                        <div className="grid gap-8 md:grid-cols-3">
                            {labelPlans.map((plan) => (
                                <PlanCard key={plan.name} plan={plan} />
                            ))}
                        </div>

                        {/* Advanced Benefits Table */}
                        <div className="mt-20">
                            <h3 className="text-2xl font-black text-white uppercase mb-8 text-center">Advanced Benefits Structure</h3>
                            <div className="overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5">
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">Feature Pillar</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-white">BANTU LABEL</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-shamiso-gold-bright">BANTU HUB</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase text-white">BANTU ENTERPRISE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {advancedLabelBenefits.map((row) => (
                                            <tr key={row.pillar} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 text-sm font-bold text-neutral-400">{row.pillar}</td>
                                                <td className="px-6 py-4 text-sm text-neutral-300">{row.l}</td>
                                                <td className="px-6 py-4 text-sm text-shamiso-gold-bright font-medium">{row.h}</td>
                                                <td className="px-6 py-4 text-sm text-neutral-300">{row.e}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="mt-16 text-center">
                    <p className="text-sm text-neutral-500">
                        Subscription Pricing and Benefit Plan (comparable to modern high-performance distribution).
                    </p>
                </div>
            </div>
        </section>
    );
}

function PlanCard({ plan }: { plan: any }) {
    return (
        <Card
            className={`relative overflow-hidden border-zinc-800 bg-zinc-900/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${plan.highlight ? "border-shamiso-gold/40 ring-1 ring-shamiso-gold/20 shadow-2xl shadow-shamiso-gold/10" : ""}`}
        >
            {plan.highlight && (
                <div className="absolute top-0 right-0 bg-shamiso-gold-bright px-4 py-1 text-[10px] font-black uppercase text-black">
                    Most Popular
                </div>
            )}

            <div className="p-8">
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ${plan.highlight ? "text-shamiso-gold-bright" : "text-neutral-500"}`}>
                    <plan.icon className="h-6 w-6" />
                </div>

                <div className="text-[10px] font-black uppercase tracking-widest text-shamiso-gold/60 mb-1">{plan.name === "BANTU FREE" || plan.name === "BANTU RISE" || plan.name === "BESPOKE" ? "Artist Tier" : "Label Tier"}</div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="ml-1 text-sm text-neutral-500">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-500 min-h-[40px]">{plan.description}</p>

                <div className="my-8 h-px bg-white/5" />

                <ul className="mb-8 space-y-4 min-h-[220px]">
                    {plan.features.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-neutral-300">
                            <Check className="h-4 w-4 shrink-0 text-shamiso-gold-bright" />
                            {feature}
                        </li>
                    ))}
                </ul>

                <a href={plan.href} className="w-full">
                    <Button
                        className={`w-full font-black uppercase tracking-tight transition-all hover:scale-[1.02] ${plan.highlight
                            ? "bg-shamiso-gold-bright text-black shadow-lg shadow-shamiso-gold/20"
                            : "bg-white/5 text-white hover:bg-white/10"}`}
                    >
                        {plan.cta}
                    </Button>
                </a>
            </div>
        </Card>
    );
}
