"use client";

import { useState } from "react";
import Image from "next/image";
import { NAV } from "@/lib/constants";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <section className="hero-premium relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-black">
      <header className="hero-nav">
        <a href="#" className="hero-nav__brand" aria-label="Izwelakhe home">
          <Image
            src="/Izwelakhe_Logo.png"
            alt=""
            width={180}
            height={80}
            priority
          />
        </a>
        <button
          type="button"
          className="hero-nav__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close ✕" : "Menu ☰"}
        </button>
        <nav id="primary-navigation" className={`hero-nav__links${menuOpen ? " is-open" : ""}`} aria-label="Primary">
          {NAV.map((item) => (
            <a
              onClick={() => setMenuOpen(false)}
              key={item}
              href={item === "Contact" ? "/contact" : `#${item.toLowerCase().replace(/\s/g, "-")}`}
            >
              {item}
            </a>
          ))}
        </nav>
        <a href="/contact" className="hero-nav__portal">
          Start a project
        </a>
      </header>

      <div className="hero-media" aria-hidden="true">
        <Image
          className="hero-media__image"
          src="/izwelakhe-hero-development-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
        />
      </div>

      <div className="hero-content">
        <div className="hero-content__inner">
          <div className="hero-actions">
            <a href="#projects" className="hero-action hero-action--primary">
              Explore our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
