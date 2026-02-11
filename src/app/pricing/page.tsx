"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Shield, Zap, Globe, Briefcase, Building2, Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const tiers = {
    retail: [
        {
            name: "STARTER",
            price: "Free",
            period: "/ year",
            description: "For first-time artists & hobbyists.",
            features: [
                "Unlimited Uploads",
                "85% Streaming Royalties",
                "80% UGC Split (TikTok/YouTube)",
                "Standard Delivery (5-7 Days)",
                "Basic Analytics",
                "$50 Payout Threshold",
            ],
            cta: "Get Started",
            href: "/signup",
            color: "text-white",
            borderColor: "border-zinc-800",
            glow: "shadow-none",
        },
        {
            name: "PRO",
            price: "$19.99",
            period: "/ year",
            description: "For serious indies & DIY artists.",
            features: [
                "Unlimited Uploads",
                "100% of Net Receipts",
                "80% UGC Split",
                "Priority Delivery (48-72 Hours)",
                "Advanced Analytics (Geo + Demo)",
                "$10 Payout Threshold",
                "Eligible for Advances (after $1k)",
            ],
            cta: "Go Pro",
            href: "/signup?plan=pro",
            color: "text-shamiso-gold-bright",
            borderColor: "border-shamiso-gold/50",
            glow: "shadow-lg shadow-shamiso-gold/20",
            popular: true,
        },
        {
            name: "AMPLIFY",
            price: "Invite Only",
            period: "",
            description: "For viral stars & catalog owners.",
            features: [
                "Unlimited Uploads",
                "80% Royalty (Recoupment)",
                "70% UGC Split (Risk Premium)",
                "Express Delivery (24 Hours)",
                "Real-Time Analytics",
                "$0 Payout Threshold",
                "Guaranteed Advances (Data Based)",
                "Dedicated Rep via WhatsApp",
            ],
            cta: "Contact Us",
            href: "mailto:support@shamiso-music.com",
            color: "text-cyan-400",
            borderColor: "border-cyan-500/50",
            glow: "shadow-lg shadow-cyan-500/20",
        },
    ],
    wholesale: [
        {
            name: "MANAGER",
            price: "$149.00",
            period: "/ year",
            description: "For managers with 5-10 acts.",
            features: [
                "Up to 10 Artists",
                "98% of Net Receipts",
                "85% UGC Split to Label",
                "Daily Trend Reports",
                "Single Payout to Manager",
                "Priority Email Support (24hr SLA)",
                "DIY Catalog Migration",
            ],
            cta: "Start Managing",
            href: "/signup?plan=manager",
            color: "text-purple-400",
            borderColor: "border-purple-500/50",
            glow: "shadow-lg shadow-purple-500/20",
        },
        {
            name: "LABEL",
            price: "$499.00",
            period: "/ year",
            description: "For indie labels & collectives (20+ acts).",
            features: [
                "Unlimited Artists",
                "100% of Net Receipts",
                "90% UGC Split to Label",
                "Custom Label Name on DSPs",
                "Team Logins (Admin/Finance/A&R)",
                "Automated Split Pay to Roster",
                "White-Glove Catalog Migration",
                "Dedicated Account Manager",
            ],
            cta: "Launch Label",
            href: "/signup?plan=label",
            color: "text-pink-500",
            borderColor: "border-pink-500/50",
            glow: "shadow-lg shadow-pink-500/20",
        },
    ],
    enterprise: [
        {
            name: "WHITE LABEL",
            price: "$1,500",
            period: "setup + $250/mo",
            description: "For churches, choirs, & legacy catalogs.",
            features: [
                "Your Own Distribution Platform",
                "Powered by Shamiso Infrastructure",
                "Client Keeps 95% Streaming Royalties",
                "Client Keeps 90% UGC Split",
                "Custom Dashboard Branding",
                "Bulk CSV Ingestion",
                "Zero Code Required",
            ],
            cta: "Partner With Us",
            href: "mailto:enterprise@shamiso-music.com",
            color: "text-emerald-400",
            borderColor: "border-emerald-500/50",
            glow: "shadow-lg shadow-emerald-500/20",
        },
        {
            name: "API PARTNER",
            price: "CPM",
            period: "/ Bulk Rate",
            description: "For Telcos, Apps, & Background Music Svcs.",
            features: [
                "Wholesale Licensing Rates",
                "Direct API Access",
                "XML/DDEX Feed Ingestion",
                "Legally Licensed Music for Apps",
                "High Volume Infrastructure",
                "Buy/Sell Arbitrage Model",
            ],
            cta: "Request API Access",
            href: "https://developers.shamiso-music.com",
            color: "text-blue-500",
            borderColor: "border-blue-500/50",
            glow: "shadow-lg shadow-blue-500/20",
        },
    ],
};

