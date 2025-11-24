export default function Footer() {
  return (
    <footer className="border-t border-slate-700/50 bg-dark-400/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Portfolio. Built with Next.js & Strapi
          </p>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></div>
            <span className="text-xs text-gray-500">Powered by Docker</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
