import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TipTapEditor from '../components/TipTapEditor';
import { apiService } from '../services/api';
import type { Post } from '../types/post';

const EditPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(
    'draft',
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Load post data when component mounts
  useEffect(() => {
    const loadPost = async () => {
      if (!postId) {
        setError('Post ID is required');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await apiService.getPostById(postId);

        if (response.success) {
          const post: Post = response.data.post;
          setTitle(post.title);
          setContent(post.content);
          setExcerpt(post.excerpt || '');
          setCategory(post.category || '');
          setTags(post.tags.join(', '));
          setFeaturedImage(post.featuredImage || '');
          setStatus(post.status);
        } else {
          setError(response.message || 'Failed to load post');
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title for your post');
      return;
    }

    if (!content.trim()) {
      alert('Please add some content to your post');
      return;
    }

    if (!postId) {
      alert('Post ID is missing');
      return;
    }

    setIsSaving(true);
    try {
      const postData = {
        title: title.trim(),
        content,
        excerpt: excerpt.trim() || undefined,
        category: category.trim() || undefined,
        tags: tags.trim() ? tags.split(',').map((tag) => tag.trim()) : [],
        featuredImage: featuredImage.trim() || undefined,
        status,
      };

      const response = await apiService.updatePost(postId, postData);

      if (response.success) {
        alert('Post updated successfully!');
        navigate('/admin');
      } else {
        throw new Error(response.message || 'Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert(
        `Failed to update post: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (
      window.confirm(
        'Are you sure you want to cancel? Any unsaved changes will be lost.',
      )
    ) {
      navigate('/admin');
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-center justify-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
              <span className='ml-3 text-gray-600'>Loading post...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='text-center'>
              <div className='text-red-600 text-lg font-medium mb-2'>Error</div>
              <p className='text-gray-600 mb-4'>{error}</p>
              <button
                onClick={() => navigate('/admin')}
                className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors'
              >
                Back to Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Top Bar */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold text-gray-900'>Edit Post</h1>
              <div className='flex gap-3'>
                <button
                  onClick={handleCancel}
                  className='px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500'
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className='px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  {isSaving ? 'Updating...' : 'Update Post'}
                </button>
              </div>
            </div>
          </div>

          {/* Title Field */}
          <div className='px-6 py-4'>
            <input
              type='text'
              placeholder='Enter your post title...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='w-full text-3xl font-bold placeholder-gray-400 border-none focus:outline-none focus:ring-0 resize-none'
              autoFocus
            />
          </div>
        </div>

        {/* Post Metadata */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
          <div className='px-6 py-4'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>
              Post Details
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              {/* Category */}
              <div>
                <label
                  htmlFor='category'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Category
                </label>
                <input
                  id='category'
                  type='text'
                  placeholder='e.g., Technology, Travel, Food'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor='status'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Status
                </label>
                <select
                  id='status'
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as 'draft' | 'published' | 'archived',
                    )
                  }
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='draft'>Draft</option>
                  <option value='published'>Published</option>
                  <option value='archived'>Archived</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className='mb-4'>
              <label
                htmlFor='tags'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Tags
              </label>
              <input
                id='tags'
                type='text'
                placeholder='Enter tags separated by commas (e.g., react, javascript, web)'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <p className='mt-1 text-sm text-gray-500'>
                Separate multiple tags with commas
              </p>
            </div>

            {/* Featured Image */}
            <div className='mb-4'>
              <label
                htmlFor='featuredImage'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Featured Image URL
              </label>
              <input
                id='featuredImage'
                type='url'
                placeholder='https://example.com/image.jpg'
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <p className='mt-1 text-sm text-gray-500'>
                Enter the URL of the image to display as the post's featured
                image
              </p>
              {featuredImage && (
                <div className='mt-3'>
                  <p className='text-sm font-medium text-gray-700 mb-2'>
                    Preview:
                  </p>
                  <img
                    src={featuredImage}
                    alt='Featured image preview'
                    className='w-full max-w-md h-48 object-cover rounded-md border border-gray-300'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor='excerpt'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Excerpt
              </label>
              <textarea
                id='excerpt'
                placeholder='Write a brief description of your post...'
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
              />
              <p className='mt-1 text-sm text-gray-500'>
                This will be shown as a preview of your post
              </p>
            </div>
          </div>
        </div>

        {/* Editor Container */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
          <TipTapEditor
            content={content}
            onChange={setContent}
            placeholder='Start writing your post...'
          />
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
