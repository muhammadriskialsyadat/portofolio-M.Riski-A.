// ─────────────────────────────────────────────────────────────
//  Portfolio Data — Muhammad Riski Alsyadat
//  Edit file ini untuk mengupdate konten website
// ─────────────────────────────────────────────────────────────

// ── Personal Info ─────────────────────────────────────────────
export const personalInfo = {
  name: "Muhammad Riski Alsyadat",
  title: "Full Stack Developer",
  subtitle: "Fresh Graduate · Back End · Fullstack",
  location: "Depok, Indonesia 16518",
  email: "muhammadriskialsyadat@gmail.com",
  phone: "085156344711",
  linkedIn: "https://www.linkedin.com/in/muhammad-riski-alsyadat-547733295/", // ganti dengan URL LinkedIn kamu
  github: "https://github.com/muhammadriskialsyadat",    // ganti dengan URL GitHub kamu
  cvUrl: "/assets/CV_Muhammad_Riski_Alsyadat.pdf",
  profileImage: "/assets/profile.jpg",
  bio: "Fresh Graduate Sistem Informasi Universitas Gunadarma yang antusias dalam dunia pengembangan perangkat lunak. Terbiasa bekerja dalam tim, senang belajar hal baru, dan berusaha memberikan kontribusi terbaik di setiap proyek. Memiliki pengalaman magang sebagai Back End Developer menggunakan .NET Core Web API, serta pernah mengerjakan proyek fullstack menggunakan Laravel 12 dengan Spatie Permissions dan Filament Admin Panel v3. Saat ini sedang aktif mencari kesempatan pertama untuk tumbuh dan berkembang bersama tim yang suportif.",
};

// ── Education ────────────────────────────────────────────────
export const education = [
  {
    institution: "Universitas Gunadarma",
    degree: "S1 – Sistem Informasi",
    gpa: "3.67",
    period: "2022 – 2026",
    location: "Depok, Indonesia",
  },
];

// ── Stats (highlight numbers di About section) ───────────────
export const stats = [
  { label: "IPK",           value: "3.67" },
  { label: "Proyek",        value: "3+"   },
  { label: "Pengalaman",    value: "1+"   },
  { label: "Sertifikasi",   value: "3+"   },
];

// ── Skills ───────────────────────────────────────────────────
export type SkillCategory = {
  category: string;
  icon: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Pemrograman & Web",
    icon: "code",
    skills: [
      "HTML", "CSS", "JavaScript", "PHP",
      "C#", "Laravel", "Blade", ".NET Core Web API",
      "Bootstrap", "Tailwind CSS", "Filament",
      "RESTful API", "Layering Structure", "Audit Trail", "OOP",
    ],
  },
  {
    category: "Basis Data",
    icon: "database",
    skills: ["MySQL", "PostgreSQL", "SQL Server", "Oracle"],
  },
  {
    category: "UI/UX Desain",
    icon: "design",
    skills: ["Figma", "Draw.io", "Canva"],
  },
  {
    category: "Alat & Teknologi",
    icon: "tools",
    skills: [
      "GitHub", "GitLab", "VS Code",
      "Postman", "Swagger", "Sourcetree",
      "Microsoft Office", "AI IDE",
    ],
  },
];

// ── Interpersonal Skills ──────────────────────────────────────
export const softSkills = [
  "Problem Solving & Berpikir Kritis",
  "Komunikasi dan Kolaborasi Tim",
  "Manajemen Waktu dan Penyelesaian Target",
  "Adaptif terhadap Teknologi Baru",
  "Teliti dan Bertanggung Jawab",
];

// ── Experience ────────────────────────────────────────────────
export type Experience = {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
  photos?: { src: string; alt: string; caption?: string }[];
};

