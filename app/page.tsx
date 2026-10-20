
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Check,
  CircleCheck,
  Clock3,
  Droplets,
  Flame,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react';
import { business, navLinks, services } from '@/config/business';
import { ContactForm } from '@/components/contact-form';
import ReviewsSection from '@/components/reviews';
import { BrandLogo } from '@/components/brand-logo';

const iconMap = { Droplets, Flame, Zap };

const whatsApp = business.whatsapp.replace(/[^\d]/g, '');

const whatsAppUrl =
  whatsApp && !whatsApp.includes('WHATSAPP')
    ? `https://wa.me/${whatsApp}?text=${encodeURIComponent(
        'Hello, I would like to enquire about your services.',
      )}`
    : '';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
         <BrandLogo />
        {/* <Link
          href="/"
          className="brand"
          aria-label={`${business.name} home`}
        >
          <span className="brand-mark">
            <Sparkles size={17} />
          </span>
          <span>{business.name}</span>
        </Link> */}

        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={`tel:${business.phone}`}>
            <Phone size={16} />
            <span>Call now</span>
          </a>

          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              onClick={() => setOpen(false)}
              key={link.href}
              href={link.href}
            >
              {link.label}
              <ArrowRight size={16} />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-title ${light ? 'light' : ''}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-lead">{text}</p>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand footer-brand">
            <span className="brand-mark">
              <Sparkles size={17} />
            </span>
            <span>{business.name}</span>
          </Link>

          <p className="footer-copy">
            Professional plumbing, gas and electrical services for homes and
            businesses.
          </p>

          <div className="socials">
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Instagram">
              ◎
            </a>
          </div>
        </div>

        <div>
          <h3>Explore</h3>
          <div className="footer-links">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3>Services</h3>
          <div className="footer-links">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3>Get in touch</h3>
          <div className="footer-contact">
            <a href={`tel:${business.phone}`}>
              <Phone size={15} /> {business.phone}
            </a>
            <a href={`tel:${business.secondaryPhone}`}>
              <Phone size={15} /> {business.secondaryPhone}
            </a>
            <a href={`mailto:${business.email}`}>
              <Mail size={15} /> {business.email}
            </a>
            <a href={`mailto:${business.secondaryEmail}`}>
              <Mail size={15} /> {business.secondaryEmail}
            </a>
            <span>
              <MapPin size={15} /> {business.serviceArea}
            </span>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </span>
        <Link href="/privacy-policy">Privacy policy</Link>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section className="hero">
          <div className="hero-image">
            <Image
              src="/tradesperson-hero.png"
              alt="Tradesperson inspecting plumbing equipment"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>

          <div className="hero-overlay" />

          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow orange">
                PLUMBING · GAS · ELECTRICAL
              </p>

              <h1>
                Skilled hands.
                <br />
                <em>Solid solutions.</em>
              </h1>

              <p className="hero-lead">
                Practical help for the jobs that keep your home or business
                running. From plumbing repairs to gas installation and
                electrical work.
              </p>

              <div className="hero-buttons">
                <a
                  href={`tel:${business.phone}`}
                  className="button button-orange"
                >
                  <Phone size={18} /> Call now
                </a>

                <a href="#contact" className="button button-light">
                  Request a quote <ArrowRight size={18} />
                </a>
              </div>

              <div className="trust-row">
                <span>
                  <CircleCheck size={17} /> Clear communication
                </span>
                <span>
                  <CircleCheck size={17} /> One trusted team
                </span>
                <span>
                  <CircleCheck size={17} /> Residential & commercial
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="container intro-grid">
            <div>
              <span className="number">01</span>
              <p>
                One team for the
                <br />
                <strong>jobs that matter.</strong>
              </p>
            </div>

            <p className="intro-description">
              When something needs fixing, you want practical advice and
              capable hands. We bring plumbing, gas and electrical services
              together so you can get on with your day.
            </p>

            <a href="#about" className="text-link">
              Learn more about us <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <SectionTitle
              eyebrow="What we do"
              title="The right trade for the job."
              text="From the everyday fix to the considered installation, get straightforward service from people who understand the work."
            />

            <div className="service-grid">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap];

                return (
                  <article className="service-card" key={service.slug}>
                    <div className="service-top">
                      <span className="service-number">
                        0{index + 1}
                      </span>
                      <div className="icon-box">
                        <Icon size={25} />
                      </div>
                    </div>

                    <p className="eyebrow">{service.eyebrow}</p>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>

                    <ul>
                      {service.items.slice(0, 3).map((item) => (
                        <li key={item}>
                          <Check size={15} /> {item}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      className="card-link"
                    >
                      Explore {service.name.toLowerCase()}{' '}
                      <ArrowRight size={16} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section why-section">
          <div className="container why-grid">
            <div>
              <SectionTitle
                eyebrow="Why choose us"
                title="Good work starts with listening."
                text="Every job is different. We take the time to understand what you need, explain the options clearly and help you choose a practical way forward."
              />

              <Link href="#contact" className="button button-dark">
                Talk to our team <ArrowRight size={18} />
              </Link>
            </div>

            <div className="benefit-list">
              {[
                [
                  '01',
                  'Clear communication',
                  'Straight answers, considered advice and no unnecessary jargon.',
                ],
                [
                  '02',
                  'Multiple trades, one team',
                  'A simpler way to coordinate plumbing, gas and electrical work.',
                ],
                [
                  '03',
                  'Work that fits your needs',
                  'Practical solutions for residential and commercial customers.',
                ],
                [
                  '04',
                  'Easy to reach',
                  'Call, send a WhatsApp message or use the quote form online.',
                ],
              ].map(([number, title, text]) => (
                <div className="benefit" key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-grid">
            <div className="about-photo">
              <Image
                src="/moses-business-flyer.jpeg"
                alt="Moses Gas, Plumbing and Electrical services flyer"
                fill
                sizes="(max-width: 800px) 100vw, 45vw"
              />
            </div>

            <div className="about-copy">
              <SectionTitle
                eyebrow="About the business"
                title="Here to make the complicated feel simple."
                text={`Based in ${business.serviceArea}, ${business.name} provides plumbing, gas installation and electrical services for local homes and businesses.`}
              />

              <p>
                We believe good service is about being clear, respectful and
                prepared. Whether you need help with a repair, an installation
                or ongoing maintenance, we start by understanding the job and
                finish by making sure you know what comes next.
              </p>

              <div className="about-points">
                <span>
                  <ShieldCheck size={20} /> Thoughtful, professional service
                </span>
                <span>
                  <Clock3 size={20} /> Flexible conversations about your needs
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="process-section">
          <div className="container">
            <SectionTitle
              light
              eyebrow="A straightforward process"
              title="From first hello to next steps."
            />

            <div className="process-grid">
              {[
                [
                  '01',
                  'Get in touch',
                  'Call, send a WhatsApp message or complete the quote form.',
                ],
                [
                  '02',
                  'Discuss the job',
                  'We review what you need and talk through the relevant details.',
                ],
                [
                  '03',
                  'Arrange the service',
                  'Agree on the next steps and a time that works for you.',
                ],
              ].map(([num, title, text]) => (
                <div className="process-step" key={num}>
                  <span>{num}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ReviewsSection />

        {/* <section className="section reviews-section" id="reviews">
          <div className="container reviews-inner">
            <SectionTitle
              eyebrow="Customer reviews"
              title="Your experience matters."
              text="Real reviews will be added here as they become available. We welcome the chance to hear about your experience."
            />

            <div className="review-empty">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={19} />
                ))}
              </div>

              <p>Have we helped you recently?</p>

              <a href={business.googleProfileUrl} className="text-link">
                Leave a review on Google <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section> */}

        <section className="section contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-intro">
              <SectionTitle
                eyebrow="Start a conversation"
                title="Tell us what you need."
                text="Share a few details and we’ll get back to you using your preferred contact method."
              />

              <div className="contact-options">
                <a href={`tel:${business.phone}`}>
                  <span>
                    <Phone size={19} />
                  </span>
                  <div>
                    <small>Call us</small>
                    <strong>{business.phone}</strong>
                  </div>
                </a>

                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>W</span>
                    <div>
                      <small>WhatsApp</small>
                      <strong>Send a message</strong>
                    </div>
                  </a>
                )}

                <a href={`mailto:${business.email}`}>
                  <span>
                    <Mail size={19} />
                  </span>
                  <div>
                    <small>Email</small>
                    <strong>{business.email}</strong>
                  </div>
                </a>
              </div>
            </div>

            <div className="form-card">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}

      {whatsAppUrl && (
       <a
  className="whatsapp"
  href={whatsAppUrl}
  target="_blank"
  rel="noreferrer"
  aria-label="Chat with us on WhatsApp"
>
  <MessageCircle size={28} aria-hidden="true" />
</a>
      )}
    </>
  );
}
