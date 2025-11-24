'use client';

import { useEffect, useRef, useState } from 'react';

interface ModelViewerProps {
  modelUrl: string;
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientModelUrl, setClientModelUrl] = useState('');

  useEffect(() => {
    // Convert server-side URL to client-side URL
    let url = modelUrl;
    if (url.includes('strapi:1337')) {
      url = url.replace('http://strapi:1337', 'http://localhost:1337');
    } else if (!url.startsWith('http')) {
      url = `http://localhost:1337${url}`;
    }
    setClientModelUrl(url);
  }, [modelUrl]);

  useEffect(() => {
    // Check if model-viewer is already loaded
    if (typeof window !== 'undefined' && customElements.get('model-viewer')) {
      setIsLoading(false);
      return;
    }

    // Load model-viewer library
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js';
    script.onload = () => setIsLoading(false);
    script.onerror = () => {
      setError('Failed to load 3D viewer');
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-96 bg-dark-400 rounded-lg flex items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (isLoading || !clientModelUrl) {
    return (
      <div className="w-full h-96 bg-dark-400 rounded-lg flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div ref={viewerRef} className="w-full h-96 md:h-[600px] bg-dark-400 rounded-lg overflow-hidden">
      <model-viewer
        src={clientModelUrl}
        alt="3D Model"
        auto-rotate
        camera-controls
        shadow-intensity="1"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
        loading="eager"
        reveal="auto"
      >
        <div slot="progress-bar" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: '0.5rem',
        }}>
          <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce"></div>
          <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </model-viewer>
    </div>
  );
}
