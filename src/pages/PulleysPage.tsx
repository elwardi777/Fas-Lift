import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';
import Lightbox from '../components/Lightbox';
import { X, ArrowRight, FileText } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   Product Data Structure
   ═══════════════════════════════════════════════════════════════════════════ */
export interface PulleyProduct {
  id: string;
  name: string;
  code: string;
  diameter: string;
  shaftDiameter: string;
  bearing: string;
  material: string;
  productType: string;
  image: string;
  galleryImages: string[];
  blueprintImage?: string;
  description: string;
}

export const getPulleyProducts = (t: any): PulleyProduct[] => [
  {
    id: 'fs-p210',
    name: 'Pulley 210 mm',
    code: 'FS-P210',
    diameter: '210 mm',
    shaftDiameter: '50 mm',
    bearing: '—',
    material: t('pulleys.castIron', 'Cast Iron'),
    productType: t('pulleys.vBeltPulley', 'V-Belt Pulley'),
    image: '/images/pulley_single_yellow.png',
    galleryImages: [
      '/images/pulley_single_yellow.png',
      '/images/pulley_210_drawing.png'
    ],
    blueprintImage: '/images/pulley_210_drawing.png',
    description: t('pulleys.p210Desc', 'Heavy-duty cast iron pulley designed for reliable belt transmission applications. Manufactured for stable rotation, durability and industrial use.')
  },
  {
    id: 'fs-p240',
    name: 'Pulley 240 mm',
    code: 'FS-P240',
    diameter: '240 mm',
    shaftDiameter: '80 mm',
    bearing: '—',
    material: t('pulleys.castIron', 'Cast Iron'),
    productType: t('pulleys.vBeltPulley', 'V-Belt Pulley'),
    image: '/images/pulley_single_yellow.png',
    galleryImages: [
      '/images/pulley_single_yellow.png',
      '/images/pulley_240_drawing.png'
    ],
    blueprintImage: '/images/pulley_240_drawing.png',
    description: t('pulleys.p240Desc', 'Robust 240 mm cast iron pulley designed for high load capacity, optimal power transmission, and long service life in elevator traction systems.')
  },
  {
    id: 'fs-p320',
    name: 'Pulley 320 mm',
    code: 'FS-P320',
    diameter: '320 mm',
    shaftDiameter: '90 mm',
    bearing: '—',
    material: t('pulleys.castIron', 'Cast Iron'),
    productType: t('pulleys.vBeltPulley', 'V-Belt Pulley'),
    image: '/images/pulley_single_yellow.png',
    galleryImages: [
      '/images/pulley_single_yellow.png',
      '/images/pulley_320_drawing.png'
    ],
    blueprintImage: '/images/pulley_320_drawing.png',
    description: t('pulleys.p320Desc', 'Heavy-duty 320 mm cast iron pulley with precision CNC-turned V-grooves for elevator installations demanding superior traction stability.')
  },
  {
    id: 'fs-p400',
    name: 'Pulley 400 mm',
    code: 'FS-P400',
    diameter: '400 mm',
    shaftDiameter: '90 mm',
    bearing: '—',
    material: t('pulleys.castIron', 'Cast Iron'),
    productType: t('pulleys.vBeltPulley', 'V-Belt Pulley'),
    image: '/images/pulley_single_yellow.png',
    galleryImages: [
      '/images/pulley_single_yellow.png',
      '/images/pulley_400_drawing.png'
    ],
    blueprintImage: '/images/pulley_400_drawing.png',
    description: t('pulleys.p400Desc', 'Large capacity 400 mm cast iron pulley engineered for maximum load stability, minimal vibration, and heavy elevator machine configurations.')
  }
];

export const PULLEY_PRODUCTS: PulleyProduct[] = getPulleyProducts((_: string, fb?: string) => fb || '');

/* ═══════════════════════════════════════════════════════════════════════════
   Product Showcase Component (Hero Floating Showcase)
   ═══════════════════════════════════════════════════════════════════════════ */
