export default function SystemStatus() {
  const buildDate = new Date().toISOString().split('T')[0];
  
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 uppercase tracking-wider">
          <div className="flex items-center gap-6">
            <span>HOST: <span className="text-cyan-400">DOCKER_COMPOSE</span></span>
            <span className="hidden sm:inline">REGION: <span className="text-cyan-400">EU_WEST</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="hidden md:inline">LAST_DEPLOY: <span className="text-cyan-400">{buildDate}</span></span>
            <span>BUILD: <span className="text-cyan-400">v3.0.1</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
