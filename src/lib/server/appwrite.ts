import { Client, Account, Databases, Users, ID, Query } from "node-appwrite";
import { cookies } from "next/headers";

export { ID, Query };

export async function createSessionClient(jwt?: string) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

    if (jwt) {
        client.setJWT(jwt);
    } else {
        const sessionName = "a_session_" + process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!.toLowerCase();
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
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_API_KEY!);

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
