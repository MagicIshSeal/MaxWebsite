import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-dark-400/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold glow-text hover:scale-105 transition-transform duration-200">
          Portfolio
        </Link>
        <nav className="flex gap-8">
          <Link 
            href="#about" 
            className="text-gray-300 hover:text-primary-400 transition-all duration-200 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="#projects" 
            className="text-gray-300 hover:text-primary-400 transition-all duration-200 relative group"
          >
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link 
            href="#experience" 
            className="text-gray-300 hover:text-primary-400 transition-all duration-200 relative group"
          >
            Experience
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
