import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsManagement from '../components/PostsManagement';
import { useAuth } from '../contexts/AuthContext';

export const AdminPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts'>(
    'dashboard',
  );

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, user?.role, navigate]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='bg-white shadow rounded-lg'>
          {/* Header */}
          <div className='border-b border-gray-200 px-6 py-4'>
            <h1 className='text-3xl font-bold text-gray-900'>
              Admin Dashboard
            </h1>
            <p className='text-gray-600 mt-2'>
              Welcome to the administration panel
            </p>
          </div>

          {/* Tabs */}
          <div className='border-b border-gray-200'>
            <nav className='flex space-x-8 px-6' aria-label='Tabs'>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'posts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Posts Management
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className='p-6'>
            {activeTab === 'dashboard' && (
              <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                  <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                    <h3 className='text-lg font-semibold text-blue-900 mb-2'>
                      User Management
                    </h3>
                    <p className='text-blue-700 text-sm'>
                      Manage user accounts and permissions
                    </p>
                  </div>

                  <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                    <h3 className='text-lg font-semibold text-green-900 mb-2'>
                      Content Management
                    </h3>
                    <p className='text-green-700 text-sm'>
                      Manage posts and content moderation
                    </p>
                  </div>

                  <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
                    <h3 className='text-lg font-semibold text-purple-900 mb-2'>
                      Analytics
                    </h3>
                    <p className='text-purple-700 text-sm'>
                      View site statistics and reports
                    </p>
                  </div>
                </div>

                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <svg
                        className='h-5 w-5 text-yellow-400'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div className='ml-3'>
                      <h3 className='text-sm font-medium text-yellow-800'>
                        Admin Access Verified
                      </h3>
                      <div className='mt-1 text-sm text-yellow-700'>
                        You have administrative privileges. Use this access
                        responsibly.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'posts' && <PostsManagement />}
          </div>
        </div>
      </div>
    </div>
  );
};
