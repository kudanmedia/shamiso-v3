"use client";

import { useState, useEffect } from "react";
import { fetchVertoBeneficiariesAction } from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    RefreshCcw, 
    Loader2, 
    AlertCircle,
    User,
    Building2,
    CheckCircle2,
    Clock,
    XCircle,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function BeneficiariesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const loadBeneficiaries = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fetchVertoBeneficiariesAction();
            if (result.success) {
                // Adjust based on Verto's response structure
                const list = result.data?.beneficiaries || result.data?.data || [];
                setBeneficiaries(list);
            } else {
                setError(result.error || "Failed to load beneficiaries");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBeneficiaries();
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
            case "approved":
            case "active":
                return <Badge className="bg-green-500/10 text-green-500 border-green-500/20"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</Badge>;
            case "pending":
                return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
            case "rejected":
                return <Badge className="bg-red-500/10 text-red-500 border-red-500/20"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Link href="/admin" className="flex items-center text-zinc-400 hover:text-white transition-colors mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Admin
                        </Link>
                        <h1 className="text-4xl font-bold tracking-tight uppercase flex items-center gap-3">
                            <Users className="w-10 h-10 text-shamiso-gold-bright" />
                            Verto Beneficiaries
                        </h1>
                        <p className="text-zinc-400">Manage and monitor artist payout destinations on VertoFX.</p>
                    </div>
                    <Button 
                        onClick={loadBeneficiaries} 
                        disabled={isLoading}
                        className="bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <RefreshCcw className="w-4 h-4 mr-2" />}
                        Refresh List
                    </Button>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        <p>{error}</p>
                    </div>
                )}

                <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-xl">
                    <CardHeader>
                        <CardTitle>Global Beneficiary Registry</CardTitle>
                        <CardDescription>Live data directly from VertoFX API.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800 hover:bg-transparent">
                                    <TableHead className="text-zinc-400">Entity</TableHead>
                                    <TableHead className="text-zinc-400">Name / Company</TableHead>
                                    <TableHead className="text-zinc-400">Currency</TableHead>
                                    <TableHead className="text-zinc-400">Country</TableHead>
                                    <TableHead className="text-zinc-400">Account Details</TableHead>
                                    <TableHead className="text-zinc-400">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <TableRow key={i} className="border-zinc-800">
                                            <TableCell colSpan={6} className="h-16 animate-pulse bg-zinc-800/20" />
                                        </TableRow>
                                    ))
                                ) : beneficiaries.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-32 text-center text-zinc-500">
                                            No beneficiaries found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    beneficiaries.map((b) => (
                                        <TableRow key={b.id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                                            <TableCell>
                                                {b.beneficiaryEntityType === "individual" ? (
                                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                                        <User className="w-3 h-3 mr-1" /> Individual
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                                                        <Building2 className="w-3 h-3 mr-1" /> Company
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                <Link href={`/admin/beneficiaries/${b.id}`} className="hover:text-shamiso-gold-bright transition-colors cursor-pointer">
                                                    {b.beneficiaryEntityType === "individual" 
                                                        ? `${b.beneficiaryFirstName} ${b.beneficiaryLastName}`
                                                        : b.beneficiaryCompanyName
                                                    }
                                                </Link>
                                                <div className="text-[10px] text-zinc-500 font-mono mt-1">ID: {b.id}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className="bg-shamiso-gold/10 text-shamiso-gold-bright border-shamiso-gold/20">
                                                    {b.currency}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-zinc-300">
                                                {b.country}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm font-mono text-zinc-300">{b.accountNumber}</div>
                                                <div className="text-[10px] text-zinc-500 mt-1">Bank Code: {b.nationalId}</div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(b.status || "Approved")}
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
