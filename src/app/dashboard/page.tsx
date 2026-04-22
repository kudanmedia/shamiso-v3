"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { ExternalLink, Music, DollarSign, Radio, Video, Mic2, BarChart3, Disc, LogOut, Settings, User, CreditCard, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PayoutHistory } from "@/components/dashboard/payout-history";
import { PARTNER_LINKS } from "@/lib/partner-links";

interface Partner {
    name: string;
    category: "Distribution" | "Funding" | "Promotion" | "Marketing" | "Production";
    description: string;
    href: string;
    logo?: string;
    icon?: any;
    metadata?: string;
}

const partners: Partner[] = [
    {
        name: "Distribution Portal",
        category: "Distribution",
        description: "Manage your distribution, analytics, and royalties.",
        href: "https://portal.shamiso-music.com",
        icon: Disc,
    },
    {
        name: "Funding & Advances",
        category: "Funding",
        description: "Non-dilutive funding from $1K to $10M+ — Keep your masters",
        href: PARTNER_LINKS.funding,
        icon: DollarSign,
    },
    {
        name: "feature.fm Engine",
        category: "Marketing",
        description: "The industry's leading marketing & ad suite for smart links.",
        href: PARTNER_LINKS.featureFm,
        icon: BarChart3,
    },
    {
        name: "Groover Networking",
        category: "Promotion",
        description: "Direct outreach to top curators and guaranteed professional feedback.",
        href: PARTNER_LINKS.groover,
        icon: Radio,
    },
    {
        name: "Visualizer Lab",
        category: "Promotion",
        description: "Auto-generate music videos, promo clips, and Spotify Canvas visuals.",
        href: "https://rotorvideos.com/shamiso",
        icon: Video,
    },
    {
        name: "Automix by Roex",
        category: "Production",
        description: "Studio-quality AI mastering optimized for streaming.",
        href: PARTNER_LINKS.automix,
        icon: Mic2,
    },
    {
        name: "Mix Check Studio",
        category: "Production",
        description: "AI-powered feedback on your frequency balance and dynamics.",
        href: PARTNER_LINKS.mixCheckStudio,
        icon: Mic2,
    },
    {
        name: "Song Tools Promo",
        category: "Promotion",
        description: "Automated digital ads and algorithmic playlisting.",
        href: "/services/songtools",
        icon: Disc,
    },
    {
        name: "Smartlinks & Pre-Saves",
        category: "Marketing",
        description: "High-performance landing pages for every release.",
        href: PARTNER_LINKS.featureFm,
        icon: Radio,
    },
    {
        name: "Fan Data Analytics",
        category: "Marketing",
        description: "Comprehensive artist growth insights and corridor data intelligence.",
        href: "/dashboard/analytics",
        icon: BarChart3,
    },

    {
        name: "Mogul Wealth & Finance",
        category: "Marketing",
        description: "Automated financial optimization and wealth management for music creators.",
        href: "/services/mogul",
        icon: Shield,
    },
    {
        name: "Toorly for Artists",
        category: "Promotion",
        description: "Seamlessly book and manage global tours across the SSA corridor.",
        href: PARTNER_LINKS.toorly,
        icon: ExternalLink,
    },
    {
        name: "un:hurd music",
        category: "Marketing",
        description: "Automated music promotion and custom marketing pages.",
        href: PARTNER_LINKS.unhurd,
        icon: ExternalLink,
    },
    {
        name: "Wealth/Finance",
        category: "Distribution",
        description: "Claim your 0% withholding rate under Article 12 and keep 30% more of your royalties.",
        href: "/dashboard/tax",
        icon: Shield,
    },
];

