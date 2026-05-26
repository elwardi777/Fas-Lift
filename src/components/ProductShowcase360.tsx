import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ProductShowcase360Props {
  className?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PRODUCT_IMAGES: string[] = [
  '/images/governor-hero.png',
  '/images/Capture_d_écran_2026-05-21_200528-removebg-preview.png',
  '/images/Capture_d_écran_2026-05-21_200445-removebg-preview.png',
  '/images/Capture_d_écran_2026-05-21_200429-removebg-preview.png',
];

const DRAG_THRESHOLD = 80; // px drag distance to switch image
const INERTIA_FRICTION = 0.92;
const INERTIA_MIN_VELOCITY = 0.5;
const MAX_TILT_DEG = 14;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const ProductShowcase360: React.FC<ProductShowcase360Props> = ({ className = '' }) => {
  const { t } = useTranslation();
  // ---- State ----
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [tiltY, setTiltY] = React.useState(0);
  const [lightPos, setLightPos] = React.useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = React.useState(false);
  const [direction, setDirection] = React.useState(0); // -1 left, 1 right


  // ---- Refs ----
  const containerRef = React.useRef<HTMLDivElement>(null);
  const dragStartX = React.useRef(0);
  const dragAccumulated = React.useRef(0);
  const lastDragX = React.useRef(0);
  const velocity = React.useRef(0);
  const inertiaRaf = React.useRef<number | null>(null);

  // ---- Helpers ----
  const totalImages = PRODUCT_IMAGES.length;

  const cycleIndex = React.useCallback(
    (delta: number) => {
      setDirection(delta > 0 ? 1 : -1);
      setCurrentIndex((prev) => ((prev + delta) % totalImages + totalImages) % totalImages);
    },
    [totalImages],
  );

  // ---- Inertia loop ----
  const startInertia = React.useCallback(() => {
    const tick = () => {
      velocity.current *= INERTIA_FRICTION;

      if (Math.abs(velocity.current) < INERTIA_MIN_VELOCITY) {
        velocity.current = 0;
        setTiltY(0);
        return;
      }

      dragAccumulated.current += velocity.current;

      // Check if accumulated drag crossed threshold
      if (Math.abs(dragAccumulated.current) >= DRAG_THRESHOLD) {
        const steps = Math.sign(dragAccumulated.current);
        cycleIndex(steps);
        dragAccumulated.current = 0;
      }

      // Decay tilt
      setTiltY(Math.max(-MAX_TILT_DEG, Math.min(MAX_TILT_DEG, velocity.current * 2)));

      inertiaRaf.current = requestAnimationFrame(tick);
    };

    inertiaRaf.current = requestAnimationFrame(tick);
  }, [cycleIndex]);

  // Cleanup inertia on unmount
  React.useEffect(() => {
    return () => {
      if (inertiaRaf.current !== null) cancelAnimationFrame(inertiaRaf.current);
    };
  }, []);

  // Auto-advance every 2 seconds (paused while dragging or hovering)
  React.useEffect(() => {
    if (isDragging || isHovering) return;
    const timer = setInterval(() => cycleIndex(1), 4000);
    return () => clearInterval(timer);
  }, [isDragging, isHovering, cycleIndex]);

  // ---- Pointer handlers (unified mouse + touch) ----
  const getClientX = (e: React.MouseEvent | React.TouchEvent): number => {
    if ('touches' in e) return e.touches[0]?.clientX ?? 0;
    return e.clientX;
  };

  const handlePointerDown = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      // Cancel any running inertia
      if (inertiaRaf.current !== null) {
        cancelAnimationFrame(inertiaRaf.current);
        inertiaRaf.current = null;
      }

      const x = getClientX(e);
      dragStartX.current = x;
      lastDragX.current = x;
      dragAccumulated.current = 0;
      velocity.current = 0;
      setIsDragging(true);
    },
    [],
  );

  const handlePointerMove = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;

      const x = getClientX(e);
      const deltaX = x - lastDragX.current;
      lastDragX.current = x;
      velocity.current = deltaX;

      dragAccumulated.current += deltaX;

      // Tilt proportional to drag speed
      const clampedTilt = Math.max(-MAX_TILT_DEG, Math.min(MAX_TILT_DEG, deltaX * 3));
      setTiltY(clampedTilt);

      // Check if we crossed a threshold to switch image
      if (Math.abs(dragAccumulated.current) >= DRAG_THRESHOLD) {
        const steps = dragAccumulated.current > 0 ? 1 : -1;
        cycleIndex(steps);
        dragAccumulated.current = 0;
      }
    },
    [isDragging, cycleIndex],
  );

  const handlePointerUp = React.useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    // Launch inertia if velocity is significant
    if (Math.abs(velocity.current) > INERTIA_MIN_VELOCITY) {
      startInertia();
    } else {
      setTiltY(0);
    }
  }, [isDragging, startInertia]);

  // ---- Hover lighting ----
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setLightPos({ x, y });

      // Also handle drag if active
      if (isDragging) handlePointerMove(e);
    },
    [isDragging, handlePointerMove],
  );

  // ---- Image transition variants ----
  const isLargeImage = currentIndex > 0;
  const targetScale = isLargeImage ? 1.28 : 1.0;
  const enterExitScale = targetScale * 0.92;

  const imageVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      scale: enterExitScale,
      rotateY: dir * 30,
    }),
    center: {
      opacity: 1,
      scale: targetScale,
      rotateY: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      scale: enterExitScale,
      rotateY: dir * -30,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    }),
  };

  return (
    <div
      ref={containerRef}
      className={`product-360-container relative flex flex-col items-center justify-center select-none w-full max-w-full overflow-hidden ${className}`}
      onMouseDown={handlePointerDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={() => {
        handlePointerUp();
        setIsHovering(false);
      }}
      onMouseEnter={() => setIsHovering(true)}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* --- Product image --- */}
      <div
        className="relative w-full max-w-full flex items-center justify-center px-1 h-[280px] sm:h-[400px] md:h-[460px] lg:h-[500px]"
        style={{
          perspective: '1000px',
        }}
      >
        {/* Floating wrapper */}
        <motion.div
          className="relative max-w-full"
          style={{
            animation: 'float 4s ease-in-out infinite',
          }}
        >
          {/* 3D tilt wrapper */}
          <motion.div
            animate={{ rotateY: tiltY }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentIndex}
                src={PRODUCT_IMAGES[currentIndex]}
                alt={`FasLift Speed Governor — View ${currentIndex + 1}`}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="h-auto max-h-[280px] sm:max-h-[400px] md:max-h-[460px] lg:max-h-[500px] w-full max-w-[min(100%,320px)] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[500px] object-contain pointer-events-none mx-auto"
                draggable={false}
              />
            </AnimatePresence>

            {/* Cursor-following light overlay */}
            {isHovering && (
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl opacity-30 mix-blend-soft-light transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
                }}
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* --- Indicator dots --- */}
      <div className="flex items-center gap-2 mt-6 mb-2">
        {PRODUCT_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'w-6 bg-white'
                : 'w-1.5 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`View ${i + 1}`}
          />
        ))}
      </div>

      {/* --- Hint label --- */}
      <p className="text-calibration mt-1 tracking-[0.15em]">
        {t('products.dragRotate')}
      </p>
    </div>
  );
};

export default ProductShowcase360;
