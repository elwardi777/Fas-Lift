import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ProcessNode {
  step: number;
  title: string;
  description: string;
}


const SectionHeading: React.FC<{ children: string }> = ({ children }) => (
  <div className="flex items-center gap-4 mb-12 md:mb-16">
    <div className="w-8 h-[2px] bg-white/30" />
    <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] uppercase text-white/50">
      {children}
    </span>
    <div className="flex-1 h-[0.5px] bg-white/[0.06]" />
  </div>
);

const Production: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const PROCESS_NODES: ProcessNode[] = [
    { step: 1, title: t('production.step1Title'), description: t('production.step1Desc') },
    { step: 2, title: t('production.step2Title'), description: t('production.step2Desc') },
    { step: 3, title: t('production.step3Title'), description: t('production.step3Desc') },
    { step: 4, title: t('production.step4Title'), description: t('production.step4Desc') },
    { step: 5, title: t('production.step5Title'), description: t('production.step5Desc') },
    { step: 6, title: t('production.step6Title'), description: t('production.step6Desc') },
  ];

  return (
    <section
      id="production"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#0B3D78] overflow-hidden"
    >
      {/* Diagonal hatch pattern overlay */}
      <div className="absolute inset-0 hatch-pattern pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t('production.heading')}</SectionHeading>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block">
          <div className="flex items-start justify-between relative">
            {/* SVG connector lines between circles */}
            <svg
              className="absolute top-[24px] left-0 w-full h-[4px] pointer-events-none"
              preserveAspectRatio="none"
            >
              <line
                x1="4%"
                y1="2"
                x2="96%"
                y2="2"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset={isInView ? '0' : '1000'}
                style={{
                  transition: 'stroke-dashoffset 2s ease-out',
                }}
              />
            </svg>

            {PROCESS_NODES.map((node, index) => (
              <motion.div
                key={node.step}
                className="flex flex-col items-center text-center flex-1"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Circle node */}
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-[#0B3D78] relative z-10">
                  <span className="font-['JetBrains_Mono',monospace] text-sm font-bold text-white">
                    {String(node.step).padStart(2, '0')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-5 font-bold text-[18px] md:text-[20px] text-white leading-tight max-w-[160px]">
                  {node.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-[14px] text-white/50 max-w-[150px] leading-snug">
                  {node.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden overflow-x-hidden">
          <div className="flex flex-col items-start relative pl-8">
            {/* Vertical SVG connector */}
            <svg
              className="absolute left-[23px] top-0 w-[4px] h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <line
                x1="2"
                y1="24"
                x2="2"
                y2="100%"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeDasharray="800"
                strokeDashoffset={isInView ? '0' : '800'}
                style={{
                  transition: 'stroke-dashoffset 2.5s ease-out',
                }}
              />
            </svg>

            {PROCESS_NODES.map((node, index) => (
              <motion.div
                key={node.step}
                className="flex items-start gap-5 mb-10 last:mb-0 snap-start relative"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
              >
                {/* Circle node */}
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center bg-[#0B3D78] relative z-10 shrink-0 -ml-8">
                  <span className="font-['JetBrains_Mono',monospace] text-sm font-bold text-white">
                    {String(node.step).padStart(2, '0')}
                  </span>
                </div>

                <div className="pt-1">
                  <h3 className="font-bold text-[18px] text-white leading-tight">
                    {node.title}
                  </h3>
                  <p className="mt-1 text-[14px] text-white/50 leading-snug">
                    {node.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Production;
