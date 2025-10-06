import React from 'react';

interface TouchButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  fullWidth?: boolean;
}

const TouchButton: React.FC<TouchButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
}) => {
  const baseStyles = `
    font-bold rounded-2xl shadow-xl transition-all transform 
    touch-manipulation focus:outline-none focus:ring-4 focus:ring-offset-2
    active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2 sm:gap-3
    ${fullWidth ? 'w-full' : ''}
  `.trim();

  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 text-white focus:ring-blue-500',
    secondary: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 active:from-gray-700 active:to-gray-800 text-white focus:ring-gray-500',
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 text-white focus:ring-green-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 active:from-yellow-700 active:to-yellow-800 text-white focus:ring-yellow-500',
    info: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 active:from-purple-700 active:to-pink-700 text-white focus:ring-purple-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm min-h-[40px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[48px]',
    xl: 'px-10 py-5 text-xl min-h-[56px]',
  };

  const buttonClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      style={{
        WebkitTapHighlightColor: 'transparent', // Remove highlight on Android
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      {children}
    </button>
  );
};

export default TouchButton;
