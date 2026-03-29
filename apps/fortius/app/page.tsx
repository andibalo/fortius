import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import HomeClient from '@/features/Home/Home';

export const metadata: Metadata = createPageMetadata({
  title: 'Fortius Esports | Fight. Dominate. Win.',
  description:
    'Fortius Esports — a syndicate of elite talent, strategic minds, and creative visionaries competing across Valorant, Mobile Legends, and PUBG Mobile.',
  path: '/',
});

export default function Page() {
  return <HomeClient />;
}
