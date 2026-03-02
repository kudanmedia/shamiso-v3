import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
    Music2,
    Store,
    DollarSign,
    Shield,
    Zap,
    ArrowRight,
    CheckCircle2,
    Fingerprint,
} from "lucide-react";
import { FAQ } from "@/components/FAQ";

interface GenrePageProps {
    genre: string;
    tagline: string;
    description: string;
    highlights: string[];
    stores: string;
    relatedGenres: { label: string; href: string }[];
}

export function GenrePage({
    genre,
    tagline,
    description,
    highlights,
    stores,
    relatedGenres,
}: GenrePageProps) {
    return (
        <div className="min-h-screen pt-16">
            {/* Hero */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-gradient-to-br from-shamiso-navy via-shamiso-navy-light to-shamiso-navy" />
                <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold/5 blur-[100px]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <Badge
                            variant="outline"
                            className="mb-6 border-shamiso-accent/30 bg-shamiso-accent/10 px-4 py-1.5 text-shamiso-accent font-semibold"
                        >
                            <Music2 className="mr-2 h-3.5 w-3.5" />
                            STRATEGIC GENRE
                        </Badge>

                        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Distribute{" "}
                            <span className="gradient-text">{genre}</span>
                            <br />
                            to {stores} Stores
                        </h1>

                        <p className="mb-4 text-xl font-medium text-white/90">{tagline}</p>

                        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                            {description}
                        </p>

                        <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                            <Link href="/signup">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-shamiso-gold to-shamiso-gold-bright px-8 text-base font-bold text-black shadow-xl shadow-shamiso-gold/20 hover:shadow-shamiso-gold/40"
                                >
                                    <Fingerprint className="mr-2 h-5 w-5" />
                                    Join Shamiso
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-shamiso-border px-8 text-muted-foreground hover:border-shamiso-accent hover:text-shamiso-accent transition-all duration-300"
                            >
                                Learn More
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="relative py-24">
                <div className="absolute inset-0 bg-shamiso-navy-light" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-3xl font-extrabold text-white">
                        Why Artists Choose Shamiso for{" "}
                        <span className="gradient-text">{genre}</span>
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {highlights.map((item) => (
                            <div
                                key={item}
                                className="glass-card flex items-start gap-4 rounded-xl border border-shamiso-border p-6"
                            >
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-shamiso-gold" />
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Even™ Engine Benefits */}
                    <div className="mt-24 space-y-8">
                        <div className="text-center sm:text-left">
                            <Badge variant="outline" className="mb-4 border-shamiso-gold/30 bg-shamiso-gold/10 text-shamiso-gold">
                                <Zap className="mr-1.5 h-3 w-3" />
                                POWERED BY EVEN™ ENGINE
                            </Badge>
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                                The <span className="text-shamiso-gold-bright">Even™</span> Advantage
                            </h3>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-3">
                            <div className="glass-card rounded-xl border border-shamiso-gold/20 bg-shamiso-gold/5 p-8 text-center transition-all hover:border-shamiso-gold/40">
                                <Store className="mx-auto mb-4 h-10 w-10 text-shamiso-gold" />
                                <p className="text-4xl font-black text-white">{stores}+</p>
                                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                    Stores & Platforms
                                </p>
                            </div>
                            <div className="glass-card rounded-xl border border-shamiso-gold/20 bg-shamiso-gold/5 p-8 text-center transition-all hover:border-shamiso-gold/40">
                                <DollarSign className="mx-auto mb-4 h-10 w-10 text-shamiso-gold" />
                                <p className="text-4xl font-black text-white">30%</p>
                                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                    Saved on US Tax Withholding
                                </p>
                                <p className="mt-4 text-[10px] leading-tight text-neutral-400">
                                    For every $1,000 earned, an artist keeps <span className="text-white font-bold">$400 more</span> on Shamiso.
                                </p>
                            </div>
                            <div className="glass-card rounded-xl border border-shamiso-gold/20 bg-shamiso-gold/5 p-8 text-center transition-all hover:border-shamiso-gold/40">
                                <Shield className="mx-auto mb-4 h-10 w-10 text-shamiso-accent" />
                                <p className="text-4xl font-black text-white">100%</p>
                                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                                    You Keep Your Masters
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related genres */}
            <section className="relative py-16">
                <div className="absolute inset-0 bg-shamiso-navy" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground/60">
                        Also Specializing In
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {relatedGenres.map((g) => (
                            <Link key={g.label} href={g.href}>
                                <Badge
                                    variant="outline"
                                    className="cursor-pointer border-shamiso-border bg-white/[0.02] px-5 py-2 text-base font-medium text-shamiso-gold transition-all hover:border-shamiso-gold hover:bg-shamiso-gold/10"
                                >
                                    {g.label}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative overflow-hidden py-24">
                <div className="absolute inset-0 bg-linear-to-t from-shamiso-navy to-shamiso-navy-light" />
                <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-shamiso-gold/5 blur-[80px]" />

                <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-3xl font-black uppercase tracking-tight text-white sm:text-5xl">
                        Ready to Take Your <span className="gradient-text">{genre}</span> Global?
                    </h2>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
                        Join the world's most innovative artists and start owning your future today with Shamiso's sovereign distribution.
                    </p>
                    <Link href="/signup">
                        <Button
                            size="lg"
                            className="bg-shamiso-gold-bright px-12 py-8 text-lg font-black uppercase text-black shadow-2xl shadow-shamiso-gold/20 transition-all hover:scale-105 hover:shadow-shamiso-gold/40"
                        >
                            Join Shamiso
                        </Button>
                    </Link>
                </div>
            </section>

            <FAQ />
        </div>
    );
}
