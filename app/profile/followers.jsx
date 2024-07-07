import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import FollowNavigation from '../../components/profile/FollowNavigation'
import { getFollowers } from '../../lib/appwrite'

const Followers = () => {
    const navigation = useNavigation()
    const { userId } = useLocalSearchParams()
    const [followers, setFollowers] = useState([])

    useEffect(() => {
        const fetchFollowers = async () => {
            if (userId) {
                const response = await getFollowers(userId)
                setFollowers(response.documents)
            }
        }

        fetchFollowers()
    }, [userId])

    return (
        <SafeAreaView className="bg-white h-full">
            <FollowNavigation
                title="Followers"
                onBackPress={() => navigation.goBack()}
            />

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

            <FlatList
                data={followers}
                keyExtractor={(item) => item.user2.$id}
                renderItem={({ item }) => (
                    <View className="flex flex-row items-center p-4 border-b border-gray-200">
                        <Image
                            source={{ uri: item.user1.avatar }}
                            className="w-10 h-10 rounded-full mr-4"
                            resizeMode="cover"
                        />
                        <Text className="text-lg font-semibold">
                            {item.user1.username}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Followers
