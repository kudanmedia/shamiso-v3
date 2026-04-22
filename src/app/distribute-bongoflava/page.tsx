import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title: "Distribute Bongoflava Music | Shamiso - Africa's Sovereign Distributor",
    description: "Distribute Bongoflava music to 450+ stores worldwide. Claim a 0% US Withholding Rate (Article 12). Keep 100% of your masters. Get funded up to $10M+ via the Sovereign Capital Vault.",
};

const relatedGenres = [
    { label: "Singeli", href: "/distribute-singeli" },
    { label: "Afrobeats", href: "/distribute-afrobeats" },
    { label: "Amapiano", href: "/distribute-amapiano" },
];

const highlights = [
    "Bongoflava-first distribution — reaching the massive East African audience on Boomplay, Spotify, and YouTube.",
    "Strategic metadata — ensuring Swahili lyrics and Tanzanian culture are indexed correctly for global discovery.",
    "Claim a 0% US Withholding Rate under Article 12 — an immediate 30% revenue boost on your US royalties.",
    "Sovereign funding up to $10M+ — stay independent while scaling your label or artist brand.",
    "Direct curation pitching for East African hubs at major global streaming services.",
    "Empowering the poets of East Africa with enterprise-grade distribution infrastructure.",
];

export default function DistributeBongoflava() {
    return (
        <GenrePage
            genre="Bongoflava"
            tagline="The poetic power of East Africa, refined for the world stage."
            description="From the streets of Tanzania to the global charts, Bongoflava is a cultural powerhouse. Shamiso provides the specialized distribution and royalty recovery tools Bongoflava artists need to monetize their massive reach."
            highlights={highlights}
            stores="450"
            relatedGenres={relatedGenres}
        />
    );
}
