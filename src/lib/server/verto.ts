export const VERTO_BASE_URL = "https://api-v3-sandbox.vertofx.com";

export interface VertoLoginResponse {
    token: string;
    expiresIn?: number;
}

export async function loginToVerto() {
    const clientId = process.env.VETRO_CLIENTID;
    const apiKey = process.env.VETRO_APIKEY;

    if (!clientId || !apiKey) {
        throw new Error("Vetro Client ID or API Key not found in environment variables");
    }

    const response = await fetch(`${VERTO_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            clientId: clientId,
            apiKey: apiKey,
            mode: "apiKey",
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Verto login failed with status ${response.status}`);
    }

    const data = await response.json();
    return data as VertoLoginResponse;
}

export async function getVertoWallets(token: string) {
    const response = await fetch(`${VERTO_BASE_URL}/profile/v2.1/wallets?customPageSize=50&page=1`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch Verto wallets with status ${response.status}`);
    }

    const data = await response.json();
    // Return the wallets array from the response data
    return data.data || [];
}

export interface VertoBeneficiaryRequest {
    beneficiaryEntityType: "company" | "individual";
    beneficiaryFirstName?: string;
    beneficiaryLastName?: string;
    beneficiaryCompanyName?: string;
    currency: string;
    beneficiaryCountryCode: string;
    accountNumber: string;
    nationalId: string;
    country: string;
    clientReference?: string;
}

export async function createVertoBeneficiary(token: string, beneficiary: VertoBeneficiaryRequest) {
    console.log("Verto Request [POST Beneficiary]:", JSON.stringify(beneficiary, null, 2));
    const response = await fetch(`${VERTO_BASE_URL}/profile/v2.1/beneficiaries`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(beneficiary),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Verto Error [POST Beneficiary]:", JSON.stringify(errorData, null, 2));
        throw new Error(errorData.message || `Failed to create Verto beneficiary with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Verto Response [POST Beneficiary]:", JSON.stringify(data, null, 2));
    return data;
}

export async function updateVertoBeneficiary(token: string, beneficiaryId: string | number, beneficiary: VertoBeneficiaryRequest) {
    console.log(`Verto Request [PUT Beneficiary ${beneficiaryId}]:`, JSON.stringify(beneficiary, null, 2));
    const response = await fetch(`${VERTO_BASE_URL}/profile/v2.1/beneficiaries/${beneficiaryId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(beneficiary),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`Verto Error [PUT Beneficiary ${beneficiaryId}]:`, JSON.stringify(errorData, null, 2));
        throw new Error(errorData.message || `Failed to update Verto beneficiary with status ${response.status}`);
    }

    const data = await response.json();
    console.log(`Verto Response [PUT Beneficiary ${beneficiaryId}]:`, JSON.stringify(data, null, 2));
    return data;
}

export async function getVertoBeneficiaries(token: string, pageSize = 50, page = 1) {
    const response = await fetch(`${VERTO_BASE_URL}/profile/v2.1/beneficiaries?customPageSize=${pageSize}&page=${page}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch Verto beneficiaries with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function getVertoBeneficiaryById(token: string, beneficiaryId: string | number) {
    const response = await fetch(`${VERTO_BASE_URL}/profile/v2.1/beneficiaries/${beneficiaryId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch Verto beneficiary ${beneficiaryId} with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const VERTO_EXCHANGE_URL = "https://api-exchange-now-sandbox.vertofx.com";

export async function getVertoPurposeCodes(token: string) {
    const response = await fetch(`${VERTO_BASE_URL}/profile/v2.1/purpose?purpose=true`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch purpose codes with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function getVertoFxRate(token: string, currencyFrom: string, currencyTo: string) {
    console.log(`Fetching FX Rate: ${currencyFrom} -> ${currencyTo}`);
    const response = await fetch(`${VERTO_EXCHANGE_URL}/fx/rate`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            paymentMode: "immediate",
            currencyFrom: { currencyName: currencyFrom },
            currencyTo: { currencyName: currencyTo }
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Verto FX Rate Error:", JSON.stringify(errorData, null, 2));
        throw new Error(errorData.message || `Failed to fetch FX rate with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function executeVertoPayment(token: string, payload: any) {
    console.log("Executing Verto Payment:", JSON.stringify(payload, null, 2));
    const response = await fetch(`${VERTO_EXCHANGE_URL}/fx/payments`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Verto Payment Error:", JSON.stringify(errorData, null, 2));
        throw new Error(errorData.message || `Failed to execute payment with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function executeDirectPayment(token: string, payload: any) {
    console.log("Executing Verto Direct Payment Request:", JSON.stringify(payload, null, 2));
    const response = await fetch(`${VERTO_BASE_URL}/profile/v2.2/request`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Verto Direct Payment Error:", JSON.stringify(errorData, null, 2));
        throw new Error(errorData.message || `Failed to execute direct payment with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function getPaymentRequests(token: string, pageSize = 50, page = 1, searchQuery?: string) {
    let url = `${VERTO_BASE_URL}/profile/v2.1/request?customPageSize=${pageSize}&page=${page}`;
    if (searchQuery) {
        url += `&searchQuery=${encodeURIComponent(searchQuery)}`;
    }
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Verto Get Payment Requests Error:", JSON.stringify(errorData, null, 2));
        throw new Error(errorData.message || `Failed to fetch payment requests with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function executeWalletConversion(token: string, payload: any) {
    console.log("Executing Verto Wallet FX Conversion:", JSON.stringify(payload, null, 2));
    const response = await fetch(`${VERTO_BASE_URL}/orders/v2.1/fx`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Verto FX Conversion Error:", JSON.stringify(errorData, null, 2));
        throw new Error(errorData.message || `Failed to execute FX conversion with status ${response.status}`);
    }

    const data = await response.json();
    return data;
}
