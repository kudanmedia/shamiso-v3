const { Client, Functions } = require('node-appwrite');

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '69b7d2fc0023faf8fc46')
    .setKey(process.env.APPWRITE_API_KEY || ''); 

const functions = new Functions(client);

async function listFunctions() {
    try {
        console.log('Fetching functions...');
        const result = await functions.list();
        console.log('Available Functions:');
        result.functions.forEach(f => {
            console.log(`- Name: ${f.name} | ID: ${f.$id}`);
        });
    } catch (error) {
        console.error('Error listing functions:', error.message);
    }
}

listFunctions();
