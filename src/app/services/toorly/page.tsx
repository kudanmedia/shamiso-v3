import type { Metadata } from "next";
import { PartnerRedirect } from "@/components/PartnerRedirect";
import { PARTNER_LINKS } from "@/lib/partner-links";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
    MapPin, 
    Users, 
    BarChart3, 
    Ticket, 
    Globe, 
    TrendingUp,
    CheckCircle2,
    Music,
    Mic2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "TOORLY for Artists | Fan-Demand Driven Touring | Shamiso Music Distribution",
    description: "Stop guessing where your fans are. Start showing them where you're going. Launch fan-demand driven tour requests with TOORLY on Shamiso.",
};

const features = [
    {
        title: "Launch a Request",
        description: "Set up a &quot;Tour Request&quot; for any city you&apos;re considering. Let your fans lead the way.",
        icon: Mic2,
    },
    {
        title: "Mobilize Your Fans",
        description: "Share your unique TOORLY link. Fans don&apos;t just &quot;like&quot;—they request a show in their specific city.",
        icon: Users,
    },
    {
        title: "Analyze the Heatmap",
        description: "View real-time analytics showing exactly where your &quot;Hard-Ticket&quot; demand is highest.",
        icon: MapPin,
    },
    {
        title: "Book with Certainty",
        description: "Take your TOORLY data to promoters to secure better guarantees and larger venues.",
        icon: Ticket,
    }
];

export default function ToorlyPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <PartnerRedirect partnerUrl={PARTNER_LINKS.toorly} />
            <Header />
            
            <main className="pt-32 pb-24 text-white">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-24 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-shamiso-gold/5 blur-[150px] rounded-full -z-10" />
                    
                    <div className="text-center space-y-8 max-w-4xl mx-auto">
                        <Badge variant="outline" className="border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest px-4 py-1">
                            Fan-Demand Driven Touring
                        </Badge>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.85]">
                            Take Your <br />
                            <span className="gradient-text">Sound To The Stage.</span>
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
                            Stop guessing where your fans are. Start showing them where you&apos;re going. The world&apos;s first fan-demand platform is now integrated with Shamiso.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                           <Link href="/signup">
                                <Button size="lg" className="bg-white text-black hover:bg-neutral-200 font-black uppercase tracking-widest h-16 px-12 rounded-2xl shadow-xl transition-all hover:scale-105">
                                    Launch Tour Request
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* How it Works / Features Grid */}
                <section className="bg-zinc-900/10 py-24 border-y border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((f, i) => (
                                <div key={f.title} className="p-8 rounded-3xl border border-zinc-900 bg-black/40 hover:bg-zinc-900/50 transition-all group">
                                    <div className="text-shamiso-gold-bright font-black text-4xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                                    <f.icon className="h-8 w-8 text-shamiso-gold-bright mb-6" />
                                    <h3 className="text-xl font-bold uppercase mb-4 tracking-tight">{f.title}</h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: f.description }} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SMD Advantage Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">The SMD Advantage <br /><span className="text-shamiso-gold-bright">on the Road.</span></h2>
                            <div className="space-y-6">
                                {[
                                    { t: "Zero-Risk Routing", d: "Only play cities where the demand is verified. No more empty rooms." },
                                    { t: "Sponsorship Leverage", d: "Use fan demographics and demand numbers to sign high-value brand deals." },
                                    { t: "Direct Fan Data", d: "Collect contact info from every fan who requests a show to build your list." }
                                ].map(item => (
                                    <div key={item.t} className="flex gap-4">
                                        <div className="mt-1">
                                            <CheckCircle2 className="h-6 w-6 text-shamiso-gold-bright" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold uppercase tracking-tight">{item.t}</h4>
                                            <p className="text-neutral-400 text-sm">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="relative aspect-square rounded-[40px] overflow-hidden border border-zinc-800 bg-zinc-900/50 p-12 flex flex-col justify-end">
                            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent z-10" />
                            <div className="relative z-20 space-y-2">
                                <div className="text-4xl font-black uppercase text-white">Live Demand Map</div>
                                <p className="text-neutral-400 text-sm uppercase tracking-widest font-bold">Integration Active for SMD Artists</p>
                            </div>
                            <div className="absolute top-12 right-12 z-20">
                                <div className="w-4 h-4 rounded-full bg-shamiso-gold animate-ping opacity-75" />
                                <div className="absolute inset-0 w-4 h-4 rounded-full bg-shamiso-gold" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-linear-to-b from-black to-zinc-950 py-24 border-t border-zinc-900">
                    <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                        <h3 className="text-3xl font-black uppercase">Your Fans Are Calling. <br /> <span className="text-shamiso-gold-bright">Are You Listening?</span></h3>
                        <p className="text-neutral-400 leading-relaxed italic">
                            &quot;The most important data point in a touring artist&apos;s career isn&apos;t streams—it&apos;s ticket intent. TOORLY gives you that intent on a silver platter.&quot;
                        </p>
                        <Link href="/signup">
                            <Button size="lg" className="bg-shamiso-gold hover:bg-shamiso-gold-bright text-black font-black uppercase tracking-widest h-16 px-12 rounded-2xl">
                                Start Your Tour Demand Campaign
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            
            <Footer />
        </div>
    );
}
