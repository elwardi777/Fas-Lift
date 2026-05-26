import { motion, type Variants } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function SectionHeading({
  title,
  subtitle,
  light = false,
  className = '',
}: SectionHeadingProps) {
  const words = title.split(' ');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] ${
          light ? 'text-white' : 'text-[#0B3D78]'
        }`}
        style={{ perspective: '600px' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block mr-[0.3em]"
            style={{ transformOrigin: 'bottom center' }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          variants={subtitleVariants}
          className={`text-calibration mt-4 ${
            light
              ? 'text-white/50'
              : 'text-[#0B3D78]/50'
          }`}
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
