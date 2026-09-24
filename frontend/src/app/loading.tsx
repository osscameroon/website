import { HERO_AVATAR_POSITIONS } from '@/lib/data/content';

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className ?? ''}`} />;
}

export default function HomeLoading() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-container grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(32px,5vw,56px)] px-[clamp(16px,4vw,24px)] py-[clamp(40px,7vw,84px)] pb-[clamp(48px,7vw,90px)]">
        <div>
          <Skeleton className="h-[60px] w-3/4 rounded-lg" />
          <Skeleton className="mt-4 h-[60px] w-2/3 rounded-lg" />
          <Skeleton className="mt-6 h-5 w-full max-w-[36em]" />
          <Skeleton className="mt-2 h-5 w-4/5 max-w-[36em]" />
          <Skeleton className="mt-[34px] h-5 w-64" />
          <Skeleton className="mt-3.5 h-[58px] w-full max-w-[680px] rounded-xl" />
        </div>
        <div className="relative hidden min-h-[clamp(340px,42vw,520px)] lg:block">
          {HERO_AVATAR_POSITIONS.map((a, i) => (
            <div
              key={i}
              className="absolute animate-pulse rounded-[22px] bg-gray-200"
              style={{ left: a.left, top: a.top, width: a.size, height: a.size }}
            />
          ))}
        </div>
      </section>

      {/* Supporters */}
      <section className="bg-navy">
        <div className="mx-auto flex max-w-container items-center justify-center gap-[clamp(16px,3vw,48px)] px-[clamp(16px,4vw,24px)] py-[26px]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-24 !bg-gray-600" />
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="bg-blue-50">
        <div className="mx-auto max-w-container px-[clamp(16px,4vw,24px)] py-[clamp(56px,8vw,96px)]">
          <Skeleton className="mb-10 h-9 w-80 rounded-lg" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-card border border-border bg-white">
                <Skeleton className="h-[190px] w-full !rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="mt-3 h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="bg-grey-50">
        <div className="mx-auto max-w-container px-[clamp(16px,4vw,24px)] py-[clamp(56px,8vw,96px)]">
          <Skeleton className="mb-10 h-9 w-96 rounded-lg" />
          <div className="grid grid-cols-2 gap-3 sm:gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-card border border-border bg-white">
                <Skeleton className="h-[180px] w-full !rounded-none" />
                <div className="p-5">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="mt-2 h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
