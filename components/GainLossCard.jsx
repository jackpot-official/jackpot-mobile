import React from 'react';
import { View, Text } from 'react-native';

const GainLossCard = ({ gainloss, percentage }) => {
  return (
    <View className="bg-white w-2/3 m-5 rounded-xl shadow-md shadow-black-300 p-5 flex flex-col space-y-3 border border-gray-100">
        <Text className="font-hbold text-black text-2xl">
            Today's G/L
        </Text>

        <Text className="font-hbold text-red-600 text-3xl self-center">
            {gainloss}
        </Text>

        <Text className="font-hmedium text-red-400 text-lg">
            {percentage}% in the last month
        </Text>
    </View>
  );
};

export default GainLossCard;