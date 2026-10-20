import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/config/business'
export const metadata = { title: 'Services | Plumbing, Gas & Electrical' }
export default function ServicesPage() { return <main className="section"><div className="container"><p className="eyebrow">What we do</p><h1 className="page-title">Services for the jobs<br />that keep things moving.</h1><p className="page-lead">Explore our plumbing, gas installation and electrical services, then get in touch to discuss what you need.</p><div className="service-grid">{services.map((service) => <article className="service-card" key={service.slug}><p className="eyebrow">{service.eyebrow}</p><h2>{service.name}</h2><p>{service.description}</p><Link className="card-link" href={`/services/${service.slug}`}>View service <ArrowRight size={16} /></Link></article>)}</div></div></main> }
