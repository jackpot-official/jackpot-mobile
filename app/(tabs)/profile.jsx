import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import EmptyState from '../../components/EmptyState'
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, signOut } from '../../lib/appwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'
import GainLossCard from '../../components/profile/GainLossCard'
import ProfileNavButton from '../../components/profile/ProfileNavButton'

const Profile = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const { data: posts } = useAppwrite(() => getUserPosts(user.$id))

    const logout = async () => {
        await signOut()
        setUser(null)
        setIsLoggedIn(false)
        router.replace('/sign-in')
    }

    const submit = async () => {
        setIsSubmitting(true)

        try {
            router.replace('/profile')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => <VideoCard video={item} />}
                ListHeaderComponent={() => (
                    <>
                        <View className="w-full justify-center mt-6 mb-12 px-4">
                            {/* logout */}
                            <TouchableOpacity
                                className="w-full items-end mb-10 drop-shadow-md"
                                onPress={logout}
                            >
                                <Image
                                    source={icons.logout}
                                    resizeMode="contain"
                                    className="w-6 h-6"
                                />
                            </TouchableOpacity>

							{/* Header */}
                            <View className="flex flex-row justify-between items-center">
                                <View className="flex flex-row items-center">
                                    {/* user pfp */}
                                    <View className="w-16 h-16 rounded-lg justify-center items-center">
                                        <Image
                                            source={{ uri: user?.avatar }}
                                            className="w-[90%] h-[90%] rounded-full"
                                            resizeMode="cover"
                                        />
                                    </View>

                                    {/* username */}
                                    <InfoBox
                                        title={user?.username}
                                        containerStyles="mt-5 ml-3"
                                        titleStyles="text-xl"
                                    />
                                </View>

                                {/* posts and followers */}
                                <View className="mt-5 flex-row">
                                    {/* number of posts */}
                                    <InfoBox
                                        title={posts?.length || 0}
                                        subtitle="Posts"
                                        containerStyles="mr-10"
                                        titleStyles="text-xl"
                                    />

                                    {/* number of followers */}
                                    <InfoBox
                                        title="1.3k"
                                        subtitle="Followers"
                                        titleStyles="text-xl"
                                    />
                                </View>
                            </View>
                        </View>

                        <View className="flex flex-row justify-items-start ml-3">
                            <ProfileNavButton
                                title="Portfolio"
                                handlePress={submit}
                                containerStyles="bg-primary w-1/4 h-10 mt-3 mr-3 shadow-gray-500 shadow-sm"
                                textStyles="text-white"
                                isLoading={isSubmitting}
                            />

                            {/* shadow-sm shadow-gray-500 */}
                            <ProfileNavButton
                                title="Posts"
                                handlePress={submit}
                                containerStyles="bg-white w-1/5 h-10 mt-3 mr-3 shadow-gray-500 shadow-sm"
                                textStyles="text-black"
                                isLoading={isSubmitting}
                            />

                            <ProfileNavButton
                                title="Achievements"
                                handlePress={submit}
                                containerStyles="bg-white w-4/12 h-10 mt-3 shadow-gray-500 shadow-sm"
                                textStyles="text-black"
                                isLoading={isSubmitting}
                            />
                        </View>

                        <View className="items-center">
                            <GainLossCard
                                gainloss="-$45,678.90"
                                percentage="-20"
                            />
                        </View>
                    </>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No posts found."
                        subtitle="No videos found for this search query."
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default Profile
