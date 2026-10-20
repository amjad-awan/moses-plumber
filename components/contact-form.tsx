
'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { services, business } from '@/config/business';

export function ContactForm({
  selectedService = '',
}: {
  selectedService?: string;
}) {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: selectedService,
    area: '',
    contactMethod: 'Phone',
    details: '',
    website: '',
  });

  const update = (key: string, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit request.');
      }

      setStatus('success');
      setMessage(
        'Thanks — your enquiry has been received. We will be in touch using your preferred contact method.',
      );

      setForm({
        name: '',
        email: '',
        phone: '',
        service: selectedService,
        area: '',
        contactMethod: 'Phone',
        details: '',
        website: '',
      });
    } catch (error) {
      setStatus('error');
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    }
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-5"
      aria-describedby="form-status"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          value={form.website}
          onChange={(e) => update('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field">
          <span>
            Full name <b>*</b>
          </span>
          <input
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Your name"
            maxLength={100}
          />
        </label>

        <label className="field">
          <span>
            Email address <b>*</b>
          </span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="you@example.com"
            maxLength={160}
          />
        </label>

        <label className="field">
          <span>Phone number</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="Your phone number"
            maxLength={40}
          />
        </label>

        <label className="field">
          <span>
            Service required <b>*</b>
          </span>
          <select
            required
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option>Other</option>
          </select>
        </label>

        <label className="field">
          <span>Service address or area</span>
          <input
            value={form.area}
            onChange={(e) => update('area', e.target.value)}
            placeholder={
              business.serviceArea === '[SERVICE_AREA]'
                ? 'Your suburb or area'
                : business.serviceArea
            }
            maxLength={160}
          />
        </label>

        <label className="field">
          <span>Preferred contact method</span>
          <select
            value={form.contactMethod}
            onChange={(e) => update('contactMethod', e.target.value)}
          >
            <option>Phone</option>
            <option>Email</option>
            <option>WhatsApp</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>
          Message or job description <b>*</b>
        </span>
        <textarea
          required
          value={form.details}
          onChange={(e) => update('details', e.target.value)}
          placeholder="Tell us a little about what you need help with..."
          rows={5}
          maxLength={3000}
        />
      </label>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="button button-primary"
          disabled={status === 'loading'}
          type="submit"
        >
          {status === 'loading' ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <ArrowUpRight size={18} />
          )}
          {status === 'loading' ? 'Sending...' : 'Request a quote'}
        </button>

        <p
          id="form-status"
          role="status"
          className={`text-sm ${
            status === 'error' ? 'text-red-600' : 'text-slate-500'
          }`}
        >
          {status === 'success' && (
            <CheckCircle2
              className="mr-2 inline-block text-emerald-600"
              size={16}
            />
          )}
          {message}
        </p>
      </div>
    </form>
  );
}
