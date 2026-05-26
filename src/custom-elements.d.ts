import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'auto-rotate'?: boolean | string;
          'auto-rotate-delay'?: string;
          'rotation-per-second'?: string;
          'camera-controls'?: boolean | string;
          'disable-zoom'?: boolean | string;
          'touch-action'?: string;
          'interaction-prompt'?: string;
          'shadow-intensity'?: string;
          'shadow-softness'?: string;
          'camera-orbit'?: string;
          'min-camera-orbit'?: string;
          'max-camera-orbit'?: string;
          'field-of-view'?: string;
          'min-field-of-view'?: string;
          'max-field-of-view'?: string;
          exposure?: string;
          'environment-image'?: string;
          loading?: string;
          poster?: string;
          tone?: string;
        },
        HTMLElement
      >;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}
