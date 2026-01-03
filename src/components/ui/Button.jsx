/**
 * Button Component
 *
 * Reusable button component with brand styling and multiple variants.
 * Supports both anchor links and button elements based on href prop.
 * Includes accessibility features and responsive sizing.
 */

export default function Button({
  children,
  variant = "primary",
  size = "default",
  className = "",
  onClick,
  href,
  disabled = false,
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 " +
    "focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none touch-target";

  const variantClasses = {
    filled:
      "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-md hover:shadow-lg",

    ghost:
      "bg-transparent border border-brand-600/20 hover:bg-brand-50 hover:border-brand-600/40 text-brand-700",

    primary:
      "bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-md hover:shadow-lg",

    // Secondary stays outlined on hover and click
    secondary:
      "bg-white text-brand-700 border-2 border-brand-600 " +
      "hover:bg-brand-50 hover:border-brand-700 hover:text-brand-800 " +
      "active:bg-brand-100 shadow-sm hover:shadow-md",

    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm min-h-[2.5rem]",
    default: "px-6 py-3 text-base min-h-[3rem]",
    lg: "px-8 py-4 text-lg min-h-[3.5rem]",
    xl: "px-10 py-5 text-xl min-h-[4rem]",
  };

  const variantClass = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.default;

  const buttonClasses = `${baseClasses} ${variantClass} ${sizeClass} ${className}`;

  const handleAnchorClick = (e) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={buttonClasses}
        onClick={handleAnchorClick}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
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
