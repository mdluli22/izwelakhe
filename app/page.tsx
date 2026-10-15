import HomePage from "@/components/HomePage";
import StructuredData from "@/components/StructuredData";
import { SERVICES } from "@/lib/constants";
import { absoluteUrl, pageMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata = pageMetadata("Izwelakhe | Business Consulting, Construction & Property Development", SITE_DESCRIPTION, "/");

export default function Page() {
  return <>
    <StructuredData data={{
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: "Izwelakhe", url: absoluteUrl("/"), logo: absoluteUrl("/Izwelakhe_Logo.png"), description: SITE_DESCRIPTION, email: "info@izwelakheconsulting.co.za", areaServed: { "@type": "Country", name: "South Africa" }, hasOfferCatalog: { "@type": "OfferCatalog", name: "Izwelakhe services", itemListElement: SERVICES.map(service => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.title, url: absoluteUrl(`/services/${service.id}`) } })) } },
        { "@type": "WebSite", "@id": absoluteUrl("/#website"), name: "Izwelakhe", url: absoluteUrl("/"), inLanguage: "en-ZA", publisher: { "@id": absoluteUrl("/#organization") } },
      ],
    }} />
    <HomePage />
  </>;
}
