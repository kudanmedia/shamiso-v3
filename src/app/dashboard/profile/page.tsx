"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { 
    User, 
    CreditCard, 
    Landmark, 
    Phone, 
    ArrowLeft, 
    Save, 
    Link2, 
    Shield, 
    Globe, 
    Smartphone,
    CheckCircle2,
    Lock
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        // Artist Details
        name: "",
        artistName: "",
        bio: "",
        instagram: "",
        twitter: "",
        genre: "",
        // Identity Handshake
        tooLostEmail: "",
        // Payment Orchestration
        payoutTerritory: "South Africa (ZAR)",
        payoutMethod: "",
        bankName: "",
        accountNumber: "",
        branchCode: "",
        mobileNumber: "",
        mobileProvider: "",
        swiftCode: "",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const session = await account.get();
                const prefs = await account.getPrefs();
                setUser(session);
                setFormData(prev => ({
                    ...prev,
                    name: session.name || "",
                    artistName: prefs.artistName || session.name || "",
                    bio: prefs.bio || "",
                    instagram: prefs.instagram || "",
                    twitter: prefs.twitter || "",
                    genre: prefs.genre || "",
                    tooLostEmail: prefs.tooLostEmail || "",
                    payoutTerritory: prefs.payoutTerritory || "South Africa (ZAR)",
                    payoutMethod: prefs.payoutMethod || "",
                    bankName: prefs.bankName || "",
                    accountNumber: prefs.accountNumber || "",
                    branchCode: prefs.branchCode || "",
                    mobileNumber: prefs.mobileNumber || session.phone || "",
                    mobileProvider: prefs.mobileProvider || "",
                    swiftCode: prefs.swiftCode || "",
                }));
            } catch (error) {
                router.push("/login");
            }
        };
        fetchUserData();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === "payoutTerritory") {
            setFormData(prev => ({ ...prev, payoutTerritory: value, payoutMethod: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ text: "", type: "" });

        try {
            if (formData.name !== user.name) {
                await account.updateName(formData.name);
            }

            await account.updatePrefs({
                ...formData,
                updatedAt: new Date().toISOString(),
            });

            setMessage({ text: "Profile updated successfully!", type: "success" });
        } catch (err: any) {
            setMessage({ text: err.message || "Failed to update profile.", type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 relative overflow-hidden">
             {/* Background Effects */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0c0a00] via-[#0d0800] to-black -z-10" />
            
            <div className="max-w-4xl mx-auto relative">
                <div className="mb-8 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center text-neutral-400 hover:text-white transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold uppercase tracking-tight">Settings</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="bg-zinc-900 border border-zinc-800 mb-8 p-1">
                            <TabsTrigger value="profile" className="data-[state=active]:bg-shamiso-gold data-[state=active]:text-black rounded-lg">
                                <User className="mr-2 h-4 w-4" />
                                Artist Profile
                            </TabsTrigger>
                            <TabsTrigger value="identity" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                                <Link2 className="mr-2 h-4 w-4" />
                                Distribution Link
                            </TabsTrigger>
                            <TabsTrigger value="payment" className="data-[state=active]:bg-shamiso-gold-bright data-[state=active]:text-black rounded-lg">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Payment Orchestration
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile" className="space-y-6">
                            <Card className="bg-zinc-900/50 border-zinc-800 text-white backdrop-blur-xl">
                                <CardHeader>
                                    <CardTitle>Public Information</CardTitle>
                                    <CardDescription>Visible to fans and curators.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Legal Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="artistName">Artist Name</Label>
                                            <Input
                                                id="artistName"
                                                name="artistName"
                                                value={formData.artistName}
                                                onChange={handleChange}
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="genre">Primary Genre</Label>
                                        <Select onValueChange={(v) => handleSelectChange("genre", v)} defaultValue={formData.genre}>
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                <SelectValue placeholder="Select a genre" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                <SelectItem value="Amapiano">Amapiano</SelectItem>
                                                <SelectItem value="Afro House">Afro House</SelectItem>
                                                <SelectItem value="Afro Tech">Afro Tech</SelectItem>
                                                <SelectItem value="3-Step">3-Step</SelectItem>
                                                <SelectItem value="Lekompo">Lekompo</SelectItem>
                                                <SelectItem value="Maskandi">Maskandi</SelectItem>
                                                <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            className="bg-zinc-800 border-zinc-700 min-h-[100px]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="instagram">Instagram Username</Label>
                                            <Input
                                                id="instagram"
                                                name="instagram"
                                                placeholder="@"
                                                value={formData.instagram}
                                                onChange={handleChange}
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="twitter">X / Twitter Username</Label>
                                            <Input
                                                id="twitter"
                                                name="twitter"
                                                placeholder="@"
                                                value={formData.twitter}
                                                onChange={handleChange}
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="identity" className="space-y-6">
                            <Card className="bg-zinc-900/50 border-zinc-800 text-white backdrop-blur-xl">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400">
                                            <Link2 className="h-5 w-5" />
                                        </div>
                                        <CardTitle>Global Distribution Sync</CardTitle>
                                    </div>
                                    <CardDescription>Connect your distribution account to reconcile royalty statements.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="tooLostEmail" className="font-bold">Distribution Email</Label>
                                        <Input
                                            id="tooLostEmail"
                                            name="tooLostEmail"
                                            placeholder="artist@gmail.com"
                                            value={formData.tooLostEmail}
                                            onChange={handleChange}
                                            className="bg-zinc-800 border-zinc-700 h-12"
                                        />
                                        <p className="text-sm text-neutral-400 mt-2">
                                            This email is used to match your CSV royalty data from your distribution partner to your SMD account.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                        <Shield className="h-5 w-5 text-blue-400 shrink-0" />
                                        <div className="text-xs text-blue-400/80 leading-relaxed font-medium tracking-wide">
                                            SECURE ACCOUNT LINKING: We use 256-bit encryption for all identity mapping. Your distribution login remains private.
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="payment" className="space-y-6">
                            <Card className="bg-zinc-900/50 border-zinc-800 text-white backdrop-blur-xl relative overflow-hidden">
                                {!formData.tooLostEmail && (
                                    <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
                                        <div className="max-w-xs space-y-4 animate-in fade-in zoom-in duration-300">
                                            <div className="mx-auto w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-shamiso-gold-bright">
                                                <Lock className="w-6 h-6" />
                                            </div>
                                            <h4 className="text-lg font-bold">Payments Locked</h4>
                                            <p className="text-sm text-neutral-400">
                                                You must link your distribution account in the <span className="text-blue-400 font-bold">Distribution Link</span> tab before configuring payouts.
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle>Payout Settings</CardTitle>
                                    <CardDescription>Configure your localized financial routing for Verto FX payouts.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="space-y-2">
                                        <Label className="text-shamiso-gold-bright">Territory / Target Currency</Label>
                                        <Select 
                                            onValueChange={(v) => handleSelectChange("payoutTerritory", v)} 
                                            defaultValue={formData.payoutTerritory}
                                        >
                                            <SelectTrigger className="h-12 bg-zinc-800 border-zinc-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                                <SelectItem value="South Africa (ZAR)">South Africa (ZAR)</SelectItem>
                                                <SelectItem value="Nigeria (NGN)">Nigeria (NGN)</SelectItem>
                                                <SelectItem value="Kenya (KES)">Kenya (KES)</SelectItem>
                                                <SelectItem value="Ghana (GHS)">Ghana (GHS)</SelectItem>
                                                <SelectItem value="Rest of World (USD)">Rest of World (USD)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-4">
                                        <Label>Payout Method</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {/* SA Logic */}
                                            {formData.payoutTerritory === "South Africa (ZAR)" && (
                                                <>
                                                    <button type="button" onClick={() => handleSelectChange("payoutMethod", "ozow")} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${formData.payoutMethod === "ozow" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-800/40"}`}>
                                                        <Smartphone className="w-5 h-5 text-shamiso-gold-bright" />
                                                        <div>
                                                            <div className="text-sm font-bold">Instant EFT</div>
                                                            <div className="text-[10px] text-neutral-500">Fastest (Ozow)</div>
                                                        </div>
                                                        {formData.payoutMethod === "ozow" && <CheckCircle2 className="ml-auto w-4 h-4 text-shamiso-gold-bright" />}
                                                    </button>
                                                    <button type="button" onClick={() => handleSelectChange("payoutMethod", "mukuru")} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${formData.payoutMethod === "mukuru" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-800/40"}`}>
                                                        <Globe className="w-5 h-5 text-shamiso-gold-bright" />
                                                        <div>
                                                            <div className="text-sm font-bold">Cash Pickup</div>
                                                            <div className="text-[10px] text-neutral-500">Mukuru</div>
                                                        </div>
                                                        {formData.payoutMethod === "mukuru" && <CheckCircle2 className="ml-auto w-4 h-4 text-shamiso-gold-bright" />}
                                                    </button>
                                                </>
                                            )}
                                            {/* ROW Logic */}
                                            {formData.payoutTerritory === "Rest of World (USD)" && (
                                                <button type="button" onClick={() => handleSelectChange("payoutMethod", "swift")} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${formData.payoutMethod === "swift" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-800/40"} col-span-full`}>
                                                    <Globe className="w-5 h-5 text-shamiso-gold-bright" />
                                                    <div>
                                                        <div className="text-sm font-bold">International SWIFT</div>
                                                        <div className="text-[10px] text-neutral-500">USD Bank Wire</div>
                                                    </div>
                                                    {formData.payoutMethod === "swift" && <CheckCircle2 className="ml-auto w-4 h-4 text-shamiso-gold-bright" />}
                                                </button>
                                            )}
                                            {/* Default Bank/Mobile */}
                                            {(formData.payoutTerritory !== "Rest of World (USD)") && (
                                                <button type="button" onClick={() => handleSelectChange("payoutMethod", "bank")} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${formData.payoutMethod === "bank" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-800/40"}`}>
                                                    <Landmark className="w-5 h-5 text-shamiso-gold-bright" />
                                                    <div>
                                                        <div className="text-sm font-bold">{formData.payoutTerritory === "Nigeria (NGN)" ? "NUBAN Transfer" : "Bank Transfer"}</div>
                                                        <div className="text-[10px] text-neutral-500">Local Bank</div>
                                                    </div>
                                                    {formData.payoutMethod === "bank" && <CheckCircle2 className="ml-auto w-4 h-4 text-shamiso-gold-bright" />}
                                                </button>
                                            )}
                                            {(formData.payoutTerritory === "Kenya (KES)" || formData.payoutTerritory === "Ghana (GHS)") && (
                                                <button type="button" onClick={() => handleSelectChange("payoutMethod", "mobile")} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${formData.payoutMethod === "mobile" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-800/40"}`}>
                                                    <Smartphone className="w-5 h-5 text-shamiso-gold-bright" />
                                                    <div>
                                                        <div className="text-sm font-bold">Mobile Money</div>
                                                        <div className="text-[10px] text-neutral-500">M-Pesa/MTN (PawaPay)</div>
                                                    </div>
                                                    {formData.payoutMethod === "mobile" && <CheckCircle2 className="ml-auto w-4 h-4 text-shamiso-gold-bright" />}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-6 space-y-4">
                                        {formData.payoutMethod === "bank" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="bankName">Bank Name</Label>
                                                    <Input id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="accountNumber">Account Number</Label>
                                                    <Input id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                </div>
                                                {formData.payoutTerritory === "South Africa (ZAR)" && (
                                                    <div className="space-y-2">
                                                        <Label htmlFor="branchCode">Branch Code</Label>
                                                        <Input id="branchCode" name="branchCode" value={formData.branchCode} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {formData.payoutMethod === "mobile" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                                                    <Input id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="mobileProvider">Provider (MTN, Airtel, etc.)</Label>
                                                    <Input id="mobileProvider" name="mobileProvider" value={formData.mobileProvider} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                </div>
                                            </div>
                                        )}

                                        {formData.payoutMethod === "swift" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="swiftCode">SWIFT/BIC Code</Label>
                                                    <Input id="swiftCode" name="swiftCode" value={formData.swiftCode} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="accountNumber">Account Number / IBAN</Label>
                                                    <Input id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                </div>
                                                <div className="md:col-span-2 space-y-2">
                                                    <Label htmlFor="bankName">Bank Name & Address</Label>
                                                    <Input id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-8 flex flex-col items-center gap-4">
                        {message.text && (
                            <div className={`flex items-center gap-2 p-3 rounded-xl border ${message.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-500" : "bg-red-500/10 border-red-500/20 text-red-500"}`}>
                                {message.type === "success" && <CheckCircle2 className="h-4 w-4" />}
                                <span className="text-sm font-medium">{message.text}</span>
                            </div>
                        )}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full md:w-auto px-12 bg-shamiso-gold-bright text-black font-black uppercase tracking-widest hover:bg-shamiso-gold h-14 shadow-xl shadow-shamiso-gold/10"
                        >
                            <Save className="mr-2 h-5 w-5" />
                            {isLoading ? "Saving Settings..." : "Save All Changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
