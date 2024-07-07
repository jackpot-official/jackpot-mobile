import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import FollowNavigation from '../../components/profile/FollowNavigation'
import { getFollowing } from '../../lib/appwrite'

const Following = () => {
    const navigation = useNavigation()
    const { userId } = useLocalSearchParams()
    const [following, setFollowing] = useState([])

    useEffect(() => {
        const fetchFollowing = async () => {
            if (userId) {
                const response = await getFollowing(userId)
                setFollowing(response.documents)
            }
        }

        fetchFollowing()
    }, [userId])

    return (
        <SafeAreaView className="bg-white h-full">
            <FollowNavigation
                title="Following"
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
                data={following}
                keyExtractor={(item) => item.user1.$id}
                renderItem={({ item }) => (
                    <View className="flex flex-row items-center p-4 border-b border-gray-200">
                        <Image
                            source={{ uri: item.user2.avatar }}
                            className="w-10 h-10 rounded-full mr-4"
                            resizeMode="cover"
                        />
                        <Text className="text-lg font-semibold">
                            {item.user2.username}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Following
