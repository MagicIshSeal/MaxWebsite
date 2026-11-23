export default function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 font-mono uppercase tracking-wider text-white">{title}</h2>
      <div className="h-0.5 w-32 bg-cyan-400 mb-3"></div>
      {subtitle && <p className="text-slate-400">{subtitle}</p>}
    </div>
  );
}
