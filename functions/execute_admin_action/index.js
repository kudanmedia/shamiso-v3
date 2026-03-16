const { Client, Databases, Query } = require('node-appwrite');

module.exports = async ({ req, res, log, error }) => {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

    const databases = new Databases(client);
    const databaseId = '69b7fdaa001b7da3d224';
    const profilesCollectionId = 'profiles';
    const ledgerCollectionId = 'ledger_entries';

    const { ledgerEntryIds, actionType } = req.body;

    if (!ledgerEntryIds || !Array.isArray(ledgerEntryIds) || !actionType) {
        return res.json({ success: false, message: 'Invalid payload' }, 400);
    }

    try {
        log(`Executing ${actionType} for ${ledgerEntryIds.length} entries`);

        for (const entryId of ledgerEntryIds) {
            const entry = await databases.getDocument(databaseId, ledgerCollectionId, entryId);
            
            if (actionType === 'pay') {
                if (!entry.appwrite_user_id) {
                    log(`Skipping ${entryId}: User not matched.`);
                    continue;
                }

                // Mock Verto FX Payout
                log(`Mocking Verto Payout ($${entry.total_cents / 100}) for ${entry.too_lost_email}`);
                
                // In a real scenario, call Verto API here:
                // await axios.post('https://api.vertofx.com/v1/payouts', { ... })

                await databases.updateDocument(databaseId, ledgerCollectionId, entryId, {
                    status: 'paid'
                });
            }

            if (actionType === 'invite') {
                // Mock Email Invitation
                log(`Mocking Invite Email to ${entry.too_lost_email}`);
                
                // In a real scenario, call Resend/Mailgun here:
                // await resend.emails.send({ ... })

                await databases.updateDocument(databaseId, ledgerCollectionId, entryId, {
                    status: 'escrow_invited'
                });
            }
        }

        return res.json({ success: true, processedCount: ledgerEntryIds.length });

    } catch (err) {
        error(`Admin Action Failed: ${err.message}`);
        return res.json({ success: false, error: err.message }, 500);
    }
};
