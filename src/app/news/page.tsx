import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Metadata } from "next";
import { getNewsArticles } from "@/lib/server/news";

export const metadata: Metadata = {
    title: "News & Insights | Shamiso Music",
    description: "Stay updated with the latest trends, corporate announcements, and strategic insights from Shamiso Music Group.",
};

export default async function NewsPage() {
    const articles = await getNewsArticles();

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

                {articles.length === 0 ? (
                    <div className="text-center py-20 space-y-4">
                        <Newspaper className="w-12 h-12 mx-auto text-zinc-600" />
                        <p className="text-neutral-500 text-lg">No articles published yet. Check back soon.</p>
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
