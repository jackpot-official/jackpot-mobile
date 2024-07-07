import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router'

const Following = ({ route }) => {
    const { following } = useLocalSearchParams()

    return (
        <SafeAreaView>
            <FlatList
                data={following}
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

export default Following
