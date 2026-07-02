/* ═══════════════════════════════════════════════════════════════════════════
   FAS LIFT — Overspeed Governor Order Form
   Matches the technical document style shown in the reference image.
   Route: /order-form (opens in new tab)
   Printable: window.print() → Save as PDF
═══════════════════════════════════════════════════════════════════════════ */
import { useTranslation } from 'react-i18next';

export default function OrderFormPage() {
  const { t } = useTranslation();
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body {
          background: #d0d0d0;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          color: #000;
        }

        /* ── Print action bar (hidden when printing) ── */
        .action-bar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 48px;
          background: #333;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 24px;
          gap: 10px;
          z-index: 999;
        }
        .action-bar button {
          padding: 8px 20px;
          border: none;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: Arial, sans-serif;
        }
        .btn-pdf {
          background: #1a73e8;
          color: #fff;
        }
        .btn-pdf:hover { background: #1558b0; }
        .btn-close-bar {
          background: #555;
          color: #fff;
        }
        .btn-close-bar:hover { background: #777; }

        /* ── Page container (A4-like) ── */
        .page-wrap {
          padding: 64px 20px 40px;
          display: flex;
          justify-content: center;
        }
        .doc-page {
          width: 794px;
          min-height: 1123px;
          background: #fff;
          padding: 36px 40px 40px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }

        /* ── HEADER ── */
        .doc-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .doc-title-box {
          background: #1a1a1a;
          color: #fff;
          text-align: center;
          padding: 8px 28px;
          min-width: 280px;
        }
        .doc-title-box .line1 {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .doc-title-box .line2 {
          font-size: 12px;
          font-weight: 400;
          margin-top: 2px;
        }
        .doc-logo-area {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .doc-logo-area img {
          height: 38px;
          width: auto;
          object-fit: contain;
        }
        .doc-logo-area .site-url {
          font-size: 10px;
          color: #555;
          letter-spacing: 0.02em;
        }

        /* ── Info reference table ── */
        .info-table {
          width: 100%;
          border-collapse: collapse;
          border: 1.5px solid #000;
          margin-bottom: 20px;
          font-size: 11px;
        }
        .info-table td {
          padding: 3px 8px;
          border-bottom: 1px solid #000;
          line-height: 1.4;
        }
        .info-table tr:last-child td { border-bottom: none; }
        .info-table .lbl { font-weight: 700; width: 120px; }

        /* ── Form sections ── */
        .form-row {
          display: flex;
          align-items: flex-start;
          border-bottom: 1px solid #bbb;
          padding: 10px 0;
          gap: 0;
        }
        .form-row:last-child { border-bottom: none; }

        .row-label {
          width: 120px;
          font-weight: 700;
          font-size: 11.5px;
          letter-spacing: 0.04em;
          flex-shrink: 0;
          padding-top: 2px;
        }
        .row-colon {
          width: 14px;
          flex-shrink: 0;
          padding-top: 2px;
          font-size: 12px;
        }
        .row-options {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 12px 28px;
        }

        /* ── Checkbox option ── */
        .cb-option {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
          min-width: 90px;
        }
        .cb-option .opt-label {
          font-size: 11px;
          color: #222;
          line-height: 1.2;
          white-space: nowrap;
        }
        .cb-option .opt-sub {
          font-size: 10px;
          color: #555;
          white-space: nowrap;
        }
        .cb-box {
          width: 18px;
          height: 18px;
          border: 1.5px solid #333;
          display: inline-block;
          flex-shrink: 0;
          margin-top: 2px;
          background: #fff;
        }
        /* Checkboxes look like the reference — outlined squares */
        .cb-option input[type="checkbox"] {
          width: 16px;
          height: 16px;
          margin: 0;
          cursor: pointer;
          accent-color: #123F73;
          flex-shrink: 0;
          border: 2px solid #333;
        }
        .cb-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* ── Text input field ── */
        .text-field {
          border: none;
          border-bottom: 1px solid #555;
          outline: none;
          font-family: Arial, sans-serif;
          font-size: 12px;
          width: 100%;
          padding: 2px 4px;
          background: transparent;
        }
        .text-field:focus { border-bottom-color: #123F73; }

        /* ── Customer info section ── */
        .customer-section {
          margin-top: 22px;
          border: 1.5px solid #000;
        }
        .customer-section .cs-row {
          display: flex;
          border-bottom: 1px solid #999;
          min-height: 26px;
          align-items: center;
        }
        .customer-section .cs-row:last-child { border-bottom: none; }
        .customer-section .cs-label {
          width: 140px;
          background: #f0f0f0;
          padding: 4px 8px;
          font-weight: 700;
          font-size: 10.5px;
          letter-spacing: 0.04em;
          border-right: 1px solid #999;
          flex-shrink: 0;
        }
        .customer-section .cs-val {
          flex: 1;
          padding: 4px 10px;
        }
        .customer-section input {
          width: 100%;
          border: none;
          outline: none;
          font-family: Arial, sans-serif;
          font-size: 12px;
          background: transparent;
        }

        /* ── Quantity / notes table ── */
        .qty-table {
          width: 100%;
          border-collapse: collapse;
          border: 1.5px solid #000;
          margin-top: 16px;
          font-size: 11px;
        }
        .qty-table th {
          background: #1a1a1a;
          color: #fff;
          padding: 5px 8px;
          text-align: center;
          font-size: 11px;
          font-weight: 700;
          border-right: 1px solid #555;
        }
        .qty-table th:last-child { border-right: none; }
        .qty-table td {
          border: 1px solid #aaa;
          padding: 4px 6px;
          min-height: 24px;
        }
        .qty-table td input {
          width: 100%;
          border: none;
          outline: none;
          font-family: Arial, sans-serif;
          font-size: 11px;
          background: transparent;
          text-align: center;
        }

        /* ── Signature area ── */
        .sig-row {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
          gap: 40px;
        }
        .sig-block {
          flex: 1;
          border-top: 1px solid #555;
          padding-top: 4px;
          font-size: 10px;
          color: #555;
          text-align: center;
        }

        /* ── Footer ── */
        .doc-footer {
          margin-top: 28px;
          border-top: 1.5px solid #000;
          padding-top: 8px;
          font-size: 10px;
          color: #444;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* ── Section divider title ── */
        .section-divider {
          background: #f0f0f0;
          border: 1px solid #bbb;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin: 14px 0 0;
        }
        .options-wrap {
          border: 1px solid #bbb;
          border-top: none;
        }

        /* ── Print media ── */
        @media print {
          html, body { background: #fff; }
          .action-bar { display: none !important; }
          .page-wrap { padding: 0; }
          .doc-page {
            box-shadow: none;
            width: 100%;
            min-height: auto;
            padding: 20px;
          }
          @page { margin: 10mm; size: A4; }
        }
      `}</style>

      {/* Action Bar */}
      <div className="action-bar no-print">
        <button className="btn-close-bar" onClick={() => window.close()}>✕ {t('orderForm.close')}</button>
        <button className="btn-pdf" onClick={() => window.print()}>🖨 {t('orderForm.savePrint')}</button>
      </div>

      <div className="page-wrap">
        <div className="doc-page">

          {/* ── HEADER ── */}
          <div className="doc-header">
            <div className="doc-title-box">
              <div className="line1">FAS LIFT</div>
              <div className="line2">{t('orderForm.formTitle')}</div>
            </div>
            <div className="doc-logo-area">
              <img src="/images/governor-4-removebg-preview.png" alt="FAS LIFT" />
              <span className="site-url">www.faslift.com</span>
            </div>
          </div>

          {/* ── Info Reference Table ── */}
          <table className="info-table">
            <tbody>
              <tr>
                <td className="lbl">{t('orderForm.diameter')}</td>
                <td>: Ø 200 mm &nbsp;: {t('orderForm.minNominalSpeed')}: 0.20 m/sn. – {t('orderForm.maxNominalSpeed')}: 1.60 m/sn.</td>
              </tr>
              <tr>
                <td className="lbl">{t('orderForm.diameter')}</td>
                <td>: Ø 250 mm &nbsp;: {t('orderForm.minNominalSpeed')}: 0.30 m/sn. – {t('orderForm.maxNominalSpeed')}: 2.00 m/sn.</td>
              </tr>
              <tr>
                <td className="lbl">{t('orderForm.diameter')}</td>
                <td>: Ø 300 mm &nbsp;: {t('orderForm.minNominalSpeed')}: 0.50 m/sn. – {t('orderForm.maxNominalSpeed')}: 2.50 m/sn.</td>
              </tr>
            </tbody>
          </table>

          {/* ── FORM OPTIONS ── */}
          <div className="section-divider">{t('orderForm.techSpecs')}</div>
          <div className="options-wrap">

            {/* DIAMETER */}
            <div className="form-row">
              <div className="row-label">{t('orderForm.diameter')}</div>
              <div className="row-colon">:</div>
              <div className="row-options">
                {[
                  { label: 'Ø200 mm' },
                  { label: 'Ø250 mm' },
                  { label: 'Ø300 mm' },
                ].map(o => (
                  <div className="cb-option" key={o.label}>
                    <div className="opt-label">{o.label}</div>
                    <div className="cb-row">
                      <input type="checkbox" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TYPE */}
            <div className="form-row">
              <div className="row-label">{t('orderForm.type')}</div>
              <div className="row-colon">:</div>
              <div className="row-options">
                <div className="cb-option">
                  <div className="opt-label">(–)</div>
                  <div className="opt-sub">{t('orderForm.withoutCoil')}</div>
                  <div className="cb-row"><input type="checkbox" /></div>
                </div>
                <div className="cb-option">
                  <div className="opt-label">UZ</div>
                  <div className="opt-sub">{t('orderForm.remoteMrl')}</div>
                  <div className="cb-row"><input type="checkbox" /></div>
                </div>
                <div className="cb-option">
                  <div className="opt-label">A3 (UCM)</div>
                  <div className="opt-sub">{t('orderForm.a3Comp')}</div>
                  <div className="cb-row"><input type="checkbox" /></div>
                </div>
                <div className="cb-option">
                  <div className="opt-label">A3 + UZ</div>
                  <div className="opt-sub">{t('orderForm.a3Remote')}</div>
                  <div className="cb-row"><input type="checkbox" /></div>
                </div>
              </div>
            </div>

            {/* VOLTAGE */}
            <div className="form-row">
              <div className="row-label">{t('orderForm.voltage')}</div>
              <div className="row-colon">:</div>
              <div className="row-options">
                {[
                  { label: '24 V.DC.' },
                  { label: '110 V.DC.' },
                  { label: '190 V.DC.' },
                  { label: '220 V.AC.' },
                ].map(o => (
                  <div className="cb-option" key={o.label}>
                    <div className="opt-label">{o.label}</div>
                    <div className="cb-row"><input type="checkbox" /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* DIRECTION */}
            <div className="form-row">
              <div className="row-label">{t('orderForm.direction')}</div>
              <div className="row-colon">:</div>
              <div className="row-options">
                <div className="cb-option">
                  <div className="opt-label">{t('orderForm.downward')}</div>
                  <div className="opt-sub">▼ {t('orderForm.only')}</div>
                  <div className="cb-row"><input type="checkbox" /></div>
                </div>
                <div className="cb-option">
                  <div className="opt-label">{t('orderForm.bidirectional')}</div>
                  <div className="opt-sub">▼ ▲ {t('orderForm.both')}</div>
                  <div className="cb-row"><input type="checkbox" /></div>
                </div>
              </div>
            </div>

            {/* ROPE DIAMETER */}
            <div className="form-row">
              <div className="row-label">{t('orderForm.ropeDia')}</div>
              <div className="row-colon">:</div>
              <div className="row-options">
                {['6 mm', '8 mm', '10 mm', '12 mm', '13 mm'].map(o => (
                  <div className="cb-option" key={o}>
                    <div className="opt-label">{o}</div>
                    <div className="cb-row"><input type="checkbox" /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* CERTIFICATION */}
            <div className="form-row">
              <div className="row-label">{t('orderForm.certificate')}</div>
              <div className="row-colon">:</div>
              <div className="row-options">
                {['CE (EN81-20/50)', 'GOST-R', t('orderForm.other')].map(o => (
                  <div className="cb-option" key={o}>
                    <div className="opt-label">{o}</div>
                    <div className="cb-row"><input type="checkbox" /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* NOMINAL SPEED */}
            <div className="form-row" style={{ alignItems: 'center' }}>
              <div className="row-label">{t('orderForm.nominalSpeed')}</div>
              <div className="row-colon">:</div>
              <div className="row-options" style={{ alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11 }}>m/sn.</span>
                  <input type="text" className="text-field" style={{ width: 80 }} placeholder="e.g. 1.0" />
                </div>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="form-row" style={{ alignItems: 'center' }}>
              <div className="row-label">{t('orderForm.quantity')}</div>
              <div className="row-colon">:</div>
              <div className="row-options" style={{ alignItems: 'center' }}>
                <input type="number" min="1" className="text-field" style={{ width: 80 }} placeholder="1" />
                <span style={{ fontSize: 11, color: '#555' }}>{t('orderForm.pieces')}</span>
              </div>
            </div>

            {/* DELIVERY DATE */}
            <div className="form-row" style={{ alignItems: 'center' }}>
              <div className="row-label">{t('orderForm.deliveryDate')}</div>
              <div className="row-colon">:</div>
              <div className="row-options">
                <input type="date" className="text-field" style={{ width: 160 }} />
              </div>
            </div>

          </div>{/* end options-wrap */}

          {/* ── CUSTOMER INFORMATION ── */}
          <div className="section-divider" style={{ marginTop: 20 }}>{t('orderForm.customerInfo')}</div>
          <div className="customer-section">
            {[
              { label: t('orderForm.companyName'), placeholder: '' },
              { label: t('orderForm.contactPerson'), placeholder: '' },
              { label: t('orderForm.emailAddress'), placeholder: '' },
              { label: t('orderForm.phoneWhatsapp'), placeholder: '' },
              { label: t('orderForm.address'), placeholder: '' },
              { label: t('orderForm.countryCity'), placeholder: '' },
            ].map(f => (
              <div className="cs-row" key={f.label}>
                <div className="cs-label">{f.label}</div>
                <div className="cs-val">
                  <input type="text" placeholder={f.placeholder} />
                </div>
              </div>
            ))}
            <div className="cs-row">
              <div className="cs-label">{t('orderForm.notes')}</div>
              <div className="cs-val" style={{ minHeight: 44 }}>
                <input type="text" />
              </div>
            </div>
          </div>

          {/* ── SIGNATURE ── */}
          <div className="sig-row">
            <div className="sig-block">{t('orderForm.date')}</div>
            <div className="sig-block">{t('orderForm.signatureStamp')}</div>
            <div className="sig-block">{t('orderForm.receivedBy')}</div>
          </div>

          {/* ── DOC FOOTER ── */}
          <div className="doc-footer">
            <span>
              <strong>FAS LIFT SOLUTIONS</strong> · Zone Industrielle, Bloc B, N°7 Casablanca 20250 / MOROCCO
            </span>
            <span>Tel: +212 531 613 923 · info@faslift.com</span>
          </div>

        </div>{/* end doc-page */}
      </div>{/* end page-wrap */}
    </>
  );
}
