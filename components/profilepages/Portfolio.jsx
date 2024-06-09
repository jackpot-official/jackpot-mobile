import React, { useRef, useState } from 'react';
import { View, Image, ScrollView, Animated, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GainLossCard from '../../components/profile/GainLossCard';
import TopHoldings from '../../components/profile/TopHoldings';
import { images } from '../../constants';
import PlaidLink, { create, open } from 'react-native-plaid-link-sdk';
// import PlaidLink from '../plaid/PlaidLink';

const { width: screenWidth } = Dimensions.get('window');

const Portfolio = ({ topHoldings, topGainers, topLosers }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(1);
  // const [disabled, setDisabled] = useState(true);
  // const [linkToken, setLinkToken] = useState("link-sandbox-cacdf4c4-bf3c-4c1d-84ef-6a92166434da");

  // const onSuccess = (linkSuccess) => {
  //   fetch('https://yourserver.com/exchange_public_token', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.Stringify({
  //       publicToken: linkSuccess.publicToken,
  //       accounts: linkSuccess.metadata.accounts,
  //       institution: linkSuccess.metadata.institution,
  //       linkSessionId: linkSuccess.metadata.linkSessionId,
  //     }),
  //   });
  // };

  // const onExit = (linkExit) => {
  //   supportHandler.report({
  //     error: linkExit.error,
  //     institution: linkExit.metadata.institution,
  //     linkSessionId: linkExit.metadata.linkSessionId,
  //     requestId: linkExit.metadata.requestId,
  //     status: linkExit.metadata.status,
  //   });
  // };

  // const handleCreateLink = () => {
  //   if (linkToken) {
  //     create({ token: linkToken });
  //     setDisabled(false);
  //     // console.log("create -- success");
  //   }
  // };

  // const handleOpenLink = () => {
  //   const openProps = {
  //     onSuccess: (success) => {
  //       console.log(success);
  //       console.log("success");
  //     },
  //     onExit: (linkExit) => {
  //       console.log(linkExit);
  //       console.log("exit");
  //     },
  //   };
  //   open(openProps);
  //   // console.log("open -- success");
  //   setDisabled(true);
  // };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1">
      <View className="items-center">
        {/* <TouchableOpacity
          style={styles.button}
          onPress={handleCreateLink}
        >
          <Text style={styles.buttonText}>Create Link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={disabled}
          style={disabled ? styles.disabledButton : styles.button}
          onPress={handleOpenLink}
        >
          <Text style={styles.buttonText}>Open Link</Text>
        </TouchableOpacity> */}

        <GainLossCard gainloss="$45,678.90" percentage="-20" />

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

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Portfolio;
