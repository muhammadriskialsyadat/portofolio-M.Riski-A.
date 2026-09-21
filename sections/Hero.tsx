"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FiArrowDownRight, FiLinkedin } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { personalInfo } from "@/data/portfolio";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
  ssr: false,
  loading: () => <div className="w-full aspect-square" />,
});

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

// ── Ilustrasi mobile — minimalis, bukan spinning rings ────────
function Avatar() {
  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
      {/* Frame foto — kotak sedikit miring untuk dinamisme */}
      <div className="absolute inset-0 rounded-3xl bg-brand-100 rotate-3" />
      <div className="absolute inset-0 rounded-3xl overflow-hidden -rotate-1 bg-ink-200">
        {/* Foto profil */}
        <img
          src={personalInfo.profileImage}
          alt={personalInfo.name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.style.display = "none";
          }}
        />
        {/* Fallback */}
        <div className="absolute inset-0 flex items-center justify-center bg-ink-100">
          <span className="text-5xl font-black text-ink-400 select-none tracking-tighter">RA</span>
        </div>
      </div>
      {/* Status dot */}
      <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full border border-ink-200 shadow-card text-xs font-medium text-ink-700">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Open to Work
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollToAbout    = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  const scrollToProjects = () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-ink-50 noise-bg"
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* ── Text ─────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
            className="max-w-2xl"
          >
            {/* Eyebrow */}
            <motion.p
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4, ease } } }}
              className="text-2xs font-semibold tracking-[0.18em] uppercase text-brand-500 mb-4"
            >
              Halo — saya Riski
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
              className="text-[2.6rem] sm:text-6xl md:text-7xl font-bold tracking-tight text-ink-900 leading-[1.05] mb-6"
            >
              Web Developer
              <br />
              <span className="text-ink-400 font-normal italic text-3xl sm:text-4xl md:text-5xl">
                — yang siap belajar
              </span>
            </motion.h1>

            {/* Bio */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
              className="text-ink-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
            >
              Fresh Graduate Sistem Informasi. Pernah membangun RESTful API
              dan proyek fullstack selama kuliah. Senang belajar, senang berkolaborasi.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink-900 hover:bg-ink-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Lihat Proyek
                <FiArrowDownRight className="w-4 h-4" />
              </button>
              <a
                href={personalInfo.cvUrl}
                download="CV_Muhammad_Riski_Alsyadat.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-ink-100 text-ink-700 text-sm font-semibold rounded-xl border border-ink-300 transition-colors"
              >
                Download CV
              </a>
            </motion.div>

            {/* Social + stack tags */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4, ease, delay: 0.3 } } }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Social */}
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-ink-400 hover:text-brand-600 transition-colors"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-ink-400 hover:text-ink-900 transition-colors"
                >
                  <SiGithub className="w-5 h-5" />
                </a>
              </div>

              <span className="w-px h-4 bg-ink-200" />

              {/* Quick stack */}
              <div className="flex flex-wrap gap-1.5">
                {["Laravel", ".NET Core", "PostgreSQL", "Filament"].map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 rounded-md bg-white border border-ink-200 text-ink-600 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Visual ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            {/* Mobile: foto profil */}
            <div className="lg:hidden">
              <Avatar />
            </div>

            {/* Desktop: 3D canvas */}
            <div className="hidden lg:block w-[380px] xl:w-[440px] aspect-square">
              <HeroCanvas />
            </div>
          </motion.div>
        </div>

        {/* Scroll cue — sangat minimal */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          onClick={scrollToAbout}
          className="hidden lg:flex items-center gap-2 mt-16 text-xs text-ink-400 hover:text-ink-700 transition-colors group"
          aria-label="Scroll ke bawah"
        >
          <span className="w-6 h-px bg-ink-300 group-hover:w-10 group-hover:bg-ink-600 transition-all duration-300" />
          scroll
        </motion.button>
      </div>
    </section>
  );
}
