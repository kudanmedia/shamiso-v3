"use client";

import { useState, useEffect } from "react";
import { databases, storage } from "@/lib/appwrite";
import { Query, ID } from "appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2, Pencil, Trash2, Globe, Eye, Newspaper, X } from "lucide-react";
import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminNewsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [articles, setArticles] = useState<any[]>([]);
    const [error, setError] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<any>(null);

    const databaseId = '69b7fdaa001b7da3d224';
    const newsCollectionId = 'news_articles';

    const fetchArticles = async () => {
        setIsLoading(true);
        try {
            const response = await databases.listDocuments(databaseId, newsCollectionId, [
                Query.orderDesc('published_at')
            ]);
            setArticles(response.documents);
        } catch (err: any) {
            console.error("Failed to fetch articles:", err);
            setError(err.message || "Failed to load news articles. Ensure the 'news_articles' collection exists.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleSaveArticle = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            title: formData.get("title") as string,
            summary: formData.get("summary") as string,
            content: formData.get("content") as string,
            category: formData.get("category") as string,
            image_url: formData.get("image_url") as string,
            published_at: formData.get("published_at") as string || new Date().toISOString(),
        };

        try {
            if (editingArticle) {
                await databases.updateDocument(databaseId, newsCollectionId, editingArticle.$id, data);
            } else {
                await databases.createDocument(databaseId, newsCollectionId, ID.unique(), data);
            }
            setIsSheetOpen(false);
            setEditingArticle(null);
            fetchArticles();
        } catch (err: any) {
            setError(err.message || "Failed to save article.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteArticle = async (id: string) => {
        if (!confirm("Are you sure you want to delete this article?")) return;

        try {
            await databases.deleteDocument(databaseId, newsCollectionId, id);
            fetchArticles();
        } catch (err: any) {
            setError(err.message || "Failed to delete article.");
        }
    };

    const openEditSheet = (article: any) => {
        setEditingArticle(article);
        setIsSheetOpen(true);
    };

    const openCreateSheet = () => {
        setEditingArticle(null);
        setIsSheetOpen(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-shamiso-gold" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8">
            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                <div className="flex items-center justify-between font-black uppercase tracking-tight">
                    <div>
                        <h1 className="text-4xl font-black">News Management</h1>
                        <p className="text-zinc-400 mt-2 font-normal normal-case">Create and publish strategic insights for the African creative economy.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            className="bg-shamiso-gold-bright text-black font-black hover:bg-shamiso-gold"
                            onClick={openCreateSheet}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create Article
                        </Button>
                    </div>
                </div>

                {error && (
                    <Card className="bg-red-900/10 border-red-900/30 text-red-400 p-4">
                        <p className="text-sm">{error}</p>
                    </Card>
                )}

                <Card className="bg-zinc-900/40 border-zinc-800 text-white">
                    <CardHeader>
                        <CardTitle>All Articles</CardTitle>
                        <CardDescription className="text-zinc-500">Manage your published and draft news content.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader className="bg-zinc-900/20 uppercase text-xs font-black">
                                <TableRow className="hover:bg-transparent border-zinc-800">
                                    <TableHead>Title</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Published At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center py-12 text-zinc-500 italic">
                                            No articles found. Create your first one to get started.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    articles.map((article) => (
                                        <TableRow key={article.$id} className="border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                                            <TableCell className="font-bold max-w-md truncate">{article.title}</TableCell>
                                            <TableCell>
                                                <Badge className="bg-shamiso-gold/10 text-shamiso-gold-bright border-shamiso-gold/20 font-black uppercase text-[10px] tracking-widest">
                                                    {article.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-zinc-400 text-sm">
                                                {new Date(article.published_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-zinc-400 hover:text-white"
                                                        onClick={() => openEditSheet(article)}
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-400"
                                                        onClick={() => handleDeleteArticle(article.$id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                    <Link href="/news" target="_blank">
                                                        <Button variant="ghost" size="icon" className="text-shamiso-gold">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Sheet for Creating/Editing */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetContent side="right" className="bg-zinc-950 border-zinc-800 text-white sm:max-w-xl w-full overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-black uppercase text-shamiso-gold-bright">{editingArticle ? "Edit Article" : "Create New Article"}</SheetTitle>
                            <SheetDescription className="text-zinc-500 font-normal"> Fill in the details below to publish your insight to the news feed.</SheetDescription>
                        </SheetHeader>
                        <form onSubmit={handleSaveArticle} className="space-y-6 pt-8">
                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-xs font-black uppercase tracking-widest text-zinc-500">Title</Label>
                                    <Input id="title" name="title" defaultValue={editingArticle?.title} placeholder="Article Title" required className="bg-white/5 border-zinc-800 h-12" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category" className="text-xs font-black uppercase tracking-widest text-zinc-500">Category</Label>
                                        <Input id="category" name="category" defaultValue={editingArticle?.category} placeholder="e.g. Corporate" required className="bg-white/5 border-zinc-800 h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="published_at" className="text-xs font-black uppercase tracking-widest text-zinc-500">Publish Date</Label>
                                        <Input id="published_at" name="published_at" type="datetime-local" defaultValue={editingArticle?.published_at ? new Date(editingArticle.published_at).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)} className="bg-white/5 border-zinc-800 h-12" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image_url" className="text-xs font-black uppercase tracking-widest text-zinc-500">Image URL</Label>
                                    <Input id="image_url" name="image_url" defaultValue={editingArticle?.image_url} placeholder="https://images.unsplash.com/..." className="bg-white/5 border-zinc-800 h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="summary" className="text-xs font-black uppercase tracking-widest text-zinc-500">Summary</Label>
                                    <Textarea id="summary" name="summary" defaultValue={editingArticle?.summary} placeholder="Short teaser for the article cards..." className="bg-white/5 border-zinc-800 min-h-[80px]" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="content" className="text-xs font-black uppercase tracking-widest text-zinc-500">Content (Markdown)</Label>
                                    <Textarea id="content" name="content" defaultValue={editingArticle?.content} placeholder="Full article content..." className="bg-white/5 border-zinc-800 min-h-[300px]" />
                                </div>
                            </div>
                            <SheetFooter className="pt-8">
                                <Button type="submit" className="w-full bg-shamiso-gold-bright text-black font-black uppercase h-14" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : editingArticle ? "Save Changes" : "Publish Article"}
                                </Button>
                            </SheetFooter>
                        </form>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
