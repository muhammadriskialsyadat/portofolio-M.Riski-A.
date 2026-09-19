"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FiAward, FiExternalLink, FiCode,
  FiDatabase, FiHash, FiCalendar,
} from "react-icons/fi";
import { SiJavascript } from "react-icons/si";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineVerified } from "react-icons/md";
import SectionHeader from "@/components/SectionHeader";
import { certifications } from "@/data/portfolio";

// ── Config per icon type ──────────────────────────────────────
const certConfig: Record<string, {
  icon: React.ReactNode;
  bg: string;
  border: string;
  iconBg: string;
  badge: string;
  accentText: string;
}> = {
  hki: {
    icon: <FiAward className="w-6 h-6 sm:w-7 sm:h-7" />,
    bg: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100 text-yellow-700",
    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
    accentText: "text-yellow-700",
  },
  web: {
    icon: <FiCode className="w-6 h-6 sm:w-7 sm:h-7" />,
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
    iconBg: "bg-blue-100 text-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-100",
    accentText: "text-blue-600",
  },
  javascript: {
    icon: <SiJavascript className="w-6 h-6 sm:w-7 sm:h-7" />,
    bg: "from-yellow-50 to-orange-50",
    border: "border-yellow-100",
    iconBg: "bg-yellow-100 text-yellow-600",
    badge: "bg-yellow-50 text-yellow-700 border-yellow-100",
    accentText: "text-yellow-600",
  },
  database: {
    icon: <FiDatabase className="w-6 h-6 sm:w-7 sm:h-7" />,
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-100",
    iconBg: "bg-emerald-100 text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
    accentText: "text-emerald-600",
  },
  oracle: {
    icon: <FiDatabase className="w-6 h-6 sm:w-7 sm:h-7" />,
    bg: "from-red-50 to-orange-50",
    border: "border-red-100",
    iconBg: "bg-red-100 text-red-600",
    badge: "bg-red-50 text-red-700 border-red-100",
    accentText: "text-red-600",
  },
};

const defaultConfig = {
  icon: <FiAward className="w-6 h-6 sm:w-7 sm:h-7" />,
  bg: "from-neutral-50 to-slate-50",
  border: "border-neutral-200",
  iconBg: "bg-neutral-100 text-neutral-600",
  badge: "bg-neutral-50 text-neutral-600 border-neutral-200",
  accentText: "text-neutral-600",
};

export default function Certifications() {
  return (
    <section id="certifications" className="py-16 md:py-24 bg-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <SectionHeader
            badge="Sertifikasi"
            title="Lisensi & "
            highlight="Sertifikat"
            description="Beberapa sertifikasi dan pelatihan yang pernah saya ikuti selama masa studi di bidang pengembangan web, pemrograman, dan database."
          />
        </div>

        {/* Grid: 1 col mobile → 2 col tablet → 3 col lg → 5 col xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {certifications.map((cert, i) => {
            const cfg = certConfig[cert.icon] ?? defaultConfig;
            const isHKI = cert.icon === "hki";

            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  delay: i * 0.1,
                }}
              >
                <Tilt
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  glareEnable={true}
                  glareMaxOpacity={0.07}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="16px"
                  scale={1.02}
                  transitionSpeed={400}
                  className="h-full"
                  tiltEnable={
                    typeof window !== "undefined" &&
                    window.matchMedia("(hover: hover)").matches
                  }
                >
                  <div
                    className={`h-full flex flex-col bg-gradient-to-br ${cfg.bg} rounded-2xl border ${cfg.border} p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300 ${
                      isHKI ? "ring-1 ring-yellow-300/50" : ""
                    }`}
                  >
                    {/* Top: icon + verified */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${cfg.iconBg} flex items-center justify-center shadow-sm shrink-0`}>
                        {cfg.icon}
                      </div>

                      {/* Verified badge */}
                      <div className="flex items-center gap-1 px-2 py-1 bg-white/80 rounded-full border border-neutral-100 shadow-sm">
                        {isHKI ? (
                          <MdOutlineVerified className="w-3.5 h-3.5 text-yellow-600" />
                        ) : (
                          <HiOutlineShieldCheck className="w-3.5 h-3.5 text-green-500" />
                        )}
                        <span className={`text-[10px] font-bold ${isHKI ? "text-yellow-700" : "text-green-600"}`}>
                          {isHKI ? "RESMI" : "VERIFIED"}
                        </span>
                      </div>
                    </div>

                    {/* Category pill */}
                    <span className={`self-start inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border mb-2 ${cfg.badge}`}>
                      {cert.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-extrabold text-neutral-900 text-sm leading-snug mb-1 flex-1">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs text-neutral-500 font-medium mb-3">{cert.issuer}</p>

                    {/* Divider */}
                    <div className="h-px bg-white/70 mb-3" />

                    {/* Meta: cert no + year */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {cert.certNo && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 font-mono">
                          <FiHash className="w-2.5 h-2.5 shrink-0" />
                          {cert.certNo}
                        </span>
                      )}
                      {cert.year && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 font-medium ml-auto">
                          <FiCalendar className="w-2.5 h-2.5 shrink-0" />
                          {cert.year}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    {cert.url ? (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${cfg.accentText} hover:underline transition-colors`}
                      >
                        <FiExternalLink className="w-3.5 h-3.5" />
                        Lihat Sertifikat
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-neutral-300 cursor-default select-none">
                        <FiExternalLink className="w-3.5 h-3.5" />
                        Link segera hadir
                      </span>
                    )}
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-neutral-400"
        >
          <HiOutlineShieldCheck className="w-4 h-4 text-primary-400 shrink-0" />
          <span className="text-center text-xs sm:text-sm">
            Semua sertifikat diterbitkan oleh institusi resmi dan dapat diverifikasi.
            Hubungi saya untuk verifikasi lebih lanjut.
          </span>
        </motion.div>

      </div>
    </section>
  );
}
