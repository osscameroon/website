import { HomeClient } from '@/components/HomeClient';
import { getTopContributors, type Developer } from '@/lib/data/developers';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function HomePage() {
  const topContributors = await getTopContributors();
  const shuffled = shuffle(topContributors);
  const heroDevs = shuffled.slice(0, 7);
  const memberDevs = shuffled.slice(0, 20);
  return <HomeClient heroDevs={heroDevs} memberDevs={memberDevs}/>;
}
