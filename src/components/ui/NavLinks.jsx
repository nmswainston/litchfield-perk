import { Link, useLocation } from "react-router-dom";

export default function NavLinks({ 
  className = "", 
  linkClassName,
  onLinkClick,
  variant = "desktop" // "desktop" or "mobile"
}) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const defaultLinkClassName = variant === "mobile" 
    ? "block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
    : "text-sm font-semibold text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight";

  const finalLinkClassName = linkClassName || defaultLinkClassName;

  const navItems = [
    { href: "#menu", to: "/#menu", label: "Menu", ariaLabel: "View our menu" },
    { href: "#hours", to: "/#hours", label: "Hours", ariaLabel: "View our hours" },
    { href: "#visit", to: "/#visit", label: "Visit", ariaLabel: "Visit our location" },
    { href: "#reviews", to: "/#reviews", label: "Reviews", ariaLabel: "Read customer reviews" },
  ];

  const commonProps = {
    className: finalLinkClassName,
    onClick: onLinkClick,
  };

  const containerClassName = variant === "mobile"
    ? `space-y-0 ${className}`
    : `flex items-center gap-4 lg:gap-5 xl:gap-6 ${className}`;

  return (
    <div className={containerClassName}>
      {navItems.map((item) => {
        if (isHome) {
          return (
            <a
              key={item.href}
              href={item.href}
              {...commonProps}
              aria-label={item.ariaLabel}
              role={variant === "mobile" ? "menuitem" : undefined}
            >
              {item.label}
            </a>
          );
        } else {
          return (
            <Link
              key={item.to}
              to={item.to}
              {...commonProps}
              aria-label={item.ariaLabel}
              role={variant === "mobile" ? "menuitem" : undefined}
            >
              {item.label}
            </Link>
          );
        }
      })}
      <Link
        to="/wholesale"
        {...commonProps}
        aria-label="Wholesale Partner Program"
        role={variant === "mobile" ? "menuitem" : undefined}
      >
        Wholesale
      </Link>
    </div>
  );
}

