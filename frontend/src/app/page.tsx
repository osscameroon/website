import { HomeClient } from '@/components/HomeClient';
import { getTopAvatars, type HeroAvatar } from '@/lib/data/developers';

export default async function HomePage() {
  const heroAvatars: HeroAvatar[] = await getTopAvatars(7);
  return <HomeClient heroAvatars={heroAvatars}/>;
}
