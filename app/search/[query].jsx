import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import useAppwrite from '../../lib/useAppwrite';
import { searchPosts } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={ posts }
        keyExtractor={ ( item ) => item.$id }
        renderItem={({ item }) => (
          <VideoCard
            video={ item }
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-hmedium text-sm text-gray-100">
                Search Results
              </Text>
              <Text className="text-2xl font-hsemibold text-white">
                { query }
              </Text>

              <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View>
            </View>
          </>
          )}

          ListEmptyComponent={() => (
            <EmptyState
              title="No posts found."
              subtitle="No videos found for this search query."
            />
          )}
      />
    </SafeAreaView>
  )
}

export default Search