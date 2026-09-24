import { Suspense } from 'react';
import { DeveloperControls } from '@/components/DirectoryControls';
import { DeveloperList } from '@/components/DeveloperList';
import { Pager } from '@/components/Pager';
import { queryDevelopers, TECHS } from '@/lib/data/developers';
import { many, one, pageNum, type SearchValue } from '@/lib/search';

export default async function DevelopersPage({ searchParams }: { searchParams: Record<string, SearchValue> }) {
  const result = await queryDevelopers({ q: one(searchParams.q), expertise: one(searchParams.expertise), sort: one(searchParams.sort), page: pageNum(searchParams.page), open: one(searchParams.open) === 'true', tech: many(searchParams.tech) });
  return <section className="mx-auto max-w-container px-[clamp(16px,4vw,24px)] py-[clamp(40px,6vw,76px)] pb-[clamp(56px,8vw,90px)]">
    <h1 className="m-0 max-w-[20em] text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.14] tracking-[-.03em]">Meet the experienced developers in our community</h1>
    <Suspense><DeveloperControls techs={TECHS}/></Suspense>
    <ResultRow start={result.start} end={result.end} total={result.total} page={result.page} pages={result.pages}/>
    <DeveloperList items={result.items} />
    <div className="mt-8 flex justify-end"><Suspense><Pager page={result.page} pages={result.pages} scrollTop/></Suspense></div>
  </section>;
}
function ResultRow({ start, end, total, page, pages }: { start:number; end:number; total:number; page:number; pages:number }) { return <div className="flex flex-wrap items-center justify-between gap-4"><p className="text-[15px] text-muted-alt"><strong className="text-ink">{start} - {end}</strong> of <strong className="text-ink">{total}</strong> results</p><div className="hidden sm:block"><Suspense><Pager page={page} pages={pages}/></Suspense></div></div>; }
