/* Libraries */
import { View, FlatList, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

/* Local libraries & global context */
import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, signOut } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

/* Assets and constants */
import { icons, images } from '../../constants'

/* Components */
import InfoBox from '../../components/InfoBox'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'
import GainLossCard from '../../components/profile/GainLossCard'
import ProfileNavButton from '../../components/profile/ProfileNavButton'
import TopHoldings from '../../components/profile/TopHoldings'
import CommunityPost from '../../components/posts/CommunityPost'

const Profile = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedTab, setSelectedTab] = useState('Portfolio')
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const { data: posts } = useAppwrite(() => getUserPosts(user.$id))

    const [topHoldings, setTopHoldings] = useState([
        { symbol: 'TSLA', image: "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2020/06/1200/675/TESLA-LOGO.jpg?ve=1&tl=1" },
        { symbol: 'LOWE', image: "https://mobileimages.lowes.com/marketingimages/d0c68e7e-54a6-4d2d-a53d-385f8a156529/lowes-dp18-328966-og.png" },
        { symbol: 'T', image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/T-Mobile_logo_2022.svg/2048px-T-Mobile_logo_2022.svg.png" },
        { symbol: 'AAL', image: "https://external-preview.redd.it/noGVmHkGp3tV46SVyR3TSndGMlFp-2Vf3uLBm9UUZlY.png?auto=webp&s=fd18075339f5cf34ee0a7512ede6476c619a21cb" },
        { symbol: 'TSM', image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/TSM_Logo.svg/800px-TSM_Logo.svg.png" },
    ]);

    const [topGainers, setTopGainers] = useState([
        { symbol: 'AMZN', image: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg" },
        { symbol: 'GOOGL', image: "https://blog.hubspot.com/hubfs/image8-2.jpg" },
        { symbol: 'META', image: "https://static.stocktitan.net/company-logo/meta.png" },
        { symbol: 'HSY', image: "https://s3-symbol-logo.tradingview.com/hershey--600.png" },
        { symbol: 'CVS', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGy9SsVpkF4KgjSMteLMro-L8p9K5CHdDgsw&s" },
    ]);

    const [topLosers, setTopLosers] = useState([
        { symbol: 'NFLX', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtnU7EnBvhTa0NoSb_relPpl9xBM5imEOUfA&s" },
        { symbol: 'DIS', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-x7WKB6vtl_f-K1QSaiL3m-cwRFYPEK6nUw&s" },
        { symbol: 'UBER', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROSz4KuB3f_iKz6_QWE0wvnIJbVpoOIongMw&s" },
        { symbol: 'SPOT', image: "https://g.foolcdn.com/art/companylogos/square/spot.png" },
        { symbol: 'BABA', image: "https://companiesmarketcap.com/img/company-logos/256/BABA.png" },
    ]);

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
                    <ScrollView
                        className="bg-white flex-1"
                        contentContainerStyle={{ paddingBottom: 50 }}>
                        <View className="items-center">
                            <GainLossCard gainloss="-$45,678.90" percentage="-20" />

                            <View className="bg-white border border-gray-100 rounded-xl p-2 shadow-lg">
                                <Image
                                    source={ images.chart }
                                    className="w-96 h-72 rounded-xl"
                                    resizeMode="contain"
                                />
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                className=""
                            >
                                <View className="flex flex-row m-4">
                                    <TopHoldings holdings={topHoldings} title="Holdings" boxStyle="mr-4" />
                                    <TopHoldings holdings={topGainers} title="Gainers" boxStyle="mr-4" />
                                    <TopHoldings holdings={topLosers} title="Losers" boxStyle="mr-4" />

                                </View>
                            </ScrollView>

                        </View>
                    </ScrollView>
                )
            case 'Posts':
                return (
                    <>
                        <CommunityPost
                            user={ user }
                        />

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
                    </>
                )
            case 'Achievements':
                return (
                    <View className="items-center">
                        <Text className="font-hlight text-lg">
                            No achievements collected yet.
                        </Text>
                    </View>
                )
            default:
                return null
        }
    }

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
                        <View
                            className="border-b border-gray-200 mb-3 shadow-md"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                        />

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
                                handlePress={() =>
                                    setSelectedTab('Achievements')
                                }
                                containerStyles={`w-4/12 ${selectedTab === 'Achievements' ? 'bg-primary' : 'bg-white'}`}
                                textStyles={`${selectedTab === 'Achievements' ? 'text-white' : 'text-black'}`}
                                isLoading={isSubmitting}
                            />
                        </View>
                    </>
                )}
                ListFooterComponent={renderContent()}
            />
        </SafeAreaView>
    )
}

export default Profile
