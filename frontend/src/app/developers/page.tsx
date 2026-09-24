import { Suspense } from 'react';
import { DeveloperCard } from '@/components/Cards';
import { DeveloperControls } from '@/components/DirectoryControls';
import { DeveloperModal } from '@/components/DeveloperModal';
import { Pager } from '@/components/Pager';
import { getDeveloper, queryDevelopers, TECHS } from '@/lib/data/developers';
import { many, one, pageNum, type SearchValue } from '@/lib/search';

export default async function DevelopersPage({ searchParams }: { searchParams: Record<string, SearchValue> }) {
  const result = await queryDevelopers({ q: one(searchParams.q), expertise: one(searchParams.expertise), sort: one(searchParams.sort), page: pageNum(searchParams.page), open: one(searchParams.open) === 'true', tech: many(searchParams.tech) });
  const devLogin = one(searchParams.dev);
  const modalDev = devLogin ? (result.items.find(d => d.login === devLogin) ?? await getDeveloper(devLogin)) : null;
  const hrefFor = (login: string) => { const p = new URLSearchParams(); Object.entries(searchParams).forEach(([k,v]) => { if (k !== 'dev') (Array.isArray(v)?v:[v]).filter(Boolean).forEach((x)=>p.append(k,String(x))); }); p.set('dev', login); return `/developers?${p.toString()}`; };
  return <section className="mx-auto max-w-container px-[clamp(16px,4vw,24px)] py-[clamp(40px,6vw,76px)] pb-[clamp(56px,8vw,90px)]">
    <h1 className="m-0 max-w-[20em] text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.14] tracking-[-.03em]">Meet the experienced developers in our community</h1>
    <Suspense><DeveloperControls techs={TECHS}/></Suspense>
    <ResultRow start={result.start} end={result.end} total={result.total} page={result.page} pages={result.pages}/>
    {result.total ? <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-[22px]">{result.items.map((dev) => <DeveloperCard key={dev.login} dev={dev} href={hrefFor(dev.login)}/>)}</div> : <p className="py-20 text-center text-[17px] font-semibold text-muted-alt">No developer matches these filters.</p>}
    <div className="mt-8 flex justify-end"><Suspense><Pager page={result.page} pages={result.pages} scrollTop/></Suspense></div>
    {modalDev && <Suspense><DeveloperModal dev={modalDev}/></Suspense>}
  </section>;
}
function ResultRow({ start, end, total, page, pages }: { start:number; end:number; total:number; page:number; pages:number }) { return <div className="flex flex-wrap items-center justify-between gap-4"><p className="text-[15px] text-muted-alt"><strong className="text-ink">{start} - {end}</strong> of <strong className="text-ink">{total}</strong> results</p><Suspense><Pager page={page} pages={pages}/></Suspense></div>; }
