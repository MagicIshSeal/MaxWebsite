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
      <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome</h1>
          <p className="text-xl text-gray-600">Portfolio site loading...</p>
        </div>
      </section>
    );
  }

  const { name, tagline, bio, profileImage, socialLinks } = about.attributes;
  const imageUrl = profileImage?.data?.attributes?.url;

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {imageUrl && (
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-xl">
              <Image
                src={getStrapiMedia(imageUrl) || ''}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-4">{name}</h1>
            <p className="text-2xl text-primary-600 mb-6">{tagline}</p>
            <div className="prose max-w-none mb-8">
              <p className="text-gray-700">{bio}</p>
            </div>
            {socialLinks && (
              <div className="flex gap-4 justify-center md:justify-start">
                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    GitHub
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    LinkedIn
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