export default function DashboardPage() {
    const [status, setStatus] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
                setUser(session);
            } catch (error) {
                console.error("Session check failed", error);
                window.location.href = "/login";
            } finally {
                setIsCheckingSession(false);
            }
        };
        checkSession();
    }, [router]);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const testConnection = async () => {
        setIsLoading(true);
        setStatus("Testing...");
        try {
            await account.get();
            setStatus("Success: Connected and logged in.");
        } catch (error: any) {
            if (error.code === 401) {
                setStatus("Success: Connected to Appwrite (User not logged in).");
            } else {
                setStatus(`Error: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isCheckingSession) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="animate-pulse">Loading Dashboard...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-8 px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-neutral-400">Welcome back, {user.name}</p>
                </div>
                <div className="flex items-center gap-3">
                    {user?.labels?.includes("admin") && (
                        <Link href="/admin/payouts">
                            <Button
                                variant="outline"
                                className="border-shamiso-gold/30 text-shamiso-gold-bright hover:bg-shamiso-gold/10 hover:border-shamiso-gold bg-transparent"
                            >
                                <Shield className="mr-2 h-4 w-4" />
                                Admin Portal
                            </Button>
                        </Link>
                    )}
                    <Link href="/dashboard/profile">
                        <Button
                            variant="outline"
                            className="border-zinc-800 text-white hover:bg-zinc-800 bg-transparent"
                        >
                            <User className="mr-2 h-4 w-4" />
                            Profile Settings
                        </Button>
                    </Link>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="border-red-900/30 text-red-500 hover:bg-red-950/50 hover:text-red-400 hover:border-red-900 bg-transparent"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </Button>
                </div>
            </div>


            <section>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                    <Card className="lg:col-span-1 bg-linear-to-br from-shamiso-gold/20 to-shamiso-gold/5 border-shamiso-gold/20 text-white backdrop-blur-xl group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <DollarSign className="w-16 h-16" />
                        </div>
                        <CardHeader className="pb-2">
                            <CardDescription className="text-shamiso-gold-bright/60 font-bold uppercase tracking-widest text-[10px]">Total Revenue Distributed</CardDescription>
                            <CardTitle className="text-4xl font-black tabular-nums">$0.00</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-xs text-neutral-400">
                                <span className="text-green-500 font-bold">+0%</span>
                                <span>from last month</span>
                            </div>
                        </CardContent>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-shamiso-gold to-transparent" />
                    </Card>

                    <div className="lg:col-span-3">
                        <PayoutHistory />
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Your Apps</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {partners.map((partner) => {
                        const isInternal = partner.href.startsWith('/');
                        const content = (
                            <div className="group relative flex flex-col p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-shamiso-gold/50 transition-all duration-300 h-full">
                                <div className="mb-4 h-12 flex items-center">
                                    {partner.logo ? (
                                        <div className="relative h-10 w-full flex items-center justify-start">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className={`h-full w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity ${partner.name === 'Groover' ? 'scale-125 origin-left' : ''}`}
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-zinc-800 text-shamiso-gold-bright">
                                            {partner.icon && <partner.icon className="h-6 w-6" />}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-2">
                                    <span className="text-xs font-medium uppercase tracking-wider text-shamiso-gold-bright/80">
                                        {partner.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-shamiso-gold-bright transition-colors">
                                    {partner.name}
                                </h3>

                                <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                                    {partner.description}
                                </p>

                                {partner.metadata && (
                                    <div className="mt-auto pt-4 border-t border-zinc-800">
                                        <p className="text-xs font-mono text-shamiso-gold-bright break-all">
                                            {partner.metadata}
                                        </p>
                                    </div>
                                )}

                                <div className="absolute top-6 right-6 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                    <ExternalLink className="h-5 w-5 text-shamiso-gold-bright" />
                                </div>
                            </div>
                        );

                        if (isInternal) {
                            return (
                                <Link key={partner.name} href={partner.href}>
                                    {content}
                                </Link>
                            );
                        }

                        return (
                            <Link
                                key={partner.name}
                                href={partner.href}
                                target="_blank"
                            >
                                {content}
                            </Link>
                        );
                    })}
                </div>

                {/* <Song ToolsWidget /> */}
            </section>


        </div>
    );
}
