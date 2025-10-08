import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

function MenuCard({ 
  name, 
  description, 
  price, 
  popular = false, 
  allergens = [], 
  calories = null,
  category = null,
  temperature = null,
  animated = true 
}) {
  const Wrapper = animated ? motion.div : 'div';
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, y: 8 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.28, ease: "easeOut" },
        whileHover: { scale: 1.02 },
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="rounded-2xl shadow-sm ring-1 ring-black/5 bg-white/90 backdrop-blur p-4 sm:p-5 relative h-full flex flex-col texture-overlay texture-overlay-soft min-h-[260px] sm:min-h-[280px] md:min-h-[300px]"
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-primary-light text-brand-secondary px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider">
          Popular
        </div>
      )}
      
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0 pr-1 sm:pr-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="subheading text-brand-text m-0">
              {name}
            </h3>
            {/* Price pill - right aligned */}
            <div className="flex-shrink-0">
              <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-sm font-semibold">
                {price}
              </span>
            </div>
          </div>

          {/* Dashed divider for tactile feel */}
          <div className="border-t border-dashed border-neutral-300/70 my-2"></div>

          {/* Description with each sentence on its own line */}
          <div className="prose prose-sm max-w-none mb-3">
            {(() => {
              const parts = typeof description === 'string'
                ? (description.match(/[^.!?]+[.!?]*/g) || [description])
                : [description];
              return parts.map((part, idx) => (
                <p key={idx} className="body-text text-brand-text-light m-0">
                  {String(part).trim()}
                </p>
              ));
            })()}
          </div>

          {/* Meta info block - no fixed height to avoid extra whitespace */}
          <div className="space-y-2">
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
        
        {/* Spacer to keep top row layout consistent */}
      </div>

      {/* Temperature chip shown compactly under content when present */}
      {temperature && (
        <div className="pt-2">
          <span className="inline-flex items-center h-7 px-3 bg-brand-background-dark text-brand-text text-xs rounded-md border border-brand-border-light">
            {temperature}
          </span>
        </div>
      )}
      
      {/* Category indicator removed per request */}
    </Wrapper>
  );
}

export default MenuCard;