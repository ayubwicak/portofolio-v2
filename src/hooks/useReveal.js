import { useEffect, useRef } from 'react';

/* Satu observer bersama untuk seluruh elemen .reveal.
   threshold 0.15 + rootMargin negatif di bawah => elemen muncul sekali saja. */
let sharedObserver;

function getObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('reveal--visible');
        sharedObserver.unobserve(el);

        /* Lepas will-change begitu transisi selesai. */
        const release = (e) => {
          if (e && e.propertyName !== 'transform') return;
          el.style.willChange = 'auto';
          el.removeEventListener('transitionend', release);
        };
        el.addEventListener('transitionend', release);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  return sharedObserver;
}

/**
 * Pasang scroll reveal pada sebuah elemen.
 * Mengembalikan ref yang harus ditempelkan ke DOM node.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal--visible');
      el.style.willChange = 'auto';
      return;
    }

    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return ref;
}
