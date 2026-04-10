"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PartnerRedirect({ partnerUrl }: { partnerUrl: string }) {
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [wasBlocked, setWasBlocked] = useState(false);

    useEffect(() => {
        const checkAuthAndRedirect = async () => {
            try {
                // If they are logged in, this succeeds
                await account.get();
                setIsRedirecting(true);
                
                // Attempt to open in a new tab
                const newWindow = window.open(partnerUrl, "_blank");
                
                if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
                    // Browser blocked the popup
                    setWasBlocked(true);
                } else {
                    // Success! Redirect the current tab back to dashboard so they aren't stuck here
                    window.location.href = "/dashboard";
                }
            } catch (error) {
                // User not logged in, stay on the marketing page
                setIsRedirecting(false);
            }
        };
        checkAuthAndRedirect();
    }, [partnerUrl]);

    if (isRedirecting) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
                <div className="text-center max-w-sm px-6">
                    {!wasBlocked ? (
                        <>
                            <Loader2 className="w-12 h-12 text-shamiso-gold-bright animate-spin mx-auto mb-4" />
                            <p className="text-shamiso-gold-bright font-bold uppercase tracking-widest text-sm">
                                Opening partner portal in a new tab...
                            </p>
                        </>
                    ) : (
                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-shamiso-gold/10 border border-shamiso-gold/20">
                                <p className="text-shamiso-gold-bright font-bold uppercase tracking-widest text-sm mb-4">
                                    Automatic redirect blocked
                                </p>
                                <Button 
                                    onClick={() => {
                                        window.open(partnerUrl, "_blank");
                                        window.location.href = "/dashboard";
                                    }}
                                    className="w-full bg-shamiso-gold hover:bg-shamiso-gold-bright text-black font-black uppercase tracking-widest"
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Launch Partner Portal
                                </Button>
                            </div>
                            <p className="text-neutral-500 text-xs uppercase tracking-widest">
                                Please allow pop-ups for this site to enable automatic redirects.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}
