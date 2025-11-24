import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          Portfolio
        </Link>
        <nav className="flex gap-6">
          <Link href="#projects" className="hover:text-primary-600 transition-colors">
            Projects
          </Link>
          <Link href="#experience" className="hover:text-primary-600 transition-colors">
            Experience
          </Link>
          <Link href="#about" className="hover:text-primary-600 transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
