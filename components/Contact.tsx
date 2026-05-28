"use client";

import React from "react";

type FormData = { name: string; email: string; phone: string; service: string; message: string };

type Props = {
  formData: FormData;
  formSent: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function Contact({ formData, formSent, onChange, onSubmit }: Props) {
  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <div className="contact__left">
            <p className="label">Contact Us</p>
            <h2 className="h2">Let's Start<br /><span className="gold">a Conversation.</span></h2>
            <div className="contact__info">
              <div className="contact__info-item">
                <span className="contact__info-icon">✉</span>
                <div>
                  <p className="contact__info-label">Email</p>
                  <p className="contact__info-val">info@izwelakheconsulting.co.za</p>
                </div>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-icon">◷</span>
                <div>
                  <p className="contact__info-label">Office Hours</p>
                  <p className="contact__info-val">Mon – Fri · 08:00 – 17:00</p>
                </div>
              </div>
              <div className="contact__info-item">
                <span className="contact__info-icon">◉</span>
                <div>
                  <p className="contact__info-label">Based In</p>
                  <p className="contact__info-val">South Africa</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact__right">
            {formSent ? (
              <div className="form-success">
                <div className="form-success__icon">✓</div>
                <h3 className="form-success__title">Message Received</h3>
                <p className="form-success__body">We'll be in touch with you shortly.</p>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit}>
                <div className="form__row">
                  <div className="form__field">
                    <label className="form__label">Full Name</label>
                    <input name="name" className="form__input" placeholder="John Smith" value={formData.name} onChange={onChange} required />
                  </div>
                  <div className="form__field">
                    <label className="form__label">Email Address</label>
                    <input name="email" type="email" className="form__input" placeholder="john@company.co.za" value={formData.email} onChange={onChange} required />
                  </div>
                </div>
                <div className="form__row">
                  <div className="form__field">
                    <label className="form__label">Phone Number</label>
                    <input name="phone" className="form__input" placeholder="+27 XX XXX XXXX" value={formData.phone} onChange={onChange} />
                  </div>
                  <div className="form__field">
                    <label className="form__label">Service Required</label>
                    <select name="service" className="form__input form__select" value={formData.service} onChange={onChange} required>
                      <option value="">Select a service…</option>
                      <option>Business Consulting</option>
                      <option>Construction & Maintenance</option>
                      <option>Property Development</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form__field">
                  <label className="form__label">Message</label>
                  <textarea name="message" className="form__input form__textarea" placeholder="Tell us about your project…" rows={5} value={formData.message} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn--gold btn--full">SEND MESSAGE →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