export const experiences: Experience[] = [
  {
    company: "PT. Intikom Berlian Mustika",
    role: "Internship Web Developer",
    type: "Back End Developer",
    period: "September – Desember 2025",
    location: "Jakarta, Indonesia",
    description: [
      "Mengembangkan RESTful API menggunakan .NET Core Web API untuk website Recruitment pada divisi HRMS.",
      "Merancang struktur API endpoint sesuai kebutuhan sistem.",
      "Melakukan pengujian, debugging, dan dokumentasi API menggunakan Postman dan Swagger.",
      "Melakukan maintenance dan pengelolaan database menggunakan PostgreSQL.",
      "Berkolaborasi dengan tim Front End untuk integrasi API.",
      "Melakukan upload dokumen backend ke production menggunakan tools GitLab.",
    ],
    techStack: [".NET Core Web API", "PostgreSQL", "Postman", "Swagger", "GitLab", "C#"],
    photos: [
      {
        src: "/assets/FOTO_INTERN_INTIKOM_RAME.jpeg",
        alt: "Foto bersama tim magang PT. Intikom Berlian Mustika",
        caption: "Last Day Bersama Tim HRMS Intikom",
      },
      {
        src: "/assets/FOTO_INTERN_INTIKOM_SENDIRI.jpeg",
        alt: "Foto di depan kantor PT. Intikom Berlian Mustika",
        caption: "Di Kantor Head Office Intikom",
      },
    ],
  },
];

// ── Projects ──────────────────────────────────────────────────
export type Project = {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  details: string[];
  techStack: string[];
  badges: string[];
  image: string;        // thumbnail utama (gambar pertama)
  images?: { src: string; alt: string; label: string }[]; // gallery preview
  demoUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Sistem Manajemen Inventori & Kasir UMKM",
    subtitle: "Skripsi · Universitas Gunadarma",
    period: "Mei 2026 – Agustus 2026",
    description:
      "Sistem manajemen inventaris dan kasir yang saya kembangkan sebagai proyek skripsi untuk pelaku UMKM Kota Depok, dilengkapi notifikasi WhatsApp otomatis untuk peringatan stok rendah.",
    details: [
      "Mengembangkan sistem manajemen inventaris dan kasir secara end-to-end menggunakan Laravel 12 dan Filament Admin Panel v3.",
      "Mengimplementasikan sistem autentikasi dan manajemen hak akses berbasis role menggunakan Laravel Spatie Permissions.",
      "Mengintegrasikan notifikasi WhatsApp otomatis via Fonnte API untuk peringatan stok rendah secara real-time.",
      "Merancang database structure dan system flow menggunakan pendekatan Agile Scrum.",
      "Mendesain UI/UX yang intuitif untuk pengguna non-teknis di lingkungan operasional toko.",
    ],
    techStack: ["Laravel 12", "Filament v3", "Spatie Permissions", "Fonnte API", "MySQL", "Tailwind CSS"],
    badges: ["HKI", "Skripsi", "Agile Scrum"],
    image: "/assets/LOGIN_SKRIPSI.png",
    images: [
      { src: "/assets/LOGIN_SKRIPSI.png",    alt: "Login page Sistem Inventori UMKM", label: "Login Page" },
      { src: "/assets/DASHBOARD_SKRIPSI.png", alt: "Dashboard Sistem Inventori UMKM",  label: "Dashboard" },
    ],
  },
  {
    title: "Sistem Stock Management Cat",
    subtitle: "Penelitian Ilmiah · Heaven Spot Indo",
    period: "Juni – Agustus 2025",
    description:
      "Sistem manajemen stok kaleng cat yang saya kerjakan sebagai proyek penelitian ilmiah untuk Heaven Spot Indo, mencakup perancangan database, UI/UX, dan pengembangan fullstack.",
    details: [
      "Mengembangkan sistem manajemen stok kaleng cat secara end-to-end.",
      "Merancang database structure dan system flow berdasarkan diskusi langsung dengan client.",
      "Mendesain UI/UX untuk kemudahan penggunaan.",
      "Development backend dan frontend menggunakan Laravel dan Filament Admin Panel.",
      "Berhasil menghasilkan website dengan semua fitur berjalan baik setelah pengujian dan debugging.",
    ],
    techStack: ["Laravel", "Filament", "MySQL", "PHP", "Tailwind CSS"],
    badges: ["Penelitian Ilmiah", "Client Project"],
    image: "/assets/DASHBOARD_PI.png",
    images: [
      { src: "/assets/DASHBOARD_PI.png", alt: "Dashboard Stock Management Heaven Spot Indo", label: "Dashboard" },
    ],
  },
];

