import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const space = Space_Grotesk({ subsets: ['latin'], weight: ['400','500','700'], variable: '--font-space' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono' });

export const metadata: Metadata = { title: 'OSS Cameroon', description: 'Open Source Community by cameroonian developers.', icons: { icon: '/oss.svg' } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${space.variable} ${jetbrains.variable}`}><body className="flex min-h-screen flex-col font-[var(--font-space)]"><Header/><main className="flex-1">{children}</main><Footer/></body></html>;
}
