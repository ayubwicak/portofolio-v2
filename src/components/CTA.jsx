export default function CTA() {
  return (
    <div className="cta" id="cta">
      <div className="bg-fx fx-cta" aria-hidden="true">
        <span className="cta-glow" />
        <div className="cta-rings">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="wrap rv rv-z">
        <h2>Mari bekerja sama!</h2>
        <p>
          Punya proyek atau ide yang ingin diwujudkan? Jangan ragu untuk menghubungi saya.
        </p>
        <a className="btn btnWhite" href="#contact">
          Kirim pesan <span className="arrSlide" aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
