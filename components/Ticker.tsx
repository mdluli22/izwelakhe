"use client";

import React from "react";

export default function Ticker() {
  const items = ["Business Consulting", "Construction", "Property Development", "Strategic Planning", "Student Accommodation", "Civil Works", "Rental Optimisation", "South Africa"];
  return (
    <div className="ticker">
      <div className="ticker__track">
        {items.flatMap((t, i) => [
          <span key={`a${i}`} className="ticker__item">{t}</span>,
          <span key={`b${i}`} className="ticker__sep">◆</span>,
        ])}
        {items.flatMap((t, i) => [
          <span key={`c${i}`} className="ticker__item">{t}</span>,
          <span key={`d${i}`} className="ticker__sep">◆</span>,
        ])}
      </div>
    </div>
  );
}
