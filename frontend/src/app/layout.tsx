import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = { title: 'OSS Cameroon', description: 'Open Source Community by cameroonian developers.', icons: { icon: '/oss.svg' } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="flex min-h-screen flex-col font-[var(--font-space)]"><Header/><main className="flex-1">{children}</main><Footer/></body></html>;
}
