import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SystemBar from '@/components/SystemBar';
import SystemStatus from '@/components/SystemStatus';
import { getAbout } from '@/lib/api';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Max van Eikeren | Engineering Portfolio',
  description: 'Engineering projects, experience and tools by Max van Eikeren.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const about = await getAbout();
  const userName = about?.attributes?.name || 'OPERATOR';

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-grid">
        <SystemBar userName={userName} />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <SystemStatus />
      </body>
    </html>
  );
}
