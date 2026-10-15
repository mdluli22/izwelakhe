import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/constants";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/contact", ...SERVICES.map(service => `/services/${service.id}`)].map(path => ({ url: absoluteUrl(path) }));
}
