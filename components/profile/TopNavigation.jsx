import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { icons } from '../../constants';

const TopNavigation = ({ logout }) => {
  return (
    <View className="w-full flex-row justify-between items-center px-4 py-2 bg-white">
      <TouchableOpacity>
        <Image
          source={icons.menu}
          resizeMode="contain"
          className="w-6 h-6"
        />
      </TouchableOpacity>

      <Text className="text-xl font-semibold">Profile</Text>

      <TouchableOpacity onPress={logout}>
        <Image
          source={icons.logout}
          resizeMode="contain"
          className="w-6 h-6"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopNavigation;
