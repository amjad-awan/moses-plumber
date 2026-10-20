'use client'

import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { business, navLinks, services } from '@/config/business'

export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`brand ${className}`.trim()}
      aria-label={`${business.name} home`}
    >
      <Image
        src="/logo2.png"
        alt=""
        width={40}
        height={40}
        className="brand-logo"
        priority
      />
      {/* <span>{business.name}</span> */}
    </Link>
  )
}