const ProductShowcase = () => {
  const HERO_IMAGES = [
    { src: '/images/pulley_hero_trio.png', alt: 'Pulley Trio Set' },
    { src: '/images/pulley_slide_1.png', alt: 'Front View Cast Iron Pulley' },
    { src: '/images/pulley_slide_2.png', alt: '3D Angle Cast Iron Pulley' },
    { src: '/images/pulley_slide_3.png', alt: 'Side View Brackets & Shaft' },
    { src: '/images/pulley_slide_4.png', alt: 'Groove Profile View' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isHovered || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered, isPaused, HERO_IMAGES.length]);

  const handleThumbnailClick = (idx: number) => {
    setActiveIndex(idx);
    setIsPaused(true);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[600px]">
      <div
        className="pdp-showcase-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pdp-showcase-glow" />
        <div className="pdp-showcase-shadow" />

        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="pdp-showcase-slide"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: activeIndex === idx ? 1 : 0,
              pointerEvents: activeIndex === idx ? 'auto' : 'none',
              transition: 'opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: activeIndex === idx ? 3 : 2
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="pdp-showcase-img pointer-events-none"
            />
            <div className="pdp-metallic-sweep" />
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-4 overflow-x-auto p-2 max-w-full items-center">
        {HERO_IMAGES.map((img, idx) => (
          <button
            key={idx}
            onClick={() => handleThumbnailClick(idx)}
            title={`Select ${img.alt}`}
            aria-label={`Select ${img.alt}`}
            className={`w-14 h-14 rounded-2xl border-2 overflow-hidden bg-white p-1.5 transition-all duration-300 flex-shrink-0 cursor-pointer ${
              activeIndex === idx
                ? 'border-[#0B3D78] ring-4 ring-[#0B3D78]/15 shadow-lg scale-110 z-10'
                : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400 hover:scale-105'
            }`}
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-contain pointer-events-none" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   Product Detail Modal Component
   ═══════════════════════════════════════════════════════════════════════════ */
const ProductDetailModal = ({
  product,
  onClose,
  onOpenLightbox
}: {
  product: PulleyProduct;
  onClose: () => void;
  onOpenLightbox: (src: string) => void;
}) => {
  const { t } = useTranslation();
  const [activeImage, setActiveImage] = useState(product.image);

  useEffect(() => {
    setActiveImage(product.image);
  }, [product]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col min-h-0 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-[#F8FAFC] flex-shrink-0">
          <div className="flex items-center gap-3 font-mono">
            <span className="bg-[#0B3D78] text-white text-xs font-bold px-3 py-1.5 rounded-md">
              {product.code}
            </span>
            <span className="text-xs uppercase font-extrabold text-[#0B3D78] tracking-wider">
              {product.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer border border-gray-200 shadow-xs"
            aria-label={t('pulleys.closeModal', 'Close modal')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* LEFT COLUMN: Gallery */}
            <div>
              <div
                className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-6 flex items-center justify-center h-52 sm:h-72 border border-gray-200 cursor-pointer overflow-hidden group relative"
                onClick={() => onOpenLightbox(activeImage)}
                title={t('pulleys.enlargeView', 'ENLARGE VIEW')}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 text-[11px] font-mono font-bold text-[#0B3D78] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 group-hover:bg-[#0B3D78] group-hover:text-white group-hover:scale-105 group-hover:shadow-md">
                  {t('pulleys.enlargeView', 'ENLARGE VIEW')}
                </span>
              </div>

              {/* Thumbnails */}
              {product.galleryImages && product.galleryImages.length > 1 && (
                <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                  {product.galleryImages.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgSrc)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 overflow-hidden bg-white p-1.5 transition-all cursor-pointer flex-shrink-0 ${
                        activeImage === imgSrc
                          ? 'border-[#0B3D78] ring-2 ring-[#0B3D78]/20 scale-105 shadow-sm'
                          : 'border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-400'
                      }`}
                    >
                      <img src={imgSrc} alt={`${product.name} preview ${idx + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Technical Specs & Information */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-1 tracking-tight">
                  {product.name.toUpperCase()}
                </h2>
                <div className="flex items-center gap-2 mb-4 font-mono text-xs">
                  <span className="text-[#64748B]">{t('pulleys.catalogCode', 'CATALOG CODE:')}</span>
                  <span className="font-bold text-[#0B3D78]">{product.code}</span>
                </div>

                {/* Technical Specifications Block */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xs uppercase font-mono font-extrabold tracking-wider text-[#0B3D78] mb-2.5">
                    {t('pulleys.techSpecsTitleModal', 'TECHNICAL DATASHEET SPECIFICATIONS')}
                  </h3>
                  <div className="bg-[#F8FAFC] rounded-2xl border border-gray-200 overflow-hidden font-mono">
                    <table className="w-full text-left text-sm border-collapse">
                      <tbody>
                        <tr className="border-b border-gray-200/80">
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 text-[#64748B] w-1/2">{t('pulleys.pulleyDiameter', 'Pulley Diameter')}</td>
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 font-extrabold text-[#0B3D78] text-right">{product.diameter}</td>
                        </tr>
                        <tr className="border-b border-gray-200/80">
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 text-[#64748B]">{t('pulleys.shaftDiameter', 'Shaft Diameter')}</td>
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 font-extrabold text-[#0F172A] text-right">{product.shaftDiameter}</td>
                        </tr>
                        <tr className="border-b border-gray-200/80">
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 text-[#64748B]">{t('pulleys.bearingSpec', 'Bearing Spec')}</td>
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 font-extrabold text-[#0F172A] text-right">{product.bearing}</td>
                        </tr>
                        <tr className="border-b border-gray-200/80">
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 text-[#64748B]">{t('pulleys.materialGrade', 'Material Grade')}</td>
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 font-extrabold text-[#0B3D78] text-right">{product.material}</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 text-[#64748B]">{t('pulleys.productType', 'Product Type')}</td>
                          <td className="py-2 px-3 sm:py-2.5 sm:px-4 font-extrabold text-[#0F172A] text-right">{product.productType}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-gray-200 mt-2">
                <a
                  href={`https://wa.me/905316139223?text=${encodeURIComponent(
                    `Bonjour, je souhaite commander ce produit: ${product.name} (${product.code}) - Diamètre: ${product.diameter}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-5 rounded-xl bg-[#0B3D78] text-white font-mono font-bold text-xs uppercase tracking-wider text-center shadow-lg hover:bg-[#082a54] transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('pulleys.commanderNow', 'COMMANDER NOW')}</span>
                  <ArrowRight size={14} />
                </a>
                <button
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl bg-gray-100 text-gray-700 font-mono font-bold text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {t('common.close', 'Close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   Main Editorial PulleysPage Component
   ═══════════════════════════════════════════════════════════════════════════ */
export default function PulleysPage() {
  const { t } = useTranslation();
  const products = getPulleyProducts(t);
  const [selectedProduct, setSelectedProduct] = useState<PulleyProduct | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <style>{`
        .pulleys-page {
          background: #ffffff;
          color: #0f172a;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .editorial-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 30px;
          background: #EAF2FB;
          color: #0B3D78;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid rgba(11, 61, 120, 0.18);
        }

        .pdp-badge {
          background: #FFFFFF;
          color: #0B3D78;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 30px;
          border: 1px solid rgba(11, 61, 120, 0.2);
          box-shadow: 0 4px 10px rgba(11, 61, 120, 0.05);
          letter-spacing: 0.02em;
          white-space: nowrap;
          transition: all 0.3s ease;
          cursor: default;
        }
        .pdp-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(11, 61, 120, 0.12);
          border-color: rgba(11, 61, 120, 0.4);
        }

        /* Hero Showcase Styles matching GovernorPage */
        .pdp-showcase-container {
          width: 100%;
          max-width: 600px;
          height: 600px;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          animation: pdp-float 6s ease-in-out infinite;
        }

        @keyframes pdp-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        .pdp-showcase-glow {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(11, 61, 120, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
          z-index: 1;
          pointer-events: none;
        }

        .pdp-showcase-shadow {
          position: absolute;
          bottom: 30px;
          width: 360px;
          height: 16px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0) 70%);
          z-index: 1;
          pointer-events: none;
        }

        .pdp-showcase-slide {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .pdp-showcase-img {
          width: 100%;
          max-width: 560px;
          height: auto;
          max-height: 560px;
          object-fit: contain;
          transition: transform 350ms ease-out, filter 350ms ease-out, box-shadow 350ms ease-out;
          will-change: transform, transform-origin;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .pdp-metallic-sweep {
          position: absolute;
          top: 0; left: -150%; width: 100%; height: 100%;
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0) 30%, 
            rgba(255, 255, 255, 0.45) 50%, 
            rgba(255, 255, 255, 0) 70%, 
            transparent 100%
          );
          transform: skewX(-25deg);
          pointer-events: none;
          animation: pdp-shimmer 8s infinite linear;
          z-index: 3;
        }

        @keyframes pdp-shimmer {
          0% { left: -150%; }
          12% { left: 150%; }
          100% { left: 150%; }
        }

        @media (max-width: 768px) {
          .pdp-showcase-container {
            max-width: 100%;
            height: 380px;
            margin: 0 auto;
          }
          .pdp-showcase-img {
            max-width: 320px;
            max-height: 320px;
          }
        }
        @media (max-width: 480px) {
          .pdp-showcase-container {
            height: 300px;
          }
          .pdp-showcase-img {
            max-width: 260px;
            max-height: 260px;
          }
        }

        @keyframes pdp-fu { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }
        .pdp-fu    { animation:pdp-fu .55s cubic-bezier(.16,1,.3,1) both; }
        .pdp-fu-d1 { animation-delay:.10s; }
        .pdp-fu-d2 { animation-delay:.20s; }
        .pdp-fu-d3 { animation-delay:.30s; }
        .pdp-fu-d4 { animation-delay:.42s; }

        .pulley-table {
          width: 100%;
          border-collapse: collapse;
        }

        .pulley-table th {
          background: #0B3D78;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          text-align: center;
          padding: 16px 20px;
          font-family: 'JetBrains Mono', monospace;
        }

        .pulley-table td {
          padding: 16px 20px;
          font-size: 14px;
          border-bottom: 1px solid #E2E8F0;
          border-right: 1px solid #E2E8F0;
          text-align: center;
          color: #334155;
        }

        .pulley-table td:first-child {
          text-align: left;
          font-weight: 700;
          color: #0F172A;
          background: #F8FAFC;
          font-family: 'JetBrains Mono', monospace;
        }

        .pulley-table td:last-child {
          border-right: none;
        }

        .pulley-table tr:last-child td {
          border-bottom: none;
        }

        .order-pdf-link {
          font-size: 15px;
          color: #4b5563;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s ease;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .order-pdf-link:hover {
          color: #0B3D78;
        }

        .order-download-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 18px;
          min-height: 42px;
          padding: 0 20px;
          border-radius: 8px;
          background: #0B3D78;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.02em;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .order-download-button:hover {
          background: #145DA0;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="pulleys-page relative">
        <Navbar />



        {/* ═════════════════════════════════════════════════════════════
           1. ORIGINAL HERO SECTION RESTORED (Governor Page Design System)
           ═════════════════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: '108px 5% 0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap', paddingBottom: 16 }}>
            {/* Left Column */}
            <div
              style={{
                flex: '1 1 340px',
                maxWidth: 620,
                position: 'relative',
                zIndex: 1,
                padding: '30px 0',
              }}
            >
              {/* Subtle geometric pattern background */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px', left: '-20px', right: '-40px', bottom: '-10px',
                  backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
                  backgroundSize: '24px 24px',
                  opacity: 0.35,
                  zIndex: -1,
                  borderRadius: '24px'
                }}
              />

              {/* Premium Badge Above Title */}
              <div className="pdp-fu" style={{ marginBottom: '24px', paddingLeft: 'clamp(16px, 3vw, 32px)' }}>
                <span style={{
                  background: '#E8F2FC',
                  color: '#0B3D78',
                  padding: '6px 14px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(11,61,120,0.12)',
                  display: 'inline-block'
                }}>
                  {t('pulleys.badge', 'SAFETY SENSOR')}
                </span>
              </div>

              {/* Title Container with Left Accent Line */}
              <div style={{ borderLeft: '3px solid #0B3D78', paddingLeft: 'clamp(16px, 3vw, 32px)', marginBottom: '32px' }}>
                <h1 className="pdp-fu pdp-fu-d1"
                  style={{
                    fontSize: 'clamp(28px, 5.5vw, 72px)',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    color: '#090d16',
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.025em',
                    wordBreak: 'break-word'
                  }}>
                  {t('pulleys.heroTitle', 'Pulleys')}
                </h1>

                <h2 className="pdp-fu pdp-fu-d2"
                  style={{
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: '#0F172A',
                    margin: '0 0 12px 0',
                    letterSpacing: '-0.01em'
                  }}>
                  FS-P210 • FS-P240 • FS-P320 • FS-P400
                </h2>

                <h2 className="pdp-fu pdp-fu-d2"
                  style={{
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: '#0F172A',
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                  <span style={{ position: 'relative', display: 'inline-block', paddingBottom: '4px' }}>
                    {t('pulleys.heroSubtitleHighlight', 'Cast Iron Traction Pulleys')}
                    <span style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #0B3D78 0%, #60A5FA 100%)',
                      borderRadius: '1px'
                    }} />
                  </span>
                </h2>
              </div>

              {/* Subtitle Description */}
              <p className="pdp-fu pdp-fu-d3"
                style={{
                  fontSize: '18px',
                  color: '#4B5563',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  margin: '0 0 28px 0',
                  paddingLeft: 'clamp(16px, 3vw, 32px)',
                  maxWidth: '480px'
                }}>
                {t('pulleys.heroDescription', 'Precision cast iron pulleys engineered for smooth power transmission, minimum rope wear, and exceptional durability across all elevator load capacities.')}
              </p>

              {/* Horizontal Divider */}
              <div className="pdp-fu pdp-fu-d3" style={{ height: '1px', background: '#E2E8F0', margin: '0 0 32px clamp(16px, 3vw, 32px)', width: '75%' }} />

              {/* Feature / Certification Badges */}
              <div className="pdp-fu pdp-fu-d4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingLeft: 'clamp(16px, 3vw, 32px)' }}>
                {[
                  t('pulleys.castIron', 'Cast Iron') + ' GGG-50',
                  'EN81-20/50 Certified',
                  t('pulleys.shaftDiameter', 'Shaft Diameter') + ' Options',
                  t('pulleys.badge', 'SAFETY SENSOR')
                ].map(b => (
                  <span key={b} className="pdp-badge">{b}</span>
                ))}
              </div>
            </div>

            {/* Right Column: Floating Product Showcase */}
            <div className="pdp-fu pdp-fu-d2" style={{ flex: '0 1 600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ProductShowcase />
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
           2. VERTICAL PRODUCT SHOWCASE (4 PULLEY MODELS SERIES)
           ═════════════════════════════════════════════════════════════ */}
        <div className="divide-y divide-gray-200 bg-white">
          {products.map((product, index) => {
            const numStr = `0${index + 1}`;
            const sectionId = `section-${numStr}`;

            return (
              <section
                key={product.id}
                id={sectionId}
                className="py-20 md:py-28 relative overflow-hidden scroll-mt-24 bg-white hover:bg-[#F8FAFC]/50 transition-colors duration-500"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Top Editorial Index Bar */}
                  <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-12 font-mono">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl sm:text-7xl font-black text-[#0B3D78]/20 select-none">
                        {numStr}
                      </span>
                      <span className="text-xs uppercase tracking-widest font-bold text-[#0B3D78] bg-[#EAF2FB] px-3.5 py-1.5 rounded-lg border border-[#0B3D78]/15">
                        {t('pulleys.seriesModel', 'SERIES MODEL')} {numStr} / 04
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-[#64748B] tracking-wider uppercase block">{t('pulleys.catalogCodeLabel', 'CATALOG CODE')}</span>
                      <span className="text-base sm:text-xl font-bold text-[#0F172A]">{product.code}</span>
                    </div>
                  </div>

                  {/* Section Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column (5 cols): Editorial Titles, Specifications & CTAs */}
                    <div className="lg:col-span-5 space-y-6">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#0B3D78] uppercase tracking-widest block mb-2">
                          {t('pulleys.categoryTag', 'CAST IRON • V-BELT PULLEY')}
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight leading-none mb-4">
                          {product.name.toUpperCase()}
                        </h2>
                        <p className="text-sm text-[#475569] leading-relaxed max-w-md">
                          {product.description}
                        </p>
                      </div>

                      {/* Technical Spec List */}
                      <div className="py-6 border-y border-gray-200 space-y-3.5 font-mono">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#64748B] text-xs font-bold uppercase">{t('pulleys.pulleyDiameterLabel', 'PULLEY DIAMETER (Ø)')}</span>
                          <span className="font-extrabold text-[#0B3D78] text-base">{product.diameter}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#64748B] text-xs font-bold uppercase">{t('pulleys.shaftBoreDiaLabel', 'SHAFT BORE DIA.')}</span>
                          <span className="font-extrabold text-[#0F172A]">{product.shaftDiameter}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#64748B] text-xs font-bold uppercase">{t('pulleys.bearingSpecLabel', 'BEARING SPEC.')}</span>
                          <span className="font-extrabold text-[#0F172A]">{product.bearing}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#64748B] text-xs font-bold uppercase">{t('pulleys.materialGradeLabel', 'MATERIAL GRADE')}</span>
                          <span className="font-bold text-gray-700">{product.material}</span>
                        </div>
                      </div>

                      {/* CTA Action Link */}
                      <div className="pt-2 flex justify-center items-center gap-4">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-6 py-3.5 bg-[#0B3D78] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#082a54] transition-all flex items-center gap-3 shadow-md cursor-pointer"
                        >
                          <span>{t('pulleys.viewTechnicalDetails', 'VIEW TECHNICAL DETAILS')}</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Right Column (7 cols): Large Hero Product Image & Integrated Drawings */}
                    <div className="lg:col-span-7">
                      <div className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-8 relative overflow-hidden group">
                        {/* Subtle Grid Watermark */}
                        <div
                          className="absolute inset-0 pointer-events-none opacity-20"
                          style={{
                            backgroundImage: 'radial-gradient(#0B3D78 0.75px, transparent 0.75px)',
                            backgroundSize: '20px 20px',
                          }}
                        />

                        {/* Large Watermark Number */}
                        <div className="absolute top-4 right-6 text-gray-200/50 font-mono text-8xl font-black select-none pointer-events-none">
                          {product.diameter.replace(' mm', '')}
                        </div>

                        {/* Product Image */}
                        <div
                          className="relative z-10 h-80 sm:h-[400px] flex items-center justify-center cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain filter drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        {/* Technical Blueprint Integration Banner */}
                        {product.blueprintImage && (
                          <div className="relative z-10 mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-gray-200 gap-4">
                            <div className="flex items-center gap-4">
                              <div
                                className="w-20 h-16 bg-[#F8FAFC] border border-gray-200 rounded-xl p-1 flex items-center justify-center cursor-pointer overflow-hidden group/dwg flex-shrink-0"
                                onClick={() => setLightboxSrc(product.blueprintImage!)}
                              >
                                <img
                                  src={product.blueprintImage}
                                  alt="Technical schematic"
                                  className="max-h-full max-w-full object-contain group-hover/dwg:scale-110 transition-transform"
                                />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono font-bold uppercase text-[#0B3D78] block">
                                  {t('pulleys.engineeringSchematic', 'ENGINEERING SCHEMATIC')}
                                </span>
                                <span className="text-xs font-semibold text-[#0F172A]">
                                  {product.name} {t('pulleys.technicalDrawing', 'Technical Drawing')}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => setLightboxSrc(product.blueprintImage!)}
                              className="text-xs font-mono font-bold text-[#0B3D78] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>{t('pulleys.enlargeSchematic', 'Enlarge Schematic')}</span>
                              <ArrowRight size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* ═════════════════════════════════════════════════════════════
           3. TECHNICAL SPECIFICATIONS COMPARISON TABLE DATASHEET
           ═════════════════════════════════════════════════════════════ */}
        <section id="specs" className="py-20 md:py-28 bg-[#F8FAFC] border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="editorial-badge mb-3">
                <FileText size={14} />
                <span>{t('pulleys.engineeringDatasheet', 'ENGINEERING DATASHEET')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {t('pulleys.compareSpecsTitle', 'COMPARE PULLEY MODEL SPECIFICATIONS')}
              </h2>
              <p className="text-sm text-[#64748B] mt-2">
                {t('pulleys.compareSpecsSubtitle', 'Side-by-side technical parameters for the complete FS-P pulley series.')}
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="pulley-table min-w-[700px]">
                  <thead>
                    <tr>
                      <th className="w-56 text-left">{t('pulleys.specParameter', 'Specification Parameter')}</th>
                      {products.map((p) => (
                        <th key={p.id}>
                          <div className="font-extrabold text-lg text-white">{p.diameter}</div>
                          <div className="font-mono text-xs opacity-80">{p.code}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{t('pulleys.catalogCodeTable', 'Catalog Code')}</td>
                      {products.map((p) => (
                        <td key={p.id} className="font-mono font-bold text-[#0B3D78]">
                          {p.code}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{t('pulleys.pulleyDiameterTable', 'Pulley Diameter (Ø)')}</td>
                      {products.map((p) => (
                        <td key={p.id} className="font-mono font-bold text-[#0F172A]">
                          {p.diameter}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{t('pulleys.shaftBoreDiameterTable', 'Shaft Bore Diameter')}</td>
                      {products.map((p) => (
                        <td key={p.id} className="font-mono font-semibold">
                          {p.shaftDiameter}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{t('pulleys.bearingIntegrationTable', 'Bearing Integration')}</td>
                      {products.map((p) => (
                        <td key={p.id} className="font-mono font-semibold">
                          {p.bearing}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{t('pulleys.materialConstructionTable', 'Material Construction')}</td>
                      {products.map((p) => (
                        <td key={p.id} className="font-semibold text-gray-700">
                          {p.material}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>{t('pulleys.productTypeTable', 'Product Type')}</td>
                      {products.map((p) => (
                        <td key={p.id} className="text-xs font-semibold text-[#0B3D78]">
                          {p.productType}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>



        {/* ═════════════════════════════════════════════════════════════
           5. ORDER FORM DOWNLOAD SECTION
           ═════════════════════════════════════════════════════════════ */}
        <section
          style={{
            background: '#ffffff',
            padding: '64px 5% 72px',
            textAlign: 'center',
            borderTop: '1px solid #e5e9f0',
            borderBottom: '1px solid #e5e9f0',
          }}
        >
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 400,
                color: '#111827',
                lineHeight: 1.3,
                marginBottom: 28,
                fontFamily: "'Georgia', 'Times New Roman', serif",
                letterSpacing: '0.01em',
              }}
            >
              {t('governor.orderFormTitle', 'FAS LIFT Speed Governor Order Form')}
            </h2>

            {/* PDF Icon + Filename link — matches reference screenshot */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#374151"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginTop: 1 }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="12" y2="17" />
              </svg>

              <a
                href="/documents/FAS_LIFT_Overspeed_Governor_Order_Form.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="order-pdf-link"
                title={t('governor.orderFormTooltip', 'Open the speed governor order form PDF')}
              >
                {t('governor.orderFormFileLabel', 'Speed_Governor_Order_Form.pdf')}
              </a>
            </div>

            <div>
              <a
                href="/documents/FAS_LIFT_Overspeed_Governor_Order_Form.pdf"
                download
                className="order-download-button"
                title={t('governor.orderFormDownload', 'Download the FAS LIFT speed governor order form')}
              >
                {t('governor.orderFormButton', 'Download Order Form')}
              </a>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
           5. PRODUCT DETAIL MODAL
           ═════════════════════════════════════════════════════════════ */}
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onOpenLightbox={(src) => setLightboxSrc(src)}
          />
        )}

        {/* Lightbox for full size view */}
        <Lightbox
          src={lightboxSrc || ''}
          alt={selectedProduct?.name || 'Pulley detail image'}
          isOpen={lightboxSrc !== null}
          onClose={() => setLightboxSrc(null)}
          background="rgba(11, 61, 120, 0.95)"
        />

        <FloatingToolbar />
        <WhatsAppButton />
        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
