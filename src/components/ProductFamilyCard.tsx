/* ═══════════════════════════════════════════════════════════════════════════
   ProductFamilyCard — Premium Industrial Engineering Product Card
   ═══════════════════════════════════════════════════════════════════════════ */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface ProductFamilyItem {
  number: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  blueprintImage?: string;
  imageAlt: string;
  href: string;
  ctaText: string;
  tag?: string;
  badge?: string;
  status?: string;
  technicalDetails?: string[];
  graphicType?: 'governor' | 'tensioner' | 'pulley';
}

export interface ProductFamilyCardProps {
  product: ProductFamilyItem;
  index: number;
  total?: number;
  hoveredIndex?: number | null;
  setHoveredIndex?: (idx: number | null) => void;
}

export const ProductFamilyCard: React.FC<ProductFamilyCardProps> = ({
  product,
  index,
  hoveredIndex,
  setHoveredIndex,
}) => {
  const [shimmerPos, setShimmerPos] = useState({ x: 50, y: 50 });
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && !isHovered;
  const tag = product.badge || product.tag || '';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setShimmerPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay: 0.1 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        opacity: isOtherHovered ? 0.72 : 1,
        transition: 'opacity 0.3s ease',
      }}
      className="h-full"
    >
      <Link
        to={product.href}
        className="group block relative no-underline h-full"
        onMouseEnter={() => setHoveredIndex?.(index)}
        onMouseLeave={() => { setHoveredIndex?.(null); }}
        onMouseMove={handleMouseMove}
      >
        {/* ── CARD SHELL ── */}
        <div
          className="relative rounded-[20px] overflow-hidden min-h-[195px] sm:min-h-[215px] flex items-center transition-all duration-[350ms] ease-out"
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid rgba(11,61,120,0.14)',
            boxShadow: isHovered
              ? '0 0 0 1px rgba(11,61,120,0.28), 0 20px 48px rgba(11,61,120,0.16), 0 6px 16px rgba(11,61,120,0.08)'
              : '0 1px 0 0 rgba(255,255,255,0.9) inset, 0 12px 32px rgba(11,61,120,0.10), 0 2px 8px rgba(11,61,120,0.06)',
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0px)',
          }}
        >
          {/* ── PREMIUM INNER HIGHLIGHT (top edge) ── */}
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.95) 60%, transparent 100%)',
            }}
          />

          {/* ── RADIAL SHIMMER LAYER (follows mouse) ── */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle 220px at ${shimmerPos.x}% ${shimmerPos.y}%, rgba(11,61,120,0.045) 0%, transparent 70%)`,
            }}
          />



          {/* ── CAD CORNER MICRO-ACCENTS ── */}
          {/* top-left */}
          <span className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l pointer-events-none transition-colors duration-300"
            style={{ borderColor: isHovered ? 'rgba(11,61,120,0.7)' : 'rgba(11,61,120,0.2)' }} />
          {/* top-right */}
          <span className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r pointer-events-none transition-colors duration-300"
            style={{ borderColor: isHovered ? 'rgba(11,61,120,0.7)' : 'rgba(11,61,120,0.2)' }} />
          {/* bottom-left */}
          <span className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l pointer-events-none transition-colors duration-300"
            style={{ borderColor: isHovered ? 'rgba(11,61,120,0.7)' : 'rgba(11,61,120,0.2)' }} />
          {/* bottom-right */}
          <span className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r pointer-events-none transition-colors duration-300"
            style={{ borderColor: isHovered ? 'rgba(11,61,120,0.7)' : 'rgba(11,61,120,0.2)' }} />

          {/* ── TOP ACCENT LINE ── */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none origin-left transition-transform duration-[350ms] ease-out"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #0B3D78 30%, #1565C0 60%, #0B3D78 100%)',
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            }}
          />

          {/* ── CARD CONTENT ── */}
          <div className="relative z-10 flex items-center w-full px-5 py-5 sm:px-6 sm:py-5 gap-4 sm:gap-5">

            {/* ── IMAGE CONTAINER ── */}
            <div
              className="shrink-0 flex items-center justify-center rounded-[14px] p-2.5 transition-all duration-[350ms] ease-out"
              style={{
                width: '104px',
                height: '104px',
                background: isHovered
                  ? 'linear-gradient(145deg, #ddeef9 0%, #eaf2fb 100%)'
                  : 'linear-gradient(145deg, #eef5fc 0%, #f0f6fd 100%)',
                border: '1px solid rgba(11,61,120,0.12)',
                boxShadow: isHovered
                  ? '0 4px 14px rgba(11,61,120,0.14), inset 0 1px 0 rgba(255,255,255,0.9)'
                  : '0 2px 8px rgba(11,61,120,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <img
                src={product.image}
                alt={product.imageAlt}
                className="object-contain transition-transform duration-[350ms] ease-out"
                style={{
                  maxWidth: '86px',
                  maxHeight: '86px',
                  transform: isHovered ? 'scale(1.07)' : 'scale(1)',
                  filter: 'drop-shadow(0 4px 10px rgba(11,61,120,0.15))',
                }}
              />
            </div>

            {/* ── TEXT CONTENT ── */}
            <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-0.5 gap-2">

              {/* Top Row: Code + Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-extrabold text-[#0B3D78] tracking-widest leading-none">
                  {product.number} // {product.code}
                </span>

                {/* Badge / Tag chip */}
                {tag && (
                  <span
                    className="font-mono text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full shrink-0 transition-all duration-300"
                    style={{
                      color: isHovered ? '#ffffff' : '#0B3D78',
                      background: isHovered
                        ? 'linear-gradient(135deg, #0B3D78, #1565C0)'
                        : 'linear-gradient(135deg, #EAF2FB, #ddeef9)',
                      border: '1px solid rgba(11,61,120,0.2)',
                      boxShadow: isHovered ? '0 2px 8px rgba(11,61,120,0.3)' : 'none',
                    }}
                  >
                    {tag}
                  </span>
                )}
              </div>

              {/* Product Title */}
              <div>
                <h3
                  className="font-extrabold text-base sm:text-[17px] uppercase tracking-tight leading-snug transition-colors duration-300"
                  style={{ color: isHovered ? '#0B3D78' : '#0F172A' }}
                >
                  {product.title}
                </h3>
                <span className="text-[11px] text-[#64748B] font-mono font-medium block mt-0.5 truncate">
                  {product.subtitle}
                </span>
              </div>

              {/* CTA Row */}
              <div
                className="flex items-center justify-end pt-2 mt-0.5"
                style={{
                  borderTop: '1px solid rgba(11,61,120,0.08)',
                }}
              >
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] font-extrabold uppercase tracking-wider transition-colors duration-300 relative"
                  style={{ color: isHovered ? '#082a54' : '#0B3D78' }}
                >
                  {product.ctaText}
                  <ArrowRight
                    size={13}
                    style={{
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-0.5 left-0 right-4 h-[1.5px] origin-left transition-transform duration-300"
                    style={{
                      background: '#0B3D78',
                      transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductFamilyCard;
