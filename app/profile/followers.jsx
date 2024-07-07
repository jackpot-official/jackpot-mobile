import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import FollowNavigation from '../../components/profile/FollowNavigation'

const Followers = () => {
    const navigation = useNavigation()
    const { followers } = useLocalSearchParams()

    return (
        <SafeAreaView>
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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Followers
