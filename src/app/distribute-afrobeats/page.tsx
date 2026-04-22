import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title: "Distribute Afrobeats Music | Shamiso - Africa's Sovereign Distributor",
    description: "Distribute Afrobeats music to 450+ stores worldwide. Claim a 0% US Withholding Rate (Article 12). Keep 100% of your masters. Get funded up to $10M+ via the Sovereign Capital Vault.",
};

const relatedGenres = [
    { label: "Bongoflava", href: "/distribute-bongoflava" },
    { label: "Amapiano", href: "/distribute-amapiano" },
    { label: "Kuduro", href: "/distribute-kuduro" },
];

const highlights = [
    "Afrobeats-specific metadata optimization — ensuring your tracks land in the right global playlists.",
    "Global viral scaling — we bridge the gap between West African trends and worldwide charts.",
    "Claim a 0% US Withholding Rate under Article 12 — an immediate 30% increase on your US royalty payouts.",
    "Instant advances from $1,000 to $10M+ via our Sovereign Capital Vault — fuel your tour without giving up your rights.",
    "Direct outreach to Afrobeats curators at Spotify (African Heat), Apple Music (Africa Now), and more.",
    "Enterprise-grade infrastructure for the world's most dominant African genre.",
];

export default function DistributeAfrobeats() {
    return (
        <GenrePage
            genre="Afrobeats"
            tagline="The heartbeat of a continent, scaling to every corner of the globe."
            description="Afrobeats has conquered the world. Shamiso provides the enterprise infrastructure and financial leverage that Afrobeats artists and labels need to sustain global careers and build lasting empires."
            highlights={highlights}
            stores="450"
            relatedGenres={relatedGenres}
        />
    );
}
