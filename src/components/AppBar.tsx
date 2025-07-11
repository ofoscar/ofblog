import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAppTranslation } from '../hooks/useAppTranslation';
import SearchComponent from './SearchComponent';
import UserAvatar from './UserAvatar';

const AppBar = () => {
  const navigate = useNavigate();
  const { t } = useAppTranslation();
  const { isAuthenticated } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        toggleSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <nav className='bg-white shadow-lg'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <div
                className='flex items-center space-x-1 cursor-pointer'
                onClick={() => navigate('/')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  style={{ color: '#BF1A2F' }}
                >
                  <path
                    fill='currentColor'
                    d='M14.66 14.18c.03.11.04.22.04.32c.03.65-.26 1.35-.73 1.78c-.22.19-.58.39-.86.47c-.88.31-1.76-.13-2.28-.64c.94-.22 1.49-.9 1.67-1.61c.12-.61-.13-1.12-.23-1.72c-.1-.58-.08-1.07.13-1.6c.15.29.31.59.5.82c.6.78 1.55 1.12 1.76 2.18M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12S6.5 2 12 2s10 4.5 10 10m-4.84.56l-.1-.2c-.16-.36-.61-.98-.61-.98c-.18-.23-.4-.44-.6-.64c-.53-.47-1.12-.8-1.63-1.29c-1.17-1.14-1.43-3.01-.68-4.45c-.75.18-1.4.58-1.96 1.03c-2.03 1.62-2.83 4.47-1.87 6.92c.03.08.06.16.06.26c0 .17-.12.32-.27.39c-.19.07-.37.03-.5-.1a.3.3 0 0 1-.13-.13c-.87-1.11-1.03-2.71-.44-3.98c-1.31 1.06-2.02 2.85-1.93 4.53c.06.39.1.78.24 1.17c.11.47.32.91.56 1.35c.84 1.34 2.31 2.31 3.89 2.5c1.68.21 3.48-.09 4.77-1.24c1.44-1.3 1.94-3.37 1.2-5.14'
                  />
                </svg>
                <h1 className='text-xl font-bold text-gray-900'>
                  {t('appbar.title')}
                </h1>
              </div>
            </div>
            <div className='flex items-center space-x-8'>
              <div className='flex space-x-8'>
                {/*  <Link
                  to='/posts'
                  className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
                >
                  {t('appbar.posts')}
                </Link> */}
                {!isAuthenticated && (
                  <>
                    <Link
                      to='/login'
                      className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
                    >
                      {t('appbar.login')}
                    </Link>
                    <Link
                      to='/signup'
                      className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors'
                    >
                      {t('appbar.signup')}
                    </Link>
                  </>
                )}
              </div>
              {/* Search Button */}
              <button
                onClick={toggleSearch}
                className='text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors flex items-center space-x-2'
                aria-label={t('appbar.search')}
                title={`${t('appbar.search')} (⌘K)`}
              >
                <svg
                  className='h-5 w-5'
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
                <span className='hidden md:block text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded border'>
                  ⌘K
                </span>
              </button>
              {isAuthenticated && <UserAvatar />}
            </div>
          </div>
        </div>
      </nav>

      {/* Search Component */}
      <SearchComponent
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default AppBar;
