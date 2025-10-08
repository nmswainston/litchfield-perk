/**
 * Reusable Section wrapper component
 * Provides consistent spacing, background, and layout
 */

import React from "react";

export default function Section({
  children,
  id,
  className = "",
  background = "white",
  padding = "default",
  textAlign = "center",
  maxWidth: _maxWidth = "1200px",
  ...props
}) {
  const backgroundClasses = {
    white: "bg-section-white",
    light: "bg-section-light",
    dark: "bg-section-dark",
  };

  const paddingClasses = {
    none: "",
    sm: "section-padding-sm",
    default: "section-padding-default",
    lg: "section-padding-lg",
    xl: "section-padding-xl",
  };

  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const baseClasses = "w-full";
  const backgroundClass =
    backgroundClasses[background] || backgroundClasses.white;
  const paddingClass = paddingClasses[padding] || paddingClasses.default;
  const textAlignClass = textAlignClasses[textAlign] || textAlignClasses.center;

  return (
    <section
      id={id}
      className={`${baseClasses} ${backgroundClass} ${paddingClass} ${textAlignClass} ${className}`}
      {...props}
    >
      <div className="container-default">{children}</div>
    </section>
  );
}
