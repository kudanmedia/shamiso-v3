import { PricingSection } from "@/components/PricingSection";
import { getPricingData } from "@/lib/server/pricing";

export default async function PricingPage() {
    const pricingData = await getPricingData();

    return (
        <main className="min-h-screen bg-black pt-16">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(180,140,20,0.1),transparent_50%)] pointer-events-none" />
            <div className="fixed top-20 right-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10">
                <PricingSection data={pricingData} />
            </div>
        </main>
    );
}
