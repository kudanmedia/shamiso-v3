import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Calculator, 
    TrendingUp, 
    Shield, 
    ArrowRight, 
    CheckCircle2, 
    Search, 
    BarChart3, 
    Database, 
    Lock,
    Globe,
    Radio
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Link from "next/link";
import { getPartnerLinks } from "@/lib/server/partner-links";

export const metadata: Metadata = {
    title: "SMD x Mogul | Tax & Wealth Management | Shamiso Music Distribution",
    description: "Automated tax optimization and wealth management specialized for SMD creators. Secure your financial future while you build your global catalog.",
};

const pillars = [
    {
        title: "Tax Optimization",
        description: "Stop overpaying. Our system automatically identifies deductions and optimizes international withholding (1042-S/1099) so you keep more of what you earn.",
        icon: Calculator,
    },
    {
        title: "Wealth Management",
        description: "Turn hits into assets. Track your catalog’s market value in real-time. Use your data to plan for the long term, from investments to retirement.",
        icon: TrendingUp,
    },
    {
        title: "Creator Specialists",
        description: "Built for Music. Mogul understands 'Black Box' royalties and fragmented data. We speak the language of PROs, mechanicals, and sync.",
        icon: Database,
    },
];

export default async function MogulPage() {
    const links = await getPartnerLinks();
    return (
        <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <Header />
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-emerald-500/10 via-transparent to-transparent -z-10" />
                <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[120px] -z-10" />
                
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Badge variant="outline" className="border-none p-0 text-emerald-400">SMD x Mogul Partnership</Badge>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Don&apos;t Just Collect Royalties. <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-600">Build a Legacy.</span>
                    </h1>
                    
                    <p className="text-xl text-neutral-400 leading-relaxed max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        Automated tax optimization and wealth management specialized for SMD creators. 
                        Secure your financial future while you build your global catalog.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <Link href={links.mogul} target="_blank">
                            <Button className="h-14 px-10 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-base shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                Explore Mogul Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <p className="text-sm text-neutral-500 font-medium">Free for all SMD artists to start.</p>
                    </div>
                </div>
            </section>

            {/* The Three Pillars */}
            <section className="py-24 relative bg-zinc-900/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase tracking-tight mb-4">The Three Pillars of Financial Freedom</h2>
                        <div className="h-1 w-20 bg-emerald-500 mx-auto" />
                    </div>
                    
                    <div className="grid gap-8 md:grid-cols-3">
                        {pillars.map((pillar) => (
                            <div key={pillar.title} className="p-8 rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-500 group">
                                <div className="mb-6 h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                    <pillar.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{pillar.title}</h3>
                                <p className="text-neutral-400 leading-relaxed">{pillar.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why This Matters */}
            <section className="py-24 border-y border-white/5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">
                                Why This Matters <br /> for <span className="text-emerald-500">SMD Artists.</span>
                            </h2>
                            <blockquote className="text-2xl font-medium text-neutral-300 italic border-l-4 border-emerald-500 pl-6 py-2">
                                &quot;As a creator, your music is your capital. Most distributors stop at the payout; Shamiso and Mogul start at your financial growth.&quot;
                            </blockquote>
                            
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <Search className="h-6 w-6 text-emerald-500" />
                                    The &quot;Royalty Source of Truth&quot;
                                </h3>
                                <p className="text-neutral-400 text-lg">Are you leaving money on the table? Our integration scans global databases to find:</p>
                                
                                <div className="grid gap-4">
                                    {[
                                        { t: "Unclaimed Mechanicals", d: "Money sitting in 'Black Boxes' because of metadata gaps." },
                                        { t: "Performance Rights", d: "Ensuring your works are correctly registered with your PRO." },
                                        { t: "Digital Performance", d: "Tracking every stream to ensure the math adds up." }
                                    ].map((item) => (
                                        <div key={item.t} className="flex items-start gap-4 p-4 rounded-xl bg-white/2 hover:bg-white/5 transition-colors border border-white/5">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-1 shrink-0" />
                                            <div>
                                                <div className="font-bold text-white">{item.t}</div>
                                                <div className="text-sm text-neutral-500">{item.d}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] -z-10" />
                            <div className="p-8 md:p-12 rounded-[40px] border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-2xl">
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-8 text-center text-emerald-400">How It Works (The SMD Workflow)</h3>
                                
                                <div className="space-y-8">
                                    {[
                                        { step: 1, t: "Sync Your SMD Data", d: "Connect your Shamiso account to Mogul with one click." },
                                        { step: 2, t: "Audit Your Catalog", d: "Mogul analyzes your historical earnings and metadata." },
                                        { step: 3, t: "Optimize Your Taxes", d: "Receive a personalized tax strategy based on your residency and global income." },
                                        { step: 4, t: "Monitor Your Wealth", d: "Watch your catalog valuation grow as you release more music through SMD." }
                                    ].map((step) => (
                                        <div key={step.step} className="flex gap-6 relative">
                                            {step.step < 4 && <div className="absolute left-[27px] top-10 bottom-[-40px] w-px bg-emerald-500/20" />}
                                            <div className="h-14 w-14 rounded-2xl bg-zinc-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black shrink-0 z-10">
                                                {step.step}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{step.t}</h4>
                                                <p className="text-sm text-neutral-400 leading-relaxed">{step.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-600/5 -z-10" />
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">Ready to go from Artist to Mogul?</h2>
                    <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
                        Join the elite tier of SMD creators who are taking control of their financial destiny.
                    </p>
                    
                    <Link href={links.mogul} target="_blank">
                        <Button className="h-16 px-12 bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-lg shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                            Explore Mogul Now
                            <ArrowRight className="ml-3 h-6 w-6" />
                        </Button>
                    </Link>
                    <p className="mt-6 text-sm text-neutral-500 uppercase tracking-widest font-bold">No credit card required for initial catalog audit.</p>
                </div>
            </section>

            {/* Footer Trust Signals */}
            <section className="py-12 border-t border-white/5 bg-black">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4 justify-center md:justify-start">
                            <Lock className="h-5 w-5 text-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Secure & Encrypted</span>
                        </div>
                        <div className="flex items-center gap-4 justify-center">
                            <Globe className="h-5 w-5 text-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Global Reach Optimization</span>
                        </div>
                        <div className="flex items-center gap-4 justify-center md:justify-end">
                            <Shield className="h-5 w-5 text-emerald-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Strategic Collaboration</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
