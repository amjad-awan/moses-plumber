export const business = {
  name: 'Moses Gas, Plumbing & Electrical',
  owner: 'Mato Banda',
  phone: '+27 67 069 4315',
  secondaryPhone: '+27 65 211 7051',
  whatsapp: '+27 67 069 4315',
  email: 'mato.banda573@gmail.com',
  secondaryEmail: 'matobanda29@gmail.com',
  address: 'Cape Town, South Africa',
  serviceArea: 'Parklands, Sea Point, Woodstock, Table View & Blouberg',
  mapsUrl: 'https://www.google.com/maps/search/Cape+Town+South+Africa',
  googleProfileUrl: 'https://www.google.com/search?q=Moses+Gas+Plumbing+Electrical+Cape+Town',
  hours: '24/7 emergency service',
  websiteUrl: 'https://moses-gas-plumbing-electrical.vercel.app',
  logo: '/icon.svg',
} as const

export const services = [
  { slug: 'plumbing', name: 'Plumbing', eyebrow: 'Water, waste & maintenance', description: 'Practical plumbing support for repairs, installations and ongoing maintenance.', icon: 'Droplets', items: ['Plumbing repairs', 'Leaking taps and pipes', 'Blocked drains', 'Toilet and bathroom plumbing', 'Pipe installation and replacement', 'General plumbing maintenance'] },
  { slug: 'gas-installation', name: 'Gas Installation', eyebrow: 'Safe, considered connections', description: 'Gas appliance, line and connection services carried out by appropriately qualified professionals where required.', icon: 'Flame', items: ['Gas appliance installation', 'Gas line installation and repairs', 'Gas connection services', 'Gas leak inspection', 'Gas system maintenance'] },
  { slug: 'electrical', name: 'Electrical', eyebrow: 'Power, light & peace of mind', description: 'Reliable electrical work for everyday faults, upgrades and new installations.', icon: 'Zap', items: ['Electrical fault finding', 'Lighting installation', 'Electrical repairs', 'Switches and sockets', 'Electrical installation and maintenance'] },
] as const

export const navLinks = [
  { label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'About', href: '/#about' }, { label: 'Reviews', href: '/#reviews' }, { label: 'Contact', href: '/contact' },
]
