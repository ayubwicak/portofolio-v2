import { useCallback, useEffect, useRef, useState } from 'react';
import { DATA } from '../data';
import { usePrefersReducedMotion } from '../shared';

const testimonials = Array.isArray(DATA.testimonials) ? DATA.testimonials : [];
const DURATION = 6000;

export default function Testimonials() {
  const reduce = usePrefersReducedMotion();
  const total = testimonials.length;
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState('next');
  const curRef = useRef(0);
  const elapsed = useRef(0);
  const lastTick = useRef(performance.now());
  const paused = useRef(false);
  const progRef = useRef(null);
  const dotsRef = useRef(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  const go = useCallback(
    (i, direction) => {
      if (!total) return;
      const next = ((i % total) + total) % total;
      curRef.current = next;
      setCur(next);
      setDir(direction);
      elapsed.current = 0;
      if (progRef.current) progRef.current.style.width = '0%';
    },
    [total]
  );

  /* Auto-play + progress bar */
  useEffect(() => {
    if (reduce || total <= 1) return;
    let raf;
    lastTick.current = performance.now();
    const loop = (now) => {
      if (!paused.current) {
        elapsed.current += now - lastTick.current;
        if (progRef.current) {
          progRef.current.style.width = Math.min(100, (elapsed.current / DURATION) * 100) + '%';
        }
        if (elapsed.current >= DURATION) go(curRef.current + 1, 'next');
      }
      lastTick.current = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, total, go]);

  /* Drag / swipe */
  useEffect(() => {
    const onUp = (e) => {
      if (!dragging.current) return;
      dragging.current = false;
      const dx = e.clientX - startX.current;
      if (Math.abs(dx) > 40) {
        go(dx < 0 ? curRef.current + 1 : curRef.current - 1, dx < 0 ? 'next' : 'prev');
      }
      paused.current = false;
      lastTick.current = performance.now();
    };
    window.addEventListener('pointerup', onUp);
    return () => window.removeEventListener('pointerup', onUp);
  }, [go]);

  if (!total) return null;

  const onDotClick = (e) => {
    const buttons = [...(dotsRef.current?.querySelectorAll(':scope > button') || [])];
    const i = buttons.indexOf(e.target);
    if (i > -1) go(i, i < curRef.current ? 'prev' : 'next');
  };

  return (
    <section id="testi">
      <div className="bg-fx fx-testi" aria-hidden="true">
        <span className="ts-quote">&ldquo;</span>
      </div>
      <div className="wrap tst">
        <div className="rv rv-l">
          <span className="tag">Testimoni</span>
          <h2 className="h">Kata mereka tentang saya</h2>
        </div>
        <div className="rv rv-r" id="testiBox" style={{ '--d': '.1s' }}
          onPointerEnter={() => { paused.current = true; }}
          onPointerLeave={() => {
            paused.current = false;
            lastTick.current = performance.now();
          }}
        >
          <div
            className="slideViewport"
            id="slideViewport"
            onPointerDown={(e) => {
              dragging.current = true;
              startX.current = e.clientX;
              paused.current = true;
            }}
          >
            <div id="slides">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`slide${i === cur ? ' on' : ''}${
                    i === cur && dir === 'prev' ? ' fromPrev' : ''
                  }`}
                >
                  <p className="m">"{t.q}"</p>
                  <div className="who">
                    <div className="av">
                      {t.img ? <img src={t.img} alt={t.n} loading="lazy" /> : t.n?.[0]}
                    </div>
                    <div>
                      <b>{t.n}</b>
                      <small>{t.r}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {total > 1 && (
            <div className="testiProgTrack" aria-hidden="true">
              <div className="testiProgFill" id="testiProgFill" ref={progRef} />
            </div>
          )}
          <div className="dots" id="dots" ref={dotsRef} onClick={onDotClick}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === cur ? 'on' : ''}
                aria-label={`Testimoni ${i + 1}`}
              />
            ))}
            {total > 1 && (
              <div className="arr">
                <button type="button" aria-label="Sebelumnya" onClick={() => go(cur - 1, 'prev')}>
                  ‹
                </button>
                <button type="button" aria-label="Berikutnya" onClick={() => go(cur + 1, 'next')}>
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
