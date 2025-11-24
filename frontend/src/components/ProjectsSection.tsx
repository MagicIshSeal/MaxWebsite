import Image from 'next/image';
import Link from 'next/link';
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
    <section id="projects" className="section bg-dark-500">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 glow-text">Projects</h2>
        <p className="text-center text-gray-400 mb-12">Check out my recent work</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const { title, description, type, technologies, githubUrl, liveUrl, images } =
              project.attributes;
            const imageUrl = images?.data?.[0]?.attributes?.url;

            return (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className="card card-hover group overflow-hidden animate-slide-up block"
              >
                {imageUrl && (
                  <div className="relative w-full h-48 bg-dark-400 overflow-hidden">
                    <Image
                      src={getStrapiMedia(imageUrl) || ''}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent opacity-60"></div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-3 py-1 bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-full font-medium">
                      {type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{description}</p>
                  {technologies && technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {technologies.map((tech, idx) => (
                        <span key={idx} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-primary-400 font-medium">
                    View Details
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
