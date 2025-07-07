import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

const AppBar = () => {
  const { t } = useTranslation();

  return (
    <nav className='bg-white shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link
              to='/'
              className='text-2xl font-bold text-gray-900 hover:text-blue-600'
            >
              {t('appbar.title')}
            </Link>
          </div>
          <div className='flex items-center space-x-8'>
            <div className='flex space-x-8'>
              <Link
                to='/main'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                {t('appbar.main')}
              </Link>
              <Link
                to='/posts'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                {t('appbar.posts')}
              </Link>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AppBar;
