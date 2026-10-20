
'use client'

import { ArrowRight, Menu, Phone, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { business, navLinks, services } from '@/config/business'
import { BrandLogo } from './brand-logo'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header
      className={`site-header${isHome ? ' site-header-home' : ' site-header-interior'}`}
    >
      <div className="container header-inner">
        <BrandLogo />
        {/* <Link href="/" className="brand" aria-label={`${business.name} home`}>
          <span className="brand-mark">
            <Sparkles size={17} />
          </span>
          <span>{business.name}</span>
        </Link> */}

        <nav className="desktop-nav" aria-label="Primary navigation">
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
        <nav className="mobile-nav" aria-label="Mobile navigation">
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
  )
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <BrandLogo className="footer-brand" />
          {/* <Link href="/" className="brand footer-brand">
            <span className="brand-mark">
              <Sparkles size={17} />
            </span>
            <span>{business.name}</span>
          </Link> */}

          <p className="footer-copy">
            Professional plumbing, gas and electrical services for homes and
            businesses.
          </p>
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
            <a href={`tel:${business.phone}`}>{business.phone}</a>
            <a href={`tel:${business.secondaryPhone}`}>
              {business.secondaryPhone}
            </a>
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <span>{business.serviceArea}</span>
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
  )
}
