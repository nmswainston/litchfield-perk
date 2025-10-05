import React from "react";

function Pill({ children, text, icon: Icon, href, className = "" }) {
  const content = text || children;
  
  const pillContent = (
    <>
      {Icon && (
        typeof Icon === 'function' 
          ? <Icon className="w-4 h-4 opacity-80" />
          : Icon
      )}
      <span>{content}</span>
    </>
  );

  if (href) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border border-brand-border bg-brand-background-light text-brand-text hover:opacity-80 transition-opacity pill-mobile ${className}`}
      >
        {pillContent}
      </a>
    );
  }

  return (
    <div 
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border border-brand-border bg-brand-background-light text-brand-text pill-mobile ${className}`}
    >
      {pillContent}
    </div>
  );
}

export default Pill;
