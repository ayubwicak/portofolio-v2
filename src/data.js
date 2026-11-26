/* ============================================================================
   PUSAT PENGATURAN DATA PORTOFOLIO (EDIT LANGSUNG DI SINI)
   Semua konten halaman — termasuk daftar Proyek GitHub dan Sertifikat —
   dikelola langsung dari kode ini agar aman dan tidak bisa diubah pengunjung.
============================================================================ */

/* Data sertifikat didefinisikan sekali di sini, lalu dipakai oleh grid, filter,
   modal, dan angka statistik agar semuanya selalu sinkron. */
const CERTIFICATES = [
  {
    title: "Anugerah Gangsa (Juara 3), IPEC'26 Penyertaan Antarabangsa",
    issuer: "Kolej Komuniti Temerloh & Universitas Teknologi Digital Indonesia",
    issuerShort: "Kolej Komuniti Temerloh & UTDI",
    issuerLabel: "Penyelenggara",
    category: "Penghargaan",
    date: "2026",
    issueDate: "12 Oktober 2026",
    type: "award",
    label: "Anugerah",
    docType: "Sijil Anugerah Khas, Penyertaan Antarabangsa (Innovative Product Exhibition and Competition 2026)",
    project: "QR TRACE: Platform Paspor Digital dan Ketertelusuran Produk Kayu untuk UMKM",
    projectShort: "QR TRACE",
    projectUrl: "https://github.com/ayubwicak/QR-TRACE-Digital-Product-Traceability-System",
    venue: "Kolej Komuniti Temerloh, Malaysia",
    signedBy: "Mohd Ramadan bin Mohd Khalid, Pengarah Kolej Komuniti Temerloh",
    portrait: true,
    img: "/certificates/ipec26-anugerah-gangsa.png"
  },
  {
    title: "Spec-Driven Development dengan Kiro",
    issuer: "Dicoding Indonesia",
    category: "AI Dev",
    date: "2026",
    issueDate: "15 Oktober 2026",
    validUntil: "15 Okt 2029",
    credentialId: "JMZVL35OOXN9",
    duration: "10 jam",
    link: "https://www.dicoding.com/certificates/JMZVL35OOXN9",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVL35OOXN9",
    img: "/certificates/kiro-spec-driven-development.png"
  }
];

