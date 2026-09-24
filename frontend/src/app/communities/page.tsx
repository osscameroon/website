'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, MapPin, ExternalLink, Users } from 'lucide-react';
import { COMMUNITIES, type Community } from '@/lib/data/content';

const CATEGORIES: { label: string; value: Community['category'] | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Open Source', value: 'oss' },
  { label: 'Languages & Frameworks', value: 'language' },
  { label: 'Cloud & DevOps', value: 'cloud' },
  { label: 'Security', value: 'security' },
  { label: 'Data Science', value: 'data' },
  { label: 'General', value: 'general' },
];

function categoryColor(cat: Community['category']): string {
  switch (cat) {
    case 'oss': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'language': return 'bg-violet-50 text-violet-700 border-violet-200';
    case 'cloud': return 'bg-sky-50 text-sky-700 border-sky-200';
    case 'security': return 'bg-red-50 text-red-700 border-red-200';
    case 'data': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'general': return 'bg-slate-50 text-slate-600 border-slate-200';
  }
}

function categoryLabel(cat: Community['category']): string {
  switch (cat) {
    case 'oss': return 'Open Source';
    case 'language': return 'Language / Framework';
    case 'cloud': return 'Cloud / DevOps';
    case 'security': return 'Security';
    case 'data': return 'Data Science';
    case 'general': return 'General';
  }
}

export default function CommunitiesPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Community['category'] | 'all'>('all');

  const filtered = COMMUNITIES.filter((c) => {
    if (activeCategory !== 'all' && c.category !== activeCategory) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (c.name + ' ' + c.desc + ' ' + c.focus + ' ' + c.location).toLowerCase().includes(q);
  });

  return <section className="mx-auto max-w-container px-[clamp(16px,4vw,24px)] py-[clamp(40px,6vw,76px)] pb-[clamp(56px,8vw,90px)]">
    <h1 className="m-0 max-w-[20em] text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.14] tracking-[-.03em]">Open source communities in Cameroon</h1>
    <p className="mt-4 max-w-[52ch] text-base leading-[1.7] text-muted-alt">Discover the vibrant ecosystem of tech communities building, sharing, and growing together across Cameroon.</p>

    {/* Search + filter */}
    <div className="mb-6 mt-[clamp(28px,4vw,42px)] flex flex-wrap gap-3.5">
      <label className="flex flex-[1_1_100%] items-center gap-3 rounded-input sm:min-w-[260px] sm:flex-[1_1_300px] border border-border bg-white px-[18px]">
        <Search size={20} className="text-blue"/>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search communities..." className="min-w-0 flex-1 border-0 bg-transparent py-[15px] text-[15px] outline-none"/>
      </label>
    </div>

    {/* Category chips */}
    <div className="mb-8 flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button key={cat.value} onClick={() => setActiveCategory(cat.value)} className={`rounded-pill border-[1.5px] px-[15px] py-2 text-[13.5px] font-semibold transition ${activeCategory === cat.value ? 'border-blue bg-blue text-white' : 'border-border bg-white text-ink-70 hover:border-blue-200 hover:bg-blue-50'}`}>{cat.label}</button>
      ))}
    </div>

    {/* Results count */}
    <p className="mb-6 text-[15px] text-muted-alt"><strong className="text-ink">{filtered.length}</strong> {filtered.length === 1 ? 'community' : 'communities'} found</p>

    {/* Grid */}
    {filtered.length > 0 ? (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-5">
        {filtered.map((c) => <CommunityCard key={c.name} community={c}/>)}
      </div>
    ) : (
      <p className="py-20 text-center text-[17px] font-semibold text-muted-alt">No community matches your search.</p>
    )}
  </section>;
}

function CommunityCard({ community: c }: { community: Community }) {
  const cardClass = "group flex h-full flex-col overflow-hidden rounded-card border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-hover";
  const inner = (
    <div className="flex flex-1 flex-col p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue">
          <Users size={22}/>
        </div>
        {c.url && <ExternalLink size={16} className="mt-1 shrink-0 text-muted-alt opacity-0 transition group-hover:opacity-100"/>}
      </div>
      <h3 className="mt-1 truncate text-[18px] font-bold leading-snug">{c.name}</h3>
      <p className="mt-2.5 line-clamp-2 text-[14.5px] leading-[1.6] text-muted-alt">{c.desc}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <span className={`rounded-pill border px-2.5 py-1 text-[12px] font-semibold ${categoryColor(c.category)}`}>{categoryLabel(c.category)}</span>
        <span className="flex items-center gap-1 text-[12.5px] text-muted-alt"><MapPin size={13}/>{c.location}</span>
      </div>
      <p className="mt-3 text-[13px] text-muted-alt">{c.focus}</p>
    </div>
  );
  if (c.url) return <Link href={c.url} target="_blank" rel="noopener noreferrer" className={cardClass}>{inner}</Link>;
  return <div className={cardClass}>{inner}</div>;
}
