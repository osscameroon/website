'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, Calendar, ExternalLink, GitFork, Scale, Star, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import type { Project } from '@/lib/data/projects';
import { GitHubIcon } from './icons';

export function ProjectModal({ project }: { project: Project }) {
  const router = useRouter(); const pathname = usePathname(); const params = useSearchParams(); const cardRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => { const next = new URLSearchParams(params.toString()); next.delete('project'); router.push(`${pathname}?${next.toString()}`, { scroll: false }); }, [params, pathname, router]);
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

  const created = project.created_at ? new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
  const updated = project.updated_at ? new Date(project.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  return <div onClick={close} className="fixed inset-0 z-[100] flex items-start justify-center overflow-auto bg-ink/45 p-[clamp(16px,4vw,56px)]">
    <div ref={cardRef} tabIndex={-1} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="proj-modal-title" className="relative w-full max-w-[800px] animate-[floatUp_.3s_ease_both] rounded-modal bg-white shadow-modal">
      <button onClick={close} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-[46px] w-[46px] items-center justify-center rounded-full border-0 bg-white text-ink shadow-[0_4px_16px_rgba(16,24,40,.2)]"><X size={22}/></button>

      {/* Header */}
      <div className="flex items-center gap-5 rounded-t-modal bg-[#F4F6FA] px-[clamp(20px,5vw,58px)] py-8">
        <Image src={project.owner_avatar || project.img} alt="" width={64} height={64} className="h-16 w-16 rounded-[14px] border-2 border-white object-cover shadow-rest"/>
        <div className="min-w-0">
          <h2 id="proj-modal-title" className="m-0 truncate text-[clamp(22px,3vw,28px)] font-extrabold tracking-[-.02em]">{project.name}</h2>
          {project.full_name && <p className="mt-1 truncate text-[14px] text-muted-alt">{project.full_name}</p>}
        </div>
      </div>

      <div className="px-[clamp(20px,5vw,58px)] pb-12 pt-8">
        {/* Stats row */}
        <div className="flex flex-wrap gap-5 text-[14.5px]">
          <Stat icon={<Star size={17} className="text-amber-500"/>} label="Stars" value={formatNum(project.stars)}/>
          <Stat icon={<GitFork size={17} className="text-blue"/>} label="Forks" value={formatNum(project.forks)}/>
          <Stat icon={<BookOpen size={17} className="text-green-600"/>} label="Issues" value={formatNum(project.open_issues)}/>
          {project.watchers > 0 && <Stat icon={<Star size={17} className="text-muted-alt"/>} label="Watchers" value={formatNum(project.watchers)}/>}
        </div>

        {/* Description */}
        {project.desc && <>
          <Hairline/>
          <p className="text-[15.5px] leading-[1.7] text-ink-70">{project.desc}</p>
        </>}

        {/* Details grid */}
        <Hairline/>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-8 gap-y-4 text-[14.5px]">
          {project.lang && <Detail label="Language"><span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-blue"/>{project.lang}</span></Detail>}
          {project.license && <Detail label="License"><span className="flex items-center gap-1.5"><Scale size={15}/>{project.license}</span></Detail>}
          {project.owner_login && <Detail label="Owner">{project.owner_login}</Detail>}
          {created && <Detail label="Created"><span className="flex items-center gap-1.5"><Calendar size={15}/>{created}</span></Detail>}
          {updated && <Detail label="Last updated"><span className="flex items-center gap-1.5"><Calendar size={15}/>{updated}</span></Detail>}
        </div>

        {/* Topics */}
        {project.topics.length > 0 && <>
          <Hairline/>
          <h3 className="text-[18px] font-bold">Topics</h3>
          <div className="mt-4 flex flex-wrap gap-2">{project.topics.map((t) => <span key={t} className="rounded-pill bg-blue-50 px-4 py-2 text-[13.5px] font-semibold text-blue">{t}</span>)}</div>
        </>}

        {/* Link to GitHub */}
        {project.html_url && project.html_url !== '#' && <>
          <Hairline/>
          <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-btn bg-ink px-6 py-3.5 text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue">
            <GitHubIcon className="h-5 w-5"/> View on GitHub <ExternalLink size={15}/>
          </a>
        </>}
      </div>
    </div>
  </div>;
}

function Hairline() { return <div className="my-7 h-px bg-border-soft"/>; }
function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-2 rounded-input border border-border bg-grey-50 px-4 py-2.5">{icon}<span className="font-bold text-ink">{value}</span><span className="text-muted-alt">{label}</span></div>; }
function Detail({ label, children }: { label: string; children: React.ReactNode }) { return <div><p className="mb-1 text-[12px] font-semibold uppercase tracking-[.06em] text-muted-alt">{label}</p><p className="text-[15px] font-medium text-ink">{children}</p></div>; }
function formatNum(n: number): string { if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`; return String(n); }
