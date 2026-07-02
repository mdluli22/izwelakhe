"use client";

import { INDUSTRIES } from "@/lib/constants";

export default function Industries() {
  return (
    <section className="industries-section cinematic-section" id="industries">
      <div className="section-shell">
        <div className="section-heading reveal-up">
          <p className="section-kicker">Industries</p>
          <h2>Built for the environments shaping South Africa.</h2>
        </div>
      </div>

      <div className="industry-pin">
        <div className="industry-cue" aria-hidden="true">
          <span>Scroll to explore sectors</span>
          <span />
        </div>
        <div className="industry-track reveal-up" data-speed="0.96" aria-label="Industry focus areas">
          {INDUSTRIES.map((industry, index) => (
            <article className="industry-card" key={industry.name}>
              <span>0{index + 1}</span>
              <h3>{industry.name}</h3>
              <p>{industry.detail}</p>
            </article>
          ))}
        </div>
        <div className="industry-progress" aria-hidden="true">
          <span className="industry-progress__bar" />
        </div>
      </div>
    </section>
  );
}
