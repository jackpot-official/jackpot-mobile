import React from 'react'
import { View, Text } from 'react-native'

const GainLossCard = ({ gainloss, percentage }) => {
    const isNegativeGainLoss = gainloss.startsWith('-')
    const isNegativePercentage = percentage.startsWith('-')
    const gainLossTextColor = isNegativeGainLoss
        ? 'text-red-600'
        : 'text-green-800'
    const percentageTextColor = isNegativePercentage
        ? 'text-red-400'
        : 'text-green-600'

    return (
        <View className="bg-white w-2/3 rounded-xl shadow-md shadow-black-300 p-5 flex flex-col space-y-3 border border-gray-100">
            <Text className="font-hmedium text-black text-2xl">
                Today's G/L
            </Text>

            <Text
                className={`font-hbold ${gainLossTextColor} text-3xl self-center`}
            >
                {gainloss}
            </Text>

            <Text className={`font-hmedium ${percentageTextColor} text-lg`}>
                {percentage}% in the last month
            </Text>
        </View>
    )
}

export default GainLossCard
