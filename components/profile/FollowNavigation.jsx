import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { icons } from '../../constants'

const TopNavigation = ({ title, onBackPress }) => {
    return (
        <View className="w-full flex-row justify-between items-center px-4 py-2 bg-white">
            <TouchableOpacity onPress={onBackPress}>
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    className="w-6 h-6"
                />
            </TouchableOpacity>

            <Text className="text-xl font-semibold">{title}</Text>

            <TouchableOpacity />
        </View>
    )
}

export default TopNavigation
