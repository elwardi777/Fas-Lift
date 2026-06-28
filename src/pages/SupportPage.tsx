import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase, Wrench, ShieldCheck, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';

type SupportType = 'Commercial Support' | 'Technical Support' | 'Post Sale Support';

export default function SupportPage() {
  const { t } = useTranslation();

  // Selected support type state for dynamic form heading
  const [selectedType, setSelectedType] = useState<SupportType>('Commercial Support');
  const [showForm, setShowForm] = useState(false);

  // Support Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requestedInfo: '',
    text: '',
    consent1: false,
    consent2: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Newsletter State
  const [newsEmail, setNewsEmail] = useState('');
  const [newsConsent, setNewsConsent] = useState(false);
  const [newsError, setNewsError] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  const formSectionRef = useRef<HTMLDivElement>(null);

  // Handle scrolling to form and updating title
  const handleCardClick = (type: SupportType) => {
    setSelectedType(type);
    setShowForm(true);
    setTimeout(() => {
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  // Form Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = t('supportNew.requiredError');
    if (!formData.company.trim()) newErrors.company = t('supportNew.requiredError');

    if (!formData.email.trim()) {
      newErrors.email = t('supportNew.requiredError');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('supportNew.emailError');
    }

    if (!formData.requestedInfo) newErrors.requestedInfo = t('supportNew.requiredError');
    if (!formData.text.trim()) newErrors.text = t('supportNew.requiredError');

    if (!formData.consent1) newErrors.consent1 = t('supportNew.consentError');
    if (!formData.consent2) newErrors.consent2 = t('supportNew.consentError');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Open mailto link pre-filled
    const subject = `FAS LIFT Support Request - ${selectedType}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nRequested Information: ${formData.requestedInfo}\n\nMessage:\n${formData.text}`;
    window.location.href = `mailto:faslift@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setFormSubmitted(true);
  };

  // Handle Newsletter Submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsError('');
    if (!newsEmail.trim()) {
      setNewsError(t('supportNew.requiredError'));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(newsEmail)) {
      setNewsError(t('supportNew.emailError'));
      return;
    }
    if (!newsConsent) {
      setNewsError(t('supportNew.consentError'));
      return;
    }

    // Open mailto link pre-filled
    const subject = `FAS LIFT Newsletter Subscription`;
    const body = `I would like to subscribe to the FasLift newsletter.\n\nEmail: ${newsEmail}`;
    window.location.href = `mailto:faslift@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setNewsSuccess(true);
    setNewsEmail('');
    setNewsConsent(false);
    setTimeout(() => setNewsSuccess(false), 5000);
  };

  const getFormTitle = () => {
    switch (selectedType) {
      case 'Commercial Support':
        return t('supportNew.commercialTitle');
      case 'Technical Support':
        return t('supportNew.techTitle');
      case 'Post Sale Support':
        return t('supportNew.postSaleTitle');
      default:
        return t('supportNew.commercialTitle');
    }
  };

  return (
    <div className="font-sans bg-white min-h-screen overflow-x-hidden text-[#4a5568]">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-white pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/Gemini_Generated_Image_ybxbbnybxbbnybxb.png"
            alt="FasLift Support Background"
            className="h-full w-full object-cover object-center"
          />
          {/* Subtle grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0B3D78" strokeWidth="1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Gradient overlay to guarantee text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-transparent" />
        </div>

        {/* Decorative gold/navy technical sketch line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A843]/30 to-transparent z-10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-[#0B3D78] uppercase leading-tight tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)' }}
          >
            {t('support.heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-base md:text-lg text-[#0B3D78]/80 leading-relaxed font-normal"
          >
            {t('support.heroSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 2: TALK TO SOMEONE CARD ── */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F7FA] relative z-20 flex flex-col items-center text-center">
        {/* Card Wrapper */}
        <div className="relative w-full max-w-3xl mx-auto bg-white rounded-[24px] border border-[#0d2b5e]/5 px-8 pt-28 pb-12 md:px-12 md:pt-36 md:pb-16 shadow-[0_15px_45px_rgba(0,0,0,0.08)]">
          
          {/* Layered 3D Support Badge - Overlapping the top border */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-60 md:h-60 flex items-center justify-center">
            {/* White Circular Background (Smaller than the gear) */}
            <div className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-white shadow-[0_8px_25px_rgba(11,61,120,0.06)] border border-[#0d2b5e]/5 z-0" />
            
            {/* Gear Support Image - Extending beyond the white circle with floating shadow */}
            <div className="relative z-10 w-44 h-44 md:w-56 md:h-56 drop-shadow-[0_15px_30px_rgba(11,61,120,0.22)] flex items-center justify-center">
              <img
                src="/images/Gemini_Generated_Image_7u29fv7u29fv7u29-removebg-preview.png?v=5"
                alt="Support Agent"
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          </div>

          <h2 className="font-display font-bold text-[28px] md:text-[32px] text-[#0d2b5e] leading-tight mb-3">
            {t('supportNew.talkTitle')}
          </h2>

          <p className="text-[15px] md:text-[16px] text-[#4a5568]/80 max-w-lg mx-auto mb-6 leading-relaxed">
            {t('supportNew.talkSubtitle')}
          </p>

          <a
            href="tel:+212653660399"
            className="text-[24px] md:text-[28px] font-extrabold text-[#1a4a8a] hover:text-[#0d2b5e] transition-colors mb-6 block cursor-pointer"
          >
            +212 653-660399
          </a>

          {/* WhatsApp Pill */}
          <div className="flex justify-center">
            <a
              href="https://wa.me/212653660399"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 bg-[#25d366] text-white rounded-full font-semibold text-[14px] transition-all duration-300 hover:bg-[#20ba5a] hover:scale-105 cursor-pointer shadow-[0_8px_20px_rgba(37,211,102,0.25)]"
            >
              {/* WhatsApp Icon SVG */}
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: SUPPORT TYPE CARDS ── */}
      <section className="relative py-20 px-6 md:px-12 bg-[#0B3D78] overflow-hidden">
        {/* Diagonal hatch pattern overlay */}
        <div className="absolute inset-0 hatch-pattern pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Commercial Support */}
            <div className="bg-white rounded-[24px] border border-[#0d2b5e]/5 p-8 flex flex-col items-center text-center transition-all duration-300 ease-out hover:-translate-y-[6px] shadow-[0_15px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <div className="w-16 h-16 rounded-full bg-[#e6f0fb] flex items-center justify-center text-[#0d2b5e] mb-6">
                <Briefcase size={26} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0d2b5e] mb-3">
                {t('supportNew.commercialTitle')}
              </h3>
              <p className="text-[14px] text-[#4a5568] leading-relaxed mb-8 flex-grow">
                {t('supportNew.commercialDesc')}
              </p>
              <button
                onClick={() => handleCardClick('Commercial Support')}
                className="w-full py-3 bg-[#0d2b5e] text-white rounded-lg font-semibold text-[14px] transition-colors duration-200 hover:bg-[#1a4a8a] cursor-pointer"
              >
                {t('supportNew.contactUs')}
              </button>
            </div>

            {/* Card 2: Technical Support */}
            <div className="bg-white rounded-[24px] border border-[#0d2b5e]/5 p-8 flex flex-col items-center text-center transition-all duration-300 ease-out hover:-translate-y-[6px] shadow-[0_15px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <div className="w-16 h-16 rounded-full bg-[#e6f0fb] flex items-center justify-center text-[#0d2b5e] mb-6">
                <Wrench size={26} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0d2b5e] mb-3">
                {t('supportNew.techTitle')}
              </h3>
              <p className="text-[14px] text-[#4a5568] leading-relaxed mb-8 flex-grow">
                {t('supportNew.techDesc')}
              </p>
              <button
                onClick={() => handleCardClick('Technical Support')}
                className="w-full py-3 border border-[#0d2b5e] text-[#0d2b5e] rounded-lg font-semibold text-[14px] transition-colors duration-200 hover:bg-[#e6f0fb] cursor-pointer"
              >
                {t('supportNew.request')}
              </button>
            </div>

            {/* Card 3: Post Sale Support */}
            <div className="bg-white rounded-[24px] border border-[#0d2b5e]/5 p-8 flex flex-col items-center text-center transition-all duration-300 ease-out hover:-translate-y-[6px] shadow-[0_15px_45px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
              <div className="w-16 h-16 rounded-full bg-[#e6f0fb] flex items-center justify-center text-[#0d2b5e] mb-6">
                <ShieldCheck size={26} />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0d2b5e] mb-3">
                {t('supportNew.postSaleTitle')}
              </h3>
              <p className="text-[14px] text-[#4a5568] leading-relaxed mb-8 flex-grow">
                {t('supportNew.postSaleDesc')}
              </p>
              <button
                onClick={() => handleCardClick('Post Sale Support')}
                className="w-full py-3 border border-[#0d2b5e] text-[#0d2b5e] rounded-lg font-semibold text-[14px] transition-colors duration-200 hover:bg-[#e6f0fb] cursor-pointer"
              >
                {t('supportNew.request')}
              </button>
            </div>
          </div>
        </div>
      </section>

    
      {/* ── SECTION 3: COMMERCIAL SUPPORT FORM ── */}
      <AnimatePresence initial={false}>
        {showForm && (
          <motion.section
            id="support-form-section"
            ref={formSectionRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="relative overflow-hidden bg-[#0B3D78]"
          >
            {/* Diagonal hatch pattern overlay */}
            <div className="absolute inset-0 hatch-pattern pointer-events-none" />
            
            <div className="relative z-10 py-24 px-6 md:px-12">
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-[24px] border border-[#0d2b5e]/5 p-8 md:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.08)]">
                  <AnimatePresence mode="wait">
                    {!formSubmitted ? (
                      <motion.div
                        key="form-container"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-center mb-8">
                          <h2 className="font-display font-bold text-2xl text-[#0d2b5e] uppercase tracking-wide">
                            {getFormTitle()}
                          </h2>
                          <p className="text-sm text-[#4a5568] mt-2">
                            {t('supportNew.formSubtitle')}
                          </p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                          {/* Two-column grid for Name + Email */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                                {t('supportNew.formName')} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => {
                                  setFormData({ ...formData, name: e.target.value });
                                  if (errors.name) setErrors({ ...errors, name: '' });
                                }}
                                className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors bg-white ${
                                  errors.name ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                                }`}
                              />
                              {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                                {t('supportNew.formEmail')} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.email}
                                onChange={(e) => {
                                  setFormData({ ...formData, email: e.target.value });
                                  if (errors.email) setErrors({ ...errors, email: '' });
                                }}
                                className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors bg-white ${
                                  errors.email ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                                }`}
                              />
                              {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                              )}
                            </div>
                          </div>

                          {/* Two-column grid for Company + Requested Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                                {t('supportNew.formCompany')} <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => {
                                  setFormData({ ...formData, company: e.target.value });
                                  if (errors.company) setErrors({ ...errors, company: '' });
                                }}
                                className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors bg-white ${
                                  errors.company ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                                }`}
                              />
                              {errors.company && (
                                <p className="text-red-500 text-xs mt-1">{errors.company}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                                {t('supportNew.formReqInfo')} <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={formData.requestedInfo}
                                onChange={(e) => {
                                  setFormData({ ...formData, requestedInfo: e.target.value });
                                  if (errors.requestedInfo) setErrors({ ...errors, requestedInfo: '' });
                                }}
                                className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors bg-white appearance-none ${
                                  errors.requestedInfo ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                                }`}
                              >
                                <option value="">-- Choose option --</option>
                                <option value="Price">{t('supportNew.optPrice')}</option>
                                <option value="Technical specs">{t('supportNew.optTechSpecs')}</option>
                                <option value="Spare parts">{t('supportNew.optSpareParts')}</option>
                                <option value="Installation">{t('supportNew.optInstallation')}</option>
                                <option value="Other">{t('supportNew.optOther')}</option>
                              </select>
                              {errors.requestedInfo && (
                                <p className="text-red-500 text-xs mt-1">{errors.requestedInfo}</p>
                              )}
                            </div>
                          </div>

                          {/* Text message */}
                          <div>
                            <label className="block text-xs font-semibold text-[#0d2b5e] uppercase tracking-wider mb-2">
                              {t('supportNew.formText')} <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={5}
                              placeholder={t('supportNew.formTextPlaceholder')}
                              value={formData.text}
                              onChange={(e) => {
                                  setFormData({ ...formData, text: e.target.value });
                                  if (errors.text) setErrors({ ...errors, text: '' });
                              }}
                              className={`w-full border rounded-lg px-4 py-3 text-[14px] outline-none transition-colors resize-none bg-white ${
                                errors.text ? 'border-red-500' : 'border-[#0d2b5e]/20 focus:border-[#1a4a8a]'
                              }`}
                            />
                            {errors.text && (
                              <p className="text-red-500 text-xs mt-1">{errors.text}</p>
                            )}
                          </div>

                          {/* Consent 1 */}
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id="consent1"
                              checked={formData.consent1}
                              onChange={(e) => {
                                setFormData({ ...formData, consent1: e.target.checked });
                                if (errors.consent1) setErrors({ ...errors, consent1: '' });
                              }}
                              className="mt-1 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="consent1" className="text-xs text-[#4a5568] leading-relaxed cursor-pointer select-none">
                              {t('supportNew.gdpr1')}{' '}
                              <a href="/privacy-policy" className="text-[#1a4a8a] font-semibold hover:underline">
                                Privacy Policy
                              </a>
                            </label>
                          </div>
                          {errors.consent1 && (
                            <p className="text-red-500 text-[11px] -mt-1 ml-7">{errors.consent1}</p>
                          )}

                          {/* Consent 2 */}
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id="consent2"
                              checked={formData.consent2}
                              onChange={(e) => {
                                setFormData({ ...formData, consent2: e.target.checked });
                                if (errors.consent2) setErrors({ ...errors, consent2: '' });
                              }}
                              className="mt-1 w-4 h-4 cursor-pointer"
                            />
                            <label htmlFor="consent2" className="text-xs text-[#4a5568] leading-relaxed cursor-pointer select-none">
                              {t('supportNew.gdpr2')}
                            </label>
                          </div>
                          {errors.consent2 && (
                            <p className="text-red-500 text-[11px] -mt-1 ml-7">{errors.consent2}</p>
                          )}

                          {/* Submit Button */}
                          <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-[#0d2b5e] text-white rounded-lg font-semibold text-[14px] uppercase tracking-wider transition-colors duration-200 hover:bg-[#1a4a8a] cursor-pointer"
                          >
                            {t('supportNew.submit')}
                          </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success-container"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-12 flex flex-col items-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-[#e6f0fb] text-[#1a4a8a] flex items-center justify-center mb-6">
                          <Check size={32} />
                        </div>
                        <h3 className="font-display font-bold text-2xl text-[#0d2b5e] mb-4">
                          Request Ready!
                        </h3>
                        <p className="text-[15px] text-[#4a5568] max-w-md leading-relaxed mb-8">
                          {t('supportNew.successMsg')}
                        </p>
                        <button
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormData({
                              name: '',
                              email: '',
                              company: '',
                              requestedInfo: '',
                              text: '',
                              consent1: false,
                              consent2: false,
                            });
                          }}
                          className="px-6 py-3 border border-[#0d2b5e] text-[#0d2b5e] rounded-lg font-semibold text-[14px] uppercase tracking-wider transition-colors hover:bg-[#e6f0fb] cursor-pointer"
                        >
                          Send another request
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── SECTION 4: NEWSLETTER ── */}
      <section className="overflow-x-hidden py-24 px-6 md:px-12 bg-[#f4f7fb]">
        <div className="w-full max-w-xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-display font-bold text-3xl text-[#0d2b5e] mb-3">
            {t('supportNew.newsletterTitle')}
          </h2>
          <p className="text-[15px] text-[#4a5568] mb-8 max-w-sm">
            {t('supportNew.newsletterSubtitle')}
          </p>

          <form onSubmit={handleNewsletterSubmit} className="w-full max-w-full mb-4">
            <div className="flex w-full min-w-0 flex-col sm:flex-row items-stretch rounded-[28px] sm:rounded-full border-2 border-[#1a4a8a] overflow-hidden bg-white">
              <input
                type="text"
                placeholder={t('supportNew.newsletterPlaceholder')}
                value={newsEmail}
                onChange={(e) => {
                  setNewsEmail(e.target.value);
                  if (newsError) setNewsError('');
                }}
                className="w-full min-w-0 flex-1 px-5 py-4 text-[14px] outline-none bg-white"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-[#0d2b5e] text-white font-bold text-[14px] hover:bg-[#1a4a8a] transition-colors duration-200 cursor-pointer sm:shrink-0"
              >
                {t('supportNew.subscribe')}
              </button>
            </div>

            {/* Error Message */}
            {newsError && (
              <p className="text-red-500 text-xs text-left px-4 mt-1">{newsError}</p>
            )}

            {/* Success Message */}
            {newsSuccess && (
              <p className="text-[#1a4a8a] text-xs font-semibold text-left px-4 mt-1">
                {t('supportNew.newsSuccess')}
              </p>
            )}
          </form>

          {/* Privacy Consent Checkbox */}
          <div className="flex items-start gap-2 text-left">
            <input
              type="checkbox"
              id="newsConsent"
              checked={newsConsent}
              onChange={(e) => {
                setNewsConsent(e.target.checked);
                if (newsError) setNewsError('');
              }}
              className="mt-1 w-3.5 h-3.5 cursor-pointer"
            />
            <label htmlFor="newsConsent" className="text-[11px] text-[#4a5568] leading-relaxed cursor-pointer select-none">
              {t('supportNew.newsGdpr')}{' '}
              <a href="/privacy-policy" className="text-[#1a4a8a] hover:underline">
                privacy policy
              </a>.
            </label>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: FOOTER ── */}
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />
    </div>
  );
}
