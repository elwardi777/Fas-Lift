import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MessageCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const SectionHeading: React.FC<{ children: string; dark?: boolean }> = ({
  children,
  dark = false,
}) => (
  <div className="flex items-center gap-4 mb-10 md:mb-12">
    <div className={`w-8 h-[2px] ${dark ? 'bg-[#0B3D78]/30' : 'bg-white/30'}`} />
    <span
      className={`font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] uppercase ${
        dark ? 'text-[#0B3D78]/50' : 'text-white/50'
      }`}
    >
      {children}
    </span>
    <div
      className={`flex-1 h-[0.5px] ${
        dark ? 'bg-[#0B3D78]/[0.06]' : 'bg-white/[0.06]'
      }`}
    />
  </div>
);

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const messageText = `Hello, my name is ${formData.name}.\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/212653660399?text=${encodeURIComponent(messageText)}`;
    
    window.open(whatsappUrl, '_blank');
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative bg-[#F5F7FA] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          {/* Left — Form */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading dark>{t('contact.heading')}</SectionHeading>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] uppercase text-[#0B3D78]/50 mb-2"
                >
                  {t('contact.nameLabel')}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.namePlaceholder')}
                  className="w-full bg-white border border-[#0B3D78]/10 rounded-lg px-[18px] py-[14px] text-[#0B3D78] text-[15px] font-['Inter',sans-serif] outline-none focus:border-[#0B3D78]/30 transition-colors placeholder:text-[#0B3D78]/30"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] uppercase text-[#0B3D78]/50 mb-2"
                >
                  {t('contact.emailLabel')}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.emailPlaceholder')}
                  className="w-full bg-white border border-[#0B3D78]/10 rounded-lg px-[18px] py-[14px] text-[#0B3D78] text-[15px] font-['Inter',sans-serif] outline-none focus:border-[#0B3D78]/30 transition-colors placeholder:text-[#0B3D78]/30"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] uppercase text-[#0B3D78]/50 mb-2"
                >
                  {t('contact.messageLabel')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.messagePlaceholder')}
                  className="w-full bg-white border border-[#0B3D78]/10 rounded-lg px-[18px] py-[14px] text-[#0B3D78] text-[15px] font-['Inter',sans-serif] outline-none focus:border-[#0B3D78]/30 transition-colors resize-none placeholder:text-[#0B3D78]/30"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="bg-[#0B3D78] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#0B3D78]/90 transition-colors duration-200 cursor-pointer"
                whileTap={{ scale: 0.97 }}
              >
                {submitted ? t('contact.sent') : t('contact.send')}
              </motion.button>
            </form>
          </motion.div>

          {/* Right — Map */}
          <motion.div
            className="lg:w-1/2 relative min-h-[400px] lg:min-h-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-xl overflow-hidden h-full min-h-[400px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8471131920807!2d-7.619077224213768!3d33.57037747334057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b9%3A0x550c1477c680cfd2!2sCasablanca!5e0!3m2!1sen!2sma!4v1716300000000!5m2!1sen!2sma"
                className="w-full h-full absolute inset-0 border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FasLift Solutions Location"
              />

              {/* Floating glass contact card */}
              <div className="map-glass-card absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs p-5 z-10">
                <h4 className="font-bold text-white text-[16px] mb-3">
                  FasLift Solutions
                </h4>
                <ul className="space-y-2.5">
                  <li className="flex items-center gap-3">
                    <Phone size={15} className="text-white/60 shrink-0" />
                    <a
                      href="tel:+212653660399"
                      className="text-white/80 text-[14px] hover:text-white transition-colors"
                    >
                      +212 653-660399
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail size={15} className="text-white/60 shrink-0" />
                    <a
                      href="mailto:info@faslift.com"
                      className="text-white/80 text-[14px] hover:text-white transition-colors"
                    >
                      info@faslift.com
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle size={15} className="text-white/60 shrink-0" />
                    <a
                      href="https://wa.me/212653660399"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 text-[14px] hover:text-white transition-colors"
                    >
                      +212 653-660399
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
