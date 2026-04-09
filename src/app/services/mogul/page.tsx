import type { Metadata } from "next";
import { PartnerRedirect } from "@/components/PartnerRedirect";
import { PARTNER_LINKS } from "@/lib/partner-links";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
    PiggyBank, 
    TrendingUp, 
    ShieldCheck, 
    Calculator, 
    FileText, 
    Briefcase,
    CheckCircle2,
    Lock,
    Globe
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Mogul Tax & Wealth Management | Music Industry Specialists | Shamiso Music Distribution",
    description: "Automated tax optimization and wealth management for music creators. Secure your financial future with Mogul on Shamiso.",
};

const pillars = [
    {
        title: "Tax Optimization",
        description: "Stop overpaying. Our system identifies deductions and optimizes international withholding (1042-S/1099) so you keep more of what you earn.",
        icon: Calculator,
    },
    {
        title: "Wealth Management",
        description: "Turn hits into assets. Track your catalog's market value in real-time. Use data to plan for the long term.",
        icon: TrendingUp,
    },
    {
        title: "Creator Specialists",
        description: "Built for music. Mogul understands 'Black Box' royalties and mechanicals. We speak the language of PROs.",
        icon: Briefcase,
    }
];

export default function MogulPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <PartnerRedirect partnerUrl={PARTNER_LINKS.mogul} />
            <Header />
            
            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full -z-10" />
                    
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 uppercase tracking-widest px-4 py-1 bg-emerald-500/5">
                                    Financial Legacy Infrastructure
                                </Badge>
                                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                                    Don&apos;t Just <br />
                                    Collect Royalties. <br />
                                    <span className="text-emerald-500 text-6xl md:text-8xl">Build a Legacy.</span>
                                </h1>
                                <p className="text-xl text-neutral-400 leading-relaxed max-w-xl">
                                    Automated tax optimization and wealth management specialized for music creators. Secure your financial future while you build your catalog.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link href="/signup">
                                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest h-16 px-10 rounded-2xl shadow-xl shadow-emerald-600/20 transition-all hover:scale-105">
                                        <PiggyBank className="mr-2 h-5 w-5" />
                                        Access Mogul Suite
                                    </Button>
                                </Link>
                                <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    SOC2 Certified & Fully Encrypted
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="grid grid-cols-1 gap-6">
                                {pillars.map((p, idx) => (
                                    <div key={p.title} className="group p-8 rounded-3xl border border-zinc-900 bg-zinc-900/40 backdrop-blur-xl relative overflow-hidden transition-all hover:border-emerald-500/20">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <p.icon className="w-24 h-24 text-emerald-500" />
                                        </div>
                                        <div className="relative z-10 flex gap-6">
                                            <div className="w-12 h-12 rounded-xl bg-emerald-600/10 flex items-center justify-center shrink-0">
                                                <p.icon className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold uppercase mb-2 tracking-tight">{p.title}</h3>
                                                <p className="text-neutral-500 text-sm leading-relaxed max-w-md">{p.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why it Matters Section */}
                <section className="bg-zinc-900/10 py-24 border-y border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">Why This Matters <br /> for <span className="text-emerald-500">SMD Artists.</span></h2>
                                <p className="text-neutral-400 text-lg leading-relaxed">
                                    &quot;As a creator, your music is your capital. Most distributors stop at the payout; Shamiso Distribution ensures you keep and grow that capital for generations.&quot;
                                </p>
                                <div className="grid sm:grid-cols-2 gap-6 pt-6">
                                    {[
                                        { t: "International Tax Helper", d: "Manage 1042-S/1099 with ease." },
                                        { t: "Catalog Valuation", d: "See what your music is worth today." },
                                        { t: "Secure Wealth Portfolios", d: "Invest directly from your royalties." },
                                        { t: "Black Box Recovery", d: "Find missing mechanical revenue." }
                                    ].map(item => (
                                        <div key={item.t} className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                <div className="font-bold text-xs uppercase tracking-tight">{item.t}</div>
                                            </div>
                                            <p className="text-[10px] text-neutral-500 pl-6 leading-tight font-medium uppercase tracking-widest">{item.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="bg-linear-to-br from-emerald-600/20 via-zinc-900 to-black rounded-[40px] p-12 border border-zinc-800 flex flex-col justify-between aspect-square lg:aspect-auto h-full">
                                <div className="space-y-4">
                                    <Badge className="bg-emerald-500 text-black border-none font-black uppercase">Wealth Mode</Badge>
                                    <div className="text-6xl font-black tracking-tighter">$1,240,500.00</div>
                                    <div className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500">Estimated Catalog Value</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-emerald-500">
                                        <span>Wealth Security Score</span>
                                        <span>94/100</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[94%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Secure & Global CTA */}
                <section className="text-center py-24 space-y-12">
                    <div className="flex justify-center items-center gap-12 opacity-30 grayscale">
                        <Globe className="h-12 w-12" />
                        <Lock className="h-12 w-12" />
                        <FileText className="h-12 w-12" />
                    </div>
                    <div className="max-w-3xl mx-auto space-y-8 px-4">
                        <h2 className="text-4xl font-black uppercase tracking-tight leading-none">Your Future <br /> <span className="text-emerald-500">Is Worth Protecting.</span></h2>
                        <p className="text-neutral-400">Join the thousands of creators who are using Mogul to build generational wealth from their art.</p>
                        <Link href="/signup">
                            <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-black uppercase tracking-widest h-16 px-12 rounded-2xl">
                                Start Your Financial Journey
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
