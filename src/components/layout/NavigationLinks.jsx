import React, { useMemo } from "react";

/**
 * Desktop navigation links component
 */
const NavigationLinks = ({ textColor, textShadow, className = "" }) => {
  const linkStyle = useMemo(() => ({
    color: textColor,
    textShadow: textShadow,
  }), [textColor, textShadow]);

  const navigationItems = [
    { href: "#menu", label: "Menu", ariaLabel: "View our menu" },
    { href: "#hours", label: "Hours", ariaLabel: "View our hours" },
    { href: "#visit", label: "Visit", ariaLabel: "Visit our location" },
    { href: "#reviews", label: "Reviews", ariaLabel: "Read customer reviews" },
  ];

  return (
    <div className={`hidden lg:flex items-center hide-on-short gap-4 ${className}`}>
      {navigationItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-sm font-medium transition-all duration-200 hover:text-brand-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 rounded px-2 py-1"
          style={linkStyle}
          aria-label={item.ariaLabel}
          aria-current={window.location.hash === item.href ? "page" : undefined}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

export default NavigationLinks;
