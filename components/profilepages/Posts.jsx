import React from 'react';
import { FlatList } from 'react-native';
import CommunityPost from '../../components/posts/CommunityPost';
import VideoCard from '../../components/VideoCard';
import EmptyState from '../../components/EmptyState';

const Posts = ({ user, posts }) => {
  return (
    <>
      <CommunityPost user={user} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No posts found."
            subtitle="No videos found for this search query."
          />
        )}
      />
    </>
  );
};

export default Posts;
