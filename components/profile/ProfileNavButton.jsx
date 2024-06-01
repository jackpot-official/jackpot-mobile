import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const ProfileNavButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`rounded-full justify-center items-center h-10 mt-3 mr-3 shadow-gray-900 shadow-lg ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            <Text
                className={`font-hsemibold text-lg ${textStyles}`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default ProfileNavButton
