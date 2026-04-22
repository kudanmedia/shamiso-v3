import { useEffect, useState } from "react";
import Script from "next/script";
import { account } from "@/lib/appwrite";


export function SongToolsWidget() {
    const [jwt, setJwt] = useState<string | null>(null);
    const [isLoadingJwt, setIsLoadingJwt] = useState(true);

    useEffect(() => {
        const fetchJwt = async () => {
            try {
                // Generate a temporary Appwrite JWT to authenticate this request on the server
                const appwriteJwtResponse = await account.createJWT();
                const appwriteJwt = appwriteJwtResponse.jwt;

                const response = await fetch("/api/songtools/jwt", {
                    headers: {
                        "x-appwrite-jwt": appwriteJwt
                    }
                });
                const data = await response.json();

                if (data.jwt) {
                    setJwt(data.jwt);
                }
            } catch (error) {
                console.error("Error fetching Song Tools JWT:", error);
            } finally {
                setIsLoadingJwt(false);
            }
        };

        fetchJwt();

        const handleMessage = (e: MessageEvent) => {
            if (typeof (window as any).processParentEvent === "function") {
                (window as any).processParentEvent(e);
            }
        };

        window.addEventListener("message", handleMessage);
        
        (window as any).processParentEvent = (e: any) => {
            console.log("Song Tools Message received:", e.data);
        };

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const iframeSrc = `https://widgets.songtools.io/v1/CampaignTestX?app-key=5C61EF6E5D714CB083C4329C77580B81&autodetect=1${jwt ? `&jwt=${jwt}` : ""}`;

    return (
        <div className="w-full mt-12 bg-zinc-950/50 rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Fan Data Analytics 
                <span className="text-xs font-medium uppercase tracking-widest text-shamiso-gold-bright bg-shamiso-gold/10 px-2 py-1 rounded">
                    Powered by Song Tools
                </span>
            </h2>
            
            <Script 
                src="https://amplifiedpro.songtools.io/js/wixgetcontent.js?v=1738787616" 
                strategy="lazyOnload"
            />
            <Script 
                src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6706d724bb0e4c6b5a5c849b" 
                strategy="lazyOnload"
            />

            <div className="w-full relative overflow-hidden rounded-xl bg-transparent" style={{ minHeight: "1200px" }}>
                {isLoadingJwt ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/20 backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-8 h-8 border-4 border-shamiso-gold border-t-transparent rounded-full animate-spin" />
                            <p className="text-zinc-400 text-sm animate-pulse">Authenticating with Song Tools...</p>
                        </div>
                    </div>
                ) : (
                    <iframe 
                        id="iframeWidget" 
                        title="SongToolsWidget"
                        frameBorder="0" 
                        scrolling="no" 
                        width="100%" 
                        height="1200" 
                        src={iframeSrc} 
                        style={{
                            backgroundColor: "transparent",
                            height: "1200px",
                            border: "0px",
                            margin: "0",
                            padding: "0",
                            overflow: "hidden"
                        }}
                        allow="clipboard-write"
                    />
                )}
            </div>
        </div>
    );
}
