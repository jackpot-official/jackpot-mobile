import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'

const Followers = () => {
    // console.log('route', route)
    const { followers } = useLocalSearchParams()

    return (
        <SafeAreaView>
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
