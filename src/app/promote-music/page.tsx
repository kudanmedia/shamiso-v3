import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
    Rocket,
    BarChart3,
    Music2,
    ShieldCheck,
    Smartphone,
    TrendingUp,
    Globe,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { FAQ } from "@/components/FAQ";

export default function PromoteMusicPage() {
    return (
        <main className="min-h-screen bg-black pt-24 pb-24">
            {/* Hero Section */}
            <section className="relative overflow-hidden mb-24">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a00] via-[#1a1400] to-[#0d0800] -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-shamiso-gold/10 blur-[120px] -z-10" />

                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <Badge variant="outline" className="mb-6 border-shamiso-gold/30 bg-shamiso-gold/10 px-4 py-1.5 text-shamiso-gold font-semibold uppercase tracking-wider">
                        <Rocket className="mr-2 h-4 w-4" />
                        Music Marketing 2026
                    </Badge>
                    <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl uppercase lg:text-7xl">
                        How Do I Market My Sound<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-shamiso-gold to-shamiso-gold-bright">Online With Shamiso?</span>
                    </h1>
                    <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-neutral-400">
                        To start pushing your music to the right ears with Shamiso Music Distribution (SMD), you first need to pick your lane. While our <span className="text-white font-bold">Bantu Entry ($0)</span> tier gets you on the map, upgrading to <span className="text-white font-bold">Bantu Rise, Pro, Label, or Enterprise</span> unlocks the high-level tools needed to scale your brand across the continent and the diaspora.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/signup">
                            <Button size="lg" className="h-14 bg-shamiso-gold px-8 text-base font-bold text-black hover:bg-shamiso-gold-bright w-full sm:w-auto transition-transform hover:scale-105">
                                Upgrade Your Arsenal
                            </Button>
                        </Link>
                        <Link href="/pricing">
                            <Button variant="outline" size="lg" className="h-14 border-zinc-700 text-white hover:bg-zinc-800 w-full sm:w-auto">
                                View Pricing Tiers
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Growth Engine Tools Grid */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl mb-6">
                        What are the best tools for<br className="hidden sm:block" /> African Indie Artists to grow?
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-neutral-400">
                        SMD isn't just an "uploader" - we are a growth engine. We offer a specialized suite of marketing tools built for the modern digital landscape.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl transition hover:border-shamiso-gold/50">
                        <div className="mb-6 inline-flex rounded-lg bg-shamiso-gold/10 p-3 text-shamiso-gold">
                            <Smartphone className="h-6 w-6" />
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-white uppercase tracking-tight">A&R Strategy</h3>
                        <p className="text-neutral-400">
                            Real-time advice via our WhatsApp Business support for Pro users. Get immediate guidance when rolling out your campaign.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl transition hover:border-shamiso-gold/50">
                        <div className="mb-6 inline-flex rounded-lg bg-blue-500/10 p-3 text-blue-400">
                            <Music2 className="h-6 w-6" />
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-white uppercase tracking-tight">Editorial Playlisting</h3>
                        <p className="text-neutral-400">
                            Direct pitching to curators at Spotify, Apple Music, Boomplay, and Mdundo to land those massive algorithmic spikes.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl transition hover:border-shamiso-gold/50">
                        <div className="mb-6 inline-flex rounded-lg bg-emerald-500/10 p-3 text-emerald-400">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-white uppercase tracking-tight">Sync & Brand Deals</h3>
                        <p className="text-neutral-400">
                            Exclusive access to TV, Film, and corporate "collabs" through our Shamiso Media wing for advanced placements.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-xl transition hover:border-shamiso-gold/50">
                        <div className="mb-6 inline-flex rounded-lg bg-purple-500/10 p-3 text-purple-400">
                            <Globe className="h-6 w-6" />
                        </div>
                        <h3 className="mb-4 text-xl font-bold text-white uppercase tracking-tight">Audience Insights</h3>
                        <p className="text-neutral-400">
                            Deep-dive analytics that show you exactly where your "Superfans" are - whether it's Lagos, Johannesburg, Nairobi, Accra, or London.
                        </p>
                    </div>
                </div>
            </section>

            {/* Split Content Sections */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 space-y-24">

                {/* 1. Value Proposition */}
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-black uppercase text-white sm:text-4xl">
                            Is it worth paying for<br /> <span className="text-shamiso-gold-bright">Marketing Services?</span>
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            In a crowded market like Amapiano or Afrobeats, "vibe and inshallah" isn't a strategy. Investing in a <span className="text-white font-bold">Bantu Pro ($24.99)</span> or <span className="text-white font-bold">Bantu Enterprise ($149)</span> plan is an investment in your business infrastructure.
                        </p>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            Our premium tiers give you the professional <strong>"MasterLink"</strong> tools and the <span className="text-shamiso-gold">Advance Fund eligibility</span> you need to finance your music videos, radio tours, and social media blitzes.
                        </p>
                    </div>
                    <div className="flex-1 relative w-full h-full min-h-[400px] rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-shamiso-gold/20 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <BarChart3 className="w-16 h-16 text-shamiso-gold mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-2 uppercase">Stop Guessing</h3>
                            <p className="text-neutral-400 max-w-sm">Turn pure vibes into actionable, measurable business growth with our elite marketing analytics stack.</p>
                        </div>
                    </div>
                </div>

                {/* 2. TikTok Strategy */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-black uppercase text-white sm:text-4xl">
                            How do I use TikTok and<br /> <span className="text-shamiso-gold-bright">Reels to blow up?</span>
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                            Short-form video is the new "Radio" in Sub-Saharan Africa and globally. You market effectively by mastering the algorithm and the culture.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <CheckCircle2 className="mr-3 h-6 w-6 shrink-0 text-shamiso-gold" />
                                <div>
                                    <strong className="text-white block uppercase text-sm tracking-wider mb-1">Creating Challenges</strong>
                                    <span className="text-neutral-400">Use your music to start a trend or dance that reflects your local culture.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="mr-3 h-6 w-6 shrink-0 text-shamiso-gold" />
                                <div>
                                    <strong className="text-white block uppercase text-sm tracking-wider mb-1">Influencer Collabs</strong>
                                    <span className="text-neutral-400">We help connect you with content creators who can use your sounds in their videos.</span>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle2 className="mr-3 h-6 w-6 shrink-0 text-shamiso-gold" />
                                <div>
                                    <strong className="text-white block uppercase text-sm tracking-wider mb-1">UGC Monetization</strong>
                                    <span className="text-neutral-400">SMD automatically distributes your music to TikTok, Instagram, and Facebook. We ensure you get paid every time someone uses your sound.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 relative w-full h-full min-h-[400px] rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <TrendingUp className="w-16 h-16 text-rose-500 mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-2 uppercase">Viral Velocity</h3>
                            <p className="text-neutral-400 max-w-sm">Capture every cent of revenue generated by fans matching your tracks with their content.</p>
                        </div>
                    </div>
                </div>

                {/* 3. The Plug */}
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-black uppercase text-white sm:text-4xl">
                            Can <span className="text-shamiso-gold-bright">Shamiso</span> actually<br /> help me get famous?
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            We provide the <strong>"plug"</strong> but you provide the <strong>"spark."</strong>
                        </p>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            Shamiso Music Distribution is committed to moving the culture forward. With our Enterprise partnership, our in-house Artist Relations team works hands-on with established acts to coordinate global release strategies, ensuring your <em>"drop"</em> isn't just a post, but a massive cultural moment.
                        </p>
                        <Link href="/signup" className="inline-flex items-center text-shamiso-gold hover:text-shamiso-gold-bright font-bold uppercase tracking-wider transition-colors mt-4">
                            Apply for Enterprise <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                    <div className="flex-1 relative w-full h-full min-h-[400px] rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <Globe className="w-16 h-16 text-cyan-400 mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-2 uppercase">Global Coordination</h3>
                            <p className="text-neutral-400 max-w-sm">Our in-house team synchronizes your release across multiple timezones, stores, and cultural epicenters.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SmartLink Pre-save Banner */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
                <div className="rounded-3xl border border-shamiso-gold/20 bg-linear-to-b from-shamiso-gold/10 to-transparent p-8 sm:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-[200px] w-[200px] rounded-full bg-shamiso-gold/20 blur-[60px]" />
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-5xl mb-6 relative z-10">
                        How do I market my music <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-shamiso-gold to-shamiso-gold-bright">before the drop?</span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-neutral-300 mb-8 relative z-10 leading-relaxed">
                        Preparation is everything. For every release, SMD generates a custom <strong>SmartLink</strong>. This is a single landing page you can share on your WhatsApp Status or Instagram Bio. It allows your fans to <strong>"Pre-Save"</strong> your track so it lands in their library the second it drops.
                    </p>
                    <p className="max-w-2xl mx-auto text-sm text-neutral-400 mb-10 relative z-10">
                        Once the music is live, our Bantu Pro and Bantu Enterprise artists can then leverage our Sync Briefs and Brand Partnership portal to keep the momentum going long after release day.
                    </p>
                    <Link href="/signup">
                        <Button size="lg" className="h-14 bg-white text-black hover:bg-neutral-200 font-bold uppercase tracking-wider relative z-10 shadow-xl transition-transform hover:scale-105">
                            Generate Your First SmartLink
                        </Button>
                    </Link>
                </div>
            </section>

            <FAQ />
        </main>
    );
} 
