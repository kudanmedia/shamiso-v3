"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ArrowRight, Shield, CheckCircle2 } from "lucide-react";

export function FundingForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        artistName: "",
        email: "",
        spotifyUrl: "",
        monthlyRevenue: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (value: string) => {
        setFormData({ ...formData, monthlyRevenue: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to submit lead");
            }

            setIsSuccess(true);
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "https://www.beatbread.com/offers/shamus";
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <Card className="border-shamiso-gold/30 bg-shamiso-surface/50 backdrop-blur-xl text-center p-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 border border-green-500/30">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Qualification Successful!</h3>
                <p className="text-neutral-400 mb-8">
                    Your details have been registered. You are now being redirected to beatBread to complete your application.
                </p>
                <div className="flex items-center justify-center gap-2 text-shamiso-gold-bright animate-pulse">
                    <span className="text-sm font-bold uppercase tracking-widest">Redirecting...</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="border-shamiso-gold/20 bg-shamiso-surface/50 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-linear-to-br from-shamiso-gold/5 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <CardHeader className="relative">
                <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-shamiso-gold-bright" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-shamiso-gold-bright/60">Lead Capture Gateway</span>
                </div>
                <CardTitle className="text-2xl font-black uppercase text-white">Pre-Qualify Now</CardTitle>
                <CardDescription className="text-neutral-400">Complete this 30-second form to activate your application.</CardDescription>
            </CardHeader>
            
            <CardContent className="relative">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="artistName" className="text-white">Artist / Label Name</Label>
                        <Input
                            id="artistName"
                            name="artistName"
                            placeholder="Enter Name"
                            required
                            value={formData.artistName}
                            onChange={handleChange}
                            className="bg-black/50 border-zinc-800 focus:border-shamiso-gold text-white h-12"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Work Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-black/50 border-zinc-800 focus:border-shamiso-gold text-white h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="spotifyUrl" className="text-white">Spotify Artist Profile URL</Label>
                        <Input
                            id="spotifyUrl"
                            name="spotifyUrl"
                            placeholder="https://open.spotify.com/artist/..."
                            required
                            type="url"
                            value={formData.spotifyUrl}
                            onChange={handleChange}
                            className="bg-black/50 border-zinc-800 focus:border-shamiso-gold text-white h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-white">Avg. Monthly Streaming Revenue</Label>
                        <Select onValueChange={handleSelectChange} required>
                            <SelectTrigger className="bg-black/50 border-zinc-800 focus:border-shamiso-gold text-white h-12">
                                <SelectValue placeholder="Select Revenue Range" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                <SelectItem value="$100-$500">$100 – $500</SelectItem>
                                <SelectItem value="$500-$2k">$500 – $2,000</SelectItem>
                                <SelectItem value="$2k+">$2,000+</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {error && (
                        <p className="text-xs text-red-500 font-medium bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-linear-to-r from-shamiso-gold to-shamiso-gold-bright text-black font-black uppercase tracking-widest text-sm shadow-xl shadow-shamiso-gold/20 hover:shadow-shamiso-gold/40 hover:brightness-110 transition-all group"
                    >
                        <Sparkles className="mr-2 h-4 w-4" />
                        {isLoading ? "Validating..." : "Apply Now via beatBread"}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <p className="text-[10px] text-center text-neutral-500 uppercase tracking-widest leading-relaxed">
                        By clicking apply, you agree to our data processing terms. Your data is used exclusively for funding qualification.
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
