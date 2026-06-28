import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation, Link, useNavigate } from 'react-router-dom'

interface NavbarProps {
  forceDark?: boolean
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface NavItem {
  labelKey: string
  href: string
  isActive: (pathname: string) => boolean
}

function useNavItems(): NavItem[] {
  return [
    {
      labelKey: 'nav.home',
      href: '/',
      isActive: (pathname) => pathname === '/',
    },
    {
      labelKey: 'nav.aboutUs',
      href: '/about',
      isActive: (pathname) => pathname === '/about',
    },
    {
      labelKey: 'nav.products',
      href: '/products/speed-governors',
      isActive: (pathname) => pathname.startsWith('/products'),
    },
    {
      labelKey: 'nav.documents',
      href: '/catalog',
      isActive: (pathname) => pathname === '/catalog' || pathname.startsWith('/media/e-catalog'),
    },
    {
      labelKey: 'nav.contact',
      href: '/corporate/contact',
      isActive: (pathname) => pathname === '/corporate/contact',
    },
  ]
}

const LANGUAGES = [
  { code: 'en', label: 'English', nativeName: 'English', labelKey: 'nav.langEn' },
  { code: 'fr', label: 'Français', nativeName: 'Français', labelKey: 'nav.langFr' },
  { code: 'tr', label: 'Türkçe', nativeName: 'Türkçe', labelKey: 'nav.langTr' },
]

function FlagIcon({ code, className = '' }: { code: string; className?: string }) {
  return (
    <span
      className={`inline-flex h-5 w-5 shrink-0 overflow-hidden rounded-[4px] shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-[1.05] md:h-[22px] md:w-[22px] lg:h-6 lg:w-6 ${className}`}
      aria-hidden="true"
    >
      {code === 'fr' ? (
        <svg viewBox="0 0 3 2" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice">
          <path fill="#0055A4" d="M0 0h1v2H0z" />
          <path fill="#fff" d="M1 0h1v2H1z" />
          <path fill="#EF4135" d="M2 0h1v2H2z" />
        </svg>
      ) : code === 'tr' ? (
        <svg viewBox="0 0 30 20" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice">
          <path fill="#E30A17" d="M0 0h30v20H0z" />
          <circle cx="12" cy="10" r="5" fill="#fff" />
          <circle cx="13.4" cy="10" r="4" fill="#E30A17" />
          <path fill="#fff" d="m18.7 10 4.15-1.35-2.56 3.53V7.82l2.56 3.53z" />
        </svg>
      ) : (
        <svg viewBox="0 0 60 40" className="h-full w-full object-cover" preserveAspectRatio="xMidYMid slice">
          <path fill="#012169" d="M0 0h60v40H0z" />
          <path stroke="#fff" strokeWidth="8" d="m0 0 60 40M60 0 0 40" />
          <path stroke="#C8102E" strokeWidth="4" d="m0 0 60 40M60 0 0 40" />
          <path stroke="#fff" strokeWidth="13" d="M30 0v40M0 20h60" />
          <path stroke="#C8102E" strokeWidth="8" d="M30 0v40M0 20h60" />
        </svg>
      )}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Language selector (desktop)                                        */
/* ------------------------------------------------------------------ */

function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = i18n.language?.startsWith('tr') ? 'tr' : (i18n.language?.startsWith('fr') ? 'fr' : 'en')
  const currentLanguage = LANGUAGES.find((lang) => lang.code === currentLang) ?? LANGUAGES[0]

  const switchLang = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return
    const handleClick = () => setIsOpen(false)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [isOpen])

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('nav.language')}
        className="group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-semibold tracking-wide
                   text-gray-700 hover:bg-gray-50 hover:text-[#123F73] transition-colors duration-200 cursor-pointer font-['Inter',sans-serif]"
      >
        <FlagIcon code={currentLang} />
        <span>{currentLanguage.label}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full pt-2 z-50"
          >
            <div
              className="min-w-[240px] rounded-xl border border-gray-100
                          bg-white shadow-lg overflow-hidden py-1"
            >
              {LANGUAGES.map((lang) => {
                const active = currentLang === lang.code
                return (
                  <button
                    key={lang.code}
                    onClick={() => switchLang(lang.code)}
                    className={`group flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-[13px]
                               transition-colors duration-200 font-['Inter',sans-serif]
                               ${
                                 active
                                   ? 'bg-[#EAF2FB] text-[#123F73] font-medium'
                                   : 'text-gray-600 hover:bg-gray-50 hover:text-[#123F73]'
                               }`}
                  >
                    <FlagIcon code={lang.code} />
                    <span className="min-w-[78px] text-left font-medium">{lang.label}</span>
                    <span className="text-left text-[12px] text-gray-400">{lang.nativeName}</span>
                    {active && <Check size={14} className="ml-auto text-[#123F73]" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile menu                                                        */
/* ------------------------------------------------------------------ */

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('tr') ? 'tr' : (i18n.language?.startsWith('fr') ? 'fr' : 'en')
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname
  const NAV_ITEMS = useNavItems()

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClose()
    window.setTimeout(() => {
      navigate('/')
    }, 300)
  }

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[1001] flex flex-col bg-white"
    >
      {/* Header row */}
      <div className="flex h-[76px] items-center justify-between px-6 border-b border-gray-100">
        <Link
          to="/"
          onClick={handleLogoClick}
          aria-label="Go to Home"
          className="flex cursor-pointer touch-manipulation select-none items-center"
        >
          <img
            src="/images/governor-4-removebg-preview.png"
            alt="FasLift Solutions"
            className="h-auto max-h-[56px] w-auto"
            draggable={false}
          />
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg
                     text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer"
        >
          <X size={24} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-6 pb-10 pt-6 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname)
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={`block py-3 text-[18px] font-medium tracking-wide transition-colors duration-150 font-['Inter',sans-serif]
                           ${
                             active
                               ? 'text-[#0B3D78] font-semibold border-l-4 border-[#0B3D78] pl-3'
                               : 'text-gray-600 pl-3 hover:text-[#0B3D78]'
                           }`}
              >
                {t(item.labelKey)}
              </Link>
            )
          })}
        </div>

