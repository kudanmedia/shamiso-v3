"use server";

import { loginToVerto, getVertoWallets } from "@/lib/server/verto";

export async function fetchVertoWalletsAction() {
    try {
        const auth = await loginToVerto();
        if (!auth.token) {
            throw new Error("No token received from Verto");
        }

        const wallets = await getVertoWallets(auth.token);
        return { success: true, data: wallets };
    } catch (error: any) {
        console.error("Verto API Error:", error);
        return { success: false, error: error.message || "Failed to fetch wallets" };
    }
}
