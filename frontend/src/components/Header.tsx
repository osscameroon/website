'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LogoMark } from './icons';

const nav = [
  ['Developers', '/developers'], ['Projects', '/projects'], ['Communities', '/communities'], ['Blog', 'https://blog.osscameroon.com'], ['Shop', '/shop'],
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  const isActive = (href: string) => href.startsWith('/') && !href.includes('#') && pathname === href;
  return <header className="sticky top-0 z-50 border-b border-border-soft bg-white/90 backdrop-blur-xl">
    <div className="mx-auto flex max-w-container items-center gap-7 py-4" style={{paddingLeft:'clamp(16px,4vw,24px)',paddingRight:'clamp(16px,4vw,24px)'}}>
      <Link href="/" className="flex shrink-0 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue"><LogoMark className="h-9 w-auto"/><span className="sr-only">OSS Cameroon</span></Link>
      <nav className="hidden flex-1 items-center gap-7 md:flex" aria-label="Primary">
        {nav.map(([label, href]) => {
          const external = href.startsWith('http');
          return <Link key={label} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`border-b-2 pb-[3px] text-[15px] transition-colors ${isActive(href) ? 'border-ink font-bold text-ink' : 'border-transparent font-medium text-muted-alt hover:text-ink'}`}>{label}</Link>;
        })}
      </nav>
      <div className="ml-auto hidden items-center gap-3 lg:flex">
        <Link href="/#support" className="rounded-btn border-[1.5px] border-blue px-5 py-3 text-[15px] font-semibold text-blue transition hover:-translate-y-0.5 hover:bg-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue">Support the community</Link>
        <Link href="#" className="rounded-btn bg-blue px-6 py-3 text-[15px] font-semibold text-white shadow-button transition hover:-translate-y-0.5 hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue">Join us</Link>
      </div>
      <button type="button" onClick={()=>setOpen((v)=>!v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" className="ml-auto flex h-11 w-11 items-center justify-center rounded-btn border border-border text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue lg:hidden">{open ? <X size={22}/> : <Menu size={22}/>}</button>
    </div>
    {open && <div id="mobile-menu" className="border-t border-border-soft bg-white lg:hidden">
      <nav className="mx-auto flex max-w-container flex-col gap-1 px-[clamp(16px,4vw,24px)] py-4" aria-label="Mobile">
        {nav.map(([label, href]) => {
          const external = href.startsWith('http');
          return <Link key={label} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`rounded-btn px-3 py-3 text-[16px] ${isActive(href) ? 'font-bold text-ink' : 'font-medium text-muted-alt hover:bg-grey-50 hover:text-ink'}`}>{label}</Link>;
        })}
        <div className="mt-3 flex flex-col gap-3">
          <Link href="/#support" className="rounded-btn border-[1.5px] border-blue px-5 py-3 text-center text-[15px] font-semibold text-blue transition hover:bg-blue hover:text-white">Support the community</Link>
          <Link href="#" className="rounded-btn bg-blue px-6 py-3 text-center text-[15px] font-semibold text-white shadow-button transition hover:bg-blue-dark">Join us</Link>
        </div>
      </nav>
    </div>}
  </header>;
}
