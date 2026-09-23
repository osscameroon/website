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
  const nums = Array.from({ length: Math.min(3, pages) }, (_, i) => i + 1);
  const cell = (label: string, key: string, active: boolean, disabled: boolean, target: number) => <button key={key} onClick={() => go(target)} disabled={disabled} className={`h-[34px] min-w-[34px] rounded-[7px] border-0 px-2 text-[15px] font-medium ${active ? 'bg-blue text-white font-bold' : disabled ? 'text-muted-light-3' : 'text-ink-70 hover:bg-grey-100'}`}>{label}</button>;
  return <div className="flex items-center gap-1 rounded-input border border-border bg-white p-2">{nums.map((n) => cell(String(n), `p${n}`, n === page, false, n))}{cell('›','next',false,page >= pages,Math.min(pages,page+1))}{cell('»','last',false,page >= pages,pages)}<span className="px-2 text-[15px] text-ink-70">{pages}</span></div>;
}
