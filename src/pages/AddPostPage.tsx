import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TipTapEditor from '../components/TipTapEditor';

const AddPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a title for your post');
      return;
    }

    setIsSaving(true);
    try {
      // TODO: Implement API call to save post
      console.log('Saving post:', { title, content });

      // For now, just navigate back to admin
      navigate('/admin');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (
        window.confirm(
          'You have unsaved changes. Are you sure you want to leave?',
        )
      ) {
        navigate('/admin');
      }
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Top Bar */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold text-gray-900'>
                Create New Post
              </h1>
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
                  {isSaving ? 'Saving...' : 'Save Post'}
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

export default AddPostPage;
