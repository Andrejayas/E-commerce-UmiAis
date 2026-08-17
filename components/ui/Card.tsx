import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
}: CardProps) {
  const variantStyles = {
    default: 'card',
    bordered: 'card-bordered',
    elevated: 'card-elevated',
  };
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <div className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}
