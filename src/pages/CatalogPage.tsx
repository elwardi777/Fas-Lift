import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { CATALOG_PDF_URL, CATALOG_PDF_FILENAME } from '../constants/catalog';

export default function CatalogPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    setIsMobile(checkMobile);
  }, []);

  const triggerMobileDownload = async () => {
    try {
      const response = await fetch(CATALOG_PDF_URL);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = CATALOG_PDF_FILENAME;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download catalog", error);
      // Fallback: open in new window/tab if blob fetch fails
      window.open(CATALOG_PDF_URL, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1E2530] text-white overflow-hidden font-sans">
      {/* Premium Top Bar */}
      <header className="h-16 bg-[#0B3D78] flex items-center justify-between px-4 sm:px-6 shadow-[0_4px_20px_rgba(11,61,120,0.15)] z-25 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display font-bold text-sm sm:text-base tracking-wide uppercase">
              {t('catalog.name')}
            </h1>
            <p className="text-[10px] text-white/50 font-mono tracking-widest uppercase">
              Document Viewer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Open full screen / new window button */}
          <a
            href={CATALOG_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#082d5a] hover:bg-[#0B3D78] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors border border-white/10"
          >
            <ExternalLink size={14} />
            Full Screen
          </a>
          
          {/* Download button */}
          <a
            href={CATALOG_PDF_URL}
            download={CATALOG_PDF_FILENAME}
            onClick={(e) => {
              if (isMobile) {
                e.preventDefault();
                triggerMobileDownload();
              }
            }}
            className="flex items-center gap-2 bg-white text-[#0B3D78] hover:bg-white/90 text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Download size={14} />
            {t('catalog.download')}
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative bg-[#525659] flex items-center justify-center p-4">
        {isMobile ? (
          <div className="flex flex-col items-center text-center max-w-sm w-full bg-[#1E2530]/80 p-8 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl">
            <img
              src="/images/catalog-cover.png"
              alt="Catalog Cover"
              className="w-36 h-auto rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.3)] mb-6 border border-white/5"
            />
            <h2 className="text-xl font-bold mb-3">{t('catalog.name')}</h2>
            <p className="text-sm text-white/60 mb-8 leading-relaxed max-w-[280px]">
              {t('catalog.description')}
            </p>
            <div className="flex flex-col gap-3 w-full">
              <a
                href={CATALOG_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#0B3D78] hover:bg-[#0B3D78]/90 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink size={14} />
                Open PDF
              </a>
              <button
                onClick={triggerMobileDownload}
                className="w-full py-3.5 bg-white text-[#0B3D78] hover:bg-white/95 rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download size={14} />
                {t('catalog.downloadText')}
              </button>
            </div>
          </div>
        ) : (
          <iframe
            src={CATALOG_PDF_URL}
            title={t('catalog.title')}
            className="w-full h-full border-0"
          />
        )}
      </div>
    </div>
  );
}
