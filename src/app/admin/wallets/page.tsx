"use client";

import { useState, useEffect } from "react";
import { fetchVertoWalletsAction } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Wallet, 
    RefreshCcw, 
    Loader2, 
    AlertCircle,
    TrendingUp,
    Globe,
    ShieldCheck
} from "lucide-react";

export default function WalletsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [wallets, setWallets] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const loadWallets = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fetchVertoWalletsAction();
            if (result.success) {
                // Adjust this based on actual Verto response structure
                setWallets(Array.isArray(result.data) ? result.data : result.data?.wallets || []);
            } else {
                setError(result.error || "Failed to load wallets");
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadWallets();
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                            <Wallet className="w-8 h-8 text-shamiso-gold" />
                            Verto Wallets
                        </h1>
                        <p className="text-zinc-400">Manage and monitor your platform liquidity and balances.</p>
                    </div>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={loadWallets} 
                        disabled={isLoading}
                        className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white"
                    >
                        <RefreshCcw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> 
                        Refresh Balances
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Stats Grid */}
                {!isLoading && !error && wallets.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-zinc-900/50 border-zinc-800 text-white backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-shamiso-gold" />
                                    Active Currencies
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{new Set(wallets.map(w => w.currency)).size}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border-zinc-800 text-white backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                    Total Wallets
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{wallets.length}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-zinc-900/50 border-zinc-800 text-white backdrop-blur-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                                    Verto Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1">CONNECTED</Badge>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Wallets Table */}
                <Card className="bg-zinc-900/40 border-zinc-800 text-white overflow-hidden">
                    <CardHeader>
                        <CardTitle>Global Balances</CardTitle>
                        <CardDescription className="text-zinc-500 italic">Real-time wallet data from Verto FX Staging.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="w-10 h-10 animate-spin text-shamiso-gold" />
                                <p className="text-zinc-500 animate-pulse">Authenticating and fetching wallet data...</p>
                            </div>
                        ) : wallets.length > 0 ? (
                            <Table>
                                <TableHeader className="bg-zinc-900/20">
                                    <TableRow className="hover:bg-transparent border-zinc-800">
                                        <TableHead className="text-zinc-400">Label / Reference</TableHead>
                                        <TableHead className="text-zinc-400 text-center">Currency</TableHead>
                                        <TableHead className="text-zinc-400 text-right">Available Balance</TableHead>
                                        <TableHead className="text-zinc-400">Wallet ID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {wallets.map((wallet) => (
                                        <TableRow key={wallet.id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                                            <TableCell className="font-bold text-white">
                                                {wallet.customReferenceLabel || "Primary Wallet"}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline" className="bg-zinc-800 border-zinc-700 text-shamiso-gold-bright font-mono">
                                                    {wallet.currency}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-black text-emerald-400 text-lg">
                                                {Number(wallet.balance).toLocaleString('en-US', { 
                                                    style: 'currency', 
                                                    currency: wallet.currency || 'USD',
                                                    minimumFractionDigits: 2 
                                                })}
                                            </TableCell>
                                            <TableCell className="text-zinc-600 font-mono text-xs">
                                                {wallet.id}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <div className="bg-zinc-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                    <Wallet className="w-8 h-8 text-zinc-600" />
                                </div>
                                <div>
                                    <p className="text-zinc-400 font-medium">No wallets found</p>
                                    <p className="text-zinc-600 text-sm">Your Verto account doesn't have any active wallets yet.</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
