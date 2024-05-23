import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ( {title, value, placeholder, handleChangeText, otherStyles, ...props } ) => {
  const [showPassword, setShowPassword] = useState(false)
  
    return (

      <View className="border-2 border-primaryshade-100 w-full h-16 px-4 bg-primarytint-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput
            className="text-base mt-0.5 text-white flex-1 font-hregular"
            value={ value }
            placeholder="Search for a post topic"
            placeholderTextColor="#eefcc5"
            onChangeText={ handleChangeText }
            secureTextEntry={ title === 'Password' && !showPassword }
        />

        <TouchableOpacity>
            <Image
                source={ icons.search }
                className="w-5 h-5"
                resizeMode='contain'
            />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput