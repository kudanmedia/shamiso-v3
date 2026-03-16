const { Client, Databases, Permission, Role } = require('node-appwrite');

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '69b7d2fc0023faf8fc46')
    .setKey(process.env.APPWRITE_API_KEY || ''); 

const databases = new Databases(client);
const databaseId = '69b7fdaa001b7da3d224';

async function fixPermissions() {
    const collections = ['profiles', 'royalty_batches', 'ledger_entries'];
    
    for (const collId of collections) {
        try {
            console.log(`Updating permissions for ${collId}...`);
            await databases.updateCollection(
                databaseId, 
                collId, 
                undefined, // name
                [
                    Permission.read(Role.users()),
                    Permission.create(Role.users()),
                    Permission.update(Role.users()),
                    Permission.delete(Role.users())
                ]
            );
            console.log(`Successfully updated ${collId}.`);
        } catch (error) {
            console.error(`Failed to update ${collId}:`, error.message);
        }
    }
}

fixPermissions();
