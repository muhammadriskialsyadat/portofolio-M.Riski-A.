"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiLinkedin, FiGithub, FiMail, FiArrowDown, FiDownload } from "react-icons/fi";
import { personalInfo } from "@/data/portfolio";

// ── 3D Canvas — hanya load di desktop (lg+) ───────────────────
const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
    </div>
  ),
});

// ── Ilustrasi statis untuk mobile/tablet ──────────────────────
// Ganti 3D canvas dengan floating elements CSS murni
// — ringan, tidak ada WebGL, tidak ada overlap issue
function MobileIllustration() {
  return (
    <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] mx-auto">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-primary-200/60 animate-[spin_12s_linear_infinite]" />
      {/* Middle ring */}
      <div className="absolute inset-4 rounded-full border border-primary-300/40 animate-[spin_8s_linear_infinite_reverse]" />
      {/* Core circle */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 shadow-lg shadow-primary-200 flex items-center justify-center">
        {/* Shimmer */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent" />
        {/* Initials */}
        <span className="text-white text-2xl font-black tracking-tight select-none z-10">RA</span>
      </div>

      {/* Floating tech dots */}
      {[
        { label: ".NET", angle: 0,   color: "bg-purple-100 text-purple-700 border-purple-200" },
        { label: "PHP",  angle: 72,  color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
        { label: "SQL",  angle: 144, color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
        { label: "CSS",  angle: 216, color: "bg-blue-100 text-blue-700 border-blue-200" },
        { label: "JS",   angle: 288, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
      ].map(({ label, angle, color }) => {
        const rad = (angle * Math.PI) / 180;
        const r = 90; // radius dalam px
        const x = 50 + (r / 2) * Math.sin(rad); // % dari center
        const y = 50 - (r / 2) * Math.cos(rad);
        return (
          <div
            key={label}
            className={`absolute w-8 h-8 rounded-full border text-[10px] font-bold flex items-center justify-center shadow-sm animate-[float_${3 + (angle / 72)}s_ease-in-out_infinite] ${color}`}
            style={{ left: `calc(${x}% - 16px)`, top: `calc(${y}% - 16px)` }}
          >
            {label}
          </div>
        );
      })}

      {/* Glow */}
      <div className="absolute inset-8 rounded-full blur-2xl bg-primary-400/30 -z-10" />
    </div>
  );
}

// ── Framer Motion variants ─────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};
const illustrationVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 },
  },
};

const socialLinks = [
  { label: "LinkedIn", href: personalInfo.linkedIn, icon: FiLinkedin, external: true },
  { label: "GitHub",   href: personalInfo.github,   icon: FiGithub,   external: true },
  { label: "Email",    href: `mailto:${personalInfo.email}`, icon: FiMail, external: false },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-primary-50/40 to-blue-50/30"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-64 h-64 md:w-96 md:h-96 bg-primary-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 md:w-72 md:h-72 bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

          {/* ── Visual area ─────────────────────────────────
              Mobile/Tablet : CSS illustration (ringan, no WebGL)
              Desktop (lg+)  : 3D Canvas Three.js
          ──────────────────────────────────────────────── */}
          <motion.div
            variants={illustrationVariants}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2 flex justify-center mb-6 lg:mb-0"
          >
            {/* Mobile & tablet — ilustrasi CSS */}
            <div className="lg:hidden">
              <MobileIllustration />
            </div>

            {/* Desktop — 3D canvas */}
            <div className="hidden lg:block w-full aspect-square relative">
              <div className="absolute inset-8 rounded-full blur-3xl opacity-20 bg-primary-400" aria-hidden="true" />
              <HeroCanvas />
            </div>
          </motion.div>

          {/* ── Text content ─────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4 lg:gap-6"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                Open to Work · Siap Berkembang
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={itemVariants} className="space-y-0.5">
              <p className="text-xs sm:text-sm font-medium text-neutral-500 tracking-wide uppercase">
                Halo, saya
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-neutral-900">
                Muhammad{" "}
                <span className="gradient-text">Riski</span>
                <br />
                Alsyadat
              </h1>
            </motion.div>

            {/* Role tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-2">
              {["Full Stack Developer", "Back End Developer", "Laravel · .NET Core"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-white border border-neutral-200 rounded-lg text-xs sm:text-sm text-neutral-600 font-medium shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-neutral-600 leading-relaxed text-sm sm:text-base max-w-md lg:max-w-lg"
            >
              Fresh Graduate Sistem Informasi yang antusias di dunia web development.
              Pernah membangun <span className="text-primary-600 font-medium">RESTful API</span> menggunakan
              .NET Core dan{" "}
              <span className="text-primary-600 font-medium">proyek fullstack</span>{" "}
              menggunakan Laravel 12 + Filament. Senang belajar dan siap berkontribusi.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-3">
              <a
                href={personalInfo.cvUrl}
                download="CV_Muhammad_Riski_Alsyadat.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <FiDownload className="w-4 h-4" />
                Download CV
              </a>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-semibold rounded-xl border border-neutral-200 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                Lihat Proyek
                <FiArrowDown className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <span className="text-xs text-neutral-400 font-medium uppercase tracking-widest hidden sm:inline">
                Temukan saya di
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 flex items-center justify-center text-neutral-500 transition-all duration-200 shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator — desktop only */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="hidden lg:flex flex-col items-center gap-2 mt-10"
        >
          <span className="text-xs text-neutral-400 uppercase tracking-widest font-medium">Scroll</span>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Scroll ke bawah"
            className="w-8 h-12 rounded-full border-2 border-neutral-300 hover:border-primary-400 flex items-start justify-center p-1.5 transition-colors group"
          >
            <FiArrowDown className="w-3 h-3 text-neutral-400 group-hover:text-primary-500 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
