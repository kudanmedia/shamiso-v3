import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title: "Distribute Kuduro Music | Shamiso - Africa's Sovereign Distributor",
    description: "Distribute Kuduro music to 450+ stores worldwide. Claim a 0% US Withholding Rate (Article 12). Keep 100% of your masters. Get funded up to $10M+ via the Sovereign Capital Vault.",
};

const relatedGenres = [
    { label: "Afro House", href: "/distribute-afro-house" },
    { label: "Amapiano", href: "/distribute-amapiano" },
    { label: "Afrobeats", href: "/distribute-afrobeats" },
];

const highlights = [
    "Rhythmic dominance — our distribution ensures Angolan Kuduro reaches every global dancefloor.",
    "Global Portuguese-speaking network — we bridge the gap between Luanda, Lisbon, and the world.",
    "Claim a 0% US Withholding Rate under Article 12 — keep 30% more of your royalties from US listeners.",
    "Access advances up to $10M+ via our Sovereign Capital Vault — maintain ownership of your Angolan heritage.",
    "Direct curation opportunities for Lusophone hubs on major global streaming platforms.",
    "The sovereign gateway for the movement that defines Angolan urban sound.",
];

export default function DistributeKuduro() {
    return (
        <GenrePage
            genre="Kuduro"
            tagline="The rhythmic soul of Angola, fueling global dancefloors."
            description="Kuduro is more than a genre; it's a movement. Shamiso provides the sovereign gateway for Kuduro artists to reach 450+ stores while protecting their rights and maximizing their revenue."
            highlights={highlights}
            stores="450"
            relatedGenres={relatedGenres}
        />
    );
}
