"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// import { STATS } from "../lib/constants";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setTimeout(() => setHeroLoaded(true), 100);
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const particles: any[] = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  const heroParallax = scrollY * 0.4;

  return (
    <section className="hero" id="home">
      <canvas ref={canvasRef} className="hero__canvas" />
      <div className="hero__bg" style={{ transform: `translateY(${heroParallax}px)` }}>
        <Image
          src="/izwelakhe_landingPic.webp"
          alt="Izwelakhe background"
          fill
          priority
          quality={100}
          unoptimized
          className="hero__bg-image"
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            position: "absolute",
          }}
        />
        <div className="hero__bg-overlay" />
        <div className="hero__grid-lines" />
      </div>

      <div className={`hero__content ${heroLoaded ? "hero__content--visible" : ""}`}>
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" />
          <span>MULTI-DISCIPLINARY SOLUTIONS</span>
          <span className="hero__eyebrow-dot" />
        </div>

        <h1 className={`hero__title ${glitchActive ? "hero__title--glitch" : ""}`} data-text="BUILDING">
          BUILDING
        </h1>
        <div className="hero__title-row2">
          <span className="hero__title-outline">STRATEGY</span>
          <span className="hero__title-amp">&</span>
          <span className="hero__title-outline">LEGACY</span>
        </div>

        <p className="hero__sub">
          Turning vision into reality — business consulting,
          <br className="hero__br" />
          construction, and property development across Cape Town.
        </p>

        <div className="hero__actions">
          <a href="#services" className="btn btn--gold">EXPLORE SERVICES</a>
          <a href="#contact" className="btn btn--outline">START A PROJECT →</a>
        </div>
      </div>

      {/* <div className={`hero__stats ${heroLoaded ? "hero__stats--visible" : ""}`}>
        {STATS.map((s) => (
          <div key={s.num} className="hero__stat">
            <span className="hero__stat-num">{s.num}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div> */}

      <div className="hero__scroll-cue">
        <div className="hero__scroll-line" />
        <span>SCROLL</span>
      </div>
    </section>
  );
}
