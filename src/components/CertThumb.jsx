const CERT_THEMES = [
  ['#f8fafc', '#e7eef6'],
  ['#f9f8fc', '#eae6f5'],
  ['#f4f9f8', '#e0eeec'],
  ['#faf8f4', '#eee8dc'],
];

/* Tema khusus kategori: biru→hijau untuk AI Dev, emas/perunggu lembut untuk
   Penghargaan. Kategori lain tetap memakai tema berdasarkan urutan kartu. */
const CERT_THEME_BY_CATEGORY = {
  'AI Dev': ['#eef4fb', '#dcf2ea'],
  'Penghargaan': ['#fbf6ea', '#f0e2c4'],
};

export default function CertThumb({ cert, index, showImage = false }) {
  if (showImage && cert.img) {
    return <img src={cert.img} alt={cert.title} loading="lazy" />;
  }
  const [c1, c2] =
    CERT_THEME_BY_CATEGORY[cert.category] || CERT_THEMES[index % CERT_THEMES.length];
  return (
    <div className="certMock" style={{ '--cc1': c1, '--cc2': c2 }}>
      <span className="certMockFrame" />
      <div className="certMockTop">
        <span>{cert.category || 'Sertifikat'}</span>
        <span className="certMockSeal">✓</span>
      </div>
      <div className="certMockBody">
        <small>{cert.label || 'Certificate of Completion'}</small>
        <h4>{cert.title}</h4>
      </div>
      <div className="certMockFoot">
        <span>{cert.issuerShort || cert.issuer}</span>
        <span>{cert.date || ''}</span>
      </div>
    </div>
  );
}
