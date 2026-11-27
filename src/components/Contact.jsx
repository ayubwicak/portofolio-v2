import { useEffect, useRef, useState } from 'react';
import { DATA } from '../data';
import { ICON_PATHS, useToast } from '../shared';
import Reveal from './Reveal';

const contacts = Array.isArray(DATA.contact) ? DATA.contact : [];
const emailAddr =
  DATA.email || contacts.find((c) => c.label.toLowerCase() === 'email')?.value || '';
const mailtoHref = 'mailto:' + emailAddr;

export default function Contact() {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const resetTimer = useRef(null);
  const nameRef = useRef(null);
  const msgRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  /* Fallback untuk browser lama tanpa Clipboard API. */
  const legacyCopy = () => {
    const ta = document.createElement('textarea');
    ta.value = emailAddr;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (!ok) throw new Error('copy failed');
  };

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(emailAddr);
      else legacyCopy();
      toast('Email berhasil disalin: ' + emailAddr);
    } catch {
      try {
        legacyCopy();
        toast('Email berhasil disalin: ' + emailAddr);
      } catch {
        toast('Email: ' + emailAddr);
      }
    }
    setError('');
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  const send = (e) => {
    e.preventDefault();
    const nameVal = nameRef.current?.value.trim() || '';
    const msgVal = msgRef.current?.value.trim() || '';
    if (!nameVal || !msgVal) {
      setError(
        !nameVal && !msgVal
          ? 'Isi nama dan pesan terlebih dahulu.'
          : !nameVal
            ? 'Isi nama terlebih dahulu.'
            : 'Isi pesan terlebih dahulu.'
      );
      const form = formRef.current;
      if (form) {
        form.classList.remove('shake');
        void form.offsetWidth;
        form.classList.add('shake');
      }
      return;
    }
    setError('');
    const subject = 'Pesan dari portofolio: ' + nameVal;
    const href =
      mailtoHref +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(msgVal);
    toast('Membuka aplikasi email…');
    window.location.href = href;
  };

  return (
    <section id="contact">
      <div className="wrap ct">
        <Reveal variant="left">
          <span className="tag">Kontak</span>
          <h2 className="h">Hubungi saya</h2>
          <p className="m" style={{ marginTop: 14 }}>
            Terbuka untuk proyek lepas, kolaborasi produk digital, maupun peluang kerja penuh waktu.
          </p>
          <div className="ico" id="cList">
            {contacts.map((c, i) => {
              const key = c.label.toLowerCase();
              const path = ICON_PATHS[key] || ICON_PATHS.link;
              const external = !c.href.startsWith('mailto:');
              return (
                <a
                  key={i}
                  data-tip={c.label}
                  href={c.href}
                  aria-label={c.ariaLabel || c.label}
                  title={c.title || c.label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={path} fill="currentColor" />
                  </svg>
                </a>
              );
            })}
          </div>
          <div className="contactActions">
            <button
              id="copyEmail"
              className={`btn btnDark${copied ? ' copied' : ''}`}
              type="button"
              onClick={copyEmail}
            >
              <svg className="copyIco" id="copyIco" viewBox="0 0 24 24" aria-hidden="true">
                {copied ? (
                  <polyline points="20 6 9 17 4 12" />
                ) : (
                  <>
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </>
                )}
              </svg>
              <span id="copyLbl" aria-live="polite">
                {copied ? 'Tersalin ✓' : 'Salin Email'}
              </span>
            </button>
          </div>
        </Reveal>
        <Reveal variant="right" id="cForm" delay={100} ref={formRef}>
          <div className="field">
            <label htmlFor="n">Nama</label>
            <input id="n" ref={nameRef} type="text" placeholder="Nama Anda" />
            <span className="fieldLine" aria-hidden="true" />
          </div>
          <div className="field">
            <label htmlFor="m">Pesan</label>
            <textarea
              id="m"
              ref={msgRef}
              rows="5"
              placeholder="Tulis pesan atau kebutuhan proyek Anda..."
            />
            <span className="fieldLine" aria-hidden="true" />
          </div>
          {error && (
            <p className="formError" role="alert">
              {error}
            </p>
          )}
          <button id="send" type="button" className="btn btnDark" onClick={send}>
            Kirim lewat email <span className="arrSlide" aria-hidden="true">→</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
