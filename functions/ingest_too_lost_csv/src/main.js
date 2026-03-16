const { Client, Databases, Storage, Query } = require('node-appwrite');
const csv = require('csv-parser');
const Decimal = require('decimal.js');
const { Readable } = require('stream');

module.exports = async ({ req, res, log, error }) => {
    const endpoint = process.env.APPWRITE_FUNCTION_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
    const projectId = process.env.APPWRITE_FUNCTION_PROJECT_ID || '69b7d2fc0023faf8fc46';
    const apiKey = process.env.APPWRITE_FUNCTION_API_KEY;

    if (!apiKey) {
        log('WARNING: APPWRITE_FUNCTION_API_KEY is not set. Database operations may fail.');
    }

    const client = new Client()
        .setEndpoint(endpoint)
        .setProject(projectId);

    if (apiKey) client.setKey(apiKey);

    const databases = new Databases(client);
    const storage = new Storage(client);

    const databaseId = '69b7fdaa001b7da3d224';
    const profilesCollectionId = 'profiles';
    const batchesCollectionId = 'royalty_batches';
    const ledgerCollectionId = 'ledger_entries';
    const bucketId = 'royalty_csvs';

    // Payload can be a string or object depending on how it's triggered
    let payload = {};
    if (typeof req.body === 'string') {
        try {
            payload = JSON.parse(req.body);
        } catch (e) {
            payload = {};
        }
    } else {
        payload = req.body || {};
    }

    const fileId = payload.fileId || req.headers['x-appwrite-event-resource-id'];

    if (!fileId) {
        log('No fileId provided in payload or headers.');
        return res.json({ success: false, message: 'No fileId provided' }, 400);
    }

    try {
        log(`Processing File: ${fileId}`);

        // 1. Download file
        const fileBuffer = await storage.getFileDownload(bucketId, fileId);
        const results = {};
        let reportingDate = '';
        let totalRows = 0;

        // 2. Parse CSV
        const stream = Readable.from(fileBuffer);
        
        await new Promise((resolve, reject) => {
            stream.pipe(csv())
                .on('data', (row) => {
                    totalRows++;
                    const userEmail = row.user; // Ensure this matches CSV header
                    const amountStr = row.total.replace('$', '');
                    const amountDecimal = new Decimal(amountStr);

                    if (!reportingDate && row.reporting_date) {
                        reportingDate = row.reporting_date;
                    }

                    if (!results[userEmail]) {
                        results[userEmail] = new Decimal(0);
                    }
                    results[userEmail] = results[userEmail].plus(amountDecimal);
                })
                .on('end', resolve)
                .on('error', reject);
        });

        log(`Parsed ${totalRows} rows. Aggregated into ${Object.keys(results).length} users.`);

        // 3. Create/Update Batch record
        const batch = await databases.createDocument(databaseId, batchesCollectionId, 'unique()', {
            batch_name: `Batch_${reportingDate || new Date().toISOString()}`,
            reporting_date: reportingDate || new Date().toISOString(),
            total_rows: totalRows,
            status: 'processing'
        });

        // 4. Reconciliation & Ledger Entry creation
        const batchId = batch.$id;
        const emails = Object.keys(results);

        for (const email of emails) {
            const totalCents = results[email].mul(100).toDecimalPlaces(0).toNumber();
            
            // Check if user exists in Profiles
            const profileSearch = await databases.listDocuments(databaseId, profilesCollectionId, [
                Query.equal('too_lost_email', email)
            ]);

            const isMatched = profileSearch.total > 0;
            const appwriteUserId = isMatched ? profileSearch.documents[0].appwrite_user_id : null;

            // Generate Idempotency Hash: SHA256(Ledger_ID + reporting_date + total_cents)
            // Note: Using a simplified version here, in production use crypto
            const idempotencyHash = `${batchId}_${email}_${totalCents}`;

            await databases.createDocument(databaseId, ledgerCollectionId, 'unique()', {
                batch_id: batchId,
                too_lost_email: email,
                total_cents: totalCents,
                is_matched_in_appwrite: isMatched,
                appwrite_user_id: appwriteUserId,
                status: 'pending',
                idempotency_hash: idempotencyHash
            });
        }

        // 5. Update Batch Status
        await databases.updateDocument(databaseId, batchesCollectionId, batchId, {
            status: 'ready_for_review'
        });

        log('Ingestion Complete.');
        return res.json({ success: true, batchId });

    } catch (err) {
        error(`Ingestion Failed: ${err.message}`);
        return res.json({ success: false, error: err.message }, 500);
    }
};
