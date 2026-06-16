"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FeatureFmWidget } from "@/components/dashboard/FeatureFmWidget";
import { RoExMasteringWidget } from "@/components/dashboard/RoExMasteringWidget";

export default function MarketingDashboardPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-8 px-8">
            <div className="max-w-7xl mx-auto">
                <Link href="/dashboard" className="text-shamiso-gold-bright hover:text-shamiso-gold flex items-center gap-2 text-sm font-medium mb-4 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                <h1 className="text-3xl font-bold mb-2">Marketing & Production Intelligence</h1>
                <p className="text-neutral-400 mb-8">
                    Live partner telemetry from Feature.fm and RoEx.
                </p>

                <FeatureFmWidget />
                <RoExMasteringWidget />
            </div>
        </div>
    );
}
