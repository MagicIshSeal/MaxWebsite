import Image from 'next/image';
import { getStrapiMedia, type AboutAttributes } from '@/lib/api';

interface AboutData {
  attributes: AboutAttributes;
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

  const { 
    name, 
    tagline, 
    bio, 
    profileImage, 
    heroMedia,
    socialLinks,
    heroTitle,
    heroSubtitle,
    ctaButtonText,
    ctaButtonLink
  } = about.attributes;
  
  const imageUrl = profileImage?.data?.attributes?.url;
  const heroMediaUrl = heroMedia?.data?.attributes?.url;
  const heroMediaType = heroMedia?.data?.attributes?.mime;
  const isVideo = heroMediaType?.startsWith('video');

  // Use hero fields if available, otherwise fall back to regular fields
  const displayTitle = heroTitle || name;
  const displaySubtitle = heroSubtitle || tagline;

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-dark-400 via-dark-500 to-dark-600 relative overflow-hidden flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Media Background */}
      {heroMediaUrl && (
        <div className="absolute inset-0 opacity-20">
          {isVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={getStrapiMedia(heroMediaUrl) || ''} type={heroMediaType} />
            </video>
          ) : (
            <Image
              src={getStrapiMedia(heroMediaUrl) || ''}
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-500/50 to-dark-600"></div>
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto animate-slide-up">
          {/* Profile Image */}
          {imageUrl && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-2xl ring-4 ring-primary-500/30 hover:ring-primary-500/50 transition-all duration-300 mb-8">
              <Image
                src={getStrapiMedia(imageUrl) || ''}
                alt={name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text leading-tight">
            {displayTitle}
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
            {displaySubtitle}
          </p>

          {/* CTA Button */}
          <div className="flex gap-4 mb-12">
            <a
              href={ctaButtonLink || '#projects'}
              className="btn-primary text-lg px-8 py-4"
            >
              {ctaButtonText || 'View Projects'}
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            {socialLinks && socialLinks.length > 0 && (
              <a
                href={socialLinks.find(link => link.platform.toLowerCase() === 'github')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4"
              >
                {socialLinks.find(link => link.platform.toLowerCase() === 'github')?.platform || 'GitHub'}
              </a>
            )}
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce mt-8">
            <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
