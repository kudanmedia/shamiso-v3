"use client";

import { useEffect, useState } from "react";
import { databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save, Loader2 } from "lucide-react";
import { DATABASE_ID } from "@/lib/database-id";
import { SITE_SETTINGS_DEFAULTS, type SiteSettingKey } from "@/lib/site-settings";

const COLLECTION_ID = "site_settings";

type SettingRow = {
    $id?: string;
    key: SiteSettingKey;
    value: string;
    category: "url" | "integration" | "metric";
    updated_at?: string;
};

const SETTING_LABELS: Record<SiteSettingKey, string> = {
    whatsapp_invite_url: "WhatsApp Invite URL",
    songtools_widget_campaign: "Song Tools Campaign ID",
    songtools_app_key: "Song Tools App Key",
    songtools_widget_base_url: "Song Tools Widget Base URL",
    songtools_script_url: "Song Tools Script URL",
    songtools_jquery_url: "Song Tools jQuery Script URL",
    hero_recaptured_amount: "Hero Recaptured Amount",
};

const SETTING_CATEGORIES: Record<SiteSettingKey, SettingRow["category"]> = {
    whatsapp_invite_url: "url",
    songtools_widget_campaign: "integration",
    songtools_app_key: "integration",
    songtools_widget_base_url: "integration",
    songtools_script_url: "integration",
    songtools_jquery_url: "integration",
    hero_recaptured_amount: "metric",
};

export default function AdminSettingsPage() {
    const [rows, setRows] = useState<SettingRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                    Query.limit(200),
                ]);

                const docs = response.documents as unknown as SettingRow[];
                const fromDb = new Map(docs.map((doc) => [doc.key, doc]));
                const merged: SettingRow[] = (Object.keys(SITE_SETTINGS_DEFAULTS) as SiteSettingKey[]).map((key) => {
                    const existing = fromDb.get(key);
                    return {
                        $id: existing?.$id,
                        key,
                        value: existing?.value || SITE_SETTINGS_DEFAULTS[key],
                        category: existing?.category || SETTING_CATEGORIES[key],
                        updated_at: existing?.updated_at,
                    };
                });
                setRows(merged);
            } catch {
                setRows(
                    (Object.keys(SITE_SETTINGS_DEFAULTS) as SiteSettingKey[]).map((key) => ({
                        key,
                        value: SITE_SETTINGS_DEFAULTS[key],
                        category: SETTING_CATEGORIES[key],
                    }))
                );
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const updateRow = (index: number, patch: Partial<SettingRow>) => {
        setRows((current) => current.map((row, i) => (i === index ? { ...row, ...patch } : row)));
    };

    const saveAll = async () => {
        setIsSaving(true);
        setMessage("");
        try {
            for (const row of rows) {
                const payload = {
                    key: row.key,
                    value: row.value,
                    category: row.category,
                    updated_at: new Date().toISOString(),
                };
                if (row.$id) {
                    await databases.updateDocument(DATABASE_ID, COLLECTION_ID, row.$id, payload);
                } else {
                    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), payload);
                }
            }
            setMessage("Site settings saved.");
        } catch (error: any) {
            setMessage(error.message || "Failed to save site settings.");
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
                        <h1 className="text-3xl font-black uppercase">Site Settings</h1>
                        <p className="text-zinc-400 mt-1">Manage operational URLs and integration config used across the platform.</p>
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
                        <CardTitle>Operational Config</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Changes write to Appwrite `site_settings` and override static fallbacks. Song Tools app key can also be set via `SONGTOOLS_APP_KEY` env var.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {rows.map((row, index) => (
                            <div key={row.key} className="rounded-xl border border-zinc-800 p-4 bg-black/20 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-white">{SETTING_LABELS[row.key]}</p>
                                        <Badge className="mt-1 uppercase tracking-widest text-[10px] bg-shamiso-gold/10 text-shamiso-gold-bright border border-shamiso-gold/30">
                                            {row.key}
                                        </Badge>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] uppercase text-zinc-500 border-zinc-700">
                                        {row.category}
                                    </Badge>
                                </div>

                                <Input
                                    value={row.value}
                                    onChange={(e) => updateRow(index, { value: e.target.value })}
                                    placeholder="https://..."
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
