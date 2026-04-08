import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title: "Distribute Lekompo Music | Shamiso - Africa's Sovereign Distributor",
    description:
        "Distribute Lekompo music worldwide. Claim a 0% US Withholding Rate (Article 12). Keep 100% of your masters. The premium distributor for Lekompo artists.",
};

const relatedGenres = [
    { label: "3-Step", href: "/distribute-3-step" },
    { label: "Maskandi", href: "/distribute-maskandi" },
    { label: "Afro House", href: "#afro-house" },
    { label: "Amapiano", href: "#" },
];

const highlights = [
    "Dedicated Lekompo metadata tagging — your genre, classified correctly from day one across all 450+ platforms.",
    "Cultural context-aware pitching to Spotify, Apple Music, and Deezer editorial teams who understand Lekompo.",
    "Claim a 0% US Withholding Rate under Article 12(1) of the US-SA Tax Treaty — an immediate 30% pay raise on your US royalties.",
    "Instant advances from $1,000 to $10,000,000+ via our Sovereign Capital Vault — keep 100% of your masters.",
    "Integrated AI Master Lab — purpose-built mastering tuned for Lekompo's signature sound profle.",
    "Visualizer Lab — auto-generate high-performance music videos and promo clips on-demand.",
];

export default function DistributeLekompo() {
    return (
        <GenrePage
            genre="Lekompo"
            tagline="The heartbeat of Limpopo, distributed globally."
            description="Lekompo isn't just a genre — it's a movement. Shamiso ensures your Lekompo tracks are correctly tagged, culturally pitched, and distributed to every major platform with the respect and precision this genre deserves."
            highlights={highlights}
            stores="450"
            relatedGenres={relatedGenres}
        />
    );
}
