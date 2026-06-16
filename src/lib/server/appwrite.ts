import { Client, Account, Databases, Users, ID, Query } from "node-appwrite";
import { cookies } from "next/headers";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "@/lib/appwrite-config";

export { ID, Query };

function getApiKey() {
    const key = process.env.APPWRITE_API_KEY;
    if (!key) {
        throw new Error("Missing required environment variable: APPWRITE_API_KEY");
    }
    return key;
}

export async function createSessionClient(jwt?: string) {
    const client = new Client()
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID);

    if (jwt) {
        client.setJWT(jwt);
    } else {
        const sessionName = "a_session_" + APPWRITE_PROJECT_ID.toLowerCase();
        const session = (await cookies()).get(sessionName);

        if (!session || !session.value) {
            throw new Error("No session");
        }

        client.setSession(session.value);
    }

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
    };
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)
        .setKey(getApiKey());

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get users() {
            return new Users(client);
        },
    };
}
