/**
 * Reusable Button component with brand styling
 * Supports primary, secondary, and custom variants
 */

import React from "react";

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
  const variantClasses = {
    filled: "btn-primary",
    ghost: "btn-ghost",
    // Backwards compatibility
    primary: "btn-primary",
    secondary: "btn-secondary",
    danger: "btn-danger",
  };

  const sizeClasses = {
    sm: "btn-sm",
    default: "btn-default",
    lg: "btn-lg",
    xl: "btn-xl",
  };

  const variantClass = variantClasses[variant] || variantClasses.primary;
  const sizeClass = sizeClasses[size] || sizeClasses.default;

  const buttonClasses = `${variantClass} ${sizeClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClasses} onClick={onClick} {...props}>
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
