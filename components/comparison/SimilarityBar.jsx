import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

const SimilarityBar = ({ percentage }) => {
    const animatedWidth = useRef(new Animated.Value(0)).current

    useFocusEffect(
        React.useCallback(() => {
            Animated.timing(animatedWidth, {
                toValue: percentage,
                duration: 1000, // Animation duration in milliseconds
                useNativeDriver: false, // Width animation can't use native driver
            }).start()

            return () => {
                animatedWidth.setValue(0) // Reset the animation value when screen loses focus
            }
        }, [percentage])
    )

    return (
        <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <Animated.View
                className="h-full bg-primary rounded-full"
                style={{
                    width: animatedWidth.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0%', '100%'],
                    }),
                }}
            />
        </View>
    )
}

export default SimilarityBar
