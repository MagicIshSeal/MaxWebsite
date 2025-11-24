declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerJSX &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

interface ModelViewerJSX {
  src: string;
  alt?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'ar-scale'?: string;
  'auto-rotate'?: boolean;
  'camera-controls'?: boolean;
  'camera-orbit'?: string;
  'camera-target'?: string;
  'environment-image'?: string;
  'exposure'?: string;
  'field-of-view'?: string;
  'max-camera-orbit'?: string;
  'min-camera-orbit'?: string;
  'max-field-of-view'?: string;
  'min-field-of-view'?: string;
  'shadow-intensity'?: string;
  'shadow-softness'?: string;
  poster?: string;
  reveal?: string;
  loading?: string;
  'interaction-prompt'?: string;
  'interaction-prompt-style'?: string;
  'interaction-prompt-threshold'?: string;
  style?: React.CSSProperties;
  className?: string;
}

export {};