const ComparisonTable = () => (
    <div className="mt-20 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-400">
                <thead className="border-b border-zinc-800 bg-zinc-900/80 text-xs uppercase text-white">
                    <tr>
                        <th className="px-6 py-4 font-bold tracking-wider">Feature</th>
                        <th className="px-6 py-4 font-bold tracking-wider text-center">Starter</th>
                        <th className="px-6 py-4 font-bold tracking-wider text-center text-shamiso-gold-bright">Pro</th>
                        <th className="px-6 py-4 font-bold tracking-wider text-center text-purple-400">Manager</th>
                        <th className="px-6 py-4 font-bold tracking-wider text-center text-pink-500">Label</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                    <tr className="hover:bg-white/5">
                        <td className="px-6 py-4 font-medium text-white">Streaming Royalties</td>
                        <td className="px-6 py-4 text-center">85%</td>
                        <td className="px-6 py-4 text-center text-white font-bold">100% (Net)</td>
                        <td className="px-6 py-4 text-center text-white">98% (Net)</td>
                        <td className="px-6 py-4 text-center text-white font-bold">100% (Net)</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                        <td className="px-6 py-4 font-medium text-white">UGC Split</td>
                        <td className="px-6 py-4 text-center">80%</td>
                        <td className="px-6 py-4 text-center">80%</td>
                        <td className="px-6 py-4 text-center">85%</td>
                        <td className="px-6 py-4 text-center font-bold">90%</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                        <td className="px-6 py-4 font-medium text-white">Upload Limit</td>
                        <td className="px-6 py-4 text-center">Unlimited</td>
                        <td className="px-6 py-4 text-center">Unlimited</td>
                        <td className="px-6 py-4 text-center">Up to 10 Artists</td>
                        <td className="px-6 py-4 text-center font-bold">Unlimited Artists</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                        <td className="px-6 py-4 font-medium text-white">Delivery Speed</td>
                        <td className="px-6 py-4 text-center">5-7 Days</td>
                        <td className="px-6 py-4 text-center font-bold text-shamiso-gold-bright">48-72 Hours</td>
                        <td className="px-6 py-4 text-center">Standard</td>
                        <td className="px-6 py-4 text-center">Priority</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                        <td className="px-6 py-4 font-medium text-white">Advances</td>
                        <td className="px-6 py-4 text-center"><X className="mx-auto h-4 w-4 text-zinc-600" /></td>
                        <td className="px-6 py-4 text-center">Eligible (After $1k)</td>
                        <td className="px-6 py-4 text-center">Applicable</td>
                        <td className="px-6 py-4 text-center">Applicable</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                        <td className="px-6 py-4 font-medium text-white">Team Access</td>
                        <td className="px-6 py-4 text-center"><X className="mx-auto h-4 w-4 text-zinc-600" /></td>
                        <td className="px-6 py-4 text-center"><X className="mx-auto h-4 w-4 text-zinc-600" /></td>
                        <td className="px-6 py-4 text-center">Single Login</td>
                        <td className="px-6 py-4 text-center font-bold">Multi-User</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-black pt-20 pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(180,140,20,0.1),transparent_50%)] pointer-events-none" />
            <div className="fixed top-20 right-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold/5 blur-[120px] pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black mb-4 tracking-tight text-white sm:text-6xl uppercase">
                        Choose Your <span className="gradient-text">Engine</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        Whether you're an independent artist, a label manager, or an enterprise platform — we have the infrastructure to scale your sovereignty.
                    </p>
                </div>

                <Tabs defaultValue="retail" className="w-full">
                    <div className="flex justify-center mb-12">
                        <TabsList className="bg-zinc-900 border border-zinc-800 p-1 rounded-full">
                            <TabsTrigger value="retail" className="rounded-full px-8 py-2 data-[state=active]:bg-shamiso-gold-bright data-[state=active]:text-black font-bold">
                                Retail (B2C)
                            </TabsTrigger>
                            <TabsTrigger value="wholesale" className="rounded-full px-8 py-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white font-bold">
                                Wholesale (B2B)
                            </TabsTrigger>
                            <TabsTrigger value="enterprise" className="rounded-full px-8 py-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white font-bold">
                                Enterprise
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="retail" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid gap-8 md:grid-cols-3">
                            {tiers.retail.map((tier) => (
                                <Card key={tier.name} className={`relative bg-zinc-900/40 border-zinc-800 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${tier.borderColor} ${tier.glow}`}>
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-shamiso-gold-bright text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-shamiso-gold/20">
                                            Most Popular
                                        </div>
                                    )}
                                    <CardHeader>
                                        <CardTitle className={`text-xl font-bold tracking-widest ${tier.color}`}>
                                            {tier.name}
                                        </CardTitle>
                                        <CardDescription className="text-neutral-400">
                                            {tier.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-6">
                                            <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                                            <span className="text-neutral-500 ml-1">{tier.period}</span>
                                        </div>
                                        <Separator className="bg-zinc-800 mb-6" />
                                        <ul className="space-y-3">
                                            {tier.features.map((feature) => (
                                                <li key={feature} className="flex items-start text-sm text-neutral-300">
                                                    <Check className={`mr-2 h-4 w-4 shrink-0 ${tier.color}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={tier.href} className="w-full">
                                            <Button className={`w-full font-bold shadow-lg transition-all hover:scale-105 hover:brightness-110 ${tier.name === "STARTER" ? "bg-zinc-800 text-white hover:bg-zinc-700" : tier.name === "AMPLIFY" ? "bg-cyan-950 text-cyan-400 border border-cyan-800 hover:bg-cyan-900" : "bg-gradient-to-r from-shamiso-gold to-shamiso-gold-bright text-black shadow-shamiso-gold/20"}`}>
                                                {tier.cta}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        <div className="pt-8">
                            <div className="text-center mb-8">
                                <h3 className="text-lg font-bold text-white uppercase tracking-widest">Compare Retail Tiers</h3>
                            </div>
                            <ComparisonTable />
                        </div>
                    </TabsContent>

                    <TabsContent value="wholesale" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-8 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-2">Build Your Sovereign Business</h2>
                            <p className="text-neutral-400">Infrastructure as a Service. We sell "Running a Record Label" for a flat fee.</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                            {tiers.wholesale.map((tier) => (
                                <Card key={tier.name} className={`relative bg-zinc-900/40 border-zinc-800 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${tier.borderColor} ${tier.glow}`}>
                                    <CardHeader>
                                        <CardTitle className={`text-2xl font-bold tracking-widest ${tier.color}`}>
                                            {tier.name}
                                        </CardTitle>
                                        <CardDescription className="text-neutral-400">
                                            {tier.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-6">
                                            <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                                            <span className="text-neutral-500 ml-1">{tier.period}</span>
                                        </div>
                                        <Separator className="bg-zinc-800 mb-6" />
                                        <ul className="space-y-4">
                                            {tier.features.map((feature) => (
                                                <li key={feature} className="flex items-start text-sm text-neutral-300">
                                                    <Briefcase className={`mr-2 h-5 w-5 shrink-0 ${tier.color}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={tier.href} className="w-full">
                                            <Button className={`w-full font-bold shadow-lg transition-all hover:scale-105 border ${tier.name === "MANAGER" ? "bg-purple-950/30 border-purple-500/50 text-purple-400 hover:bg-purple-900/50" : "bg-pink-950/30 border-pink-500/50 text-pink-400 hover:bg-pink-900/50"}`}>
                                                {tier.cta}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="enterprise" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-8 max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-2">Usage at Scale</h2>
                            <p className="text-neutral-400">Leverage our direct pipe to Too Lost to service organizations that own audio assets.</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                            {tiers.enterprise.map((tier) => (
                                <Card key={tier.name} className={`relative bg-zinc-900/40 border-zinc-800 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${tier.borderColor} ${tier.glow}`}>
                                    <CardHeader>
                                        <CardTitle className={`text-2xl font-bold tracking-widest ${tier.color}`}>
                                            {tier.name}
                                        </CardTitle>
                                        <CardDescription className="text-neutral-400">
                                            {tier.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-6">
                                            <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                                            <span className="text-neutral-500 ml-1 text-lg">{tier.period}</span>
                                        </div>
                                        <Separator className="bg-zinc-800 mb-6" />
                                        <ul className="space-y-4">
                                            {tier.features.map((feature) => (
                                                <li key={feature} className="flex items-start text-sm text-neutral-300">
                                                    <Building2 className={`mr-2 h-5 w-5 shrink-0 ${tier.color}`} />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={tier.href} className="w-full">
                                            <Button className={`w-full font-bold shadow-lg transition-all hover:scale-105 border ${tier.name === "WHITE LABEL" ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-400 hover:bg-emerald-900/50" : "bg-blue-950/30 border-blue-500/50 text-blue-400 hover:bg-blue-900/50"}`}>
                                                {tier.cta}
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <div className="mt-24 text-center">
                    <p className="text-neutral-500 text-sm">
                        All plans are subject to our Terms of Service. Prices and features may change.<br />
                        For custom enterprise solutions, please contact our sales team.
                    </p>
                </div>
            </div>
        </main>
    );
}
