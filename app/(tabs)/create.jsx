import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Video } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router';

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === 'image'
      ? ['image/png', 'image/jpg']
      : ['video/mp4', 'video/gif']
    })

    if(!result.canceled) {
      if(selectType === 'image') {
        setForm({...form, thumbnail: result.assets[0]})
      }
      if(selectType === 'video') {
        setForm({...form, video: result.assets[0]})
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  const submit = () => {
    if(!form.prompt || !form.title || !form.video || !form.thumbnail){
      return Alert.alert("Please fill in all of the fields.")
    }

    setUploading(true);

    try {
      
      Alert.alert('Success', "Post uploaded successfully");
      router.push('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })

      setUploading(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-hsemibold">
          Upload video
        </Text>

        {/* Enter video title */}
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({...form, title: e})}
          otherStyles="mt-10"
        />

        {/* Upload Video */}
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-hmedium">
            Upload video
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            { form.video ?  (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 horder border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={ icons.upload }
                    resizeMode='contain'
                    className="w-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Upload thumbnail image */}
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-hmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker('image')}>
            { form.thumbnail ?  (
              <Image 
                source={{uri: form.thumbnail.uri}}
                resizeMode='cover'
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                  <Image
                    source={ icons.upload }
                    resizeMode='contain'
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-gray-100 font-hmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Enter AI Prompt */}
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({...form, prompt: e})}
          otherStyles="mt-7"
        />

        {/* Submit and publish custom button */}
        <CustomButton
          title='Submit and publish'
          handlePress={ submit }
          containerStyles="mt-7"
          isLoading={ uploading }
        />

      </ScrollView>
    </SafeAreaView>
  )
}

export default Create