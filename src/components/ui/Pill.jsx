import React from "react";

function Pill({ children, icon: Icon, className = "" }) {
  return (
    <div 
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border border-brand-border bg-brand-background-light text-brand-text ${className}`}
    >
      {Icon && (
        typeof Icon === 'function' 
          ? <Icon className="w-4 h-4 opacity-80" />
          : Icon
      )}
      <span>{children}</span>
    </div>
  );
}

export default Pill;
