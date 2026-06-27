import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
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
  const location = useLocation();
  const scrollPositions = useRef<Record<string, number>>({});
  const prevPathRef = useRef(location.pathname);

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
        404 - Page Not Found
      </div>
    );
  }

  return <Component key={location.pathname} />;
}

export default App;
