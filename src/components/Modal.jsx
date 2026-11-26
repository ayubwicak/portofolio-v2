import { useEffect, useState } from 'react';
import { DATA } from '../data';
import { Icon, LANG_COLORS } from '../shared';
import CertThumb from './CertThumb';

const projects = Array.isArray(DATA.projects) ? DATA.projects : [];
const certificates = Array.isArray(DATA.certificates) ? DATA.certificates : [];

export default function Modal({ modal, onClose, onNavigate }) {
  const [zoomed, setZoomed] = useState(false);
  const open = Boolean(modal);

  useEffect(() => setZoomed(false), [modal?.mode, modal?.index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (modal.mode === 'gh-detail') {
        if (e.key === 'ArrowLeft') onNavigate(modal.index - 1, 'prev');
        if (e.key === 'ArrowRight') onNavigate(modal.index + 1, 'next');
      } else if (modal.mode === 'cert-detail' && certificates.length > 1) {
        if (e.key === 'ArrowLeft') onNavigate(modal.index - 1, 'prev');
        if (e.key === 'ArrowRight') onNavigate(modal.index + 1, 'next');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, modal, onClose, onNavigate]);

  useEffect(() => {
    if (open) document.getElementById('mx')?.focus();
  }, [open]);

  /* Kunci scroll halaman saat modal terbuka */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  let content = null;

  if (open && modal.mode === 'gh-detail' && projects.length) {
    const total = projects.length;
    const idx = ((modal.index % total) + total) % total;
    const p = projects[idx];
    const lang = p.lang || 'Lainnya';
    const color = LANG_COLORS[lang] || '#023659';
    const repoHref = p.github || p.repoUrl || '#';
    const demoHref = p.live || p.demoUrl || '';
    const caseItems = [
      ['Latar belakang', p.problem],
      ['Proses pengerjaan', p.process],
      ['Peran saya', p.role],
      ['Hasil akhir', p.result],
    ].filter((item) => item[1]);

    content = (
      <div className="mb">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div
            className="ghIconWrap"
            style={{ background: '#023659', color: '#fff', borderColor: '#023659' }}
          >
            <Icon name="github" />
          </div>
          <div className="modalHead">
            <span className="tag" style={{ margin: '0 0 4px' }}>Repositori GitHub</span>
            <h3 className="ghDetailTitle" style={{ margin: 0 }}>{p.name}</h3>
          </div>
        </div>
        <div className="modalMeta">
          <span className="pill">
            <i
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: color,
                display: 'inline-block',
              }}
            />{' '}
            {lang}
          </span>
          <span className="pill">
            <Icon name="star" /> {Number(p.stars || 0)} Stars
          </span>
          <span className="pill">
            <Icon name="fork" /> {Number(p.forks || 0)} Forks
          </span>
        </div>
        <p className="m" style={{ color: '#333c48', lineHeight: 1.8 }}>
          {p.desc || 'Repositori proyek open-source di GitHub.'}
        </p>
        {caseItems.length > 0 && (
          <div className="caseGrid">
            {caseItems.map(([label, value], i) => (
              <div className="caseItem" key={i}>
                <b>{label}</b>
                <p>{value}</p>
              </div>
            ))}
          </div>
        )}
        <div className="modalActions">
          <a
            className="btn btnDark btnSm"
            href={repoHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buka di GitHub ↗
          </a>
          {demoHref && (
            <a
              className="btn btnOutlineDark btnSm"
              href={demoHref}
              target="_blank"
              rel="noopener"
            >
              Live Demo ↗
            </a>
          )}
        </div>
        <div className="modalNav">
          <button type="button" onClick={() => onNavigate(idx - 1, 'prev')}>
            ← Sebelumnya
          </button>
          <span>{idx + 1} / {total}</span>
          <button type="button" onClick={() => onNavigate(idx + 1, 'next')}>
            Berikutnya →
          </button>
        </div>
      </div>
    );
  }

  if (open && modal.mode === 'cert-detail' && certificates.length) {
    const total = certificates.length;
    const idx = ((modal.index % total) + total) % total;
    const c = certificates[idx];

    content = (
      <>
        <div
          className={`mi${zoomed ? ' zoomed' : ''}${c.portrait ? ' portrait' : ''}`}
          id="certZoomBox"
          title="Klik untuk memperbesar atau memperkecil"
          onClick={() => setZoomed((z) => !z)}
        >
          <div className="zoomTarget">
            <CertThumb cert={c} index={idx} showImage />
          </div>
          <span className="zoomBadge" id="zoomBadge">
            {zoomed ? 'Klik untuk Zoom Out' : 'Klik untuk Zoom In'}
          </span>
        </div>
        <div className="mb">
          <span className="tag">{c.category || 'Sertifikat'}</span>
          <h3>{c.title}</h3>
          <div className="modalMeta">
            <span className="pill">{c.issuerLabel || 'Penerbit'}: {c.issuerShort || c.issuer}</span>
            {c.date && <span className="pill">Tahun: {c.date}</span>}
            {c.project && <span className="pill">Proyek: {c.projectShort || c.project}</span>}
            {c.validUntil && <span className="pill">Berlaku hingga: {c.validUntil}</span>}
            {c.credentialId && <span className="pill">ID: {c.credentialId}</span>}
          </div>
          {(c.credentialUrl || c.link) && (
            <div className="modalActions">
              <a
                className="btn btnDark btnSm"
                href={c.credentialUrl || c.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verifikasi Sertifikat ↗
              </a>
            </div>
          )}
          {c.projectUrl && (
            <div className="modalActions">
              <a
                className="btn btnDark btnSm"
                href={c.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat Proyek ↗
              </a>
            </div>
          )}
          <div className="modalNav">
            <button type="button" disabled={total <= 1} onClick={() => onNavigate(idx - 1, 'prev')}>
              ← Sebelumnya
            </button>
            <span>{idx + 1} / {total}</span>
            <button type="button" disabled={total <= 1} onClick={() => onNavigate(idx + 1, 'next')}>
              Berikutnya →
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      id="modal"
      role="dialog"
      aria-modal="true"
      aria-label="Detail portofolio"
      className={open ? 'open' : ''}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="box">
        <button id="mx" type="button" aria-label="Tutup" onClick={onClose}>
          ✕
        </button>
        <div id="mc">
          <div className={`modalInner${modal?.dir === 'prev' ? ' fromPrev' : ''}`}>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