// ── Certifications ────────────────────────────────────────────
export type Certification = {
  title: string;
  issuer: string;
  category: string;
  icon: string;
  certNo?: string;
  year?: string;
  url?: string;
};

export const certifications: Certification[] = [
  {
    title: "Hak Kekayaan Intelektual (HKI)",
    issuer: "Kementerian Hukum RI",
    category: "Intellectual Property",
    icon: "hki",
    certNo: "EC00202613459",
    year: "2026",
    url: "https://drive.google.com/file/d/1TeYqnOgUN8bnAwsnmFQGIWm-8Pf6X3xd/view?usp=drive_link",
  },
  {
    title: "Dasar Pembuatan Aplikasi Web",
    issuer: "Universitas Gunadarma",
    category: "Web Development",
    icon: "web",
    certNo: "No. 004529",
    year: "2026",
    url: "https://drive.google.com/file/d/1mfwnAjFW8bYiyE-hrEDrKqMvl2LuH6O2/view?usp=sharing",
  },
  {
    title: "Dasar Bahasa Pemrograman JavaScript",
    issuer: "Universitas Gunadarma",
    category: "Programming",
    icon: "javascript",
    certNo: "No. 114694",
    year: "2025",
    url: "https://drive.google.com/file/d/1imeBikkb94Yx8XmPX_vzo_loaeDEA1y8/view?usp=sharing",
  },
  {
    title: "SQL Server untuk Tingkat Menengah",
    issuer: "Universitas Gunadarma",
    category: "Database",
    icon: "database",
    certNo: "No. 282597",
    year: "2025",
    url: "https://drive.google.com/file/d/1W-oUTfMERG8UN9fO5HKbmuDC9XM4PcUF/view?usp=sharing",
  },
  {
    title: "Oracle untuk Tingkat Menengah",
    issuer: "Universitas Gunadarma",
    category: "Database",
    icon: "oracle",
    certNo: "",
    year: "2025",
    url: "https://drive.google.com/file/d/1uDy8avjIdJEfpIJGY0_iHKYUn3Lnim4P/view?usp=sharing",
  },
];

// ── Other Experiences ─────────────────────────────────────────
export type OtherExperience = {
  company: string;
  event: string;
  role: string;
  period: string;
  description: string[];
};

export const otherExperiences: OtherExperience[] = [
  {
    company: "PT. Jaya Vista Javanaction",
    event: "Dancephoria Fest",
    role: "Liaison Officer / Naradamping",
    period: "31 Desember 2024",
    description: [
      "Mewakili Event Organizers untuk mengurus keperluan Talent.",
      "Bertanggung jawab atas kebutuhan artis yang akan tampil.",
      "Bertanggung jawab agar talent datang tepat waktu.",
      "Membantu memberikan pengarahan kepada para talent tentang kegiatan acara.",
    ],
  },
  {
    company: "PT. Interface Event",
    event: "Uniqlo X Orchestra One Piece",
    role: "Usher",
    period: "10 – 11 Agustus 2024",
    description: [
      "Mengarahkan penonton untuk masuk ke ruangan Studio Orchestra.",
      "Memastikan orang yang masuk adalah penonton yang mempunyai tiket.",
      "Memastikan acara berjalan lancar dan nyaman.",
    ],
  },
  {
    company: "PT. Mitra Natura Raya (MNR) Mitra BRIN",
    event: "Sunset Di Kebun",
    role: "Usher VIP",
    period: "15 Desember 2024",
    description: [
      "Bertanggung jawab di Area VIP penonton.",
      "Memastikan Area VIP hanya diisi oleh penonton yang mempunyai Gelang VIP.",
      "Mengarahkan penonton ke tempat duduknya masing-masing.",
      "Mengkoordinir Crowd Control untuk kenyamanan penonton di VIP.",
    ],
  },
];

// ── Navigation links ──────────────────────────────────────────
export const navLinks = [
  { label: "Tentang",      href: "#about"     },
  { label: "Keahlian",     href: "#skills"    },
  { label: "Pengalaman",   href: "#experience"},
  { label: "Proyek",       href: "#projects"  },
  { label: "Sertifikasi",  href: "#certifications" },
  { label: "Kontak",       href: "#contact"   },
];
