import React from 'react'
import { View, Text, Image } from 'react-native'

const TopHoldings = ({ title, holdings, boxStyle }) => {
    return (
        <View
            className={`bg-white w-52 rounded-xl p-5 flex flex-col border border-gray-100 shadow-black-300 shadow-md ${boxStyle}`}
        >
            <Text className="font-hmedium text-black text-2xl mb-5">
                Top 5 {title}
            </Text>

            <View className="flex flex-col space-y-5">
                {holdings.map((holding, index) => (
                    <View key={index} className="flex flex-row items-center">
                        <Image
                            source={{ uri: holding.image }}
                            className="w-8 h-8 rounded-full"
                            resizeMode="cover"
                        />
                        <Text className="font-hmedium text-black text-lg ml-4">
                            {holding.symbol}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default TopHoldings
