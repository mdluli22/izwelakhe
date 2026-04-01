"use client";

import React, { useState } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import About from "../components/About";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import CtaBand from "../components/CtaBand";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import { CSS } from "./styles.css-string";

export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((s) => ({ ...s, [name]: value }));
  };
  const handleFormSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormSent(true); };

  return (
    <>
      <style>{CSS}</style>
      <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollY={scrollY} />
      <Hero />
      <Ticker />
      <About />
      <Services activeService={activeService} setActiveService={setActiveService} />
      <WhyUs />
      <CtaBand />
      <Contact formData={formData} formSent={formSent} onChange={handleFormChange} onSubmit={handleFormSubmit} />
      <Footer />
    </>
  );
}
