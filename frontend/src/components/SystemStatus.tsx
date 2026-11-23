export default function SystemStatus() {
  const buildDate = new Date().toISOString().split('T')[0];
  const version = process.env.NEXT_PUBLIC_APP_VERSION || 'v1.0.0';
  
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 uppercase tracking-wider">
          <div className="flex items-center gap-6">
            <span>HOST: <span className="text-cyan-400">GITHUB_PAGES</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="hidden md:inline">LAST_BUILD: <span className="text-cyan-400">{buildDate}</span></span>
            <span>BUILD: <span className="text-cyan-400">{version}</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
