"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { databases, account } from "@/lib/appwrite";
import { Query } from "appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
    ArrowLeft, 
    CheckCircle2, 
    AlertCircle, 
    Mail, 
    DollarSign, 
    Loader2, 
    RefreshCcw 
} from "lucide-react";

export default function PayoutBatchPage() {
    const { batchId } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [batch, setBatch] = useState<any>(null);
    const [entries, setEntries] = useState<any[]>([]);
    const [error, setError] = useState("");

    const databaseId = '69b7fdaa001b7da3d224';
    const batchesCollectionId = 'royalty_batches';
    const ledgerCollectionId = 'ledger_entries';

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const batchDoc = await databases.getDocument(databaseId, batchesCollectionId, batchId as string);
            setBatch(batchDoc);

            const ledgerDocs = await databases.listDocuments(databaseId, ledgerCollectionId, [
                Query.equal('batch_id', batchId as string),
                Query.limit(100)
            ]);
            setEntries(ledgerDocs.documents);
        } catch (err: any) {
            setError(err.message || "Failed to fetch payout data.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [batchId]);

    const handleExecuteAction = async (actionType: 'pay' | 'invite', selectedIds: string[]) => {
        setIsActionLoading(true);
        try {
            // Note: In production, trigger the Appwrite function via SDK
            // await functions.createExecution('execute_admin_action', JSON.stringify({ ledgerEntryIds: selectedIds, actionType }));
            
            // For now, mock the successful trigger
            console.log(`Triggering ${actionType} for:`, selectedIds);
            alert(`Draft: Triggering ${actionType} for ${selectedIds.length} entries.`);
            
            await fetchData(); // Refresh data
        } catch (err: any) {
            alert("Action failed: " + err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
            </div>
        );
    }

    const matchedEntries = entries.filter(e => e.is_matched_in_appwrite);
    const unmatchedEntries = entries.filter(e => !e.is_matched_in_appwrite);

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <button 
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Batches
                        </button>
                        <h1 className="text-3xl font-bold tracking-tight">Batch: {batch?.batch_name}</h1>
                        <p className="text-zinc-400">Reporting Date: {new Date(batch?.reporting_date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-4">
                        <Badge variant={batch?.status === 'completed' ? 'default' : 'secondary'} className="h-8 px-4">
                            {batch?.status?.toUpperCase()}
                        </Badge>
                        <Button variant="outline" size="sm" onClick={fetchData} disabled={isLoading}>
                            <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-zinc-900/50 border-zinc-800 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Total Cents</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{(entries.reduce((acc, curr) => acc + curr.total_cents, 0) / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Matched Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-emerald-400">{matchedEntries.length} / {entries.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800 text-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Unmatched / Unclaimed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-amber-400">{unmatchedEntries.length}</div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="matched" className="w-full">
                    <TabsList className="bg-zinc-900 border-zinc-800 p-1">
                        <TabsTrigger value="matched" className="data-[state=active]:bg-zinc-800 min-w-[200px]">
                            Ready to Pay ({matchedEntries.length})
                        </TabsTrigger>
                        <TabsTrigger value="unmatched" className="data-[state=active]:bg-zinc-800 min-w-[200px]">
                            Unclaimed Funds ({unmatchedEntries.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="matched" className="mt-6">
                        <Card className="bg-zinc-900/40 border-zinc-800 text-white">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle>Matched Payouts</CardTitle>
                                    <CardDescription className="text-zinc-500 italic">Users with a linked SMD account. Ready for Verto FX orchestration.</CardDescription>
                                </div>
                                <Button 
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                                    onClick={() => handleExecuteAction('pay', matchedEntries.filter(e => e.status === 'pending').map(e => e.$id))}
                                    disabled={isActionLoading || matchedEntries.filter(e => e.status === 'pending').length === 0}
                                >
                                    <DollarSign className="w-4 h-4 mr-2" /> Execute Verto Payouts
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader className="bg-zinc-900/20">
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead>Email</TableHead>
                                            <TableHead>User ID</TableHead>
                                            <TableHead className="text-right">Amount (USD)</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {matchedEntries.map((entry) => (
                                            <TableRow key={entry.$id} className="border-zinc-800 hover:bg-zinc-800/30">
                                                <TableCell className="font-medium">{entry.too_lost_email}</TableCell>
                                                <TableCell className="text-zinc-500 font-mono text-xs">{entry.appwrite_user_id}</TableCell>
                                                <TableCell className="text-right font-bold text-emerald-400">
                                                    {(entry.total_cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={entry.status === 'paid' ? 'default' : 'secondary'}>
                                                        {entry.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {entry.status === 'pending' && (
                                                        <Button 
                                                            size="sm" 
                                                            variant="ghost" 
                                                            className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10"
                                                            onClick={() => handleExecuteAction('pay', [entry.$id])}
                                                        >
                                                            Pay Now
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="unmatched" className="mt-6">
                        <Card className="bg-zinc-900/40 border-zinc-800 text-white">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle>Unclaimed Funds</CardTitle>
                                    <CardDescription className="text-zinc-500 italic">Too Lost artists not yet on SMD. Send invites to claim funds.</CardDescription>
                                </div>
                                <Button 
                                    className="bg-amber-600 hover:bg-amber-500 text-white font-bold"
                                    onClick={() => handleExecuteAction('invite', unmatchedEntries.filter(e => e.status === 'pending').map(e => e.$id))}
                                    disabled={isActionLoading || unmatchedEntries.filter(e => e.status === 'pending').length === 0}
                                >
                                    <Mail className="w-4 h-4 mr-2" /> Escrow & Send Invites
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader className="bg-zinc-900/20 text-zinc-400">
                                        <TableRow className="hover:bg-transparent">
                                            <TableHead>Too Lost Email</TableHead>
                                            <TableHead className="text-right">Amount (USD)</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {unmatchedEntries.map((entry) => (
                                            <TableRow key={entry.$id} className="border-zinc-800 hover:bg-zinc-800/30">
                                                <TableCell className="font-medium">{entry.too_lost_email}</TableCell>
                                                <TableCell className="text-right font-bold text-amber-400">
                                                    {(entry.total_cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={entry.status === 'escrow_invited' ? 'secondary' : 'outline'}>
                                                        {entry.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {entry.status === 'pending' && (
                                                        <Button 
                                                            size="sm" 
                                                            variant="ghost" 
                                                            className="text-amber-400 hover:text-amber-300 hover:bg-amber-400/10"
                                                            onClick={() => handleExecuteAction('invite', [entry.$id])}
                                                        >
                                                            Invite
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
