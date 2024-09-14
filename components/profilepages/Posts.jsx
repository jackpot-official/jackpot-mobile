import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import CommunityPost from '../../components/posts/CommunityPost'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'

import { getUserPosts, getUserTextPosts } from '../../lib/appwrite'
import { View } from 'react-native-animatable'

const Posts = ({ user }) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // const videoPosts = await getUserPosts(user.$id);
                const textPosts = await getUserTextPosts(user.$id)
                setPosts([...textPosts])
                setLoading(false)
            } catch (error) {
                console.error('Error fetching posts: ', error)
                setLoading(false)
            }
        }

        fetchPosts()
    }, [user.$id])

    return (
        <>
            {/* <CommunityPost
                user={user}
                title="I just lost 50% in NVDA"
                body="Title. I lost a ton of mony in NVDA. Exit rn."
                datetime="March 24, 2024 2:15:15 PM"
                like_count={0}
                liked={false}
                comments={[{ user: 'lukezhu', text: "I'd agree" }]}
            /> */}

            <FlatList
                data={posts}
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
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No posts found."
                        subtitle="You haven't made any posts yet."
                    />
                )}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
        </>
    )
}

export default Posts
