import type { Metadata } from 'next';
import './globals.css';
import SystemBar from '@/components/SystemBar';
import SystemStatus from '@/components/SystemStatus';

export const metadata: Metadata = {
  title: 'Engineering Portfolio',
  description: 'Technical Project Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-grid">
        <SystemBar />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <SystemStatus />
      </body>
    </html>
  );
}
