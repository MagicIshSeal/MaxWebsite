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
    <section id="experience" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp) => {
            const { title, company, location, type, description, startDate, endDate, isCurrent, skills } =
              exp.attributes;

            return (
              <div
                key={exp.id}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-lg text-gray-700">{company}</p>
                    {location && <p className="text-sm text-gray-500">{location}</p>}
                  </div>
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">
                    {type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {formatDate(startDate)} - {isCurrent ? 'Present' : endDate ? formatDate(endDate) : 'N/A'}
                </p>
                <p className="text-gray-700 mb-4 whitespace-pre-line">{description}</p>
                {skills && skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
