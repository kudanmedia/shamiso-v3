const { Client, Databases } = require('node-appwrite');
const { endpoint, projectId, apiKey, databaseId } = require('./appwrite-env');

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

const databases = new Databases(client);

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
