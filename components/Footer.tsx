"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="nav__logo-icon" style={{ fontSize: 20 }}>⬡</span>
          <span className="footer__name">IZWELAKHE</span>
        </div>
        <span className="footer__tagline">Strategy · Construction · Property</span>
        <span className="footer__copy">© {new Date().getFullYear()} Izwelakhe. All rights reserved.</span>
      </div>
    </footer>
  );
}
