import { useCallback, useEffect, useState } from 'react';
import { DATA } from './data';
import { ToastProvider } from './shared';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';

function PortfolioApp() {
  const [modal, setModal] = useState(null);

  const openProject = useCallback((index, dir) => setModal({ mode: 'gh-detail', index, dir }), []);
  const openCert = useCallback((index, dir) => setModal({ mode: 'cert-detail', index, dir }), []);
  const closeModal = useCallback(() => setModal(null), []);
  const navigateModal = useCallback(
    (index, dir) => setModal((prev) => (prev ? { ...prev, index, dir } : prev)),
    []
  );

  /* Judul halaman */
  useEffect(() => {
    document.title = DATA.name + ' – ' + DATA.role;
  }, []);

  /* Scroll reveal terarah (satu observer untuk semua elemen .rv) */
  useEffect(() => {
    const elements = [...document.querySelectorAll('.rv')];
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Navbar solid & progress bar */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      document.getElementById('navbar')?.classList.toggle('sc', y > 40);

      const doc = document.documentElement;
      const denominator = Math.max(1, doc.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, y / denominator));
      const progress = document.getElementById('prog');
      if (progress) progress.style.width = ratio * 100 + '%';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* Efek ripple pada semua tombol .btn */
  useEffect(() => {
    const onClick = (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'rip';
      ripple.style.left = e.clientX - rect.left + 'px';
      ripple.style.top = e.clientY - rect.top + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Portfolio onOpen={openProject} />
      <Certificates onOpen={openCert} />
      <Skills />
      <Resume />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
      <Modal modal={modal} onClose={closeModal} onNavigate={navigateModal} />
      <div id="prog" />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <PortfolioApp />
    </ToastProvider>
  );
}
