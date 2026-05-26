import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, HardHat, Award, Package, type LucideIcon } from 'lucide-react';

interface ReasonCard {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  image: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.15 + i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function ReasonCardItem({ card, index }: { card: ReasonCard; index: number }) {
  const Icon = card.icon;

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group h-full"
    >
      <div className="trusted-card relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[30px]">
        {/* Visual stage */}
        <div className="relative h-[140px] sm:h-[160px] overflow-hidden">
          <div
            className="absolute inset-0 product-groups-blueprint opacity-50"
            aria-hidden
          />
          <img
            src={card.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center opacity-25 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:opacity-35"
            draggable={false}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#F5F7FA]/30 via-transparent to-white/90"
            aria-hidden
          />

          <div className="relative z-10 flex h-full items-center justify-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#DDE3EC] bg-white/85 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-[6deg] group-hover:border-[#0B3D78]/10 group-hover:bg-[#0B3D78] group-hover:shadow-[0_12px_32px_rgba(11,61,120,0.15)]"
              style={{ boxShadow: '0 12px 32px rgba(11,61,120,0.08)' }}
            >
              <Icon
                size={28}
                strokeWidth={1.5}
                className="text-[#0B3D78] transition-colors duration-300 group-hover:text-white"
              />
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          >
            <div
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              style={{ animation: 'product-shine-sweep 3s ease-in-out infinite' }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col px-6 pb-7 pt-2 sm:px-7 sm:pb-8">
          <h3 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-[#0B3D78] leading-snug">
            {card.title}
          </h3>
          <p className="mt-3 flex-1 text-[13px] sm:text-sm leading-relaxed text-[#6E788D]">
            {card.subtitle}
          </p>

          <div className="mt-6 h-[3.5px] w-12 rounded-full bg-gradient-to-r from-[#0B3D78] via-[#0B3D78] to-[#0B3D78] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-hover:from-[#0B3D78] group-hover:via-[#1565C0] group-hover:to-[#0B3D78] group-hover:shadow-[0_0_12px_rgba(21,101,192,0.5)]" />
        </div>
      </div>
    </motion.article>
  );
}

export default function TrustedStandardSection() {
  const { t } = useTranslation();

  const reasons: ReasonCard[] = [
    {
      icon: Shield,
      title: t('trusted.card1Title'),
      subtitle: t('trusted.card1Subtitle'),
      image: '/images/governor-hero.png',
    },
    {
      icon: HardHat,
      title: t('trusted.card2Title'),
      subtitle: t('trusted.card2Subtitle'),
      image: '/images/manufacturing.png',
    },
    {
      icon: Award,
      title: t('trusted.card3Title'),
      subtitle: t('trusted.card3Subtitle'),
      image: '/images/Gemini_Generated_Image_s0lqjas0lqjas0lq.png',
    },
    {
      icon: Package,
      title: t('trusted.card4Title'),
      subtitle: t('trusted.card4Subtitle'),
      image: '/images/category-governors.png',
    },
  ];

  return (
    <section
      id="trusted-standard"
      className="relative w-full max-w-full overflow-hidden bg-[#F5F7FA] py-20 md:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 product-groups-waves" aria-hidden />
      <div className="pointer-events-none absolute inset-0 product-groups-blueprint opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full blur-3xl opacity-50"
        style={{ background: 'radial-gradient(ellipse, rgba(11,61,120,0.12) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-14 max-w-4xl text-center md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DDE3EC] bg-white/70 px-4 py-1.5 font-['JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0B3D78]/80 backdrop-blur-sm">
            {t('trusted.badge')}
          </span>
          <h2 className="font-['Inter',sans-serif] text-[clamp(1.35rem,3.2vw,2.35rem)] font-extrabold leading-[1.2] tracking-tight text-[#0B3D78]">
            {t('trusted.heading')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] sm:text-base leading-relaxed text-[#6E788D]">
            {t('trusted.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
          {reasons.map((card, index) => (
            <ReasonCardItem key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DDE3EC] to-transparent" aria-hidden />
    </section>
  );
}
