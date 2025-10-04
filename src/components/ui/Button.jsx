/**
 * Reusable Button component with brand styling
 * Supports primary, secondary, and custom variants
 */

import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary',
  size = 'default',
  className = '',
  onClick,
  href,
  disabled = false,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-target';

  const variantClasses = {
    primary: 'bg-brand-primary text-brand-secondary hover:bg-brand-primary-dark shadow-brand hover:shadow-brand-lg hover:-translate-y-0.5',
    secondary: 'bg-brand-secondary text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-brand-secondary shadow-soft hover:shadow-brand hover:-translate-y-0.5',
    ghost: 'bg-transparent text-brand-primary hover:bg-brand-primary hover:text-brand-secondary',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-10',
    default: 'px-6 py-3 text-base min-h-12',
    lg: 'px-8 py-4 text-lg min-h-14',
    xl: 'px-10 py-5 text-xl min-h-16'
  };

  const variantClass = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.default;

  const buttonClasses = `${baseClasses} ${variantClass} ${sizeClass} ${className}`;

  if (href) {
    return (
      <a 
        href={href}
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
