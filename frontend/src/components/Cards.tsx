import Image from 'next/image';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import type { Developer } from '@/lib/data/developers';
import type { Project } from '@/lib/data/projects';

export function DeveloperCard({ dev, href }: { dev: Developer; href?: string }) {
  const card = <article className="portrait-scrim group relative aspect-[3/4] overflow-hidden rounded-xl bg-ink shadow-rest transition duration-300 hover:-translate-y-1 hover:shadow-hover animate-floatUp sm:aspect-[7/10]">
    <Image src={dev.img} alt={dev.name} fill sizes="(max-width:768px) 50vw, 280px" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
    {dev.open && <span className="absolute right-2 top-2 z-10 rounded-btn bg-white px-2 py-1.5 text-[11px] font-semibold text-ink shadow-rest sm:right-3 sm:top-3 sm:px-3 sm:py-2 sm:text-[12.5px]">⚡ Open</span>}
    <div className="absolute inset-x-0 bottom-0 z-10 p-3 text-white sm:p-5"><h3 className="m-0 text-[14px] font-bold sm:text-base">{dev.name}</h3><p className="mt-0.5 text-[12px] font-semibold text-muted-light-3 sm:mt-1 sm:text-[13.5px]">{dev.company}</p><p className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-white sm:mt-3 sm:gap-2 sm:text-[13.5px]"><Briefcase size={14} className="sm:h-4 sm:w-4"/>{dev.role}</p></div>
  </article>;
  const isExternal = href?.startsWith('http');
  return href ? <Link href={href} scroll={false} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue">{card}</Link> : card;
}

export function ProjectCard({ project, href }: { project: Project; href?: string }) {
  const card = <article className="flex h-full flex-col overflow-hidden rounded-card border border-border-soft bg-white shadow-rest transition duration-300 hover:-translate-y-1 hover:shadow-hover animate-floatUp cursor-pointer">
    <div className="relative aspect-[5/3] shrink-0"><Image src={project.img} alt="" fill sizes="(max-width:768px) 100vw, 360px" className="object-cover" /></div>
    <div className="flex flex-1 flex-col p-5"><h3 className="m-0 truncate text-[20px] font-bold text-blue">{project.name}</h3><p className="mt-3 line-clamp-2 text-[14.5px] leading-6 text-muted-alt">{project.desc}</p><div className="mt-auto flex flex-wrap gap-2 pt-4">{project.tags.map((tag) => <span key={tag} className="rounded-btn border border-border px-3 py-1.5 text-[13px] font-semibold text-ink-70">{tag}</span>)}</div><div className="mt-4 flex items-center pl-1">{project.contributors.map((c, i) => <Image key={c+i} src={c} alt="" width={34} height={34} className="-ml-1 first:ml-0 rounded-full border-2 border-white object-cover" style={{ marginRight: -10 }} />)}</div></div>
  </article>;
  return href ? <Link href={href} scroll={false} className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue">{card}</Link> : card;
}
