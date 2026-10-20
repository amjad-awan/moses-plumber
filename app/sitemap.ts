import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap { const base = 'https://example.com'; return ['', '/services', '/services/plumbing', '/services/gas-installation', '/services/electrical', '/contact', '/privacy-policy'].map((path) => ({ url: `${base}${path}`, lastModified: new Date() })) }
