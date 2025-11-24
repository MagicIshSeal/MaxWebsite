import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api';

interface AboutData {
  attributes: {
    name: string;
    tagline: string;
    bio: string;
    email?: string;
    phone?: string;
    location?: string;
    profileImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
    socialLinks?: {
      github?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
}

export default function Hero({ about }: { about: AboutData | null }) {
  if (!about) {
    return (
      <section className="section bg-gradient-to-br from-dark-400 via-dark-500 to-dark-600">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 glow-text">Welcome</h1>
          <p className="text-xl text-gray-400">Portfolio site loading...</p>
          <div className="flex gap-2 justify-center mt-4">
            <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </section>
    );
  }

  const { name, tagline, bio, profileImage, socialLinks } = about.attributes;
  const imageUrl = profileImage?.data?.attributes?.url;

  return (
    <section id="about" className="section bg-gradient-to-br from-dark-400 via-dark-500 to-dark-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 animate-slide-up">
          {imageUrl && (
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-primary-500/30 hover:ring-primary-500/50 transition-all duration-300 hover:scale-105">
              <Image
                src={getStrapiMedia(imageUrl) || ''}
                alt={name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent"></div>
            </div>
          )}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-6xl font-bold mb-4 glow-text animate-fade-in">{name}</h1>
            <p className="text-3xl text-primary-400 mb-6 animate-fade-in">{tagline}</p>
            <div className="prose prose-invert max-w-none mb-8 animate-fade-in">
              <p className="text-gray-300 text-lg leading-relaxed">{bio}</p>
            </div>
            {socialLinks && (
              <div className="flex gap-4 justify-center md:justify-start animate-fade-in">
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
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
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
