import { Link, useLocation } from "react-router-dom";

export default function NavLinks({ className = "" }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const linkClassName = "text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight";

  const navItems = [
    { href: "#menu", to: "/#menu", label: "Menu", ariaLabel: "View our menu" },
    { href: "#hours", to: "/#hours", label: "Hours", ariaLabel: "View our hours" },
    { href: "#visit", to: "/#visit", label: "Visit", ariaLabel: "Visit our location" },
    { href: "#reviews", to: "/#reviews", label: "Reviews", ariaLabel: "Read customer reviews" },
  ];

  return (
    <div className={className}>
      {navItems.map((item) => {
        if (isHome) {
          return (
            <a
              key={item.href}
              href={item.href}
              className={linkClassName}
              aria-label={item.ariaLabel}
            >
              {item.label}
            </a>
          );
        } else {
          return (
            <Link
              key={item.to}
              to={item.to}
              className={linkClassName}
              aria-label={item.ariaLabel}
            >
              {item.label}
            </Link>
          );
        }
      })}
      <Link
        to="/wholesale"
        className={linkClassName}
        aria-label="Wholesale Partner Program"
      >
        Wholesale
      </Link>
    </div>
  );
}

