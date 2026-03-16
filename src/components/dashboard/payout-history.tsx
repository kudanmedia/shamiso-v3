"use client";

import { useState, useEffect } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
    CreditCard, 
    History, 
    Loader2, 
    AlertCircle,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";

interface Payout {
    $id: string;
    amount: number;
    currency: string;
    status: "pending" | "processing" | "completed" | "failed";
    method: string;
    date: string;
    reference: string;
}

export function PayoutHistory() {
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPayouts = async () => {
            try {
                // In a real scenario, use the actual database/collection IDs from env
                // For now, we scaffold with a try-catch for missing collection
                const databaseId = "69b7fdaa001b7da3d224";
                const collectionId = "payouts";
                
                const response = await databases.listDocuments(
                    databaseId,
                    collectionId,
                    [
                        Query.orderDesc("date"),
                        Query.limit(5)
                    ]
                );
                
                setPayouts(response.documents as unknown as Payout[]);
            } catch (err: any) {
                console.error("Payout fetch error:", err);
                // If collection doesn't exist, we show empty state or a polite message
                // This is expected during early scaffolding
                setError("Payout database not yet configured.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayouts();
    }, []);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "completed": return "default";
            case "processing": return "secondary";
            case "pending": return "outline";
            case "failed": return "destructive";
            default: return "outline";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "processing": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "pending": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
            case "failed": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "";
        }
    };

    return (
        <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <History className="w-5 h-5 text-shamiso-gold-bright" />
                        Payout History
                    </CardTitle>
                    <CardDescription>Recent royalty disbursements</CardDescription>
                </div>
                <Link href="/dashboard/payouts">
                    <button className="text-xs text-shamiso-gold-bright hover:underline flex items-center gap-1 font-medium">
                        View All
                        <ArrowUpRight className="w-3 h-3" />
                    </button>
                </Link>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="h-[240px] flex flex-col items-center justify-center text-neutral-500 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
                        <p className="text-sm">Fetching transactions...</p>
                    </div>
                ) : error || payouts.length === 0 ? (
                    <div className="h-[240px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-zinc-800 rounded-xl space-y-3">
                        <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-neutral-600" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-bold text-white">No Payouts Yet</h4>
                            <p className="text-xs text-neutral-500 max-w-[200px]">
                                Your royalty earnings will appear here once your first distribution cycle completes.
                            </p>
                        </div>
                        {error && (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 mt-2">
                                <AlertCircle className="w-3 h-3" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Dev Check: {error}</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="border-zinc-800">
                            <TableRow className="hover:bg-transparent border-zinc-800">
                                <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Date</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">Reference</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest text-right">Amount</TableHead>
                                <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payouts.map((payout) => (
                                <TableRow key={payout.$id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                                    <TableCell className="text-xs font-medium text-neutral-400">
                                        {new Date(payout.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-xs font-mono text-neutral-500">
                                        {payout.reference}
                                    </TableCell>
                                    <TableCell className="text-right text-sm font-bold text-white">
                                        {payout.amount} {payout.currency}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge 
                                            variant={getStatusVariant(payout.status)}
                                            className={`text-[9px] uppercase tracking-wider font-black h-5 ${getStatusColor(payout.status)}`}
                                        >
                                            {payout.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}
