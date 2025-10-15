import { useEffect, useState } from "react";

/**
 * Custom hook for detecting user's reduced motion preference
 * @returns {boolean} Whether user prefers reduced motion
 */
export const useReducedMotion = () => {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(!!media.matches);
    
    update();
    media.addEventListener?.("change", update);
    
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduceMotion;
};
