import { useEffect, useRef } from 'react';
import { DATA } from '../data';
import { useCountUp, useInView, usePrefersReducedMotion } from '../shared';

function SkillBar({ skill }) {
  const [ref, inView] = useInView();
  const pct = useCountUp(skill.p, '%', 1150, inView);
  return (
    <div ref={ref} className="bar rv" data-target={skill.p}>
      <div className="h2">
        <span>{skill.n}</span>
        <span className="pct">{pct}</span>
      </div>
      <div className="tr">
        <div
          className="fl"
          style={{ '--w': `${skill.p}%`, width: inView ? `${skill.p}%` : 0 }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
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
        <div className="rv rv-l">
          <span className="tag">Keahlian</span>
          <h2 className="h" id="sTitle">{DATA.skillsTitle}</h2>
          <p className="m" id="sText" style={{ marginTop: 14 }}>{DATA.skillsText}</p>
          <div id="tools">
            <h3 className="sh">Perangkat &amp; bahasa pemrograman</h3>
            <div className="chips">
              {(DATA.tools || []).map((tool, i) => (
                <button key={i} type="button" className="chipBtn" onClick={onChipClick}>
                  {tool}
                </button>
              ))}
            </div>
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
        <div className="rv rv-r" style={{ '--d': '.08s' }} id="bars">
          {(DATA.skills || []).map((skill, i) => (
            <SkillBar key={i} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
