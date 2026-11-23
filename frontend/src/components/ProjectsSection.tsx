import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/api';
import SectionHeading from './SectionHeading';

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
        <SectionHeading title="Mission_Reports" subtitle="Selected projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const { title, description, type, technologies, githubUrl, liveUrl, images } =
              project.attributes;
            const imageUrl = images?.data?.[0]?.attributes?.url;

            return (
              <Link
                href={`/projects/${project.id}`}
                key={project.id}
                className="card card-hover group overflow-hidden animate-slide-up flex flex-col h-full"
              >
                {!imageUrl && (
                  <div className="w-full h-48 bg-dark-400 flex items-center justify-center text-slate-700 font-mono text-xs uppercase tracking-widest">
                    No_Image
                  </div>
                )}
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
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-3 py-1 bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-full font-medium">
                      {type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed line-clamp-3">{description}</p>
                  {technologies && technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {technologies.map((tech, idx) => (
                        <span key={idx} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-primary-400 font-medium mt-auto">
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
