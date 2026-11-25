# Portofolio Ayub Wicaksono

Portofolio pribadi berbasis **React + Vite** yang menampilkan profil, proyek GitHub, sertifikat, keahlian, resume, testimoni, dan kontak dalam satu halaman (*single-page portfolio*). Seluruh konten diatur dari satu file data, sehingga bisa diperbarui tanpa mengubah komponen.

Repository: https://github.com/ayubwicak/portofolio-v2

---

## Daftar isi

- [Teknologi](#teknologi)
- [Menjalankan proyek](#menjalankan-proyek)
- [Struktur direktori](#struktur-direktori)
- [Bagian-bagian halaman](#bagian-bagian-halaman)
- [Cara mengubah data](#cara-mengubah-data)
- [Status data saat ini](#status-data-saat-ini)
- [Kustomisasi tampilan](#kustomisasi-tampilan)
- [Catatan](#catatan)

---

## Teknologi

| Kebutuhan | Teknologi |
|---|---|
| UI | React 19 |
| Build tool | Vite 8 |
| Plugin | `@vitejs/plugin-react` |
| Styling | CSS murni (`src/index.css`) — tanpa framework CSS |
| Font | Poppins & Roboto (Google Fonts) |
| Bahasa | JavaScript (ESM), JSX |

Tidak ada library UI, animasi, atau state management tambahan. Efek dan animasi dibuat dengan CSS dan API browser standar (Canvas, IntersectionObserver, `matchMedia`).

---

## Menjalankan proyek

```bash
# 1. Pasang dependency
npm install

# 2. Mode pengembangan (http://localhost:5173)
npm run dev

# 3. Build produksi → folder dist/
npm run build

# 4. Lihat hasil build secara lokal
npm run preview
```

Hasil build ada di folder `dist/` dan siap di-deploy ke hosting statis (GitHub Pages, Netlify, Vercel, dll.).

---

## Struktur direktori

```
portfolio-v2/
├── index.html              # HTML dasar, meta tag, dan <title>
├── vite.config.js          # Konfigurasi Vite
├── package.json            # Script & dependency
├── public/                 # Aset statis (foto, CV, dll.)
└── src/
    ├── main.jsx            # Entry point React
    ├── App.jsx             # Merangkai semua section & efek global
    ├── data.js             # ⬅️ SATU-SATUNYA sumber konten
    ├── index.css           # Seluruh gaya & animasi
    ├── shared.jsx          # Ikon, toast, hook bersama
    └── components/
        ├── Nav.jsx          # Navbar + menu mobile
        ├── Hero.jsx         # Hero + partikel kanvas + teks ketik
        ├── About.jsx        # Tentang saya + statistik + kartu fakta
        ├── Portfolio.jsx    # Proyek GitHub + filter bahasa
        ├── Certificates.jsx # Galeri sertifikat + filter kategori
        ├── Skills.jsx       # Keahlian, tools, dan metode kerja
        ├── Resume.jsx       # Pengalaman, pendidikan, sertifikasi
        ├── Testimonials.jsx # Slider testimoni
        ├── CTA.jsx          # Ajakan menghubungi
        ├── Contact.jsx      # Kontak + salin email + form
        ├── Footer.jsx       # Footer
        ├── Modal.jsx        # Detail proyek & lightbox sertifikat
        └── CertThumb.jsx    # Tampilan kartu sertifikat
```

---

## Bagian-bagian halaman

Berikut urutan section sesuai `App.jsx`:

| # | Section | ID | Isi utama |
|---|---|---|---|
| 1 | Navbar | `navbar` | Navigasi anchor, menu mobile, progress bar scroll |
| 2 | Hero | `home` | Nama outline, peran bergantian efek ketik, deskripsi, tombol proyek & CV, background partikel interaktif |
| 3 | Tentang | `about` | Judul, paragraf rata kanan-kiri, 3 statistik, 3 kartu fakta, dekorasi lingkaran |
| 4 | Proyek | `portfolio` | Kartu proyek GitHub, filter bahasa, jumlah star/fork, modal detail |
| 5 | Sertifikat | `certificates` | Galeri 4:3, filter kategori, lightbox zoom |
| 6 | Keahlian | `skills` | Progress bar skill, chip tools, metode kerja |
| 7 | Resume | `resume` | Pengalaman, pendidikan, sertifikasi |
| 8 | Testimoni | `testi` | Slider dengan progress bar, dot, dan drag |
| 9 | CTA | — | Ajakan bekerja sama |
| 10 | Kontak | `contact` | Daftar kontak, tombol salin email, form pesan |
| 11 | Footer | — | Hak cipta |

Efek global yang dikelola di `App.jsx`: judul halaman dinamis, *scroll reveal* (`.rv`) via `IntersectionObserver`, navbar solid saat scroll, progress bar, dan efek ripple pada tombol `.btn`.

---

## Cara mengubah data

Semua teks diubah di **`src/data.js`** pada objek `DATA`. Komponen hanya membaca data ini.

### Profil & hero

```js
brand: "Ayub",
name: "Ayub Wicaksono",
role: "Web Developer.",              // fallback jika roles kosong
roles: ["Software Developer.", "Software Testing.", "UI/UX."], // efek ketik
sub: "Penguji perangkat lunak ...",
photo: "",   // isi path gambar potret 3:4, mis. "/foto-saya.jpg"
cv: "#",     // isi path PDF, mis. "/cv-ayub-wicaksono.pdf"
```

- `roles` boleh berisi satu atau beberapa peran. Jika hanya satu, efek ketik tidak berjalan dan langsung menampilkan peran tersebut.
- Tombol **Unduh CV** akan memakai `DATA.cv`. Selama nilainya masih `#`, tombol menampilkan toast pengingat.
- `photo` kosong akan menampilkan inisial nama sebagai placeholder.

### Statistik & tentang

```js
stats: [
  { value: 1, suffix: "+", label: "Tahun Pengalaman" },
  { value: 6, suffix: "+", label: "Proyek GitHub" },
  { value: 4, suffix: "",  label: "Sertifikasi Resmi" }
]
```

`aboutFacts` adalah objek `{ "Judul kartu": "Isi kartu" }` — jumlah kartu mengikuti jumlah entri.

### Proyek GitHub

Array `DATA.projects`. Tiap item memiliki:

| Field | Fungsi |
|---|---|
| `name` | Nama repositori |
| `github` | URL repositori |
| `lang` | Bahasa utama → otomatis jadi tombol filter |
| `desc` | Deskripsi singkat di kartu |
| `stars`, `forks` | Angka yang ditampilkan |
| `live` | URL demo, kosongkan `""` jika tidak ada |
| `problem`, `process`, `role`, `result` | Konten modal detail |

### Sertifikat

Array `DATA.certificates`. Tiap item: `title`, `issuer`, `category` (jadi filter), `date`, `link`, dan `img`. Kosongkan `img` untuk tampilan kartu editorial tanpa gambar.

### Keahlian, resume, testimoni, kontak

- `skills`: `{ n: "Nama skill", p: 90 }` — `p` adalah persentase progress bar.
- `tools`, `methods`: array string untuk chip.
- `experience`, `education`, `certs`: array `{ when, what, where, desc }`.
- `testimonials`: array `{ q, n, r, img }`. Jika kosong, section testimoni tidak dirender.
- `contact`: array `{ label, icon, value, href }`. Tautan `http(s)` dibuka di tab baru; `mailto:` dan `tel:` tidak.

Template lengkap dan komentar petunjuk sudah tersedia langsung di dalam `src/data.js`.

---

## Status data saat ini

Data yang **sudah diisi**:

- Nama, brand, peran efek ketik, deskripsi hero
- Judul dan paragraf "Tentang Saya"
- Statistik (`1+`, `6+`, `4`)
- Daftar skill, tools, dan metode kerja

Data yang **masih placeholder** dan perlu diganti sebelum dipakai secara final:

| Bagian | Field | Nilai sementara |
|---|---|---|
| Foto profil | `photo` | kosong (menampilkan inisial) |
| File CV | `cv` | `#` |
| Proyek GitHub | `projects` | 6 proyek contoh |
| Sertifikat | `certificates` | 4 sertifikat contoh |
| Persentase skill | `skills[].p` | angka contoh (90/80/70) |
| Pengalaman & pendidikan | `experience`, `education`, `certs` | contoh |
| Testimoni | `testimonials` | "Nama Klien", "Nama Rekan" |
| Kontak | `contact` | `email@contoh.com`, `github.com/username`, `linkedin.com/in/username` |
| Meta halaman | `index.html` | "Portofolio — Web Developer" |

> Catatan: judul halaman saat runtime diambil dari `DATA.name + ' – ' + DATA.role`, jadi akan berubah otomatis mengikuti data.

---

## Kustomisasi tampilan

- **Warna, tipografi, layout, dan animasi**: semuanya ada di `src/index.css`. Variabel warna didefinisikan di bagian atas file (`:root`).
- **Responsif**: breakpoint yang digunakan antara lain `1100px`, `920px`, `768px`, `640px`, dan `580px`.
- **Aksesibilitas gerak**: `prefers-reduced-motion: reduce` mematikan animasi dan transisi.
- **Bahasa dokumen**: `lang="id"` pada `<html>` (penting untuk hyphenasi paragraf).

---

## Catatan

- Proyek ini bukan repository git sebelum commit awal. Remote sudah terhubung ke `git@github.com:ayubwicak/portofolio-v2.git` pada branch `main`.
- `node_modules/` dan `dist/` tidak termasuk repository (terdaftar di `.gitignore`).
- Untuk memperbarui website setelah mengubah data:

```bash
git add .
git commit -m "Update konten portofolio"
git push
```
