import React from 'react';
import { FlatList } from 'react-native';
import CommunityPost from '../../components/posts/CommunityPost';
import VideoCard from '../../components/VideoCard';
import EmptyState from '../../components/EmptyState';

const Posts = ({ user, posts }) => {
  return (
    <>
      <CommunityPost
        user={user}
        title="I just lost 50% in NVDA"
        body="Title. I lost a ton of mony in NVDA. Exit rn."
        datetime="March 24, 2024 2:15:15 PM"
      />

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
