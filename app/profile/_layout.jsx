import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'


const ProfileLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="followers"
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="following"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>

            <StatusBar backgroundColor="#161622" style="light" />
        </>
    )
}

export default ProfileLayout
