import React from 'react';
import { useAppTranslation } from '../hooks/useAppTranslation';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  const { t } = useAppTranslation();

  return (
    <button
      onClick={onClick}
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
  );
};

export default SearchButton;
