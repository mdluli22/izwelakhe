"use client";

import { INDUSTRIES } from "@/lib/constants";
import Image from "next/image";

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
        <div className="industry-signal" aria-hidden="true">
          <span className="industry-signal__beam" />
          <span className="industry-signal__label">Sector signal</span>
        </div>
        <div className="industry-track reveal-up" data-speed="0.96" aria-label="Industry focus areas">
          {INDUSTRIES.map((industry, index) => (
            <article className={`industry-card ${index === 0 ? "is-active" : ""}`} key={industry.name} data-industry-card>
              <div className="industry-card__media" aria-hidden="true">
                <Image
                  src={industry.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 82vw, 28rem"
                  className="industry-card__image"
                />
                <span className="industry-card__pulse" />
              </div>
              <div className="industry-card__body">
                <div className="industry-card__meta">
                  <span>0{index + 1}</span>
                  <em>{industry.persona}</em>
                </div>
                <h3>{industry.name}</h3>
                <p>{industry.detail}</p>
              </div>
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
