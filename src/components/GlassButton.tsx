import React from 'react';

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function GlassButton({ children, onClick, className = '' }: GlassButtonProps) {
  return (
    <button className={`glass-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default GlassButton;
