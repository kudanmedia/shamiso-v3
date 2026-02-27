import type { Metadata } from "next";
import { GenrePage } from "@/components/GenrePage";

export const metadata: Metadata = {
    title:
        "Distribute Afro House Music | Shamiso - Africa's Sovereign Distributor",
    description:
        "Distribute Afro House music to 450+ stores worldwide. Save 30% on US Tax. Keep 100% of your masters. Get funded up to $5M via the Sovereign Capital Vault. The #1 distributor for Afro House artists.",
};

const relatedGenres = [
    { label: "Lekompo", href: "/distribute-lekompo" },
    { label: "3-Step", href: "/distribute-3-step" },
    { label: "Amapiano", href: "/distribute-amapiano" },
];

const highlights = [
    "Global club dominance — ensure your Afro House tracks are heard in every major venue worldwide.",
    "South African cultural exports — we take your sound from local roots to global charts.",
    "Save 30% on US royalty withholding tax through our sovereign distribution structure.",
    "Instant advances from $1,000 to $5,000,000 via our Sovereign Capital Vault — keep 100% of your masters.",
    "Specialized metadata for dance music storefronts like Beatport, Traxsource, and Juno Download.",
    "Connect with Afro House curators and tastemakers across Europe, North America, and Africa.",
];

export default function DistributeAfroHouse() {
    return (
        <GenrePage
            genre="Afro House"
            tagline="Global club dominance and South African cultural exports."
            description="Afro House is the rhythmic bridge between tradition and the future. Shamiso provides the world-class distribution infrastructure needed to scale your sound globally while maintaining its cultural soul."
            highlights={highlights}
            stores="450"
            relatedGenres={relatedGenres}
        />
    );
}
