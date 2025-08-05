import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppTranslation } from '../hooks/useAppTranslation';
import SearchButton from './SearchButton';
import SearchComponent from './SearchComponent';
import UserAvatar from './UserAvatar';

interface TransparentAppBarProps {
  className?: string;
}

const TransparentAppBar: React.FC<TransparentAppBarProps> = ({
  className = '',
}) => {
  const navigate = useNavigate();
  const { t } = useAppTranslation();
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
      {/* Transparent AppBar with adaptive styling */}
      <nav
        className={`absolute top-0 left-0 right-0 z-20 bg-transparent ${className} px-4`}
      >
        <div className='max-w-4xl mx-auto py-4'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <div
                className='flex items-center space-x-1 cursor-pointer group backdrop-blur-sm bg-white/10 hover:bg-white/20 p-2 rounded-full'
                onClick={() => navigate('/')}
              >
                <div className=' transition-all duration-300 '>
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
                </div>
                <h1 className='text-xl font-bold text-white drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl'>
                  {t('appbar.title')}
                </h1>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='bg-white/10 backdrop-blur-sm rounded-full p-1 transition-all duration-300 hover:bg-white/20'>
                <SearchButton onClick={toggleSearch} variant='transparent' />
              </div>
              <UserAvatar />
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

export default TransparentAppBar;
