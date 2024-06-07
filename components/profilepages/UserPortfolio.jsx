import React, { useRef, useState } from 'react';
import { View, Image, ScrollView, Animated, Dimensions } from 'react-native';
import GainLossCard from '../../components/profile/GainLossCard';
import TopHoldings from '../../components/profile/TopHoldings';
import { images } from '../../constants';

const { width: screenWidth } = Dimensions.get('window');

const UserPortfolio = ({ topHoldings, topGainers, topLosers }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(1);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1">
      <View className="items-center">
        <GainLossCard gainloss="-$45,678.90" percentage="-20" />

        <View className="bg-white border border-gray-100 rounded-xl p-2 shadow-lg mt-4">
          <Image
            source={images.chart}
            className="w-96 h-72 rounded-xl"
            resizeMode="contain"
          />
        </View>

        <View style={{ position: 'relative', width: '100%' }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4"
            onContentSizeChange={(w) => setContentWidth(w)}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            <View className="flex flex-row mx-4">
              <TopHoldings holdings={topHoldings} title="Holdings" boxStyle="mr-4" />
              <TopHoldings holdings={topGainers} title="Gainers" boxStyle="mr-4" />
              <TopHoldings holdings={topLosers} title="Losers" boxStyle="mr-4" />
            </View>
          </ScrollView>

          {contentWidth > screenWidth && (
            <View style={{ height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, marginTop: 8, overflow: 'hidden', width: '90%', alignSelf: 'center' }}>
              <Animated.View
                style={{
                  height: 8,
                  backgroundColor: '#043725',
                  borderRadius: 4,
                  width: scrollX.interpolate({
                    inputRange: [0, contentWidth - screenWidth],
                    outputRange: [screenWidth / contentWidth * screenWidth, screenWidth],
                    extrapolate: 'clamp',
                  }),
                  transform: [{
                    translateX: scrollX.interpolate({
                      inputRange: [0, contentWidth - screenWidth],
                      outputRange: [0, screenWidth - screenWidth / contentWidth * screenWidth],
                      extrapolate: 'clamp',
                    }),
                  }],
                }}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserPortfolio;
