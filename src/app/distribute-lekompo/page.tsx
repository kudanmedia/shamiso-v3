import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title: "Distribute Lekompo Music | Shamiso - Africa's Sovereign Distributor",
    description:
        "Distribute Lekompo music to 450+ stores worldwide. Save 30% on US Tax. Keep 100% of your masters. Get funded up to $5M. The #1 distributor for Lekompo artists.",
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
    "Save 30% on US royalty withholding tax through our sovereign distribution structure.",
    "Instant advances from $1,000 to $5,000,000 via Beatbread — keep 100% of your masters.",
    "AI-powered mixing and mastering via ROEX, tuned for Lekompo's signature sound profile.",
    "Music video creation on-demand with Roto Videos — bring your Lekompo visuals to life.",
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
