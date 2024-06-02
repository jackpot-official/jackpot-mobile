import { View, Text, Image } from 'react-native'
import React from 'react'
import InfoBox from '../InfoBox'

const CommunityPost = ( { user } ) => {
    return (
        <View className="mb-6">
             <View className="flex flex-row items-center">
                {/* user pfp */}
                <View className="w-8 h-8 rounded-lg justify-center items-center">
                    <Image
                        source={{ uri: user?.avatar }}
                        className="w-[90%] h-[90%] rounded-full"
                        resizeMode="cover"
                    />
                </View>

                {/* username */}
                <InfoBox
                    title={`@${user?.username}`}
                    containerStyles="mt-5 ml-2"
                    titleStyles="text-md"
                />
            </View>

            {/* Title */}
            <Text className="font-hsemibold text-black text-xl ml-12">
                I just lost 50% in NVDA
            </Text>

            {/* Text */}
            <Text className="font-hregular text-black text-md ml-12">
                Title. I lost a ton of money in NVDA. Exit rn.
            </Text>

            {/* Time and Date */}
            <Text className="font-hregular text-gray-400 text-sm ml-12">
                March 24, 2024 2:15:15 PM
            </Text>

        </View>
    )
}

export default CommunityPost
