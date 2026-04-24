"use server";

import { loginToVerto, createVertoBeneficiary, updateVertoBeneficiary, VertoBeneficiaryRequest } from "@/lib/server/verto";

export async function createVertoBeneficiaryAction(beneficiary: VertoBeneficiaryRequest) {
    console.log("Triggering createVertoBeneficiaryAction...");
    try {
        const auth = await loginToVerto();
        if (!auth.token) {
            throw new Error("No token received from Verto");
        }

        const result = await createVertoBeneficiary(auth.token, beneficiary);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Verto Beneficiary Action Error:", error);
        return { success: false, error: error.message || "Failed to create beneficiary" };
    }
}

export async function updateVertoBeneficiaryAction(beneficiaryId: string | number, beneficiary: VertoBeneficiaryRequest) {
    console.log(`Triggering updateVertoBeneficiaryAction for ID: ${beneficiaryId}...`);
    try {
        const auth = await loginToVerto();
        if (!auth.token) {
            throw new Error("No token received from Verto");
        }

        const result = await updateVertoBeneficiary(auth.token, beneficiaryId, beneficiary);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Verto Beneficiary Update Action Error:", error);
        return { success: false, error: error.message || "Failed to update beneficiary" };
    }
}
