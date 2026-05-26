import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import CatalogPage from './pages/CatalogPage'
import ContactPage from './pages/ContactPage'
import SupportPage from './pages/SupportPage'
import ProductionPage from './pages/ProductionPage'
import GalleryPage from './pages/GalleryPage'
import GovernorPage from './pages/GovernorPage'

function ScrollToTopOnNavigation() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTopOnNavigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/media/e-catalog" element={<CatalogPage />} />
        <Route path="/corporate/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/corporate/production" element={<ProductionPage />} />
        <Route path="/media/gallery" element={<GalleryPage />} />
        <Route path="/products/overspeed-governor" element={<GovernorPage />} />
        <Route path="/products/speed-governors"    element={<GovernorPage />} />
        <Route path="/products/safety-gears"       element={<GovernorPage />} />
      </Routes>
    </>
  )
}

export default App
