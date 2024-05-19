import { View, Text, Image } from 'react-native'
import {Tabs, Redirect} from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';

import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => { // destructuring
  return (
    <View className="items-center justify-center gap-2">
      {/* <LinearGradient
        colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0)']}
        style={{ borderRadius: 12 }}
      > */}
        <Image
          source={ icon }
          resizeMode="contain"
          tintColor={ color }
          className="w-6 h-6"
        />
      {/* </LinearGradient> */}
      <Text className={ `${ focused ? 'font-psemibold' : 'font-pregular' } text-xs` }
      style={{ color }}>
        { name }
      </Text>
    </View> // like a div
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#ffa001',
          tabBarInactiveTintColor: '#ffeccc',
          tabBarStyle: {
            backgroundColor: '#1d2e28',
            borderTopWidth: 1,
            borderTopColor: '#1f493d',
            height: 84,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={ icons.home }
                color={ color }
                name="Home"
                focused={ focused }
              />
            )
          }}
        />

        <Tabs.Screen
        name="bookmark"
        options={{
          title: 'Bookmark',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={ icons.bookmark }
              color={ color }
              name="Bookmark"
              focused={ focused }
            />
          )
        }}
      />

      <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={ icons.plus }
                color={ color }
                name="Create"
                focused={ focused }
              />
            )
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={ icons.profile }
                color={ color }
                name="Profile"
                focused={ focused }
              />
            )
          }}
        />

      </Tabs>
    </>
  )
}

export default TabsLayout