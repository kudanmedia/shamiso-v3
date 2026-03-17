import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
    Headphones, 
    Zap, 
    BarChart, 
    Shield, 
    Music, 
    CheckCircle2,
    Play,
    Settings,
    Layers
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Roex Studio Suite | Perfect Your Mix | Shamiso Music Distribution",
    description: "AI-powered mix analysis and professional mastering checks. Ensure your tracks are streaming-ready with Mix Check Studio by Roex.",
};

const features = [
    {
        title: "Objective AI Feedback",
        description: "Get instant data on your frequency balance, stereo width, and dynamic range compared to chart-topping references.",
        icon: BarChart,
    },
    {
        title: "Mastering+ Optimization",
        description: "Automatically improve your track’s tonal balance and loudness for global distribution standards.",
        icon: Settings,
    },
    {
        title: "Streaming Ready",
        description: "Ensure your LUFS and True Peak levels are optimized so streaming platforms don't turn your volume down.",
        icon: Music,
    },
    {
        title: "Privacy First",
        description: "We do not train our AI on your music. Your intellectual property stays 100% yours, always.",
        icon: Shield,
    }
];

const steps = [
    { title: "Upload", desc: "Drop your WAV, FLAC, or MP3 file into the Mix Check Studio portal." },
    { title: "Analyze", desc: "Roex AI scans your technical metadata and sonic signature in seconds." },
    { title: "Refine", desc: "Download your detailed report and apply the suggested EQ and gain adjustments." },
    { title: "Distribute", desc: "Upload your perfected master to Shamiso with total confidence." }
];

export default function RoexPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            
            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 text-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
                    
                    <div className="space-y-6 max-w-4xl mx-auto">
                        <Badge variant="outline" className="border-blue-500/30 text-blue-400 uppercase tracking-widest px-4 py-1 bg-blue-500/5">
                            AI-Powered Studio Suite
                        </Badge>
                        <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-none">
                            Perfect Your Sound <br /> 
                            <span className="text-blue-500">Before The World Hears It.</span>
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                            Don&apos;t guess if your mix is ready. Get objective, AI-powered feedback to ensure your track stands up against the hits on Spotify and Apple Music.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/signup">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-14 px-8 rounded-xl shadow-lg shadow-blue-600/20">
                                    <Play className="mr-2 h-5 w-5 fill-current" />
                                    Launch Mix Check Studio
                                </Button>
                            </Link>
                            <Link href="#how-it-works">
                                <Button size="lg" variant="outline" className="border-zinc-800 text-white hover:bg-zinc-900 h-14 px-8 rounded-xl">
                                    Watch Deep Dive
                                </Button>
                            </Link>
                        </div>
                        
                        <div className="pt-12 flex items-center justify-center gap-8 text-neutral-500">
                            <div className="text-center">
                                <div className="text-2xl font-black text-white">1.1M+</div>
                                <div className="text-[10px] uppercase tracking-widest">Tracks Checked</div>
                            </div>
                            <div className="h-8 w-px bg-zinc-800" />
                            <div className="text-center">
                                <div className="text-2xl font-black text-white">99.9%</div>
                                <div className="text-[10px] uppercase tracking-widest">Accuracy</div>
                            </div>
                            <div className="h-8 w-px bg-zinc-800" />
                            <div className="text-center">
                                <div className="text-2xl font-black text-white">24/7</div>
                                <div className="text-[10px] uppercase tracking-widest">AI Availability</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-zinc-900">
                    <div className="grid md:grid-cols-2 gap-12">
                        {features.map((feature) => (
                            <div key={feature.title} className="flex gap-6 p-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0 border border-blue-600/20 group-hover:border-blue-600/50 transition-colors">
                                    <feature.icon className="w-7 h-7 text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{feature.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed text-sm md:text-base">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Steps Section */}
                <section id="how-it-works" className="bg-zinc-900/20 py-24 border-y border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold uppercase mb-4">How It Works</h2>
                            <p className="text-neutral-400 max-w-2xl mx-auto">From bedroom demo to studio master in four simple steps.</p>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {steps.map((s, idx) => (
                                <div key={s.title} className="relative p-6 rounded-2xl border border-zinc-800 bg-black/40">
                                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 text-black font-black flex items-center justify-center shadow-lg shadow-blue-600/20">
                                        {idx + 1}
                                    </div>
                                    <h4 className="font-bold text-lg mb-2 pt-2">{s.title}</h4>
                                    <p className="text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Audio Comparison / Visuals Placeholder */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-linear-to-br from-zinc-900 to-black p-12 relative">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold uppercase leading-tight">Mastering+ Optimization</h2>
                                <p className="text-neutral-400">
                                    Automatically improve your track&apos;s frequency balance and perceived loudness. Roex doesn&apos;t just tell you what&apos;s wrong—it gives you the tools to make it sound right.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Automated Tonal Balancing",
                                        "Safe-Limiting & LUFS Targeting",
                                        "Precise EQ Correction Curves",
                                        "Stereo Image Enhancement"
                                    ].map(item => (
                                        <li key={item} className="flex items-center gap-3 text-sm font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative aspect-video rounded-2xl bg-zinc-950 border border-blue-500/20 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <Layers className="w-48 h-48 text-blue-500" />
                                </div>
                                <div className="z-10 text-center">
                                    <div className="h-1 lg:h-2 w-48 lg:w-64 bg-zinc-800 rounded-full mb-4 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-blue-500 animate-[shimmer_2s_infinite]" />
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400">Visualizer Component Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="text-center py-12">
                    <h3 className="text-xl font-bold mb-6 text-neutral-400 italic">Ready to level up?</h3>
                    <Link href="/signup">
                        <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-black uppercase tracking-widest h-16 px-12 rounded-2xl transition-all hover:scale-105">
                            Start Your Free Analysis
                        </Button>
                    </Link>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
