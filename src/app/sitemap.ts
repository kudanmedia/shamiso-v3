import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shamiso.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "/",
        "/about",
        "/news",
        "/pricing",
        "/welcome-artist",
        "/whatsapp-group",
        "/services/feature-fm",
        "/services/roex",
        "/services/groover",
        "/services/songtools",
        "/services/funding",
        "/services/mogul",
        "/services/toorly",
        "/services/unhurd",
        "/services/rotor",
        "/services/symphony",
        "/distribute-afrobeats",
        "/distribute-singeli",
        "/distribute-bongoflava",
        "/distribute-kuduro",
        "/distribute-amapiano",
        "/distribute-lekompo",
        "/distribute-afro-house",
        "/distribute-3-step",
        "/distribute-maskandi",
    ];

    const now = new Date();
    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: now,
        changeFrequency: route === "/" ? "daily" : "weekly",
        priority: route === "/" ? 1 : 0.7,
    }));
}
