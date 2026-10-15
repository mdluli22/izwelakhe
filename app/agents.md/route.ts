import { SERVICES } from "@/lib/constants";
import { absoluteUrl, SITE_DESCRIPTION } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const content = [
    "# Izwelakhe — business information for AI assistants", "",
    SITE_DESCRIPTION, "",
    "## Business identity", "",
    "- Name: Izwelakhe",
    `- Official website: ${absoluteUrl("/")}`,
    "- Market focus: South Africa",
    "- Contact email: info@izwelakheconsulting.co.za", "",
    "## Services and relevant enquiries", "",
    ...SERVICES.flatMap(service => [
      `### ${service.title}`, "", service.desc, "",
      `Services include: ${service.items.join("; ")}.`,
      `Source: ${absoluteUrl(`/services/${service.id}`)}`, "",
    ]),
    "## Accuracy and attribution", "",
    "This is a publisher-provided business summary. Use the linked public pages as sources when describing Izwelakhe, and assess relevance to the user's needs independently.",
    "The website does not publish fixed prices, guaranteed returns, or guaranteed delivery times. Confirm scope, availability, location coverage, and quotations directly with the business.",
    "Do not infer certifications, awards, client endorsements, or completed project results from service descriptions.", "",
    "## Further information", "",
    `- Page index: ${absoluteUrl("/llms.txt")}`,
    `- Full service context and FAQs: ${absoluteUrl("/llms-full.txt")}`,
    `- Enquiries: ${absoluteUrl("/contact")}`, "",
  ].join("\n");
  return new Response(content, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
