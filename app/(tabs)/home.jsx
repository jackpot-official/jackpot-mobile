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
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const { data: posts, refetch } = useAppwrite(getAllTextPosts)
    const { data: latestPosts } = useAppwrite(getLatestPosts)

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true)
        // re call videos when new videos appear
        await refetch()
        setRefreshing(false)
    }

    useEffect(() => {
        const fetchCommentsForPosts = async () => {
            if (posts) {
                for (let post of posts) {
                    const comments = await getPostComments(post.$id);
                    post.comments = comments;
                }
            }
        }
        fetchCommentsForPosts();
    }, [posts]);

    return (
        <SafeAreaView className="bg-white">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                // renderItem={({ item }) => <VideoCard video={item} />}
                renderItem={({ item }) => (
                    <CommunityPost
                        user={user}
                        post={{
                            ...item,
                            comments: item.comments ?? [],
                            postId: item.$id,
                        }}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <View className="flex justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-hmedium text-sm text-black">
                                    Welcome back,
                                </Text>
                                <Text className="text-2xl font-hsemibold text-black">
                                    {user?.username}
                                </Text>
                            </View>

                            <View className="mt-1">
                                <Image
                                    source={images.text_black}
                                    className="w-48 h-9"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        <SearchInput />

                        {/* <CommunityPost
                            user={user}
                            title="I just lost 50% in NVDA"
                            body="Title. I lost a ton of mony in NVDA. Exit rn."
                            datetime="March 24, 2024 2:15:15 PM"
                            like_count={0}
                            liked={false}
                            comments={[{ user: 'lukezhu', text: "I'd agree" }]}
                            postId="667cf946003773e4f5bd"
                        />

                        <CommunityPost
                            user={user}
                            title="Someone was very wrong about AAL."
                            body="It's down 20%. This must be a joke."
                            datetime="March 24, 2024 2:15:15 PM"
                            like_count={0}
                            liked={false}
                            comments={[{ user: 'lukezhu', text: "I'd agree" }]}
                        /> */}

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-black text-lg font-hregular">
                                Latest Posts
                            </Text>

                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>
                )}
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
                    />
                }
            />
        </SafeAreaView>
    )
}

export default Home
