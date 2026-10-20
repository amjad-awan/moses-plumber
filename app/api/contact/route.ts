
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const limit = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

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

export async function POST(request: Request) {
  try {
    const contentLength = Number(
      request.headers.get('content-length') || 0,
    );

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

    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.CONTACT_TO_EMAIL ||
      !process.env.CONTACT_FROM_EMAIL
    ) {
      return NextResponse.json(
        {
          error:
            'Contact form email is not configured yet. Please call or WhatsApp us instead.',
        },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const rows = [
      ['Name', name],
      ['Email', email],
      ['Phone', phone || 'Not provided'],
      ['Service', service],
      ['Area', area || 'Not provided'],
      ['Preferred contact', contactMethod || 'Not provided'],
    ]
      .map(
        ([label, value]) =>
          `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`,
      )
      .join('');

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New ${service} enquiry from ${name}`,
      text: `Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Area: ${area}
Preferred contact: ${contactMethod}

${details}`,
      html: `<h2>New service enquiry</h2>${rows}<p><strong>Job description:</strong></p><p>${escapeHtml(details).replace(/\n/g, '<br />')}</p>`,
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
