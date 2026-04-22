"use client";

import { useState, useEffect } from "react";
import { account, databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { 
    Music, 
    User, 
    Globe, 
    MessageSquare, 
    Link2, 
    Lock, 
    CreditCard, 
    Landmark, 
    Smartphone, 
    CheckCircle2, 
    ArrowRight, 
    ArrowLeft,
    Shield,
    FileText,
    TrendingUp
} from "lucide-react";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState<any>(null);
    
    const [formData, setFormData] = useState({
        // Step 1: Artist Essentials
        artistName: "",
        genre: "",
        bio: "",
        instagram: "",
        twitter: "",
        // Step 2: Identity Handshake
        tooLostEmail: "",
        // Step 3: Payouts
        payoutTerritory: "South Africa (ZAR)",
        payoutMethod: "",
        bankName: "",
        accountNumber: "",
        branchCode: "",
        mobileNumber: "",
        mobileProvider: "",
        swiftCode: "",
        // Step 4: Tax Profile
        taxFormType: "W-8BEN",
    });

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
                setUser(session);
                
                const prefs = await account.getPrefs();
                if (prefs.onboardingComplete) {
                    router.push("/dashboard");
                    return;
                }

                if (session.name && !formData.artistName) {
                    setFormData(prev => ({ ...prev, artistName: session.name }));
                }
            } catch (error) {
                router.push("/login");
            }
        };
        checkSession();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
        // Reset payout method when territory changes
        if (name === "payoutTerritory") {
            setFormData(prev => ({ ...prev, payoutTerritory: value, payoutMethod: "" }));
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            // 1. Update User Prefs (Legacy Support)
            await account.updatePrefs({
                ...formData,
                onboardingComplete: true,
                updatedAt: new Date().toISOString(),
            });

            // 2. Create/Update Profile in Database
            const databaseId = '69b7fdaa001b7da3d224';
            const collectionId = 'profiles';
            const userId = user.$id;

            // Extract currency from territory string: "South Africa (ZAR)" -> "ZAR"
            const currencyMatch = formData.payoutTerritory.match(/\(([^)]+)\)/);
            const currency = currencyMatch ? currencyMatch[1] : "USD";

            // Check if profile already exists
            const existingProfiles = await databases.listDocuments(databaseId, collectionId, [
                Query.equal('appwrite_user_id', userId)
            ]);

            const profileData = {
                appwrite_user_id: userId,
                phone_number: formData.mobileNumber || user.phone || "N/A",
                too_lost_email: formData.tooLostEmail || "N/A",
                verto_payout_currency: currency,
                verto_payout_method: formData.payoutMethod || "N/A",
                tax_form_type: formData.taxFormType || "W-8BEN"
            };

            if (existingProfiles.total > 0) {
                await databases.updateDocument(databaseId, collectionId, existingProfiles.documents[0].$id, profileData);
            } else {
                await databases.createDocument(databaseId, collectionId, ID.unique(), profileData);
            }

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Failed to save details. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    const renderStep1 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="artistName" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-shamiso-gold-bright" />
                        Artist Name
                    </Label>
                    <Input
                        id="artistName"
                        name="artistName"
                        placeholder="Enter your stage name"
                        required
                        value={formData.artistName}
                        onChange={handleChange}
                        className="bg-zinc-900/50 border-zinc-700 focus:border-shamiso-gold text-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="genre" className="flex items-center gap-2">
                        <Music className="w-4 h-4 text-shamiso-gold-bright" />
                        Primary Genre
                    </Label>
                    <Select onValueChange={(v) => handleSelectChange("genre", v)} required defaultValue={formData.genre}>
                        <SelectTrigger className="bg-zinc-900/50 border-zinc-700 focus:border-shamiso-gold text-white">
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
            </div>

            <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-shamiso-gold-bright" />
                    Short Bio
                </Label>
                <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                    className="bg-zinc-900/50 border-zinc-700 focus:border-shamiso-gold text-white min-h-[100px]"
                />
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h3 className="text-sm font-semibold text-shamiso-gold-bright uppercase tracking-wider">Social Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="instagram">Instagram Username</Label>
                        <Input
                            id="instagram"
                            name="instagram"
                            placeholder="@artistname"
                            value={formData.instagram}
                            onChange={handleChange}
                            className="bg-zinc-900/50 border-zinc-700 focus:border-shamiso-gold text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="twitter">X / Twitter Username</Label>
                        <Input
                            id="twitter"
                            name="twitter"
                            placeholder="@artistname"
                            value={formData.twitter}
                            onChange={handleChange}
                            className="bg-zinc-900/50 border-zinc-700 focus:border-shamiso-gold text-white"
                        />
                    </div>
                </div>
            </div>

            <Button
                onClick={nextStep}
                className="w-full bg-shamiso-gold-bright text-black hover:bg-shamiso-gold font-black uppercase tracking-widest h-12"
            >
                Next: Link Royalties
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 mb-4 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <Link2 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Link Your Royalties</h3>
                <p className="text-sm text-neutral-400">
                    To route your global earnings to your local wallet, we need to connect your SMD profile to your distribution catalog.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="tooLostEmail" className="text-white font-semibold">Distribution Account Email</Label>
                    <Input
                        id="tooLostEmail"
                        name="tooLostEmail"
                        type="email"
                        placeholder="artist@gmail.com"
                        required
                        value={formData.tooLostEmail}
                        onChange={handleChange}
                        className="h-12 bg-zinc-900/50 border-zinc-700 focus:border-blue-500 text-white placeholder:text-zinc-600"
                    />
                    <p className="text-xs text-neutral-500 mt-2">
                        Enter the exact email address you use for your global distribution account. Our automated system uses this to safely match your monthly royalty statements to your SMD wallet.
                    </p>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                    <Shield className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-[10px] text-blue-400/80 uppercase tracking-widest font-medium">
                        Secure 256-bit AES Encryption. We only use this for royalty reconciliation.
                    </span>
                </div>
            </div>

            <div className="flex gap-3 pt-6">
                <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 border-zinc-800 text-white hover:bg-zinc-800"
                >
                    Back
                </Button>
                <Button
                    onClick={nextStep}
                    className="flex-2 bg-blue-600 text-white hover:bg-blue-500 font-bold h-12"
                >
                    {formData.tooLostEmail ? "Next: Setup Payouts" : "Next: Skip for now"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
            
            {!formData.tooLostEmail && (
                <p className="text-center text-[10px] text-neutral-500 uppercase tracking-widest pt-4">
                    Note: Payout setup will be disabled until you link an account.
                </p>
            )}
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 mb-4 rounded-xl bg-shamiso-gold/20 flex items-center justify-center border border-shamiso-gold/30">
                    {formData.tooLostEmail ? <CreditCard className="w-6 h-6 text-shamiso-gold-bright" /> : <Lock className="w-6 h-6 text-neutral-500" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                    {formData.tooLostEmail ? "Where should we send your money?" : "Payouts Locked"}
                </h3>
                <p className="text-sm text-neutral-400">
                    {formData.tooLostEmail 
                        ? "Select your primary territory. SMD pays out at premium interbank FX rates."
                        : "Please link your distribution email in the previous step to enable regional payouts."}
                </p>
            </div>

            <div className={`space-y-6 ${!formData.tooLostEmail ? "opacity-40 pointer-events-none grayscale" : ""}`}>
                <div className="space-y-2">
                    <Label className="text-white">Territory / Target Currency</Label>
                    <Select onValueChange={(v) => handleSelectChange("payoutTerritory", v)} defaultValue={formData.payoutTerritory}>
                        <SelectTrigger className="h-12 bg-zinc-900 border-zinc-700">
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
                    <Label className="text-white">Payout Method</Label>
                    <div className="grid grid-cols-1 gap-3">
                        {/* Dynamic Payout Methods */}
                        {formData.payoutTerritory === "South Africa (ZAR)" && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handleSelectChange("payoutMethod", "ozow")}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.payoutMethod === "ozow" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-shamiso-gold-bright">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white">Instant EFT</div>
                                        <div className="text-xs text-shamiso-gold-bright/60">Powered by Ozow — Fastest</div>
                                    </div>
                                    {formData.payoutMethod === "ozow" && <CheckCircle2 className="ml-auto w-5 h-5 text-shamiso-gold-bright" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSelectChange("payoutMethod", "mukuru")}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.payoutMethod === "mukuru" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-shamiso-gold-bright">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white">Cash Pickup</div>
                                        <div className="text-xs text-neutral-500">Powered by Mukuru</div>
                                    </div>
                                    {formData.payoutMethod === "mukuru" && <CheckCircle2 className="ml-auto w-5 h-5 text-shamiso-gold-bright" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSelectChange("payoutMethod", "bank")}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.payoutMethod === "bank" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-shamiso-gold-bright">
                                        <Landmark className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white">Standard Bank Transfer</div>
                                        <div className="text-xs text-neutral-500">Local Bank Account</div>
                                    </div>
                                    {formData.payoutMethod === "bank" && <CheckCircle2 className="ml-auto w-5 h-5 text-shamiso-gold-bright" />}
                                </button>
                            </>
                        )}

                        {formData.payoutTerritory === "Nigeria (NGN)" && (
                            <button
                                type="button"
                                onClick={() => handleSelectChange("payoutMethod", "bank")}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.payoutMethod === "bank" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                            >
                                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-shamiso-gold-bright">
                                    <Landmark className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-white">Local Bank Transfer</div>
                                    <div className="text-xs text-neutral-500">Powered by Paystack / Flutterwave</div>
                                </div>
                                {formData.payoutMethod === "bank" && <CheckCircle2 className="ml-auto w-5 h-5 text-shamiso-gold-bright" />}
                            </button>
                        )}

                        {(formData.payoutTerritory === "Kenya (KES)" || formData.payoutTerritory === "Ghana (GHS)") && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => handleSelectChange("payoutMethod", "mobile")}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.payoutMethod === "mobile" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-shamiso-gold-bright">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white">Mobile Money</div>
                                        <div className="text-xs text-neutral-500">M-Pesa / MTN MoMo via PawaPay — Recommended</div>
                                    </div>
                                    {formData.payoutMethod === "mobile" && <CheckCircle2 className="ml-auto w-5 h-5 text-shamiso-gold-bright" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleSelectChange("payoutMethod", "bank")}
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.payoutMethod === "bank" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-shamiso-gold-bright">
                                        <Landmark className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-white">Standard Bank Transfer</div>
                                        <div className="text-xs text-neutral-500">Direct Local Bank Payout</div>
                                    </div>
                                    {formData.payoutMethod === "bank" && <CheckCircle2 className="ml-auto w-5 h-5 text-shamiso-gold-bright" />}
                                </button>
                            </>
                        )}

                        {formData.payoutTerritory === "Rest of World (USD)" && (
                            <button
                                type="button"
                                onClick={() => handleSelectChange("payoutMethod", "swift")}
                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${formData.payoutMethod === "swift" ? "border-shamiso-gold bg-shamiso-gold/10" : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"}`}
                            >
                                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-shamiso-gold-bright">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="font-bold text-white">International SWIFT</div>
                                    <div className="text-xs text-neutral-500">USD Bank Wire Transfer</div>
                                </div>
                                {formData.payoutMethod === "swift" && <CheckCircle2 className="ml-auto w-5 h-5 text-shamiso-gold-bright" />}
                            </button>
                        )}
                    </div>
                </div>

                {/* Localized Input Fields */}
                <div className="space-y-4 pt-4">
                    {formData.payoutMethod === "bank" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="bankName">Bank Name</Label>
                                <Input id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} className="bg-zinc-900 border-zinc-700" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="accountNumber">{formData.payoutTerritory === "Nigeria (NGN)" ? "NUBAN Account Number" : "Account Number"}</Label>
                                <Input id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="bg-zinc-900 border-zinc-700" />
                            </div>
                            {formData.payoutTerritory === "South Africa (ZAR)" && (
                                <div className="space-y-2">
                                    <Label htmlFor="branchCode">Branch Code</Label>
                                    <Input id="branchCode" name="branchCode" value={formData.branchCode} onChange={handleChange} className="bg-zinc-900 border-zinc-700" />
                                </div>
                            )}
                        </div>
                    )}

                    {formData.payoutMethod === "mobile" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="mobileNumber">Registered Mobile Number</Label>
                                <Input id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="bg-zinc-900 border-zinc-700" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mobileProvider">Provider</Label>
                                <Input id="mobileProvider" name="mobileProvider" placeholder="e.g. MTN, Airtel, M-Pesa" value={formData.mobileProvider} onChange={handleChange} className="bg-zinc-900 border-zinc-700" />
                            </div>
                        </div>
                    )}

                    {formData.payoutMethod === "swift" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="swiftCode">SWIFT/BIC Code</Label>
                                <Input id="swiftCode" name="swiftCode" value={formData.swiftCode} onChange={handleChange} className="bg-zinc-900 border-zinc-700" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="accountNumber">IBAN / Account Number</Label>
                                <Input id="accountNumber" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="bg-zinc-900 border-zinc-700" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="bankName">Bank Name & Address</Label>
                                <Input id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} className="bg-zinc-900 border-zinc-700" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary Box */}
                {formData.payoutMethod && (
                    <div className="p-4 rounded-xl bg-zinc-900/80 border border-shamiso-gold/10 mt-6 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="text-xs text-shamiso-gold-bright uppercase tracking-widest font-bold mb-1">Onboarding Summary</div>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                            Royalty matches for <span className="text-white font-bold">{formData.tooLostEmail}</span> will be automatically converted to <span className="text-shamiso-gold-bright font-bold">{formData.payoutTerritory.split(' ')[2]}</span> and paid to <span className="text-white font-bold uppercase">{formData.payoutMethod}</span>.
                        </p>
                    </div>
                )}
            </div>

            <div className="flex gap-3 pt-6">
                <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 border-zinc-800 text-white hover:bg-zinc-800"
                >
                    Back
                </Button>
                <Button
                    onClick={nextStep}
                    disabled={!!(formData.tooLostEmail && !formData.payoutMethod)}
                    className={`flex-2 font-black uppercase tracking-widest h-12 shadow-[0_0_20px_rgba(255,215,0,0.3)] ${
                        formData.tooLostEmail 
                        ? "bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright text-black" 
                        : "bg-zinc-800 text-neutral-400 border border-zinc-700 hover:bg-zinc-700"
                    }`}
                >
                    Next: Tax Profile
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-8">
                <div className="mx-auto w-12 h-12 mb-4 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                    <FileText className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Global Tax Compliance</h3>
                <p className="text-sm text-neutral-400">
                    Maximize your payouts. By tracking your tax residency, we can ensure international treaties are applied.
                </p>
            </div>

            <div className="space-y-4">
                <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/5">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white uppercase tracking-tight">The 30% Pay Raise: Sovereign Compliance</h4>
                            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                                US streaming platforms withhold 30% of royalties by default. South African residents are eligible for a <span className="text-shamiso-gold-bright font-bold">0% withholding rate</span> under Article 12(1) of the US-SA Tax Treaty. We’ll help you claim it.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-white">Tax Profile Type</Label>
                    <Select onValueChange={(v) => handleSelectChange("taxFormType", v)} defaultValue={formData.taxFormType}>
                        <SelectTrigger className="h-12 bg-zinc-900 border-zinc-700">
                            <SelectValue placeholder="Select your tax residency" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                            <SelectItem value="W-8BEN">Non-US Individual (W-8BEN)</SelectItem>
                            <SelectItem value="W-8BEN-E">Non-US Business / Label (W-8BEN-E)</SelectItem>
                            <SelectItem value="W-9">US Individual or Entity (W-9)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex gap-3 pt-6">
                <Button
                    onClick={prevStep}
                    variant="outline"
                    className="flex-1 border-zinc-800 text-white hover:bg-zinc-800"
                >
                    Back
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.taxFormType}
                    className="flex-2 font-black uppercase tracking-widest h-12 shadow-[0_0_20px_rgba(255,215,0,0.3)] bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright text-black"
                >
                    {isLoading ? "Finalizing Profile..." : "Finish Onboarding"}
                </Button>
            </div>
            <p className="text-center text-[10px] text-neutral-500 uppercase tracking-widest pt-4">
                You will complete the actual form later in your dashboard.
            </p>
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 py-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0c0a00] via-[#1a1400] to-[#0d0800] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-shamiso-gold/10 blur-[100px] -z-10" />

            <div className="w-full max-w-2xl relative">
                {/* Progress Bar */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    {[1, 2, 3, 4].map((s) => (
                        <div 
                            key={s}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? "bg-shamiso-gold shadow-[0_0_10px_rgba(255,215,0,0.4)]" : "bg-zinc-800/50"}`}
                        />
                    ))}
                </div>

                <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-xl text-white shadow-2xl">
                    <CardHeader className="text-center pb-2">
                        {step === 1 && (
                            <>
                                <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-shamiso-gold/20 flex items-center justify-center border border-shamiso-gold/30">
                                    <Music className="w-8 h-8 text-shamiso-gold-bright" />
                                </div>
                                <CardTitle className="text-3xl font-bold uppercase tracking-tight">Artist Essentials</CardTitle>
                                <CardDescription className="text-neutral-400">Tell us about your brand</CardDescription>
                            </>
                        )}
                    </CardHeader>
                    <CardContent className="pt-4">
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}
                        
                        {error && (
                            <p className="text-sm text-red-500 text-center bg-red-500/10 py-2 rounded border border-red-500/20 mt-4">{error}</p>
                        )}
                    </CardContent>
                </Card>
                
                <div className="mt-8 flex justify-center gap-6 text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold">
                    <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3" />
                        SSL Secured
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3" />
                        Fintech Grade
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        Africa-First
                    </div>
                </div>
            </div>
        </div>
    );
}
