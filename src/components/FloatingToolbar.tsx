import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Phone } from 'lucide-react';
import { CATALOG_PAGE_PATH } from '../constants/catalog';

const FloatingToolbar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[998] flex flex-col items-center gap-1 bg-white rounded-2xl p-2 border border-[#0B3D78]/20 shadow-[0_4px_20px_rgba(11,61,120,0.18)]"
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link
        to={CATALOG_PAGE_PATH}
        className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0B3D78] hover:text-white hover:bg-[#0B3D78] transition-colors duration-200"
        aria-label={t('toolbar.catalog')}
        title={t('toolbar.catalog')}
      >
        <FileText size={20} />
      </Link>

      <a
        href="tel:+905316139223"
        className="w-10 h-10 rounded-xl flex items-center justify-center text-[#0B3D78] hover:text-white hover:bg-[#0B3D78] transition-colors duration-200"
        aria-label={t('toolbar.call')}
        title={t('toolbar.call')}
      >
        <Phone size={20} />
      </a>
    </motion.div>
  );
};

export default FloatingToolbar;
