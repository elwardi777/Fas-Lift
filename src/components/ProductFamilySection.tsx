/* ═══════════════════════════════════════════════════════════════════════════
   ProductFamilySection Component - i18n-aware Engineering Product Showcase
   ═══════════════════════════════════════════════════════════════════════════ */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProductFamilyCard, { type ProductFamilyItem } from './ProductFamilyCard';

export const ProductFamilySection: React.FC = () => {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const PRODUCT_FAMILIES_DATA: ProductFamilyItem[] = [
    {
      number: '01',
      code: 'FS-SG',
      title: t('productFamilies.card1Title'),
      subtitle: t('productFamilies.card1Subtitle'),
      description: 'Precision speed monitoring systems engineered for reliable elevator operation.',
      image: '/images/governor_3d_transparent.png',
      imageAlt: 'FasLift Overspeed Governor',
      href: '/products/speed-governors',
      ctaText: t('productFamilies.exploreBtn'),
      badge: t('productFamilies.card1Badge'),
      status: t('productFamilies.card1Status'),
      technicalDetails: ['EN 81-20/50', 'TÜV SÜD CERTIFIED', 'MAX 1.96 m/s'],
      graphicType: 'governor',
    },
    {
      number: '02',
      code: 'FS-TP',
      title: t('productFamilies.card2Title'),
      subtitle: t('productFamilies.card2Subtitle'),
      description: 'Reliable rope tensioning components designed for elevator safety.',
      image: '/images/image-removebg-preview.png',
      imageAlt: 'FasLift Tensioner Pulley',
      href: '/products/tensioner-pulley',
      ctaText: t('productFamilies.exploreBtn'),
      badge: t('productFamilies.card2Badge'),
      status: t('productFamilies.card2Status'),
      technicalDetails: ['ROPE TENSIONING', 'SPRING LOADED', 'SAFETY SWITCH'],
      graphicType: 'tensioner',
    },
    {
      number: '03',
      code: 'FS-P',
      title: t('productFamilies.card3Title'),
      subtitle: t('productFamilies.card3Subtitle'),
      description: 'Precision-manufactured traction components engineered for elevators.',
      image: '/images/pulley_single_yellow.png',
      imageAlt: 'FasLift Cast Iron Pulley',
      href: '/products/pulleys',
      ctaText: t('productFamilies.exploreBtn'),
      badge: t('productFamilies.card3Badge'),
      status: t('productFamilies.card3Status'),
      technicalDetails: ['CAST IRON GGG-50', 'CNC V-GROOVE', 'EN 81-20/50'],
      graphicType: 'pulley',
    },
  ];

  return (
    <section className="relative z-30 w-full -mt-20 sm:-mt-24 lg:-mt-28 mb-10 sm:mb-14 px-4 sm:px-6 lg:px-12 pointer-events-auto">
      <div className="mx-auto w-full max-w-[1440px]">
        {/* ── 3 Senior Engineering Blueprint Cards bridging Hero & section below ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRODUCT_FAMILIES_DATA.map((product, idx) => (
            <ProductFamilyCard
              key={product.number}
              product={product}
              index={idx}
              total={PRODUCT_FAMILIES_DATA.length}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFamilySection;
