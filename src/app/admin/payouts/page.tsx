"use client";

import { useState, useEffect } from "react";
import { databases, storage, functions } from "@/lib/appwrite";
import { Query, ID } from "appwrite";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2, PlayCircle, Eye, ChevronRight } from "lucide-react";
import Link from "next/link";
import { DATABASE_ID } from "@/lib/database-id";

export default function AdminPayoutsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [batches, setBatches] = useState<any[]>([]);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const batchesCollectionId = 'royalty_batches';

    const fetchBatches = async () => {
        setIsLoading(true);
        try {
            const response = await databases.listDocuments(DATABASE_ID, batchesCollectionId, [
                Query.orderDesc('reporting_date')
            ]);
            setBatches(response.documents);
        } catch (err: any) {
            setError(err.message || "Failed to load royalty batches.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBatches();
    }, []);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError("");

        try {
            // 1. Upload to Storage
            const bucketId = 'royalty_csvs';
            const uploadedFile = await storage.createFile(bucketId, ID.unique(), file);

            // 2. Trigger Ingestion Function
            const functionId = '69b8154c000dde3296d8';
            await functions.createExecution(functionId, JSON.stringify({
                fileId: uploadedFile.$id,
                batchName: `Batch ${new Date().toLocaleDateString()}`
            }));

            alert("CSV Uploaded Successfully! Ingestion has started.");
            fetchBatches();
        } catch (err: any) {
            setError(err.message || "Upload failed.");
            alert("Upload failed: " + err.message);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">Royalty Ingestion</h1>
                        <p className="text-zinc-400 mt-2">Manage "Too Lost" monthly royalty CSV uploads and payouts.</p>
                    </div>
                    <div className="flex gap-4">
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileUpload} 
                            accept=".csv" 
                            className="hidden" 
                        />
                        <Button 
                            className="bg-shamiso-gold-bright text-black font-bold hover:bg-shamiso-gold"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Plus className="w-4 h-4 mr-2" />
                            )}
                            {isUploading ? "Uploading..." : "Upload New CSV"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <Card className="bg-zinc-900/40 border-zinc-800 text-white">
                        <CardHeader>
                            <CardTitle>Recent Batches</CardTitle>
                            <CardDescription className="text-zinc-500">View and review processed royalty distribution batches.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader className="bg-zinc-900/20">
                                    <TableRow className="hover:bg-transparent border-zinc-800">
                                        <TableHead>Batch Name</TableHead>
                                        <TableHead>Reporting Date</TableHead>
                                        <TableHead>Rows</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {batches.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-12 text-zinc-500 italic">
                                                No batches found. Upload a CSV to get started.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        batches.map((batch) => (
                                            <TableRow key={batch.$id} className="border-zinc-800 hover:bg-zinc-800/30">
                                                <TableCell className="font-bold">{batch.batch_name}</TableCell>
                                                <TableCell className="text-zinc-400">
                                                    {new Date(batch.reporting_date).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="text-zinc-400">{batch.total_rows.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge variant={batch.status === 'ready_for_review' ? 'secondary' : 'default'} className="bg-zinc-800 text-shamiso-gold shadow-[0_0_5px_rgba(255,215,0,0.2)]">
                                                        {batch.status.toUpperCase()}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Link href={`/admin/payouts/${batch.$id}`}>
                                                        <Button variant="ghost" className="text-shamiso-gold hover:text-shamiso-gold hover:bg-shamiso-gold/10">
                                                            View Review <ChevronRight className="ml-2 w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-zinc-900/40 border-zinc-800 text-white border-l-4 border-l-blue-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 text-blue-400" /> System Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Ingestion Function:</span>
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-none">ACTIVE</Badge>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Execution Function:</span>
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-none">ACTIVE</Badge>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Storage Bucket:</span>
                                <code className="text-xs bg-zinc-900 px-2 py-1 rounded">royalty_csvs</code>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/40 border-zinc-800 text-white border-l-4 border-l-shamiso-gold">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-shamiso-gold" /> Database IDs
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Profiles:</span>
                                <code className="text-xs bg-zinc-900 px-2 py-1 rounded">profiles</code>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">Ledger:</span>
                                <code className="text-xs bg-zinc-900 px-2 py-1 rounded">ledger_entries</code>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-zinc-400">DB ID:</span>
                                <code className="text-xs bg-zinc-900 px-2 py-1 rounded">69b7fdaa001...</code>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
