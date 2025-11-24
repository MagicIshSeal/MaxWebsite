import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api';

interface Project {
  id: number;
  attributes: {
    title: string;
    description: string;
    type: string;
    technologies?: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured: boolean;
    images?: {
      data?: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
  };
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const { title, description, type, technologies, githubUrl, liveUrl, images } =
              project.attributes;
            const imageUrl = images?.data?.[0]?.attributes?.url;

            return (
              <div
                key={project.id}
                className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {imageUrl && (
                  <div className="relative w-full h-48 bg-gray-200">
                    <Image
                      src={getStrapiMedia(imageUrl) || ''}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 bg-primary-100 text-primary-700 rounded">
                      {type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-gray-600 mb-4">{description}</p>
                  {technologies && technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4">
                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        GitHub →
                      </a>
                    )}
                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
