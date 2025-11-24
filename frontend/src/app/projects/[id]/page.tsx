import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, getStrapiMedia } from '@/lib/api';
import ModelViewer from '@/components/ModelViewer';

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  const {
    title,
    description,
    longDescription,
    type,
    technologies,
    startDate,
    endDate,
    isOngoing,
    githubUrl,
    liveUrl,
    images,
    model3d,
  } = project.attributes;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-500 to-dark-600">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="card p-8 animate-fade-in">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs px-3 py-1 bg-primary-500/20 border border-primary-500/30 text-primary-400 rounded-full font-medium">
                  {type}
                </span>
                {isOngoing && (
                  <span className="text-xs px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full font-medium">
                    Ongoing
                  </span>
                )}
              </div>
              <h1 className="text-5xl font-bold mb-4 glow-text">{title}</h1>
              <p className="text-xl text-gray-300 mb-6">{description}</p>
              <div className="flex items-center gap-2 text-gray-400 mb-6">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {startDate && formatDate(startDate)} - {isOngoing ? 'Present' : endDate ? formatDate(endDate) : 'N/A'}
              </div>
              {technologies && technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech: string, idx: number) => (
                    <span key={idx} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-4">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.91 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.59-2.805 5.61-5.475 5.91.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </span>
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {images?.data && images.data.length > 0 && (
        <div className="container mx-auto px-4 pb-12">
          <div className="card p-8 animate-slide-up">
            <h2 className="text-3xl font-bold mb-6 glow-text">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.data.map((image: any, idx: number) => {
                const imageUrl = getStrapiMedia(image.attributes.url);
                return (
                  <div
                    key={image.id}
                    className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={imageUrl || ''}
                      alt={image.attributes.alternativeText || `${title} - Image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3D Model Viewer - Only show if model exists */}
      {model3d?.data && (
        <div className="container mx-auto px-4 pb-12">
          <div className="card p-8 animate-slide-up">
            <h2 className="text-3xl font-bold mb-6 glow-text">3D Model</h2>
            <ModelViewer
              modelUrl={getStrapiMedia(model3d.data.attributes.url) || ''}
            />
          </div>
        </div>
      )}

      {/* Detailed Description */}
      {longDescription && (
        <div className="container mx-auto px-4 pb-12">
          <div className="card p-8 animate-slide-up">
            <h2 className="text-3xl font-bold mb-6 glow-text">About This Project</h2>
            <div
              className="prose prose-invert prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: longDescription }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
