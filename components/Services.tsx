"use client";

import React from "react";
import { SERVICES } from "../lib/constants";

type Props = {
  activeService: number;
  setActiveService: (i: number) => void;
};

export default function Services({ activeService, setActiveService }: Props) {
  return (
    <section className="services" id="services">
      <div className="services__bg-text" aria-hidden>
        SERVICES
      </div>
      <div className="container">
        <div className="section-header">
          <p className="label">What We Do</p>
          <h2 className="h2">Our Divisions</h2>
        </div>

        <div className="services__tabs">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              className={`services__tab ${activeService === i ? "services__tab--active" : ""}`}
              onClick={() => setActiveService(i)}
            >
              <span className="services__tab-icon">{s.icon}</span>
              <span className="services__tab-title">{s.title}</span>
              <span className="services__tab-num">0{i + 1}</span>
            </button>
          ))}
        </div>

        <div className="services__panel">
          <div className="services__panel-left">
            <span className="services__panel-tag">{SERVICES[activeService].tagline}</span>
            <h3 className="services__panel-h3">{SERVICES[activeService].title}</h3>
            <p className="body-text">{SERVICES[activeService].desc}</p>
            <div className="services__panel-badge">{SERVICES[activeService].stat}</div>
            <a href="#contact" className="btn btn--gold">Enquire About This Service</a>
          </div>
          <div className="services__panel-right">
            <div className="services__panel-header">
              <span className="services__panel-icon">{SERVICES[activeService].icon}</span>
              <span>Capabilities</span>
            </div>
            {SERVICES[activeService].items.map((item) => (
              <div key={item} className="services__item">
                <span className="services__item-arrow">→</span>
                <span>{item}</span>
              </div>
            ))}
            <div className="services__panel-corner" />
          </div>
        </div>
      </div>
    </section>
  );
}
