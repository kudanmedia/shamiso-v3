import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title:
        "Distribute 3-Step Music | Shamiso - Africa's Sovereign Distributor",
    description:
        "Distribute 3-Step music to 450+ stores worldwide. Save 30% on US Tax. Keep 100% of your masters. Get funded up to $10M+ via the Sovereign Capital Vault. The #1 distributor for 3-Step artists.",
};

const relatedGenres = [
    { label: "Lekompo", href: "/distribute-lekompo" },
    { label: "Maskandi", href: "/distribute-maskandi" },
    { label: "Afro House", href: "/distribute-lekompo#afro-house" },
    { label: "Kwaito", href: "#" },
];

const highlights = [
    "3-Step expertise — proper genre classification and metadata to ensure your music reaches the right audiences.",
    "Targeted playlist pitching to curators who understand and champion South African electronic music.",
    "Save 30% on US royalty withholding tax through our sovereign distribution structure.",
    "Instant advances from $1,000 to $10,000,000+ via our Sovereign Capital Vault — keep 100% of your masters.",
    "The Sovereign Growth Engine — automated fan-finding and ad-targeting purpose-built for dance music.",
    "The Curator Pitch Portal — direct access to influential curators and editorial desks in the 3-Step scene.",
];

export default function DistributeThreeStep() {
    return (
        <GenrePage
            genre="3-Step"
            tagline="South Africa's dance floor anthem, heard worldwide."
            description="3-Step is the pulse of South Africa's nightlife. Shamiso's specialized distribution ensures your 3-Step tracks reach the 450 Stores and audiences that matter — from Durban (Umlazi, Lamontville), Pietermaritzburg to London, New York to Lagos."
            highlights={highlights}
            stores="450"
            relatedGenres={relatedGenres}
        />
    );
}
