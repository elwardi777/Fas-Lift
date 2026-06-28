import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import CatalogPage from './pages/CatalogPage'
import ContactPage from './pages/ContactPage'
import SupportPage from './pages/SupportPage'
import ProductionPage from './pages/ProductionPage'
import GalleryPage from './pages/GalleryPage'
import GovernorPage from './pages/GovernorPage'
import OrderFormPage from './pages/OrderFormPage'

const ROUTE_MAP: Record<string, React.ComponentType> = {
  '/': LandingPage,
  '/about': AboutPage,
  '/catalog': CatalogPage,
  '/media/e-catalog': CatalogPage,
  '/corporate/contact': ContactPage,
  '/support': SupportPage,
  '/corporate/production': ProductionPage,
  '/media/gallery': GalleryPage,
  '/products/overspeed-governor': GovernorPage,
  '/products/speed-governors': GovernorPage,
  '/products/safety-gears': GovernorPage,
  '/order-form': OrderFormPage,
};

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const scrollPositions = useRef<Record<string, number>>({});
  const prevPathRef = useRef(location.pathname);

  // Sync HTML language attributes and text direction
  useEffect(() => {
    const currentLang = i18n.language || 'en';
    const isRtl = i18n.dir(currentLang) === 'rtl';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  // Sync localized SEO metadata dynamically
  useEffect(() => {
    let seoKey = 'home';
    const path = location.pathname;
    if (path === '/about') seoKey = 'about';
    else if (path === '/catalog' || path === '/media/e-catalog') seoKey = 'catalog';
    else if (path === '/corporate/contact') seoKey = 'contact';
    else if (path === '/support') seoKey = 'support';
    else if (path === '/corporate/production') seoKey = 'production';
    else if (path === '/media/gallery') seoKey = 'gallery';
    else if (path.startsWith('/products/')) seoKey = 'governor';
    else if (path === '/order-form') seoKey = 'orderForm';
    else if (!ROUTE_MAP[path]) seoKey = 'pageNotFound';

    const title = t(`seo.${seoKey}.title`);
    const description = t(`seo.${seoKey}.description`);

    // 1. Set document title
    document.title = title;

    // 2. Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Set Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', description);

    // 4. Set Canonical link tag
    const baseUrl = 'https://www.faslift.com';
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${baseUrl}${path}`);

    // 5. Set alternate hreflang tags for en, fr, tr
    const langs = ['en', 'fr', 'tr'];
    // Remove existing hreflang alternates to prevent duplication
    document.querySelectorAll('link[rel="alternate"]').forEach(el => el.remove());

    langs.forEach(lang => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang);
      link.setAttribute('href', `${baseUrl}${path}?lng=${lang}`);
      document.head.appendChild(link);
    });

    // Add x-default hreflang pointing to English version
    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', `${baseUrl}${path}`);
    document.head.appendChild(xDefault);

  }, [location.pathname, i18n.language, t]);

  // Save scroll position whenever the path changes (before leaving)
  useEffect(() => {
    const prev = prevPathRef.current;

    return () => {
      scrollPositions.current[prev] = window.scrollY;
    };
  }, [location.pathname]);

  // On route change: save old position, restore new one, update ref
  useEffect(() => {
    const prev = prevPathRef.current;
    scrollPositions.current[prev] = window.scrollY;
    prevPathRef.current = location.pathname;

    // Scroll to saved position (or top) after a tiny delay so the new page renders first
    const saved = scrollPositions.current[location.pathname] ?? 0;
    const timer = setTimeout(() => {
      window.scrollTo({ top: saved, behavior: 'auto' });
    }, 20);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const Component = ROUTE_MAP[location.pathname];

  if (!Component) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-gray-500 font-medium">
        {t('nav.pageNotFound')}
      </div>
    );
  }

  return <Component key={location.pathname} />;
}

export default App;
