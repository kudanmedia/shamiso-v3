"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Newspaper, Loader2 } from "lucide-react";
import Link from "next/link";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";

const INITIAL_ARTICLES = [
    {
        $id: "1",
        title: "Shamiso Music Distribution Finalizes New Pricing Tiers for 2026",
        published_at: "2026-04-01T08:00:00Z",
        category: "Corporate",
        summary: "We are excited to announce our optimized subscription pricing for labels and enterprises, focusing on currency resilience and operational scalability.",
        image_url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop",
    },
    {
        $id: "2",
        title: "Bridging the 'Monetization Gap' for African Creators",
        published_at: "2026-03-25T10:00:00Z",
        category: "Industry",
        summary: "How Shamiso is leveraging hyper-local financial infrastructure and predictive capital to accelerate the velocity of African IP globally.",
        image_url: "https://images.unsplash.com/photo-1514525253361-bee8718a7439?q=80&w=1974&auto=format&fit=crop",
    },
    {
        $id: "3",
        title: "The Evolution of African IP: A 30-Year Heritage of Culture",
        published_at: "2026-03-15T09:00:00Z",
        category: "Heritage",
        summary: "From Highlife to Amapiano, SMG has been the silent engine behind the African musical renaissance for three decades.",
        image_url: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    },
    {
        $id: "4",
        title: "Expanding the Sovereign Multiplier Engine",
        published_at: "2026-03-05T11:00:00Z",
        category: "Technology",
        summary: "Our proprietary valuation engine now includes advanced tax alpha calculations for catalogs with high US streaming exposure.",
        image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    },
];

export default function NewsPage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const databaseId = '69b7fdaa001b7da3d224';
    const newsCollectionId = 'news_articles';

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await databases.listDocuments(databaseId, newsCollectionId, [
                    Query.orderDesc('published_at')
                ]);
                if (response.documents.length > 0) {
                    setArticles(response.documents);
                } else {
                    setArticles(INITIAL_ARTICLES);
                }
            } catch (error) {
                console.error("Failed to fetch articles:", error);
                setArticles(INITIAL_ARTICLES);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, []);

    return (
        <main className="min-h-screen bg-black pt-32 pb-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold/5 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-shamiso-gold-bright/5 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 space-y-4">
                    <Badge variant="outline" className="border-shamiso-gold/30 text-shamiso-gold-bright uppercase tracking-widest font-bold px-4 py-1.5 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                        News & Insights
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tight">
                        Voice of the <span className="gradient-text">Creator Economy</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400">
                        Stay updated with the latest trends, corporate announcements, and strategic insights from Shamiso Music Group.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-shamiso-gold-bright" />
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 animate-in fade-in duration-700">
                        {articles.map((article) => (
                            <Card key={article.$id} className="group relative overflow-hidden border-zinc-800 bg-zinc-900/40 backdrop-blur-xl transition-all duration-500 hover:border-shamiso-gold/40 hover:shadow-2xl hover:shadow-shamiso-gold/10">
                                <div className="aspect-video w-full overflow-hidden">
                                    <img
                                        src={article.image_url}
                                        alt={article.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge className="bg-shamiso-gold/10 text-shamiso-gold-bright border-shamiso-gold/20 uppercase text-[10px] font-black tracking-widest px-3 py-1">
                                            {article.category}
                                        </Badge>
                                        <div className="flex items-center gap-2 text-xs text-neutral-500 font-bold uppercase tracking-tight">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(article.published_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-black text-white uppercase leading-tight mb-4 group-hover:text-shamiso-gold-bright transition-colors tracking-tight">
                                        {article.title}
                                    </h2>
                                    <p className="text-neutral-400 leading-relaxed mb-8 line-clamp-2 text-sm font-light">
                                        {article.summary}
                                    </p>
                                    <Button variant="ghost" className="p-0 h-auto text-shamiso-gold-bright font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all flex items-center">
                                        Read Article <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Newsletter Section */}
                <div className="mt-32 relative rounded-3xl border border-shamiso-gold/20 bg-linear-to-b from-shamiso-gold/10 to-transparent p-12 text-center overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-shamiso-gold/20 blur-[80px]" />
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <div className="mx-auto w-16 h-16 rounded-full bg-shamiso-gold/20 flex items-center justify-center text-shamiso-gold-bright mb-4">
                            <Newspaper className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase">Subscribe to Pulse</h2>
                        <p className="text-neutral-400">Get strategic industry insights and cultural data delivered straight to your inbox monthly.</p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 h-14 px-6 rounded-xl bg-black/40 border border-white/10 text-white focus:border-shamiso-gold-bright outline-none transition-colors"
                            />
                            <Button className="h-14 px-8 bg-shamiso-gold-bright text-black font-black uppercase tracking-tight hover:scale-105 transition-transform">
                                Join Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
