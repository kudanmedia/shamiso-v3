import type { Metadata } from "next";
import Image from "next/image";
import { FundingForm } from "@/components/FundingForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
    CheckCircle2, 
    DollarSign, 
    Zap, 
    ShieldCheck, 
    Lock,
    BarChart3,
    ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
    title: "Funding & Advances | Shamiso Music Distribution",
    description: "Get funded from $1,000 to $1M+. Keep your masters. Powered by beatBread. The sovereign way to scale your music career.",
};

const pillars = [
    {
        title: "Fast & Automated",
        description: "Get a funding offer in minutes based on your streaming data. No long waits or mountain of paperwork.",
        icon: Zap,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10"
    },
    {
        title: "Keep Your Masters",
        description: "Unlike traditional label deals, we don't take your rights. You retain 100% ownership of your intellectual property.",
        icon: ShieldCheck,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    {
        title: "No Credit Checks",
        description: "We fund based on your talent and streaming performance, not your personal credit score or financial history.",
        icon: Lock,
        color: "text-green-500",
        bgColor: "bg-green-500/10"
    },
    {
        title: "Scale Your Growth",
        description: "Use your advance for marketing, touring, or production. Scale your career on your own terms.",
        icon: BarChart3,
        color: "text-shamiso-gold-bright",
        bgColor: "bg-shamiso-gold/10"
    }
];

export default function FundingPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            
            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <Badge variant="outline" className="border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest px-4 py-1">
                                    Sovereign Capital Vault
                                </Badge>
                                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
                                    Funding That <span className="gradient-text">Doesn&apos;t Own You.</span>
                                </h1>
                                <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
                                    Advances from <span className="text-white font-bold">$1,000 to $10M+</span>. No credit check. Keep 100% of your masters. Powered by <span className="text-shamiso-gold-bright font-bold">beatBread</span>.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm font-medium">100% Ownership Retained</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm font-medium">Offers in Minutes</span>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-zinc-900 flex items-center gap-6">
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Global Partner:</span>
                                <Image 
                                    src="/beatbread.svg" 
                                    alt="beatBread" 
                                    width={140} 
                                    height={30} 
                                    className="opacity-80 brightness-0 invert"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-shamiso-gold/10 blur-3xl rounded-full opacity-20" />
                            <FundingForm />
                        </div>
                    </div>
                </section>

                {/* Pillars Section */}
                <section className="bg-zinc-900/30 py-24 border-y border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold uppercase mb-4">The beatBread Advantage</h2>
                            <p className="text-neutral-400 max-w-2xl mx-auto">
                                We&apos;ve partnered with the world&apos;s leader in independent music funding to give SMD artists the leverage they deserve.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {pillars.map((pillar) => (
                                <div key={pillar.title} className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-shamiso-gold/20 transition-colors group">
                                    <div className={`w-12 h-12 rounded-xl ${pillar.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 uppercase tracking-tight">{pillar.title}</h3>
                                    <p className="text-sm text-neutral-400 leading-relaxed">{pillar.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ or Info Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold uppercase mb-8">How it Works</h2>
                            <div className="space-y-8">
                                {[
                                    { step: "01", title: "Complete the Gateway", desc: "Fill out the pre-qualification form on this page to activate your SMD-exclusive referral." },
                                    { step: "02", title: "Connect via beatBread", desc: "Follow the link to the beatBread portal and connect your Spotify for Artists or distributor account." },
                                    { step: "03", title: "Review Your Offers", desc: "Receive multiple funding options. Choose the one that fits your career goals and repayment comfort." },
                                    { step: "04", title: "Deploy Capital", desc: "Once accepted, funds are usually deployed to your account in as little as 48 hours." }
                                ].map((s) => (
                                    <div key={s.step} className="flex gap-6">
                                        <span className="text-4xl font-black text-shamiso-gold/20 leading-none">{s.step}</span>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{s.title}</h4>
                                            <p className="text-neutral-400 text-sm">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-shamiso-gold/5 rounded-3xl border border-shamiso-gold/10 p-12 flex flex-col justify-center">
                            <h2 className="text-2xl font-bold mb-4 uppercase">Why wait for a label?</h2>
                            <p className="text-neutral-300 mb-8 leading-relaxed">
                                Traditional record deals often mean giving up your masters and your creative freedom. SMD x beatBread flipping the script. We give you the capital of a major label with the independence of a DIY artist.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-shamiso-gold/20 flex items-center justify-center shrink-0 mt-1">
                                        <CheckCircle2 className="w-3 h-3 text-shamiso-gold-bright" />
                                    </div>
                                    <p className="text-sm text-neutral-400 italic font-medium">Over $100M+ deployed to independent artists globally.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-shamiso-gold/20 flex items-center justify-center shrink-0 mt-1">
                                        <CheckCircle2 className="w-3 h-3 text-shamiso-gold-bright" />
                                    </div>
                                    <p className="text-sm text-neutral-400 italic font-medium">Preferred rates for Shamiso Music Distribution artists.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
