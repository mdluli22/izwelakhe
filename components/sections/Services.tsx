"use client";

import { SERVICES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  return (
    <section className="capabilities-section cinematic-section" id="capabilities">
      <div className="section-shell capability-heading-shell">
        <div className="section-heading reveal-up">
          <p className="section-kicker">Capabilities</p>
          <h2>Disciplines that work as one system.</h2>
        </div>
      </div>

      <div className="capability-stage" aria-label="Izwelakhe capabilities">
        <div className="capability-shell">
          <nav className="capability-rail reveal-up" aria-label="Capability disciplines">
            {SERVICES.map((service, index) => (
              <a
                className={`capability-rail__item ${index === 0 ? "is-active" : ""}`}
                href={`/services/${service.id}`}
                key={service.id}
                data-capability-nav
              >
                <span>0{index + 1}</span>
                <strong>{service.title}</strong>
              </a>
            ))}
          </nav>

          <div className="capability-panels">
            {SERVICES.map((service, index) => (
              <article
                className={`capability-panel ${index === 0 ? "is-active" : ""}`}
                key={service.id}
                data-capability-panel
              >
                <div className="capability-visual">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 56vw"
                    className="capability-image"
                    priority={index === 0}
                  />
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
                  <Link className="capability-link" href={`/services/${service.id}`}>
                    Learn more
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
