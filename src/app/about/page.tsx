import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { FoundersLetter } from "@/components/FoundersLetter";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
    title: "About Us | Shamiso Music Group",
    description: "The Operating System for the Global Artist. 30 Years of Culture.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold/5 blur-[120px]" />
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-900/5 blur-[120px]" />

            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <Badge variant="outline" className="border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest font-bold px-4 py-1.5 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                        About Us: Shamiso Music Group
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
                        The Operating System for the <span className="text-transparent bg-clip-text bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright drop-shadow-sm">Global Artist</span>
                    </h1>
                </div>

                <div className="space-y-16 text-lg text-neutral-300 leading-relaxed font-light">
                    {/* Heritage */}
                    <section className="bg-zinc-900/40 border border-white/5 rounded-2xl p-8 backdrop-blur-sm sm:p-10 hover:border-shamiso-gold/20 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                            <div className="h-10 w-1 bg-shamiso-gold rounded-full" />
                            <h2 className="text-2xl font-black text-white uppercase tracking-wider">Our Heritage: 30 Years of Culture</h2>
                        </div>
                        <p className="mb-6 text-neutral-400">
                            Founded in 1995, <strong className="text-white font-semibold">Shamiso Music Group (SMG)</strong> has been the silent engine behind the African musical renaissance. While the digital landscape has shifted, our mission remains the same: to provide the strategic backbone for the world's most iconic voices.
                        </p>
                        <p className="text-neutral-400">
                            From the foundational legends of Highlife and Jazz to the global explosion of Amapiano and Afro-tech, SMG has built a 30-year legacy of trust with artists like **Oliver Mtukuduzu**, **Salif Keita**, **Sizzla Kalonji**, **RUntown**, **DJ Maphorisa**, **Uhuru**, **ShaSha**, **Xelimpilo**, **Jahseed**, **speedy**, **Mapiano**, **Bongo Riot** etc.
                        </p>
                    </section>

                    {/* Evolution */}
                    <section className="bg-zinc-900/40 border border-white/5 rounded-2xl p-8 backdrop-blur-sm sm:p-10 hover:border-shamiso-gold/20 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                            <div className="h-10 w-1 bg-blue-500 rounded-full" />
                            <h2 className="text-2xl font-black text-white uppercase tracking-wider">The Evolution: A Global Infrastructure</h2>
                        </div>
                        <p className="text-neutral-400">
                            In 2026, music is borderless, but the industry's "plumbing" remains trapped in Western-centric models. <strong className="text-white font-semibold">Shamiso Music Distribution (SMD)</strong> was built to solve this. We aren't just a distributor; we are a fully integrated Operating System (OS) that empowers the entire music value chain.
                        </p>
                    </section>

                    {/* Vision & Mission */}
                    <section className="grid gap-8 md:grid-cols-2">
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-8 backdrop-blur-sm hover:border-shamiso-gold/20 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                                <div className="h-10 w-1 bg-shamiso-gold rounded-full" />
                                <h2 className="text-2xl font-black text-white uppercase tracking-wider">Our Vision</h2>
                            </div>
                            <p className="text-lg font-medium text-neutral-300 italic leading-relaxed">
                                "To be the primary financial gateway and digital architect for the African creative economy, ensuring every beat created on the continent translates into generational wealth and global influence."
                            </p>
                        </div>
                        <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-8 backdrop-blur-sm hover:border-shamiso-gold/20 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                                <div className="h-10 w-1 bg-shamiso-gold-bright rounded-full" />
                                <h2 className="text-2xl font-black text-white uppercase tracking-wider">Our Mission</h2>
                            </div>
                            <p className="text-neutral-400 leading-relaxed">
                                Our mission is to empower African creators by bridging the <span className="text-white font-semibold">'Monetization Gap'</span> through hyper-local financial infrastructure, predictive capital, and global metadata excellence. We provide the tools to distribute music, but we exist to accelerate the velocity of African IP.
                            </p>
                        </div>
                    </section>

                    {/* Advantage Table */}
                    <section>
                        <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-8 text-center">The Shamiso Advantage</h2>

                        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-2xl">
                            <table className="w-full text-left text-sm md:text-base">
                                <thead className="bg-black/60 uppercase font-black text-shamiso-gold-bright tracking-wider">
                                    <tr>
                                        <th className="px-6 py-5 border-b border-white/10 w-1/3">Feature</th>
                                        <th className="px-6 py-5 border-b border-white/10">Why We Lead</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-neutral-400">
                                    <tr className="hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-5 font-bold text-white uppercase tracking-wider">Full Ownership</td>
                                        <td className="px-6 py-5 leading-relaxed">We believe in the "Master Rights" economy. You keep 100% of your ownership.</td>
                                    </tr>
                                    <tr className="hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-5 font-bold text-white uppercase tracking-wider">Instant Liquidity</td>
                                        <td className="px-6 py-5 leading-relaxed">We bridge the gap between global streams and local spending power.</td>
                                    </tr>
                                    <tr className="hover:bg-white/2 transition-colors">
                                        <td className="px-6 py-5 font-bold text-white uppercase tracking-wider">Cultural Intelligence</td>
                                        <td className="px-6 py-5 leading-relaxed">Our AI is trained on global data, not just Western trends.</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Pillars */}
                    <section>
                        <h2 className="text-2xl font-black text-white uppercase tracking-wider mb-8 text-center">The Four Pillars of the Shamiso OS</h2>

                        <div className="grid gap-6">
                            <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/40 hover:border-shamiso-gold/20 transition-all">
                                <h3 className="text-xl font-black text-shamiso-gold-bright uppercase tracking-wider mb-3">1. Shamiso Rights <span className="text-sm font-bold text-neutral-500 capitalize tracking-normal block mt-1">Enterprise Infrastructure</span></h3>
                                <p className="text-neutral-400">We provide "Label-in-a-Box" capabilities. Through our core infrastructure, we deliver your music to 450+ platforms globally in under 48 hours with enterprise-grade metadata accuracy.</p>
                            </div>

                            <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/40 hover:border-shamiso-gold/20 transition-all">
                                <h3 className="text-xl font-black text-shamiso-gold-bright uppercase tracking-wider mb-3">2. Shamiso Studio <span className="text-sm font-bold text-neutral-500 capitalize tracking-normal block mt-1">Creative AI Suite</span></h3>
                                <p className="mb-4 text-neutral-400">We’ve removed the financial barriers to professional production. Every client has access to:</p>
                                <ul className="list-disc pl-5 space-y-3 text-neutral-400">
                                    <li><strong className="text-white font-semibold">AI Mastering:</strong> Studio-quality audio optimized for global streaming standards.</li>
                                    <li><strong className="text-white font-semibold">Automated Video Generation:</strong> High-fidelity music videos and social assets generated instantly.</li>
                                </ul>
                            </div>

                            <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/40 hover:border-shamiso-gold/20 transition-all">
                                <h3 className="text-xl font-black text-shamiso-gold-bright uppercase tracking-wider mb-3">3. Shamiso Pulse <span className="text-sm font-bold text-neutral-500 capitalize tracking-normal block mt-1">Growth & Intelligence</span></h3>
                                <p className="text-neutral-400">We don’t just distribute; we accelerate. Our Cultural Intelligence AI identifies regional growth patterns—spotting a bubbling hit in a specific city or suburb—and automatically triggers hyper-local marketing to scale your fanbase.</p>
                            </div>

                            <div className="p-8 rounded-2xl border border-white/5 bg-zinc-900/40 hover:border-shamiso-gold/20 transition-all">
                                <h3 className="text-xl font-black text-shamiso-gold-bright uppercase tracking-wider mb-3">4. Shamiso Pay <span className="text-sm font-bold text-neutral-500 capitalize tracking-normal block mt-1">The Fintech Moat</span></h3>
                                <p className="mb-4 text-neutral-400">This is our "Last Mile" solution. By integrating with Mukuru, Paystack, PawaPay, and Ozow, we ensure money moves at the speed of culture.</p>
                                <ul className="list-disc pl-5 space-y-3 text-neutral-400">
                                    <li><strong className="text-white font-semibold">Local Payouts:</strong> Direct to Mobile Money (M-Pesa, MTN, Airtel) and Instant EFT.</li>
                                    <li><strong className="text-white font-semibold">Cash Access:</strong> Withdraw physical cash via regional partners like Mukuru for unbanked creators.</li>
                                    <li><strong className="text-white font-semibold">B2B Integration:</strong> We enable financial institutions to offer royalty-collateralized loans to their customers.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

            <FoundersLetter />
            
            <Header />
            <Footer />
        </main>
    );
}
