import SectionHeading from './SectionHeading';

interface Experience {
  id: number;
  attributes: {
    title: string;
    company: string;
    location?: string;
    type: string;
    description: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    skills?: string[];
  };
}

export default function ExperienceSection({
  experiences,
}: {
  experiences: Experience[];
}) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section id="experience" className="section bg-gradient-to-br from-dark-400 via-dark-500 to-dark-600 relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-32 bottom-32 w-0.5 bg-gradient-to-b from-primary-500 via-primary-600 to-primary-500 hidden lg:block"></div>
      
      <div className="container mx-auto px-4">
        <SectionHeading title="Flight_Log" subtitle="Experience and education" />
        <div className="max-w-4xl mx-auto space-y-12">
          {experiences.map((exp, idx) => {
            const { title, company, location, type, description, startDate, endDate, isCurrent, skills } =
              exp.attributes;

            return (
              <div
                key={exp.id}
                className={`relative animate-slide-up ${idx % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:ml-auto'} lg:w-[calc(50%+2rem)]`}
              >
                {/* Timeline dot */}
                <div className="hidden lg:block absolute top-6 w-4 h-4 bg-primary-500 rounded-full shadow-lg shadow-primary-500/50 animate-pulse" 
                     style={{ [idx % 2 === 0 ? 'right' : 'left']: '-2.5rem' }}>
                </div>
                
                <div className="card p-6 hover:scale-105 transition-all duration-300">
                  <div className={`flex ${idx % 2 === 0 ? 'lg:flex-row-reverse' : 'flex-row'} justify-between items-start mb-3 gap-4`}>
                    <div className={idx % 2 === 0 ? 'text-left lg:text-right' : 'text-left'}>
                      <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
                      <p className="text-xl text-primary-400 font-semibold">{company}</p>
                      {location && <p className="text-sm text-gray-500 mt-1">{location}</p>}
                    </div>
                    <span className="text-xs px-3 py-1 bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-full font-medium whitespace-nowrap">
                      {type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(startDate)} - {isCurrent ? 'Present' : endDate ? formatDate(endDate) : 'N/A'}
                    {isCurrent && <span className="ml-2 px-2 py-0.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded text-xs">Current</span>}
                  </p>
                  <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-line">{description}</p>
                  {skills && skills.length > 0 && (
                    <div className={`flex flex-wrap gap-2 ${idx % 2 === 0 ? 'lg:justify-end' : 'justify-start'}`}>
                      {skills.map((skill, skillIdx) => (
                        <span key={skillIdx} className="tech-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
