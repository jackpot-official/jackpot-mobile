import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={ images.dollaz }
            className="w-[390px] h-[252px]"
            resizeMode="contain"
          />

          <Text className="text-secondary font-pblack text-7xl mt-8">
            Dollaz
          </Text>

          {/* <Link href="/home" style= {{ color: 'blue' }}>
            Go to Home
          </Link> */}

          {/* <Image
            source = { images.cards }
            className="maz-w-[380px] w-full h-[300px]"
            resizeMethod='contain'
          /> */}

          <View className="relative mt-7">
            <Text className="text-3xl text-white font-bold text-center font-pmedium">
              Trade. Social. Earn.
              {/* <Text className="text-secondary"></Text> */}
            </Text>
            <Image
                source={ images.path }
                className="w-[124px] h-[15px] absolute -bottom-2 -right-7 opacity-90"
                resizeMode="contain"
            />
          </View>

            <CustomButton
              title="Continue with Email"
              handlePress={() => {}}
              containerStyles="w-full mt-14"
            />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

    // <View className="flex-1 items-center justify-center bg-white">
    //   <Text className="text-3xl font-pblack">DollaZ</Text>
    //   <StatusBar style="auto" />
    //   <Link href="/home" style= {{ color: 'blue' }}>
    //     Go to Home</Link>
    // </View>
