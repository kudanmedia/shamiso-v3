const { Client, Databases, Storage, ID, Permission, Role } = require('node-appwrite');

// Use environment variables from .env
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '69b7d2fc0023faf8fc46')
    .setKey(process.env.APPWRITE_API_KEY || ''); 

const databases = new Databases(client);
const storage = new Storage(client);
const databaseId = process.env.DATABASE_ID || '69b7fdaa001b7da3d224';

async function waitForAttribute(databaseId, collectionId, attributeKey) {
    console.log(`Waiting for attribute ${attributeKey} to be available...`);
    let available = false;
    while (!available) {
        const attribute = await databases.getAttribute(databaseId, collectionId, attributeKey);
        if (attribute.status === 'available') {
            available = true;
        } else if (attribute.status === 'failed') {
            throw new Error(`Attribute ${attributeKey} failed creation`);
        } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

async function setup() {
    console.log('Starting Infrastructure Setup...');

    try {
        // 1. Profiles Collection
        console.log('Creating Profiles Collection...');
        try { 
            await databases.createCollection(databaseId, 'profiles', 'Profiles', [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]); 
        } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'profiles', 'appwrite_user_id', 36, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'profiles', 'phone_number', 20, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'profiles', 'too_lost_email', 255, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'profiles', 'verto_payout_currency', 3, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'profiles', 'verto_payout_method', 50, true); } catch (e) {}
        
        await waitForAttribute(databaseId, 'profiles', 'too_lost_email');
        try { await databases.createIndex(databaseId, 'profiles', 'idx_too_lost_email', 'key', ['too_lost_email']); } catch (e) {}
        console.log('Profiles Created.');

        // 2. Royalty Batches
        console.log('Creating Royalty Batches Collection...');
        try { 
            await databases.createCollection(databaseId, 'royalty_batches', 'Royalty Batches', [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]); 
        } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'royalty_batches', 'batch_name', 255, true); } catch (e) {}
        try { await databases.createDatetimeAttribute(databaseId, 'royalty_batches', 'reporting_date', true); } catch (e) {}
        try { await databases.createIntegerAttribute(databaseId, 'royalty_batches', 'total_rows', true); } catch (e) {}
        try { await databases.createEnumAttribute(databaseId, 'royalty_batches', 'status', ['processing', 'ready_for_review', 'completed'], true); } catch (e) {}
        console.log('Royalty Batches Created.');

        // 3. Ledger Entries
        console.log('Creating Ledger Entries Collection...');
        try { 
            await databases.createCollection(databaseId, 'ledger_entries', 'Ledger Entries', [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]); 
        } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'ledger_entries', 'batch_id', 36, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'ledger_entries', 'too_lost_email', 255, true); } catch (e) {}
        try { await databases.createIntegerAttribute(databaseId, 'ledger_entries', 'total_cents', true); } catch (e) {}
        try { await databases.createBooleanAttribute(databaseId, 'ledger_entries', 'is_matched_in_appwrite', true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'ledger_entries', 'appwrite_user_id', 36, false); } catch (e) {}
        try { await databases.createEnumAttribute(databaseId, 'ledger_entries', 'status', ['pending', 'paid', 'escrow_invited'], true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'ledger_entries', 'idempotency_hash', 64, true); } catch (e) {}
        
        await waitForAttribute(databaseId, 'ledger_entries', 'batch_id');
        try { await databases.createIndex(databaseId, 'ledger_entries', 'idx_batch_id', 'key', ['batch_id']); } catch (e) {}
        
        await waitForAttribute(databaseId, 'ledger_entries', 'idempotency_hash');
        try { await databases.createIndex(databaseId, 'ledger_entries', 'idx_idempotency', 'unique', ['idempotency_hash']); } catch (e) {}
        console.log('Ledger Entries Created.');

        // 4. Storage Bucket
        console.log('Creating Royalty_CSVs Bucket...');
        try { 
            await storage.createBucket(
                'royalty_csvs', 
                'Royalty CSVs', 
                [
                    Permission.read(Role.any()),
                    Permission.create(Role.users()),
                    Permission.update(Role.users()),
                    Permission.delete(Role.users())
                ],
                false // fileSecurity
            ); 
        } catch (e) {
            console.log('Bucket already exists or creation failed:', e.message);
        }
        console.log('Bucket Setup Check Done.');

        console.log('Infrastructure Setup Complete!');
    } catch (error) {
        console.error('Setup failed:', error.message);
    }
}

setup();
