import React from 'react';
import { useAppTranslation } from '../hooks/useAppTranslation';
import { theme } from '../theme';

const LanguageSwitcher: React.FC = () => {
  const { changeLanguage, currentLanguage, t } = useAppTranslation();
  const isSpanish = currentLanguage === 'es';

  const toggleLanguage = () => {
    const newLang = isSpanish ? 'en' : 'es';
    changeLanguage(newLang);
  };

  return (
    <div className='flex items-center'>
      <button
        onClick={toggleLanguage}
        className='cursor-pointer relative flex items-center w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        style={{
          backgroundColor: isSpanish
            ? 'rgba(59, 130, 246, 0.4)' // Blue theme to match your app
            : 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          boxShadow:
            'inset 0px -1px 2px rgba(0, 0, 0, 0.3), inset 0px 1px 2px rgba(255, 255, 255, 0.2)',
        }}
        title={t('language.switch')}
      >
        {/* Toggle circle */}
        <div
          className='absolute w-5 h-5 rounded-full transition-transform duration-300 flex items-center justify-center'
          style={{
            transform: isSpanish ? 'translateX(28px)' : 'translateX(4px)',
            backgroundColor: isSpanish
              ? '#3B82F6' // Blue-600 to match your app theme
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${
              isSpanish ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'
            }`,
            boxShadow:
              'inset 0px -1px 2px rgba(0, 0, 0, 0.1), inset 0px 1px 2px rgba(255, 255, 255, 0.8), 0 2px 4px rgba(0, 0, 0, 0.15)',
          }}
        >
          <span
            className='text-xs font-bold'
            style={{
              color: isSpanish ? '#FFFFFF' : theme.colors.text.primary,
              fontSize: '0.6rem',
            }}
          >
            {isSpanish ? 'ES' : 'EN'}
          </span>
        </div>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
