import React from "react";

function SectionTitle({ children, id }) {
  return (
    <h2 id={id} className="section-title-dotted">
      <span
        className="section-dot section-dot--cobalt"
        aria-hidden="true"
        role="presentation"
      />
      {children}
      <span
        className="section-dot section-dot--tomato"
        aria-hidden="true"
        role="presentation"
      />
    </h2>
  );
}

export default SectionTitle;
