import Image from 'next/image';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import type { Developer } from '@/lib/data/developers';
import type { Project } from '@/lib/data/projects';

export function DeveloperCard({ dev, href }: { dev: Developer; href?: string }) {
  const card = <article className="portrait-scrim group relative aspect-[7/10] overflow-hidden rounded-xl bg-ink shadow-rest transition duration-300 hover:-translate-y-1 hover:shadow-hover animate-floatUp">
    <Image src={dev.img} alt={dev.name} fill sizes="(max-width:768px) 50vw, 280px" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
    {dev.open && <span className="absolute right-3 top-3 z-10 rounded-btn bg-white px-3 py-2 text-[12.5px] font-semibold text-ink shadow-rest">⚡ Open for opportunities</span>}
    <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white"><h3 className="m-0 text-base font-bold">{dev.name}</h3><p className="mt-1 text-[13.5px] font-semibold text-muted-light-3">{dev.company}</p><p className="mt-3 flex items-center gap-2 text-[13.5px] font-semibold text-white"><Briefcase size={16}/>{dev.role}</p></div>
  </article>;
  return href ? <Link href={href} scroll={false} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue">{card}</Link> : card;
}

export function ProjectCard({ project }: { project: Project }) {
  return <article className="overflow-hidden rounded-card border border-border-soft bg-white shadow-rest transition duration-300 hover:-translate-y-1 hover:shadow-hover animate-floatUp">
    <div className="relative aspect-[5/3]"><Image src={project.img} alt="" fill sizes="(max-width:768px) 100vw, 360px" className="object-cover" /></div>
    <div className="p-5"><h3 className="m-0 text-[20px] font-bold text-blue">{project.name}</h3><p className="mt-3 min-h-[48px] text-[14.5px] leading-6 text-muted-alt">{project.desc}</p><div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-btn border border-border px-3 py-1.5 text-[13px] font-semibold text-ink-70">{tag}</span>)}</div><div className="mt-5 flex items-center pl-1">{project.contributors.map((c, i) => <Image key={c+i} src={c} alt="" width={34} height={34} className="-ml-1 first:ml-0 rounded-full border-2 border-white object-cover" style={{ marginRight: -10 }} />)}</div></div>
  </article>;
}
