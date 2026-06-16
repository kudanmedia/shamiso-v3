"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink } from "lucide-react";
import { DATABASE_ID } from "@/lib/database-id";

const LEADS_COLLECTION = "smd_funding_leads";

interface LeadRow {
    $id: string;
    artist_name: string;
    email: string;
    spotify_url: string;
    monthly_revenue: string;
    $createdAt?: string;
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState<LeadRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const response = await databases.listDocuments(DATABASE_ID, LEADS_COLLECTION, [
                    Query.orderDesc("$createdAt"),
                    Query.limit(200),
                ]);
                setLeads(response.documents as unknown as LeadRow[]);
            } catch (err: any) {
                setError(err.message || "Failed to load funding leads.");
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto space-y-6 pb-12">
                <div>
                    <h1 className="text-3xl font-black uppercase">Funding Leads Inbox</h1>
                    <p className="text-zinc-400 mt-1">Artist funding inquiries captured from the platform.</p>
                </div>

                {error ? (
                    <Card className="bg-red-900/10 border-red-900/30">
                        <CardContent className="pt-4 text-sm text-red-400">{error}</CardContent>
                    </Card>
                ) : null}

                <Card className="bg-zinc-900/40 border-zinc-800">
                    <CardHeader>
                        <CardTitle>All Leads</CardTitle>
                        <CardDescription className="text-zinc-400">{leads.length} total submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader className="bg-zinc-900/20 uppercase text-xs font-black">
                                <TableRow className="hover:bg-transparent border-zinc-800">
                                    <TableHead>Artist</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Monthly Revenue</TableHead>
                                    <TableHead>Spotify</TableHead>
                                    <TableHead>Submitted</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leads.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-12 text-zinc-500 italic">
                                            No funding leads yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    leads.map((lead) => (
                                        <TableRow key={lead.$id} className="border-zinc-800 hover:bg-zinc-800/30">
                                            <TableCell className="font-bold">{lead.artist_name}</TableCell>
                                            <TableCell className="text-zinc-300">{lead.email}</TableCell>
                                            <TableCell>
                                                <Badge className="bg-shamiso-gold/10 text-shamiso-gold-bright border-shamiso-gold/20">
                                                    {lead.monthly_revenue}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <a href={lead.spotify_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm">
                                                    Profile <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </TableCell>
                                            <TableCell className="text-zinc-400 text-sm">
                                                {lead.$createdAt ? new Date(lead.$createdAt).toLocaleString() : "—"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
