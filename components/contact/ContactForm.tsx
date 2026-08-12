"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  timeline: "",
  budget: "",
  message: "",
  website: "",
};

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submissionId = useRef<string | null>(null);

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setStatus("idle");
    setErrorMessage("");
    submissionId.current = null;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    submissionId.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, submissionId: submissionId.current }),
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "We could not send your enquiry. Please try again.");
      }

      setFormData(initialForm);
      setStatus("success");
      submissionId.current = null;
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "We could not send your enquiry. Please try again.");
    }
  };

  return (
    <form className="contact-page-form" onSubmit={submitForm}>
      <div className="contact-page-form__heading">
        <div>
          <p className="section-kicker">Project brief</p>
          <h2>Give us the essential context.</h2>
        </div>
        <span>Fields marked * are required</span>
      </div>

      <div className="contact-page-form__grid">
        <label>
          <span>Name *</span>
          <input name="name" autoComplete="name" value={formData.name} onChange={updateField} placeholder="Your full name" minLength={2} maxLength={120} required />
        </label>
        <label>
          <span>Work email *</span>
          <input name="email" type="email" autoComplete="email" value={formData.email} onChange={updateField} placeholder="you@company.co.za" maxLength={254} required />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={updateField} placeholder="+27" maxLength={50} />
        </label>
        <label>
          <span>Company</span>
          <input name="company" autoComplete="organization" value={formData.company} onChange={updateField} placeholder="Company or organisation" maxLength={160} />
        </label>
        <label>
          <span>Service *</span>
          <select name="service" value={formData.service} onChange={updateField} required>
            <option value="">Select a discipline</option>
            <option value="Business Consulting">Business Consulting</option>
            <option value="Construction & Maintenance">Construction &amp; Maintenance</option>
            <option value="Property Development">Property Development</option>
            <option value="Integrated engagement">Integrated engagement</option>
          </select>
        </label>
        <label>
          <span>Preferred timeline</span>
          <select name="timeline" value={formData.timeline} onChange={updateField}>
            <option value="">Select a timeframe</option>
            <option value="As soon as possible">As soon as possible</option>
            <option value="Within 1–3 months">Within 1–3 months</option>
            <option value="Within 3–6 months">Within 3–6 months</option>
            <option value="Exploratory">Exploratory</option>
          </select>
        </label>
        <label className="contact-page-form__full">
          <span>Indicative budget</span>
          <select name="budget" value={formData.budget} onChange={updateField}>
            <option value="">Prefer not to say yet</option>
            <option value="Under R100,000">Under R100,000</option>
            <option value="R100,000–R500,000">R100,000–R500,000</option>
            <option value="R500,000–R2,000,000">R500,000–R2,000,000</option>
            <option value="R2,000,000+">R2,000,000+</option>
          </select>
        </label>
        <label className="contact-page-form__full">
          <span>What are you looking to achieve? *</span>
          <textarea name="message" rows={7} value={formData.message} onChange={updateField} placeholder="Describe the opportunity, current challenge, location, and the outcome you need." minLength={10} maxLength={5000} required />
        </label>
        <label className="contact-page-form__honeypot" aria-hidden="true">
          <span>Website</span>
          <input name="website" value={formData.website} onChange={updateField} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="contact-page-form__submit">
        <button className="cinematic-button" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        <p>Your enquiry will be sent directly to the Izwelakhe team. We will reply to the email address you provide.</p>
      </div>

      {status === "success" && (
        <p className="contact-page-form__status contact-page-form__status--success" role="status" aria-live="polite">
          Thank you. Your enquiry has been sent successfully, and our team will be in touch.
        </p>
      )}

      {status === "error" && (
        <p className="contact-page-form__status contact-page-form__status--error" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
