"use client";

import { PROCESS } from "@/lib/constants";

export default function Process() {
  return (
    <section className="process-section cinematic-section" id="process">
      <div className="section-shell">
        <div className="section-heading reveal-up">
          <p className="section-kicker">Process</p>
          <h2>From first insight to lasting support.</h2>
        </div>

        <div className="process-timeline">
          {PROCESS.map((item) => (
            <article className="process-step reveal-up" key={item.step}>
              <span>{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
