import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";
import { getSiteSettings } from "@/lib/server/site-settings";
import * as jose from "jose";

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("x-appwrite-jwt");
        const { account } = await createSessionClient(authHeader || undefined);
        const user = await account.get();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.SONGTOOLS_JWT_SECRET);
        const alg = "HS256";

        const jwt = await new jose.SignJWT({
            email: user.email,
            name: user.name,
        })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setExpirationTime("30d")
            .sign(secret);

        const settings = await getSiteSettings();

        return NextResponse.json({
            jwt,
            widget: {
                campaign: settings.songtools_widget_campaign,
                appKey: settings.songtools_app_key,
                baseUrl: settings.songtools_widget_base_url,
                scriptUrl: settings.songtools_script_url,
                jqueryUrl: settings.songtools_jquery_url,
            },
        });
    } catch (error: any) {
        console.error("JWT Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
    }
}
