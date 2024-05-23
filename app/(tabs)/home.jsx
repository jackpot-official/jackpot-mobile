import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';

const Home = () => {
  const [refreshing, setRefreshing ] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // re call videos -> if new videos appear
    setRefreshing(false);
  }

  return (
    // border-red-500
    <SafeAreaView className="bg-primary border-2 h-full">
      <FlatList
        // data={[ {id: 1}, {id: 2}, {id: 3} ]}
        data={[]}
        keyExtractor={ ( item ) => item.id }
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">
            { item.id }
          </Text>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Riya Dev
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={ images.dollaz }
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>

            <SearchInput

            />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lightgreen text-lg font-pregular">
                Latest Posts
              </Text>

              <Trending posts={[{id: 1}, {id: 2}, {id: 3}] ?? []} />
            </View>

          </View>
          )}

          ListEmptyComponent={() => (
            <EmptyState
            title="No posts found."
            subtitle="Be the first to create a post."
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
      />
    </SafeAreaView>
  )
}

export default Home