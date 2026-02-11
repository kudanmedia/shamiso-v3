"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { ExternalLink, Music, DollarSign, Radio, Video, Mic2, BarChart3, Disc, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Partner {
    name: string;
    category: "Distribution" | "Funding" | "Promotion" | "Marketing";
    description: string;
    href: string;
    logo?: string;
    icon?: any;
    metadata?: string;
}

const partners: Partner[] = [
    {
        name: "Too Lost",
        category: "Distribution",
        description: "Manage your distribution, analytics, and royalties.",
        href: "https://portal.shamiso-music.com",
        logo: "/logo.png",
    },
    {
        name: "beatBread",
        category: "Funding",
        description: "Get non-dilutive funding for your music career.",
        href: "https://shamisomusic.chordcash.com/",
        logo: "/beatbread.svg",
    },
    {
        name: "Groover",
        category: "Promotion",
        description: "Promote your music to blogs, radios, and labels.",
        href: "https://www.groover.co/en/?utm_source=Indirect&utm_medium=partner&utm_campaign=shamiso_music",
        logo: "/Groover_Logo_Main_White.png",
        metadata: "10% OFF Code: SHAMISOGROOVERVIP",
    },
    {
        name: "Rotor Videos",
        category: "Promotion",
        description: "Create professional music videos in minutes.",
        href: "https://rotorvideos.com/shamiso",
        logo: "/rotor-logo-full-white-4a612660f893ff6eccba4f8e79769d01de704cf49d875e40c57041c9f77b421a.svg",
    },
    {
        name: "SongTools",
        category: "Promotion",
        description: "Automated marketing tools for your releases.",
        href: "https://amplifiedpro.songtools.io/",
        icon: Mic2,
    },
    {
        name: "Feature.fm",
        category: "Marketing",
        description: "Smart links, pre-saves, and music marketing tools.",
        href: "https://feature.fm",
        icon: Radio,
    },
    {
        name: "SymphonyOS",
        category: "Marketing",
        description: "AI-powered marketing automation.",
        href: "#",
        icon: BarChart3,
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
                router.push("/login");
            } finally {
                setIsCheckingSession(false);
            }
        };
        checkSession();
    }, [router]);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            router.push("/login");
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
                <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-900/30 text-red-500 hover:bg-red-950/50 hover:text-red-400 hover:border-red-900 bg-transparent"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </Button>
            </div>

            <div className="mb-12 p-6 border rounded-xl border-zinc-800 bg-zinc-900/40">
                <h2 className="text-lg font-semibold mb-4 text-white">System Connectivity</h2>
                <div className="flex flex-wrap items-center gap-4">
                    <Button
                        onClick={testConnection}
                        disabled={isLoading}
                        variant="outline"
                        className="bg-transparent border-zinc-700 hover:bg-zinc-800 hover:text-white"
                    >
                        {isLoading ? "Ping Appwrite..." : "Test Connection"}
                    </Button>
                    {status && (
                        <span className={`text-sm font-medium ${status.startsWith("Success") ? "text-green-500" : "text-red-500"}`}>
                            {status}
                        </span>
                    )}
                </div>
            </div>

            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Your Apps</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {partners.map((partner) => (
                        <Link
                            key={partner.name}
                            href={partner.href}
                            target="_blank"
                            className="group relative flex flex-col p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-shamiso-gold/50 transition-all duration-300"
                        >
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
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
