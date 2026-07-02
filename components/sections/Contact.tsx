"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const initialForm = {
  name: "",
  email: "",
  service: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="contact-section cinematic-section" id="contact">
      <div className="section-shell contact-shell">
        <div className="contact-intro reveal-up">
          <p className="section-kicker">Contact</p>
          <h2>Tell us what you are building.</h2>
          <p>
            Whether the work begins with strategy, construction, or property development, we will help shape the
            path from idea to durable value.
          </p>
        </div>

        <form className="contact-form reveal-up" onSubmit={submitForm}>
          {submitted ? (
            <div className="contact-success">
              <strong>Message received.</strong>
              <span>We will be in touch shortly.</span>
            </div>
          ) : (
            <>
              <label>
                <span>Name</span>
                <input name="name" value={formData.name} onChange={updateField} required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" value={formData.email} onChange={updateField} required />
              </label>
              <label>
                <span>Service</span>
                <select name="service" value={formData.service} onChange={updateField} required>
                  <option value="">Select a discipline</option>
                  <option>Business Consulting</option>
                  <option>Construction & Maintenance</option>
                  <option>Property Development</option>
                </select>
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={5} value={formData.message} onChange={updateField} required />
              </label>
              <button className="cinematic-button" type="submit">
                Send message
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
