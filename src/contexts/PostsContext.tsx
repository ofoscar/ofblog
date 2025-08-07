import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../services/api';
import type { Post as ApiPost } from '../types/post';

interface PostsContextProps {
  posts: ApiPost[];
  fetchRecentPosts: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const PostsContext = createContext<PostsContextProps | undefined>(undefined);

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: 1,
        limit: 6,
        sort: '-createdAt',
        status: 'published',
      };

      const response = await apiService.getPosts(params);

      if (response.success) {
        setPosts(response.data.posts);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (err) {
      setError('Error loading posts');
      console.error('Error fetching recent posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, fetchRecentPosts, loading, error }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
