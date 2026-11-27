import { useEffect, useRef, useState } from 'react';
import { DATA } from '../data';
import { movePill } from '../shared';
import CertThumb from './CertThumb';
import Reveal from './Reveal';

const certificates = Array.isArray(DATA.certificates) ? DATA.certificates : [];

export default function Certificates({ onOpen }) {
  const categories = ['Semua', ...new Set(certificates.map((c) => c.category || 'Lainnya'))];
  const [active, setActive] = useState('Semua');
  const filtersRef = useRef(null);
  const pillRef = useRef(null);
  const gridRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    movePill(pillRef.current, filtersRef.current?.querySelector('button.on'));
  }, [active]);

  useEffect(() => {
    const onResize = () =>
      movePill(pillRef.current, filtersRef.current?.querySelector('button.on'));
    window.addEventListener('resize', onResize);
    if (document.fonts?.ready) document.fonts.ready.then(onResize).catch(() => {});
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const cards = gridRef.current?.querySelectorAll('.certCard') || [];
    let index = 0;
    cards.forEach((card) => {
      const hidden = active !== 'Semua' && card.dataset.c !== active;
      card.classList.toggle('hide', hidden);
      if (!hidden) {
        card.classList.add('in');
        card.classList.remove('pop');
        void card.offsetWidth;
        card.style.animationDelay = index * 0.05 + 's';
        card.classList.add('pop');
        index++;
      }
    });
  }, [active]);

  const openCard = (index) => onOpen(index, 'next');

  return (
    <section id="certificates">
      <div className="bg-fx fx-cert" aria-hidden="true">
        <span className="ct-corner tl" />
        <span className="ct-corner br" />
        <span className="ct-orb" />
        <div className="ct-rings">
          <svg viewBox="0 0 420 420" fill="none">
            <g className="ct-r1">
              <circle cx="210" cy="210" r="185" stroke="rgba(2,54,89,0.12)" strokeWidth="1.2" strokeDasharray="10 12" />
            </g>
            <g className="ct-r2">
              <circle cx="210" cy="210" r="128" stroke="rgba(2,54,89,0.09)" strokeWidth="1" strokeDasharray="6 10" />
            </g>
          </svg>
        </div>
      </div>
      <div className="wrap">
        <Reveal className="pHead">
          <div>
            <span className="tag">Sertifikat</span>
            <h2 className="h">Sertifikasi &amp; pencapaian</h2>
          </div>
          <div className="filters" id="certFilters" ref={filtersRef}>
            <span className="filterPill" id="certFilterPill" ref={pillRef} aria-hidden="true" />
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                data-c={category}
                className={category === active ? 'on' : ''}
                onClick={() => setActive(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="cGrid" id="cGrid" ref={gridRef}>
          {certificates.map((cert, i) => {
            const category = cert.category || 'Lainnya';
            return (
              <Reveal
                as="article"
                key={i}
                className="certCard"
                variant="zoom"
                delay={(i % 3) * 80}
                data-c={category}
                data-idx={i}
                tabIndex={0}
                role="button"
                aria-label={`Lihat sertifikat ${cert.title}`}
                onClick={() => openCard(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCard(i);
                  }
                }}
              >
                <div className="im">
                  <CertThumb cert={cert} index={i} />
                </div>
                <div className="ov">
                  <h3>{cert.title}</h3>
                  <span>
                    {cert.issuer}
                    {cert.date ? ` • ${cert.date}` : ''}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
