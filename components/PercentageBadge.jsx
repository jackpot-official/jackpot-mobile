import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const PercentageBadge = ({ percentage }) => {
    const isPositive = parseFloat(percentage) >= 0
    const containerStyle = isPositive
        ? styles.containerPositive
        : styles.containerNegative
    const iconColor = isPositive ? 'green' : 'red'
    const textColor = isPositive ? styles.textPositive : styles.textNegative

    return (
        <View
            className="flex-row items-center px-2 py-1 rounded-sm"
            style={containerStyle}
        >
            <FontAwesome
                className="mr-1"
                name={isPositive ? 'caret-up' : 'caret-down'}
                size={12}
                color={iconColor}
            />
            <Text className="font-hmedium text-sm" style={textColor}>
                {percentage}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerPositive: {
        backgroundColor: '#e6f9ec',
    },
    containerNegative: {
        backgroundColor: '#fde7e7',
    },
    textPositive: {
        color: '#2b6932',
    },
    textNegative: {
        color: '#a83232',
    },
})

export default PercentageBadge
