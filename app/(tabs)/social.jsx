import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'

// Components
import SocialTopNav from '../../components/social/SocialTopNav'
import ComparisonCard from '../../components/comparison/ComparisonCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { useNavigation } from 'expo-router'

const Social = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const navigation = useNavigation()

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <SocialTopNav onBackPress={() => navigation.goBack()} />

                <View className="px-6 py-4">
                    <Text className="text-3xl font-bold mb-2">
                        Social Comparison
                    </Text>
                    <Text className="text-gray-600 mb-6 text-md">
                        Compare your investment performance with friends and
                        other investors.
                    </Text>
                </View>

                <View className="flex-row justify-around mb-8 bg-gray-100 py-6 rounded-xl mx-4">
                    <View className="items-center">
                        <Text className="text-lg font-semibold text-gray-600">
                            Your Rank
                        </Text>
                        <Text className="text-4xl font-bold text-primary mt-2">
                            #42
                        </Text>
                    </View>
                    <View className="items-center">
                        <Text className="text-lg font-semibold text-gray-600">
                            Total Investors
                        </Text>
                        <Text className="text-4xl font-bold mt-2">1,234</Text>
                    </View>
                </View>

                <View className="border-b border-gray-200 mb-8 mx-4" />

                <View className="w-full justify-center mb-6 px-6">
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-row items-center">
                            <Image
                                source={{ uri: user?.avatar }}
                                className="w-16 h-16 rounded-full"
                            />
                            <Text className="ml-3 text-xl font-semibold">
                                {user?.username}
                            </Text>
                        </View>
                        <FontAwesome name="exchange" size={24} color="gray" />
                        <View className="flex-row items-center">
                            <Image
                                source={{
                                    uri: 'https://via.placeholder.com/50',
                                }}
                                className="w-16 h-16 rounded-full"
                            />
                            <Text className="ml-3 text-xl font-semibold">
                                Luke Zhu
                            </Text>
                        </View>
                    </View>

                    <ComparisonCard percentage={75} />
                </View>

                {/* Investing Overview Section */}
                <View className="bg-gray-100 rounded-xl p-6 mx-4 mb-8">
                    <Text className="text-2xl font-semibold mb-4">
                        Investing Overview
                    </Text>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/300' }}
                        className="w-full h-64 rounded-xl"
                        resizeMode="cover"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Social
