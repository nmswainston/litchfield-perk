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
        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border-2 border-brand-primary bg-brand-secondary text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 pill-mobile ${className}`}
      >
        {pillContent}
      </a>
    );
  }

  return (
    <div 
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border-2 border-brand-primary bg-brand-secondary text-brand-primary pill-mobile ${className}`}
    >
      {pillContent}
    </div>
  );
}

export default Pill;
