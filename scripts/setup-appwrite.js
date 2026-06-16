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

        // 5. API Cache
        console.log('Creating API Cache Collection...');
        try {
            await databases.createCollection(databaseId, 'api_cache', 'API Cache', [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]);
        } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'api_cache', 'cache_key', 255, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'api_cache', 'payload', 65535, true); } catch (e) {}
        try { await databases.createDatetimeAttribute(databaseId, 'api_cache', 'expires_at', true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'api_cache', 'partner', 50, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'api_cache', 'user_id', 64, true); } catch (e) {}
        await waitForAttribute(databaseId, 'api_cache', 'cache_key');
        try { await databases.createIndex(databaseId, 'api_cache', 'idx_api_cache_key', 'key', ['cache_key']); } catch (e) {}
        console.log('API Cache Collection ready.');

        // 6. Partner Links
        console.log('Creating Partner Links Collection...');
        try {
            await databases.createCollection(databaseId, 'partner_links', 'Partner Links', [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]);
        } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'partner_links', 'slug', 50, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'partner_links', 'url', 1000, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'partner_links', 'utm_params', 500, false); } catch (e) {}
        try { await databases.createBooleanAttribute(databaseId, 'partner_links', 'active', true); } catch (e) {}
        try { await databases.createDatetimeAttribute(databaseId, 'partner_links', 'updated_at', true); } catch (e) {}
        await waitForAttribute(databaseId, 'partner_links', 'slug');
        try { await databases.createIndex(databaseId, 'partner_links', 'idx_partner_slug', 'unique', ['slug']); } catch (e) {}
        console.log('Partner Links Collection ready.');

        // 7. Feature.fm Campaigns (seed-backed fallback)
        console.log('Creating Feature.fm Campaigns Collection...');
        try {
            await databases.createCollection(databaseId, 'featurefm_campaigns', 'Feature.fm Campaigns', [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]);
        } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'featurefm_campaigns', 'external_id', 100, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'featurefm_campaigns', 'user_id', 64, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'featurefm_campaigns', 'name', 255, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'featurefm_campaigns', 'status', 40, true); } catch (e) {}
        try { await databases.createDatetimeAttribute(databaseId, 'featurefm_campaigns', 'starts_at', false); } catch (e) {}
        await waitForAttribute(databaseId, 'featurefm_campaigns', 'external_id');
        try { await databases.createIndex(databaseId, 'featurefm_campaigns', 'idx_ffm_campaign_external', 'unique', ['external_id']); } catch (e) {}
        try { await databases.createIndex(databaseId, 'featurefm_campaigns', 'idx_ffm_campaign_user', 'key', ['user_id']); } catch (e) {}
        console.log('Feature.fm Campaigns Collection ready.');

        // 8. Feature.fm Smart Links (seed-backed fallback)
        console.log('Creating Feature.fm Smart Links Collection...');
        try {
            await databases.createCollection(databaseId, 'featurefm_smartlinks', 'Feature.fm Smart Links', [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]);
        } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'featurefm_smartlinks', 'external_id', 100, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'featurefm_smartlinks', 'user_id', 64, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'featurefm_smartlinks', 'title', 255, true); } catch (e) {}
        try { await databases.createIntegerAttribute(databaseId, 'featurefm_smartlinks', 'clicks', true); } catch (e) {}
        try { await databases.createIntegerAttribute(databaseId, 'featurefm_smartlinks', 'pre_saves', true); } catch (e) {}
        await waitForAttribute(databaseId, 'featurefm_smartlinks', 'external_id');
        try { await databases.createIndex(databaseId, 'featurefm_smartlinks', 'idx_ffm_smart_external', 'unique', ['external_id']); } catch (e) {}
        try { await databases.createIndex(databaseId, 'featurefm_smartlinks', 'idx_ffm_smart_user', 'key', ['user_id']); } catch (e) {}
        console.log('Feature.fm Smart Links Collection ready.');

        // 9. RoEx Jobs (seed-backed fallback)
        console.log('Creating RoEx Jobs Collection...');
        try {
            await databases.createCollection(databaseId, 'roex_jobs', 'RoEx Jobs', [
                Permission.read(Role.users()),
                Permission.create(Role.users()),
                Permission.update(Role.users()),
                Permission.delete(Role.users())
            ]);
        } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'roex_jobs', 'external_id', 100, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'roex_jobs', 'user_id', 64, true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'roex_jobs', 'track_name', 255, true); } catch (e) {}
        try { await databases.createEnumAttribute(databaseId, 'roex_jobs', 'status', ['queued', 'processing', 'complete', 'failed'], true); } catch (e) {}
        try { await databases.createIntegerAttribute(databaseId, 'roex_jobs', 'progress', true); } catch (e) {}
        try { await databases.createDatetimeAttribute(databaseId, 'roex_jobs', 'updated_at', true); } catch (e) {}
        try { await databases.createStringAttribute(databaseId, 'roex_jobs', 'output_url', 1000, false); } catch (e) {}
        await waitForAttribute(databaseId, 'roex_jobs', 'external_id');
        try { await databases.createIndex(databaseId, 'roex_jobs', 'idx_roex_external', 'unique', ['external_id']); } catch (e) {}
        try { await databases.createIndex(databaseId, 'roex_jobs', 'idx_roex_user', 'key', ['user_id']); } catch (e) {}
        console.log('RoEx Jobs Collection ready.');

        console.log('Infrastructure Setup Complete!');
    } catch (error) {
        console.error('Setup failed:', error.message);
    }
}

setup();
