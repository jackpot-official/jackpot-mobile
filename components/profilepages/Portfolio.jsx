import React, { useRef, useState, Component, useEffect } from 'react';
import { View, Image, ScrollView, Animated, Dimensions, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import GainLossCard from '../../components/profile/GainLossCard';
import TopHoldings from '../../components/profile/TopHoldings';
import { images } from '../../constants';
import {
  LinkExit,
  LinkEvent,
  LinkLogLevel,
  LinkSuccess,
  dismissLink,
  LinkOpenProps,
  usePlaidEmitter,
  LinkIOSPresentationStyle,
  LinkTokenConfiguration,
  EmbeddedLinkView,
} from 'react-native-plaid-link-sdk';

import {create, open} from 'react-native-plaid-link-sdk/dist/PlaidLink';
import axios from 'axios';

const { width: screenWidth } = Dimensions.get('window');

const Portfolio = ({ topHoldings, topGainers, topLosers }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [contentWidth, setContentWidth] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [holdings, setHoldings] = useState(null);

  const [linkToken, setLinkToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchLinkToken = async () => {
        try {
            const response = await axios.post('http://localhost:3000/create_link_token');
            console.log(response);
            setLinkToken(response.data.link_token);
        } catch (error) {
            console.error('Error fetching link token:', error);
        }
    };

    fetchLinkToken();
  }, []);

  const createLinkOpenProps = () => {
    return {
      onSuccess: async (success) => {
        console.log('Success: ', success);
        try {
          const response = await axios.post('http://localhost:3000/api/set_access_token', {
            public_token: success.publicToken,
          });
          setAccessToken(response.data.access_token);
          Alert.alert('Success', 'Access token set successfully');
        } catch (error) {
          console.error('Error setting access token', error);
          Alert.alert('Error', 'Failed to set access token');
        }
      },
      onExit: (linkExit) => {
        console.log('Exit: ', linkExit);
        dismissLink();
      },
      iOSPresentationStyle: LinkIOSPresentationStyle.MODAL,
      logLevel: LinkLogLevel.ERROR,
    };
  };

  const fetchHoldings = async () => {
    if (!accessToken) {
      Alert.alert('Error', 'Access token is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/investments/holdings/get', {
        access_token: accessToken
      });
      console.log(response.data);
      setHoldings(response.data);
      Alert.alert('Success', 'Holdings fetched successfully');
    } catch (error) {
      console.error('Error fetching holdings', error);
      Alert.alert('Error', 'Failed to fetch holdings');
    }
  };

  usePlaidEmitter((event) => {
    if (event.eventName === 'SUCCESS') {
      setAccessToken(event.metadata.publicToken);
    }
  });


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}className="flex-1">
      <View className="items-center">

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (linkToken) {
              create({ token: linkToken });
              setDisabled(false);
            }
          }}>
          <Text style={styles.button}>Create Link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={disabled}
          style={disabled ? styles.disabledButton : styles.button}
          onPress={() => {
            const openProps = createLinkOpenProps();
            open(openProps);
            setDisabled(true);
          }}>
          <Text style={styles.button}>Open Link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={fetchHoldings}>
          <Text style={styles.button}>Fetch Holdings</Text>
        </TouchableOpacity>

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
    elevation: 8,
    backgroundColor: '#2196F3',
    width: '90%',
    margin: 4,
    paddingVertical: 4,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    borderRadius: 4,
    alignSelf: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
  },
  disabledButton: {
    elevation: 8,
    backgroundColor: '#2196F3',
    width: '90%',
    margin: 4,
    paddingVertical: 4,
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    borderRadius: 4,
    alignSelf: 'center',
    textTransform: 'uppercase',
    overflow: 'hidden',
    opacity: 0.5,
  },
  input: {
    height: 40,
    margin: 12,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    padding: 10,
    borderColor: '#000000',
  },
  embedded: {
    width: '95%',
    alignSelf: 'center',
    height: 360,
  },
});

export default Portfolio;
