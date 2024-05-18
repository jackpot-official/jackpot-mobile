// src/app/index.js

import { registerRootComponent } from 'expo';

import { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../constants';
import { 
    Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome 
} from '../components';

// const Stack = createStackNavigator();

const Home = () => {

    const router = useRouter();

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={icons.profile} dimension="100%" />
                    ),
                    headerTitle: ""
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    style={{
                        flex: 1,
                        padding: SIZES.medium
                    }}
                </View>

                <Welcome

                />

                <Popularjobs />

                <Nearbyjobs />

            </ScrollView>
        </SafeAreaView>
    )
}

// export default Home;
registerRootComponent(Home);
