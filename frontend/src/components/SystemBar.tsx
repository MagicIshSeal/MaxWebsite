'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SystemBar() {
  const pathname = usePathname();
  const [utcTime, setUtcTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().split(' ')[4]); // HH:MM:SS
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: '/', label: 'PROJECTS' },
    { href: '/#experience', label: 'EXPERIENCE' },
    { href: '/#toolbox', label: 'LAB' },
  ];

  return (
    <nav className="system-bar">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Left: Name & Status */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-white font-mono text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors">
            YOUR_NAME
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase">STATUS:</span>
            <div className="led-indicator"></div>
            <span className="text-xs font-mono text-green-400">ONLINE</span>
          </div>
        </div>

        {/* Center: Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-mono uppercase tracking-wider transition-colors relative corner-bracket px-4 ${
                pathname === link.href
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-cyan-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: UTC Clock */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase">UTC:</span>
          <span className="text-xs font-mono text-cyan-400">{utcTime}</span>
        </div>
      </div>
    </nav>
  );
}