        {/* Mobile language selector */}
        <div className="border-t border-gray-100 pt-6">
          <p className="mb-3 text-[11px] uppercase tracking-[0.12em] text-gray-400 font-['JetBrains_Mono',monospace]">
            {t('nav.language')}
          </p>
          <div className="flex gap-3">
            {LANGUAGES.map((lang) => {
              const active = currentLang === lang.code
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code)
                    onClose()
                  }}
                  className={`group flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-[13px]
                             font-medium transition-colors duration-200 font-['Inter',sans-serif]
                             ${
                               active
                                 ? 'bg-[#EAF2FB] border-[#123F73]/20 text-[#123F73]'
                                 : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#123F73]'
                             }`}
                >
                  <FlagIcon code={lang.code} />
                  <span>{lang.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

export default function Navbar({ forceDark = false }: NavbarProps) {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const pathname = location.pathname
  const NAV_ITEMS = useNavItems()

  /* Lock body scroll when mobile menu is open ---------------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /* Handle Scroll for Sticky Navbar Transition --------------------- */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Init on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        style={{ zIndex: 1000 }}
        className={`fixed inset-x-0 top-0 flex items-center justify-between
                   px-6 lg:px-10 h-[76px] transition-all duration-300 ease-in-out
                   ${
                     isScrolled
                       ? 'bg-white/95 backdrop-blur-md border-b border-[rgba(18,63,115,0.08)] shadow-none text-[#123F73]'
                       : 'bg-transparent border-b border-transparent ' + (forceDark ? 'text-white' : 'text-[#123F73]')
                   }`}
      >
        {/* ---- Logo (left) ---- */}
        <Link to="/" className="relative shrink-0 flex items-center">
          <img
            src="/images/governor-4-removebg-preview.png"
            alt="FasLift Solutions"
            className="h-auto max-h-[56px] w-auto transition-opacity hover:opacity-80"
          />
        </Link>

        {/* ---- Desktop nav (center - mathematically centered) ---- */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname)
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`relative py-2 text-[15px] font-medium tracking-wide transition-colors duration-200 font-['Inter',sans-serif]
                           ${
                             active
                               ? (forceDark && !isScrolled)
                                 ? 'text-white font-semibold'
                                 : 'text-[#123F73] font-semibold'
                               : (forceDark && !isScrolled)
                                 ? 'text-white/80 hover:text-white'
                                 : 'text-gray-600 hover:text-[#123F73]'
                           }`}
              >
                {t(item.labelKey)}
                {active && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-[-10px] left-0 right-0 h-0.5 bg-[#123F73] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* ---- Right side ---- */}
        <div className="flex items-center gap-2">
          {/* Language – desktop only */}
          <div className="hidden lg:block">
            <LanguageSelector />
          </div>

          {/* Hamburger – mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className={`flex lg:hidden h-10 w-10 items-center justify-center rounded-lg
                       transition-colors duration-200 cursor-pointer ${
                         (forceDark && !isScrolled)
                           ? 'text-white hover:bg-white/10 hover:text-white'
                           : 'text-gray-600 hover:bg-gray-100 hover:text-[#123F73]'
                       }`}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* ---- Mobile menu overlay ---- */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
