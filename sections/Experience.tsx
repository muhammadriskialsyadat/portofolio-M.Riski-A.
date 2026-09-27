"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import { experiences, otherExperiences } from "@/data/portfolio";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const techColor: Record<string, string> = {
  ".NET Core Web API": "bg-purple-50 text-purple-700 border-purple-200",
  "C#":               "bg-purple-50 text-purple-700 border-purple-200",
  "PostgreSQL":       "bg-blue-50 text-blue-700 border-blue-200",
  "Postman":          "bg-orange-50 text-orange-700 border-orange-200",
  "Swagger":          "bg-emerald-50 text-emerald-700 border-emerald-200",
  "GitLab":           "bg-orange-50 text-orange-700 border-orange-200",
  "Laravel":          "bg-red-50 text-red-700 border-red-200",
  "MySQL":            "bg-blue-50 text-blue-700 border-blue-200",
  "Filament":         "bg-amber-50 text-amber-700 border-amber-200",
};
const techDef = "bg-ink-50 text-ink-600 border-ink-200";

// ── Lightbox ──────────────────────────────────────────────────
function Lightbox({
  photos, idx, onClose,
}: { photos: { src: string; alt: string; caption?: string }[]; idx: number; onClose: () => void }) {
  const [cur, setCur] = useState(idx);
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="Tutup">
        <FiX className="w-4 h-4" />
      </button>
      <motion.div
        key={cur}
        initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-2xl w-full rounded-xl overflow-hidden bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[cur].src} alt={photos[cur].alt}
          width={1200} height={900}
          className="w-full h-auto max-h-[78vh] object-contain"
        />
        {photos[cur].caption && (
          <div className="absolute bottom-0 inset-x-0 bg-black/50 px-4 py-2">
            <p className="text-white text-xs font-medium">{photos[cur].caption}</p>
          </div>
        )}
      </motion.div>
      {photos.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); setCur((c) => (c - 1 + photos.length) % photos.length); }}
            className="absolute left-3 sm:left-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="Sebelumnya">
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setCur((c) => (c + 1) % photos.length); }}
            className="absolute right-3 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="Berikutnya">
            <FiChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const [lightbox, setLightbox] = useState<{ photos: { src: string; alt: string; caption?: string }[]; idx: number } | null>(null);

  return (
    <section id="experience" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-12">
          <SectionHeader
            eyebrow="Pengalaman"
            title="Yang sudah "
            highlight="pernah saya lalui"
            description="Pengalaman selama kuliah: magang dan proyek yang membentuk cara saya bekerja."
          />
        </div>

        {/* ── Magang ─────────────────────────────────────── */}
        <div className="mb-16">
          <p className="text-2xs font-semibold tracking-[0.14em] uppercase text-ink-400 mb-6">Magang</p>
          <div className="space-y-px">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}
                className="bg-white border border-ink-200 rounded-2xl overflow-hidden"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-ink-900 text-sm sm:text-base">{exp.company}</h3>
                      <span className="px-2 py-0.5 bg-brand-50 text-brand-700 text-2xs font-semibold rounded-md border border-brand-100">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-sm text-ink-500 mt-0.5">{exp.role}</p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-0.5 shrink-0 text-xs text-ink-400">
                    <span>{exp.period}</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div className="mx-5 sm:mx-6 sep" />

                {/* Bullets */}
                <ul className="p-5 sm:p-6 pt-4 space-y-2">
                  {exp.description.map((d, j) => (
                    <li key={j} className="flex gap-3 text-sm text-ink-600 leading-relaxed">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-brand-400 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>

                {/* Tech badges */}
                <div className="px-5 sm:px-6 pb-5 flex flex-wrap gap-1.5">
                  {exp.techStack.map((t) => (
                    <span key={t} className={`px-2.5 py-0.5 rounded-md text-2xs font-semibold border ${techColor[t] ?? techDef}`}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Photos */}
                {exp.photos && exp.photos.length > 0 && (
                  <div className="border-t border-ink-100 bg-ink-50/60 p-5 sm:p-6">
                    <p className="text-2xs font-semibold tracking-[0.12em] uppercase text-ink-400 mb-3">Dokumentasi</p>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {exp.photos.map((ph, k) => (
                        <button
                          key={k}
                          onClick={() => setLightbox({ photos: exp.photos!, idx: k })}
                          className="group relative rounded-xl overflow-hidden bg-ink-200 aspect-[3/4]"
                          aria-label={`Buka foto: ${ph.alt}`}
                        >
                          <Image
                            src={ph.src} alt={ph.alt} fill
                            className={`object-cover transition-opacity duration-200 group-hover:opacity-90 ${k === 1 ? "object-bottom" : "object-center"}`}
                            sizes="(max-width: 640px) 45vw, 300px"
                          />
                          {ph.caption && (
                            <div className="absolute bottom-0 inset-x-0 bg-black/50 px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-white text-2xs font-medium">{ph.caption}</p>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Lainnya ────────────────────────────────────── */}
        <div>
          <p className="text-2xs font-semibold tracking-[0.14em] uppercase text-ink-400 mb-6">Pengalaman Lainnya</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {otherExperiences.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${i}`}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                className="bg-white border border-ink-200 rounded-xl p-4 hover:border-ink-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-800 text-xs truncate">{exp.event}</p>
                    <p className="text-2xs text-brand-600 font-medium mt-0.5">{exp.role}</p>
                    <p className="text-2xs text-ink-400 mt-0.5 truncate">{exp.company}</p>
                  </div>
                  <span className="text-2xs text-ink-400 shrink-0 whitespace-nowrap">{exp.period}</span>
                </div>
                <ul className="space-y-1 mt-3">
                  {exp.description.slice(0, 2).map((d, j) => (
                    <li key={j} className="flex gap-2 text-2xs text-ink-500">
                      <span className="mt-[5px] w-1 h-1 rounded-full bg-ink-300 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox photos={lightbox.photos} idx={lightbox.idx} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
