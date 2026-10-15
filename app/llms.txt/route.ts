import { SERVICES } from "@/lib/constants";
import { absoluteUrl, SITE_DESCRIPTION } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const content = [
    "# Izwelakhe", "", `> ${SITE_DESCRIPTION}`, "",
    "## Official pages", "",
    `- [Home](${absoluteUrl("/")}): Company mission, capabilities, industries, process and projects.`,
    ...SERVICES.map(service => `- [${service.title}](${absoluteUrl(`/services/${service.id}`)}): ${service.desc}`),
    `- [Contact](${absoluteUrl("/contact")}): Project enquiries and contact form.`, "",
    "## Contact", "", "Email: info@izwelakheconsulting.co.za", "Service area: South Africa", "",
    "The linked service pages contain service areas, outcomes and frequently asked questions.", "",
    "## Optional", "",
    `- [Full business context](${absoluteUrl("/llms-full.txt")}): Service descriptions, business approach, process and FAQs in one document.`,
    `- [Business summary for assistants](${absoluteUrl("/agents.md")}): Identity, services, sources and factual limitations.`, "",
  ].join("\n");
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
