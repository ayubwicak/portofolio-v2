import { useEffect, useRef, useState } from 'react';
import { DATA } from '../data';
import { Icon, LANG_COLORS, movePill } from '../shared';
import Reveal from './Reveal';

const projects = Array.isArray(DATA.projects) ? DATA.projects : [];

export default function Portfolio({ onOpen }) {
  const categories = ['Semua', ...new Set(projects.map((p) => p.lang || 'Lainnya'))];
  const [active, setActive] = useState('Semua');
  const filtersRef = useRef(null);
  const pillRef = useRef(null);
  const gridRef = useRef(null);
  const firstRender = useRef(true);

  /* Posisikan pill sesuai tombol aktif */
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

  /* Filter kartu + animasi pop (sama seperti perilaku asli) */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const cards = gridRef.current?.querySelectorAll('.ghCard') || [];
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
    <section id="portfolio">
      <div className="bg-fx fx-port" aria-hidden="true">
        <span className="pt-dots" />
      </div>
      <div className="wrap">
        <Reveal className="pHead">
          <div>
            <span className="tag">Proyek GitHub</span>
            <h2 className="h">Karya terbaru</h2>
          </div>
          <div className="filters" id="ghFilters" ref={filtersRef}>
            <span className="filterPill" id="ghFilterPill" ref={pillRef} aria-hidden="true" />
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
        <div className="pGrid" id="pGrid" ref={gridRef}>
          {projects.map((project, i) => {
            const lang = project.lang || 'Lainnya';
            const repoHref = project.github || project.repoUrl || '#';
            return (
              <Reveal
                as="article"
                key={i}
                className="ghCard"
                variant="zoom"
                delay={(i % 3) * 80}
                data-c={lang}
                data-idx={i}
                tabIndex={0}
                role="button"
                aria-label={`Detail proyek ${project.name}`}
                onClick={() => openCard(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openCard(i);
                  }
                }}
              >
                <div>
                  <div className="ghTop">
                    <div className="ghIconWrap">
                      <Icon name="github" />
                    </div>
                    <span className="ghLang">
                      <i style={{ '--lc': LANG_COLORS[lang] || '#023659' }} />
                      {lang}
                    </span>
                  </div>
                  <h3 className="ghTitle">{project.name}</h3>
                  <p className="ghDesc">
                    {project.desc || 'Repositori proyek open-source di GitHub.'}
                  </p>
                </div>
                <div className="ghFoot">
                  <div className="ghStats">
                    <span title="Stars">
                      <Icon name="star" /> {Number(project.stars || 0)}
                    </span>
                    <span title="Forks">
                      <Icon name="fork" /> {Number(project.forks || 0)}
                    </span>
                  </div>
                  <a
                    className="ghQuickLink"
                    href={repoHref}
                    target="_blank"
                    rel="noopener"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub ↗
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
