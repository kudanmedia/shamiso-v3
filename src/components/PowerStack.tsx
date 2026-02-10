import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Banknote,
    Crown,
    Wand2,
    ArrowRight,
} from "lucide-react";

const powerCards = [
    {
        icon: Banknote,
        title: "Fintech Flow",
        subtitle: "Artist Prosperity",
        description:
            "Instant Advances via Beatbread. Zero-Fee Payouts via Paystack. Your Cash, On-Demand.",
        cta: "Unlock Funding",
        href: "#",
        gradient: "from-shamiso-gold/20 to-shamiso-gold/5",
        iconColor: "text-shamiso-gold-bright",
        borderColor: "hover:border-shamiso-gold/40",
    },
    {
        icon: Crown,
        title: "Own Your Empire",
        subtitle: "Build Your Empire",
        description:
            "White-Label Your Destiny. Automate Royalties. Keep 100% of Your Brand Equity.",
        cta: "Start Distribution",
        href: "#",
        gradient: "from-shamiso-gold/15 to-shamiso-gold/5",
        iconColor: "text-shamiso-gold-bright",
        borderColor: "hover:border-shamiso-gold/40",
    },
    {
        icon: Wand2,
        title: "AI Creative",
        subtitle: "Embed The Future",
        description:
            "AI Mixing with ROEX. On-Demand Visuals with Roto Videos. Integrate Africa's Soundtrack into your tech stack.",
        cta: "Explore Tools",
        href: "#",
        gradient: "from-shamiso-gold/20 to-shamiso-gold/5",
        iconColor: "text-shamiso-gold",
        borderColor: "hover:border-shamiso-gold/40",
    },
];

export function PowerStack() {
    return (
        <section id="services" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0a0800]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-16 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-shamiso-gold-bright">
                        The Power Stack
                    </p>
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        Everything You Need to{" "}
                        <span className="gradient-text">Win</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Distribution, funding, and AI tools — unified under one sovereign
                        platform built for African artists.
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {powerCards.map((card) => (
                        <Card
                            key={card.title}
                            className={`glass-card group cursor-pointer border-shamiso-border bg-gradient-to-br ${card.gradient} ${card.borderColor} transition-all duration-300`}
                        >
                            <CardHeader className="space-y-4">
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-shamiso-surface/80 ${card.iconColor} shadow-lg`}
                                >
                                    <card.icon className="h-7 w-7" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                                        {card.subtitle}
                                    </p>
                                    <CardTitle className="text-xl font-bold text-white">
                                        {card.title}
                                    </CardTitle>
                                </div>
                                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                                    {card.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="ghost"
                                    className="group/btn -ml-4 text-sm font-semibold text-muted-foreground transition-colors hover:text-white"
                                >
                                    {card.cta}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
