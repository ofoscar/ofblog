import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import type { Post, PostsResponse } from '../types/post';

interface PostsManagementProps {
  className?: string;
}

const PostsManagement = ({ className = '' }: PostsManagementProps) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async (page = 1, status = '', search = '') => {
    try {
      setLoading(true);
      setError(null);

      const params: any = {
        page,
        limit: 10,
        sort: '-createdAt',
      };

      if (status) params.status = status;
      if (search.trim()) params.search = search.trim();

      const response: PostsResponse = await apiService.getPosts(params);

      if (response.success) {
        setPosts(response.data.posts);
        setTotalPages(response.data.pagination.pages);
        setCurrentPage(response.data.pagination.page);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (err) {
      setError('Error loading posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage, statusFilter, searchTerm);
  }, [currentPage, statusFilter]);

  const handleStatusChange = async (postId: string, newStatus: string) => {
    try {
      const response = await apiService.updatePostStatus(postId, newStatus);
      if (response.success) {
        // Refresh the posts list
        await fetchPosts(currentPage, statusFilter, searchTerm);
      } else {
        setError('Failed to update post status');
      }
    } catch (err) {
      setError('Error updating post status');
      console.error('Error updating post status:', err);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await apiService.deletePost(postId);
      if (response.success) {
        // Refresh the posts list
        await fetchPosts(currentPage, statusFilter, searchTerm);
      } else {
        setError('Failed to delete post');
      }
    } catch (err) {
      setError('Error deleting post');
      console.error('Error deleting post:', err);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchPosts(1, statusFilter, searchTerm);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading && posts.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className='p-6 border-b border-gray-200'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900'>
              Posts Management
            </h2>
            <p className='text-gray-600 text-sm'>
              Manage all blog posts and their status
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-2'>
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Search posts...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <button
                onClick={handleSearch}
                className='px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                Search
              </button>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>All Status</option>
              <option value='published'>Published</option>
              <option value='draft'>Draft</option>
              <option value='archived'>Archived</option>
            </select>

            <button
              onClick={() => {
                navigate('/admin/add-post');
              }}
              className='px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
            >
              Add New Post
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className='p-4 bg-red-50 border-l-4 border-red-400'>
          <p className='text-red-700'>{error}</p>
        </div>
      )}

      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Post
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Author
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Stats
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {posts.map((post) => (
              <tr key={post._id} className='hover:bg-gray-50'>
                <td className='px-6 py-4'>
                  <div>
                    <div className='text-sm font-medium text-gray-900 truncate max-w-xs'>
                      {post.title}
                    </div>
                    <div className='text-sm text-gray-500'>
                      {post.category} • {post.readingTime} min read
                    </div>
                    {post.tags.length > 0 && (
                      <div className='flex flex-wrap gap-1 mt-1'>
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className='text-xs text-gray-500'>
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 h-8 w-8'>
                      {post.author.avatar ? (
                        <img
                          className='h-8 w-8 rounded-full'
                          src={post.author.avatar}
                          alt={`${post.author.firstName} ${post.author.lastName}`}
                        />
                      ) : (
                        <div className='h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-700'>
                          {post.author.firstName[0]}
                          {post.author.lastName[0]}
                        </div>
                      )}
                    </div>
                    <div className='ml-3'>
                      <div className='text-sm font-medium text-gray-900'>
                        {post.author.firstName} {post.author.lastName}
                      </div>
                      <div className='text-sm text-gray-500'>
                        @{post.author.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4'>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(
                      post.status,
                    )}`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className='px-6 py-4 text-sm text-gray-500'>
                  <div>
                    <div>{post.views} views</div>
                    <div>{post.likeCount} likes</div>
                    <div>{post.commentCount} comments</div>
                  </div>
                </td>
                <td className='px-6 py-4 text-sm text-gray-500'>
                  <div>
                    <div>Created: {formatDate(post.createdAt)}</div>
                    {post.publishedAt && (
                      <div>Published: {formatDate(post.publishedAt)}</div>
                    )}
                  </div>
                </td>
                <td className='px-6 py-4 text-sm font-medium space-y-2'>
                  <div className='flex flex-col gap-1'>
                    <button
                      onClick={() => navigate(`/admin/edit-post/${post._id}`)}
                      className='text-xs text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors'
                    >
                      Edit
                    </button>
                    <select
                      value={post.status}
                      onChange={(e) =>
                        handleStatusChange(post._id, e.target.value)
                      }
                      className='text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
                    >
                      <option value='draft'>Draft</option>
                      <option value='published'>Published</option>
                      <option value='archived'>Archived</option>
                    </select>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className='text-xs text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-2 py-1 rounded transition-colors'
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {posts.length === 0 && !loading && (
        <div className='text-center py-12'>
          <p className='text-gray-500'>No posts found</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='px-6 py-4 border-t border-gray-200 flex items-center justify-between'>
          <div className='text-sm text-gray-700'>
            Page {currentPage} of {totalPages}
          </div>
          <div className='flex space-x-2'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className='px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className='px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
            >
              Next
            </button>
          </div>
        </div>
      )}

      {loading && posts.length > 0 && (
        <div className='absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        </div>
      )}
    </div>
  );
};

export default PostsManagement;
