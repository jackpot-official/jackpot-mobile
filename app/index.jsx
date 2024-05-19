import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image
            source={ images.dollaz }
            className="w-[520px] h-[336px]"
            resizeMode="contain"
          />

          <Text className="text-white font-pblack text-7xl">
            Dollaz
          </Text>

          <Link href="/home" style= {{ color: 'blue' }}>
          Go to Home</Link>

          <Image
            source = { images.cards }
            className="maz-w-[380px] w-full h-[300px]"
            resizeMethod='contain'
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
