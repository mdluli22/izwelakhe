"use client";

import Icon from "@/components/ui/Icon";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NAV } from "@/lib/constants";

const SLOGAN = "Building vision.\nCreating value.";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedLength, setTypedLength] = useState(SLOGAN.length);
  const menuToggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let length = 0;
    const interval = window.setInterval(() => {
      length += 1;
      setTypedLength(length);
      if (length >= SLOGAN.length) window.clearInterval(interval);
    }, 85);

    const showFullSlogan = () => {
      if (motion.matches) {
        window.clearInterval(interval);
        setTypedLength(SLOGAN.length);
      }
    };
    motion.addEventListener("change", showFullSlogan);
    return () => {
      window.clearInterval(interval);
      motion.removeEventListener("change", showFullSlogan);
    };
  }, []);

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
          ref={menuToggle}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}{" "}<Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <nav id="primary-navigation" className={`hero-nav__links${menuOpen ? " is-open" : ""}`} aria-label="Primary" onKeyDown={(event) => {
          if (event.key === "Escape" && menuOpen) {
            setMenuOpen(false);
            menuToggle.current?.focus();
          }
        }}>
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

      <p className="hero-slogan" aria-label="Building vision. Creating value.">
        {SLOGAN.split("\n").map((line, lineIndex) => (
          <span className="hero-slogan__line" aria-hidden="true" key={line}>
            {Array.from(line).map((character, characterIndex) => (
              <span
                className="hero-slogan__character"
                style={{ opacity: lineIndex * 17 + characterIndex < typedLength ? 1 : 0 }}
                key={characterIndex}
              >
                {character === " " ? "\u00a0" : character}
              </span>
            ))}
          </span>
        ))}
      </p>

      <div className="hero-content">
        <div className="hero-content__inner">
          <h1 className="sr-only">Izwelakhe: Business Consulting, Construction and Property Development in South Africa</h1>
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
