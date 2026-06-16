const { Client, Functions } = require('node-appwrite');
const { endpoint, projectId, apiKey } = require('./appwrite-env');

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

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
