"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, FileText, ChevronRight, DownloadCloud, Wallet, Percent, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TaxDashboardPage() {
    const [isVerified, setIsVerified] = useState(false);
    const [isEntity, setIsEntity] = useState(false);

    const handleMockSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call and webhook response
        setTimeout(() => setIsVerified(true), 800);
    };

    return (
        <main className="min-h-screen bg-black pt-28 pb-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                
                {/* Header Section */}
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            Tax & Payouts 
                            {isVerified && (
                                <span className="inline-flex items-center rounded-full border border-shamiso-gold/30 bg-shamiso-gold/10 px-2 py-0.5 text-xs font-semibold text-shamiso-gold-bright">
                                    <ShieldCheck className="mr-1 h-3 w-3" /> SMD Verified
                                </span>
                            )}
                        </h1>
                        <p className="text-white/60 mt-1">Manage your tax compliance and optimize your global earnings.</p>
                    </div>
                </div>

                {isVerified ? (
                    /* The "Dopamine" UI Trigger - Verified State */
                    <div className="animate-in fade-in zoom-in duration-500 relative overflow-hidden rounded-2xl border border-shamiso-gold shadow-lg shadow-shamiso-gold/20 bg-black p-8 text-center sm:p-12">
                        {/* Fake Confetti / Glow */}
                        <div className="absolute left-1/2 top-0 h-[200px] w-[500px] -translate-x-1/2 bg-shamiso-gold/20 blur-[100px] pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-shamiso-gold to-shamiso-gold-bright shadow-lg shadow-shamiso-gold/40">
                                <CheckCircle2 className="h-10 w-10 text-black" />
                            </div>
                            
                            <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold text-white">🎉 You've Just Unlocked a 30% Pay Raise!</h2>
                            <p className="mb-8 max-w-2xl text-lg text-white/70">
                                Excellent work. Your W-8BEN Tax Treaty form has been successfully verified. By activating the US-South Africa Tax Treaty through our portal, you have officially reduced your international royalty withholding from the standard 30% down to 0% (Article 12).
                            </p>

                            {/* Before & After Payouts Graphic */}
                            <div className="mb-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 opacity-80">
                                    <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-400">Old Payout Structure</div>
                                    <div className="mb-4 text-4xl font-bold text-white">70%</div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                                        <div className="h-full w-[70%] bg-red-500/50" />
                                    </div>
                                    <div className="mt-2 text-xs text-red-300">30% lost to Default IRS Withholding</div>
                                </div>
                                <div className="rounded-xl border border-shamiso-gold/40 bg-shamiso-gold/10 p-6 shadow-[0_0_30px_rgba(255,200,0,0.1)]">
                                    <div className="mb-2 text-sm font-bold uppercase tracking-wider text-shamiso-gold-bright">Optimized Payout (Now)</div>
                                    <div className="mb-4 text-4xl font-bold text-white flex items-center justify-center">100% <CheckCircle2 className="ml-2 h-6 w-6 text-shamiso-gold" /></div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                                        <div className="h-full w-full bg-shamiso-gold" />
                                    </div>
                                    <div className="mt-2 text-xs text-shamiso-gold/80">0% Withheld via Verified Article 12 Treaty</div>
                                </div>
                            </div>

                            <div className="mb-8 w-full max-w-lg rounded-xl border border-white/5 bg-zinc-900/40 p-6 text-left">
                                <h4 className="mb-2 text-sm font-bold text-white flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-shamiso-gold" />
                                    Letter of Instruction for Distribution Partner
                                </h4>
                                <p className="mb-4 text-xs text-white/60">Generate a formal letter to ensure your US partner applies the 0% rate correctly.</p>
                                <Button className="w-full bg-shamiso-gold text-black hover:bg-shamiso-gold/80 font-bold">
                                    <DownloadCloud className="mr-2 h-4 w-4" /> Download Letter of Instruction
                                </Button>
                            </div>

                            <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
                                <Button className="w-full bg-white text-black hover:bg-zinc-200">
                                    <Wallet className="mr-2 h-4 w-4" /> View Wealth Dashboard
                                </Button>
                                <Button variant="outline" className="w-full border-shamiso-gold text-shamiso-gold hover:bg-shamiso-gold/10">
                                    Explore beatBread Funding
                                </Button>
                            </div>
                            
                            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/50">
                                <DownloadCloud className="h-4 w-4" />
                                A copy of your signed certificate is in your Financial Documents folder.
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Initial Pending State & Form */
                    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                        
                        {/* Main Form Area */}
                        <div className="space-y-6">
                            <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-6 sm:p-8">
                                <h2 className="mb-4 text-xl font-bold text-white flex items-center">
                                    <FileText className="mr-3 h-5 w-5 text-shamiso-gold" />
                                    Submit Form W-8BEN
                                </h2>
                                <p className="mb-8 text-sm text-white/60">
                                    Secure your optimal royalty rate. Information provided here will be securely encrypted and synced via Track1099/TaxBandits to the IRS.
                                </p>
                                
                                <form onSubmit={handleMockSubmit} className="space-y-6">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-white/60">Legal Entity Type</label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 text-sm text-white hover:cursor-pointer">
                                                    <input type="radio" className="text-shamiso-gold checked:bg-shamiso-gold focus:ring-shamiso-gold h-4 w-4 rounded-full border-white/20 bg-black" name="entityType" value="individual" defaultChecked onChange={() => setIsEntity(false)} />
                                                    Individual (W-8BEN)
                                                </label>
                                                <label className="flex items-center gap-2 text-sm text-white hover:cursor-pointer">
                                                    <input type="radio" className="text-shamiso-gold checked:bg-shamiso-gold focus:ring-shamiso-gold h-4 w-4 rounded-full border-white/20 bg-black" name="entityType" value="entity" onChange={() => setIsEntity(true)} />
                                                    Business (W-8BEN-E)
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shared / Specific Inputs */}
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
                                                {isEntity ? "Entity Legal Name" : "Legal Name (Must match Gov ID)"}
                                            </label>
                                            <input required type="text" className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-shamiso-gold focus:outline-hidden" placeholder={isEntity ? "Shamiso Music Distribution (Pty) Ltd" : "First Last Name"} />
                                        </div>
                                        
                                        {!isEntity && (
                                            <div className="space-y-2 animate-in fade-in">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/60">Date of Birth</label>
                                                <input required type="date" className="w-full rounded-md border border-white/10 bg-[color-scheme:dark] bg-black/50 px-3 py-2 text-sm text-white focus:border-shamiso-gold focus:outline-hidden" />
                                            </div>
                                        )}
                                        {isEntity && (
                                            <div className="space-y-2 animate-in fade-in">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/60">Chapter 3 Status</label>
                                                <select className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-shamiso-gold focus:outline-hidden">
                                                    <option>Corporation</option>
                                                    <option>Partnership</option>
                                                    <option>Disregarded Entity</option>
                                                    <option>Simple Trust</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-white/60">
                                                {isEntity ? "Country of Incorporation" : "Country of Citizenship"}
                                            </label>
                                            <select className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-shamiso-gold focus:outline-hidden">
                                                <option value="ZA">South Africa</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="ZW">Zimbabwe</option>
                                                <option value="KE">Kenya</option>
                                                <option value="GH">Ghana</option>
                                                <option value="US">United States</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-white/60 flex items-center justify-between">
                                                {isEntity ? "US TIN or Foreign TIN" : "Foreign Tax ID (FTIN)"}
                                                <span className="text-[10px] text-shamiso-gold capitalize font-normal border border-shamiso-gold/50 rounded-sm px-1">Required for Treaty</span>
                                            </label>
                                            <input required type="text" className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-shamiso-gold focus:outline-hidden" placeholder="e.g. SARS Number" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-white/60 flex items-center gap-2">
                                            Permanent Residence Address
                                            <span className="text-[10px] font-bold text-red-500 uppercase bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">P.O. Boxes Prohibited</span>
                                        </label>
                                        <input 
                                            required 
                                            type="text" 
                                            className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-shamiso-gold focus:outline-hidden invalid:border-red-500/50" 
                                            placeholder="Full Street Address" 
                                            pattern="^(?!.*([Pp]\.?\s*[Oo]\.?\s*[Bb]ox|[Pp]ost\s+[Oo]ffice\s+[Bb]ox)).*$"
                                            title="P.O. Boxes are strictly prohibited for tax residency verification."
                                        />
                                    </div>

                                    <div className="rounded-lg border border-shamiso-gold/30 bg-shamiso-gold/5 p-4 animate-in fade-in">
                                        <div className="flex justify-between items-start mb-3">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-shamiso-gold">Claim of Tax Treaty Benefits</label>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex h-10 w-full items-center rounded-md border border-shamiso-gold/20 bg-black/50 px-3 text-sm text-shamiso-gold font-medium shadow-[0_0_15px_rgba(255,215,0,0.05)]">
                                                <CheckCircle2 className="mr-2 h-4 w-4" /> US-SA Article 12 (0%) Detected
                                            </div>
                                            <div className="text-[11px] font-mono leading-relaxed text-shamiso-gold/80 bg-black p-4 rounded-md border border-white/5 relative overflow-hidden">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-shamiso-gold/40" />
                                                The beneficial owner is a resident of South Africa and the income consists of royalties derived from the use of, or the right to use, copyrights of musical work. Under Article 12(1) of the US-South Africa Income Tax Treaty, such royalties are taxable only in the state of residence (South Africa).
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-white/10">
                                        <div className="text-[11px] font-light text-white/50 leading-relaxed bg-zinc-900/50 p-4 rounded-lg border border-white/5">
                                            Under penalties of perjury, I declare that I have examined the information on this form and to the best of my knowledge and belief it is true, correct, and complete. I further certify under penalties of perjury that:
                                            {isEntity ? (
                                                <ul className="list-disc pl-4 mt-2 space-y-1">
                                                    <li>The entity identified on line 1 is the beneficial owner of all the income to which this form relates</li>
                                                    <li>The entity identified on line 1 is not a U.S. person.</li>
                                                </ul>
                                            ) : (
                                                <ul className="list-disc pl-4 mt-2 space-y-1">
                                                    <li>I am the individual that is the beneficial owner of all the income to which this form relates or am using this form to document myself for chapter 4 purposes,</li>
                                                    <li>I am not a U.S. person.</li>
                                                </ul>
                                            )}
                                        </div>
                                        
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-white/60">Electronic Signature (FullName)</label>
                                                <input required type="text" className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-shamiso-gold focus:outline-hidden" placeholder="Type your full legal name" />
                                            </div>
                                            {isEntity && (
                                                <div className="space-y-2 animate-in fade-in">
                                                    <label className="text-xs font-semibold uppercase tracking-wider text-white/60">Title (e.g. CEO/Director)</label>
                                                    <input required type="text" className="w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-shamiso-gold focus:outline-hidden" placeholder="Your Title" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/10">
                                        <Button type="submit" className="w-full bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright text-black hover:brightness-110 font-bold shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                                            Sign and Submit securely
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar "Wealth Meter" */}
                        <div className="space-y-6">
                            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Percent className="w-12 h-12 text-shamiso-gold" />
                                </div>
                                <h3 className="mb-4 flex items-center text-sm font-bold uppercase tracking-widest text-white/80">
                                    <Percent className="mr-2 h-4 w-4 text-shamiso-gold" />
                                    Wealth Retention Meter 
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 transition-all hover:bg-red-500/10">
                                        <div className="mb-1 text-xs font-semibold uppercase tracking-tighter text-white/40">Default IRS Leakage</div>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <span className="text-3xl font-black text-red-500">30%</span>
                                            <span className="text-[10px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded uppercase">Current Baseline</span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                                            <div className="h-full w-[30%] bg-linear-to-r from-red-600 to-red-400" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-center -my-2 relative z-10">
                                        <div className="bg-black border border-white/10 rounded-full p-1 shadow-lg">
                                            <ChevronRight className="h-4 w-4 rotate-90 text-shamiso-gold animate-bounce" />
                                        </div>
                                    </div>
                                    
                                    <div className="rounded-lg border border-shamiso-gold/30 bg-shamiso-gold/5 p-4 transition-all hover:bg-shamiso-gold/10 group/item">
                                        <div className="mb-1 text-xs font-semibold uppercase tracking-tighter text-shamiso-gold/60">Verified Treaty Target</div>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <span className="text-3xl font-black text-shamiso-gold-bright group-hover/item:scale-110 transition-transform origin-left">0%</span>
                                            <span className="text-[10px] font-bold text-shamiso-gold bg-shamiso-gold/20 px-1.5 py-0.5 rounded uppercase tracking-widest">Optimized goal</span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                                            <div className="h-full w-0 bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright transition-all duration-1000 group-hover/item:w-full opacity-50" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-6 rounded-md bg-zinc-950 border border-white/5 p-3 text-center">
                                    <p className="text-[10px] leading-relaxed font-medium text-white/50">
                                        By validating <span className="text-shamiso-gold">Article 12(1)</span>, you retain <span className="text-white font-bold">100%</span> of your royalties instead of the default 70%.
                                    </p>
                                </div>
                            </div>
                            
                            {/* Need Help link */}
                            <Link href="/support/tax" className="block rounded-xl border border-white/10 bg-zinc-900/30 p-4 transition-colors hover:bg-zinc-900">
                                <div className="text-sm font-semibold text-white">Unsure how to fill this out?</div>
                                <div className="mt-1 flex items-center text-xs text-shamiso-gold">
                                    Read our W-8BEN & Tax Support Guide <ChevronRight className="ml-1 h-3 w-3" />
                                </div>
                            </Link>

                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
