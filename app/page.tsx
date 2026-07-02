"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Hero from "../components/Hero";
import Story from "@/components/sections/Story";
import Services from "@/components/sections/Services";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });

    let rafId = 0;
    let running = true;

    const raf = (time: number) => {
      if (!running) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    const revealAnimations = gsap.utils.toArray<HTMLElement>(".reveal-up").map((element) =>
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 56 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
          },
        }
      )
    );

    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-premium",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    heroTimeline
      .to(".hero-title", { scale: 0.86, y: -72, transformOrigin: "left center", ease: "none" }, 0)
      .to(".hero-copy, .hero-kicker", { y: -48, autoAlpha: 0.35, ease: "none" }, 0)
      .to(".hero-premium canvas", { scale: 1.08, ease: "none" }, 0);

    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => {
      const section = document.querySelector<HTMLElement>(".industries-section");
      const pin = document.querySelector<HTMLElement>(".industry-pin");
      const track = document.querySelector<HTMLElement>(".industry-track");
      const progress = document.querySelector<HTMLElement>(".industry-progress__bar");

      if (!section || !pin || !track) return undefined;

      const getTravel = () => Math.max(0, track.scrollWidth - pin.clientWidth);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(900, getTravel() * 1.15)}`,
          scrub: 1.35,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => lenis.options.duration = 1.45,
          onEnterBack: () => lenis.options.duration = 1.45,
          onLeave: () => lenis.options.duration = 1.25,
          onLeaveBack: () => lenis.options.duration = 1.25,
        },
      });

      timeline
        .to(track, { x: () => -getTravel(), ease: "none" }, 0)
        .to(progress, { scaleX: 1, ease: "none" }, 0);

      return timeline;
    });

    ScrollTrigger.refresh();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      media.revert();
      heroTimeline.kill();
      revealAnimations.forEach((animation) => animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <main className="site-home">
      <Hero />
      <Story />
      <Services />
      <Industries />
      <Process />
      <Projects />
      <CTA />
      <Contact />
      <footer className="site-footer">
        <div className="section-shell">
          <strong>Izwelakhe</strong>
          <nav aria-label="Footer">
            <a href="#mission">Mission</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#industries">Industries</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
