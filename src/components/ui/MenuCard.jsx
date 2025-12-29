/**
 * MenuCard Component
 * 
 * Displays a menu item card with name, description, price, and optional metadata.
 * Supports popular badges, allergen tags, and temperature indicators.
 * 
 * @component
 */

// Unified pill style for all tags (allergens, temperature, etc.)
// Mobile-optimized: padding-based sizing (no fixed heights), improved readability on small screens
// Desktop: compact sizing preserved for clean layout
const MENU_PILL_CLASSES =
  "inline-flex items-center gap-1 rounded-full border border-brand-border bg-brand-background-light " +
  // Mobile: increased padding and font size for better touch targets and readability
  "px-3.5 py-2 text-[13px] leading-snug " +
  // Desktop: compact sizing preserved (sm breakpoint and up)
  "sm:px-2.5 sm:py-1 sm:text-[11px] sm:leading-none " +
  // Text handling: prevent wrapping inside pill, truncate long labels
  "whitespace-nowrap overflow-hidden text-ellipsis max-w-full min-w-0 text-brand-text-muted";

const CARD_BASE_CLASSES = [
  "rounded-xl",
  "shadow-sm",
  "ring-1",
  "ring-black/5",
  "bg-white",
  "p-3",
  "sm:p-4",
  "relative",
  "flex",
  "flex-col",
  "h-full",
  "min-h-[180px]",
  "sm:min-h-[200px]",
  "lg:min-h-[220px]",
  "transition-all",
  "duration-200",
  "hover:shadow-md",
  "hover:ring-black/10",
].join(" ");

function MenuCard({
  name,
  description,
  price,
  popular = false,
  allergens = [],
  calories = null,
  temperature = null,
  animated: _animated = false, // Deprecated, kept for backwards compatibility
}) {
  const ContainerComponent = "div";

  const hasAllergens = allergens.length > 0;

  return (
    <ContainerComponent className={CARD_BASE_CLASSES}>
      {popular && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider z-10 shadow-md"
          aria-label="Popular item"
        >
          Popular
        </div>
      )}

      <div className="relative mb-1.5 flex-shrink-0 pt-1">
        {/* Title centered */}
        <h3 className="subheading text-brand-text m-0 leading-tight text-center px-12">
          {name}
        </h3>

        {/* Price stays top-right without affecting centering */}
          <div className="absolute top-0 right-0">
            <span className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 text-sm font-semibold whitespace-nowrap">
              {price}
            </span>
          </div>
        </div>

      <div className="border-t border-brand-border-light my-1.5 flex-shrink-0" />

      <div className="mb-1.5 min-h-[44px] flex-1 overflow-hidden">
        <p className="body-text text-brand-text-light m-0 line-clamp-2 break-words leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-1.5 flex-shrink-0 mt-auto">
        {(hasAllergens || temperature) && (
          <div className="mt-2 flex flex-wrap gap-2.5 sm:gap-2">
            {allergens.map((allergen) => (
              <span
                key={allergen}
                className={MENU_PILL_CLASSES}
              >
                {allergen}
              </span>
            ))}
            {temperature && (
              <span className={MENU_PILL_CLASSES}>
                {temperature}
              </span>
            )}
          </div>
        )}

        {calories && (
          <div className="text-brand-text-muted text-xs min-h-[20px]">
            {calories} cal
          </div>
        )}
      </div>
    </ContainerComponent>
  );
}

export default MenuCard;