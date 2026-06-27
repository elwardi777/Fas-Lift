import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'

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
  { code: 'en', labelKey: 'nav.langEn' },
  { code: 'fr', labelKey: 'nav.langFr' },
]

/* ------------------------------------------------------------------ */
/*  Language selector (desktop)                                        */
/* ------------------------------------------------------------------ */

function LanguageSelector() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  const switchLang = (code: string) => {
    i18n.changeLanguage(code)
  }

  return (
    <div className="group relative">
      <button
        className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold tracking-wide
                   text-gray-700 hover:text-[#0B3D78] transition-colors duration-200 cursor-pointer font-['JetBrains_Mono',monospace]"
      >
        <Globe size={15} className="opacity-70 text-[#0B3D78]" />
        {currentLang.toUpperCase()}
        <ChevronDown
          size={12}
          className="transition-transform duration-200 group-hover:rotate-180 text-gray-500"
        />
      </button>

      <div
        className="pointer-events-none absolute right-0 top-full pt-2
                    opacity-0 -translate-y-2 transition-all duration-200 ease-out
                    group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 z-50"
      >
        <div
          className="min-w-[120px] rounded-xl border border-gray-100
                      bg-white shadow-lg overflow-hidden"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLang(lang.code)}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-[13px] font-medium
                         transition-colors duration-150 cursor-pointer font-['JetBrains_Mono',monospace]
                         ${
                           currentLang === lang.code
                             ? 'bg-gray-50 text-[#0B3D78] font-bold'
                             : 'text-gray-600 hover:bg-gray-50 hover:text-[#0B3D78]'
                         }`}
            >
              {lang.code.toUpperCase()}
              <span className="text-[11px] text-gray-400 font-['Inter',sans-serif]">
                {t(lang.labelKey)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile menu                                                        */
/* ------------------------------------------------------------------ */

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const location = useLocation()
  const pathname = location.pathname
  const NAV_ITEMS = useNavItems()

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
        <img
          src="/images/governor-4-removebg-preview.png"
          alt="FasLift Solutions"
          className="h-auto max-h-[56px] w-auto"
        />
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
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`rounded-lg border px-5 py-2.5 text-[13px]
                           font-semibold transition-colors duration-150 cursor-pointer
                           font-['JetBrains_Mono',monospace]
                           ${
                             currentLang === lang.code
                               ? 'bg-gray-100 border-[#0B3D78] text-[#0B3D78]'
                               : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                           }`}
              >
                {lang.code.toUpperCase()}
              </button>
            ))}
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

  return (
    <>
      <header
        style={{ zIndex: 1000 }}
        className={`fixed inset-x-0 top-0 flex items-center justify-between
                   px-6 lg:px-10 h-[76px] ${forceDark ? 'bg-transparent border-b border-white/10 text-white' : 'bg-white border-b border-gray-100 text-gray-900'} shadow-sm`}
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
                               ? forceDark
                                 ? 'text-white font-semibold'
                                 : 'text-[#0B3D78] font-semibold'
                               : forceDark
                                 ? 'text-white/80 hover:text-white'
                                 : 'text-gray-600 hover:text-[#0B3D78]'
                           }`}
              >
                {t(item.labelKey)}
                {active && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-[-10px] left-0 right-0 h-0.5 bg-[#0B3D78] rounded-full"
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
                       transition-colors duration-200 cursor-pointer ${forceDark ? 'text-white hover:bg-white/10 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-[#0B3D78]'}`}
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
