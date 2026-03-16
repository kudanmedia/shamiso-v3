"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SongToolsWidget } from "@/components/SongToolsWidget";

export default function AnalyticsPage() {
    const [user, setUser] = useState<any>(null);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
                setUser(session);
            } catch (error) {
                console.error("Session check failed", error);
                router.push("/login");
            } finally {
                setIsCheckingSession(false);
            }
        };
        checkSession();
    }, [router]);

    if (isCheckingSession) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="animate-pulse">Loading Analytics...</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0c0a00] via-[#0d0800] to-black -z-10" />
            
            <div className="max-w-7xl mx-auto relative">
                <div className="mb-8 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <BarChart3 className="h-8 w-8 text-shamiso-gold-bright" />
                        <h1 className="text-3xl font-bold uppercase tracking-tight">Fan Data Analytics</h1>
                    </div>
                </div>

                <div className="mt-8">
                    <SongToolsWidget />
                </div>
            </div>
        </div>
    );
}
