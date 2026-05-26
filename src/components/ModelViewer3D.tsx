import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import model-viewer side-effect (registers the custom element)
import '@google/model-viewer';

interface ModelViewer3DProps {
  className?: string;
}

const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ className = '' }) => {
  const [progress, setProgress] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [shouldLoad, setShouldLoad] = React.useState(false);

  // Store active listeners for dynamic cleanups
  const activeListenersRef = React.useRef<{
    node: HTMLElement;
    handleProgress: (e: Event) => void;
    handleLoad: (e: Event) => void;
  } | null>(null);

  // Defer the model-viewer mount slightly so that entrance page loads and animations complete smoothly first
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 600);

    return () => {
      clearTimeout(timer);
      if (activeListenersRef.current) {
        const { node, handleProgress, handleLoad } = activeListenersRef.current;
        node.removeEventListener('progress', handleProgress);
        node.removeEventListener('load', handleLoad);
        activeListenersRef.current = null;
      }
    };
  }, []);

  // Callback ref: handles event listeners dynamically as the web component mounts in the DOM
  const modelViewerRef = React.useCallback((node: HTMLElement | null) => {
    // 1. Clean up old listeners
    if (activeListenersRef.current) {
      const { node: oldNode, handleProgress, handleLoad } = activeListenersRef.current;
      oldNode.removeEventListener('progress', handleProgress);
      oldNode.removeEventListener('load', handleLoad);
      activeListenersRef.current = null;
    }

    // 2. Attach new listeners
    if (node !== null) {
      const handleProgress = (e: Event) => {
        const customEvent = e as CustomEvent<{ totalProgress: number }>;
        const totalProgress = customEvent.detail?.totalProgress ?? 0;
        const percent = Math.min(Math.round(totalProgress * 100), 100);
        setProgress(percent);
        if (percent >= 100) {
          setIsLoaded(true);
        }
      };

      const handleLoad = () => {
        setProgress(100);
        setIsLoaded(true);
      };

      node.addEventListener('progress', handleProgress);
      node.addEventListener('load', handleLoad);

      activeListenersRef.current = {
        node,
        handleProgress,
        handleLoad
      };

      // Check if it has cached loaded state already
      if ((node as any).loaded) {
        setProgress(100);
        setIsLoaded(true);
      }
    }
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Loading View overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-transparent"
          >
            {/* SVG Circular Progress */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {/* Track circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  className="stroke-[#0B3D78]/10"
                  strokeWidth="5"
                  fill="transparent"
                />
                {/* Progress circle */}
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  className="stroke-[#0B3D78] transition-all duration-300 ease-out"
                  strokeWidth="5"
                  fill="transparent"
                  strokeDasharray={238.76} // 2 * pi * 38 = 238.76
                  strokeDashoffset={238.76 - (238.76 * progress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              {/* Inner text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-[#0B3D78] tracking-tighter">
                  {progress}%
                </span>
              </div>
            </div>

            {/* Premium Loading Text */}
            <div className="mt-4 flex flex-col items-center gap-0.5">
              <span className="text-[9px] font-bold text-[#0B3D78]/60 tracking-[0.25em] uppercase">
                FasLift 3D Engine
              </span>
              <span className="text-xs font-semibold text-[#0d2d6c] animate-pulse">
                Loading interactive model...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Model Viewer Container */}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          scale: isLoaded ? 1 : 0.95 
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* 360° badge */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#0B3D78"/>
          </svg>
          <span className="text-[11px] font-semibold text-[#0B3D78] tracking-wide">360°</span>
        </div>

        {shouldLoad && (
          <model-viewer
            ref={modelViewerRef as any}
            src="/images/3daily-model.glb"
            alt="FasLift Speed Governor 3D Model"
            auto-rotate=""
            auto-rotate-delay="0"
            rotation-per-second="30deg"
            camera-controls=""
            disable-zoom=""
            touch-action="pan-y"
            interaction-prompt="auto"
            shadow-intensity="1.2"
            shadow-softness="0.8"
            camera-orbit="45deg 75deg 105%"
            min-camera-orbit="auto auto 105%"
            max-camera-orbit="auto auto 105%"
            field-of-view="30deg"
            min-field-of-view="30deg"
            max-field-of-view="30deg"
            exposure="1"
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              minHeight: '300px',
              outline: 'none',
              '--poster-color': 'transparent',
            } as React.CSSProperties}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ModelViewer3D;
