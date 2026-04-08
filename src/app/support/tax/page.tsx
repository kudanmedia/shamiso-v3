"use client";

import { CheckCircle2, AlertTriangle, FileText, Globe, Info, DownloadCloud, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TaxSupportPage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-16">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(180,140,20,0.1),transparent_50%)] pointer-events-none" />
            <div className="fixed top-20 right-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <div className="mb-4 inline-flex items-center rounded-full border border-shamiso-gold/30 bg-shamiso-gold/10 px-3 py-1 pb-1.5 text-sm font-medium text-shamiso-gold-bright">
                        <ShieldCheck className="mr-2 h-4 w-4" /> Legal & Trust
                    </div>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                        Tax & W-8BEN Support
                    </h1>
                    <p className="max-w-2xl text-lg text-white/60">
                        A guide for our global artists to understand US tax withholding, treaty benefits, and how compliance equals faster, larger payouts.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-[1fr_300px]">
                    <div className="space-y-12">
                        
                        {/* Overview */}
                        <section className="rounded-xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm">
                            <h2 className="mb-6 flex items-center text-2xl font-semibold text-white">
                                <Globe className="mr-3 h-6 w-6 text-shamiso-gold" />
                                Why do I need to provide tax information?
                            </h2>
                            <p className="mb-4 text-white/70 leading-relaxed">
                                As a global distributor with operations reaching U.S.-based streaming platforms (like Spotify, Apple Music, and YouTube), Shamiso Music Distribution is required by the U.S. Internal Revenue Service (IRS) to identify the tax residency of all royalty recipients.
                            </p>
                            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-5 mt-6">
                                <h3 className="mb-2 font-medium text-red-400 flex items-center">
                                    <AlertTriangle className="mr-2 h-5 w-5" />
                                    Without a valid tax form on file:
                                </h3>
                                <ul className="ml-7 list-disc space-y-2 text-red-200/80">
                                    <li><strong>Mandatory Withholding:</strong> We are legally required to withhold 30% of your U.S.-sourced royalties (royalties generated from listeners within the USA).</li>
                                    <li><strong>Payment Holds:</strong> Your payouts may be delayed until documentation is verified.</li>
                                </ul>
                            </div>
                            <p className="mt-4 text-xs text-white/40 italic">Note: Income earned from listeners outside the USA (e.g., South Africa, UK) is generally not subject to US withholding tax.</p>
                        </section>

                        {/* Which Form Should I Use? */}
                        <section>
                            <h2 className="mb-6 text-2xl font-semibold text-white">Which Form Should I Use?</h2>
                            <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/10 bg-black/40">
                                            <th className="p-4 font-medium text-white/60">If you are...</th>
                                            <th className="p-4 font-medium text-white/60">Use This Form</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10 text-white/80">
                                        <tr>
                                            <td className="p-4">An Individual artist or producer (Non-U.S. Resident)</td>
                                            <td className="p-4 font-mono text-shamiso-gold-bright">W-8BEN</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">A Business Entity (Record Label, LLC, or Publishing Co.)</td>
                                            <td className="p-4 font-mono text-shamiso-gold-bright">W-8BEN-E</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">A U.S. Citizen or U.S.-based Resident Alien</td>
                                            <td className="p-4 font-mono text-shamiso-gold-bright">W-9</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Infographic: Africa-U.S. Tax Treaty Map */}
                        <section>
                            <h2 className="mb-6 text-2xl font-semibold text-white">Africa-U.S. Tax Treaty Benefits</h2>
                            <div className="relative overflow-hidden rounded-xl border border-shamiso-gold/20 bg-linear-to-b from-zinc-900 to-black p-8 text-center shadow-lg shadow-shamiso-gold/5">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <h3 className="relative z-10 mb-2 text-xl font-bold text-shamiso-gold-bright">Maximize Your Global Earnings</h3>
                                <p className="relative z-10 mb-8 text-sm text-white/60">
                                    Depending on your country of residence, you may qualify for a reduced withholding rate.
                                </p>
                                
                                <div className="relative z-10 mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="rounded-lg border border-white/10 bg-zinc-800/50 p-4">
                                        <div className="mb-2 text-3xl font-bold text-white">30%</div>
                                        <div className="text-xs uppercase tracking-wider text-white/60">Default Rate</div>
                                        <div className="mt-2 text-xs text-white/40">No Treaty / Form Pending</div>
                                    </div>
                                    <div className="rounded-lg border border-shamiso-gold/30 bg-shamiso-gold/10 p-4 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-1 text-xs font-bold text-shamiso-gold">SA</div>
                                        <div className="mb-2 text-3xl font-bold text-shamiso-gold-bright">0%</div>
                                        <div className="text-xs uppercase tracking-wider text-white/60">South Africa</div>
                                        <div className="mt-2 text-xs text-shamiso-gold/60">Verified Article 12(1)</div>
                                    </div>
                                    <div className="rounded-lg border border-white/10 bg-zinc-800/50 p-4">
                                        <div className="mb-2 text-3xl font-bold text-white">Variable</div>
                                        <div className="text-xs uppercase tracking-wider text-white/60">Other African Nations</div>
                                        <div className="mt-2 text-xs text-white/40">Check Local Matrix</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* The Master Checklist */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold text-white">Your W-8BEN-E Preparation Checklist</h2>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5">
                                    <h4 className="text-shamiso-gold-bright font-bold text-xs uppercase mb-3 px-2 py-1 rounded-sm bg-shamiso-gold/10 inline-block">Phase 1: Essentials</h4>
                                    <ul className="text-xs text-white/60 space-y-2">
                                        <li>[ ] <strong>Legal Name:</strong> Exactly as it appears on CIPC.</li>
                                        <li>[ ] <strong>Line 5:</strong> Select "Active NFFE" (for Labels).</li>
                                        <li>[ ] <strong>Foreign TIN:</strong> Your SARS Income Tax Ref Number.</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5">
                                    <h4 className="text-shamiso-gold-bright font-bold text-xs uppercase mb-3 px-2 py-1 rounded-sm bg-shamiso-gold/10 inline-block">Phase 2: Treaty Claim</h4>
                                    <ul className="text-xs text-white/60 space-y-2">
                                        <li>[ ] <strong>Article 12(1):</strong> Specify musical royalties.</li>
                                        <li>[ ] <strong>Rate:</strong> Claim the 0% withholding rate.</li>
                                        <li>[ ] <strong>Line 14b:</strong> "Ownership and base erosion test".</li>
                                    </ul>
                                </div>
                                <div className="rounded-xl border border-white/5 bg-zinc-900/40 p-5">
                                    <h4 className="text-shamiso-gold-bright font-bold text-xs uppercase mb-3 px-2 py-1 rounded-sm bg-shamiso-gold/10 inline-block">Phase 3: Finalize</h4>
                                    <ul className="text-xs text-white/60 space-y-2">
                                        <li>[ ] <strong>Sign:</strong> Authorized Director signature.</li>
                                        <li>[ ] <strong>Date:</strong> US Format (MM-DD-YYYY).</li>
                                        <li>[ ] <strong>Letter:</strong> Submit <i>Letter of Instruction</i> to US Partner.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Step-by-Step */}
                        <section>
                            <h2 className="mb-6 flex items-center text-2xl font-semibold text-white">
                                <FileText className="mr-3 h-6 w-6 text-shamiso-gold" />
                                Line 15: Special Rates & Conditions
                            </h2>
                            <p className="mb-6 text-white/70">To ensure Shamiso music royalties are exempt from US tax at the source, use the following precise legal terminology in Line 15:</p>
                            
                            <div className="rounded-xl border border-shamiso-gold/20 bg-black p-6 space-y-4 font-mono text-xs">
                                <div>
                                    <span className="text-shamiso-gold">Article and Paragraph:</span>
                                    <div className="mt-1 text-white bg-zinc-900 p-2 rounded">Article 12, Paragraph 1</div>
                                </div>
                                <div>
                                    <span className="text-shamiso-gold">Rate of Withholding:</span>
                                    <div className="mt-1 text-white bg-zinc-900 p-2 rounded">0%</div>
                                </div>
                                <div>
                                    <span className="text-shamiso-gold">Type of Income:</span>
                                    <div className="mt-1 text-white bg-zinc-900 p-2 rounded">Royalties (Copyrights for Musical Work)</div>
                                </div>
                                <div>
                                    <span className="text-shamiso-gold">Explanation:</span>
                                    <div className="mt-1 text-white bg-zinc-900 p-2 rounded leading-relaxed">
                                        The beneficial owner is a resident of South Africa and the income consists of royalties derived from the use of, or the right to use, copyrights of musical work. Under Article 12(1) of the US-South Africa Income Tax Treaty, such royalties are taxable only in the state of residence (South Africa).
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* FAQ and Errors */}
                        <section className="grid gap-8 md:grid-cols-2">
                            <div>
                                <h3 className="mb-4 text-xl font-semibold text-white">Common Errors (The "Checklist")</h3>
                                <ul className="space-y-3 text-sm text-white/70">
                                    <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold/70 mt-0.5" /> <strong>Signatures:</strong> Forms must be signed and dated. Electronic signatures are only valid if they meet IRS "Electronic Signature" standards (provided through our secure portal).</li>
                                    <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold/70 mt-0.5" /> <strong>Consistency:</strong> The name on your tax form must match the name on your Shamiso payment profile and bank account.</li>
                                    <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold/70 mt-0.5" /> <strong>Expiration:</strong> W-8 forms are generally valid for three years. We will notify you 90 days before your form expires to submit a fresh one.</li>
                                    <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold/70 mt-0.5" /> <strong>Address Mismatch:</strong> If your mailing address is in a different country than your tax residency, you may be asked to provide a "Letter of Explanation" or a formal Certificate of Residency.</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 text-xl font-semibold text-white">Year-End Reporting (1042-S)</h3>
                                <div className="rounded-lg border border-white/10 bg-zinc-900 p-5">
                                    <p className="mb-3 text-sm text-white/70">
                                        Every year by March 15th, Shamiso will provide you with IRS Form 1042-S.
                                    </p>
                                    <ul className="mb-4 ml-5 list-disc space-y-1 text-sm text-white/60">
                                        <li>This document summarizes your US-sourced earnings and any tax withheld.</li>
                                        <li><strong>South African Residents:</strong> You are taxed on your worldwide income by SARS. However, you can use the 1042-S to claim a <strong>Section 6quat credit</strong> in South Africa to prevent being taxed twice on the same money.</li>
                                    </ul>
                                    <Button variant="outline" size="sm" className="w-full border-shamiso-gold/30 text-shamiso-gold hover:bg-shamiso-gold/10">
                                        <DownloadCloud className="mr-2 h-4 w-4" /> Download Sample
                                    </Button>
                                </div>
                            </div>
                        </section>
                        
                        <section className="rounded-xl bg-zinc-900 p-8 text-center border border-white/5">
                            <h2 className="mb-4 text-2xl font-bold text-white">Ready to Secure Your Payouts?</h2>
                            <p className="mb-6 mx-auto max-w-lg text-white/60">Head over to your artist dashboard to view your Wealth Meter and securely submit your documentation via our fully automated flow.</p>
                            <Link href="/dashboard/tax">
                                <Button className="bg-shamiso-gold text-black hover:bg-shamiso-gold-bright px-8">
                                    Go To Tax Dashboard
                                </Button>
                            </Link>
                        </section>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="sticky top-28 rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm">
                            <h3 className="mb-4 flex items-center text-lg font-semibold text-white">
                                <Info className="mr-2 h-5 w-5 text-shamiso-gold" />
                                FAQ
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="mb-2 text-sm font-semibold text-white">"My country doesn't have a treaty with the U.S. Do I still need to fill this out?"</h4>
                                    <p className="text-xs text-white/60 leading-relaxed">Yes. Even without a treaty, the W-8BEN establishes that you are a non-U.S. person, which prevents you from being subject to additional U.S. "backup withholding" and ensures you receive your 1042-S correctly.</p>
                                </div>
                                <div>
                                    <h4 className="mb-2 text-sm font-semibold text-white">"Do I still need to pay tax in South Africa if the US rate is 0%?"</h4>
                                    <p className="text-xs text-white/60 leading-relaxed">Yes. Shamiso Music Distribution is a South African resident entity. As such, you are liable for tax on your worldwide income. The treaty simply ensures you aren't taxed by the US and SARS on the same royalties.</p>
                                </div>
                                <div>
                                    <h4 className="mb-2 text-sm font-semibold text-white">"Can Shamiso help me fill out my form?"</h4>
                                    <p className="text-xs text-white/60 leading-relaxed">While we provide these specific guides for the SA-US corridor, we recommend consulting a local tax professional to ensure your W-8BEN-E matches your registered company structure.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
