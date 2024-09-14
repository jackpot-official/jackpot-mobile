/* Libraries */
import { View, Image, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

/* Local libraries & global context */
import useAppwrite from '../../lib/useAppwrite'
import {
    getUserPosts,
    getUserTextPosts,
    signOut,
    createFollowing,
    getFollowers,
    getFollowing,
} from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

/* Components */
import InfoBox from '../../components/InfoBox'
import ProfileNavButton from '../../components/profile/ProfileNavButton'
import Portfolio from '../../components/profilepages/Portfolio'
import Achievements from '../../components/profilepages/Achievements'
import Posts from '../../components/profilepages/Posts'
import TopNavigation from '../../components/profile/TopNavigation'

const Profile = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedTab, setSelectedTab] = useState('Portfolio')
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const { data: posts } = useAppwrite(() => getUserTextPosts(user.$id))

    const [followers, setFollowers] = useState([])
    const [followersCount, setFollowersCount] = useState(0)
    const [following, setFollowing] = useState([])
    const [followingCount, setFollowingCount] = useState(0)

    const [topGainers, setTopGainers] = useState([
        {
            symbol: 'AMZN',
            image: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg',
        },
        {
            symbol: 'GOOGL',
            image: 'https://blog.hubspot.com/hubfs/image8-2.jpg',
        },
        {
            symbol: 'META',
            image: 'https://static.stocktitan.net/company-logo/meta.png',
        },
        {
            symbol: 'HSY',
            image: 'https://s3-symbol-logo.tradingview.com/hershey--600.png',
        },
        {
            symbol: 'CVS',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGy9SsVpkF4KgjSMteLMro-L8p9K5CHdDgsw&s',
        },
    ])

    const [topLosers, setTopLosers] = useState([
        {
            symbol: 'NFLX',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtnU7EnBvhTa0NoSb_relPpl9xBM5imEOUfA&s',
        },
        {
            symbol: 'DIS',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-x7WKB6vtl_f-K1QSaiL3m-cwRFYPEK6nUw&s',
        },
        {
            symbol: 'UBER',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROSz4KuB3f_iKz6_QWE0wvnIJbVpoOIongMw&s',
        },
        {
            symbol: 'SPOT',
            image: 'https://g.foolcdn.com/art/companylogos/square/spot.png',
        },
        {
            symbol: 'BABA',
            image: 'https://companiesmarketcap.com/img/company-logos/256/BABA.png',
        },
    ])

    const scrollY = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (user) {
            fetchFollowers()
            fetchFollowing()
        }
    }, [])

    const fetchFollowers = async () => {
        try {
            const response = await getFollowers(user.$id)
            setFollowers(response.documents)
            setFollowersCount(response.length)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchFollowing = async () => {
        try {
            const response = await getFollowing(user.$id)
            setFollowing(response.documents)
            setFollowingCount(response.length)
        } catch (error) {
            console.error(error)
        }
    }

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
                    <Portfolio topGainers={topGainers} topLosers={topLosers} />
                )
            case 'Posts':
                return <Posts user={user} posts={posts} />
            case 'Achievements':
                return <Achievements />
            default:
                return null
        }
    }

    const navigateToFollowers = () => {
        router.push({
            pathname: '/profile/followers',
            params: {
                userId: user.$id,
            },
        })
    }

    const navigateToFollowing = () => {
        router.push({
            pathname: '/profile/following',
            params: {
                userId: user.$id,
            },
        })
    }

    return (
        <SafeAreaView className="bg-white h-full">
            <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <TopNavigation logout={logout} />
                <View className="w-full justify-center mt-4 mb-6 px-6">
                    {/* Header */}
                    <Animated.View
                        className="flex-col justify-between items-start mb-4"
                        style={{
                            height: scrollY.interpolate({
                                inputRange: [0, 100],
                                outputRange: [160, 80],
                                extrapolate: 'clamp',
                            }),
                        }}
                    >
                        <Animated.View
                            className="flex-row items-center mb-2"
                            style={{
                                opacity: scrollY.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [1, 0],
                                    extrapolate: 'clamp',
                                }),
                            }}
                        >
                            {/* User profile picture */}
                            <View className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary mr-3">
                                <Image
                                    source={{ uri: user?.avatar }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            </View>

                            {/* Username */}
                            <InfoBox
                                title={`@${user?.username}`}
                                titleStyles="text-lg font-semibold"
                            />
                        </Animated.View>

                        {/* Stats: Posts, Followers, Following */}
                        <Animated.View
                            className="flex-row justify-between w-full"
                            style={{
                                transform: [
                                    {
                                        translateY: scrollY.interpolate({
                                            inputRange: [0, 100],
                                            outputRange: [0, -40],
                                            extrapolate: 'clamp',
                                        }),
                                    },
                                ],
                            }}
                        >
                            <InfoBox
                                title={posts?.length || 0}
                                subtitle="Posts"
                                containerStyles="items-center"
                                titleStyles="text-xl font-bold"
                                subtitleStyles="text-xs text-gray-600"
                            />
                            <TouchableOpacity onPress={navigateToFollowers} className="items-center">
                                <InfoBox
                                    title={followersCount}
                                    subtitle="Followers"
                                    titleStyles="text-xl font-bold"
                                    subtitleStyles="text-xs text-gray-600"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={navigateToFollowing} className="items-center">
                                <InfoBox
                                    title={followingCount}
                                    subtitle="Following"
                                    titleStyles="text-xl font-bold"
                                    subtitleStyles="text-xs text-gray-600"
                                />
                            </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>
                </View>

                {/* Line separator */}
                <View
                    className="border-b border-gray-200 mb-4"
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                />

                <View className="flex flex-row justify-center mb-6">
                    <ProfileNavButton
                        title="Portfolio"
                        handlePress={() => setSelectedTab('Portfolio')}
                        containerStyles={`w-1/4 ${selectedTab === 'Portfolio' ? 'bg-primary' : 'bg-gray-100'}`}
                        textStyles={`${selectedTab === 'Portfolio' ? 'text-white' : 'text-gray-800'} font-semibold`}
                        isLoading={isSubmitting}
                    />
                    <ProfileNavButton
                        title="Posts"
                        handlePress={() => setSelectedTab('Posts')}
                        containerStyles={`w-1/4 ${selectedTab === 'Posts' ? 'bg-primary' : 'bg-gray-100'}`}
                        textStyles={`${selectedTab === 'Posts' ? 'text-white' : 'text-gray-800'} font-semibold`}
                        isLoading={isSubmitting}
                    />
                    <ProfileNavButton
                        title="Achievements"
                        handlePress={() => setSelectedTab('Achievements')}
                        containerStyles={`w-1/3 ${selectedTab === 'Achievements' ? 'bg-primary' : 'bg-gray-100'}`}
                        textStyles={`${selectedTab === 'Achievements' ? 'text-white' : 'text-gray-800'} font-semibold`}
                        isLoading={isSubmitting}
                    />
                </View>

                {renderContent()}
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default Profile
