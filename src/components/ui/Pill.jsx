import React from "react";

function Pill({ children, text, icon: Icon, href, className = "" }) {
  const content = text || children;

  const pillContent = (
    <>
      {Icon &&
        (typeof Icon === "function" ? (
          <Icon className="w-4 h-4 opacity-80 text-current" />
        ) : (
          Icon
        ))}
      <span>{content}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`pill pill-mobile ${className}`}
      >
        {pillContent}
      </a>
    );
  }

  return <div className={`pill pill-mobile ${className}`}>{pillContent}</div>;
}

export default Pill;
