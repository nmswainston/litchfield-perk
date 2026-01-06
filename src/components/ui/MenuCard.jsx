const MENU_PILL_CLASSES =
  "inline-flex items-center gap-1 rounded-full border border-brand-border bg-brand-background-light " +
  "px-3.5 py-2 text-[17px] leading-snug " +
  "sm:px-2.5 sm:py-1 sm:text-[15px] sm:leading-none " +
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
  "min-h-[150px]",
  "sm:min-h-[170px]",
  "lg:min-h-[210px]",
  "transition-all",
  "duration-200",
  "hover:shadow-md",
  "hover:ring-black/10",
].join(" ");

const CARD_EXPANDED_CLASSES = [
  "rounded-xl",
  "shadow-lg",
  "ring-2",
  "ring-brand-primary/20",
  "bg-white",
  "p-4",
  "sm:p-5",
  "flex",
  "flex-col",
  "transition-all",
  "duration-200",
].join(" ");

function MenuCard({
  id: _id,
  name,
  description,
  price,
  popular = false,
  allergens = [],
  calories = null,
  temperature = null,
  animated: _animated = false,
  isOpen = false,
  isExpanded = false,
  onToggle,
  cardRef,
  className = "",
}) {
  const hasAllergens = allergens.length > 0;

  const handleKeyDown = (e) => {
    if (!onToggle) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
    if (onToggle) onToggle();
  };

  const cardClasses = isExpanded ? CARD_EXPANDED_CLASSES : CARD_BASE_CLASSES;
  const isLongName = (name?.length || 0) > 26;
  const titleTextSize = isLongName ? "text-[22px] sm:text-[24px]" : "text-[24px] sm:text-[26px]";

  return (
    <div
      ref={isOpen ? cardRef : null}
      className={[
        cardClasses,
        className,
        onToggle ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary/30" : "",
      ].join(" ")}
      role={onToggle ? "button" : undefined}
      tabIndex={onToggle ? 0 : undefined}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-expanded={onToggle ? isOpen : undefined}
    >
      {popular && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider z-10 shadow-md"
        >
          <span className="sr-only">Popular item: </span>
          <span aria-hidden="true">Popular</span>
        </div>
      )}
      <div className="relative mb-1 flex-shrink-0 pt-0.5">
        <div className="px-10 flex items-start justify-center">
          <h3
            className={[
              "m-0 text-brand-text text-center font-semibold",
              "leading-snug",
              "line-clamp-2 [text-wrap:balance]",
              titleTextSize,
            ].join(" ")}
          >
            {name}
          </h3>
        </div>

        {!!price && (
          <div className="absolute top-0 right-0">
            <span className="px-3 py-1 rounded-lg bg-brand-background-light text-brand-primary text-sm font-semibold whitespace-nowrap">
              {price}
            </span>
          </div>
        )}

        {!price && onToggle && (
          <div
            className={`absolute top-0 right-0 text-brand-text-muted transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      <div className="border-t border-brand-border-light my-1.5 flex-shrink-0" />

      <div className={`mb-1.5 ${isExpanded ? "flex-1" : "min-h-[44px] flex-1 overflow-hidden"}`}>
        <p
          className={`text-brand-text-light m-0 break-words ${
            isExpanded ? "text-base leading-relaxed" : "text-sm leading-snug line-clamp-2"
          }`}
        >
          {description}
        </p>
      </div>

      <div className="space-y-1.5 flex-shrink-0 mt-auto">
        {(hasAllergens || temperature) && (
          <div className="mt-2 flex flex-wrap gap-2.5 sm:gap-2">
            {allergens.map((allergen) => (
              <span key={allergen} className={MENU_PILL_CLASSES}>
                {allergen}
              </span>
            ))}
            {temperature && <span className={MENU_PILL_CLASSES}>{temperature}</span>}
          </div>
        )}

        {calories && <div className="text-brand-text-muted text-xs min-h-[20px]">{calories} cal</div>}
      </div>
    </div>
  );
}

export default MenuCard;
