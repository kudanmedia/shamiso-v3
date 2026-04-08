"use client";

import { FileText, Mail, CheckCircle2, AlertTriangle, Code, ShieldCheck, DownloadCloud } from "lucide-react";

export default function AdminTaxCRMPage() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="mb-3 inline-flex items-center rounded-full border border-shamiso-gold/30 bg-shamiso-gold/10 px-3 py-1 pb-1.5 text-xs font-semibold uppercase tracking-wider text-shamiso-gold-bright">
                        <ShieldCheck className="mr-2 h-4 w-4" /> Legal & Trust Administration
                    </div>
                    <h1 className="text-3xl font-bold text-white">Tax CRM & Automation</h1>
                    <p className="mt-2 max-w-3xl text-sm text-white/60">
                        Manage automated W-8BEN compliance workflows, review trigger events, and manage automated email communications.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    
                    {/* Left Column: Developer / Technical Checklists */}
                    <div className="space-y-6 lg:col-span-1">
                        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                            <h2 className="mb-4 flex items-center text-lg font-bold text-white">
                                <Code className="mr-2 h-5 w-5 text-shamiso-gold" />
                                W-8BEN Automation Logic
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">1. Workflow Triggers</h3>
                                    <ul className="mt-2 space-y-2 text-sm text-white/80">
                                        <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold mt-0.5" /> Triggered during onboarding or when lifetime earnings &gt; $50.</li>
                                        <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold mt-0.5" /> <code className="rounded bg-black/50 px-1 py-0.5 text-xs text-shamiso-gold-bright">User_Country == "South Africa"</code> triggers Tax Treaty Workflow.</li>
                                    </ul>
                                </div>
                                <hr className="border-white/10" />
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">2. TaxBandits/Track1099 API</h3>
                                    <ul className="mt-2 space-y-2 text-sm text-white/80">
                                        <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold mt-0.5" /> Pre-population of Part I (Name, Address).</li>
                                        <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold mt-0.5" /> Electronic Signature meets IRS standard.</li>
                                    </ul>
                                </div>
                                <hr className="border-white/10" />
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">3. Treaty Logic (Part II)</h3>
                                    <ul className="mt-2 space-y-2 text-sm text-white/80">
                                        <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold mt-0.5" /> Line 9: Auto-selects "South Africa"</li>
                                        <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold mt-0.5" /> Line 10: Article 12(1), Rate: 0% (Copyrights).</li>
                                        <li className="flex items-start"><CheckCircle2 className="mr-2 h-4 w-4 shrink-0 text-shamiso-gold mt-0.5" /> Mandatory Explanation: Verify Article 12 citing.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6">
                            <h2 className="mb-4 text-lg font-bold text-white flex items-center">
                                <AlertTriangle className="mr-2 h-5 w-5 text-shamiso-gold" />
                                Launch Checklist
                            </h2>
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 text-sm text-white/70">
                                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-shamiso-gold focus:ring-shamiso-gold" />
                                    <span>Run 5 test submissions (SA Mock Data) to ensure treaty benefits reflect in PDF output.</span>
                                </label>
                                <label className="flex items-start gap-3 text-sm text-white/70">
                                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-shamiso-gold focus:ring-shamiso-gold" />
                                    <span>Verify PDFs are stored in encrypted S3 bucket (AES-256).</span>
                                </label>
                                <label className="flex items-start gap-3 text-sm text-white/70">
                                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-shamiso-gold focus:ring-shamiso-gold" />
                                    <span>Implement TIN string format validation prior to payout cycle.</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Email Templates */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <h2 className="flex items-center text-xl font-bold text-white">
                                <Mail className="mr-2 h-6 w-6 text-shamiso-gold" />
                                Automated Communication Templates
                            </h2>
                            <button className="flex items-center text-xs text-shamiso-gold hover:text-white transition-colors">
                                <DownloadCloud className="mr-1 h-4 w-4" /> Export All
                            </button>
                        </div>
                        
                        {/* Template 1 */}
                        <div className="rounded-xl border border-red-500/20 bg-black p-0 shadow-lg overflow-hidden">
                            <div className="border-b border-white/10 bg-zinc-900 px-6 py-4">
                                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/40">Template 1</div>
                                <h3 className="text-base font-medium text-white flex justify-between">
                                    Action Required: Tax Documentation Declined
                                    <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">Trigger: Form Validation Failed</span>
                                </h3>
                            </div>
                            <div className="p-6 text-sm text-white/70 space-y-4">
                                <div><strong className="text-white/90">Subject:</strong> Action Required: Your Tax Documentation for [Artist/Label Name] was Declined</div>
                                
                                <p>Dear [Artist/Label Name],</p>
                                <p>Our Legal & Trust team has reviewed your submitted tax documentation (Form W-8BEN/W-8BEN-E) and unfortunately, we are unable to verify it at this time.</p>
                                
                                <p><strong className="text-white/90">Reason for Rejection:</strong></p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>[ ] Name Mismatch: The name on your tax form does not match your Shamiso account profile.</li>
                                    <li>[ ] Invalid Address: The IRS does not permit P.O. Boxes for residency verification.</li>
                                    <li>[ ] Missing Signature.</li>
                                    <li>[ ] Incorrect Treaty Claim.</li>
                                    <li>[ ] Expired Form.</li>
                                </ul>

                                <p><strong className="text-white/90">Why this matters:</strong> To comply with U.S. IRS regulations, we must have a valid form on file. Until this is resolved, a 30% mandatory withholding tax will be applied to your U.S.-source royalties, and your next payout may be delayed.</p>
                                
                                <p><strong className="text-white/90">How to fix this:</strong></p>
                                <ol className="list-decimal pl-5 space-y-1">
                                    <li>Log in to your Shamiso Artist Dashboard.</li>
                                    <li>Navigate to Settings &gt; Tax & Payouts.</li>
                                    <li>Review our Tax Support Guide and submit a corrected form.</li>
                                </ol>
                                
                                <p>Best regards,<br/>Shamiso Legal & Trust Department</p>
                            </div>
                        </div>

                        {/* Template 2 */}
                        <div className="rounded-xl border border-shamiso-gold/30 bg-black p-0 shadow-lg overflow-hidden">
                            <div className="border-b border-white/10 bg-zinc-900 px-6 py-4">
                                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/40">Template 2</div>
                                <h3 className="text-base font-medium text-white flex justify-between">
                                    Urgent: Form Expiration Warning
                                    <span className="text-xs text-shamiso-gold bg-shamiso-gold/10 px-2 py-1 rounded">Trigger: 90 Days Pre-Expiration</span>
                                </h3>
                            </div>
                            <div className="p-6 text-sm text-white/70 space-y-4">
                                <div><strong className="text-white/90">Subject:</strong> Urgent: Your Tax Status with Shamiso is Expiring Soon</div>
                                
                                <p>Dear [Artist/Label Name],</p>
                                <p>We are writing to notify you that your current tax documentation (Form W-8BEN/W-8BEN-E) on file with Shamiso Music Distribution is set to expire in 90 days. The IRS requires that these forms be refreshed every three years to ensure your tax residency and treaty eligibility remain accurate.</p>
                                
                                <p><strong className="text-white/90">What you need to do:</strong> Please submit an updated tax form through your dashboard by [Insert Date - 90 Days from Now].</p>
                                
                                <p><strong className="text-white/90">What happens if you don't update?</strong> If a valid form is not received by the expiration date, your account status will revert to "Non-Compliant." This will result in:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Automatic 30% withholding on all U.S. royalties.</li>
                                    <li>Ineligibility for tax treaty benefits (e.g., the 0% rate for South African residents).</li>
                                </ul>

                                <div className="my-4 text-center">
                                    <button className="bg-white text-black px-6 py-2 rounded-md font-semibold text-sm">Update My Tax Form Now</button>
                                </div>
                                
                                <p>Thank you for helping us keep your account compliant and your payouts seamless.</p>
                                <p>Best regards,<br/>The Shamiso Music Distribution Team</p>
                            </div>
                        </div>
                        {/* Template 3: Letter of Instruction */}
                        <div className="rounded-xl border border-white/10 bg-zinc-900/30 p-0 shadow-lg overflow-hidden">
                            <div className="border-b border-white/10 bg-zinc-900 px-6 py-4">
                                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/40">Template 3</div>
                                <h3 className="text-base font-medium text-white flex justify-between">
                                    Letter of Instruction for US Partners
                                    <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">Internal Legal Template</span>
                                </h3>
                            </div>
                            <div className="p-6 text-[11px] font-mono text-white/60 space-y-4 bg-black/40">
                                <p>Date: [Current Date]<br/>To: Too Lost Enterprise – Accounting/Tax Compliance Department<br/>From: [Entity Name]<br/>Subject: Submission of Form W-8BEN-E and Treaty Claim</p>
                                
                                <p>To whom it may concern,</p>
                                <p>Please find attached the completed Form W-8BEN-E for our entity, [Entity Name], a company duly incorporated and tax-resident in South Africa.</p>
                                
                                <p><strong>Summary of Treaty Claim:</strong> Pursuant to the United States-South Africa Income Tax Treaty, we are claiming a 0% withholding rate on all US-sourced royalties under Article 12 (Royalties).</p>
                                
                                <p><strong>Reasoning:</strong> The beneficial owner is a resident of South Africa and the income consists of royalties derived from the use of, or the right to use, copyrights of musical work. According to the treaty, such royalties are taxable only in the state of residence (South Africa).</p>
                                
                                <p>We kindly request that you update our account records to reflect this 0% withholding rate effective immediately.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
