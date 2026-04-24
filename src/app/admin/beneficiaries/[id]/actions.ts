"use server";

import { loginToVerto, getVertoBeneficiaryById } from "@/lib/server/verto";

export async function fetchVertoBeneficiaryDetailAction(beneficiaryId: string | number) {
    try {
        const auth = await loginToVerto();
        if (!auth.token) {
            throw new Error("No token received from Verto");
        }

        const result = await getVertoBeneficiaryById(auth.token, beneficiaryId);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Fetch Beneficiary Detail Error:", error);
        return { success: false, error: error.message || "Failed to fetch beneficiary details" };
    }
}

import { getVertoPurposeCodes, getVertoFxRate, executeVertoPayment, getVertoWallets, executeDirectPayment, getPaymentRequests, executeWalletConversion } from "@/lib/server/verto";

export async function fetchWalletsAction() {
    try {
        const auth = await loginToVerto();
        if (!auth.token) throw new Error("No token");
        const result = await getVertoWallets(auth.token);
        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function fetchPurposeCodesAction() {
    try {
        const auth = await loginToVerto();
        if (!auth.token) throw new Error("No token");
        const result = await getVertoPurposeCodes(auth.token);
        return { success: true, data: result.data || result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function fetchFxRateAction(currencyFrom: string, currencyTo: string) {
    try {
        const auth = await loginToVerto();
        if (!auth.token) throw new Error("No token");
        const result = await getVertoFxRate(auth.token, currencyFrom, currencyTo);
        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function executePaymentAction(payload: any) {
    try {
        const auth = await loginToVerto();
        if (!auth.token) throw new Error("No token");
        const result = await executeVertoPayment(auth.token, payload);
        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function executeDirectPaymentAction(payload: any) {
    try {
        const auth = await loginToVerto();
        if (!auth.token) throw new Error("No token");
        const result = await executeDirectPayment(auth.token, payload);
        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function fetchPaymentRequestsAction(searchQuery?: string) {
    try {
        const auth = await loginToVerto();
        if (!auth.token) throw new Error("No token");
        const result = await getPaymentRequests(auth.token, 50, 1, searchQuery);
        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function executeWalletConversionAction(payload: any) {
    try {
        const auth = await loginToVerto();
        if (!auth.token) throw new Error("No token");
        const result = await executeWalletConversion(auth.token, payload);
        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
