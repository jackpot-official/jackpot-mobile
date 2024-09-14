import {
    View,
    Text,
    FlatList,
    Image,
    RefreshControl,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

// Constants and components
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts, getPostComments, getAllTextPosts } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import CommunityPost from '../../components/posts/CommunityPost'

const Home = () => {
    const { user } = useGlobalContext()
    const { data: posts, refetch } = useAppwrite(getAllTextPosts)
    const [refreshing, setRefreshing] = useState(false)
    const [updatedPosts, setUpdatedPosts] = useState([])

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }

    useEffect(() => {
        const fetchCommentsForPosts = async () => {
            if (posts) {
                const postsWithComments = await Promise.all(
                    posts.map(async (post) => {
                        const comments = await getPostComments(post.$id)
                        return { ...post, comments }
                    })
                )
                setUpdatedPosts(postsWithComments)
            }
        }

        fetchCommentsForPosts()
    }, [posts])

    const renderHeader = () => (
        <View className="px-4 py-6 bg-primary rounded-b-3xl shadow-lg">
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="font-medium text-white text-lg">
                        Welcome back,
                    </Text>
                    <Text className="text-3xl font-bold text-white">
                        {user?.username}
                    </Text>
                </View>
                <Image
                    source={{ uri: user?.avatar }}
                    className="w-14 h-14 rounded-full border-2 border-white"
                />
            </View>
            <SearchInput
                containerStyle="bg-white rounded-full"
                placeholderTextColor="gray"
            />
        </View>
    )

    const renderTrending = () => (
        <View className="mt-6 mb-4 px-4">
            <Text className="text-xl font-bold mb-4">Trending Topics</Text>
            <Trending posts={updatedPosts.slice(0, 5)} />
        </View>
    )

    return (
        <SafeAreaView className="bg-gray-100 flex-1">
            <FlatList
                data={updatedPosts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <View className="bg-white rounded-lg shadow-md mx-4 my-2">
                        <CommunityPost
                            user={user}
                            post={{
                                ...item,
                                comments: item.comments ?? [],
                                postId: item.$id,
                            }}
                            scrollableComments={true}
                        />
                    </View>
                )}
                ListHeaderComponent={
                    <>
                        {renderHeader()}
                        {renderTrending()}
                        <Text className="text-xl font-bold px-4 mb-2">
                            Latest Posts
                        </Text>
                    </>
                }
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No posts found."
                        subtitle="Be the first to create a post."
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#4A90E2']}
                        tintColor="#4A90E2"
                    />
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    )
}

export default Home
