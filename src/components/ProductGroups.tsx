import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeading from './SectionHeading';

interface ProductGroup {
  title: string;
  count: number;
  image: string;
}


function ProductCard({
  group,
  index,
  productsLabel,
}: {
  group: ProductGroup;
  index: number;
  productsLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="product-card group relative overflow-hidden rounded-xl min-h-[160px] md:min-h-[200px] cursor-pointer">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${group.image})` }}
        />

        {/* Dark overlay — dims background to ~15% */}
        <div className="absolute inset-0 bg-black/85" />

        {/* Navy hover overlay — clip-path wipe from left */}
        <div className="product-card-overlay absolute inset-0 bg-[#0B3D78]/80" />

        {/* Content */}
        <div className="relative z-10 flex items-end justify-between h-full p-6 md:p-8 min-h-[160px] md:min-h-[200px]">
          <div className="flex flex-col gap-3">
            <h3 className="text-[22px] md:text-[24px] lg:text-[30px] font-bold text-white leading-tight">
              {group.title}
            </h3>
            <span className="inline-flex items-center self-start rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[12px] font-medium text-white/90 tracking-wide">
              {group.count} {productsLabel}
            </span>
          </div>

          {/* Arrow */}
          <span className="text-white text-2xl md:text-3xl transition-transform duration-200 ease-out group-hover:translate-x-2 flex-shrink-0 ml-4 self-center">
            →
          </span>
        </div>

        {/* Hover lift + shadow via CSS */}
        <style>{`
          .product-card {
            transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
                         box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 8px 0 rgba(0, 0, 0, 0.18);
          }
          .product-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 4px rgba(0, 0, 0, 0.22);
          }
        `}</style>
      </div>
    </motion.div>
  );
}

export default function ProductGroups() {
  const { t } = useTranslation();

  const productGroups: ProductGroup[] = [
    { title: t('products.speedGovernors'), count: 8, image: '/images/category-governors.png' },
    { title: t('products.safetyGears'), count: 12, image: '/images/category-safety-gears.png' },
  ];

  return (
    <section className="bg-[#F5F7FA] py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title={t('products.heading')}
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {productGroups.map((group, index) => (
            <ProductCard key={group.title} group={group} index={index} productsLabel={t('products.productsLabel')} />
          ))}
        </div>
      </div>
    </section>
  );
}
