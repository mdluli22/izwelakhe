"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { createAnimatable } from "animejs";
import { NAV } from "@/lib/constants";

type CursorAnimatable = {
  x: (value?: number, duration?: number, ease?: string) => number | void;
  y: (value?: number, duration?: number, ease?: string) => number | void;
  scale: (value?: number, duration?: number, ease?: string) => number | void;
  opacity: (value?: number, duration?: number, ease?: string) => number | void;
  revert: () => void;
};

export default function Hero() {
  const title = useRef<HTMLHeadingElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .fromTo(title.current, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 1.2 })
      .fromTo(copy.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.55");

    const cursorElement = cursor.current;
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    let cursorAnimatable: CursorAnimatable | null = null;

    const onPointerMove = (event: PointerEvent) => {
      if (!cursorElement || !cursorAnimatable) return;

      cursorElement.classList.add("hero-cursor--visible");
      cursorAnimatable.x(event.clientX);
      cursorAnimatable.y(event.clientY);
      cursorAnimatable.opacity(1);
    };

    const onPointerOver = (event: PointerEvent) => {
      if (!cursorElement || !cursorAnimatable) return;

      const target = event.target instanceof Element ? event.target : null;
      const isInteractive = target?.closest("a, button") != null;

      cursorElement.classList.toggle("hero-cursor--interactive", isInteractive);
      cursorAnimatable.scale(isInteractive ? 1.65 : 1);
    };

    const onPointerLeave = () => {
      if (!cursorElement || !cursorAnimatable) return;

      cursorElement.classList.remove("hero-cursor--visible", "hero-cursor--interactive");
      cursorAnimatable.opacity(0);
      cursorAnimatable.scale(0.82);
    };

    if (cursorElement && supportsFinePointer) {
      cursorAnimatable = createAnimatable(cursorElement, {
        x: 420,
        y: 420,
        scale: 260,
        opacity: 180,
        ease: "out(3)",
      }) as unknown as CursorAnimatable;

      cursorAnimatable.scale(0.82, 0);
      cursorAnimatable.opacity(0, 0);

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerover", onPointerOver, { passive: true });
      document.documentElement.addEventListener("mouseleave", onPointerLeave, { passive: true });
    }

    return () => {
      timeline.kill();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
      cursorAnimatable?.revert();
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
        <nav className="hero-nav__links" aria-label="Primary">
          {NAV.map((item) => (
            <a
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

      {/* Text */}
      <div className="hero-content">
        <div className="hero-content__inner">
          {/* <p ref={eyebrow} className="hero-kicker">
            Izwelakhe
          </p> */}

          <h1 ref={title} className="hero-title">
            Engineering
            <span>Africa&apos;s</span>
            future
          </h1>

          <div ref={copy} className="hero-copy">
            <p>
              We do not just build. We shape what is next through strategy, construction, and property development.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="hero-action hero-action--primary">
                Explore our work
              </a>
            </div>
          </div>

          {/* <div className="hero-index" aria-hidden="true">
            <span>01</span>
            <span>03</span>
            <span>SA</span>
          </div> */}
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <span />
      </div>

      <div className="hero-side-label" aria-hidden="true">
        <span>Izwelakhe</span>
        <span>Future-ready assets</span>
      </div>

      {/* <div className="hero-corner" aria-hidden="true">
        <span>
          360°
          <br />
          delivery
        </span>
      </div> */}

      <div ref={cursor} className="hero-cursor" aria-hidden="true" />
    </section>
  );
}
