'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogoMark } from './icons';

const nav = [
  ['Developers', '/developers'], ['Projects', '/projects'], ['Tweets', '/#tweets'], ['Blog', '#'], ['Shop', '#'],
] as const;

export function Header() {
  const pathname = usePathname();
  return <header className="sticky top-0 z-50 border-b border-border-soft bg-white/90 backdrop-blur-xl">
    <div className="mx-auto flex max-w-container items-center gap-7 px-gutter py-4 [--tw-gutter:clamp(16px,4vw,24px)]" style={{paddingLeft:'clamp(16px,4vw,24px)',paddingRight:'clamp(16px,4vw,24px)'}}>
      <Link href="/" className="flex shrink-0 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue"><LogoMark className="h-[38px] w-[38px]"/><span className="sr-only">OSS Cameroon</span></Link>
      <nav className="hidden flex-1 items-center gap-7 md:flex" aria-label="Primary">
        {nav.map(([label, href]) => {
          const active = href.startsWith('/') && !href.includes('#') && pathname === href;
          return <Link key={label} href={href} className={`border-b-2 pb-[3px] text-[15px] transition-colors ${active ? 'border-ink font-bold text-ink' : 'border-transparent font-medium text-muted-alt hover:text-ink'}`}>{label}</Link>;
        })}
      </nav>
      <div className="ml-auto hidden items-center gap-3 lg:flex">
        <Link href="/#support" className="rounded-btn border-[1.5px] border-blue px-5 py-3 text-[15px] font-semibold text-blue transition hover:-translate-y-0.5 hover:bg-blue hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue">Support the community</Link>
        <Link href="#" className="rounded-btn bg-blue px-6 py-3 text-[15px] font-semibold text-white shadow-button transition hover:-translate-y-0.5 hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue">Join us</Link>
      </div>
    </div>
  </header>;
}
