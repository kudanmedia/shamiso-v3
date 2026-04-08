import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title:
        "Distribute Maskandi Music | Shamiso - Africa's Sovereign Distributor",
    description:
        "Distribute Maskandi music worldwide. Claim a 0% US Withholding Rate (Article 12). Keep 100% of your masters. The premium distributor for Maskandi artists.",
};

const relatedGenres = [
    { label: "Lekompo", href: "/distribute-lekompo" },
    { label: "3-Step", href: "/distribute-3-step" },
    { label: "Afro House", href: "/distribute-lekompo#afro-house" },
    { label: "Mbaqanga", href: "#" },
];

const highlights = [
    "Maskandi-native metadata — correct Zulu-language tagging and genre classification across all 450+ stores.",
    "Cultural preservation meets global reach — your authentic Maskandi sound, distributed with integrity.",
    "Claim a 0% US Withholding Rate under Article 12(1) of the US-SA Tax Treaty — an immediate 30% pay raise on your US royalties.",
    "Instant advances from $1,000 to $10,000,000+ via our Sovereign Capital Vault — keep 100% of your masters.",
    "Integrated AI Master Lab — purpose-built mastering calibrated for Maskandi's acoustic richness.",
    "Curator Pitch Portal — direct access to specialized playlists and global tastemakers.",
];

export default function DistributeMaskandi() {
    return (
        <GenrePage
            genre="Maskandi"
            tagline="The soul of Zulu tradition, amplified globally."
            description="Maskandi is more than music — it's heritage. Shamiso honors this tradition by delivering world-class distribution, ensuring your Maskandi catalog reaches listeners from KwaZulu-Natal to the world stage with the cultural respect it deserves."
            highlights={highlights}
            stores="450"
            relatedGenres={relatedGenres}
        />
    );
}
