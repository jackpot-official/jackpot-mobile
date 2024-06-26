import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

const SimilarityBar = ({ percentage }) => {
    const animatedWidth = useRef(new Animated.Value(0)).current

    useFocusEffect(
        React.useCallback(() => {
            Animated.timing(animatedWidth, {
                toValue: percentage,
                duration: 1000,
                useNativeDriver: false,
            }).start()

            return () => {
                animatedWidth.setValue(0)
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
