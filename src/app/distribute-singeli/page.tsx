import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title: "Distribute Singeli Music | Shamiso - Africa's Sovereign Distributor",
    description: "Distribute Singeli music to 450+ stores worldwide. Claim a 0% US Withholding Rate (Article 12). Keep 100% of your masters. Get funded up to $10M+ via the Sovereign Capital Vault.",
};

const relatedGenres = [
    { label: "Bongoflava", href: "/distribute-bongoflava" },
    { label: "Lekompo", href: "/distribute-lekompo" },
    { label: "Amapiano", href: "/distribute-amapiano" },
];

const highlights = [
    "High-velocity distribution — our infrastructure handles the energy of the Tanzanian streets.",
    "Global niche targeting — we help Singeli artists find listeners from Dar es Salaam to London and beyond.",
    "Claim a 0% US Withholding Rate under Article 12 — keep 30% more of your global streaming revenue.",
    "Access advances up to $10M+ via our Sovereign Capital Vault — invest in your production and live shows.",
    "Direct technical support for the unique metadata needs of East African electronic music.",
    "The sovereign gateway for the fast-paced future of Tanzanian music.",
];

export default function DistributeSingeli() {
    return (
        <GenrePage
            genre="Singeli"
            tagline="The high-velocity sound of Dar es Salaam, now global."
            description="Fast, energetic, and uniquely Tanzanian. Singeli is the next frontier of African electronic music. Shamiso ensures Singeli creators have the data and distribution to break into the international scene."
            highlights={highlights}
            stores="450"
            relatedGenres={relatedGenres}
        />
    );
}
