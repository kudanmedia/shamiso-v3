"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, CalendarCheck2, Link2, MousePointerClick } from "lucide-react";

interface FeatureFmAnalytics {
    totalClicks: number;
    totalPreSaves: number;
    activeCampaigns: number;
    topSmartLink: string;
}

export function FeatureFmWidget() {
    const [data, setData] = useState<FeatureFmAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const appwriteJwt = (await account.createJWT()).jwt;
                const response = await fetch("/api/featurefm/analytics", {
                    headers: {
                        "x-appwrite-jwt": appwriteJwt,
                    },
                });
                if (!response.ok) {
                    throw new Error("Unable to load feature.fm analytics");
                }
                const payload = await response.json();
                setData(payload.analytics as FeatureFmAnalytics);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load analytics");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm mb-8">
            <CardHeader className="border-b border-zinc-800">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-sky-400" />
                            Feature.fm Campaign Intelligence
                        </CardTitle>
                        <CardDescription className="text-neutral-400">
                            Smart links, pre-saves, and campaign performance.
                        </CardDescription>
                    </div>
                    <Badge className="bg-sky-500/10 text-sky-300 border border-sky-500/30">Live API</Badge>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                {loading ? (
                    <p className="text-neutral-500 text-sm animate-pulse">Loading feature.fm metrics...</p>
                ) : error ? (
                    <p className="text-red-400 text-sm">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                            <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <MousePointerClick className="h-4 w-4 text-sky-400" />
                                Total Clicks
                            </div>
                            <div className="text-2xl font-black text-white">{data?.totalClicks ?? 0}</div>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                            <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <CalendarCheck2 className="h-4 w-4 text-sky-400" />
                                Pre-Saves
                            </div>
                            <div className="text-2xl font-black text-white">{data?.totalPreSaves ?? 0}</div>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                            <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Active Campaigns</div>
                            <div className="text-2xl font-black text-white">{data?.activeCampaigns ?? 0}</div>
                        </div>
                        <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                            <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Link2 className="h-4 w-4 text-sky-400" />
                                Top Smart Link
                            </div>
                            <div className="text-sm font-bold text-white truncate">{data?.topSmartLink ?? "N/A"}</div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
