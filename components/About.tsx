"use client";

import React from "react";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__left">
            <p className="label">About Izwelakhe</p>
            <h2 className="h2">
              Three Divisions.
              <br />
              <span className="gold">One Unified Force.</span>
            </h2>
            <div className="about__pills">
              {['Strategy', 'Construction', 'Property'].map((p) => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
          </div>
          <div className="about__right">
            <p className="body-text">
              Izwelakhe operates at the intersection of strategic thinking, practical construction,
              and property investment. We serve entrepreneurs, property owners, and organisations
              across South Africa who are ready to build something that lasts.
            </p>
            <p className="body-text">
              Our approach combines local market insight with disciplined execution — delivering
              solutions that address real economic and social needs while creating measurable,
              long-term value.
            </p>
            <div className="about__feature-row">
              <div className="about__feature">
                <span className="about__feature-icon">◈</span>
                <span>Strategic depth</span>
              </div>
              <div className="about__feature">
                <span className="about__feature-icon">◉</span>
                <span>Proven execution</span>
              </div>
              <div className="about__feature">
                <span className="about__feature-icon">◎</span>
                <span>SA-market ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about__scan-line" />
    </section>
  );
}
