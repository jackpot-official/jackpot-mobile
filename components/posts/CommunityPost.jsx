import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Animated,
    Easing,
    LayoutAnimation,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import InfoBox from '../InfoBox'
import { FontAwesome } from '@expo/vector-icons'
import {
    likePost,
    createComment,
    getPostComments,
    getPostLikes,
} from '../../lib/appwrite'
import { formatDistanceToNow } from 'date-fns'

const CommunityPost = ({ user, post }) => {
    // console.log(post)
    // const { creator, title, body, createdAt, comments, postId } = post
    const { creator, title, body, date, comments, postId } = post

    // console.log("Post Creator:", creator);
    // console.log("Post Title:", title);
    // console.log("Post Body:", body);
    console.log('Post createdAt:', date)
    // console.log("Post Comments:", comments);
    // console.log("Post ID:", postId);

    const [likes, setLikes] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const [showComments, setShowComments] = useState(false) // toggle comment visibility
    const [newComment, setNewComment] = useState('') // new comment input
    const [commentList, setCommentList] = useState(comments) // comments array
    const [commentCount, setCommentCount] = useState(comments.length)

    const slideAnim = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const { likeCount, userLiked } = await getPostLikes(
                    postId,
                    user.$id
                )
                setLikes(likeCount)
                setHasLiked(userLiked)
                // console.log('User liked:', userLiked);
            } catch (error) {
                console.error('Error fetching likes: ', error)
            }
        }

        const fetchComments = async () => {
            try {
                const fetchedComments = await getPostComments(postId)
                setCommentList(fetchedComments)
                setCommentCount(fetchedComments.length)
            } catch (error) {
                console.error('Error fetching comments: ', error)
            }
        }

        fetchLikes()
        fetchComments()
    }, [postId, user.$id])

    const handleLike = async () => {
        try {
            await likePost(postId, user.$id)

            if (!hasLiked) {
                setLikes(likes + 1)
                setHasLiked(true)
            } else {
                setLikes(likes - 1)
                setHasLiked(false)
            }
        } catch (error) {
            console.error('Error liking the post: ', error)
        }
    }

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                // await createComment( postId, user.$id, newComment );
                // setCommentList([
                //     ...commentList,
                //     // { user: user.username, text: newComment, owner: user.$id },
                //     // { user: user?.username, text: newComment, owner: user.$id },
                //     owner: { username: user.username },
                //     text: newComment,
                // ]);
                // setNewComment('')
                const createdComment = await createComment(
                    postId,
                    user.$id,
                    newComment
                )
                const newCommentObject = {
                    ...createdComment,
                    owner: { username: user.username },
                    text: newComment,
                }

                setCommentList([...commentList, newCommentObject])
                setNewComment('')

                setCommentCount(commentCount + 1)
            } catch (error) {
                console.error('Error adding comment: ', error)
            }
        }
    }

    const toggleComments = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setShowComments(!showComments)
    }

    return (
        <View className="mb-6">
            <View className="flex flex-row items-center">
                {/* user pfp */}
                <View className="ml-4 w-10 h-10 rounded-lg justify-center items-center">
                    <Image
                        source={{ uri: creator?.avatar }}
                        className="w-[90%] h-[90%] rounded-full"
                        resizeMode="cover"
                    />
                </View>

                {/* username */}
                <InfoBox
                    title={`@${creator?.username}`}
                    containerStyles="mt-5 ml-2"
                    titleStyles="text-md"
                />
            </View>

            {/* Title */}
            <Text className="font-hsemibold text-black text-xl ml-16">
                {title}
            </Text>

            {/* Text */}
            <Text className="font-hregular text-black text-md ml-16">
                {body}
            </Text>

            {/* Time and Date */}
            <Text className="font-hregular text-gray-500 text-sm ml-16 mt-3">
                {formatDistanceToNow(new Date(date), { addSuffix: true })}
            </Text>

            {/* Like and comment Touchable Opacity Icons */}
            <View className="flex flex-row ml-16 mt-1">
                <TouchableOpacity
                    onPress={handleLike}
                    className="flex flex-row items-center mr-4"
                >
                    <FontAwesome
                        name="thumbs-up"
                        size={20}
                        color={hasLiked ? '#1d4b3b' : '#808080'}
                    />
                    <Text className="ml-1">{likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={toggleComments}
                    className="flex flex-row items-center"
                >
                    <FontAwesome name="comment" size={20} color="#1d4b3b" />
                    <Text className="ml-1">{commentCount}</Text>
                </TouchableOpacity>
            </View>

            {/* Comment Section */}
            {showComments && (
                <View className="mt-4 m-4 ml-16 w-80">
                    {/* <FlatList
                        data={commentList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View className="flex flex-row items-center mb-2">
                                <Text className="font-hsemibold text-black text-md">
                                    {item.user}:{' '}
                                </Text>
                                <Text className="font-hregular text-black text-md">
                                    {item.text}
                                </Text>
                            </View>
                        )}
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ maxHeight: 200 }}
                    /> */}
                    <FlatList
                        data={commentList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View className="flex flex-col mb-2">
                                <View className="flex flex-row items-center">
                                    <Text className="font-hsemibold text-black text-md">
                                        {item.owner.username}:{' '}
                                    </Text>
                                    <Text className="font-hregular text-black text-md">
                                        {item.text}
                                    </Text>
                                </View>
                                <Text
                                    className="font-hregular text-gray-500 text-sm"
                                    style={{ alignSelf: 'flex-end' }}
                                >
                                    {formatDistanceToNow(
                                        new Date(item.datetime),
                                        { addSuffix: true }
                                    )}
                                </Text>
                            </View>
                        )}
                        contentContainerStyle={{ flexGrow: 1 }}
                        style={{ maxHeight: 200 }}
                    />

                    <View className="flex flex-row items-center mt-2">
                        <TextInput
                            className="border border-gray-400 rounded-lg flex-1 mr-2 p-2"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChangeText={setNewComment}
                        />
                        <TouchableOpacity
                            onPress={handleAddComment}
                            className="bg-primarytint-200 py-1 px-3 rounded-md"
                        >
                            <Text className="text-white">Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

export default CommunityPost
