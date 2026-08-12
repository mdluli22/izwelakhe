import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const CONTACT_RECIPIENT = "sifiso@izwelakheconsulting.co.za";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

export const runtime = "nodejs";

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

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (!value) return fallback;
  if (value.toLowerCase() === "true") return true;
  if (value.toLowerCase() === "false") return false;
  return null;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim() ?? "";
  const portValue = process.env.SMTP_PORT?.trim() || "587";
  const user = process.env.SMTP_USER?.trim() ?? "";
  const password = process.env.SMTP_PASSWORD ?? "";
  const from = process.env.SMTP_FROM?.trim() ?? "";

  if (!/^\d{1,5}$/.test(portValue)) return null;

  const port = Number(portValue);
  const secure = parseBoolean(process.env.SMTP_SECURE?.trim(), port === 465);
  const requireTLS = parseBoolean(process.env.SMTP_REQUIRE_TLS?.trim(), port !== 465);

  if (
    !host ||
    port < 1 ||
    port > 65535 ||
    secure === null ||
    requireTLS === null ||
    !from ||
    Boolean(user) !== Boolean(password)
  ) {
    return null;
  }

  return { host, port, secure, requireTLS, user, password, from };
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

  const smtp = getSmtpConfig();

  if (!smtp) {
    console.error("Contact form SMTP configuration is missing or invalid.");
    return NextResponse.json(
      { error: "The email service is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  const { html, text } = buildEmail(payload);

  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      requireTLS: smtp.requireTLS,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
      ...(smtp.user
        ? {
            auth: {
              user: smtp.user,
              pass: smtp.password,
            },
          }
        : {}),
    });

    await transporter.sendMail({
      from: smtp.from,
      to: CONTACT_RECIPIENT,
      replyTo: payload.email,
      subject: `Website enquiry: ${payload.service} — ${payload.name}`,
      html,
      text,
      headers: {
        "X-Contact-Submission-ID": payload.submissionId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form SMTP delivery failed.", error);
    return NextResponse.json(
      { error: "We could not send your enquiry right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
