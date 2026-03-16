"use client";

import { useState, useEffect } from "react";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { account } from "@/lib/appwrite";
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
import { Button } from "@/components/ui/button";
import { 
    CreditCard, 
    History, 
    Loader2, 
    AlertCircle,
    ArrowLeft,
    Download,
    Search
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface Payout {
    $id: string;
    amount: number;
    currency: string;
    status: "pending" | "processing" | "completed" | "failed";
    method: string;
    date: string;
    reference: string;
}

export default function PayoutsPage() {
    const [payouts, setPayouts] = useState<Payout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
                setUser(session);
            } catch (error) {
                window.location.href = "/login";
            }
        };
        checkSession();
    }, []);

    useEffect(() => {
        const fetchPayouts = async () => {
            try {
                const databaseId = "69b7fdaa001b7da3d224";
                const collectionId = "payouts";
                
                const response = await databases.listDocuments(
                    databaseId,
                    collectionId,
                    [
                        Query.orderDesc("date"),
                        Query.limit(50)
                    ]
                );
                
                setPayouts(response.documents as unknown as Payout[]);
            } catch (err: any) {
                console.error("Payout fetch error:", err);
                setError("Payout database not yet configured.");
            } finally {
                setIsLoading(false);
            }
        };

        if (user) {
            fetchPayouts();
        }
    }, [user]);

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
        <div className="min-h-screen bg-black text-white pt-24 pb-8 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <Link href="/dashboard" className="text-shamiso-gold-bright hover:text-shamiso-gold flex items-center gap-2 text-sm font-medium mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Payout History</h1>
                            <p className="text-neutral-400">View and track all your music royalty disbursements.</p>
                        </div>
                        <Button className="bg-shamiso-gold hover:bg-shamiso-gold-bright text-black font-bold">
                            <Download className="w-4 h-4 mr-2" />
                            Export CSV
                        </Button>
                    </div>
                </div>

                <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-sm">
                    <CardHeader className="border-b border-zinc-800 pb-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <CardTitle className="text-xl font-bold">All Transactions</CardTitle>
                            <div className="relative w-full md:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                <Input 
                                    placeholder="Search by reference..." 
                                    className="pl-10 bg-black/40 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-shamiso-gold/50"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {isLoading ? (
                            <div className="h-[400px] flex flex-col items-center justify-center text-neutral-500 gap-3">
                                <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
                                <p className="text-sm">Loading transactions...</p>
                            </div>
                        ) : error || payouts.length === 0 ? (
                            <div className="h-[400px] flex flex-col items-center justify-center text-center p-6 space-y-3">
                                <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-2">
                                    <CreditCard className="w-8 h-8 text-neutral-600" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-white text-lg">No Payout Records Found</h4>
                                    <p className="text-sm text-neutral-500 max-w-md">
                                        As soon as your music starts generating revenue and reaches the payout threshold, your transaction history will appear here.
                                    </p>
                                </div>
                                {error && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 mt-4">
                                        <AlertCircle className="w-3 h-3" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Configuration Note: {error}</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Table>
                                <TableHeader className="border-zinc-800">
                                    <TableRow className="hover:bg-transparent border-zinc-800">
                                        <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest px-6">Date</TableHead>
                                        <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest px-6">Reference</TableHead>
                                        <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest px-6">Method</TableHead>
                                        <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest px-6 text-right">Amount</TableHead>
                                        <TableHead className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest px-6 text-right">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payouts.map((payout) => (
                                        <TableRow key={payout.$id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                                            <TableCell className="px-6 py-4 text-sm font-medium text-neutral-400">
                                                {new Date(payout.date).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-sm font-mono text-neutral-500">
                                                {payout.reference}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-sm text-neutral-300">
                                                {payout.method}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-right text-base font-bold text-white">
                                                {payout.amount.toLocaleString(undefined, {
                                                    style: 'currency',
                                                    currency: payout.currency
                                                })}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-right">
                                                <Badge 
                                                    variant={getStatusVariant(payout.status)}
                                                    className={`text-[10px] px-2.5 py-0.5 uppercase tracking-wider font-black ${getStatusColor(payout.status)}`}
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
            </div>
        </div>
    );
}
