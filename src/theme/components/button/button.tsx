import React from 'react';
import { IButtonProps } from './button.types';

const Button: React.FC<IButtonProps> = ({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 text-sm rounded-md',
    lg: 'px-6 py-3 text-base rounded-md',
    xl: 'px-8 py-3 text-lg rounded-lg',
  };

  const variantClasses = {
    solid: 'text-white shadow-sm',
    soft: 'text-current shadow-sm',
    surface: 'text-current shadow-sm',
    outline: 'border-2 text-current bg-transparent',
    ghost: 'text-current bg-transparent hover:bg-gray-100',
  };

  const colorClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    neutral: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    accent: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    gray: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    error: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
  };

  const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${colorClasses[color]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <button className={classes} disabled={loading} {...props}>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
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
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
