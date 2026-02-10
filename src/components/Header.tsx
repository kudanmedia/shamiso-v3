"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Menu } from "lucide-react";

const genreLinks = [
    { label: "Lekompo", href: "/distribute-lekompo" },
    { label: "3-Step", href: "/distribute-3-step" },
    { label: "Maskandi", href: "/distribute-maskandi" },
    { label: "Afro House", href: "/distribute-lekompo#afro-house" },
];

const navLinks = [
    { label: "Promote Music", href: "#partners" },
    { label: "Funding", href: "#funding" },
    { label: "Pricing", href: "#pricing" },
];

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

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
                                Distribute Music
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
                            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-white hover:bg-white/5"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTAs */}
                <div className="hidden items-center gap-3 lg:flex">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-shamiso-gold/30 text-muted-foreground transition-all hover:border-shamiso-gold-bright hover:text-shamiso-gold-bright"
                    >
                        Login
                    </Button>
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-shamiso-gold to-shamiso-gold-bright font-semibold text-black shadow-lg shadow-shamiso-gold/20 transition-all hover:shadow-shamiso-gold/40 hover:brightness-110"
                    >
                        Join Shamiso
                    </Button>
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
                                    className="rounded-md px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="px-4 py-2">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-shamiso-gold-bright">
                                    Specialized Distribution
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
                                <Button
                                    variant="outline"
                                    className="w-full border-shamiso-gold/30 text-muted-foreground"
                                >
                                    Login
                                </Button>
                                <Button className="w-full bg-gradient-to-r from-shamiso-gold to-shamiso-gold-bright font-semibold text-black">
                                    Join Shamiso
                                </Button>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
