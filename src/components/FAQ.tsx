"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { PRICING_FACTS } from "@/lib/pricing";

const faqs = [
    {
        question: "HOW DO INDEPENDENT ARTISTS OR LABELS DISTRIBUTE MUSIC IN AFRICA AND BEYOND?",
        answer: (
            <div className="space-y-4 text-neutral-400">
                <p>
                    Artists and Labels move their recorded music/songs through digital distributors like Shamiso Music Distribution (SMD). We help you push your tracks to global giants like Spotify, Apple Music, Melon and YouTube, as well as regional powerhouses like Boomplay and Mdundo. We also ensure your music is ready for viral moments on TikTok and Instagram Reels, and available on digital stores like Amazon Music.
                </p>
                <p>
                    Distributing as an "indie" artist in 2026 and beyond landscape is straightforward. You don't need a major label deal to get heard from Johannesburg to Lagos. To get your music live, follow these steps:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Finalise Your Tracks:</strong> Record your music in high-quality WAV or FLAC format. Ensure your mixing is crisp and club-ready.</li>
                    <li><strong>Join the SMD Family:</strong> Sign up for a Shamiso Music Distribution account and build your Artist Profile. You can link existing Spotify and Apple Music pages or set up brand-new profiles. Choose the plan that fits your hustle: Shamiso Entry, Shamiso Pro, Shamiso Label, or Shamiso Enterprise.</li>
                    <li><strong>Upload Your Content:</strong> Drop your audio files and "metadata" (track titles, high-res cover art, and featured artists). You can even use our built-in Mastering tools to give your songs that professional edge.</li>
                    <li><strong>Lock in the Paperwork:</strong> Enter your release details and add your collaborators to the Smart-Split system. This ensures everyone—from the producer to the featured vocalist - gets their royalties automatically.</li>
                    <li><strong>Review and Fire:</strong> Submit your release for the SMD team to audit. Pro, Label, and Enterprise artists can pick their own release dates to align with their "Link Up" events or social media blitzes.</li>
                    <li><strong>Go Live:</strong> Your music hits the streets on the platforms included in your plan. You can go live in as little as 5 business days on Entry and just 2 business days on our premium tiers.</li>
                </ul>
            </div>
        )
    },
    {
        question: "WHAT KIND OF ARTISTS DOES SHAMISO MUSIC DISTRIBUTION WORK WITH?",
        answer: (
            <div className="space-y-4 text-neutral-400">
                <p>
                    SMD is for the culture. We work with everyone - from Amapiano producers in Pretoria and Afrobeats stars in Lagos to Zimdancehall chanters, Kuduro, Bongoflava and Genge/Singeli artists. Whether you’re just dropping your first freestyle or you’re a household name, we have a plan for your stage:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>SHAMISO ENTRY:</strong> Perfect for those just starting their journey. You get Unlimited Music Distribution to all major stores while only paying a {PRICING_FACTS.entryCommission} commission on your earnings. It&apos;s the best way to build your data and get discovered.</li>
                    <li><strong>SHAMISO RISE:</strong> Designed for the career artist. You keep {PRICING_FACTS.proRoyaltyKeep} of your streaming royalties and get unlimited releases. This plan is built to displace expensive global competitors by offering local WhatsApp support.</li>
                    <li><strong>SHAMISO PRO:</strong> Designed for the career artist. You keep {PRICING_FACTS.proRoyaltyKeep} of your streaming royalties and get unlimited releases. This plan is built to displace expensive global competitors by offering local WhatsApp support.</li>
                    <li><strong>SHAMISO LABEL:</strong> For the local moguls running a stable. Manage multiple artists, enjoy automated ZAR/Naira/KES royalty splits, and use custom ISRC/UPC codes to own your data.</li>
                    <li><strong>SHAMISO ENTERPRISE (SHAMISO PRO):</strong> Our top-tier partnership. You get hands-on support from our Artist Relations team and exclusive eligibility for the $2M Shamiso Capital Advance Fund.</li>
                </ul>
            </div>
        )
    },
    {
        question: "WHAT’S THE DIFFERENCE BETWEEN THE ENTRY AND PRO PLANS?",
        answer: (
            <div className="space-y-4 text-neutral-400">
                <p>
                    SMD Entry is our &quot;No-Barriers&quot; plan. It allows you to distribute unlimited music for $0 upfront. We take a {PRICING_FACTS.entryCommission} commission to cover our administrative costs, meaning we only make money when you do. It&apos;s ideal for building your catalog and testing the waters.
                </p>
                <p>
                    SMD Pro is a premium subscription. The biggest difference? You keep {PRICING_FACTS.proRoyaltyKeep} of your streaming royalties - we take zero commission. You also get advanced analytics, faster delivery times, and the ability to schedule your releases for maximum impact.
                </p>
            </div>
        )
    },
    {
        question: "HOW CAN I LAND BRAND DEALS AND SYNC LICENSING?",
        answer: (
            <div className="space-y-4 text-neutral-400">
                <p>
                    With SMD Enterprise and Label tiers, we actively pitch your music for game-changing Sync Licensing and Brand Partnerships.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Brand Partnerships:</strong> These are "collabs" where your music or image is featured in a corporate campaign. This could range from being on a high-profile playlist to becoming a brand ambassador for major African or global brands.</li>
                    <li><strong>Sync Licensing:</strong> This is the big win—getting your track featured in TV Shows, Netflix Originals, Video Games, or Movies.</li>
                </ul>
                <p>To be "Sync-Ready," you should:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Keep it Professional:</strong> Ensure your social media is "brand-safe" (no red flags).</li>
                    <li><strong>Build Your Tribe:</strong> Consistency on TikTok and Instagram shows brands you have a loyal fan base.</li>
                    <li><strong>Sharpen the Live Show:</strong> Brands love artists who can command a stage.</li>
                    <li><strong>Own Your Masters:</strong> Distributing through SMD ensures your paperwork is clean, making it easy for a movie producer to clear your song in hours, not weeks.</li>
                </ul>
            </div>
        )
    },

];

export interface FAQItem {
    question: string;
    answer: React.ReactNode;
}

interface FAQProps {
    faqs?: FAQItem[];
    title?: React.ReactNode;
}

export function FAQ({ faqs: customFaqs, title: customTitle }: FAQProps = {}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const displayFaqs = customFaqs || faqs;
    const displayTitle = customTitle || (
        <>Music distribution for independent artists <span className="text-shamiso-gold-bright">FAQs</span></>
    );

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative py-24 bg-black border-t border-white/5">
            <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-black text-white uppercase sm:text-4xl">
                        {displayTitle}
                    </h2>
                </div>

                <div className="space-y-4">
                    {displayFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-xl overflow-hidden bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors"
                        >
                            <button
                                className="w-full flex items-center justify-between p-6 text-left"
                                onClick={() => toggleFaq(index)}
                            >
                                <h3 className="text-lg font-bold text-white uppercase pr-8 tracking-tight">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    className={`h-5 w-5 text-shamiso-gold transition-transform duration-300 shrink-0 ${openIndex === index ? "rotate-180" : ""}`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-[1000px] opacity-100 pb-6 px-6" : "max-h-0 opacity-0 px-6"
                                    }`}
                            >
                                <div className="border-t border-white/10 pt-4">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
