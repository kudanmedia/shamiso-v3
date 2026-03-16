"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import { Loader2, ShieldAlert } from "lucide-react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [status, setStatus] = useState<"loading" | "authorized" | "unauthorized">("loading");

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const user = await account.get();
                // Check if context labels contain 'admin'
                // In Appwrite, labels are usually in user.labels or accessible via specific checks
                if (user.labels?.includes("admin")) {
                    setStatus("authorized");
                } else {
                    console.warn("User is not authorized as admin.");
                    setStatus("unauthorized");
                    // Redirect after a short delay
                    setTimeout(() => router.push("/dashboard"), 3000);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                router.push("/login");
            }
        };

        checkAdmin();
    }, [router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-shamiso-gold" />
                <p className="text-zinc-500 animate-pulse uppercase tracking-[0.3em] text-xs">Verifying Admin Credentials</p>
            </div>
        );
    }

    if (status === "unauthorized") {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mb-6">
                    <ShieldAlert className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold mb-2 uppercase tracking-tight">Access Denied</h1>
                <p className="text-zinc-400 max-w-md mx-auto mb-8">
                    You do not have the required permissions to access the Shamiso Administrative portals. 
                    Redirecting you back to your artist dashboard...
                </p>
                <div className="w-full max-w-xs h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 animate-[loading-bar_3s_linear]" />
                </div>
                
                <style jsx>{`
                    @keyframes loading-bar {
                        from { width: 0% }
                        to { width: 100% }
                    }
                `}</style>
            </div>
        );
    }

    return <>{children}</>;
}
