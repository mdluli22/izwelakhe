import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import { SERVICES } from "@/lib/constants";

export const metadata = {
  title: "Contact | Izwelakhe",
  description: "Start a conversation with Izwelakhe about business consulting, construction, maintenance, or property development.",
};

const expectations = [
  ["01", "Share the context", "Tell us what you are building, improving, or trying to unlock."],
  ["02", "We assess the fit", "We review the brief against the right discipline, constraints, and next decision."],
  ["03", "Start with clarity", "If there is a fit, we agree on the first practical step and who needs to be involved."],
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <header className="contact-page__nav">
        <Link href="/" className="contact-page__brand" aria-label="Izwelakhe home">
          <Image src="/Izwelakhe_Logo.png" alt="Izwelakhe" width={180} height={80} priority />
        </Link>
        <nav aria-label="Contact page navigation">
          <Link href="/#capabilities">Services</Link>
          <Link href="/#projects">Projects</Link>
          <Link href="/contact" aria-current="page">Contact</Link>
        </nav>
      </header>

      <section className="contact-page__hero">
        <div className="section-shell contact-page__hero-grid">
          <div>
            <p className="section-kicker">Start a conversation</p>
            <h1>Bring us the ambition. We&apos;ll shape the next move.</h1>
          </div>
          <div className="contact-page__hero-copy">
            <p>
              Strategy, construction, and property decisions become easier when the right people understand the
              whole picture. Share the essentials and we will help identify a practical way forward.
            </p>
            <a href="mailto:info@izwelakheconsulting.co.za">info@izwelakheconsulting.co.za</a>
          </div>
        </div>
      </section>

      <section className="contact-page__brief">
        <div className="section-shell contact-page__brief-grid">
          <aside className="contact-page__aside">
            <p className="section-kicker">What happens next</p>
            <div className="contact-page__steps">
              {expectations.map(([number, title, body]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <h2>{title}</h2>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="contact-page__direct">
              <span>Prefer a direct introduction?</span>
              <a href="mailto:info@izwelakheconsulting.co.za">Email Izwelakhe ↗</a>
              <p>South Africa · Project enquiries nationwide</p>
            </div>
          </aside>

          <ContactForm />
        </div>
      </section>

      <section className="contact-page__services">
        <div className="section-shell">
          <div className="contact-page__services-heading">
            <div>
              <p className="section-kicker">Our disciplines</p>
              <h2>Not sure where the work sits?</h2>
            </div>
            <p>Explore each discipline before sending your brief.</p>
          </div>
          <div className="contact-page__service-grid">
            {SERVICES.map((service, index) => (
              <Link href={`/services/${service.id}`} key={service.id}>
                <span>0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <strong>Explore service ↗</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="contact-page__footer">
        <div className="section-shell">
          <strong>Izwelakhe</strong>
          <span>Strategy · Construction · Property</span>
          <Link href="/">Back to home ↑</Link>
        </div>
      </footer>
    </main>
  );
}
