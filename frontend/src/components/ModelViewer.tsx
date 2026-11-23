'use client';

import { useEffect, useRef, useState } from 'react';

interface ModelViewerProps {
  modelUrl: string;
}

export default function ModelViewer({ modelUrl }: ModelViewerProps) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientModelUrl, setClientModelUrl] = useState('');

  useEffect(() => {
    const url = modelUrl;
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

  useEffect(() => {
    if (!isLoading && clientModelUrl && viewerRef.current) {
      const modelViewer = viewerRef.current.querySelector('model-viewer');
      if (modelViewer) {
        modelViewer.addEventListener('load', () => {
          setIsModelLoading(false);
        });
        modelViewer.addEventListener('error', () => {
          setError('Failed to load 3D model');
          setIsModelLoading(false);
        });
      }
    }
  }, [isLoading, clientModelUrl]);

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
    <div ref={viewerRef} className="w-full h-96 md:h-[600px] bg-dark-400 rounded-lg overflow-hidden relative">
      {isModelLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark-400 z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="text-sm text-gray-400">Loading 3D model...</p>
          </div>
        </div>
      )}
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
      />
    </div>
  );
}
