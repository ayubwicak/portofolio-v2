/* ============================================================================
   PUSAT PENGATURAN DATA PORTOFOLIO (EDIT LANGSUNG DI SINI)
   Semua konten halaman — termasuk daftar Proyek GitHub dan Sertifikat —
   dikelola langsung dari kode ini agar aman dan tidak bisa diubah pengunjung.
============================================================================ */
export const DATA = {
  // --- 1. Profil Utama & Hero ---
  brand: "Ayub",
  name: "Ayub Wicaksono",
  role: "Web Developer.",
  // Daftar peran yang bergantian diketik halus di Hero (boleh diisi 1 atau lebih)
  roles: ["Software Developer.", "Software Testing."],
  sub: "Saya membangun website yang cepat, rapi, dan mudah dipakai untuk bisnis dan komunitas.",
  photo: "", // Contoh: "assets/foto-profil.jpg" atau URL gambar potret 3:4
  cv: "#",   // Contoh: "assets/CV-Nama-Anda.pdf"

  // --- 2. Bagian Tentang Saya & 3 Angka Ringkasan ---
  aboutTitle: "Web Developer independen yang kreatif",
  about: "Tulis ringkasan latar belakang Anda: dari mana Anda berasal, apa yang membuat Anda tertarik pada bidang ini, dan apa yang ingin Anda capai bersama klien atau tim.",
  stats: [
    { value: 3, suffix: "+", label: "Tahun Pengalaman" },
    { value: 6, suffix: "+", label: "Proyek GitHub" },
    { value: 4, suffix: "",  label: "Sertifikasi Resmi" }
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
      github: "https://github.com/username/nama-repositori-anda",
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
      name: "toko-online-modern",
      github: "https://github.com/username/toko-online-modern",
      lang: "JavaScript",
      desc: "Aplikasi katalog toko online responsif dengan keranjang belanja dinamis, filter produk, dan integrasi checkout WhatsApp.",
      stars: 24,
      forks: 6,
      live: "",
      problem: "UMKM membutuhkan katalog digital ringan tanpa biaya langganan platform e-commerce bulanan.",
      process: "Merancang antarmuka mobile-first, state keranjang belanja dengan Vanilla JS, dan format pesan checkout otomatis.",
      role: "Full-Stack Developer & UI Designer",
      result: "Waktu muat halaman di bawah 1 detik dan mempermudah pelanggan memesan langsung lewat WhatsApp."
    },
    {
      name: "dashboard-analitik-ui",
      github: "https://github.com/username/dashboard-analitik-ui",
      lang: "React",
      desc: "Dashboard pemantauan metrik harian berbasis React dengan komponen grafik modular, tabel interaktif, dan performa ringan.",
      stars: 41,
      forks: 11,
      live: "",
      problem: "Tim operasional kesulitan membaca laporan harian yang tersebar di beberapa file spreadsheet terpisah.",
      process: "Membangun komponen React reusable, filter rentang tanggal, dan visualisasi data yang responsif.",
      role: "Frontend Engineer",
      result: "Mempercepat proses pemantauan KPI harian tim hingga 50% lebih efisien."
    },
    {
      name: "api-manajemen-inventori",
      github: "https://github.com/username/api-manajemen-inventori",
      lang: "TypeScript",
      desc: "REST API manajemen stok gudang menggunakan Node.js & TypeScript lengkap dengan autentikasi JWT dan dokumentasi Swagger.",
      stars: 19,
      forks: 4,
      live: "",
      problem: "Pencatatan stok keluar-masuk manual sering menimbulkan selisih data antar cabang gudang.",
      process: "Menyusun skema database relasional, validasi input ketat dengan TypeScript, dan endpoint terstandar.",
      role: "Backend Developer",
      result: "Menghilangkan duplikasi pencatatan stok serta memudahkan integrasi dengan aplikasi web dan mobile."
    },
    {
      name: "sistem-booking-klinik",
      github: "https://github.com/username/sistem-booking-klinik",
      lang: "PHP",
      desc: "Aplikasi web penjadwalan kunjungan pasien dengan manajemen antrean real-time dan laporan rekap otomatis.",
      stars: 15,
      forks: 5,
      live: "",
      problem: "Antrean pendaftaran pasien di meja resepsionis menumpuk pada jam sibuk pagi hari.",
      process: "Membangun sistem reservasi slot dokter, notifikasi jadwal, dan panel admin klinik berbasis PHP.",
      role: "Web Developer",
      result: "Mengurangi waktu tunggu pendaftaran pasien hingga 40% dan merapikan arsip kunjungan."
    },
    {
      name: "otomatisasi-rekap-csv",
      github: "https://github.com/username/otomatisasi-rekap-csv",
      lang: "Python",
      desc: "Skrip CLI Python untuk membersihkan, menggabungkan, dan mengekspor laporan penjualan CSV menjadi ringkasan Excel.",
      stars: 32,
      forks: 9,
      live: "",
      problem: "Penggabungan puluhan file laporan transaksi bulanan secara manual memakan waktu berjam-jam dan rawan salah ketik.",
      process: "Membuat pipeline pembersihan data otomatis menggunakan Python dengan validasi kolom dan ekspor terformat.",
      role: "Creator & Maintainer",
      result: "Memangkas proses rekap bulanan dari 3 jam menjadi kurang dari 10 detik."
    },
    {
      name: "starter-landing-page",
      github: "https://github.com/username/starter-landing-page",
      lang: "JavaScript",
      desc: "Template landing page editorial yang cepat, ramah SEO, dan mudah dikustomisasi untuk portofolio maupun profil bisnis.",
      stars: 28,
      forks: 7,
      live: "",
      problem: "Banyak template portofolio terlalu berat dengan dependensi besar sehingga skor Lighthouse rendah.",
      process: "Merancang sistem grid responsif ringan tanpa framework berat, animasi halus, dan struktur kode tunggal yang rapi.",
      role: "Author & Designer",
      result: "Mencapai skor performa dan aksesibilitas tinggi di perangkat desktop maupun mobile."
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
  certificates: [
    {
      title: "Belajar Membuat Front-End Web untuk Pemula",
      issuer: "Dicoding Indonesia",
      category: "Web Dev",
      date: "2024",
      link: "",
      img: ""
    },
    {
      title: "Google UX Design Professional Certificate",
      issuer: "Coursera / Google",
      category: "UI/UX",
      date: "2024",
      link: "",
      img: ""
    },
    {
      title: "Cloud Practitioner Essentials (AWS)",
      issuer: "Dicoding & AWS",
      category: "Cloud",
      date: "2023",
      link: "",
      img: ""
    },
    {
      title: "Data Analytics & Visualization Foundations",
      issuer: "Coursera",
      category: "Data",
      date: "2023",
      link: "",
      img: ""
    }
  ],

  // --- 5. Bagian Keahlian ---
  skillsTitle: "Saya punya keahlian kuat di pengembangan web",
  skillsText: "Ringkasan singkat tentang teknologi, perangkat, dan cara kerja yang biasa Anda gunakan dalam proyek.",
  skills: [
    { n: "Web Development", p: 90 },
    { n: "UI Design", p: 80 },
    { n: "Backend / API", p: 70 }
  ],
  tools: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Git", "Figma"],
  methods: ["Responsive design", "Agile", "Kolaborasi tim"],

  // --- 6. Bagian Resume (Pengalaman & Pendidikan) ---
  experience: [
    {
      when: "2024 – sekarang",
      what: "Web Developer",
      where: "Perusahaan atau agensi digital",
      desc: "Membangun antarmuka web responsif, meningkatkan kecepatan muat halaman, dan bekerja sama dengan tim desain."
    },
    {
      when: "2022 – 2024",
      what: "Freelance Web Developer",
      where: "Proyek lepas",
      desc: "Menyelesaikan berbagai website profil perusahaan, landing page, dan katalog produk untuk klien UMKM."
    }
  ],
  education: [
    {
      when: "2020 – 2024",
      what: "S1 Teknik Informatika",
      where: "Nama kampus",
      desc: "Fokus pada rekayasa perangkat lunak dan pengembangan aplikasi web."
    }
  ],
  certs: [
    {
      when: "2023",
      what: "Bootcamp Full-Stack Web Development",
      where: "Penyelenggara sertifikasi",
      desc: "Pelatihan intensif pengembangan aplikasi web modern dari frontend hingga REST API."
    }
  ],

  // --- 7. Bagian Testimoni ---
  testimonials: [
    {
      q: "Pengerjaan sangat rapi, komunikatif, dan hasilnya sesuai harapan. Website kami kini jauh lebih cepat dan mudah diakses dari ponsel.",
      n: "Nama Klien",
      r: "Pemilik Bisnis",
      img: ""
    },
    {
      q: "Sangat responsif saat revisi dan memberikan banyak masukan berguna untuk pengalaman pengguna.",
      n: "Nama Rekan",
      r: "Project Manager",
      img: ""
    }
  ],

  // --- 8. Bagian Kontak ---
  contact: [
    { label: "Email", value: "email@contoh.com", href: "mailto:email@contoh.com" },
    { label: "GitHub", value: "github.com/username", href: "https://github.com/" },
    { label: "LinkedIn", value: "linkedin.com/in/username", href: "https://linkedin.com/" }
  ]
};
/* ======================== AKHIR BAGIAN EDIT DATA ========================= */
