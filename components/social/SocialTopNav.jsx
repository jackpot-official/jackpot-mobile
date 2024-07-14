import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { icons } from '../../constants'

const SocialTopNav = ({ onBackPress }) => {
    return (
        <View className="w-full flex-row justify-between items-center px-4 py-2 bg-white">
            <TouchableOpacity onPress={onBackPress}>
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    className="w-6 h-6"
                />
            </TouchableOpacity>

            <Text className="text-xl font-semibold">Social</Text>

            <TouchableOpacity>
                <Image
                    source={icons.menu}
                    resizeMode="contain"
                    className="w-6 h-6"
                />
            </TouchableOpacity>
        </View>
    )
}

export default SocialTopNav
