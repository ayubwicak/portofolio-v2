import { DATA } from '../data';
import { useCountUp, useInView } from '../shared';
import Reveal from './Reveal';

function Stat({ item, start }) {
  const display = useCountUp(Number(item.value || 0), item.suffix || '', 1100, start);
  return (
    <div className="statItem">
      <span className="statNum">{display}</span>
      <span className="statLbl">{item.label}</span>
    </div>
  );
}

export default function About() {
  const [statsRef, statsIn] = useInView();

  return (
    <section id="about">
      <div className="bg-fx fx-about" aria-hidden="true">
        <span className="ab-wash" />
        <div className="ab-rings">
          <svg viewBox="0 0 460 460" fill="none">
            <g className="ab-outer">
              <circle cx="230" cy="230" r="208" stroke="rgba(2,54,89,0.14)" strokeWidth="1.2" strokeDasharray="6 10" />
              <circle cx="230" cy="22" r="4" fill="rgba(2,54,89,0.22)" />
            </g>
            <g className="ab-inner">
              <circle cx="230" cy="230" r="144" stroke="rgba(2,54,89,0.11)" strokeWidth="1.2" strokeDasharray="14 8" />
              <circle cx="230" cy="374" r="3.5" fill="rgba(2,54,89,0.18)" />
            </g>
          </svg>
        </div>
      </div>
      <div className="wrap about">
        <Reveal>
          <span className="tag">Tentang saya</span>
          <h2 className="h" id="aTitle">{DATA.aboutTitle}</h2>
          <p className="m" id="aText">{DATA.about}</p>
        </Reveal>
        <Reveal className="statsRow" id="statsRow" delay={80} ref={statsRef}>
          {(DATA.stats || []).map((item, i) => (
            <Stat key={i} item={item} start={statsIn} />
          ))}
        </Reveal>
        <div className="fct">
          {Object.entries(DATA.aboutFacts || {}).map(([key, value], i) => (
            <Reveal className="fCard" key={key} delay={i * 80}>
              <b>{key}</b>
              <span>{value}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
