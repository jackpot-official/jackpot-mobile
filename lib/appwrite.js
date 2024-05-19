import { Client, Account, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.dollaz.app',
    projectId: '664a789a0023296eba3f',
    databaseId: '664a7c0c003d7e7929e0',
    userCollectionId: '664a7c1e002c1fb78821',
    videoCollectionId: '664a7c4a00073c4b4ee9',
    storageId: '664a8013000665bba741'
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);

export const createUser = () => {
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}
