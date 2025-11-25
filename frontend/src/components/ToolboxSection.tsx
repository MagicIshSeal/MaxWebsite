import { getTools } from '@/lib/api';

interface Tool {
  id: number;
  attributes: {
    name: string;
    category: string;
    proficiency: string;
    description?: string;
    order: number;
  };
}

export default async function ToolboxSection() {
  const tools = await getTools();

  if (!tools || tools.length === 0) {
    return null;
  }

  const hardware = tools.filter((tool: Tool) => tool.attributes.category === 'hardware');
  const software = tools.filter((tool: Tool) => tool.attributes.category === 'software');
  const other = tools.filter((tool: Tool) => tool.attributes.category === 'other');

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'border-cyan-400/50 bg-cyan-400/10 text-cyan-400';
      case 'advanced':
        return 'border-cyan-400/30 bg-cyan-400/5 text-cyan-400/80';
      case 'intermediate':
        return 'border-slate-600 bg-slate-900/30 text-slate-400';
      default:
        return 'border-slate-700 bg-slate-900/20 text-slate-500';
    }
  };

  const renderToolCategory = (categoryTools: Tool[], title: string, icon: string) => {
    if (categoryTools.length === 0) return null;

    return (
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-cyan-400 text-xl font-mono">{icon}</span>
          <h3 className="text-xl font-bold text-white font-mono uppercase tracking-wide">{title}</h3>
          <div className="flex-grow h-px bg-slate-800"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryTools.map((tool) => {
            const { name, proficiency, description } = tool.attributes;
            return (
              <div
                key={tool.id}
                className={`p-5 border transition-all duration-300 hover:border-cyan-400 group cursor-pointer ${getProficiencyColor(proficiency)}`}
                title={description || name}
              >
                <div className="text-center">
                  <div className="font-mono text-sm mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-wide">{name}</div>
                  <div className="text-[10px] font-mono opacity-60 uppercase">{proficiency}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section id="toolbox" className="section bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2 glow-text font-mono uppercase tracking-wider">Inventory_System</h2>
          <div className="h-0.5 w-32 bg-cyan-400"></div>
        </div>
        
        <div className="space-y-12 animate-scanline">
          {renderToolCategory(hardware, 'Hardware', '⚙')}
          {renderToolCategory(software, 'Software', '▣')}
          {renderToolCategory(other, 'Protocols', '◈')}
        </div>
      </div>
    </section>
  );
}
