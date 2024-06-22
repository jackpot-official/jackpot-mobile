import { View, Text, Image } from 'react-native'
import React from 'react'
import InfoBox from '../InfoBox'

// add like_count, comment_count, comments[] as parameters
const CommunityPost = ( { user, title, body, datetime } ) => {
    return (
        <View className="mb-6">
             <View className="flex flex-row items-center">
                {/* user pfp */}
                <View className="ml-4 w-10 h-10 rounded-lg justify-center items-center">
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
            <Text className="font-hsemibold text-black text-xl ml-16">
                { title }
            </Text>

            {/* Text */}
            <Text className="font-hregular text-black text-md ml-16">
                { body }
            </Text>

            {/* Time and Date */}
            <Text className="font-hregular text-gray-400 text-sm ml-16">
                { datetime }
            </Text>

            {/* Add like and comment clickable icons */}
            {/* like button - implement logic where like_count increases by 1 */}
            {/* comment button that allows seeing content of comments[]. in this page, should be able to create a comment */}

        </View>
    )
}

export default CommunityPost
