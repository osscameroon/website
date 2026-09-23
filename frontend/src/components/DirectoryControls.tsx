'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

function useParamUpdater() {
  const router = useRouter(); const pathname = usePathname(); const params = useSearchParams();
  return (patch: Record<string, string | boolean | string[] | null>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([key, value]) => { next.delete(key); if (Array.isArray(value)) value.forEach((v) => next.append(key, v)); else if (value) next.set(key, String(value)); });
    if (!('page' in patch)) next.set('page', '1');
    router.push(`${pathname}?${next.toString()}`, { scroll: false });
  };
}

export function DeveloperControls({ techs }: { techs: string[] }) {
  const params = useSearchParams(); const update = useParamUpdater(); const [openTray, setOpenTray] = useState(false);
  const activeTech = params.getAll('tech').flatMap((v) => v.split(',')).filter(Boolean);
  const q = params.get('q') ?? ''; const expertise = params.get('expertise') ?? 'Expertise'; const sort = params.get('sort') ?? 'Sort by'; const onlyOpen = params.get('open') === 'true';
  const toggleTech = (tech: string) => update({ tech: activeTech.includes(tech) ? activeTech.filter((t) => t !== tech) : [...activeTech, tech] });
  return <><div className="mb-6 mt-[clamp(28px,4vw,42px)] flex flex-wrap gap-3.5"><label className="flex flex-[1_1_100%] items-center gap-3 rounded-input sm:min-w-[260px] sm:flex-[1_1_300px] border border-border bg-white px-[18px]"><Search size={20} className="text-blue"/><input value={q} onChange={(e)=>update({q:e.target.value || null})} placeholder="Search by Company, role or languages/technologies..." className="min-w-0 flex-1 border-0 bg-transparent py-[15px] text-[15px] outline-none"/></label><select value={expertise} onChange={(e)=>update({expertise:e.target.value === 'Expertise' ? null : e.target.value})} className="flex-[1_1_140px] rounded-input sm:flex-[0_1_190px] border border-border bg-white px-[18px] py-[15px] text-[15px] text-ink-70 outline-none"><option>Expertise</option><option>Software Engineer</option><option>Data analyst</option><option>Mobile Engineer</option><option>Programactor</option></select><select value={sort} onChange={(e)=>update({sort:e.target.value === 'Sort by' ? null : e.target.value})} className="flex-[1_1_140px] rounded-input sm:flex-[0_1_210px] border border-border bg-white px-[18px] py-[15px] text-[15px] text-ink-70 outline-none"><option>Sort by</option><option>Name A–Z</option><option>Company</option><option>Open for opportunities</option></select><button onClick={()=>setOpenTray(!openTray)} className="flex flex-[1_1_140px] items-center justify-center gap-2 rounded-input border border-border bg-white px-[18px] py-[15px] text-[15px] font-semibold text-ink-70 sm:flex-none sm:justify-start"><SlidersHorizontal size={18}/>Filters</button></div>{openTray && <div className="mb-7 rounded-card bg-[#F9FAFB] p-5"><label className="flex items-center gap-3 text-[14.5px] font-semibold text-ink-70"><input type="checkbox" checked={onlyOpen} onChange={()=>update({open: onlyOpen ? null : true})} className="h-4 w-4 accent-blue"/>Open for opportunities only</label><ChipRow label="TECH" items={techs} active={activeTech} toggle={toggleTech}/></div>}</>;
}

export function ProjectControls({ langs }: { langs: string[] }) {
  const params = useSearchParams(); const update = useParamUpdater(); const [openTray, setOpenTray] = useState(false);
  const active = params.getAll('lang').flatMap((v) => v.split(',')).filter(Boolean);
  const q = params.get('q') ?? ''; const stars = params.get('stars') ?? 'Stars'; const sort = params.get('sort') ?? 'Sort by';
  const toggle = (lang: string) => update({ lang: active.includes(lang) ? active.filter((l) => l !== lang) : [...active, lang] });
  return <><div className="mb-6 mt-[clamp(28px,4vw,42px)] flex flex-wrap gap-3.5"><label className="flex flex-[1_1_100%] items-center gap-3 rounded-input sm:min-w-[260px] sm:flex-[1_1_300px] border border-border bg-white px-[18px]"><Search size={20} className="text-blue"/><input value={q} onChange={(e)=>update({q:e.target.value || null})} placeholder="Projet title, Developer name..." className="min-w-0 flex-1 border-0 bg-transparent py-[15px] text-[15px] outline-none"/></label><select value={stars} onChange={(e)=>update({stars:e.target.value === 'Stars' ? null : e.target.value})} className="flex-[1_1_140px] rounded-input sm:flex-[0_1_190px] border border-border bg-white px-[18px] py-[15px] text-[15px] text-ink-70 outline-none"><option>Stars</option><option>100+ stars</option><option>1k+ stars</option></select><select value={sort} onChange={(e)=>update({sort:e.target.value === 'Sort by' ? null : e.target.value})} className="flex-[1_1_140px] rounded-input sm:flex-[0_1_190px] border border-border bg-white px-[18px] py-[15px] text-[15px] text-ink-70 outline-none"><option>Sort by</option><option>Most stars</option><option>Name A–Z</option></select><button onClick={()=>setOpenTray(!openTray)} className="flex flex-[1_1_140px] items-center justify-center gap-2 rounded-input border border-border bg-white px-[18px] py-[15px] text-[15px] font-semibold text-ink-70 sm:flex-none sm:justify-start"><SlidersHorizontal size={18}/>Filters</button></div>{openTray && <div className="mb-7 rounded-card bg-[#F9FAFB] p-5"><ChipRow label="LANGUAGE" items={langs} active={active} toggle={toggle}/></div>}</>;
}
function ChipRow({ label, items, active, toggle }: { label: string; items: string[]; active: string[]; toggle: (v: string) => void }) { return <div className="mt-5"><p className="mb-3 font-[var(--font-mono)] text-[11.5px] uppercase tracking-[.09em] text-muted-light-1">{label}</p><div className="flex flex-wrap gap-2">{items.map((item) => <button key={item} onClick={()=>toggle(item)} className={`rounded-pill border-[1.5px] px-[15px] py-2 text-[13.5px] font-semibold ${active.includes(item) ? 'border-blue bg-blue text-white' : 'border-border bg-white text-ink-70'}`}>{item}</button>)}</div></div>; }
