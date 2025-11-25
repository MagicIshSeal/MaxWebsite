import type { Metadata } from 'next';
import './globals.css';
import SystemBar from '@/components/SystemBar';
import SystemStatus from '@/components/SystemStatus';
import { getAbout } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Engineering Portfolio',
  description: 'Technical Project Portfolio',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const about = await getAbout();
  const userName = about?.attributes?.name || 'OPERATOR';

  return (
    <html lang="en">
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
