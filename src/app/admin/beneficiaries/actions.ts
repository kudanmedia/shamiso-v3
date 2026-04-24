"use server";

import { loginToVerto, getVertoBeneficiaries } from "@/lib/server/verto";

export async function fetchVertoBeneficiariesAction(pageSize = 50, page = 1) {
    try {
        const auth = await loginToVerto();
        if (!auth.token) {
            throw new Error("No token received from Verto");
        }

        const result = await getVertoBeneficiaries(auth.token, pageSize, page);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Fetch Beneficiaries Error:", error);
        return { success: false, error: error.message || "Failed to fetch beneficiaries" };
    }
}
