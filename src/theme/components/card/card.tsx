import React from 'react';
import { clsx } from 'clsx';
import { ICardProps } from './card.types';

export const Card: React.FC<ICardProps> = ({
  variant = 'surface',
  size = 'md',
  padding = 'default',
  children,
  className,
  ...props
}) => {
  const baseClasses = clsx(
    // Base styles
    'rounded-lg transition-all duration-200',
    
    // Size variants
    size === 'xs' && 'text-xs',
    size === 'sm' && 'text-sm',
    size === 'md' && 'text-base',
    size === 'lg' && 'text-lg',
    size === 'xl' && 'text-xl',
    
    // Padding variants
    padding === 'none' && 'p-0',
    padding === 'xs' && 'p-2',
    padding === 'sm' && 'p-3',
    padding === 'md' && 'p-4',
    padding === 'lg' && 'p-6',
    padding === 'xl' && 'p-8',
    padding === '2xl' && 'p-12',
    
    // Variant combinations
    variant === 'surface' && [
      'bg-white border border-gray-border text-gray-black',
      'hover:border-gray-secondary hover:shadow-md'
    ],
    
    variant === 'classic' && [
      'bg-gray-background border border-gray-border text-gray-black',
      'hover:border-gray-secondary hover:shadow-md'
    ],
    
    variant === 'ghost' && [
      'bg-transparent border border-transparent text-gray-black',
      'hover:bg-gray-surface hover:border-gray-border'
    ],
    
    // Custom classes
    className
  );

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

// Subcomponentes do Card
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={clsx('flex flex-col space-y-1.5 p-6', className)}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <h3 className={clsx('text-2xl font-semibold leading-none tracking-tight', className)}>
    {children}
  </h3>
);

export const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <p className={clsx('text-sm text-gray-mutedText', className)}>
    {children}
  </p>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={clsx('p-6 pt-0', className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={clsx('flex items-center p-6 pt-0', className)}>
    {children}
  </div>
);
