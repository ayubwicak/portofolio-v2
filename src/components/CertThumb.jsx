const CERT_THEMES = [
  ['#f8fafc', '#e7eef6'],
  ['#f9f8fc', '#eae6f5'],
  ['#f4f9f8', '#e0eeec'],
  ['#faf8f4', '#eee8dc'],
];

export default function CertThumb({ cert, index }) {
  if (cert.img) {
    return <img src={cert.img} alt={cert.title} loading="lazy" />;
  }
  const [c1, c2] = CERT_THEMES[index % CERT_THEMES.length];
  return (
    <div className="certMock" style={{ '--cc1': c1, '--cc2': c2 }}>
      <span className="certMockFrame" />
      <div className="certMockTop">
        <span>{cert.category || 'Sertifikat'}</span>
        <span className="certMockSeal">✓</span>
      </div>
      <div className="certMockBody">
        <small>Certificate of Completion</small>
        <h4>{cert.title}</h4>
      </div>
      <div className="certMockFoot">
        <span>{cert.issuer}</span>
        <span>{cert.date || ''}</span>
      </div>
    </div>
  );
}
