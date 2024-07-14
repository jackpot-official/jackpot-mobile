import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import axios from 'axios'
import { useGlobalContext } from '../../context/GlobalProvider'

const InvestmentReturns = () => {
    const { user } = useGlobalContext()
    const [returnsData, setReturnsData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchReturnsData = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:3000/investments/returns/get',
                    {
                        access_token: user.plaidAccessToken,
                    }
                )
                setReturnsData(response.data)
            } catch (error) {
                console.error('Error fetching investment returns:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchReturnsData()
    }, [user.plaidAccessToken])

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />
    }

    return (
        <ScrollView>
            <View>
                {returnsData &&
                    Object.keys(returnsData).map((period) => (
                        <View key={period}>
                            <Text>{period}</Text>
                            <Text>
                                % G/L:{' '}
                                {returnsData[period].percent_return.toFixed(2)}%
                                Return: $
                                {returnsData[period].absolute_return.toFixed(2)}
                            </Text>
                        </View>
                    ))}
            </View>
        </ScrollView>
    )
}

export default InvestmentReturns
