import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import TopNavigation from '../../components/profile/TopNavigation'
import SocialTopNav from '../../components/social/SocialTopNav'
import PercentageBadge from '../../components/PercentageBadge'
import ComparisonCard from '../../components/comparison/ComparisonCard'

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

                <ComparisonCard percentage={75} />
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
