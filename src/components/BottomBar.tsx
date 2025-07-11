import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const BottomBar: React.FC = () => {
  return (
    <div
      className='fixed bottom-4 right-4 z-40 p-3 rounded-2xl shadow-lg'
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}
    >
      <LanguageSwitcher />
    </div>
  );
};

export default BottomBar;
