import { useEffect, useRef } from 'react';
import { DATA } from '../data';
import { usePrefersReducedMotion } from '../shared';

const projects = Array.isArray(DATA.projects) ? DATA.projects : [];
const groups = Array.isArray(DATA.skillGroups) ? DATA.skillGroups : [];

export default function Skills({ onOpen }) {
  const reduce = usePrefersReducedMotion();
  const layerRef = useRef(null);

  useEffect(() => {
    if (reduce) return;
    const section = document.getElementById('skills');
    const layer = layerRef.current;
    if (!section || !layer) return;

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width - 0.5) * -14;
      const my = ((e.clientY - r.top) / r.height - 0.5) * -10;
      layer.style.setProperty('--sx', mx.toFixed(1) + 'px');
      layer.style.setProperty('--sy', my.toFixed(1) + 'px');
    };
    const onLeave = () => {
      layer.style.setProperty('--sx', '0px');
      layer.style.setProperty('--sy', '0px');
    };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  const onChipClick = (e) => {
    const chip = e.currentTarget;
    chip.classList.remove('activeChip');
    void chip.offsetWidth;
    chip.classList.add('activeChip');
    clearTimeout(chip._t);
    chip._t = setTimeout(() => chip.classList.remove('activeChip'), 900);
  };

  /* Nama proyek yang cocok dengan data proyek menjadi tautan: gulir ke Proyek
     lalu buka modal proyek terkait. Nama yang tidak ditemukan tetap teks biasa. */
  const openUsed = (entry) => {
    document
      .getElementById('portfolio')
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    const index = projects.findIndex((p) => p.name === entry.repo);
    if (index >= 0 && typeof onOpen === 'function') onOpen(index, 'next');
  };

  return (
    <section id="skills">
      <div className="bg-fx fx-skills" aria-hidden="true">
        <div className="sk-layer" id="skLayer" ref={layerRef}>
          <span className="sk-plus p1">+</span>
          <span className="sk-plus p2">+</span>
          <span className="sk-plus p3">+</span>
          <span className="sk-plus p4">+</span>
          <span className="sk-line l1" />
          <span className="sk-line l2" />
          <span className="sk-line l3" />
        </div>
      </div>
      <div className="wrap skills">
        <header className="skillHead rv">
          <span className="tag">Keahlian</span>
          <h2 className="h" id="sTitle">{DATA.skillsTitle}</h2>
          <p className="m" id="sText">{DATA.skillsText}</p>
        </header>
        <div className="skillGrid" id="skillGrid">
          {groups.map((group, i) => (
            <article
              key={i}
              className="skillCard rv rv-z"
              style={{ '--d': `${(i % 3) * 0.07}s` }}
            >
              <h3 className="skillCardTitle">{group.title}</h3>
              <div className="chips skillChips">
                {(group.chips || []).map((chip, j) => (
                  <button key={j} type="button" className="chipBtn" onClick={onChipClick}>
                    {chip}
                  </button>
                ))}
              </div>
              <p className="skillUsed">
                <span className="skillUsedLabel">Dipakai di:</span>{' '}
                {(group.usedIn || []).map((entry, j) => {
                  const linked = projects.some((p) => p.name === entry.repo);
                  return linked ? (
                    <button
                      key={j}
                      type="button"
                      className="projectLink"
                      onClick={() => openUsed(entry)}
                    >
                      {entry.name}
                    </button>
                  ) : (
                    <span key={j} className="projectPlain">{entry.name}</span>
                  );
                })}
              </p>
            </article>
          ))}
        </div>
        <div className="skillMethods rv" id="tools">
          <h3 className="sh">Metode kerja</h3>
          <div className="chips">
            {(DATA.methods || []).map((method, i) => (
              <button key={i} type="button" className="chipBtn" onClick={onChipClick}>
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
