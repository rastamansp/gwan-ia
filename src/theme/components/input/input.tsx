import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { IInputProps } from './input.types';

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      variant = 'classic',
      size = 'md',
      color = 'accent',
      disabled = false,
      error = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses = clsx(
      // Base styles
      'block w-full transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-9',
      
      // Size variants
      size === 'xs' && 'px-2 py-1 text-xs rounded',
      size === 'sm' && 'px-3 py-1.5 text-sm rounded',
      size === 'md' && 'px-3 py-2 text-sm rounded-md',
      size === 'lg' && 'px-4 py-2.5 text-base rounded-md',
      size === 'xl' && 'px-4 py-3 text-lg rounded-lg',
      
      // Width
      fullWidth && 'w-full',
      
      // Variant and color combinations
      variant === 'classic' && [
        'bg-white border border-gray-border text-gray-black',
        'hover:border-gray-secondary focus:border-accent-border focus:ring-accent-primary',
        'disabled:hover:border-gray-border disabled:focus:border-gray-border disabled:focus:ring-0'
      ],
      
      variant === 'surface' && [
        'bg-gray-surface border border-gray-border text-gray-black',
        'hover:border-gray-secondary focus:border-accent-border focus:ring-accent-primary',
        'disabled:hover:border-gray-border disabled:focus:border-gray-border disabled:focus:ring-0'
      ],
      
      variant === 'soft' && [
        'bg-gray-muted border border-gray-border text-gray-black',
        'hover:border-gray-secondary focus:border-accent-border focus:ring-accent-primary',
        'disabled:hover:border-gray-border disabled:focus:border-gray-border disabled:focus:ring-0'
      ],
      
      variant === 'ghost' && [
        'bg-transparent border border-transparent text-gray-black',
        'hover:bg-gray-surface hover:border-gray-border focus:border-accent-border focus:ring-accent-primary',
        'disabled:hover:bg-transparent disabled:hover:border-transparent disabled:focus:border-transparent disabled:focus:ring-0'
      ],
      
      // Error state
      error && [
        'border-error-primary text-error-text',
        'focus:border-error-primaryHover focus:ring-error-primary',
        'hover:border-error-primaryHover'
      ],
      
      // Custom classes
      className
    );

    const containerClasses = clsx(
      'relative',
      fullWidth && 'w-full'
    );

    const iconClasses = clsx(
      'absolute top-1/2 transform -translate-y-1/2 text-gray-mutedText',
      size === 'xs' && 'w-3 h-3',
      size === 'sm' && 'w-4 h-4',
      size === 'md' && 'w-4 h-4',
      size === 'lg' && 'w-5 h-5',
      size === 'xl' && 'w-5 h-5'
    );

    const inputPaddingClasses = clsx(
      leftIcon && size === 'xs' && 'pl-6',
      leftIcon && size === 'sm' && 'pl-8',
      leftIcon && size === 'md' && 'pl-8',
      leftIcon && size === 'lg' && 'pl-10',
      leftIcon && size === 'xl' && 'pl-10',
      rightIcon && size === 'xs' && 'pr-6',
      rightIcon && size === 'sm' && 'pr-8',
      rightIcon && size === 'md' && 'pr-8',
      rightIcon && size === 'lg' && 'pr-10',
      rightIcon && size === 'xl' && 'pr-10'
    );

    return (
      <div className={containerClasses}>
        {leftIcon && (
          <div className={clsx(iconClasses, 'left-2')}>
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={clsx(baseClasses, inputPaddingClasses)}
          disabled={disabled}
          {...props}
        />
        
        {rightIcon && (
          <div className={clsx(iconClasses, 'right-2')}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
