import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTranslation } from '../hooks/useAppTranslation';
import { apiService } from '../services/api';
import { theme } from '../theme';
import type { Post as ApiPost, PostsResponse } from '../types/post';
import { ReturnReadingTime } from './RecentPostsSection';

interface SearchComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchComponent = ({ isOpen, onClose }: SearchComponentProps) => {
  const { t } = useAppTranslation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ApiPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Focus input when search opens and load recent posts
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
      if (recentPosts.length === 0) {
        loadRecentPosts();
      }
    }
  }, [isOpen, recentPosts.length]);

  const loadRecentPosts = async () => {
    try {
      const response: PostsResponse = await apiService.getPosts({
        status: 'published',
        limit: 5,
        sort: '-createdAt',
      });

      if (response.success) {
        setRecentPosts(response.data.posts);
      }
    } catch (error) {
      console.error('Error loading recent posts:', error);
    }
  };

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Search posts with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        searchPosts(searchTerm);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const searchPosts = async (term: string) => {
    try {
      setLoading(true);
      const response: PostsResponse = await apiService.getPosts({
        search: term,
        status: 'published',
        limit: 8,
        sort: '-createdAt',
      });

      if (response.success) {
        setSearchResults(response.data.posts);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (post: ApiPost) => {
    navigate(`/post/${post.slug}`);
    onClose();
    setSearchTerm('');
    setShowResults(false);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20'>
      <div
        ref={searchContainerRef}
        className='bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden'
      >
        {/* Search Input */}
        <div className='p-4 border-b border-gray-200'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='h-5 w-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('appbar.searchPlaceholder')}
              className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm'
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowResults(false);
                }}
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
              >
                <svg
                  className='h-5 w-5 text-gray-400 hover:text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {showResults ? (
          <div className='max-h-96 overflow-y-auto'>
            {loading ? (
              <div className='flex items-center justify-center py-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                <span className='ml-3 text-gray-600'>
                  {t('search.searching')}
                </span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className='divide-y divide-gray-200'>
                {searchResults.map((post) => (
                  <PostResult
                    key={post._id}
                    post={post}
                    onClick={handlePostClick}
                  />
                ))}
              </div>
            ) : (
              <div className='flex items-center justify-center py-8'>
                <div className='text-center'>
                  <svg
                    className='mx-auto h-12 w-12 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.075M15.291 8.925A7.962 7.962 0 0112 7c-2.034 0-3.9-.785-5.291-2.075'
                    />
                  </svg>
                  <p className='mt-2 text-sm text-gray-600'>
                    {t('search.noResults')}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : searchTerm.length === 0 && recentPosts.length > 0 ? (
          <div className='max-h-96 overflow-y-auto'>
            <div className='px-4 py-3 bg-gray-50 border-b'>
              <h3 className='text-sm font-medium text-gray-900'>
                Recent Posts
              </h3>
            </div>
            <div className='divide-y divide-gray-200'>
              {recentPosts.map((post) => (
                <PostResult
                  key={post._id}
                  post={post}
                  onClick={handlePostClick}
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* Quick hint at bottom */}
        {!showResults && !loading && (
          <div className='px-4 py-3 bg-gray-50 border-t border-gray-200'>
            <p className='text-xs text-gray-500 text-center'>
              Type to search posts by title, content, or category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface PostResultProps {
  post: ApiPost;
  onClick: (post: ApiPost) => void;
}

const PostResult = ({ post, onClick }: PostResultProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      onClick={() => onClick(post)}
      className='p-4 hover:bg-gray-50 cursor-pointer transition-colors'
    >
      <div className='flex items-start space-x-4'>
        {/* Post Image */}
        <div className='flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden'>
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
              <span className='text-gray-400 text-xs'>No Image</span>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className='flex-1 min-w-0'>
          <h4
            className='text-sm font-semibold text-gray-900 truncate'
            style={{
              fontFamily: theme.typography.fontFamily.sans.join(', '),
            }}
          >
            {post.title}
          </h4>
          <p
            className='text-sm text-gray-600 mt-1'
            style={{
              fontFamily: theme.typography.fontFamily.sans.join(', '),
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt || post.content.substring(0, 100) + '...'}
          </p>
          <div className='flex items-center space-x-4 mt-2 text-xs text-gray-500'>
            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            <span>•</span>
            <span>
              <ReturnReadingTime minutes={post.readingTime} />
            </span>
            {post.category && (
              <>
                <span>•</span>
                <span className='text-blue-600'>{post.category}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
