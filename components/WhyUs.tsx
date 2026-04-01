"use client";

import React from "react";
import { WHY } from "../lib/constants";

export default function WhyUs() {
  return (
    <section className="why" id="why-us">
      <div className="container">
        <div className="section-header">
          <p className="label">Why Choose Us</p>
          <h2 className="h2">Built Different.<br /><span className="gold">Built to Last.</span></h2>
        </div>
        <div className="why__grid">
          {WHY.map((w, i) => (
            <div key={w.title} className="why__card">
              <div className="why__card-num">0{i + 1}</div>
              <div className="why__card-icon">{w.icon}</div>
              <h4 className="why__card-title">{w.title}</h4>
              <p className="why__card-body">{w.body}</p>
              <div className="why__card-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
