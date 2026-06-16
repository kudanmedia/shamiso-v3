const { Client, Databases, Permission, Role } = require('node-appwrite');
const { endpoint, projectId, apiKey, databaseId } = require('./appwrite-env');

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);

async function fixPermissions() {
    const collections = ['profiles', 'royalty_batches', 'ledger_entries'];
    
    for (const collId of collections) {
        try {
            console.log(`Updating permissions for ${collId}...`);
            await databases.updateCollection(
                databaseId, 
                collId, 
                undefined,
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
