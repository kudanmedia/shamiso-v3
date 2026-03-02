"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users,
    TrendingUp,
    Clock,
    ShieldCheck
} from "lucide-react";

const d2cFeatures = [
    {
        title: "Your Fans, Your Data",
        subtitle: "THE GOLDMINE",
        description: "Unlike traditional streaming platforms that hide your audience, our Direct-2-Fan engine puts you in control. See every fan, collect every email, and own your relationship.",
        icon: Users,
        color: "text-shamiso-gold-bright",
        iconBg: "bg-shamiso-gold/10",
        details: "Collect verified email addresses and phone numbers for every sale. Build your own marketing list that you own forever."
    },
    {
        title: "The Windowing Strategy",
        subtitle: "STRATEGIC FOMO",
        description: "Sell your digital album directly to super-fans weeks before it hits global stores. Create exclusivity and capture high-margin revenue when hype is highest.",
        icon: TrendingUp,
        color: "text-emerald-400",
        iconBg: "bg-emerald-500/10",
        details: "Launch 7-14 day exclusive windows. Turn your most loyal listeners into early investors in your career."
    },
    {
        title: "Instant Liquidity",
        subtitle: "BREAK THE 90-DAY CYCLE",
        description: "Why wait months for royalty statements? With Shamiso D2F, your fans pay you today, and you can withdraw your profits within the same week.",
        icon: Clock,
        color: "text-blue-400",
        iconBg: "bg-blue-500/10",
        details: "Real-time revenue tracking and accelerated payout cycles. Cash flow that moves at the speed of the music industry."
    }
];

export function D2CSection() {
    return (
        <section className="relative py-24 bg-black overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(141,111,18,0.1),transparent_50%)]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <Badge variant="outline" className="mb-4 border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest">
                        The Direct-To-Fan Powerhouse
                    </Badge>
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl lg:text-6xl">
                        Your Sound. Your Fans. <br />
                        <span className="gradient-text">Your Sovereignty.</span>
                    </h2>
                    <div className="mx-auto mt-6 max-w-3xl text-lg text-neutral-400 leading-relaxed font-light text-left">
                        <p className="mb-4 text-center font-bold text-white">With EVEN, As an Artist YOU can:</p>
                        <ul className="space-y-2 inline-block mx-auto text-left list-disc list-inside w-full sm:w-auto">
                            <li>Set the price for your song/art.</li>
                            <li>Decide how you want to reward their fans.</li>
                            <li>Get paid daily!</li>
                            <li>Own & export your data with a click.</li>
                        </ul>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {d2cFeatures.map((feature) => (
                        <div
                            key={feature.title}
                            className="glass-card group flex flex-col p-8 rounded-2xl border border-white/5 hover:border-shamiso-gold/30 transition-all duration-500"
                        >
                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${feature.iconBg} ${feature.color} ring-1 ring-white/10 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="h-7 w-7" />
                            </div>

                            <Badge variant="secondary" className="w-fit mb-4 bg-white/5 text-[10px] font-bold tracking-widest text-white/50 group-hover:text-shamiso-gold-bright transition-colors">
                                {feature.subtitle}
                            </Badge>

                            <h3 className="mb-3 text-2xl font-bold text-white uppercase tracking-tight">
                                {feature.title}
                            </h3>

                            <p className="mb-6 text-sm leading-relaxed text-neutral-400">
                                {feature.description}
                            </p>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <p className="text-xs text-neutral-500 italic leading-relaxed">
                                    {feature.details}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dashboard Mockup / Social Proof Area */}
                <div className="mt-20 relative px-6 py-12 rounded-3xl border border-shamiso-gold/20 bg-shamiso-gold/5 overflow-hidden">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-shamiso-gold/10 blur-[100px]" />

                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase mb-4">
                                Sell for <span className="text-shamiso-gold-bright">$180</span>, Not $0.003
                            </h3>
                            <p className="text-neutral-400 mb-8 leading-relaxed">
                                Traditional distribution fights over micro-cents. Our Direct-2-Fan engine lets you sell a digital
                                collector&apos;s edition directly to your super-fans for the price of a real album.
                                One $180 sale is worth more than 3,000 streams.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start gap-3">
                                    <ShieldCheck className="h-5 w-5 text-emerald-400 mt-1 shrink-0" />
                                    <span className="text-sm text-neutral-300">Set your own price point for early access releases.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ShieldCheck className="h-5 w-5 text-emerald-400 mt-1 shrink-0" />
                                    <span className="text-sm text-neutral-300">Bundle digital music with exclusive content or merch.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ShieldCheck className="h-5 w-5 text-emerald-400 mt-1 shrink-0" />
                                    <span className="text-sm text-neutral-300">Amapiano, Afro House, & 3-Step artists: Payday starts today.</span>
                                </li>
                            </ul>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button className="bg-shamiso-gold hover:bg-shamiso-gold-bright text-black font-bold uppercase transition-all">
                                    Launch D2F Campaign
                                </Button>
                                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 font-bold uppercase">
                                    View Live D2F Stores
                                </Button>
                            </div>
                        </div>

                        <div className="glass-card rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden">
                            {/* Simple dashboard representation */}
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-xs font-bold text-white uppercase tracking-widest">D2F Engine: Live Analytics</p>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none">Live</Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                    <p className="text-[10px] text-neutral-500 uppercase mb-1">Total Sales</p>
                                    <p className="text-xl font-bold text-white">$24,850.00</p>
                                </div>
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                    <p className="text-[10px] text-neutral-500 uppercase mb-1">Fan Emails</p>
                                    <p className="text-xl font-bold text-white">138</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Recent Orders</p>
                                {[
                                    { name: "Thabo M.", item: "Digital Deluxe", time: "2m ago", price: "$180" },
                                    { name: "Lerato K.", item: "Early Release LP", time: "15m ago", price: "$250" },
                                    { name: "Sizwe D.", item: "Exclusive Bundle", time: "42m ago", price: "$450" }
                                ].map((order, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-shamiso-gold/20 flex items-center justify-center text-[10px] font-bold text-shamiso-gold-bright">
                                                {order.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-white">{order.name}</p>
                                                <p className="text-[10px] text-neutral-500">{order.item}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-shamiso-gold-bright">{order.price}</p>
                                            <p className="text-[10px] text-neutral-500">{order.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
