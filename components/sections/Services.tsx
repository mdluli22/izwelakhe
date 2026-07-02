"use client";

import { SERVICES } from "@/lib/constants";

export default function Services() {
  return (
    <section className="capabilities-section cinematic-section" id="capabilities">
      <div className="section-shell">
        <div className="section-heading reveal-up">
          <p className="section-kicker">Capabilities</p>
          <h2>Disciplines that work as one system.</h2>
        </div>
      </div>

      <div className="capability-panels">
        {SERVICES.map((service, index) => (
          <article className="capability-panel reveal-up" key={service.id}>
            <div className="capability-visual" aria-hidden="true">
              <span>{service.icon}</span>
            </div>
            <div className="capability-content">
              <span className="capability-number">0{index + 1}</span>
              <p className="capability-tag">{service.tagline}</p>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <ul>
                {service.items.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
