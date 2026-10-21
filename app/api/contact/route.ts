import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { business } from '@/config/business';

export const runtime = 'nodejs';

/* ---------- Mail settings (not secret, so they live in code) ---------- */
const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 587;
const SMTP_SECURE = false; // false = STARTTLS on port 587
const CONTACT_TO_EMAIL = business.email; // where enquiries are delivered

/* ---------- Brand palette (inline styles only: email clients ignore CSS vars) ---------- */
const c = {
  navy: '#102a43',
  blue: '#1769aa',
  bright: '#1687e8',
  orange: '#f59e0b',
  pale: '#f3f7fa',
  ink: '#243447',
  muted: '#627386',
  line: '#dce5ed',
  white: '#ffffff',
};

const font =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

/* ---------- Helpers ---------- */
const limit = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    })[char] || char,
  );

/* ---------- Email template ---------- */
function buildEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  area: string;
  contactMethod: string;
  details: string;
}) {
  const { name, email, phone, service, area, contactMethod, details } = data;

  const brandName = business.name;
  const [first, ...rest] = brandName.split(' ');
  const tagline = rest.join(' ');
  const telHref = phone.replace(/[^\d+]/g, '');

  const detailRows: [string, string][] = [
    [
      'Email',
      `<a href="mailto:${escapeHtml(email)}" style="color:${c.blue};text-decoration:none;font-weight:600;">${escapeHtml(email)}</a>`,
    ],
    [
      'Phone',
      phone
        ? `<a href="tel:${escapeHtml(telHref)}" style="color:${c.blue};text-decoration:none;font-weight:600;">${escapeHtml(phone)}</a>`
        : `<span style="color:${c.muted};">Not provided</span>`,
    ],
    ['Service area', area ? escapeHtml(area) : `<span style="color:${c.muted};">Not provided</span>`],
    [
      'Preferred contact',
      contactMethod
        ? escapeHtml(contactMethod)
        : `<span style="color:${c.muted};">Not provided</span>`,
    ],
  ];

  const rowsHtml = detailRows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:14px 0;${i > 0 ? `border-top:1px solid ${c.line};` : ''}width:38%;vertical-align:top;font-family:${font};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${c.muted};">${label}</td>
          <td style="padding:14px 0;${i > 0 ? `border-top:1px solid ${c.line};` : ''}vertical-align:top;font-family:${font};font-size:15px;line-height:1.5;color:${c.ink};">${value}</td>
        </tr>`,
    )
    .join('');

  const replyHref = `mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: your ${service} enquiry`)}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>New enquiry from ${escapeHtml(name)}</title>
</head>
<body style="margin:0;padding:0;background:${c.pale};">
  <!-- Preheader (inbox preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${c.pale};">
    ${escapeHtml(name)} is asking about ${escapeHtml(service)}.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${c.pale};">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${c.white};border:1px solid ${c.line};border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:${c.navy};padding:26px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" valign="middle" width="44" height="44" style="width:44px;height:44px;background:${c.bright};border-radius:10px;font-family:${font};font-size:24px;font-weight:800;color:${c.white};line-height:44px;">${escapeHtml(first.charAt(0))}</td>
                      </tr>
                    </table>
                  </td>
                  <td style="vertical-align:middle;padding-left:14px;">
                    <div style="font-family:${font};font-size:22px;font-weight:800;letter-spacing:-0.02em;text-transform:uppercase;color:${c.white};line-height:1;">${escapeHtml(first)}</div>
                    ${tagline ? `<div style="font-family:${font};font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${c.line};padding-top:6px;line-height:1;">${escapeHtml(tagline)}</div>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent bar -->
          <tr><td style="height:4px;line-height:4px;font-size:0;background:${c.orange};">&nbsp;</td></tr>

          <!-- Title -->
          <tr>
            <td style="padding:32px 32px 8px;">
              <div style="font-family:${font};font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${c.blue};">New website enquiry</div>
              <h1 style="margin:8px 0 14px;font-family:${font};font-size:26px;line-height:1.25;font-weight:800;letter-spacing:-0.02em;color:${c.navy};">${escapeHtml(name)} would like to hear from you</h1>
              <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:${c.pale};border:1px solid ${c.line};font-family:${font};font-size:13px;font-weight:700;color:${c.blue};">${escapeHtml(service)}</span>
            </td>
          </tr>

          <!-- Contact details -->
          <tr>
            <td style="padding:20px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${c.line};border-bottom:1px solid ${c.line};">
                ${rowsHtml}
              </table>
            </td>
          </tr>

          <!-- Job description -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <div style="font-family:${font};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${c.muted};padding-bottom:10px;">Job description</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:${c.pale};border-left:4px solid ${c.orange};border-radius:8px;padding:18px 20px;font-family:${font};font-size:15px;line-height:1.7;color:${c.ink};">${escapeHtml(details).replace(/\n/g, '<br />')}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Buttons -->
          <tr>
            <td style="padding:24px 32px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:8px;background:${c.bright};">
                    <a href="${replyHref}" style="display:inline-block;padding:13px 26px;font-family:${font};font-size:15px;font-weight:700;color:${c.white};text-decoration:none;border-radius:8px;">Reply to ${escapeHtml(name.split(' ')[0])}</a>
                  </td>
                  ${
                    phone
                      ? `<td style="width:12px;">&nbsp;</td>
                  <td style="border-radius:8px;border:2px solid ${c.line};">
                    <a href="tel:${escapeHtml(telHref)}" style="display:inline-block;padding:11px 24px;font-family:${font};font-size:15px;font-weight:700;color:${c.navy};text-decoration:none;border-radius:8px;">Call ${escapeHtml(phone)}</a>
                  </td>`
                      : ''
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${c.pale};border-top:1px solid ${c.line};padding:20px 32px;">
              <p style="margin:0;font-family:${font};font-size:12px;line-height:1.6;color:${c.muted};">
                Sent from the contact form on your website. Hitting reply goes straight to ${escapeHtml(name)}.
              </p>
            </td>
          </tr>

        </table>

        <p style="margin:18px 0 0;font-family:${font};font-size:12px;color:${c.muted};">&copy; ${new Date().getFullYear()} ${escapeHtml(brandName)}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  area: string;
  contactMethod: string;
  details: string;
}) {
  return [
    `NEW WEBSITE ENQUIRY: ${data.service}`,
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || 'Not provided'}`,
    `Service: ${data.service}`,
    `Area: ${data.area || 'Not provided'}`,
    `Preferred contact: ${data.contactMethod || 'Not provided'}`,
    '',
    'Job description:',
    data.details,
  ].join('\n');
}

/* ---------- Route ---------- */
export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);

    if (contentLength > 12000) {
      return NextResponse.json(
        { error: 'Request is too large.' },
        { status: 413 },
      );
    }

    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = limit(body.name, 100);
    const email = limit(body.email, 160);
    const phone = limit(body.phone, 40);
    const service = limit(body.service, 80);
    const area = limit(body.area, 160);
    const contactMethod = limit(body.contactMethod, 30);
    const details = limit(body.details, 3000);

    if (
      !name ||
      !email ||
      !service ||
      !details ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        {
          error: 'Please complete the required fields with valid details.',
        },
        { status: 400 },
      );
    }

    // Only the credentials are secret, so only these come from .env
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          error:
            'Contact form email is not configured yet. Please call or WhatsApp us instead.',
        },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const data = { name, email, phone, service, area, contactMethod, details };

    await transporter.sendMail({
      from: `"${oneLine(business.name).replace(/"/g, '')} Website" <${smtpUser}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: oneLine(`New ${service} enquiry from ${name}`),
      text: buildEmailText(data),
      html: buildEmailHtml(data),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      '[contact] delivery failed',
      error instanceof Error ? error.message : 'unknown error',
    );

    return NextResponse.json(
      {
        error: 'We could not send your enquiry. Please try calling instead.',
      },
      { status: 500 },
    );
  }
}