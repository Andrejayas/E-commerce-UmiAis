import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  // Override `type` to keep it required in our API
  type: string;
}

/**
 * Labelled input with error state.
 * Forwards ref so it works seamlessly with react-hook-form's `register()`.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, error, required, className = '', ...rest }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <label htmlFor={name} className="label text-sm font-medium text-gray-700">
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={name}
          name={name}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={error ? 'input input-error' : 'input'}
          {...rest}
        />
        {error && (
          <p id={`${name}-error`} role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
