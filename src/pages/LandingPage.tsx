import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProductFamilySection from '../components/ProductFamilySection'
import PrecisionManufacturingSection from '../components/PrecisionManufacturingSection'
import StatsCounter from '../components/StatsCounter'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import FloatingToolbar from '../components/FloatingToolbar'
import ScrollToTop from '../components/ScrollToTop'

export default function LandingPage() {
  return (
    <div className="relative w-full max-w-full overflow-x-hidden">
      {/* Fixed UI Elements */}
      <Navbar />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />

      {/* Page Sections */}
      <main className="w-full max-w-full overflow-x-hidden">
        {/* Hero + Floating Cards Block — Cards bridge Hero & section below */}
        <div className="relative">
          <section id="hero">
            <Hero />
          </section>

          <section id="products" className="relative z-30">
            <ProductFamilySection />
          </section>
        </div>

        <section id="precision">
          <PrecisionManufacturingSection />
        </section>

        <section id="stats">
          <StatsCounter />
        </section>





        <section id="contact">

        </section>
      </main>

      <Footer />
    </div>
  )
}
