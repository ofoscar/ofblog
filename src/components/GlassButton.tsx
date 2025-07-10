import React from 'react';

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

function GlassButton({ children, className = '', ...props }: GlassButtonProps) {
  return (
    <button className={`glass-button ${className}`} {...props}>
      {children}
    </button>
  );
}

export default GlassButton;
