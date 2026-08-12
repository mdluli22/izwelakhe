import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";
import ScrollToTop from "@/components/ScrollToTop";

type ServicePageProps = {
  params: Promise<{ id: string }>;
};

const SERVICE_PAGE_CONFIG = {
  consulting: {
    pageClass: "service-page--consulting",
    focus: "Advisory focus",
    headline: "Clear decisions, operating rhythm, measurable growth.",
    architecture: "Engagement Architecture",
    outcomes: "Executive outcomes",
    snapshot: ["Diagnose", "Prioritise", "Execute"],
    heroImage: "/service-consulting-hero.png",
  },
  construction: {
    pageClass: "service-page--construction",
    focus: "Delivery focus",
    headline: "Reliable delivery, site control, durable improvements.",
    architecture: "Delivery Architecture",
    outcomes: "Delivery outcomes",
    snapshot: ["Scope", "Build", "Support"],
    heroImage: "/service-construction-hero.png",
  },
  property: {
    pageClass: "service-page--property",
    focus: "Development focus",
    headline: "Demand-led assets, sharper operations, stronger yields.",
    architecture: "Asset Architecture",
    outcomes: "Asset outcomes",
    snapshot: ["Acquire", "Prepare", "Operate"],
    heroImage: "/service-property-hero.png",
  },
} as const;

export function generateStaticParams() {
  return SERVICES.map((service) => ({ id: service.id }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { id } = await params;
  const service = SERVICES.find((item) => item.id === id);

  if (!service) {
    return {
      title: "Service Not Found | Izwelakhe",
    };
  }

  return {
    title: `${service.title} | Izwelakhe`,
    description: service.desc,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = SERVICES.find((item) => item.id === id);

  if (!service) {
    notFound();
  }

  const relatedServices = SERVICES.filter((item) => item.id !== service.id);
  const serviceConfig = SERVICE_PAGE_CONFIG[service.id as keyof typeof SERVICE_PAGE_CONFIG];

  return (
    <main className={`service-page ${serviceConfig.pageClass}`}>
      <header className="service-nav">
        <Link href="/" className="service-nav__brand">
          Izwelakhe
        </Link>
        <nav aria-label="Service navigation">
          <Link href="/#capabilities">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="service-hero service-hero--clean">
        <Image
          className="service-hero__image"
          src={serviceConfig.heroImage}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="service-hero__shade" aria-hidden="true" />
        <div className="section-shell service-hero__grid">
          <div className="service-hero__title">
            <Link href="/#capabilities" className="service-back">Back to services</Link>
            <p className="section-kicker">{service.tagline}</p>
            <h1>{service.title}</h1>
          </div>
          <div className="service-hero__copy">
            <p>{service.overview}</p>
            <ol className="service-snapshot" aria-label={`${service.title} engagement snapshot`}>
              {serviceConfig.snapshot.map((item, index) => (
                <li key={item}>
                  <strong>0{index + 1}</strong>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="service-detail service-detail--clean">
        <div className="section-shell">
          <header className="service-detail__heading">
            <p className="section-kicker">{serviceConfig.focus}</p>
            <h2>{serviceConfig.headline}</h2>
            <p>{service.detailIntro}</p>
          </header>

          <div className="service-areas-clean" aria-label={serviceConfig.architecture}>
            <p className="section-kicker">{serviceConfig.architecture}</p>
            <div className="service-diagnostics">
              {service.serviceAreas.map((area, index) => (
                <article key={area.title} className="service-diagnostic">
                  <span>0{index + 1}</span>
                  <h3>{area.title}</h3>
                  <p>{area.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="service-professional-outcomes">
            <p className="section-kicker">{serviceConfig.outcomes}</p>
            <ul>
              {service.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="service-faq service-faq--clean">
        <div className="section-shell service-faq__grid">
          <div>
            <p className="section-kicker">FAQ</p>
            <h2>Frequently asked questions.</h2>
          </div>
          <div className="faq-list">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="service-next service-next--clean">
        <div className="section-shell">
          <p className="section-kicker">Explore more</p>
          <div className="service-next__grid">
            {relatedServices.map((item) => (
              <Link href={`/services/${item.id}`} key={item.id} className="service-next__card">
                <strong>{item.title}</strong>
                <small>{item.desc}</small>
                <span>View service →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ScrollToTop />
    </main>
  );
}
