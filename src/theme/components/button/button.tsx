import React from 'react';
import { clsx } from 'clsx';
import { IButtonProps } from './button.types';

export const Button: React.FC<IButtonProps> = ({
  variant = 'solid',
  size = 'md',
  color = 'accent',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  className,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = clsx(
    // Base styles
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'active:scale-95',
    
    // Size variants
    size === 'xs' && 'px-2 py-1 text-xs rounded',
    size === 'sm' && 'px-3 py-1.5 text-sm rounded',
    size === 'md' && 'px-4 py-2 text-sm rounded-md',
    size === 'lg' && 'px-6 py-2.5 text-base rounded-md',
    size === 'xl' && 'px-8 py-3 text-lg rounded-lg',
    
    // Width
    fullWidth && 'w-full',
    
    // Color and variant combinations
    variant === 'solid' && color === 'accent' && [
      'bg-accent-primary text-white',
      'hover:bg-accent-primaryHover focus:ring-accent-primary',
      'disabled:hover:bg-accent-primary'
    ],
    variant === 'solid' && color === 'gray' && [
      'bg-gray-mutedText text-white',
      'hover:bg-gray-strongMutedText focus:ring-gray-mutedText',
      'disabled:hover:bg-gray-mutedText'
    ],
    variant === 'solid' && color === 'success' && [
      'bg-success-primary text-white',
      'hover:bg-success-primaryHover focus:ring-success-primary',
      'disabled:hover:bg-success-primary'
    ],
    variant === 'solid' && color === 'warning' && [
      'bg-warning-primary text-white',
      'hover:bg-warning-primaryHover focus:ring-warning-primary',
      'disabled:hover:bg-warning-primary'
    ],
    variant === 'solid' && color === 'error' && [
      'bg-error-primary text-white',
      'hover:bg-error-primaryHover focus:ring-error-primary',
      'disabled:hover:bg-error-primary'
    ],
    
    variant === 'soft' && color === 'accent' && [
      'bg-accent-muted text-accent-primaryLight',
      'hover:bg-accent-border focus:ring-accent-primary',
      'disabled:hover:bg-accent-muted'
    ],
    variant === 'soft' && color === 'gray' && [
      'bg-gray-muted text-gray-veryStrongText',
      'hover:bg-gray-border focus:ring-gray-mutedText',
      'disabled:hover:bg-gray-muted'
    ],
    
    variant === 'surface' && color === 'accent' && [
      'bg-accent-surface text-accent-primaryLight border border-accent-border',
      'hover:bg-accent-muted focus:ring-accent-primary',
      'disabled:hover:bg-accent-surface'
    ],
    variant === 'surface' && color === 'gray' && [
      'bg-gray-surface text-gray-veryStrongText border border-gray-border',
      'hover:bg-gray-muted focus:ring-gray-mutedText',
      'disabled:hover:bg-gray-surface'
    ],
    
    variant === 'outline' && color === 'accent' && [
      'bg-transparent text-accent-primaryLight border border-accent-border',
      'hover:bg-accent-surface focus:ring-accent-primary',
      'disabled:hover:bg-transparent'
    ],
    variant === 'outline' && color === 'gray' && [
      'bg-transparent text-gray-veryStrongText border border-gray-border',
      'hover:bg-gray-surface focus:ring-gray-mutedText',
      'disabled:hover:bg-transparent'
    ],
    
    variant === 'ghost' && color === 'accent' && [
      'bg-transparent text-accent-primaryLight',
      'hover:bg-accent-surface focus:ring-accent-primary',
      'disabled:hover:bg-transparent'
    ],
    variant === 'ghost' && color === 'gray' && [
      'bg-transparent text-gray-veryStrongText',
      'hover:bg-gray-surface focus:ring-gray-mutedText',
      'disabled:hover:bg-transparent'
    ],
    
    // Custom classes
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
