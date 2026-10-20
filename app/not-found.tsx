import Link from 'next/link'
export default function NotFound() { return <main className="section"><div className="container"><p className="eyebrow">404</p><h1 className="page-title">That page couldn’t be found.</h1><p className="page-lead">The link may have moved. Let’s get you back to the start.</p><Link className="button button-dark" href="/">Back home</Link></div></main> }
