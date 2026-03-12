"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { account } from "@/lib/appwrite";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu, User, LogOut, LayoutDashboard, Fingerprint } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const genreLinks = [
    { label: "Lekompo", href: "/distribute-lekompo" },
    { label: "3-Step", href: "/distribute-3-step" },
    { label: "Maskandi", href: "/distribute-maskandi" },
    { label: "Afro House", href: "/distribute-afro-house" },
    { label: "Amapiano", href: "/distribute-amapiano" },
];

const navLinks = [
    { label: "About Us", href: "/about" },
    { label: "Promoting Music", href: "/promote-music" },
    { label: "Funding", href: "https://shamisomusic.chordcash.com" },
    { label: "Pricing", href: "/pricing" },

];

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
                setUser(session);
            } catch (error) {
                setUser(null);
            }
        };
        checkSession();
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
            router.push("/");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-shamiso-gold/10 bg-black/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src="/SiteLogo.svg"
                        alt="Shamiso Music Distribution"
                        width={160}
                        height={38}
                        priority
                        className="h-8 w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 lg:flex">
                    {/* Distribute Music Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white hover:bg-white/5"
                            >
                                Strategic Genres
                                <ChevronDown className="h-3.5 w-3.5" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="start"
                            className="border-shamiso-gold/15 bg-shamiso-surface"
                        >
                            {genreLinks.map((link) => (
                                <DropdownMenuItem key={link.label} asChild>
                                    <Link
                                        href={link.href}
                                        className="cursor-pointer text-muted-foreground hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white hover:bg-white/5"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTAs */}
                <div className="hidden items-center gap-3 lg:flex">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-white hover:text-shamiso-gold-bright hover:bg-white/5">
                                    <User className="mr-2 h-4 w-4" />
                                    {user.name}
                                    <ChevronDown className="ml-2 h-3 w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 border-zinc-800 bg-zinc-900 text-white">
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard" className="cursor-pointer hover:bg-zinc-800 hover:text-shamiso-gold-bright">
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:bg-red-950/20 hover:text-red-400">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <a href="https://portal.shamiso-music.com/login">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-shamiso-gold/30 text-muted-foreground transition-all hover:border-shamiso-gold-bright hover:text-shamiso-gold-bright"
                                >
                                    Log in
                                </Button>
                            </a>
                            <a href="https://portal.shamiso-music.com/signup">
                                <Button
                                    size="sm"
                                    className="bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright font-semibold text-black shadow-lg shadow-shamiso-gold/20 transition-all hover:shadow-shamiso-gold/40 hover:brightness-110"
                                >
                                    <Fingerprint className="mr-2 h-4 w-4" />
                                    Sign on
                                </Button>
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile menu */}
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild className="lg:hidden">
                        <Button variant="ghost" size="icon" className="text-white">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-80 border-shamiso-gold/10 bg-black"
                    >
                        <nav className="mt-8 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                    className="rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="px-4 py-2">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-shamiso-gold-bright">
                                    STRATEGIC GENRES
                                </p>
                                {genreLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="block rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-white"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-4 flex flex-col gap-3 px-4">
                                {user ? (
                                    <>
                                        <div className="px-2 py-2 text-sm text-white/60">
                                            Signed in as <span className="text-white font-medium">{user.name}</span>
                                        </div>
                                        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                                            <Button className="w-full bg-zinc-800 text-white hover:bg-zinc-700">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                handleLogout();
                                                setMobileOpen(false);
                                            }}
                                            variant="outline"
                                            className="w-full border-red-900/30 text-red-500 hover:bg-red-950/20"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <a href="https://portal.shamiso-music.com/login" onClick={() => setMobileOpen(false)}>
                                            <Button
                                                variant="outline"
                                                className="w-full border-shamiso-gold/30 text-muted-foreground"
                                            >
                                                Log in
                                            </Button>
                                        </a>
                                        <a href="https://portal.shamiso-music.com/signup" onClick={() => setMobileOpen(false)}>
                                            <Button className="w-full bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright font-semibold text-black">
                                                <Fingerprint className="mr-2 h-4 w-4" />
                                                Sign on
                                            </Button>
                                        </a>
                                    </>
                                )}
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
