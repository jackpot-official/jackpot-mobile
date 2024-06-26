import React from 'react'
import { View, Text } from 'react-native'

// Components
import PercentageBadge from '../PercentageBadge'
import SimilarityBar from './SimilarityBar'

const ComparisonCard = ({ percentage }) => {
    return (
        <View className="p-4 bg-white rounded-lg shadow-md">
            <Text className="text-gray-700 mb-2">Similarity Percentage</Text>
            <View className="flex-row items-center mb-4">
                <Text className="text-6xl font-bold text-gray-900 mr-2">
                    {percentage}
                </Text>
                <PercentageBadge percentage={5} />
            </View>
            <SimilarityBar percentage={percentage} />
        </View>
    )
}

export default ComparisonCard
