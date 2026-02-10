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
} from "lucide-react";

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
                            Specialized Distribution
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
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-shamiso-gold to-shamiso-gold-bright px-8 text-base font-bold text-black shadow-xl shadow-shamiso-gold/20 hover:shadow-shamiso-gold/40"
                            >
                                <Zap className="mr-2 h-5 w-5" />
                                Start Distributing {genre}
                            </Button>
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

                    {/* Stats row */}
                    <div className="mt-16 grid gap-6 sm:grid-cols-3">
                        <div className="glass-card rounded-xl border border-shamiso-border p-6 text-center">
                            <Store className="mx-auto mb-3 h-8 w-8 text-shamiso-gold" />
                            <p className="text-3xl font-extrabold text-white">{stores}+</p>
                            <p className="text-sm text-muted-foreground">
                                Stores & Platforms
                            </p>
                        </div>
                        <div className="glass-card rounded-xl border border-shamiso-border p-6 text-center">
                            <DollarSign className="mx-auto mb-3 h-8 w-8 text-shamiso-gold" />
                            <p className="text-3xl font-extrabold text-white">30%</p>
                            <p className="text-sm text-muted-foreground">
                                Saved on US Tax Withholding
                            </p>
                        </div>
                        <div className="glass-card rounded-xl border border-shamiso-border p-6 text-center">
                            <Shield className="mx-auto mb-3 h-8 w-8 text-shamiso-accent" />
                            <p className="text-3xl font-extrabold text-white">100%</p>
                            <p className="text-sm text-muted-foreground">
                                You Keep Your Masters
                            </p>
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
        </div>
    );
}
