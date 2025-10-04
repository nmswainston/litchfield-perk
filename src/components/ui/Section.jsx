/**
 * Reusable Section wrapper component
 * Provides consistent spacing, background, and layout
 */

import React from 'react';

export default function Section({ 
  children, 
  id, 
  className = '', 
  background = 'white',
  padding = 'default',
  textAlign = 'center',
  maxWidth = '1200px',
  ...props 
}) {
  const backgroundClasses = {
    white: 'bg-brand-background',
    light: 'bg-brand-background-light',
    dark: 'bg-brand-background-dark'
  };

  const paddingClasses = {
    none: '',
    sm: 'py-8 px-4',
    default: 'py-15 px-5',
    lg: 'py-20 px-5',
    xl: 'py-24 px-5'
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const baseClasses = 'w-full';
  const backgroundClass = backgroundClasses[background] || backgroundClasses.white;
  const paddingClass = paddingClasses[padding] || paddingClasses.default;
  const textAlignClass = textAlignClasses[textAlign] || textAlignClasses.center;

  return (
    <section 
      id={id}
      className={`${baseClasses} ${backgroundClass} ${paddingClass} ${textAlignClass} ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
