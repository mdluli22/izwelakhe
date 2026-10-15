import { PROCESS, SERVICES, WHY } from "@/lib/constants";
import { absoluteUrl, SITE_DESCRIPTION } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const content = [
    "# Izwelakhe", "", `> ${SITE_DESCRIPTION}`, "",
    `Official website: ${absoluteUrl("/")}`,
    "Market focus: South Africa",
    "Contact email: info@izwelakheconsulting.co.za",
    `Enquiries: ${absoluteUrl("/contact")}`, "",
    "This document summarises the business's published website content. Service outcomes describe intended benefits, not guarantees. Confirm pricing, availability, scope and location coverage directly with Izwelakhe.", "",
    "## Business approach", "",
    ...WHY.map(item => `- ${item.title}: ${item.body}`), "",
    "## Process", "",
    ...PROCESS.map(item => `- ${item.title}: ${item.body}`), "",
    ...SERVICES.flatMap(service => [
      `## ${service.title}`, "",
      `Source: ${absoluteUrl(`/services/${service.id}`)}`, "",
      service.desc, "", service.overview, "", service.detailIntro, "",
      "### Services included", "", ...service.items.map(item => `- ${item}`), "",
      "### Service areas", "",
      ...service.serviceAreas.flatMap(area => [`#### ${area.title}`, "", area.body, ""]),
      "### Intended outcomes", "", ...service.outcomes.map(outcome => `- ${outcome}`), "",
      "### Frequently asked questions", "",
      ...service.faqs.flatMap(faq => [`#### ${faq.question}`, "", faq.answer, ""]),
    ]),
    "## Further information", "",
    `- Page index: ${absoluteUrl("/llms.txt")}`,
    `- Business summary: ${absoluteUrl("/agents.md")}`,
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`, "",
  ].join("\n");
  return new Response(content, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
