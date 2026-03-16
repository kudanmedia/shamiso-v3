"use client";

import { AdminGuard } from "@/components/admin/admin-guard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminGuard>
            <div className="min-h-screen bg-[#050505] selection:bg-shamiso-gold selection:text-black">
                {/* Optional: Add Admin Sidebar/Nav here */}
                <main className="pt-24">{children}</main>
            </div>
        </AdminGuard>
    );
}
