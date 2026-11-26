import { DATA } from '../data';

const Timeline = ({ items }) =>
  items.map((item, i) => (
    <article className="rv" key={i} style={{ '--d': `${i * 0.08}s` }}>
      <time>{item.when}</time>
      <h3>{item.what}</h3>
      <p>{[item.where, item.desc].filter(Boolean).join('. ')}</p>
    </article>
  ));

export default function Resume() {
  return (
    <section id="resume">
      <div className="wrap resumeWrap">
        <div className="rv">
          <span className="tag">Resume</span>
          <h2 className="h">Pengalaman &amp; pendidikan</h2>
        </div>
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
