import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';

export default function ContactPage() {
  return (
    <div className="font-['Inter',sans-serif] bg-[#F5F7FA] min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="pt-[72px] md:pt-[80px] pb-0 relative z-20">
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />
    </div>
  );
}
