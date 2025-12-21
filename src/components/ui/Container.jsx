/**
 * Container Component
 * 
 * Reusable container component providing consistent max-width constraints
 * and horizontal centering. Ensures content doesn't exceed optimal reading width.
 * 
 * @component
 * @param {string} maxWidth - Max width variant ('sm', 'md', 'lg', 'xl', '2xl', 'full')
 * @param {string} padding - Horizontal padding ('none', 'sm', 'default', 'lg', 'xl')
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Container content
 */

export default function Container({ 
  children, 
  className = '', 
  maxWidth = 'xl',
  padding = 'default',
  ...props 
}) {
  const maxWidthClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-full'
  };

  const paddingClasses = {
    none: '',
    sm: 'px-4',
    default: 'px-4 sm:px-6',
    lg: 'px-6 sm:px-8',
    xl: 'px-8 sm:px-10'
  };

  const baseClasses = 'mx-auto w-full';
  const maxWidthClass = maxWidthClasses[maxWidth] || maxWidthClasses.xl;
  const paddingClass = paddingClasses[padding] || paddingClasses.default;

  return (
    <div 
      className={`${baseClasses} ${maxWidthClass} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
