import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeading from './SectionHeading';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal from './ScrollReveal';

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

export default function StatsCounter() {
  const { t } = useTranslation();

  const stats: Stat[] = [
    { target: 5, suffix: '+', label: t('about.years') },
    { target: 2, suffix: '+', label: t('about.products') },
    { target: 92, suffix: '+', label: t('about.countries') },
    { target: 1500, suffix: '+', label: t('about.clients') },
  ];

  return (
    <section className="bg-[#0B3D78] py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* ─── LEFT: Text Content ─── */}
          <div className="lg:w-1/2">
            <SectionHeading
              title={t('about.title')}
              light
              subtitle={t('about.subtitle')}
              className="mb-8"
            />

            <ScrollReveal delay={0.3}>
              <p
                className="text-[16px] text-white/70 leading-relaxed max-w-xl"
                style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
              >
                {t('about.body')}
              </p>
            </ScrollReveal>
          </div>

          {/* ─── RIGHT: Animated Counters 2×2 ─── */}
          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-2 relative"
            >
              {/* Thin rule lines — cross pattern */}
              {/* Vertical center line */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/[0.06]" />
              {/* Horizontal center line */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/[0.06]" />

              {stats.map((stat) => (
                <AnimatedCounter
                  key={stat.label}
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
