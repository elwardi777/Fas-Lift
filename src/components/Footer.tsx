import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* ─────────────────────────────────────────────
   Inline SVG icons (unchanged from original)
───────────────────────────────────────────── */
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─────────────────────────────────────────────
   Footer Component
───────────────────────────────────────────── */
const Footer: React.FC = () => {
  const { t } = useTranslation();

  const NAV_LINKS = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.aboutUs'), href: '/about' },
    { label: t('nav.products'), href: '/products/speed-governors' },
    { label: t('nav.documents'), href: '/corporate/media' },
    { label: t('nav.contact'), href: '/corporate/contact' },
  ];

  const SOCIAL = [
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
      icon: <InstagramIcon />,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      bg: '#0077b5',
      icon: <LinkedInIcon />,
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/212653660399',
      bg: '#25d366',
      icon: <WhatsAppIcon />,
    },
  ];

  return (
    <>
      <style>{`
        /* ── Footer layout ── */
        .ft-root {
          background: #fff;
          border-top: 2px solid #e8edf5;
          font-family: 'Inter', sans-serif;
        }

        /* 4-column grid */
        .ft-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 50px 40px 80px;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.2fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* column headings */
        .ft-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0B3D78;
          margin: 0 0 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e8edf5;
        }

        /* ── Col 1 – Company ── */
        .ft-col-company {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: -30px;
        }
        .ft-logo {
          width: 240px;
          height: auto;
          object-fit: contain;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: -15px;
          display: block;
          transform: translateX(-20px);
        }
        .ft-company-name {
          font-size: 16px;
          font-weight: 700;
          color: #123F73;
          margin: 0 0 6px;
        }
        .ft-tagline {
          font-size: 14px;
          font-weight: 400;
          line-height: 1.35;
          color: #566273;
          max-width: 320px;
          margin: 0 0 6px;
        }
        .ft-address-line1 {
          font-size: 14px;
          color: #4b5563;
          margin: 0 0 6px;
        }
        .ft-address-line2 {
          font-size: 14px;
          color: #4b5563;
          margin: 0 0 6px;
        }
        .ft-contact-group {
          font-size: 14px;
          color: #4b5563;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ft-contact-item {
          margin: 0 0 6px;
        }
        .ft-contact-item:last-child {
          margin: 0;
        }
        .ft-contact-link {
          color: #0B3D78;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .ft-contact-link:hover { color: #1a6abf; }

        /* ── Col 2 – Quick Links ── */
        .ft-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ft-nav-link {
          font-size: 14px;
          color: #4b5563;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.15s, transform 0.15s;
        }
        .ft-nav-link::before {
          content: '›';
          font-size: 16px;
          color: #0B3D78;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.15s, transform 0.15s;
        }
        .ft-nav-link:hover {
          color: #0B3D78;
          transform: translateX(4px);
        }
        .ft-nav-link:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Col 3 – QR ── */
        .ft-qr-col {
          background: transparent !important;
        }
        .ft-qr-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: transparent;
        }
        .ft-qr-label {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0;
        }
        .ft-qr-img {
          width: 100%;
          max-width: 240px;
          height: auto;
          aspect-ratio: 1 / 1;
          object-fit: contain;
          display: block;
          background: transparent;
          /* Remove white PNG background by blending with the white footer */
          mix-blend-mode: multiply;
          /* No border, shadow, radius, padding */
          border: none;
          box-shadow: none;
          border-radius: 0;
          padding: 0;
        }

        /* ── Col 4 – Social ── */
        .ft-social-row {
          display: flex;
          flex-direction: row;
          gap: 14px;
          margin-top: 4px;
        }
        .ft-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
          transition: transform 0.18s, box-shadow 0.18s;
          flex-shrink: 0;
          text-decoration: none;
        }
        .ft-social-btn:hover {
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
        }

        /* ── Bottom bar ── */
        .ft-bottom {
          border-top: 1px solid #e8edf5;
          background: #f8fafc;
        }
        .ft-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 16px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }
        .ft-copy {
          font-size: 12.5px;
          color: #6b7280;
          margin: 0;
        }
        .ft-legal {
          display: flex;
          gap: 14px;
          font-size: 12.5px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .ft-legal a {
          color: #6b7280;
          text-decoration: none;
          transition: color 0.15s;
        }
        .ft-legal a:hover { color: #0B3D78; }
        .ft-legal-sep { color: #d1d5db; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            padding: 35px 32px 60px;
          }
          .ft-logo {
            width: 200px;
            margin-left: auto;
            margin-right: auto;
            transform: translateX(-16px);
            margin-bottom: -12px;
          }
        }
        @media (max-width: 640px) {
          .ft-grid {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 28px 20px 48px;
            text-align: center;
          }
          /* Column headings: center + full-width rule */
          .ft-col-title {
            text-align: center;
          }
          /* Col 1 – Logo & address centered */
          .ft-logo {
            width: 170px;
            margin-left: auto;
            margin-right: auto;
            transform: translateX(-12px);
            margin-bottom: -10px;
          }
          .ft-col-company {
            align-items: center;
            text-align: center;
          }
          /* Col 2 – Nav links centered */
          .ft-nav-list {
            align-items: center;
          }
          .ft-nav-link {
            justify-content: center;
          }
          /* Col 3 – QR centered */
          .ft-qr-wrap {
            align-items: center;
          }
          /* Col 4 – Social icons centered */
          .ft-social-row {
            justify-content: center;
          }
          /* Bottom bar centered */
          .ft-bottom-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 16px 20px;
          }
          .ft-legal {
            justify-content: center;
          }
        }
      `}</style>

      <footer className="ft-root">

        {/* ══ MAIN GRID ══════════════════════════════════════════════ */}
        <div className="ft-grid">

          {/* ── Column 1: Company ── */}
          <div className="ft-col-company">
            <img
              src="/images/governor-4-removebg-preview.png"
              alt={t('footer.logoAlt')}
              className="ft-logo"
            />
            <p className="ft-tagline">
              {t('footer.taglineDesc')}
            </p>
            <p className="ft-address-line1">
              {t('footer.address').split('\n')[0]}
            </p>
            <p className="ft-address-line2">
              {t('footer.address').split('\n')[1] || ''}
            </p>
            <div className="ft-contact-group">
              <div className="ft-contact-item">
                <span style={{ color: '#6b7280' }}>{t('footer.phoneLabel')}: </span>
                <a href="tel:+212653660399" className="ft-contact-link">
                  +212 653-660399
                </a>
              </div>
              <div className="ft-contact-item">
                <span style={{ color: '#6b7280' }}>{t('footer.emailLabel')}: </span>
                <a href="mailto:faslift@outlook.com" className="ft-contact-link">
                  faslift@outlook.com
                </a>
              </div>
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <p className="ft-col-title">{t('footer.quickLinks')}</p>
            <ul className="ft-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="ft-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Resources / QR ── */}
          <div className="ft-qr-col">
            <p className="ft-col-title">{t('footer.resources')}</p>
            <div className="ft-qr-wrap">
              <p className="ft-qr-label">{t('footer.businessCard')}</p>
              <img
                src="/images/Capture d’écran 2026-06-27 193815.png"
                alt={t('footer.businessCardQrAlt')}
                className="ft-qr-img"
              />
            </div>
          </div>

          {/* ── Column 4: Social Media ── */}
          <div>
            <p className="ft-col-title">{t('footer.followUs')}</p>
            <div className="ft-social-row">
              {SOCIAL.map(({ label, href, bg, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="ft-social-btn"
                  style={{ background: bg }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ══ BOTTOM BAR ══════════════════════════════════════════════ */}
        <div className="ft-bottom">
          <div className="ft-bottom-inner">
            <p className="ft-copy">
              © 2021{' '}
              <span style={{ fontWeight: 600, color: '#0B3D78' }}>FasLift Solutions</span>
              {' '}· {t('footer.rightsReserved')}
            </p>
            <div className="ft-legal">
              {[
                { label: t('footer.privacyPolicy'), key: 'privacy' },
                { label: t('footer.legalNotices'), key: 'legal' },
                { label: t('footer.cookiePolicy'), key: 'cookie' },
              ].map((item, i, arr) => (
                <React.Fragment key={item.key}>
                  <a href="#">{item.label}</a>
                  {i < arr.length - 1 && <span className="ft-legal-sep">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;
