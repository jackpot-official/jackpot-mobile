import { StatusBar } from 'expo-status-bar'
import { ScrollView, Text, View, Image } from 'react-native'
import { Redirect, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'

import { useGlobalContext } from '../context/GlobalProvider'

export default function App() {
    const { isLoading, isLoggedIn } = useGlobalContext()

    if (!isLoading && isLoggedIn) return <Redirect href="/home" />

    return (
        <SafeAreaView className="bg-white h-full flex-1">
            <ScrollView contentContainerStyle={{ flexGrow: 1, height: '100%' }}>
                <View className="w-full justify-center items-center min-h-[85vh]">
                    <Image
                        source={images.text_black}
                        className="w-[390px] h-[252px]"
                        resizeMode="contain"
                    />

                    <View className="relative">
                        <Image
                            source={images.zigzag}
                            className="w-[496px] h-[110px]"
                            resizeMode="contain"
                        />

                        <Text className="text-3xl text-black font-bold text-center font-hbold mt-1">
                            Trade. Social.
                            <Text className="text-tertiary font-pbold"> Earn.</Text>
                        </Text>
                    </View>

                    <CustomButton
                        title="Continue with email"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="rounded-full w-11/12 mt-12 bg-primary shadow-black-300 shadow-xl px-4"
                        textStyles="text-white text-bold text-lg font-hbold"
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    )
}
