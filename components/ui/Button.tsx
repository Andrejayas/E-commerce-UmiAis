import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  pill = true,
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}: ButtonProps) {
  const variantStyles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };
  
  const sizeStyles = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };
  
  const radiusStyles = pill ? '' : '!rounded-md';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantStyles[variant]} ${sizeStyles[size]} ${radiusStyles} ${className}`}
    >
      {children}
    </button>
  );
}
