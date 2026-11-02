import { Link, useLocation } from "react-router-dom";
import NAV from "../../data/nav.json";

// A link whose anchor is not one of these would go nowhere, so it is left out.
const SECTION_ANCHORS = ["menu", "hours", "visit", "about", "app-cta", "instagram"];

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
    : "text-sm font-semibold text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight py-2";

  const finalLinkClassName = linkClassName || defaultLinkClassName;

  // Reviews link removed while Google reviews are unavailable (billing issue).
  // Re-add { href: "#reviews", to: "/#reviews", label: "Reviews", ariaLabel: "Read customer reviews" } to restore.
  const navItems = NAV.links
    .filter((link) => SECTION_ANCHORS.includes(link.anchor))
    .map((link) => ({
      href: `#${link.anchor}`,
      to: `/#${link.anchor}`,
      label: link.label,
      ariaLabel: link.ariaLabel,
    }));

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
        aria-label={NAV.wholesale.ariaLabel}
        role={variant === "mobile" ? "menuitem" : undefined}
      >
        {NAV.wholesale.label}
      </Link>
    </div>
  );
}

