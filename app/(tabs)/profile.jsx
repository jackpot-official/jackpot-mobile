/* Libraries */
import { View, FlatList, TouchableOpacity, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

/* Local libraries & global context */
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, signOut } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

/* Assets and constants */
import { icons } from '../../constants'

/* Components */
import InfoBox from '../../components/InfoBox'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import GainLossCard from '../../components/profile/GainLossCard'
import ProfileNavButton from '../../components/profile/ProfileNavButton'
import TopHoldings from '../../components/profile/TopHoldings'

const Profile = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedTab, setSelectedTab] = useState('Portfolio');
    const { user, setUser, setIsLoggedIn } = useGlobalContext();
    const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
    const holdings = [
        'AAPL (Apple Inc.)',
        'KO (Coca Cola)',
        'VZ (Verizon)',
        'T (T-Mobile)',
        'U (Unity)',
    ];

    const logout = async () => {
        await signOut()
        setUser(null)
        setIsLoggedIn(false)
        router.replace('/sign-in')
    }

	const renderContent = () => {
        switch (selectedTab) {
            case 'Portfolio':
                return (
                    <View className="items-center">
                        <GainLossCard
                            gainloss="-$45,678.90"
                            percentage="-20"
                        />

                        <TopHoldings
                            holdings={ holdings }
                        />
                    </View>
                );
            case 'Posts':
                return (
                    <FlatList
                        data={posts}
                        keyExtractor={(item) => item.$id}
                        renderItem={({ item }) => <VideoCard video={item} />}
                        ListEmptyComponent={() => (
                            <EmptyState
                                title="No posts found."
                                subtitle="No videos found for this search query."
                            />
                        )}
                    />
                );
            case 'Achievements':
                return (
                    <View className="items-center">
                        <Text className="font-hlight text-lg">No achievements collected yet.</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={[]}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                    <>
                        <View className="w-full justify-center mt-6 mb-3 px-4">
                            {/* logout */}
                            <TouchableOpacity
                                className="w-full items-end mb-6 drop-shadow-md"
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
                                        title={`@${user?.username}`}
                                        containerStyles="mt-5 ml-2"
                                    />
                                </View>

                                {/* posts and followers */}
                                <View className="mt-5 flex-row">
                                    {/* number of posts */}
                                    <InfoBox
                                        title={posts?.length || 0}
                                        subtitle="Posts"
                                        containerStyles="mr-10"
                                    />

                                    {/* number of followers */}
                                    <InfoBox
                                        title="1.3k"
                                        subtitle="Followers"
                                    />
                                </View>
                            </View>
                        </View>

						{/* Line separator */}
						<View className="border-b border-gray-200 mb-3 shadow-md" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }} />

                        <View className="flex flex-row justify-items-start ml-3 mb-6">
                            <ProfileNavButton
                                title="Portfolio"
                                handlePress={() => setSelectedTab('Portfolio')}
                                containerStyles={`w-1/4 ${selectedTab === 'Portfolio' ? 'bg-primary' : 'bg-white'}`}
                                textStyles={`${selectedTab === 'Portfolio' ? 'text-white' : 'text-black'}`}
                                isLoading={isSubmitting}
                            />

                            {/* shadow-sm shadow-gray-500 */}
                            <ProfileNavButton
                                title="Posts"
                                handlePress={() => setSelectedTab('Posts')}
                                containerStyles={`w-1/5 ${selectedTab === 'Posts' ? 'bg-primary' : 'bg-white'}`}
                                textStyles={`${selectedTab === 'Posts' ? 'text-white' : 'text-black'}`}
                                isLoading={isSubmitting}
                            />

                            <ProfileNavButton
                                title="Achievements"
                                handlePress={() => setSelectedTab('Achievements')}
                                containerStyles={`w-4/12 ${selectedTab === 'Achievements' ? 'bg-primary' : 'bg-white'}`}
                                textStyles={`${selectedTab === 'Achievements' ? 'text-white' : 'text-black'}`}
                                isLoading={isSubmitting}
                            />
                        </View>
                    </>
                )}

				ListFooterComponent={ renderContent() }
            />
        </SafeAreaView>
    )
}

export default Profile
