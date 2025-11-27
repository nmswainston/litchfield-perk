import React, { useMemo } from "react";
import { BackgroundImage } from "../ui";

/**
 * Header background component with botanical pattern and gradient
 */
const HeaderBackground = ({ 
  isOverHero, 
  backgroundOpacity, 
  patternOpacity, 
  reduceMotion 
}) => {
  const backgroundStyle = useMemo(() => ({
    background: "linear-gradient(135deg, var(--color-brand-background-light, #F9F6F0) 0%, var(--color-brand-background-dark, #ECE6D9) 100%)",
    opacity: isOverHero ? backgroundOpacity : 1,
  }), [isOverHero, backgroundOpacity]);

  const patternStyle = useMemo(() => ({
    backgroundSize: "80% auto",
    backgroundRepeat: "repeat",
    opacity: isOverHero ? patternOpacity : 0.08,
  }), [isOverHero, patternOpacity]);

  const transitionClass = reduceMotion ? "" : " transition-opacity duration-500";

  return (
    <>
      {/* Gradient background */}
      <div
        className={`absolute inset-0 z-0${transitionClass}`}
        style={backgroundStyle}
      />

      {/* Botanical pattern overlay */}
      <BackgroundImage
        src="/botanical-pattern.png"
        className={`absolute inset-0 z-0 mix-blend-multiply${transitionClass}`}
        style={patternStyle}
      />
    </>
  );
};

export default HeaderBackground;
