import { View, Text } from 'react-native'
import React from 'react'

const LineSeparator = () => {
    return (
        <View
            className="border-b border-gray-200 shadow-md"
            style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}
        />
    )
}

export default LineSeparator
