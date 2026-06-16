import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { getPublicSiteSettings } from "@/lib/server/site-settings";

export const metadata: Metadata = {
    title: "Join the SMD Inner Circle | WhatsApp Community",
    description: "Join the exclusive SMD WhatsApp community for Collabo Engineering and A&R tips.",
};

export default async function WhatsAppGroupPage() {
    const { whatsapp_invite_url } = await getPublicSiteSettings();

    return (
        <div className="relative min-h-[calc(100vh-4rem)] pt-24 pb-20 flex flex-col items-center justify-center overflow-hidden">
            {/* Background styling */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0c0a00] via-[#1a1400] to-[#0d0800] -z-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#25D366]/5 blur-[120px] -z-10" />

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.03] -z-10"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,215,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.4) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 z-10 text-center animate-in slide-in-from-bottom-8 duration-700 fade-in">

                <div className="mx-auto w-24 h-24 mb-10 rounded-full bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/30 shadow-[0_0_50px_rgba(37,211,102,0.15)]">
                    <MessageCircle className="w-12 h-12 text-[#25D366]" />
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
                    The SMD <span className="text-[#25D366]">Inner Circle</span>
                </h1>

                <p className="text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-10">
                    You&apos;re about to join the most exclusive network of African independent artists.
                    Get direct access to our A&R team, Algorithmic Trigger strategies, and Collabo Engineering opportunities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-12">
                    <div className="bg-black/40 border border-[#25D366]/20 rounded-xl p-4 backdrop-blur-sm flex items-start gap-3">
                        <Zap className="w-5 h-5 text-shamiso-gold-bright mt-0.5" />
                        <p className="text-sm text-neutral-300"><strong className="text-white block">Algorithmic Triggers</strong>Weekly tips on mastering Spotify and Apple Music algorithms.</p>
                    </div>
                    <div className="bg-black/40 border border-[#25D366]/20 rounded-xl p-4 backdrop-blur-sm flex items-start gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5" />
                        <p className="text-sm text-neutral-300"><strong className="text-white block">Direct Support</strong>Bypass the ticket queue and speak directly with the team.</p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col items-center gap-6">
                    <a href={whatsapp_invite_url} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto px-10 bg-[#25D366] hover:bg-[#1fb355] text-black font-black uppercase tracking-wide h-16 text-lg shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] transition-all hover:scale-[1.03]">
                            <MessageCircle className="w-6 h-6 mr-3" />
                            Open in WhatsApp
                        </Button>
                    </a>

                    <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-sm uppercase tracking-wide font-bold">
                        Skip for now <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
