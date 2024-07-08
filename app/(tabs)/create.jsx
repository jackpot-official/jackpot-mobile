import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createPost, createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const Create = () => {
    const { user } = useGlobalContext()
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        body: '',
    })

    const submit = async () => {
        if (!form.title || !form.body) {
            return Alert.alert('Please fill in all of the fields.')
        }

        setUploading(true)

        try {
            await createPost(form.title, form.body, user.$id)

            // Alert.alert('Success', 'Post created successfully')
            router.push('/profile')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setForm({
                title: '',
                body: '',
            })
            setUploading(false)
        }
    }

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="px-4 my-6">
                <Text className="text-2xl text-black font-hsemibold">
                    Create Post
                </Text>

                {/* Enter post title */}
                <FormField
                    title=""
                    value={form.title}
                    placeholder="Give your post a title..."
                    handleChangeText={(e) => setForm({ ...form, title: e })}
                    otherStyles="mt-3"
                />

                {/* Enter post body */}
                <FormField
                    title=""
                    value={form.body}
                    placeholder="Write the body of your post..."
                    handleChangeText={(e) => setForm({ ...form, body: e })}
                    otherStyles=""
                    boxStyles="h-52"
                />

                <View className="mt-7 space-y-2">
                    {/* <Text className="text-base text-black font-hbold">
                        Image
                    </Text> */}

                    <TouchableOpacity onPress={() => openPicker('image')}>
                        {form.thumbnail ? (
                            <Image
                                source={{ uri: form.thumbnail.uri }}
                                resizeMode="cover"
                                className="w-full h-64 rounded-2xl"
                            />
                        ) : (
                            <View className="w-full h-16 px-4 bg-primarytint-900 rounded-2xl justify-center items-center flex-row space-x-2">
                                <Image
                                    source={icons.upload}
                                    resizeMode="contain"
                                    className="w-5 h-5"
                                />
                                <Text className="text-base text-black font-hmedium">
                                    Choose a file
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Submit and publish custom button */}
                <CustomButton
                    title="Submit and publish"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Create
