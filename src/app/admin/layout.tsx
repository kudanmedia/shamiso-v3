"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, Banknote, ShieldCheck } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Payouts", href: "/admin/payouts", icon: Banknote },
        { name: "News", href: "/admin/news", icon: Newspaper },
    ];

    return (
        <AdminGuard>
            <div className="min-h-screen bg-[#050505] selection:bg-shamiso-gold selection:text-black">
                <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="flex items-center gap-2 text-shamiso-gold-bright font-black uppercase tracking-tighter text-xl">
                            <ShieldCheck className="w-6 h-6" />
                            SMG.ADMIN
                        </Link>
                        <div className="h-8 w-px bg-zinc-800" />
                        <div className="flex items-center gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors ${
                                        pathname === item.href ? "text-shamiso-gold-bright" : "text-zinc-500 hover:text-white"
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
                <main className="pt-24">{children}</main>
            </div>
        </AdminGuard>
    );
}
