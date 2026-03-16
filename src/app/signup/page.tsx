"use client";

import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    // useEffect(() => {
    //     // Redirect to the external portal signup
    //     window.location.href = "https://portal.shamiso-music.com/signup";
    // }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        if (!formData.phone.startsWith("+")) {
            setError("Phone number must start with + (e.g., +1234567890)");
            setIsLoading(false);
            return;
        }

        try {
            // 1. Create Account
            await account.create(ID.unique(), formData.email, formData.password, formData.name);

            // 2. Auto Login
            await account.createEmailPasswordSession(formData.email, formData.password);

            // 3. Update Phone Number
            await account.updatePhone(formData.phone, formData.password);

            // 4. Redirect to Onboarding
            router.push("/onboarding");
        } catch (err: any) {
            setError(err.message || "Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0c0a00] via-[#1a1400] to-[#0d0800] -z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-amber-900/10 blur-[100px] -z-10" />

            <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 backdrop-blur-xl text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-white">Create Account</CardTitle>
                    <CardDescription className="text-center text-neutral-400">
                        Join Shamiso Music Distribution
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="bg-zinc-900/50 border-zinc-700 focus:border-shamiso-gold text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-zinc-900/50 border-zinc-700 focus:border-shamiso-gold text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+1234567890"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-zinc-900/50 border-zinc-700 focus:border-shamiso-gold text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-zinc-900/50 border-zinc-700 focus:border-shamiso-gold text-white"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-shamiso-gold-bright text-black hover:bg-shamiso-gold hover:text-black font-bold"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-zinc-800 pt-6">
                    <p className="text-sm text-neutral-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-shamiso-gold-bright hover:underline">
                            Log in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
