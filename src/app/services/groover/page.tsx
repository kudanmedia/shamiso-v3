import type { Metadata } from "next";
import Image from "next/image";
import { PartnerRedirect } from "@/components/PartnerRedirect";
import { getPartnerLinks } from "@/lib/server/partner-links";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
    MessageSquare, 
    Vibrate, 
    Send, 
    Radio, 
    PlayCircle, 
    Award,
    CheckCircle2,
    Users
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Groover Industry Networking | Guaranteed Feedback | Shamiso Music Distribution",
    description: "Connect directly with playlist curators, blogs, labels, and radio stations. Get guaranteed feedback in 7 days with Groover on Shamiso.",
};

const stats = [
    { label: "Vetted Professionals", count: "3,000+" },
    { label: "Feedback Rate", count: "100%" },
    { label: "Response Time", count: "< 7 Days" },
    { label: "Successful Placements", count: "250K+" }
];

const steps = [
    {
        title: "Select Your Curators",
        description: "Choose from 3,000+ vetted professionals filtered by genre, location, and type (Playlists, Labels, Radio, etc.).",
        icon: Users,
    },
    {
        title: "Send Your Track",
        description: "Share your latest release or an unreleased demo directly. Brief your targets on what you're looking for.",
        icon: Send,
    },
    {
        title: "Get Results",
        description: "Receive guaranteed written feedback within 7 days. If they love it, you get a placement or a meeting.",
        icon: MessageSquare,
    }
];

export default async function GrooverPage() {
    const links = await getPartnerLinks();
    return (
        <div className="min-h-screen bg-black text-white">
            <PartnerRedirect partnerUrl={links.groover} />
            <Header />
            
            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 overflow-hidden">
                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-500/10 blur-[150px] rounded-full -z-10" />
                    
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <Badge variant="outline" className="border-sky-500/30 text-sky-400 uppercase tracking-widest px-4 py-1 bg-sky-500/5">
                                    Direct Industry Access
                                </Badge>
                                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                                    Get Heard By <br />
                                    <span className="text-sky-500">The Pros.</span>
                                </h1>
                                <p className="text-xl text-neutral-400 leading-relaxed max-w-xl">
                                    Stop sending cold emails that never get opened. Connect directly with the people who can change your career.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link href="/signup">
                                    <Button size="lg" className="bg-sky-600 hover:bg-sky-500 text-white font-black uppercase tracking-widest h-16 px-10 rounded-2xl shadow-xl shadow-sky-600/20 transition-all hover:scale-105">
                                        <Vibrate className="mr-2 h-5 w-5" />
                                        Pitch Your Music
                                    </Button>
                                </Link>
                                <Image 
                                    src="/Groover_Logo_Main_White.svg" 
                                    alt="Groover" 
                                    width={120} 
                                    height={40} 
                                    className="opacity-80"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <div className="p-1 w-full rounded-[40px] bg-linear-to-br from-sky-500/20 via-zinc-800 to-transparent">
                                <div className="bg-zinc-950 rounded-[38px] p-10 overflow-hidden relative">
                                    <div className="grid grid-cols-2 gap-8 relative z-10">
                                        {stats.map(s => (
                                            <div key={s.label}>
                                                <div className="text-3xl font-black text-white">{s.count}</div>
                                                <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mt-1">{s.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-12 space-y-4">
                                        {[
                                            "Submit to Blogs, Radio, Labels, and Playlists",
                                            "100% Guaranteed Feedback in 7 Days",
                                            "Transparent Professional Networking",
                                            "Special SMD Referral Discounts"
                                        ].map(text => (
                                            <div key={text} className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-sky-500" />
                                                <span className="text-sm font-medium text-neutral-300">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Steps Section */}
                <section className="bg-zinc-900/10 py-24 border-y border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black uppercase mb-4 tracking-tight">How it Works</h2>
                            <p className="text-neutral-400 max-w-2xl mx-auto">No more &quot;black hole&quot; submissions. Groover provides a transparent gateway to the global music industry.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-12">
                            {steps.map((s, idx) => (
                                <div key={s.title} className="text-center group">
                                    <div className="w-20 h-20 rounded-3xl bg-sky-600/10 border border-sky-600/20 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                                        <s.icon className="w-10 h-10 text-sky-500" />
                                    </div>
                                    <h3 className="text-xl font-bold uppercase mb-4">{s.title}</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{s.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="relative rounded-3xl overflow-hidden p-1">
                        <div className="absolute inset-0 bg-linear-to-r from-sky-600 via-transparent to-sky-600 animate-[shimmer_4s_infinite]" />
                        <div className="bg-black relative rounded-2xl p-16 text-center space-y-8">
                            <div className="max-w-2xl mx-auto">
                                <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">Guaranteed Written <br /><span className="text-sky-500">Feedback.</span></h2>
                                <p className="text-neutral-400 text-lg">
                                    Join the 30% of artists on Groover who have already landed at least one opportunity through the platform. Your music deserves expert attention.
                                </p>
                            </div>
                            <Link href="/signup">
                                <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-black uppercase tracking-widest h-16 px-12 rounded-2xl">
                                    Connect with Curators Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
