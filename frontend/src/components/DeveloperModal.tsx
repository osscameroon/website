'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Building2, Globe, Link as LinkIcon, Mail, MapPin, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import type { Developer } from '@/lib/data/developers';
import { GitHubIcon, LinkedInIcon, TwitterIcon } from './icons';

export function DeveloperModal({ dev }: { dev: Developer }) {
  const router = useRouter(); const pathname = usePathname(); const params = useSearchParams(); const cardRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => { const next = new URLSearchParams(params.toString()); next.delete('dev'); router.push(`${pathname}?${next.toString()}`, { scroll: false }); }, [params, pathname, router]);
  useEffect(() => {
    const root = cardRef.current; const prev = document.activeElement as HTMLElement | null; root?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && root) {
        const f = Array.from(root.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));
        if (!f.length) return; const first = f[0]; const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey); document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus?.(); };
  }, [close]);
  return <div onClick={close} className="fixed inset-0 z-[100] flex items-start justify-center overflow-auto bg-ink/45 p-[clamp(16px,4vw,56px)]">
    <div ref={cardRef} tabIndex={-1} onClick={(e)=>e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="dev-modal-title" className="relative w-full max-w-[800px] animate-[floatUp_.3s_ease_both] rounded-modal bg-white shadow-modal">
      <button onClick={close} aria-label="Close" className="absolute right-[-14px] top-[26px] z-10 flex h-[46px] w-[46px] items-center justify-center rounded-full border-0 bg-white text-ink shadow-[0_4px_16px_rgba(16,24,40,.2)]"><X size={22}/></button>
      <div className="h-[110px] rounded-t-modal bg-[#F4F6FA]" style={{ backgroundImage: 'url(/assets/projects/miniyotas.png)', backgroundSize: '380px', backgroundPosition: 'center', backgroundRepeat: 'repeat' }} />
      <div className="px-[clamp(20px,5vw,58px)] pb-12 text-center"><Image src={dev.avatar} alt={dev.name} width={120} height={120} className="mx-auto -mt-[60px] h-[120px] w-[120px] rounded-full border-4 border-blue object-cover"/><h2 id="dev-modal-title" className="mt-5 text-[clamp(26px,3vw,32px)] font-extrabold tracking-[-.02em]">{dev.name}</h2><div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[14px] font-medium text-muted-alt"><span className="flex items-center gap-1.5"><Building2 size={16}/>{dev.company}</span><span>•</span><span className="flex items-center gap-1.5"><Globe size={16}/>{dev.role}</span><span>•</span><span className="flex items-center gap-1.5"><MapPin size={16}/>{dev.location}</span></div><p className="mx-auto mt-6 max-w-[62ch] text-[15.5px] leading-[1.7] text-ink-70">{dev.bio}</p><Hairline/><h3 className="text-left text-[18px] font-bold">Tech Stack</h3><div className="mt-4 flex flex-wrap gap-2">{dev.stack.map((t) => <span key={t} className="rounded-pill bg-blue-50 px-4 py-2 text-[13.5px] font-semibold text-blue">{t}</span>)}</div><Hairline/><h3 className="text-left text-[18px] font-bold">Social media</h3><div className="mt-4 flex gap-3"><Social label="LinkedIn"><LinkedInIcon className="h-[19px] w-[19px]"/></Social><Social label="GitHub"><GitHubIcon className="h-[19px] w-[19px]"/></Social><Social label="Twitter"><TwitterIcon className="h-[19px] w-[19px]"/></Social><Social label="Website"><LinkIcon size={19}/></Social><Social label="Email"><Mail size={19}/></Social></div></div>
    </div>
  </div>;
}
function Hairline(){ return <div className="my-8 h-px bg-border-soft"/>; }
function Social({ label, children }: { label: string; children: React.ReactNode }) { return <a href="#" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">{children}</a>; }
