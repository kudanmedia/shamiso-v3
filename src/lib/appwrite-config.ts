function requireEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const APPWRITE_ENDPOINT = requireEnv(
    "NEXT_PUBLIC_APPWRITE_ENDPOINT",
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
);

export const APPWRITE_PROJECT_ID = requireEnv(
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
);

/** Database ID — use NEXT_PUBLIC_DATABASE_ID for client components, DATABASE_ID on server. */
export const DATABASE_ID = requireEnv(
    "NEXT_PUBLIC_DATABASE_ID or DATABASE_ID",
    process.env.NEXT_PUBLIC_DATABASE_ID || process.env.DATABASE_ID
);
