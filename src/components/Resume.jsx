import { DATA } from '../data';

const Timeline = ({ items }) =>
  items.map((item, i) => (
    <article className="rv" key={i} style={{ '--d': `${i * 0.08}s` }}>
      <time>{item.when}</time>
      <h3>{item.what}</h3>
      <p>
        {item.where}
        {item.desc ? '. ' + item.desc : ''}
      </p>
    </article>
  ));

export default function Resume() {
  return (
    <section id="resume">
      <div className="bg-fx fx-resume" aria-hidden="true">
        <span className="rs-col c1" />
        <span className="rs-col c2" />
        <span className="rs-col c3" />
        <span className="rs-col c4" />
        <span className="rs-col c5" />
      </div>
      <div className="wrap">
        <div className="rv">
          <span className="tag">Resume</span>
          <h2 className="h">Pengalaman &amp; pendidikan</h2>
        </div>
        <div className="res">
          <div>
            <h3>Pengalaman &amp; freelance</h3>
            <div className="tl2" id="exp">
              <Timeline items={DATA.experience || []} />
            </div>
          </div>
          <div>
            <h3>Pendidikan &amp; sertifikasi</h3>
            <div className="tl2" id="edu">
              <Timeline items={[...(DATA.education || []), ...(DATA.certs || [])]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
