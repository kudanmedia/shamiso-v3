"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AudioLines } from "lucide-react";

interface RoExJob {
    id: string;
    trackName: string;
    status: "queued" | "processing" | "complete" | "failed";
    progress: number;
    updatedAt: string;
    outputUrl?: string;
}

const statusClass: Record<RoExJob["status"], string> = {
    queued: "bg-zinc-700/40 text-zinc-300 border-zinc-600",
    processing: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    complete: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    failed: "bg-red-500/10 text-red-300 border-red-500/30",
};

export function RoExMasteringWidget() {
    const [jobs, setJobs] = useState<RoExJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const appwriteJwt = (await account.createJWT()).jwt;
                const response = await fetch("/api/roex/jobs", {
                    headers: {
                        "x-appwrite-jwt": appwriteJwt,
                    },
                });
                if (!response.ok) {
                    throw new Error("Unable to load RoEx jobs");
                }
                const payload = await response.json();
                setJobs((payload.jobs || []) as RoExJob[]);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load RoEx jobs");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm mb-8">
            <CardHeader className="border-b border-zinc-800">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <AudioLines className="h-5 w-5 text-blue-400" />
                    RoEx Mastering Queue
                </CardTitle>
                <CardDescription className="text-neutral-400">
                    Recent mastering jobs, progress, and output status.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                {loading ? (
                    <p className="text-neutral-500 text-sm animate-pulse">Loading RoEx mastering jobs...</p>
                ) : error ? (
                    <p className="text-red-400 text-sm">{error}</p>
                ) : jobs.length === 0 ? (
                    <p className="text-neutral-500 text-sm">No mastering jobs found yet.</p>
                ) : (
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <div key={job.id} className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                                <div className="flex items-center justify-between gap-4 mb-3">
                                    <div>
                                        <p className="font-bold text-white">{job.trackName}</p>
                                        <p className="text-xs text-neutral-500">
                                            Updated {new Date(job.updatedAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <Badge className={`uppercase tracking-widest text-[10px] border ${statusClass[job.status]}`}>
                                        {job.status}
                                    </Badge>
                                </div>
                                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                                    <div className="h-full bg-blue-500 transition-all" style={{ width: `${job.progress}%` }} />
                                </div>
                                {job.outputUrl ? (
                                    <a
                                        href={job.outputUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs text-shamiso-gold-bright mt-3 inline-block hover:text-shamiso-gold"
                                    >
                                        Open mastered output
                                    </a>
                                ) : null}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
