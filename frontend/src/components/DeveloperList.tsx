"use client";

import { useMemo, useState } from "react";
import { DeveloperCard } from "./Cards";
import { DeveloperModal } from "./DeveloperModal";
import type { Developer } from "@/lib/data/developers";

export function DeveloperList({ items }: { items: Developer[] }) {
  const [selectedDev, setSelectedDev] = useState<Developer | null>(null);

  const memoizedItems = useMemo(() => {
    const uniqueMap = new Map<string, Developer>()
    for (const item of items) {
      if (!(uniqueMap.has(item.login))) uniqueMap.set(item.login, item)
    }
    return Array.from(uniqueMap.values())
  }, [items])


  if (!memoizedItems.length) {
    return (
      <p className="py-20 text-center text-[17px] font-semibold text-muted-alt">
        No developer matches these filters.
      </p>
    );
  }

  return (
    <>
      <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-[22px] md:grid-cols-[repeat(auto-fit,minmax(230px,1fr))]">
        {memoizedItems.map((dev) => (
          <li
            key={dev.login}
            onClick={() => setSelectedDev(dev)}
            className="cursor-pointer"
            // makes a clickable div, focusable via keyboard
            tabIndex={0}
          >
            <DeveloperCard dev={dev} />
          </li>
        ))}
      </ul>
      {selectedDev && (
        <DeveloperModal
          dev={selectedDev}
          onClose={() => setSelectedDev(null)}
        />
      )}
    </>
  );
}
