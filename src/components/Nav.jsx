import { useCallback, useEffect, useRef, useState } from 'react';
import { DATA } from '../data';

const NAV_ITEMS = [
  ['home', 'Beranda'],
  ['about', 'Tentang'],
  ['portfolio', 'Proyek'],
  ['certificates', 'Sertifikat'],
  ['resume', 'Resume'],
  ['contact', 'Kontak'],
];
const IDS = NAV_ITEMS.map((item) => item[0]);

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const inkRef = useRef(null);

  const getLink = (id) => menuRef.current?.querySelector(`a[data-nav="${id}"]`);

  const moveInk = useCallback((link) => {
    const ink = inkRef.current;
    if (!ink || !link || window.innerWidth <= 920) return;
    const wrapRect = ink.parentElement.getBoundingClientRect();
    const rect = link.getBoundingClientRect();
    ink.style.width = rect.width + 'px';
    ink.style.transform = `translateX(${rect.left - wrapRect.left}px)`;
    ink.style.opacity = '1';
  }, []);

  useEffect(() => {
    const activeId = () =>
      IDS.find((id) => getLink(id)?.classList.contains('on')) || 'home';

    const onScroll = () => {
      const half = window.innerHeight * 0.42;
      let current = 'home';
      IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < half) current = id;
      });
      IDS.forEach((id) => getLink(id)?.classList.toggle('on', id === current));
      moveInk(getLink(current));
    };
    const onResize = () => moveInk(getLink(activeId()));

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();
    if (document.fonts?.ready) document.fonts.ready.then(onResize).catch(() => {});

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [moveInk]);

  const handleMenuLeave = () => {
    const current = IDS.find((id) => getLink(id)?.classList.contains('on')) || 'home';
    moveInk(getLink(current));
  };

  return (
    <nav id="navbar">
      <div className="wrap">
        <a
          className="logo navEnter"
          href="#home"
          id="logo"
          aria-label="Ayub Wicaksono, kembali ke beranda"
        >
          {DATA.brand}
          <span className="logo-dot" aria-hidden="true">.</span>
        </a>
        <div className="navRight navEnter" style={{ '--reveal-delay': '80ms' }}>
          <div className="navMenuWrap">
            <ul
              id="menu"
              ref={menuRef}
              className={open ? 'open' : ''}
              onPointerLeave={handleMenuLeave}
            >
              {NAV_ITEMS.map(([id, label], i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    data-nav={id}
                    className={i === 0 ? 'on' : ''}
                    onPointerEnter={(e) => moveInk(e.currentTarget)}
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a className="nb" href="#contact" onClick={() => setOpen(false)}>
                  Hire saya
                </a>
              </li>
            </ul>
            <span id="navInk" ref={inkRef} aria-hidden="true" />
          </div>
          <button
            id="menuBtn"
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
}
