"use client";

import { PROJECTS, STATS } from "@/lib/constants";
import Image from "next/image";

export default function Projects() {
  return (
    <section className="projects-section cinematic-section" id="projects">
      <div className="section-shell">
        <div className="section-heading reveal-up">
          <p className="section-kicker">Projects</p>
          <h2>Selected directions for future-ready value.</h2>
        </div>

        <div className="project-list">
          {PROJECTS.map((project, index) => (
            <article className="project-row reveal-up" key={project.title}>
              <div className="project-media" aria-hidden="true">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 52vw"
                  className="project-media__image"
                />
                <span className="project-media__index">0{index + 1}</span>
                <span>{project.sector}</span>
              </div>
              <div className="project-body">
                <p>0{index + 1}</p>
                <h3>{project.title}</h3>
                <span>{project.metric}</span>
                <p>{project.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="stats-grid" aria-label="Izwelakhe statistics">
          {STATS.map((stat) => (
            <div className="stat-block reveal-up" key={stat.label}>
              <strong>{stat.num}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
