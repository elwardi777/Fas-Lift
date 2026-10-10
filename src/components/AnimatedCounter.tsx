import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}

/** Exponential ease-out — fast ignition, sharp deceleration */
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter({
  target,
  suffix = '',
  label,
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const durationMs = duration * 1000;
    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutExpo(progress);

      setDisplayValue(Math.round(easedProgress * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInView, target, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-6 px-4">
      <span
        className="text-[64px] md:text-[72px] font-extrabold text-white leading-none tracking-tighter"
        style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
      >
        {displayValue}
        {suffix && (
          <span className="text-[40px] md:text-[48px] text-white/60 font-bold ml-0.5">
            {suffix}
          </span>
        )}
      </span>
      <span
        className="mt-3 text-white/50"
        style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: '11px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}
