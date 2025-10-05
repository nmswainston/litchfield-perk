import React from "react";
import { Star } from "lucide-react";

function MenuCard({ 
  name, 
  description, 
  price, 
  popular = false, 
  allergens = [], 
  calories = null,
  category = null,
  temperature = null 
}) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-background p-4 sm:p-5 shadow-soft transition-all duration-300 hover:shadow-brand hover:-translate-y-1 relative h-full flex flex-col">
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-2 right-3 bg-brand-primary-light text-brand-text px-2 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider">
          Popular
        </div>
      )}
      
      <div className="flex items-start justify-between gap-3 sm:gap-4 flex-1">
        <div className="flex-1 min-w-0 pr-1 sm:pr-2">
          <h3 className="text-base sm:text-lg font-semibold text-brand-text mb-2 leading-tight">
            {name}
          </h3>
          
          {/* Description with each sentence on its own line */}
          <div className="prose prose-sm max-w-none mb-3">
            {(() => {
              const parts = typeof description === 'string'
                ? (description.match(/[^.!?]+[.!?]*/g) || [description])
                : [description];
              return parts.map((part, idx) => (
                <p key={idx} className="text-brand-text-light text-sm leading-relaxed m-0">
                  {String(part).trim()}
                </p>
              ));
            })()}
          </div>

          {/* Meta info block normalized for desktop height */}
          <div className="space-y-2 md:min-h-[56px]">
            {/* Allergens */}
            {allergens && allergens.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-1">
                  {allergens.map((allergen, index) => (
                  <span
                      key={index}
                    className="inline-flex items-center h-6 px-2 bg-brand-background-dark text-brand-text-muted text-xs rounded-md border border-brand-border"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Calories */}
            {calories && (
              <div className="text-brand-text-muted text-xs">
                {calories} cal
              </div>
            )}
          </div>
        </div>
        
        {/* Price */}
        <div className="flex-shrink-0 self-start">
          <div className="text-lg sm:text-xl font-bold text-brand-primary">
            {price}
          </div>
        </div>
      </div>

      {/* Footer: centered temperature at the bottom */}
      {temperature && (
        <div className="mt-auto pt-3 flex justify-center">
          <span className="inline-flex items-center justify-center h-7 min-w-[96px] px-3 bg-brand-background-dark text-brand-text text-xs rounded-md border border-brand-border-light">
            {temperature}
          </span>
        </div>
      )}
      
      {/* Category indicator removed per request */}
    </div>
  );
}

export default MenuCard;