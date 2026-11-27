import { DATA } from '../data';
import Reveal from './Reveal';

const Timeline = ({ items }) =>
  items.map((item, i) => (
    <Reveal as="article" key={i} delay={i * 80}>
      <time>{item.when}</time>
      <h3>{item.what}</h3>
      <p>{[item.where, item.desc].filter(Boolean).join('. ')}</p>
    </Reveal>
  ));

export default function Resume() {
  return (
    <section id="resume">
      <div className="wrap resumeWrap">
        <Reveal>
          <span className="tag">Resume</span>
          <h2 className="h">Pengalaman &amp; pendidikan</h2>
        </Reveal>
        <div className="res">
          <div>
            <h3>Pengalaman &amp; magang</h3>
            <div className="tl2" id="exp">
              <Timeline items={DATA.experience || []} />
            </div>
          </div>
          <div>
            <h3>Pendidikan &amp; pelatihan</h3>
            <div className="tl2" id="edu">
              <Timeline items={DATA.education || []} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
