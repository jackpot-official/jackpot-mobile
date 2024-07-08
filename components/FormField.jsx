import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    boxStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-black font-hbold">{title}</Text>

            <View
                className={`border-2 border-white w-full h-16 px-4 bg-primarytint-900 rounded-2xl focus:border-primaryshade-800 items-center flex-row ${boxStyles}`}
            >
                <TextInput
                    className="flex-1 text-black font-hmedium text-lg"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#000000"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />

                {title === 'Password' && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField
