import { useEffect, useRef, useState } from 'react';
import { DATA } from '../data';
import { usePrefersReducedMotion, useToast } from '../shared';

export default function Hero() {
  const toast = useToast();
  const reduce = usePrefersReducedMotion();
  const [role, setRole] = useState(() =>
    Array.isArray(DATA.roles) && DATA.roles.length ? DATA.roles[0] : DATA.role
  );

  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const copyRef = useRef(null);
  const photoRef = useRef(null);

  /* ===== Efek ketik peran bergantian ===== */
  useEffect(() => {
    const list = Array.isArray(DATA.roles) && DATA.roles.length ? DATA.roles : [DATA.role];
    if (reduce || list.length === 1) {
      setRole(list[0]);
      return;
    }
    let wordIdx = 0;
    let charIdx = list[0].length;
    let deleting = false;
    let timer;
    setRole(list[0]);

    const step = () => {
      const word = list[wordIdx];
      if (!deleting) {
        if (charIdx < word.length) {
          charIdx++;
          setRole(word.slice(0, charIdx));
          timer = setTimeout(step, 72);
        } else {
          deleting = true;
          timer = setTimeout(step, 2400);
        }
      } else if (charIdx > 0) {
        charIdx--;
        setRole(word.slice(0, charIdx));
        timer = setTimeout(step, 38);
      } else {
        deleting = false;
        wordIdx = (wordIdx + 1) % list.length;
        timer = setTimeout(step, 360);
      }
    };
    timer = setTimeout(() => {
      deleting = true;
      step();
    }, 2600);
    return () => clearTimeout(timer);
  }, [reduce]);

  /* ===== Parallax halus teks & foto ===== */
  useEffect(() => {
    if (reduce) return;
    const hero = heroRef.current;
    const copy = copyRef.current;
    const photo = photoRef.current;
    if (!hero || !copy || !photo) return;

    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      copy.style.transform = `translate(${-x * 10}px, ${-y * 6}px)`;
      photo.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
    };
    const onLeave = () => {
      copy.style.transform = '';
      photo.style.transform = '';
    };
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  /* ===== Kanvas jaring partikel interaktif ===== */
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let P = [];
    let ripples = [];
    let bursts = [];
    let raf;
    const mouse = { x: -999, y: -999 };

    const resize = () => {
      W = cv.width = cv.offsetWidth || window.innerWidth;
      H = cv.height = cv.offsetHeight || window.innerHeight;
      const count = Math.min(78, Math.max(30, Math.round((W * H) / 18500)));
      P = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: 1.2 + Math.random() * 1.6,
      }));
    };
    resize();

    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };
    const onClick = (e) => {
      if (e.target.closest('a,button')) return;
      const r = cv.getBoundingClientRect();
      const cx = e.clientX - r.left;
      const cy = e.clientY - r.top;
      ripples.push({ x: cx, y: cy, r: 8, a: 0.45 });
      bursts.push({ x: cx, y: cy, a: 0.68, radius: 190 });
      for (const p of P) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.hypot(dx, dy);
        if (dist > 0 && dist < 170) {
          const force = (1 - dist / 170) * 1.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }
    };

    const hero = heroRef.current;
    hero?.addEventListener('pointermove', onMove);
    hero?.addEventListener('pointerleave', onLeave);
    hero?.addEventListener('click', onClick);
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 3.2;
        rp.a *= 0.945;
        if (rp.a < 0.01) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(255,255,255,${rp.a})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = bursts.length - 1; i >= 0; i--) {
        const bt = bursts[i];
        bt.a *= 0.93;
        if (bt.a < 0.015) {
          bursts.splice(i, 1);
          continue;
        }
        for (const p of P) {
          const d = Math.hypot(p.x - bt.x, p.y - bt.y);
          if (d < bt.radius) {
            ctx.strokeStyle = `rgba(180,220,255,${bt.a * (1 - d / bt.radius)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(bt.x, bt.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      for (const p of P) {
        if (!reduce) {
          const dmx = mouse.x - p.x;
          const dmy = mouse.y - p.y;
          const dm = Math.hypot(dmx, dmy);
          if (dm > 18 && dm < 165) {
            p.vx += (dmx / dm) * 0.012;
            p.vy += (dmy / dm) * 0.012;
          }
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.992;
          p.vy *= 0.992;
          if (Math.abs(p.vx) < 0.12) p.vx += (Math.random() - 0.5) * 0.04;
          if (Math.abs(p.vy) < 0.12) p.vy += (Math.random() - 0.5) * 0.04;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
      }

      for (let i = 0; i < P.length; i++) {
        const a = P[i];
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < P.length; j++) {
          const b = P[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(255,255,255,${0.18 * (1 - d / 130)})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 170) {
          ctx.strokeStyle = `rgba(255,255,255,${0.4 * (1 - dm / 170)})`;
          ctx.lineWidth = 0.95;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      hero?.removeEventListener('pointermove', onMove);
      hero?.removeEventListener('pointerleave', onLeave);
      hero?.removeEventListener('click', onClick);
    };
  }, [reduce]);

  const handleCv = (e) => {
    if (!DATA.cv || DATA.cv === '#') {
      e.preventDefault();
      toast('Atur tautan file CV Anda di DATA.cv');
    }
  };

  /* Kelompokkan huruf per kata agar baris tidak pernah putus di tengah nama */
  const nameWords = String(DATA.name).trim().split(/\s+/);
  let letterIndex = 0;
  const nameNodes = nameWords.map((word, wordIdx) => (
    <span className="nameWord" key={wordIdx}>
      {[...word].map((ch) => {
        const i = letterIndex++;
        return (
          <span className="lt" key={i} style={{ '--i': i }}>
            {ch}
          </span>
        );
      })}
      {wordIdx < nameWords.length - 1 ? '\u00A0' : null}
    </span>
  ));

  return (
    <header className="hero" id="home" ref={heroRef}>
      <canvas id="net" ref={canvasRef} aria-hidden="true" />
      <div className="heroIn">
        <div className="heroCopy" id="heroCopy" ref={copyRef}>
          <p className="out" id="hName">
            {nameNodes}
          </p>
          <h1>
            <span id="hRole">{role}</span>
            <span className="typeCaret" aria-hidden="true" />
          </h1>
          <h2 id="hSub">{DATA.sub}</h2>
          <div className="heroBtns">
            <a className="btn btnHero" href="#portfolio">
              Lihat proyek <span className="arrSlide" aria-hidden="true">→</span>
            </a>
            <a
              className="btn btnHero cvLink"
              id="heroCv"
              href={DATA.cv}
              download
              onClick={handleCv}
            >
              Unduh CV
            </a>
          </div>
        </div>
        <div className="heroPhotoWrap" id="heroPhotoWrap" ref={photoRef}>
          <div className="heroPhoto" id="hPhoto">
            {DATA.photo ? (
              <img src={DATA.photo} alt={DATA.name} loading="lazy" />
            ) : (
              <div className="heroPhInner">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span>Foto Anda (3:4)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
