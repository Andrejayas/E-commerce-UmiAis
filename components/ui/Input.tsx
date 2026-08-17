import React from 'react';

interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function Input({
  label,
  type,
  name,
  placeholder,
  error,
  required = false,
  value,
  onChange,
  className = '',
}: InputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={error ? 'input input-error' : 'input'}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
