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
      .to(".hero-transition", { opacity: 1, scaleY: 1.08, transformOrigin: "bottom center", ease: "none" }, 0)
      .to(".hero-premium canvas", { scale: 1.08, y: -28, ease: "none" }, 0)
      .fromTo(".mission-section", { y: 72 }, { y: 0, ease: "none" }, 0);

    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => {
      const stage = document.querySelector<HTMLElement>(".capability-stage");
      const shell = document.querySelector<HTMLElement>(".capability-shell");
      const panels = gsap.utils.toArray<HTMLElement>("[data-capability-panel]");
      const navItems = gsap.utils.toArray<HTMLElement>("[data-capability-nav]");

      if (!stage || !shell || panels.length === 0) return undefined;

      const setActiveCapability = (activeIndex: number) => {
        panels.forEach((panel, index) => {
          panel.classList.toggle("is-active", index === activeIndex);
        });

        navItems.forEach((item, index) => {
          item.classList.toggle("is-active", index === activeIndex);
        });
      };

      setActiveCapability(0);

      const capabilityTrigger = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: () => `+=${Math.max(window.innerHeight * 1.9, panels.length * 620)}`,
        scrub: 0.95,
        pin: shell,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.min(panels.length - 1, Math.floor(self.progress * panels.length));
          setActiveCapability(index);
        },
        onLeave: () => setActiveCapability(panels.length - 1),
        onLeaveBack: () => setActiveCapability(0),
      });

      return () => capabilityTrigger.kill();
    });

    media.add("(min-width: 768px)", () => {
      const section = document.querySelector<HTMLElement>(".industries-section");
      const pin = document.querySelector<HTMLElement>(".industry-pin");
      const track = document.querySelector<HTMLElement>(".industry-track");
      const progress = document.querySelector<HTMLElement>(".industry-progress__bar");
      const cards = gsap.utils.toArray<HTMLElement>("[data-industry-card]");

      if (!section || !pin || !track) return undefined;

      const getTravel = () => Math.max(0, track.scrollWidth - pin.clientWidth);
      const updateIndustrySignal = (rawProgress: number) => {
        const activeProgress = rawProgress * Math.max(1, cards.length - 1);
        const activeIndex = Math.min(cards.length - 1, Math.round(activeProgress));

        pin.style.setProperty("--industry-progress", rawProgress.toFixed(4));

        cards.forEach((card, index) => {
          const distance = index - activeProgress;
          const depth = Math.min(Math.abs(distance), 2.4);

          card.classList.toggle("is-active", index === activeIndex);
          card.style.setProperty("--industry-drift", `${0.25 + depth * 1.05}rem`);
          card.style.setProperty("--industry-tilt", `${Math.max(-8, Math.min(8, distance * -4.2))}deg`);
          card.style.setProperty("--industry-scale", `${Math.max(0.925, 1 - depth * 0.034)}`);
          card.style.setProperty("--industry-opacity", `${Math.max(0.38, 1 - depth * 0.26)}`);
        });
      };

      updateIndustrySignal(0);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${Math.max(1100, getTravel() * 1.25)}`,
          scrub: 1.65,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateIndustrySignal(self.progress);
          },
          onEnter: () => lenis.options.duration = 1.45,
          onEnterBack: () => lenis.options.duration = 1.45,
          onLeave: () => {
            lenis.options.duration = 1.25;
            updateIndustrySignal(1);
          },
          onLeaveBack: () => {
            lenis.options.duration = 1.25;
            updateIndustrySignal(0);
          },
        },
      });

      timeline
        .fromTo(track, { x: 0 }, { x: () => -getTravel(), ease: "none" }, 0)
        .fromTo(".industry-cue", { autoAlpha: 0.72, y: 0 }, { autoAlpha: 0.28, y: -18, ease: "none" }, 0)
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
