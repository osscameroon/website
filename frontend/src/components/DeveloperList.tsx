'use client';

import { useState } from 'react';
import { DeveloperCard } from './Cards';
import { DeveloperModal } from './DeveloperModal';
import type { Developer } from '@/lib/data/developers';

export function DeveloperList({ items }: { items: Developer[] }) {
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);

  if (!items.length) {
    return <p className="py-20 text-center text-[17px] font-semibold text-muted-alt">No developer matches these filters.</p>;
  }

  return <>
    <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
      {items.map((dev) => (
        <div key={dev.login} onClick={() => setSelectedDev(dev)} className="cursor-pointer">
          <DeveloperCard dev={dev} />
        </div>
      ))}
    </div>
    {selectedDev && <DeveloperModal dev={selectedDev} onClose={() => setSelectedDev(null)} />}
  </>;
}
