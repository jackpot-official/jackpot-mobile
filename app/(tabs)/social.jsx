import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import TopNavigation from '../../components/profile/TopNavigation'
import SocialTopNav from '../../components/social/SocialTopNav'

const Social = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <SocialTopNav />
            <View className="w-full justify-center mt-6 mb-3 px-4">
                <View className="flex-row justify-between items-center mb-4">
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: 'https://via.placeholder.com/50' }}
                            className="w-12 h-12 rounded-full"
                        />
                        <Text className="ml-2 text-lg font-semibold">
                            Riya Dev
                        </Text>
                    </View>
                    <FontAwesome name="times" size={24} color="black" />
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: 'https://via.placeholder.com/50' }}
                            className="w-12 h-12 rounded-full"
                        />
                        <Text className="ml-2 text-lg font-semibold">
                            Luke Zhu
                        </Text>
                    </View>
                </View>
                <View className="bg-white rounded-xl p-4 shadow-md">
                    <Text className="text-gray-600 text-sm">
                        Similarity Percentage
                    </Text>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-4xl font-bold">100</Text>
                        <FontAwesome name="rocket" size={24} color="black" />
                    </View>
                    <View className="flex-row justify-between items-center">
                        <TouchableOpacity className="bg-primarytint-200 rounded-full py-2 px-4">
                            <Text className="text-white">Button</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-primarytint-200 rounded-full py-2 px-4">
                            <Text className="text-white">Button</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Investing Overview Section */}
            <View className="bg-gray-200 rounded-xl p-4 mb-4">
                <Text className="text-xl font-semibold mb-4">
                    Investing Overview
                </Text>
                <Image
                    source={{ uri: 'https://via.placeholder.com/300' }}
                    className="w-full h-64 rounded-xl"
                />
            </View>
        </SafeAreaView>
    )
}

export default Social
