import React, { useMemo } from "react";

/**
 * Mobile menu overlay and panel component
 */
const MobileMenu = ({ 
  isOpen, 
  onClose, 
  menuPanelRef, 
  textColor: _textColor 
}) => {
  const menuStyle = useMemo(() => ({
    transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isOpen ? 1 : 0,
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out'
  }), [isOpen]);

  const navigationItems = [
    { href: "#menu", label: "Menu" },
    { href: "#hours", label: "Hours" },
    { href: "#visit", label: "Visit" },
    { href: "#reviews", label: "Reviews" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-[50]"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        id="mobile-menu"
        ref={menuPanelRef}
        role="menu"
        aria-orientation="vertical"
        className="md:hidden fixed top-20 left-4 right-4 rounded-xl ring-1 ring-brand-border bg-white/95 backdrop-blur shadow-md z-[60] overflow-hidden"
        style={menuStyle}
      >
        <nav className="flex flex-col" aria-label="Mobile navigation">
          {navigationItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`px-6 py-4 text-gray-800 hover:text-brand-primary hover:bg-brand-background-light font-medium text-base transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2 focus-visible:outline-inset ${
                index < navigationItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onClick={onClose}
              aria-current={window.location.hash === item.href ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
