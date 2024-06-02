import { View, Text } from 'react-native'
import React from 'react'

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
    return (
        <View className={containerStyles}>
            <Text
                className={`text-black text-center font-hsemibold text-xl ${titleStyles}`}
            >
                {title}
            </Text>
            <Text className="text-sm text-gray-500 text-center font-hregular">
                {subtitle}
            </Text>
        </View>
    )
}

export default InfoBox
