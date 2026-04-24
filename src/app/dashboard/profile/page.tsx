"use client";

import { useState, useEffect } from "react";
import { account, databases } from "@/lib/appwrite";
import { Query } from "appwrite";
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
    Lock,
    Building2
} from "lucide-react";
import Link from "next/link";
import { createVertoBeneficiaryAction, updateVertoBeneficiaryAction } from "@/app/onboarding/actions";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
        beneficiaryEntityType: "individual",
        beneficiaryFirstName: "",
        beneficiaryLastName: "",
        beneficiaryCompanyName: "",
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
                    beneficiaryEntityType: prefs.beneficiaryEntityType || "individual",
                    beneficiaryFirstName: prefs.beneficiaryFirstName || "",
                    beneficiaryLastName: prefs.beneficiaryLastName || "",
                    beneficiaryCompanyName: prefs.beneficiaryCompanyName || "",
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
            const prefs = await account.getPrefs();
            let vertoBeneficiaryId = prefs.verto_beneficiary_id || null;

            // 1. Create or Update Verto Beneficiary if payout details are provided
            if (formData.payoutMethod) {
                const territoryMap: Record<string, { code: string; name: string; currency: string }> = {
                    "South Africa (ZAR)": { code: "ZA", name: "South Africa", currency: "ZAR" },
                    "Nigeria (NGN)": { code: "NG", name: "Nigeria", currency: "NGN" },
                    "Kenya (KES)": { code: "KE", name: "Kenya", currency: "KES" },
                    "Ghana (GHS)": { code: "GH", name: "Ghana", currency: "GHS" },
                    "Rest of World (USD)": { code: "US", name: "United States", currency: "USD" },
                };

                const territory = territoryMap[formData.payoutTerritory] || territoryMap["Rest of World (USD)"];
                
                const beneficiaryData: any = {
                    beneficiaryEntityType: formData.beneficiaryEntityType as "company" | "individual",
                    currency: territory.currency,
                    beneficiaryCountryCode: territory.code,
                    accountNumber: formData.accountNumber || formData.mobileNumber,
                    nationalId: (formData.branchCode?.trim() || formData.swiftCode?.trim() || 
                                (territory.code === 'ZA' ? '000000' : 
                                 territory.code === 'NG' ? '000000000' : '00000000')),
                    country: territory.name,
                    clientReference: `SMD-${user.$id.substring(0, 8)}`,
                };

                if (formData.beneficiaryEntityType === "individual") {
                    beneficiaryData.beneficiaryFirstName = formData.beneficiaryFirstName;
                    beneficiaryData.beneficiaryLastName = formData.beneficiaryLastName;
                } else {
                    beneficiaryData.beneficiaryCompanyName = formData.beneficiaryCompanyName;
                }

                if (vertoBeneficiaryId) {
                    const vertoResult = await updateVertoBeneficiaryAction(vertoBeneficiaryId, beneficiaryData);
                    if (!vertoResult.success) {
                        console.warn("Verto beneficiary update failed:", vertoResult.error);
                    }
                } else {
                    const vertoResult = await createVertoBeneficiaryAction(beneficiaryData);
                    if (vertoResult.success) {
                        vertoBeneficiaryId = vertoResult.data?.account?.id;
                    } else {
                        console.warn("Verto beneficiary creation failed:", vertoResult.error);
                    }
                }
            }

            // 2. Update Auth & Prefs
            if (formData.name !== user.name) {
                await account.updateName(formData.name);
            }

            await account.updatePrefs({
                ...formData,
                verto_beneficiary_id: vertoBeneficiaryId,
                updatedAt: new Date().toISOString(),
            });

            // 3. Update Profiles Collection (Optional but recommended for consistency)
            try {
                const databaseId = '69b7fdaa001b7da3d224';
                const collectionId = 'profiles';
                
                const existingProfiles = await databases.listDocuments(databaseId, collectionId, [
                    Query.equal('appwrite_user_id', user.$id)
                ]);

                const currencyMatch = formData.payoutTerritory.match(/\(([^)]+)\)/);
                const currency = currencyMatch ? currencyMatch[1] : "USD";

                const profileData = {
                    appwrite_user_id: user.$id,
                    phone_number: formData.mobileNumber || user.phone || "N/A",
                    too_lost_email: formData.tooLostEmail || "N/A",
                    verto_payout_currency: currency,
                    verto_payout_method: formData.payoutMethod || "N/A",
                    verto_beneficiary_id: vertoBeneficiaryId ? String(vertoBeneficiaryId) : "N/A",
                    beneficiary_entity_type: formData.beneficiaryEntityType,
                };

                if (existingProfiles.total > 0) {
                    await databases.updateDocument(databaseId, collectionId, existingProfiles.documents[0].$id, profileData);
                } else {
                    // Only create if it doesn't exist (though onboarding usually handles this)
                    await databases.createDocument(databaseId, collectionId, 'unique()', profileData);
                }
            } catch (pError) {
                console.error("Profile Collection Sync Error:", pError);
            }

            setMessage({ text: "Profile and Payout settings updated successfully!", type: "success" });
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
                                    <div className="space-y-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                        <Label className="text-shamiso-gold-bright uppercase tracking-widest text-[10px] font-bold">Account Type</Label>
                                        <RadioGroup 
                                            value={formData.beneficiaryEntityType} 
                                            onValueChange={(v) => handleSelectChange("beneficiaryEntityType", v)}
                                            className="flex gap-4"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="individual" id="individual" />
                                                <Label htmlFor="individual" className="text-white flex items-center gap-2 cursor-pointer">
                                                    <User className="w-4 h-4" /> Individual
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="company" id="company" />
                                                <Label htmlFor="company" className="text-white flex items-center gap-2 cursor-pointer">
                                                    <Building2 className="w-4 h-4" /> Company / Label
                                                </Label>
                                            </div>
                                        </RadioGroup>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                            {formData.beneficiaryEntityType === "individual" ? (
                                                <>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="beneficiaryFirstName" className="text-zinc-400 text-xs">First Name</Label>
                                                        <Input 
                                                            id="beneficiaryFirstName" 
                                                            name="beneficiaryFirstName" 
                                                            value={formData.beneficiaryFirstName} 
                                                            onChange={handleChange} 
                                                            className="bg-zinc-800 border-zinc-700" 
                                                            placeholder="First Name"
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="beneficiaryLastName" className="text-zinc-400 text-xs">Last Name</Label>
                                                        <Input 
                                                            id="beneficiaryLastName" 
                                                            name="beneficiaryLastName" 
                                                            value={formData.beneficiaryLastName} 
                                                            onChange={handleChange} 
                                                            className="bg-zinc-800 border-zinc-700" 
                                                            placeholder="Last Name"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label htmlFor="beneficiaryCompanyName" className="text-zinc-400 text-xs">Company Name</Label>
                                                    <Input 
                                                        id="beneficiaryCompanyName" 
                                                        name="beneficiaryCompanyName" 
                                                        value={formData.beneficiaryCompanyName} 
                                                        onChange={handleChange} 
                                                        className="bg-zinc-800 border-zinc-700" 
                                                        placeholder="Registered Company Name"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

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
                                                <button type="button" onClick={() => handleSelectChange("payoutMethod", "bank")} className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${formData.payoutMethod === "bank" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-800/40"}`}>
                                                    <Landmark className="w-5 h-5 text-shamiso-gold-bright" />
                                                    <div>
                                                        <div className="text-sm font-bold">Bank Transfer</div>
                                                        <div className="text-[10px] text-neutral-500">Local EFT</div>
                                                    </div>
                                                    {formData.payoutMethod === "bank" && <CheckCircle2 className="ml-auto w-4 h-4 text-shamiso-gold-bright" />}
                                                </button>
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
                                                    <Input id="bankName" name="bankName" placeholder="e.g. Standard Bank, GTBank" value={formData.bankName} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="accountNumber">{formData.payoutTerritory === "Nigeria (NGN)" ? "NUBAN Account Number" : "Account Number"}</Label>
                                                    <Input id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                </div>
                                                {formData.payoutTerritory === "South Africa (ZAR)" && (
                                                    <div className="space-y-2">
                                                        <Label htmlFor="branchCode">Branch Code (6 Digits)</Label>
                                                        <Input id="branchCode" name="branchCode" placeholder="e.g. 051001" value={formData.branchCode} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                    </div>
                                                )}
                                                {formData.payoutTerritory === "Nigeria (NGN)" && (
                                                    <div className="space-y-2">
                                                        <Label htmlFor="branchCode">Sort Code (9 Digits)</Label>
                                                        <Input id="branchCode" name="branchCode" placeholder="e.g. 044150149" value={formData.branchCode} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
                                                    </div>
                                                )}
                                                {(formData.payoutTerritory === "Kenya (KES)" || formData.payoutTerritory === "Ghana (GHS)") && (
                                                    <div className="space-y-2">
                                                        <Label htmlFor="swiftCode">SWIFT / BIC Code</Label>
                                                        <Input id="swiftCode" name="swiftCode" placeholder="e.g. KCBKKENA" value={formData.swiftCode} onChange={handleChange} className="bg-zinc-800 border-zinc-700" />
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
