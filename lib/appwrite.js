import {
    Client,
    Account,
    ID,
    Avatars,
    Databases,
    Query,
    Storage,
} from 'react-native-appwrite'

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.dollaz.app',
    projectId: '664a789a0023296eba3f',
    databaseId: '664a7c0c003d7e7929e0',
    userCollectionId: '664a7c1e002c1fb78821',
    videoCollectionId: '664a7c4a00073c4b4ee9',
    storageId: '664a8013000665bba741',
    postCollectionId: '667cf26a00224ce33e98',
    commentCollectionId: '667f18ba003c2510b878',
    likeCollectionId: '667f1c0f00321ea6e509',
    followingCollectionId: '667cf5900006a09ee00a',
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
    postCollectionId,
    commentCollectionId,
    followingCollectionId,
} = appwriteConfig

const client = new Client()

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        )

        return newUser
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const signIn = async (email, password) => {
    try {
        try {
            await account.deleteSession('current')
        } finally {
            const session = await account.createEmailPasswordSession(
                email,
                password
            )
            return session
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const getAccount = async () => {
    try {
        const currentAccount = await account.get()
        return currentAccount
    } catch (error) {
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await getAccount()

        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt')]
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]
        )

        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl

    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId)
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                'top',
                100
            )
        } else {
            throw new Error('Invalid file type')
        }
        if (!fileUrl) throw Error
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

export const uploadFile = async (file, type) => {
    if (!file) return

    const { mimeType, ...rest } = file
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    }

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        )

        const fileUrl = await getFilePreview(uploadedFile.$id, type)

        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        )
        return newPost
    } catch (error) {
        throw new Error(error)
    }
}

// Create post
export const createPost = async (title, body, userId) => {
    try {
        const currentDate = new Date().toISOString()

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                title: title,
                body: body,
                date: currentDate,
                creator: userId,
            }
        )
        return newPost
    } catch (error) {
        throw new Error(error)
    }
}

// Get all posts
export const getAllTextPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

// Get posts by user
export const getUserTextPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents
    } catch (error) {
        throw new Error(error)
    }
}

export const getPostLikes = async (postId, userId) => {
    try {
        const likes = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.likeCollectionId,
            [Query.equal('postid', postId)]
        )

        const likeCount = likes.documents.length

        const userLiked = likes.documents.some(
            (like) => like.owner.$id === userId
        )

        return { likeCount, userLiked }
    } catch (error) {
        throw new Error(`Error fetching post likes: ${error.message}`)
    }
}

// like and unlike post
export const likePost = async (postId, userId) => {
    try {
        const likes = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.likeCollectionId,
            [Query.equal('postid', postId), Query.equal('owner', userId)]
        )

        if (likes.documents.length > 0) {
            const likeId = likes.documents[0].$id
            await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.likeCollectionId,
                likeId
            )
            return { unliked: true }
        } else {
            const newLike = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.likeCollectionId,
                ID.unique(),
                {
                    owner: userId,
                    postid: postId,
                    datetime: new Date().toISOString(),
                }
            )
            return { liked: true }
        }
    } catch (error) {
        throw new Error(`Error liking/unliking the post: ${error.message}`)
    }
}

// create comment
export const createComment = async (postId, userId, text) => {
    ;``
    try {
        const newComment = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.commentCollectionId,
            ID.unique(),
            {
                owner: userId,
                postid: postId,
                text: text,
                datetime: new Date().toISOString(),
            }
        )
        return newComment
    } catch (error) {
        throw new Error(error)
    }
}

// get post comments
export const getPostComments = async (postId) => {
    try {
        const comments = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.commentCollectionId,
            [Query.equal('postid', postId), Query.orderDesc('$createdAt')]
        )
        return comments.documents
    } catch (error) {
        throw new Error(error)
    }
}

// Update user with access token and item ID
export const updateUserWithPlaidCredentials = async (accessToken, itemId) => {
    try {
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            throw new Error('User not found.')
        }

        const userDocId = currentUser.$id

        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userDocId,
            {
                plaidAccessToken: accessToken,
                plaidItemId: itemId,
            }
        )

        return updatedUser
    } catch (error) {
        throw new Error(
            `Error updating user with Plaid credentials: ${error.message}`
        )
    }
}

// Create following relationship
export const createFollowing = async (followerId, followedId) => {
    try {
        const response = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.followingCollectionId,
            ID.unique(),
            {
                user1: followerId,
                user2: followedId,
            }
        )
        console.log(response)
        return response
    } catch (error) {
        console.error(error)
    }
}

export const getFollowers = async (userId) => {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.followingCollectionId,
            // [`user2=${userId}`]
            [Query.equal('user2', userId)]
        )
        // console.log('Followers:', response.documents)
        return {
            documents: response.documents,
            length: response.documents.length,
        }
    } catch (error) {
        console.error(error)
        return {
            documents: [],
            length: 0,
        }
    }
}

export const getFollowing = async (userId) => {
    try {
        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.followingCollectionId,
            // [`follower=${userId}`]
            [Query.equal('user1', userId)]
        )
        // console.log('Following:', response.documents)
        return {
            documents: response.documents,
            length: response.documents.length,
        }
    } catch (error) {
        console.error(error)
        return {
            documents: [],
            length: 0,
        }
    }
}

// 
const fetchInvestmentTransactions = async (accessToken, startDate, endDate) => {
    try {
        const response = await axios.post('https://sandbox.plaid.com/investments/transactions/get', {
            client_id: 'your_client_id',
            secret: 'your_secret',
            access_token: accessToken,
            start_date: startDate,
            end_date: endDate
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching investment transactions:', error);
        throw error;
    }
};