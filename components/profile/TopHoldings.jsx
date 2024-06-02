import React from 'react'
import { View, Text } from 'react-native'

const TopHoldings = ({ holdings }) => {
    return (
        <View className="w-11/12 px-5">
            <View className="bg-white rounded-xl shadow-md shadow-black-300 p-5 flex flex-col border border-gray-100">
                <Text className="font-hmedium text-black text-2xl">
                    Top 5 Holdings
                </Text>

                <View className="mt-3">
                    {holdings.map((holding, index) => (
                        <Text
                            key={index}
                            className="font-hmedium text-tertiary text-2xl"
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