export const DATA = {
  // --- 1. Profil Utama & Hero ---
  brand: "Ayub",
  name: "Ayub Wicaksono",
  role: "Web Developer.",
  // Daftar peran yang bergantian diketik halus di Hero (boleh diisi 1 atau lebih)
  roles: ["Software Developer.", "Software Testing.", "UI/UX."],
  sub: "Penguji perangkat lunak yang berfokus pada kode bersih, bebas bug, dan pengalaman pengguna yang mulus.",
  photo: "", // Contoh: "assets/foto-profil.jpg" atau URL gambar potret 3:4
  cv: "#",   // Contoh: "assets/CV-Nama-Anda.pdf"
  email: "ayubwicak27@gmail.com",

  // --- 2. Bagian Tentang Saya & 3 Angka Ringkasan ---
  aboutTitle: "Software Developer independen yang kreatif",
  about: "Saya adalah Software Developer yang berfokus pada pengembangan aplikasi web menggunakan HTML, CSS, JavaScript, React, Tailwind CSS, Bootstrap, PHP, Laravel, dan Python. Saya memiliki pengetahuan dalam REST API, MySQL, dan PostgreSQL, serta sedang mendalami Software Testing & Quality Assurance. Saya senang mempelajari teknologi baru, menyelesaikan tantangan teknis, dan mengembangkan solusi digital yang fungsional serta mudah digunakan.",
  stats: [
    { value: 1, suffix: "+", label: "Tahun Pengalaman" },
    { value: 6, suffix: "+", label: "Proyek GitHub" },
    { value: CERTIFICATES.length, suffix: "",  label: "Sertifikasi & Penghargaan" }
  ],
  aboutFacts: {
    "Pendekatan kerja": "Memahami masalah terlebih dahulu, lalu menyusun solusi yang terstruktur dan mudah dipelihara.",
    "Ketertarikan profesional": "Pengembangan frontend modern, desain antarmuka, dan optimasi performa web.",
    "Kepribadian": "Komunikatif, senang belajar hal baru, dan menikmati kolaborasi kreatif."
  },

  // --- 3. Bagian Karya Terbaru (KHUSUS PROYEK GITHUB) ---
  /*
    CARA MENAMBAH PROYEK GITHUB BARU:
    Salin template berikut dan tempel ke dalam array `projects: [ ... ]`:

    {
      name: "nama-repositori-anda",
      github: "https://github.com/ayubwicak/nama-repositori-anda",
      lang: "JavaScript",             // Bahasa utama (otomatis menjadi tombol filter)
      desc: "Deskripsi singkat proyek yang tampil di kartu.",
      stars: 12,
      forks: 3,
      live: "https://demo.anda.com",  // Kosongkan "" jika tidak ada live demo
      problem: "Latar belakang masalah atau kebutuhan yang ingin diselesaikan.",
      process: "Langkah desain, arsitektur, dan teknologi yang digunakan.",
      role: "Peran dan tanggung jawab Anda dalam proyek ini.",
      result: "Hasil akhir, peningkatan performa, atau dampak proyek."
    },
  */
  projects: [
    {
      name: "QR-TRACE-Digital-Product-Traceability-System",
      github: "https://github.com/ayubwicak/QR-TRACE-Digital-Product-Traceability-System",
      lang: "JavaScript",
      desc: "Sistem ketertelusuran produk digital untuk UMKM produk kayu: mencatat asal kayu, pemasok, tahapan produksi, dan mutu, lalu menampilkannya lewat paspor digital dan label QR.",
      stars: 0,
      forks: 0,
      live: "",
      problem: "UMKM produk kayu sulit membuktikan asal bahan baku dan proses pengerjaan kepada pembeli. Proyek ini dibuat untuk menghadirkan ketertelusuran dari bahan baku hingga produk jadi, sehingga produk lebih dipercaya dan mendukung kelestarian.",
      process: "Membangun backend Express + PostgreSQL dan dashboard React (Vite). Data mencakup spesies dan asal kayu, pemasok, lot bahan, tahapan pengeringan dan pengerjaan, skor pemeriksaan mutu, rating karbon, dan tanda tangan hash per batch, dengan buku besar audit (audit trail) untuk setiap perubahan data. REST API menyediakan operasi lengkap untuk batch dan log audit.",
      role: "Full-Stack Developer",
      result: "Sistem paspor digital dengan label QR untuk setiap batch produk, dashboard operator, dan audit log tercatat di PostgreSQL. Meraih Anugerah Gangsa (Juara 3) di IPEC'26 Penyertaan Antarabangsa, Kolej Komuniti Temerloh, Oktober 2026."
    },
    {
      name: "rental-ps-system",
      github: "https://github.com/ayubwicak/rental-ps-system",
      lang: "JavaScript",
      desc: "RentalKu, sistem penyewaan PlayStation berbasis Node.js + React untuk mengelola unit, sesi sewa, transaksi, reservasi, dan member dalam satu aplikasi.",
      stars: 0,
      forks: 0,
      live: "",
      problem: "Pengelolaan rental PlayStation yang masih manual mudah menimbulkan salah hitung durasi dan tarif, serta sulit melacak transaksi, reservasi, dan pelanggan tetap. Proyek ini dibuat agar operasional kasir lebih rapi, akurat, dan terdokumentasi.",
      process: "Membangun backend Node.js + Express + SQLite dan frontend React (Vite) + Tailwind yang dijalankan dalam satu server. Fitur mencakup manajemen unit dan tarif, sesi berjalan dengan add-on snack/minuman, transaksi, reservasi, member dengan poin loyalti, serta login aman berbasis cookie httpOnly, pembatasan percobaan login, dan audit log aktivitas.",
      role: "Full-Stack Developer",
      result: "Aplikasi manajemen rental yang bisa dijalankan dengan satu perintah (npm start), dilengkapi dashboard dengan grafik, integrasi bot WhatsApp, dan siap di-deploy ke VPS."
    },
    {
      name: "platform-zero-burning",
      github: "https://github.com/ayubwicak/platform-zero-burning",
      lang: "JavaScript",
      desc: "Platform insentif zero burning untuk pencegahan karhutla: petani yang mengolah lahan tanpa membakar mengunggah foto berlokasi GPS, lalu diverifikasi berlapis oleh komunitas dan petugas untuk memperoleh insentif.",
      stars: 0,
      forks: 0,
      live: "",
      problem: "Kebakaran hutan dan lahan sering dipicu pembakaran untuk membuka lahan pertanian. Proyek ini memberi petani insentif berupa benih, pupuk, atau alat pertanian agar beralih ke pengolahan lahan tanpa bakar, dengan bukti yang bisa diverifikasi.",
      process: "Membangun monorepo dengan backend Node.js + Express + PostgreSQL, dashboard web React + Vite + Tailwind, dan skeleton aplikasi mobile Flutter. Fitur utama: registrasi dan login berbasis peran (petani, petugas, admin), pengelolaan lahan, unggah foto progres, verifikasi komunitas dan petugas, klaim insentif, katalog dan stok, distribusi, serta audit log.",
      role: "Full-Stack Developer",
      result: "Backend API inti dan dashboard web sudah terhubung dan berjalan, termasuk manajemen pengguna dan hak akses, pengelolaan katalog, serta audit log admin. Pengembangan berikutnya: aplikasi mobile, pengujian otomatis, dan deployment produksi."
    },
    {
      name: "freshmeat-ai",
      github: "https://github.com/ayubwicak/freshmeat-ai",
      lang: "JavaScript",
      desc: "Sistem inspeksi kesegaran daging berbasis computer vision (CIELAB + GLCM) dengan estimasi masa simpan, dilengkapi dashboard React dan backend FastAPI.",
      stars: 0,
      forks: 0,
      live: "",
      problem: "Penilaian kesegaran daging umumnya masih bergantung pada pengamatan manual yang subjektif, sehingga sulit mendeteksi daging menurun kualitas, gelonggongan, atau busuk secara konsisten. Proyek ini membantu menghasilkan penilaian yang objektif dan terdokumentasi.",
      process: "Membangun pipeline computer vision dengan segmentasi ROI sadar-marbling, ekstraksi fitur warna CIELAB dan tekstur GLCM, serta aturan penolakan otomatis untuk estimasi TVB-N, grade A/B/Reject, dan masa simpan. Disusun sebagai monorepo dengan frontend React 19 + Vite + Tailwind, backend FastAPI + OpenCV + SQLite, pengujian otomatis (pytest), CI, dan deployment Docker/Nginx.",
      role: "Full-Stack Developer & Computer Vision Engineer",
      result: "Aplikasi inspeksi lengkap dengan dashboard interaktif, riwayat audit tersimpan, ekspor JSON, dan cetak sertifikat. Tersedia analisis lokal di browser sebagai cadangan jika server tidak aktif."
    },
    {
      name: "exam-cheating-detection-ml",
      github: "https://github.com/ayubwicak/exam-cheating-detection-ml",
      lang: "Python",
      desc: "Sistem machine learning untuk mendeteksi indikasi kecurangan pada ujian secara otomatis, sebagai alat bantu pengawas untuk menjaga integritas penilaian.",
      stars: 0,
      forks: 0,
      live: "",
      problem: "Pengawasan ujian secara manual memakan banyak tenaga dan sulit menjangkau banyak peserta sekaligus. Proyek ini dibuat untuk membantu pengawas menandai perilaku mencurigakan lebih cepat dan konsisten.",
      process: "Mengumpulkan dan membersihkan data, melatih serta membandingkan beberapa model klasifikasi, lalu mengevaluasinya pada data uji yang terpisah agar hasilnya tidak bias.",
      role: "Machine Learning Engineer",
      result: "Model yang mampu membedakan perilaku wajar dan mencurigakan, dievaluasi pada data yang belum pernah dilihat model, dan siap dikembangkan lebih lanjut."
    },
    {
      name: "fake-news-detector",
      github: "https://github.com/ayubwicak/fake-news-detector",
      lang: "Python",
      desc: "Aplikasi web machine learning end-to-end yang mengklasifikasikan artikel berita sebagai Real atau Fake dengan akurasi 97,52%, dilengkapi Explainable AI dan loop umpan balik manusia.",
      stars: 0,
      forks: 0,
      live: "",
      problem: "Berita palsu menyebar cepat dan sulit diverifikasi secara manual. Proyek ini dibuat untuk membantu proses verifikasi awal secara otomatis, dengan hasil yang bisa dijelaskan dan diaudit.",
      process: "Melatih model pada 40.449 artikel berita dengan pipeline bebas kebocoran data (split dulu, TF-IDF dan SMOTETomek hanya pada data latih), membandingkan beberapa model lewat cross-validation, lalu membangun REST API Flask dan dashboard web dengan 19 pengujian otomatis.",
      role: "Machine Learning Engineer & Full-Stack Developer",
      result: "Akurasi 97,52% dan ROC-AUC 0,9948 pada 8.091 artikel uji, dengan penjelasan token berpengaruh (XAI) di setiap prediksi dan siap deploy lewat Docker."
    }
  ],

  // --- 4. Bagian Sertifikat (GALERI 4:3 + LIGHTBOX ZOOM) ---
  /*
    CARA MENAMBAH SERTIFIKAT BARU:
    1. Simpan gambar sertifikat (.jpg / .png / .webp) di folder lokal proyek
       Anda (contoh: "assets/sertifikat-dicoding.jpg") atau gunakan URL gambar.
    2. Salin template berikut dan tempel di dalam array `certificates: [ ... ]`:

    {
      title: "Judul Lengkap Sertifikat",
      issuer: "Nama Penyelenggara (Dicoding, Coursera, Google, dll.)",
      category: "Web Dev",           // Kategori (otomatis menjadi tombol filter)
      date: "November 2025",
      link: "https://link-verifikasi-sertifikat.com", // Kosongkan "" jika tidak ada
      img: "assets/sertifikat-1.jpg" // Kosongkan "" untuk tampilan kartu editorial rapi
    },
  */
  certificates: CERTIFICATES,

  // --- 5. Bagian Keahlian ---
  skillsTitle: "Membangun dan menguji perangkat lunak yang andal",
  skillsText: "Keahlian yang saya pakai langsung dalam proyek nyata, dari antarmuka web, API, dan basis data hingga pengujian dan machine learning.",
  skillGroups: [
    {
      title: "Frontend",
      chips: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap"],
      usedIn: [
        { name: "Platform Zero Burning", repo: "platform-zero-burning" },
        { name: "Rental PS System", repo: "rental-ps-system" },
        { name: "FreshMeat AI", repo: "freshmeat-ai" }
      ]
    },
    {
      title: "Backend & API",
      chips: ["Node.js", "Express", "PHP", "Laravel", "Python", "FastAPI", "REST API"],
      usedIn: [
        { name: "Platform Zero Burning", repo: "platform-zero-burning" },
        { name: "Rental PS System", repo: "rental-ps-system" },
        { name: "FreshMeat AI", repo: "freshmeat-ai" },
        { name: "QR TRACE", repo: "QR-TRACE-Digital-Product-Traceability-System" }
      ]
    },
    {
      title: "Database",
      chips: ["PostgreSQL", "MySQL", "SQLite"],
      usedIn: [
        { name: "QR TRACE", repo: "QR-TRACE-Digital-Product-Traceability-System" },
        { name: "Platform Zero Burning", repo: "platform-zero-burning" },
        { name: "Rental PS System", repo: "rental-ps-system" },
        { name: "FreshMeat AI", repo: "freshmeat-ai" }
      ]
    },
    {
      title: "Software Testing & QA",
      chips: ["Software Testing", "Quality Assurance", "pytest", "Pengujian API"],
      usedIn: [
        { name: "FreshMeat AI", repo: "freshmeat-ai" },
        { name: "Fake News Detector (pengujian otomatis)", repo: "fake-news-detector" }
      ]
    },
    {
      title: "AI & Machine Learning",
      chips: ["Python", "OpenCV", "Computer Vision", "scikit-learn"],
      usedIn: [
        { name: "Fake News Detector", repo: "fake-news-detector" },
        { name: "FreshMeat AI", repo: "freshmeat-ai" },
        { name: "Exam Cheating Detection", repo: "exam-cheating-detection-ml" }
      ]
    },
    {
      title: "Tools & Deployment",
      chips: ["Git", "GitHub", "Docker", "Vite"],
      usedIn: [{ name: "Semua proyek" }]
    }
  ],
  methods: ["Responsive design", "Agile", "Kolaborasi tim"],

  // --- 6. Bagian Resume (Pengalaman & Pendidikan) ---
  experience: [
    {
      when: "Agustus 2026 – Desember 2026",
      what: "Magang di KWaS",
      where: "",
      desc: "Menjalani program magang di perusahaan KWaS, menerapkan keahlian pengembangan perangkat lunak dalam lingkungan kerja profesional."
    },
    {
      when: "Maret 2023 – September 2023",
      what: "Pelayanan & Produksi Percetakan, Jan_D Print",
      where: "",
      desc: "Melayani pelanggan dan mengerjakan pesanan cutting sticker, stiker umum, stempel, akrilik, poster, serta banner/MMT, dari penerimaan pesanan hingga hasil jadi."
    }
  ],
  education: [
    {
      when: "2024 – sekarang",
      what: "S1 Informatika",
      where: "",
      desc: "Universitas Teknologi Digital Indonesia (UTDI). Sedang menempuh studi dengan fokus pada pengembangan perangkat lunak."
    },
    {
      when: "2021 – 2024",
      what: "SMKN 1 Jatiroto, Rekayasa Perangkat Lunak (RPL)",
      where: "",
      desc: "Menempuh pendidikan menengah kejuruan dengan jurusan Rekayasa Perangkat Lunak."
    },
    {
      when: "2022 – 2023",
      what: "Kelas Industri Crocodic, Web Developer",
      where: "",
      desc: "Program bootcamp kelas industri hasil kerja sama sekolah dengan perusahaan Crocodic. Mengikuti kelas Web Developer dan dinyatakan lulus bootcamp tingkat junior."
    }
  ],

  // --- 7. Bagian Kutipan tokoh dunia software ---
  testimonials: [
    {
      q: "Bicara itu murah. Tunjukkan kodenya.",
      n: "Linus Torvalds",
      r: "Pencipta Linux",
      initial: "L",
      img: ""
    },
    {
      q: "Pengujian bisa menunjukkan adanya bug, tetapi tidak pernah bisa membuktikan bahwa bug itu tidak ada.",
      n: "Edsger W. Dijkstra",
      r: "Ilmuwan komputer",
      initial: "E",
      img: ""
    },
    {
      q: "Buat agar berfungsi, buat agar benar, lalu buat agar cepat.",
      n: "Kent Beck",
      r: "Pencetus Extreme Programming",
      initial: "K",
      img: ""
    }
  ],

  // --- 8. Bagian Kontak ---
  contact: [
    {
      label: "Email",
      value: "ayubwicak27@gmail.com",
      href: "mailto:ayubwicak27@gmail.com",
      ariaLabel: "Kirim email ke Ayub",
      title: "Kirim email ke Ayub"
    },
    {
      label: "GitHub",
      value: "github.com/ayubwicak",
      href: "https://github.com/ayubwicak",
      ariaLabel: "Buka GitHub Ayub",
      title: "Buka GitHub Ayub"
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ayub-wicaksono-474394402/",
      href: "https://www.linkedin.com/in/ayub-wicaksono-474394402/",
      ariaLabel: "Buka LinkedIn Ayub",
      title: "Buka LinkedIn Ayub"
    }
  ]
};
/* ======================== AKHIR BAGIAN EDIT DATA ========================= */
