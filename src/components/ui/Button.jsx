/**
 * Button Component
 * 
 * Reusable button component with brand styling and multiple variants.
 * Supports both anchor links and button elements based on href prop.
 * Includes accessibility features and responsive sizing.
 * 
 * @component
 * @param {string} variant - Button style variant ('primary', 'secondary', 'filled', 'ghost', 'danger')
 * @param {string} size - Button size ('sm', 'default', 'lg', 'xl')
 * @param {string} className - Additional CSS classes
 * @param {Function} onClick - Click handler function
 * @param {string} href - Optional URL for anchor link rendering
 * @param {boolean} disabled - Disabled state
 * @param {React.ReactNode} children - Button content
 */

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
<<<<<<< HEAD
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none touch-target';

  const variantClasses = {
    filled: 'bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-md hover:shadow-lg',
    ghost: 'bg-transparent border border-brand-600/20 hover:bg-brand-50 hover:border-brand-600/40 text-brand-700',
    // Backwards compatibility
    primary: 'bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-md hover:shadow-lg',
    secondary: 'bg-white text-brand-600 border-2 border-brand-600 hover:bg-brand-600 hover:text-white shadow-sm hover:shadow-md',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[2.5rem]',
    default: 'px-6 py-3 text-base min-h-[3rem]',
    lg: 'px-8 py-4 text-lg min-h-[3.5rem]',
    xl: 'px-10 py-5 text-xl min-h-[4rem]'
=======
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-target';

  const variantClasses = {
    filled: 'bg-brand-700 hover:bg-brand-800 active:bg-brand-900 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]',
    ghost: 'bg-transparent ring-1 ring-brand-700/20 hover:bg-brand-50 text-brand-700',
    // Backwards compatibility
    primary: 'bg-brand-700 hover:bg-brand-800 active:bg-brand-900 text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)]',
    secondary: 'bg-brand-secondary text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-brand-secondary shadow-soft hover:shadow-brand hover:-translate-y-0.5',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-10 sm:min-h-10',
    default: 'px-6 py-3 text-base min-h-12 sm:min-h-12',
    lg: 'px-8 py-4 text-lg min-h-14 sm:min-h-14',
    xl: 'px-10 py-5 text-xl min-h-16 sm:min-h-16'
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
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
