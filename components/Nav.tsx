"use client";

import React from "react";
import { NAV } from "../lib/constants";

type Props = {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollY: number;
};

export default function Nav({ menuOpen, setMenuOpen, scrollY }: Props) {
  const navBg = scrollY > 80;
  return (
    <nav className={`nav ${navBg ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <a href="#" className="nav__logo">
          <span className="nav__logo-icon">⬡</span>
          IZWELAKHE
        </a>
        <div className="nav__links">
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase().replace(/\s/g, "-")}`} className="nav__link">
              {n}
            </a>
          ))}
          <a href="#contact" className="nav__cta">
            ENQUIRE NOW
          </a>
        </div>
        <button className={`nav__burger ${menuOpen ? "nav__burger--open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={`nav__mobile ${menuOpen ? "nav__mobile--open" : ""}`}>
        {NAV.map((n) => (
          <a key={`m-${n}`} href={`#${n.toLowerCase().replace(/\s/g, "-")}`} className="nav__mobile-link" onClick={() => setMenuOpen(false)}>
            {n}
          </a>
        ))}
        <a href="#contact" className="nav__cta nav__cta--mobile" onClick={() => setMenuOpen(false)}>
          ENQUIRE NOW
        </a>
      </div>
    </nav>
  );
}
