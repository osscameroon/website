'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function Pager({ page, pages, scrollTop = false }: { page: number; pages: number; scrollTop?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const go = (n: number) => {
    const next = new URLSearchParams(params.toString());
    next.set('page', String(n));
    router.push(`${pathname}?${next.toString()}`, { scroll: scrollTop });
    if (scrollTop && typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Build a window of page numbers around the current page
  const windowSize = 3;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(pages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const nums = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const btn = (label: string, key: string, active: boolean, disabled: boolean, target: number) =>
    <button key={key} onClick={() => go(target)} disabled={disabled} aria-current={active ? 'page' : undefined} className={`h-[34px] min-w-[34px] rounded-[7px] border-0 px-2 text-[15px] font-medium transition-colors ${active ? 'bg-blue text-white font-bold' : disabled ? 'text-muted-light-3 cursor-not-allowed' : 'text-ink-70 hover:bg-grey-100'}`}>{label}</button>;

  return <div className="flex items-center gap-1 rounded-input border border-border bg-white p-2">
    {btn('«', 'first', false, page <= 1, 1)}
    {btn('‹', 'prev', false, page <= 1, Math.max(1, page - 1))}
    {nums.map((n) => btn(String(n), `p${n}`, n === page, false, n))}
    {btn('›', 'next', false, page >= pages, Math.min(pages, page + 1))}
    {btn('»', 'last', false, page >= pages, pages)}
    <span className="px-2 text-[13px] text-muted-alt">{page}/{pages}</span>
  </div>;
}
