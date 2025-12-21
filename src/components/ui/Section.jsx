/**
 * Section Component
 * 
 * Reusable section wrapper providing consistent spacing, background colors,
 * and layout structure. Used as a base container for all page sections.
 * 
 * @component
 * @param {string} id - Section ID for navigation
 * @param {string} background - Background color variant ('white', 'light', 'dark')
 * @param {string} padding - Padding size ('none', 'sm', 'default', 'lg', 'xl')
 * @param {string} textAlign - Text alignment ('left', 'center', 'right')
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Section content
 */
<<<<<<< HEAD
import { forwardRef } from 'react';

const Section = forwardRef(function Section({ 
=======

export default function Section({ 
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
  children, 
  id, 
  className = '', 
  background = 'white',
  padding = 'default',
  textAlign = 'center',
  ...props 
<<<<<<< HEAD
}, ref) {
=======
}) {
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
  const backgroundClasses = {
    white: 'bg-brand-background',
    light: 'bg-brand-background-light',
    dark: 'bg-brand-background-dark'
  };

  const paddingClasses = {
    none: '',
<<<<<<< HEAD
    sm: 'py-12 px-4 sm:px-6',
    default: 'py-16 px-4 sm:px-6 lg:px-8',
    lg: 'py-20 px-4 sm:px-6 lg:px-8',
    xl: 'py-24 px-4 sm:px-6 lg:px-8'
=======
    sm: 'py-8 px-4',
    default: 'py-16 px-5',
    lg: 'py-20 px-5',
    xl: 'py-24 px-5'
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
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
<<<<<<< HEAD
      ref={ref}
=======
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
      id={id}
      className={`${baseClasses} ${backgroundClass} ${paddingClass} ${textAlignClass} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
<<<<<<< HEAD
});

export default Section;
=======
}
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
