import React from 'react' // rnfe
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Special layout included in route group as authorization screen doesn't have navigation bar.

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false
        }}
        />

        <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false
        }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default AuthLayout
