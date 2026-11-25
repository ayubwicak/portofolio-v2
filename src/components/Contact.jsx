import { useEffect, useRef, useState } from 'react';
import { DATA } from '../data';
import { ICON_PATHS, useToast } from '../shared';

const fallbackEmail = {
  value: 'email@contoh.com',
  href: 'mailto:email@contoh.com',
};

export default function Contact() {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(null);
  const nameRef = useRef(null);
  const msgRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const emailObj =
    (DATA.contact || []).find((c) => c.href.startsWith('mailto:')) || fallbackEmail;
  const emailAddr = emailObj.value || emailObj.href.replace(/^mailto:/i, '');

  const copyEmail = () => {
    try {
      const ta = document.createElement('textarea');
      ta.value = emailAddr;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast('Email berhasil disalin: ' + emailAddr);
    } catch {
      toast('Email: ' + emailAddr);
    }
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  const send = (e) => {
    e.preventDefault();
    const nameVal = nameRef.current?.value.trim() || '';
    const msgVal = msgRef.current?.value.trim() || '';
    if (!nameVal || !msgVal) {
      const form = formRef.current;
      if (form) {
        form.classList.remove('shake');
        void form.offsetWidth;
        form.classList.add('shake');
      }
      toast('Isi nama dan pesan terlebih dahulu');
      return;
    }
    toast('Membuka aplikasi email…');
    window.location.href =
      emailObj.href +
      '?subject=' +
      encodeURIComponent('Pesan dari ' + nameVal) +
      '&body=' +
      encodeURIComponent(msgVal);
  };

  return (
    <section id="contact">
      <div className="wrap ct">
        <div className="rv rv-l">
          <span className="tag">Kontak</span>
          <h2 className="h">Hubungi saya</h2>
          <p className="m" style={{ marginTop: 14 }}>
            Terbuka untuk proyek lepas, kolaborasi produk digital, maupun peluang kerja penuh waktu.
          </p>
          <div className="ico" id="cList">
            {(DATA.contact || []).map((c, i) => {
              const key = c.label.toLowerCase();
              const path = ICON_PATHS[key] || ICON_PATHS.link;
              const external = !c.href.startsWith('mailto:');
              return (
                <a
                  key={i}
                  data-tip={c.label}
                  href={c.href}
                  aria-label={c.label}
                  {...(external ? { target: '_blank', rel: 'noopener' } : {})}
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
              <span id="copyLbl">{copied ? 'Tersalin!' : 'Salin Email'}</span>
            </button>
          </div>
        </div>
        <div className="rv rv-r" id="cForm" style={{ '--d': '.1s' }} ref={formRef}>
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
          <a id="send" className="btn btnDark" href="#" onClick={send}>
            Kirim lewat email <span className="arrSlide" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
