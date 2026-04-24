"use client";

import { useState, useEffect, use } from "react";
import { 
    fetchVertoBeneficiaryDetailAction, 
    fetchWalletsAction, 
    fetchPurposeCodesAction, 
    fetchFxRateAction, 
    executePaymentAction,
    executeDirectPaymentAction,
    fetchPaymentRequestsAction,
    executeWalletConversionAction
} from "./actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { 
    Users, 
    Loader2, 
    AlertCircle,
    User as UserIcon,
    Building2,
    CheckCircle2,
    Clock,
    XCircle,
    ArrowLeft,
    Landmark,
    Globe,
    ExternalLink,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Hash,
    History
} from "lucide-react";
import Link from "next/link";

export default function BeneficiaryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [isLoading, setIsLoading] = useState(true);
    const [beneficiary, setBeneficiary] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Payment Requests State
    const [paymentRequests, setPaymentRequests] = useState<any[]>([]);
    const [isLoadingRequests, setIsLoadingRequests] = useState(false);

    // Modal State
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentStep, setPaymentStep] = useState(1);
    const [paymentRoute, setPaymentRoute] = useState<"within-wallets" | "manual-orchestration" | "direct" | null>(null);
    const [wallets, setWallets] = useState<any[]>([]);
    const [purposeCodes, setPurposeCodes] = useState<any[]>([]);
    const [isFetchingData, setIsFetchingData] = useState(false);
    
    // Form State
    const [sourceWalletId, setSourceWalletId] = useState<string>("");
    const [sourceAmount, setSourceAmount] = useState<string>("");
    const [purposeId, setPurposeId] = useState<string>("");
    const [customReference, setCustomReference] = useState<string>("");
    
    // FX Rate & Payment State
    const [fxRateData, setFxRateData] = useState<any>(null);
    const [fxCountdown, setFxCountdown] = useState<number>(0);
    const [isExecuting, setIsExecuting] = useState(false);
    const [paymentResult, setPaymentResult] = useState<any>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    useEffect(() => {
        const loadDetail = async () => {
            setIsLoading(true);
            try {
                const result = await fetchVertoBeneficiaryDetailAction(id);
                if (result.success) {
                    const bene = result.data?.account || result.data?.beneficiary || result.data;
                    setBeneficiary(bene);
                    
                    // Fetch payment requests right after we get the beneficiary
                    setIsLoadingRequests(true);
                    // Use clientReference if available, or just fetch all and filter client side
                    const reqResult = await fetchPaymentRequestsAction(bene.clientReference || undefined);
                    if (reqResult.success) {
                        let requestsArray = Array.isArray(reqResult.data) ? reqResult.data : (reqResult.data?.data || []);
                        
                        // Fallback filtering if the API searchQuery didn't filter strictly enough
                        requestsArray = requestsArray.filter((req: any) => 
                            req.account?.id === bene.id || 
                            req.beneficiaryId === bene.id
                        );
                        
                        setPaymentRequests(requestsArray);
                    }
                    setIsLoadingRequests(false);

                } else {
                    setError(result.error);
                }
            } catch (err) {
                setError("Failed to connect to Verto");
            } finally {
                setIsLoading(false);
            }
        };
        loadDetail();
    }, [id]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (paymentStep === 2 && fxCountdown > 0) {
            timer = setInterval(() => {
                setFxCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [paymentStep, fxCountdown]);

    const handleOpenModal = async () => {
        setIsPaymentModalOpen(true);
        setPaymentStep(1);
        setPaymentError(null);
        setPaymentResult(null);
        setFxRateData(null);
        
        if (wallets.length === 0 || purposeCodes.length === 0) {
            setIsFetchingData(true);
            try {
                const [walletsRes, purposeRes] = await Promise.all([
                    fetchWalletsAction(),
                    fetchPurposeCodesAction()
                ]);
                
                if (walletsRes.success) {
                    setWallets(Array.isArray(walletsRes.data) ? walletsRes.data : (walletsRes.data?.data || []));
                } else {
                    console.error("Failed to fetch wallets:", walletsRes.error);
                }
                
                if (purposeRes.success) {
                    console.log("Purpose API Raw Response in Frontend:", purposeRes.data);
                    let parsedPurposes = purposeRes.data;
                    if (!Array.isArray(parsedPurposes)) {
                        parsedPurposes = parsedPurposes?.documentTypes || parsedPurposes?.data || parsedPurposes?.purposes || parsedPurposes?.results || [];
                    }
                    console.log("Parsed Purposes array:", parsedPurposes);
                    setPurposeCodes(Array.isArray(parsedPurposes) ? parsedPurposes : []);
                } else {
                    console.error("Failed to fetch purpose codes:", purposeRes.error);
                }
            } catch (err) {
                console.error("Failed to load modal data", err);
            } finally {
                setIsFetchingData(false);
            }
        }

    };

    const handleGetFxRate = async (route?: "within-wallets" | "manual-orchestration") => {
        if (route) setPaymentRoute(route);
        if (!sourceWalletId || !sourceAmount || !purposeId) {
            setPaymentError("Please fill in all required fields.");
            return;
        }

        if (customReference && customReference.trim().length < 5) {
            setPaymentError("Client Reference must be at least 5 characters long.");
            return;
        }

        setPaymentError(null);
        setIsExecuting(true);
        try {
            // Find the source currency from the selected wallet
            const selectedWallet = wallets.find(w => w.id.toString() === sourceWalletId);
            if (!selectedWallet) throw new Error("Invalid source wallet");
            
            const currencyFrom = selectedWallet.currency;
            const currencyTo = beneficiary.currency;

            const rateRes = await fetchFxRateAction(currencyFrom, currencyTo);
            console.log("FX Rate Raw Response:", rateRes);
            if (rateRes.success) {
                // Determine structure: Verto often returns data inside 'data'
                const rateObj = rateRes.data?.data || rateRes.data;
                setFxRateData(rateObj);
                setFxCountdown(30); // Start 30s countdown
                setPaymentStep(2);
            } else {
                setPaymentError(rateRes.error || "Failed to fetch FX rate.");
            }
        } catch (err: any) {
            setPaymentError(err.message || "An unexpected error occurred.");
        } finally {
            setIsExecuting(false);
        }
    };

    const handleExecuteOrchestratedPayment = async () => {
        setPaymentError(null);
        setIsExecuting(true);
        try {
            const token = fxRateData?.vfxToken || fxRateData?.token || fxRateData?.id || fxRateData?.reference || fxRateData?.vfx_token;
            console.log("Extracted Token for Orchestration:", token);
            if (!token) {
                throw new Error(`Missing vfxToken from FX Rate API response. Available keys: ${Object.keys(fxRateData || {}).join(", ")}`);
            }
            
            // 1. Find the target wallet
            const targetWallet = wallets.find(w => w.currency === beneficiary.currency);
            if (!targetWallet) {
                throw new Error(`You do not have a wallet for the beneficiary's currency (${beneficiary.currency}). Please open a ${beneficiary.currency} wallet first.`);
            }

            // 2. Execute Wallet Conversion
            const conversionPayload = {
                vfx_token: token,
                side: "SELL",
                amount: parseFloat(sourceAmount),
                clientReference: customReference || `FX-${Date.now()}`
            };
            
            console.log("Executing Wallet Conversion Payload:", conversionPayload);
            const conversionRes = await executeWalletConversionAction(conversionPayload);
            if (!conversionRes.success) {
                throw new Error(conversionRes.error || "FX Conversion failed.");
            }

            // 3. Execute Direct Payment from the new target wallet
            const payoutAmount = fxRateData?.targetAmount || (parseFloat(sourceAmount) * (parseFloat(fxRateData?.rate || 0))).toFixed(2);
            
            const directPayload = {
                beneficiaryId: parseInt(beneficiary.id),
                purposeId: parseInt(purposeId),
                amount: parseFloat(payoutAmount),
                walletId: parseInt(targetWallet.id),
                paymentId: crypto.randomUUID(),
                clientReference: customReference || null
            };
            
            console.log("Executing Orchestrated Direct Payment Payload:", directPayload);
            const directRes = await executeDirectPaymentAction(directPayload);
            
            if (directRes.success) {
                setPaymentResult({
                    message: "Orchestration Successful",
                    conversion: conversionRes.data,
                    payout: directRes.data
                });
                setPaymentStep(3);
                // Refresh requests table
                fetchPaymentRequestsAction(beneficiary.clientReference || undefined).then(reqResult => {
                    if (reqResult.success) {
                        let requestsArray = Array.isArray(reqResult.data) ? reqResult.data : (reqResult.data?.data || []);
                        requestsArray = requestsArray.filter((req: any) => req.account?.id === beneficiary.id || req.beneficiaryId === beneficiary.id);
                        setPaymentRequests(requestsArray);
                    }
                });
            } else {
                throw new Error(directRes.error || "Direct payout failed after successful conversion.");
            }
        } catch (err: any) {
            setPaymentError(err.message || "An unexpected error occurred during orchestration.");
        } finally {
            setIsExecuting(false);
        }
    };
    const handleExecuteConvertWithinWallets = async () => {
        setPaymentError(null);
        setIsExecuting(true);
        try {
            const token = fxRateData?.vfxToken || fxRateData?.token || fxRateData?.id || fxRateData?.reference || fxRateData?.vfx_token;
            if (!token) throw new Error("Missing rate token.");

            // Find target wallet matching beneficiary currency
            const targetWallet = wallets.find(w => w.currency === beneficiary.currency);
            if (!targetWallet) throw new Error(`Target wallet for ${beneficiary.currency} not found.`);

            const payload = {
                paymentType: "convertWithinWallets",
                sourceWalletId: parseInt(sourceWalletId),
                sourceAmount: parseFloat(sourceAmount),
                targetWalletId: parseInt(targetWallet.id),
                vfxToken: token,
                paymentId: crypto.randomUUID(),
                customPaymentReference: customReference || `W2W-${Date.now()}`
            };

            console.log("Executing ConvertWithinWallets Payload:", payload);
            const res = await executePaymentAction(payload);
            if (res.success) {
                // Now trigger the direct payout immediately after successful conversion
                console.log("Conversion successful, triggering direct payout...");
                
                const payoutAmount = fxRateData?.targetAmount || (parseFloat(sourceAmount) * (parseFloat(fxRateData?.rate || 0))).toFixed(2);
                
                const directPayload = {
                    beneficiaryId: parseInt(beneficiary.id),
                    purposeId: parseInt(purposeId),
                    amount: parseFloat(payoutAmount),
                    walletId: parseInt(targetWallet.id),
                    paymentId: crypto.randomUUID(),
                    clientReference: customReference || null
                };
                
                console.log("Executing Direct Payout after W2W Conversion:", directPayload);
                const directRes = await executeDirectPaymentAction(directPayload);

                if (directRes.success) {
                    setPaymentResult({
                        message: "Orchestrated Payout Successful",
                        conversion: res.data,
                        payout: directRes.data
                    });
                    setPaymentStep(3);
                    // Refresh table
                    fetchPaymentRequestsAction(beneficiary.clientReference || undefined).then(reqResult => {
                        if (reqResult.success) {
                            let requestsArray = Array.isArray(reqResult.data) ? reqResult.data : (reqResult.data?.data || []);
                            requestsArray = requestsArray.filter((req: any) => req.account?.id === beneficiary.id || req.beneficiaryId === beneficiary.id);
                            setPaymentRequests(requestsArray);
                        }
                    });
                } else {
                    throw new Error(directRes.error || "Direct payout failed after successful wallet conversion.");
                }
            } else {
                setPaymentError(res.error || "Wallet-to-Wallet conversion failed.");
            }
        } catch (err: any) {
            setPaymentError(err.message || "An unexpected error occurred during orchestrated payout.");
        } finally {
            setIsExecuting(false);
        }
    };


    const handleExecuteDirectPayment = async () => {
        if (!sourceWalletId || !sourceAmount || !purposeId) {
            setPaymentError("Please fill in all required fields (Wallet, Amount, Purpose).");
            return;
        }

        if (customReference && customReference.trim().length < 5) {
            setPaymentError("Client Reference must be at least 5 characters long.");
            return;
        }

        setPaymentError(null);
        setIsExecuting(true);
        try {
            const payload = {
                beneficiaryId: parseInt(beneficiary.id),
                purposeId: parseInt(purposeId),
                amount: parseFloat(sourceAmount),
                walletId: parseInt(sourceWalletId),
                paymentId: crypto.randomUUID(),
                clientReference: customReference || null
            };
            
            console.log("Sending Direct Payment Payload:", payload);

            const paymentRes = await executeDirectPaymentAction(payload);
            if (paymentRes.success) {
                setPaymentResult(paymentRes.data);
                setPaymentStep(3);
                // Optionally refresh requests array here if desired
            } else {
                setPaymentError(paymentRes.error || "Direct payment execution failed.");
            }
        } catch (err: any) {
            setPaymentError(err.message || "An unexpected error occurred.");
        } finally {
            setIsExecuting(false);
        }
    };

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-shamiso-gold-bright animate-spin" />
            </div>
        );
    }

    if (error || !beneficiary) {
        return (
            <div className="min-h-screen bg-black p-8 flex flex-col items-center justify-center space-y-4">
                <AlertCircle className="w-16 h-16 text-red-500" />
                <h2 className="text-2xl font-bold">Error Loading Beneficiary</h2>
                <p className="text-zinc-400">{error || "Beneficiary not found"}</p>
                <Link href="/admin/beneficiaries">
                    <Button className="bg-zinc-900 border border-zinc-800">Back to List</Button>
                </Link>
            </div>
        );
    }

    const selectedWalletCurrency = wallets.find(w => w.id.toString() === sourceWalletId)?.currency;
    const isSameCurrency = selectedWalletCurrency === beneficiary?.currency;

    const isIndividual = beneficiary.beneficiaryEntityType === "individual";

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Link href="/admin/beneficiaries" className="flex items-center text-zinc-400 hover:text-white transition-colors mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Registry
                        </Link>
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl font-bold tracking-tight uppercase">
                                {isIndividual 
                                    ? (beneficiary.beneficiaryFirstName ? `${beneficiary.beneficiaryFirstName} ${beneficiary.beneficiaryLastName}` : "Unnamed Individual")
                                    : (beneficiary.beneficiaryCompanyName || "Unnamed Company")
                                }
                            </h1>
                            {getStatusBadge(beneficiary.status || "Approved")}
                        </div>
                        <p className="text-zinc-500 font-mono text-sm">Verto ID: {beneficiary.id}</p>
                    </div>
                    
                    <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={handleOpenModal} className="bg-shamiso-gold text-black hover:bg-shamiso-gold-bright font-bold">
                                Simulate Disbursement
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle className="text-xl">Automated Payout Simulation</DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    Simulate converting funds and disbursing to this beneficiary via VertoFX API.
                                </DialogDescription>
                            </DialogHeader>

                            {paymentError && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-sm flex items-start gap-2">
                                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                    <p>{paymentError}</p>
                                </div>
                            )}

                            {paymentStep === 1 && (
                                <div className="space-y-4 py-4">
                                    {isFetchingData ? (
                                        <div className="flex items-center justify-center p-8">
                                            <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-2">
                                                <Label>Source Wallet</Label>
                                                <Select value={sourceWalletId} onValueChange={setSourceWalletId}>
                                                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                                        <SelectValue placeholder="Select a wallet to debit" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                        {wallets.map(w => (
                                                            <SelectItem key={w.id} value={w.id.toString()}>
                                                                {w.currency} Wallet - {w.id}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Debit Amount (Source Currency)</Label>
                                                <Input 
                                                    type="number" 
                                                    value={sourceAmount} 
                                                    onChange={e => setSourceAmount(e.target.value)} 
                                                    placeholder="e.g. 500.00"
                                                    className="bg-zinc-900 border-zinc-800"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Transfer Purpose</Label>
                                                <Select value={purposeId} onValueChange={setPurposeId}>
                                                    <SelectTrigger className="bg-zinc-900 border-zinc-800">
                                                        <SelectValue placeholder="Select purpose code" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                        {purposeCodes.map(p => (
                                                            <SelectItem key={p.id} value={p.id.toString()}>
                                                                {p.title} ({p.id})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Custom Reference (Optional)</Label>
                                                <Input 
                                                    value={customReference} 
                                                    onChange={e => setCustomReference(e.target.value)} 
                                                    placeholder="e.g. Royalty Payout Q1"
                                                    className="bg-zinc-900 border-zinc-800"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {paymentStep === 2 && fxRateData && (
                                <div className="space-y-4 py-4">
                                    <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-zinc-400">Debit Amount:</span>
                                            <span className="font-mono font-bold text-white">
                                                {wallets.find(w => w.id.toString() === sourceWalletId)?.currency} {sourceAmount}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-zinc-400">Live FX Rate:</span>
                                            <span className="font-mono text-shamiso-gold-bright">
                                                {fxRateData.rate || "N/A"}
                                            </span>
                                        </div>
                                        <div className="h-px bg-zinc-800 w-full" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400">Estimated Payout:</span>
                                            <span className="font-mono font-bold text-lg text-green-400">
                                                {beneficiary.currency} {fxRateData.targetAmount || (parseFloat(sourceAmount) * (parseFloat(fxRateData.rate || 0))).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-zinc-500 text-center flex items-center justify-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        {fxCountdown > 0 
                                            ? `VFX Token generated. Rate held for ${fxCountdown} seconds.`
                                            : <span className="text-red-400">Rate expired. Please fetch a new rate.</span>
                                        }
                                    </div>
                                </div>
                            )}

                            {paymentStep === 3 && paymentResult && (
                                <div className="space-y-4 py-6 text-center">
                                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold">Payment Executed</h3>
                                    <p className="text-zinc-400 text-sm">
                                        The FX trade and disbursement have been submitted successfully.
                                    </p>
                                    <div className="p-3 bg-zinc-900 rounded-lg text-xs font-mono text-zinc-500 break-all text-left mt-4 max-h-48 overflow-y-auto">
                                        {JSON.stringify(paymentResult, null, 2)}
                                    </div>
                                </div>
                            )}

                            <DialogFooter className="flex-col gap-3 sm:flex-col sm:space-x-0">
                                {paymentStep === 1 && (
                                    <div className="flex flex-col gap-3 w-full">
                                        {!sourceWalletId ? (
                                            <Button disabled className="w-full bg-zinc-800 text-zinc-400">
                                                Select a wallet to continue
                                            </Button>
                                        ) : isSameCurrency ? (
                                            <Button 
                                                disabled={isFetchingData || isExecuting || !sourceWalletId || !sourceAmount || !purposeId} 
                                                onClick={handleExecuteDirectPayment}
                                                className="w-full bg-shamiso-gold text-black hover:bg-shamiso-gold-bright"
                                            >
                                                {isExecuting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                                Execute Direct Payment
                                            </Button>
                                        ) : (
                                            <div className="flex flex-col gap-2 w-full">
                                                <Button 
                                                    disabled={isFetchingData || isExecuting || !sourceWalletId || !sourceAmount || !purposeId} 
                                                    onClick={() => handleGetFxRate("within-wallets")}
                                                    className="w-full bg-shamiso-gold text-black hover:bg-shamiso-gold-bright"
                                                >
                                                    {isExecuting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                                    FX Conversion & Payout
                                                </Button>
                                                <Button 
                                                    disabled={isFetchingData || isExecuting || !sourceWalletId || !sourceAmount || !purposeId} 
                                                    onClick={() => handleGetFxRate("manual-orchestration")}
                                                    className="w-full bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 text-xs"
                                                >
                                                    Alternative Manual Orchestration
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {paymentStep === 2 && (
                                    <div className="flex flex-col gap-3 w-full">
                                        <Button 
                                            variant="outline"
                                            onClick={() => handleGetFxRate()}
                                            disabled={isExecuting}
                                            className="w-full bg-transparent border-zinc-800 text-zinc-300 hover:text-white"
                                        >
                                            Refresh Rate
                                        </Button>
                                        <Button 
                                            disabled={isExecuting || fxCountdown === 0} 
                                            onClick={paymentRoute === "within-wallets" ? handleExecuteConvertWithinWallets : handleExecuteOrchestratedPayment}
                                            className="w-full bg-shamiso-gold text-black hover:bg-shamiso-gold-bright"
                                        >
                                            {isExecuting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            Confirm {paymentRoute === "within-wallets" ? "Wallet Conversion" : "FX & Disburse"}
                                        </Button>
                                    </div>
                                )}
                                {paymentStep === 3 && (
                                    <Button onClick={() => setIsPaymentModalOpen(false)} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">
                                        Close
                                    </Button>
                                )}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Core Identity */}
                    <Card className="bg-zinc-900/50 border-zinc-800 md:col-span-2">
                        <CardHeader className="border-b border-zinc-800/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <UserIcon className="w-5 h-5 text-shamiso-gold-bright" />
                                Profile Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Entity Type</p>
                                    <div className="flex items-center gap-2">
                                        {isIndividual ? <UserIcon className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                                        <p className="text-sm font-medium capitalize">{beneficiary.beneficiaryEntityType}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Client Reference</p>
                                    <p className="text-sm font-mono text-shamiso-gold-bright">{beneficiary.clientReference || "N/A"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Country</p>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-blue-400" />
                                        <p className="text-sm">{beneficiary.country}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Currency</p>
                                    <p className="text-sm font-bold text-white">{beneficiary.currency}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Internal Reference</p>
                                    <p className="text-sm font-mono">{beneficiary.reference || "N/A"}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="border-b border-zinc-800/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Hash className="w-5 h-5 text-shamiso-gold-bright" />
                                Address Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-1">
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Location</p>
                                <p className="text-xs text-zinc-300 leading-relaxed">
                                    {beneficiary.beneficiaryAddress || "No address provided"}
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-500">City</span>
                                <span className="text-xs">{beneficiary.beneficiaryCity || "N/A"}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-zinc-500">Postcode</span>
                                <span className="text-xs font-mono">{beneficiary.beneficiaryPostcode || "N/A"}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bank Details */}
                    <Card className="bg-zinc-900/50 border-zinc-800 md:col-span-3">
                        <CardHeader className="border-b border-zinc-800/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Landmark className="w-5 h-5 text-shamiso-gold-bright" />
                                Payout Channel Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div className="space-y-2">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Account Number</p>
                                    <p className="text-xl font-mono text-white tracking-wider">{beneficiary.accountNumber}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">National ID / Sort Code</p>
                                    <p className="text-xl font-mono text-white tracking-wider">{beneficiary.nationalId}</p>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Financial Institution</p>
                                    <p className="text-lg font-medium">{beneficiary.bankName || "N/A"}</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Country Code</p>
                                    <p className="text-sm font-bold uppercase">{beneficiary.beneficiaryCountryCode}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                {/* Payment Requests */}
                <div className="mt-8">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="border-b border-zinc-800/50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <History className="w-5 h-5 text-shamiso-gold-bright" />
                                Recent Payment Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {isLoadingRequests ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
                                </div>
                            ) : paymentRequests.length === 0 ? (
                                <div className="text-center py-8 text-zinc-500">
                                    No payment requests found for this beneficiary.
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-zinc-400 uppercase bg-zinc-900/50 border-b border-zinc-800">
                                            <tr>
                                                <th className="px-4 py-3 font-medium">Request ID</th>
                                                <th className="px-4 py-3 font-medium">Reference</th>
                                                <th className="px-4 py-3 font-medium">Amount</th>
                                                <th className="px-4 py-3 font-medium">State</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-800/50">
                                            {paymentRequests.map((req) => (
                                                <tr key={req.id} className="hover:bg-zinc-800/20 transition-colors">
                                                    <td className="px-4 py-3 font-mono">{req.id}</td>
                                                    <td className="px-4 py-3">{req.clientReference || "N/A"}</td>
                                                    <td className="px-4 py-3 font-mono font-bold text-white">{req.currency} {req.amount}</td>
                                                    <td className="px-4 py-3">
                                                        <Badge variant="outline" className="capitalize border-zinc-700 bg-zinc-900">
                                                            {req.state}
                                                        </Badge>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
