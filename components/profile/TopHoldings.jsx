import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider'
import { images } from '../../constants'

const TopHoldings = ({ title, holdings, boxStyle }) => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext()

    useEffect(() => {
        console.log(
            'TopHoldings.jsx holdings passed from Portfolio.jsx:',
            holdings
        )
    }, [holdings])

    return (
        <View
            className={`bg-white w-52 rounded-xl p-5 flex flex-col border border-gray-100 shadow-black-300 shadow-md ${boxStyle}`}
        >
            <Text className="font-hmedium text-black text-2xl mb-5">
                Top 5 {title}
            </Text>

            <View className="flex flex-col space-y-5">
                {holdings.map((holding, index) => (
                    <View key={index} className="flex flex-row items-center">
                        {/* Displaying the name of the security */}
                        <View className="w-8 h-8 rounded-full overflow-hidden">
                            <Image
                                source={
                                    holding.image
                                        ? { uri: holding.image }
                                        : images.logo
                                }
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <Text className="font-hmedium text-black text-lg ml-4">
                            {holding.security.ticker_symbol}
                            {/* - $ {holding.institution_value.toFixed(2)} */}
                        </Text>
                    </View>
                ))}
                <Text className="text-xs">Logos provided by Parqet</Text>
            </View>
        </View>
    )
}

export default TopHoldings
