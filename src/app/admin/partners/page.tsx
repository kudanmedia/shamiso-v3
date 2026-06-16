"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, Loader2 } from "lucide-react";
import { PARTNER_LINKS } from "@/lib/partner-links";

const DATABASE_ID = "69b7fdaa001b7da3d224";
const COLLECTION_ID = "partner_links";

type PartnerRow = {
    $id?: string;
    slug: string;
    url: string;
    utm_params?: string;
    active: boolean;
    updated_at?: string;
};

export default function AdminPartnersPage() {
    const [rows, setRows] = useState<PartnerRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                    Query.limit(200),
                ]);

                const docs = response.documents as unknown as PartnerRow[];
                const fromDb = new Map(docs.map((doc) => [doc.slug, doc]));
                const merged: PartnerRow[] = Object.entries(PARTNER_LINKS).map(([slug, url]) => {
                    const existing = fromDb.get(slug);
                    return {
                        $id: existing?.$id,
                        slug,
                        url: existing?.url || url,
                        utm_params: existing?.utm_params || "",
                        active: existing?.active ?? true,
                        updated_at: existing?.updated_at,
                    };
                });
                setRows(merged);
            } catch {
                setRows(
                    Object.entries(PARTNER_LINKS).map(([slug, url]) => ({
                        slug,
                        url,
                        active: true,
                        utm_params: "",
                    }))
                );
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const updateRow = (index: number, patch: Partial<PartnerRow>) => {
        setRows((current) => current.map((row, i) => (i === index ? { ...row, ...patch } : row)));
    };

    const saveAll = async () => {
        setIsSaving(true);
        setMessage("");
        try {
            for (const row of rows) {
                const payload = {
                    slug: row.slug,
                    url: row.url,
                    utm_params: row.utm_params || "",
                    active: row.active,
                    updated_at: new Date().toISOString(),
                };
                if (row.$id) {
                    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, row.$id, payload);
                } else {
                    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
                }
            }
            setMessage("Partner links saved.");
        } catch (error: any) {
            setMessage(error.message || "Failed to save partner links.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-6xl mx-auto space-y-6 pb-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black uppercase">Partner Link Management</h1>
                        <p className="text-zinc-400 mt-1">Manage active partner URLs used across the platform.</p>
                    </div>
                    <Button onClick={saveAll} disabled={isSaving} className="bg-shamiso-gold-bright text-black hover:bg-shamiso-gold font-bold uppercase">
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save All
                    </Button>
                </div>

                {message ? (
                    <Card className="bg-zinc-900/40 border-zinc-800">
                        <CardContent className="pt-4 text-sm text-zinc-300">{message}</CardContent>
                    </Card>
                ) : null}

                <Card className="bg-zinc-900/40 border-zinc-800">
                    <CardHeader>
                        <CardTitle>Configured Links</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Changes write to Appwrite `partner_links` and override static fallbacks.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {rows.map((row, index) => (
                            <div key={row.slug} className="rounded-xl border border-zinc-800 p-4 bg-black/20 space-y-3">
                                <div className="flex items-center justify-between">
                                    <Badge className="uppercase tracking-widest text-[10px] bg-shamiso-gold/10 text-shamiso-gold-bright border border-shamiso-gold/30">
                                        {row.slug}
                                    </Badge>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                                        <label htmlFor={`active-${row.slug}`}>Active</label>
                                        <input
                                            id={`active-${row.slug}`}
                                            type="checkbox"
                                            checked={row.active}
                                            onChange={(e) => updateRow(index, { active: e.target.checked })}
                                            className="h-4 w-4 accent-yellow-400"
                                        />
                                    </div>
                                </div>

                                <Input
                                    value={row.url}
                                    onChange={(e) => updateRow(index, { url: e.target.value })}
                                    placeholder="https://..."
                                    className="bg-zinc-950 border-zinc-800"
                                />
                                <Input
                                    value={row.utm_params || ""}
                                    onChange={(e) => updateRow(index, { utm_params: e.target.value })}
                                    placeholder="utm_source=...&utm_medium=..."
                                    className="bg-zinc-950 border-zinc-800"
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
