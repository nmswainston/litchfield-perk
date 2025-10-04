import React from "react";
import { Star } from "lucide-react";

function MenuCard({ 
  name, 
  description, 
  price, 
  popular = false, 
  allergens = [], 
  calories = null,
  category = null 
}) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-background p-5 shadow-soft transition-all duration-300 hover:shadow-brand hover:-translate-y-1 relative">
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-2 right-3 bg-brand-primary-light text-brand-text px-2 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider">
          Popular
        </div>
      )}
      
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="text-lg font-semibold text-brand-text mb-2 leading-tight">
            {name}
          </h3>
          
          {/* Description with typography */}
          <div className="prose prose-sm max-w-none mb-3">
            <p className="text-brand-text-light text-sm leading-relaxed m-0">
              {description}
            </p>
          </div>
          
          {/* Allergens */}
          {allergens && allergens.length > 0 && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-1">
                {allergens.map((allergen, index) => (
                  <span
                    key={index}
                    className="inline-block bg-brand-background-dark text-brand-text-muted text-xs px-2 py-1 rounded-md border border-brand-border"
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
        
        {/* Price */}
        <div className="flex-shrink-0">
          <div className="text-xl font-bold text-brand-primary">
            {price}
          </div>
        </div>
      </div>
      
      {/* Category indicator */}
      {category && (
        <div className="mt-3 pt-3 border-t border-brand-border-light">
          <span className="text-brand-text-muted text-xs uppercase tracking-wider">
            {category}
          </span>
        </div>
      )}
    </div>
  );
}

export default MenuCard;