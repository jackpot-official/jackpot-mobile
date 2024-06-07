import React from 'react'
import { View, Text } from 'react-native'

const TopHoldings = ({ title, holdings, boxStyle }) => {
    return (
        <View className={`${boxStyle}`}>
            <View className="bg-white rounded-xl shadow-sm shadow-black-300 p-5 flex flex-col border border-gray-100">
                <Text className="font-hmedium text-black text-2xl">
                    Top 5 {title}
                </Text>

                <View className="mt-3">
                    {holdings.map((holding, index) => (
                        <Text
                            key={index}
                            className="font-hsemibold text-tertiary text-lg"
                        >
                            {index + 1}. {holding}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default TopHoldings
