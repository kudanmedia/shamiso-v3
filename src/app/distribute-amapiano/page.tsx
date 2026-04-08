import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title:
        "Distribute Amapiano Music | Shamiso - Africa's Sovereign Distributor",
    description:
        "Distribute Amapiano music to 450+ stores worldwide. Claim a 0% US Withholding Rate (Article 12). Keep 100% of your masters. Get funded up to $10M+ via the Sovereign Capital Vault.",
};

const relatedGenres = [
    { label: "Lekompo", href: "/distribute-lekompo" },
    { label: "3-Step", href: "/distribute-3-step" },
    { label: "Afro House", href: "/distribute-afro-house" },
];

const highlights = [
    "Amapiano-first metadata — correct logs and genre tagging to ensure appearing in the right algorithmic playlists.",
    "Global viral scaling — we help your Amapiano tracks go from TikTok trends to Spotify Top 50.",
    "Claim a 0% US Withholding Rate under Article 12(1) of the US-SA Tax Treaty — an immediate 30% pay raise on your US royalties.",
    "Instant advances from $1,000 to $10,000,000+ via our Sovereign Capital Vault — keep 100% of your masters.",
    "Direct connections to Amapiano editorial curators at Apple Music, Spotify, and YouTube Music.",
    "The world's fastest-growing genre deserves the world's most specialized distribution.",
];

export default function DistributeAmapiano() {
    return (
        <GenrePage
            genre="Amapiano"
            tagline="The soundtrack of the streets, now the sound of the world."
            description="Amapiano is a global phenomenon. Shamiso provides the sovereign infrastructure to ensure Amapiano artists capture the full value of their global growth while keeping 100% of their masters."
            highlights={highlights}
            stores="450"
            relatedGenres={relatedGenres}
        />
    );
}
