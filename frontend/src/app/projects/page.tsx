import { Suspense } from 'react';
import { ProjectCard } from '@/components/Cards';
import { ProjectControls } from '@/components/DirectoryControls';
import { Pager } from '@/components/Pager';
import { LANGS, queryProjects } from '@/lib/data/projects';
import { many, one, pageNum, type SearchValue } from '@/lib/search';

export default async function ProjectsPage({ searchParams }: { searchParams: Record<string, SearchValue> }) {
  const result = await queryProjects({ q: one(searchParams.q), stars: one(searchParams.stars), sort: one(searchParams.sort), page: pageNum(searchParams.page), lang: many(searchParams.lang) });
  return <section className="mx-auto max-w-container px-[clamp(16px,4vw,24px)] py-[clamp(40px,6vw,76px)] pb-[clamp(56px,8vw,90px)]">
    <h1 className="m-0 max-w-[20em] text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.14] tracking-[-.03em]">Discover all the projects of our community</h1>
    <Suspense><ProjectControls langs={LANGS}/></Suspense>
    <ResultRow start={result.start} end={result.end} total={result.total} page={result.page} pages={result.pages}/>
    {result.total ? <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">{result.items.map((project) => <ProjectCard key={project.id} project={project}/>)}</div> : <p className="py-20 text-center text-[17px] font-semibold text-muted-alt">No project matches these filters.</p>}
    <div className="mt-8 flex justify-end"><Suspense><Pager page={result.page} pages={result.pages} scrollTop/></Suspense></div>
  </section>;
}
function ResultRow({ start, end, total, page, pages }: { start:number; end:number; total:number; page:number; pages:number }) { return <div className="flex flex-wrap items-center justify-between gap-4"><p className="text-[15px] text-muted-alt"><strong className="text-ink">{start} - {end}</strong> of <strong className="text-ink">{total}</strong> results</p><Suspense><Pager page={page} pages={pages}/></Suspense></div>; }
