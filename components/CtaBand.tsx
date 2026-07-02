"use client";

import React from "react";

export default function CtaBand() {
  return (
    <section className="cta-band">
      <div className="cta-band__scan" />
      <div className="cta-band__inner">
        <p className="label" style={{ color: "#C9A84C", textAlign: "center" }}>Work With Us</p>
        <h2 className="cta-band__h2">
          Ready to build
          <br />
          <span className="gold">something that lasts?</span>
        </h2>
        <p className="cta-band__sub">
          Whether it&apos;s strategy, property, or construction — we&apos;re ready to bring your project to life.
        </p>
        <div className="cta-band__btns">
          <a href="#contact" className="btn btn--gold">GET IN TOUCH</a>
          <a href="#services" className="btn btn--outline">VIEW SERVICES</a>
        </div>
      </div>
    </section>
  );
}
