'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SystemBarProps {
  userName?: string;
}

export default function SystemBar({ userName = 'OPERATOR' }: SystemBarProps) {
  const pathname = usePathname();
  const [utcTime, setUtcTime] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

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
    { href: '/#projects', label: 'PROJECTS' },
    { href: '/#experience', label: 'EXPERIENCE' },
    { href: '/#toolbox', label: 'LAB' },
  ];

  return (
    <nav className="system-bar">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Left: Name & Status */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <Link href="/" className="text-white truncate font-mono text-sm uppercase tracking-wider hover:text-cyan-400 transition-colors">
            {userName.replace(/ /g, '_').toUpperCase()}
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
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden text-slate-400 hover:text-cyan-400 font-mono text-xs uppercase border border-slate-700 px-2 py-1"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 uppercase">UTC:</span>
          <span className="text-xs font-mono text-cyan-400">{utcTime}</span>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-cyan-400"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
