import { useState, useRef, useCallback, useEffect } from "react";

/**
 * Custom hook for managing mobile menu state and interactions
 * @returns {Object} Mobile menu state and handlers
 */
export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((open) => !open), []);

  // Close on Esc and on outside click
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const onPointerDown = (event) => {
      const target = event.target;
      if (!menuPanelRef.current || !menuButtonRef.current) return;
      
      const clickedInsidePanel = menuPanelRef.current.contains(target);
      const clickedButton = menuButtonRef.current.contains(target);
      
      if (!clickedInsidePanel && !clickedButton) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);

  // Focus management for accessibility
  useEffect(() => {
    if (isMenuOpen && menuPanelRef.current) {
      const firstFocusableElement = menuPanelRef.current.querySelector(
        'a[href], button:not([disabled])'
      );
      firstFocusableElement?.focus();
    }
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    menuButtonRef,
    menuPanelRef,
    closeMenu,
    toggleMenu
  };
};
