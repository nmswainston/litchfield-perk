/**
 * MenuCard Component
 * 
 * Displays a menu item card with name, description, price, and optional metadata.
 * Supports Framer Motion animations, popular badges, allergen tags, and temperature indicators.
 * 
 * @component
 */
import { motion } from "framer-motion";

const ANIMATION_DURATION = 0.28;
const ANIMATION_EASING = "easeOut";
const VIEWPORT_AMOUNT = 0.2;

const CARD_BASE_CLASSES = [
  "rounded-2xl",
  "shadow-sm",
  "ring-1",
  "ring-black/5",
  "bg-white/90",
  "backdrop-blur",
  "p-3",
  "sm:p-4",
  "relative",
  "flex",
  "flex-col",
  "texture-overlay",
  "texture-overlay-soft",
  "h-[270px]",
  "sm:h-[200px]",
].join(" ");

const getAnimationProps = () => ({
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: VIEWPORT_AMOUNT },
  transition: { duration: ANIMATION_DURATION, ease: ANIMATION_EASING },
  whileHover: { scale: 1.02 },
});

function MenuCard({
  name,
  description,
  price,
  popular = false,
  allergens = [],
  calories = null,
  temperature = null,
  animated = true,
}) {
  const ContainerComponent = animated ? motion.div : "div";
  const animationProps = animated ? getAnimationProps() : {};

  const hasAllergens = allergens.length > 0;

  return (
    <ContainerComponent {...animationProps} className={CARD_BASE_CLASSES}>
      {popular && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-primary-light text-brand-secondary px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider z-10"
          aria-label="Popular item"
        >
          Popular
        </div>
      )}

      <div className="flex items-start justify-between gap-2 sm:gap-3 mb-1.5 flex-shrink-0">
        <h3 className="subheading text-brand-text m-0 leading-tight flex-1 min-w-0">
          {name}
        </h3>
        <div className="flex-shrink-0">
          <span className="px-2.5 py-1 rounded-full bg-brand-50 text-brand-800 text-sm font-semibold whitespace-nowrap">
            {price}
          </span>
        </div>
      </div>

      <div className="border-t border-dashed border-neutral-300/70 my-1.5 flex-shrink-0" />

      <div className="mb-1.5 min-h-[56px] sm:min-h-[60px] flex-1 overflow-hidden">
        <p className="body-text text-brand-text-light m-0 leading-relaxed line-clamp-2 break-words">
          {description}
        </p>
      </div>

      <div className="space-y-1 h-[36px] sm:h-[40px] flex-shrink-0">
        {hasAllergens && (
          <div className="flex flex-wrap gap-1">
            {allergens.map((allergen) => (
              <span
                key={allergen}
                className="inline-flex items-center h-5 px-1.5 bg-brand-background-dark text-brand-text-muted text-xs rounded-md border border-brand-border"
              >
                {allergen}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-2">
          {calories && (
            <div className="text-brand-text-muted text-xs leading-tight">
              {calories} cal
            </div>
          )}

          {temperature && (
            <span className="inline-flex items-center justify-center h-6 min-w-[90px] px-2.5 bg-brand-background-dark text-brand-text text-xs rounded-md border border-brand-border-light">
              {temperature}
            </span>
          )}
        </div>
      </div>
    </ContainerComponent>
  );
}

export default MenuCard;