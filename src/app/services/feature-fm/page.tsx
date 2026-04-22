import type { Metadata } from "next";
import { PartnerRedirect } from "@/components/PartnerRedirect";
import { PARTNER_LINKS } from "@/lib/partner-links";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
    Zap, 
    Link as LinkIcon, 
    Users, 
    BarChart3, 
    Target, 
    CheckCircle2,
    Calendar,
    MousePointer2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "feature.fm Marketing Engine | Smart Links & Pre-Saves | Shamiso Music Distribution",
    description: "The music industry's leading marketing & ad suite. Create stunning pre-save pages and smart links for your releases with feature.fm on Shamiso.",
};

const features = [
    {
        title: "Smart Links & Pre-Saves",
        description: "Create stunning landing pages for your singles, albums, and tours. Automatically add your music to your fans' libraries.",
        icon: LinkIcon,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10"
    },
    {
        title: "Audience Direct",
        description: "Build a permanent connection with your fans. Collect emails, phone numbers, and location data directly from your links.",
        icon: Users,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10"
    },
    {
        title: "Advanced Analytics",
        description: "Understand exactly where your clicks are coming from. Track conversions across Spotify, Apple Music, and more.",
        icon: BarChart3,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10"
    },
    {
        title: "Automated Advertising",
        description: "Deploy high-converting ads based on your audience data. Scale your marketing without the complexity of manual setups.",
        icon: Target,
        color: "text-shamiso-gold-bright",
        bgColor: "bg-shamiso-gold/10"
    }
];

export default function FeatureFMPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <PartnerRedirect partnerUrl={PARTNER_LINKS.featureFm} />
            <Header />
            
            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 blur-[150px] rounded-full -z-10 animate-pulse" />
                    
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <Badge variant="outline" className="border-pink-500/30 text-pink-400 uppercase tracking-widest px-4 py-1 bg-pink-500/5">
                                    Strategic Marketing Suite
                                </Badge>
                                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9]">
                                    The Ultimate <br /> 
                                    <span className="text-pink-500">Marketing</span> Engine.
                                </h1>
                                <p className="text-xl text-neutral-400 leading-relaxed max-w-xl">
                                    Smart Links. Audience Data. Automated Ads. Everything you need to turn every click into a lifelong fan connection.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link href={PARTNER_LINKS.featureFm} target="_blank">
                                    <Button size="lg" className="bg-linear-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black uppercase tracking-widest h-16 px-10 rounded-2xl shadow-xl shadow-pink-600/20 transition-all hover:scale-105">
                                        <MousePointer2 className="mr-2 h-5 w-5" />
                                        Create Your First Link
                                    </Button>
                                </Link>
                                <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                                    Preferred Industry Standard
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { title: "Pre-Save", count: "8.4k", icon: Calendar, color: "text-pink-400" },
                                    { title: "Audience", count: "12.1k", icon: Users, color: "text-purple-400" },
                                    { title: "Clicks", count: "45.2k", icon: MousePointer2, color: "text-blue-400" },
                                    { title: "Revenue", count: "+24%", icon: BarChart3, color: "text-green-400" }
                                ].map((card, i) => (
                                    <div key={card.title} className={`p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-${4*(i+1)} duration-700`}>
                                        <card.icon className={`h-6 w-6 ${card.color} mb-4`} />
                                        <div className="text-2xl font-black text-white">{card.count}</div>
                                        <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{card.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Integration Section */}
                <section className="bg-zinc-900/10 py-24 border-y border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black uppercase mb-4 tracking-tight">Professional Tools for Every Release</h2>
                            <p className="text-neutral-400 max-w-2xl mx-auto">Used by major labels and independent legends to understand their fanbase.</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature) => (
                                <div key={feature.title} className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900/80 transition-all group">
                                    <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                    </div>
                                    <h3 className="text-lg font-black mb-3 uppercase tracking-tight leading-tight">{feature.title}</h3>
                                    <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Narrative Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="rounded-3xl border border-zinc-800 bg-linear-to-br from-[#0c000c] to-black p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-pink-600/5 pointer-events-none" />
                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <h2 className="text-3xl font-black uppercase">More Than Just a Link</h2>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                In today&apos;s digital landscape, a link is more than just a destination—it&apos;s a data point. feature.fm on Shamiso Distribution provides you with a professional marketing suite that turns every click into a fan connection.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-8">
                                {[
                                    "Spotify & Apple Integrated",
                                    "Custom Branded Domains",
                                    "Remarketing Pixel Support",
                                    "Fan Email Collection"
                                ].map(text => (
                                    <div key={text} className="flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-pink-500" />
                                        <span className="text-sm font-bold uppercase tracking-widest text-neutral-300">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
