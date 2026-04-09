"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Loader2 } from "lucide-react";

export function PartnerRedirect({ partnerUrl }: { partnerUrl: string }) {
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        const checkAuthAndRedirect = async () => {
            try {
                // If they are logged in, this succeeds
                await account.get();
                setIsRedirecting(true);
                window.location.href = partnerUrl;
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
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-shamiso-gold-bright animate-spin mx-auto mb-4" />
                    <p className="text-shamiso-gold-bright font-bold uppercase tracking-widest text-sm">
                        Redirecting to partner app...
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
