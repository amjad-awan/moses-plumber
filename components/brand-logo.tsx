import Link from 'next/link'
import { business } from '@/config/business'

export function BrandLogo({ className = '' }: { className?: string }) {
  // "Moses Gas, Plumbing & Electrical" -> "Moses" + "Gas, Plumbing & Electrical"
  const [first, ...rest] = business.name.split(' ')
  const tagline = rest.join(' ')

  return (
    <Link
      href="/"
      className={`brand ${className}`.trim()}
      aria-label={`${business.name} home`}
    >
      <span className="brand-badge" aria-hidden="true">
        {first.charAt(0)}
      </span>

      <span className="brand-text">
        <span className="brand-name">{first}</span>
        {tagline && <span className="brand-tagline">{tagline}</span>}
      </span>
    </Link>
  )
}