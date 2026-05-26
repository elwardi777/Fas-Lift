import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const PrecisionManufacturingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const { t } = useTranslation();

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden z-10">
        <motion.div
          className="h-full w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #0B3D78 30%, #0B3D78 50%, #0B3D78 70%, transparent 100%)' }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative w-full">
        <img
          src="/images/Gemini_g.png"
          alt="FasLift Speed Governor"
          className="block h-[430px] w-full object-cover object-[44%_center] lg:h-auto lg:object-contain lg:object-center"
          draggable={false}
        />

        <div className="absolute inset-0 flex flex-row overflow-hidden bg-gradient-to-r from-white/96 via-white/72 to-transparent lg:bg-none">
          <img
            src="/images/governor-hero.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 -right-10 z-[1] block w-[min(82vw,360px)] max-w-[360px] h-auto drop-shadow-[0_22px_38px_rgba(11,61,120,0.22)] min-[390px]:w-[min(76vw,380px)] min-[390px]:max-w-[380px] min-[390px]:-right-16 lg:hidden"
            draggable={false}
          />

          <div className="order-2 w-[44%] sm:w-[46%] shrink-0 lg:order-1 lg:block lg:w-[61%]" />

          <div className="relative z-[2] order-1 flex min-w-0 flex-1 flex-col justify-center px-4 py-8 sm:px-8 -translate-y-6 sm:-translate-y-8 lg:-translate-y-16 lg:order-2 lg:w-[39%] lg:flex-none lg:px-14 lg:py-10">
            <motion.img
              src="/images/governor-4-removebg-preview.png"
              alt="FasLift Solutions"
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mb-5 h-[78px] w-auto self-start lg:mb-8 lg:h-[120px]"
            />

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mb-3 font-['Inter',sans-serif] text-[9px] font-semibold uppercase tracking-[0.16em] text-[#0B3D78]/70 sm:text-[10px] lg:text-[11px] lg:tracking-[0.2em]"
            >
              {t('precision.subtitle')}
            </motion.p>

            <motion.h2
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mb-5 font-['Inter',sans-serif] text-[1.65rem] font-extrabold leading-[1.08] text-[#0B3D78] sm:text-[2rem] lg:text-[clamp(1.75rem,3.5vw,2.75rem)] lg:tracking-[-0.03em]"
            >
              {t('precision.heading').split('\n').map((line: string, i: number) => (
                <React.Fragment key={i}>
                  {line}
                  {i === 0 && <br />}
                </React.Fragment>
              ))}
            </motion.h2>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="w-14 h-[3px] rounded-full bg-[#0B3D78]/50 mb-5"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden z-10">
        <motion.div
          className="h-full w-full"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #0B3D78 30%, #0B3D78 50%, #0B3D78 70%, transparent 100%)' }}
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </section>
  );
};

export default PrecisionManufacturingSection;
