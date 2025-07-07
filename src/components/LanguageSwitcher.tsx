import useAppTranslation from '../hooks/useAppTranslation';

const LanguageSwitcher = () => {
  const { changeLanguage, currentLanguage } = useAppTranslation();

  return (
    <div className='flex items-center space-x-2'>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
          currentLanguage === 'es'
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:text-blue-600'
        }`}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
