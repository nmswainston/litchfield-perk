/**
 * MenuCard Component
 * 
 * Displays a menu item card with name, description, price, and optional metadata.
 * Supports popular badges, allergen tags, and temperature indicators.
 * 
 * @component
 */
const CARD_BASE_CLASSES = [
  "rounded-xl",
  "shadow-sm",
  "ring-1",
  "ring-black/5",
  "bg-white",
  "p-4",
  "sm:p-5",
  "relative",
  "flex",
  "flex-col",
  "h-full",
  "min-h-[200px]",
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

      <div className="flex items-start justify-between gap-3 mb-3 flex-shrink-0">
        <h3 className="subheading text-brand-text m-0 leading-tight flex-1 min-w-0">
          {name}
        </h3>
        <div className="flex-shrink-0">
          <span className="px-3 py-1 rounded-lg bg-brand-50 text-brand-700 text-sm font-semibold whitespace-nowrap">
            {price}
          </span>
        </div>
      </div>

      <div className="border-t border-brand-border-light my-3 flex-shrink-0" />

      <div className="mb-3 min-h-[60px] flex-1 overflow-hidden">
        <p className="body-text text-brand-text-light m-0 line-clamp-2 break-words">
          {description}
        </p>
      </div>

      <div className="space-y-2 flex-shrink-0 mt-auto">
        {hasAllergens && (
          <div className="flex flex-wrap gap-1.5">
            {allergens.map((allergen) => (
              <span
                key={allergen}
                className="inline-flex items-center h-6 px-2 bg-brand-background-light text-brand-text-muted text-xs rounded-md border border-brand-border"
              >
                {allergen}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-start gap-3">
          {calories && (
            <div className="text-brand-text-muted text-xs">
              {calories} cal
            </div>
          )}

          {temperature && (
            <span className="inline-flex items-center justify-center h-6 px-2.5 bg-brand-background-light text-brand-text text-xs rounded-md border border-brand-border">
              {temperature}
            </span>
          )}
        </div>
      </div>
    </ContainerComponent>
  );
}

export default MenuCard;