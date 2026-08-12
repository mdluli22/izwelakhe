import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const CONTACT_RECIPIENT = "sifiso@izwelakheconsulting.co.za";
const DEFAULT_SENDER = "Izwelakhe Website <website@izwelakheconsulting.co.za>";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const recentRequests = new Map<string, number[]>();

const allowedServices = new Set([
  "Business Consulting",
  "Construction & Maintenance",
  "Property Development",
  "Integrated engagement",
]);

const allowedTimelines = new Set([
  "",
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Exploratory",
]);

const allowedBudgets = new Set([
  "",
  "Under R100,000",
  "R100,000–R500,000",
  "R500,000–R2,000,000",
  "R2,000,000+",
]);

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  timeline: string;
  budget: string;
  message: string;
  website: string;
  submissionId: string;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parsePayload(value: unknown): ContactPayload | null {
  if (!value || typeof value !== "object") return null;

  const input = value as Record<string, unknown>;
  return {
    name: getString(input.name),
    email: getString(input.email).toLowerCase(),
    phone: getString(input.phone),
    company: getString(input.company),
    service: getString(input.service),
    timeline: getString(input.timeline),
    budget: getString(input.budget),
    message: getString(input.message),
    website: getString(input.website),
    submissionId: getString(input.submissionId),
  };
}

function isValidPayload(payload: ContactPayload) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const submissionPattern = /^[a-f0-9-]{36}$/i;
  const hasLineBreak = (value: string) => /[\r\n]/.test(value);

  return (
    payload.name.length >= 2 &&
    payload.name.length <= 120 &&
    !hasLineBreak(payload.name) &&
    payload.email.length <= 254 &&
    emailPattern.test(payload.email) &&
    !hasLineBreak(payload.email) &&
    payload.phone.length <= 50 &&
    !hasLineBreak(payload.phone) &&
    payload.company.length <= 160 &&
    !hasLineBreak(payload.company) &&
    allowedServices.has(payload.service) &&
    allowedTimelines.has(payload.timeline) &&
    allowedBudgets.has(payload.budget) &&
    payload.message.length >= 10 &&
    payload.message.length <= 5000 &&
    submissionPattern.test(payload.submissionId)
  );
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character
  );
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return request.headers.get("x-real-ip") ?? forwardedFor ?? "unknown";
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const activeRequests = (recentRequests.get(clientKey) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (activeRequests.length >= RATE_LIMIT_MAX) {
    recentRequests.set(clientKey, activeRequests);
    return true;
  }

  activeRequests.push(now);
  recentRequests.set(clientKey, activeRequests);
  return false;
}

function buildEmail(payload: ContactPayload) {
  const fields = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone || "Not provided"],
    ["Company", payload.company || "Not provided"],
    ["Service", payload.service],
    ["Preferred timeline", payload.timeline || "Not specified"],
    ["Indicative budget", payload.budget || "Not specified"],
  ];

  const text = [
    "New website enquiry",
    "",
    ...fields.map(([label, fieldValue]) => `${label}: ${fieldValue}`),
    "",
    "Project brief:",
    payload.message,
  ].join("\n");

  const rows = fields
    .map(
      ([label, fieldValue]) => `
        <tr>
          <td style="padding:8px 16px 8px 0;color:#6b6b68;font-size:13px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;color:#141618;font-size:14px;vertical-align:top;">${escapeHtml(fieldValue)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="margin:0;background:#f7f6f2;padding:32px;font-family:Arial,sans-serif;color:#141618;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #deddd9;padding:32px;">
        <p style="margin:0 0 12px;color:#9a7125;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Izwelakhe website</p>
        <h1 style="margin:0 0 24px;font-size:28px;font-weight:400;">New project enquiry</h1>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #deddd9;border-bottom:1px solid #deddd9;">${rows}</table>
        <h2 style="margin:28px 0 10px;font-size:16px;">Project brief</h2>
        <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.7;">${escapeHtml(payload.message)}</p>
      </div>
    </div>`;

  return { html, text };
}

export async function POST(request: Request) {
  let rawPayload: unknown;

  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = parsePayload(rawPayload);

  if (!payload) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot fields are invisible to people but commonly filled by form bots.
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  if (!isValidPayload(payload)) {
    return NextResponse.json({ error: "Please check the form fields and try again." }, { status: 400 });
  }

  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json(
      { error: "Too many enquiries were submitted. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_SENDER;

  if (!apiKey) {
    console.error("Contact form email service is missing RESEND_API_KEY.");
    return NextResponse.json(
      { error: "The email service is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const { html, text } = buildEmail(payload);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact-${payload.submissionId}`,
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_RECIPIENT],
        reply_to: payload.email,
        subject: `Website enquiry: ${payload.service} — ${payload.name}`,
        html,
        text,
        tags: [{ name: "source", value: "website_contact" }],
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`Contact form email provider returned status ${response.status}.`);
      return NextResponse.json(
        { error: "We could not send your enquiry right now. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("Contact form could not reach the email provider.");
    return NextResponse.json(
      { error: "We could not send your enquiry right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
