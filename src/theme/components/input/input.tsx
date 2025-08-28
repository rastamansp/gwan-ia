import React from 'react';
import { IInputProps } from './input.types';

const Input: React.FC<IInputProps> = ({
  variant = 'classic',
  size = 'md',
  disabled = false,
  error = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const baseClasses = `
    block w-full transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder:text-gray-400
  `;

  const sizeClasses = {
    xs: 'px-2 py-1 text-xs rounded',
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-3 py-2 text-sm rounded-md',
    lg: 'px-4 py-2.5 text-base rounded-md',
    xl: 'px-4 py-3 text-lg rounded-lg',
  };

  const variantClasses = {
    classic:
      'bg-white border border-gray-300 text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500',
    surface:
      'bg-gray-50 border border-gray-300 text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500',
    soft: 'bg-gray-100 border border-gray-300 text-gray-900 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500',
    ghost:
      'bg-transparent border border-transparent text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500',
  };

  const errorClasses = error
    ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500'
    : '';

  const classes = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${errorClasses}
    ${fullWidth ? 'w-full' : ''}
    ${className || ''}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
      {leftIcon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {leftIcon}
        </div>
      )}

      <input className={classes} disabled={disabled} {...props} />

      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default Input;
