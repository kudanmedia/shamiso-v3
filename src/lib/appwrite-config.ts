function requireEnv(name: string, value: string | undefined): string {
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

function assertMatchingIds(label: string, a: string | undefined, b: string | undefined) {
    if (a && b && a !== b) {
        throw new Error(`${label} mismatch: ${a} !== ${b}`);
    }
}

assertMatchingIds(
    "DATABASE_ID and NEXT_PUBLIC_DATABASE_ID",
    process.env.DATABASE_ID,
    process.env.NEXT_PUBLIC_DATABASE_ID
);

export const APPWRITE_ENDPOINT = requireEnv(
    "NEXT_PUBLIC_APPWRITE_ENDPOINT",
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
);

export const APPWRITE_PROJECT_ID = requireEnv(
    "NEXT_PUBLIC_APPWRITE_PROJECT_ID",
    process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
);

export const DATABASE_ID = requireEnv(
    "NEXT_PUBLIC_DATABASE_ID or DATABASE_ID",
    process.env.NEXT_PUBLIC_DATABASE_ID || process.env.DATABASE_ID
);

export const ROYALTY_CSV_BUCKET_ID = requireEnv(
    "NEXT_PUBLIC_APPWRITE_ROYALTY_BUCKET_ID",
    process.env.NEXT_PUBLIC_APPWRITE_ROYALTY_BUCKET_ID
);

export const INGEST_CSV_FUNCTION_ID = requireEnv(
    "NEXT_PUBLIC_APPWRITE_INGEST_CSV_FUNCTION_ID",
    process.env.NEXT_PUBLIC_APPWRITE_INGEST_CSV_FUNCTION_ID
);

export const EXECUTE_ADMIN_FUNCTION_ID = requireEnv(
    "NEXT_PUBLIC_APPWRITE_EXECUTE_ADMIN_FUNCTION_ID",
    process.env.NEXT_PUBLIC_APPWRITE_EXECUTE_ADMIN_FUNCTION_ID
);
