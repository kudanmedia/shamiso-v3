const { Client, Databases } = require('node-appwrite');

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '69b7d2fc0023faf8fc46')
    .setKey(process.env.APPWRITE_API_KEY || ''); 

const databases = new Databases(client);
const databaseId = '69b7fdaa001b7da3d224';

async function checkData() {
    try {
        console.log('Checking Royalty Batches...');
        const batches = await databases.listDocuments(databaseId, 'royalty_batches');
        console.log(`Found ${batches.total} batches.`);
        batches.documents.forEach(b => console.log(`- ${b.batch_name} (${b.status})`));

        console.log('\nChecking Ledger Entries...');
        const ledger = await databases.listDocuments(databaseId, 'ledger_entries');
        console.log(`Found ${ledger.total} ledger entries.`);

        console.log('\nChecking Collection Permissions...');
        const batchesColl = await databases.getCollection(databaseId, 'royalty_batches');
        console.log('Royalty Batches Permissions:', JSON.stringify(batchesColl.permissions));
        
        const ledgerColl = await databases.getCollection(databaseId, 'ledger_entries');
        console.log('Ledger Entries Permissions:', JSON.stringify(ledgerColl.permissions));

    } catch (error) {
        console.error('Error checking data:', error.message);
    }
}

checkData();
