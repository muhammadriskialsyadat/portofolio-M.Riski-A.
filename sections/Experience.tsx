"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiBriefcase, FiMapPin, FiCalendar,
  FiCheckCircle, FiX, FiChevronLeft, FiChevronRight,
  FiCamera,
} from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import { experiences, otherExperiences } from "@/data/portfolio";

// ── Tech badge colors ─────────────────────────────────────────
const techColors: Record<string, string> = {
  ".NET Core Web API": "bg-purple-50 text-purple-700 border-purple-100",
  "C#":               "bg-purple-50 text-purple-700 border-purple-100",
  "PostgreSQL":       "bg-blue-50 text-blue-700 border-blue-100",
  "Postman":          "bg-orange-50 text-orange-700 border-orange-100",
  "Swagger":          "bg-green-50 text-green-700 border-green-100",
  "GitLab":           "bg-orange-50 text-orange-700 border-orange-100",
  "Laravel":          "bg-red-50 text-red-700 border-red-100",
  "MySQL":            "bg-blue-50 text-blue-700 border-blue-100",
  "Filament":         "bg-amber-50 text-amber-700 border-amber-100",
};
const defaultTechColor = "bg-neutral-50 text-neutral-700 border-neutral-200";

// ── Lightbox ──────────────────────────────────────────────────
function Lightbox({
  photos,
  startIndex,
  onClose,
}: {
  photos: { src: string; alt: string; caption?: string }[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  // keyboard nav
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Lightbox foto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Tutup"
      >
        <FiX className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/10 rounded-full text-white text-xs font-medium">
        {current + 1} / {photos.length}
      </div>

      {/* Image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-3xl w-full max-h-[80vh] rounded-2xl overflow-hidden bg-neutral-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photos[current].src}
          alt={photos[current].alt}
          width={1200}
          height={900}
          className="w-full h-auto max-h-[80vh] object-contain"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
        {/* Caption overlay */}
        {photos[current].caption && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm font-medium">{photos[current].caption}</p>
          </div>
        )}
      </motion.div>

      {/* Prev / Next */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            aria-label="Foto sebelumnya"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            aria-label="Foto berikutnya"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </motion.div>
  );
}

// ── Photo Gallery Grid ────────────────────────────────────────
function PhotoGallery({
  photos,
}: {
  photos: { src: string; alt: string; caption?: string }[];
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      {/* Gallery header */}
      <div className="flex items-center gap-2 mb-3">
        <FiCamera className="w-4 h-4 text-primary-500" />
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
          Dokumentasi
        </span>
      </div>

      {/* Grid: 2 photos side-by-side */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {photos.map((photo, i) => (
          <motion.button
            key={i}
            onClick={() => setLightboxIndex(i)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 shadow-sm hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            aria-label={`Buka foto: ${photo.alt}`}
          >
            {/*
              aspect-[3/4] = portrait card yang konsisten untuk kedua foto.
              Foto 1 (grup): object-center — orang tersebar merata, aman di-crop kiri/kanan.
              Foto 2 (sendiri): object-bottom — buang ruang kosong di atas, pertahankan orangnya.
            */}
            <div className="aspect-[3/4] relative w-full">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className={`object-cover transition-opacity duration-300 group-hover:opacity-90 ${
                  i === 1 ? "object-bottom" : "object-center"
                }`}
                sizes="(max-width: 640px) 45vw, 300px"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Caption on hover */}
            {photo.caption && (
              <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-semibold leading-tight drop-shadow">
                  {photo.caption}
                </p>
              </div>
            )}

            {/* Zoom icon */}
            <div className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
              <svg className="w-3 h-3 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>

            {/* Photo number badge */}
            <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/40 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">{i + 1}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Experience Card ───────────────────────────────────────────
function ExperienceCard({
  exp,
  index,
}: {
  exp: typeof experiences[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.1,
      }}
      className="relative pl-7 sm:pl-10 md:pl-12"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 flex flex-col items-center">
        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary-600 border-2 border-white shadow-md z-10 shrink-0" />
        <div className="w-0.5 flex-1 bg-primary-100 mt-1" />
      </div>

      <div className="bg-white rounded-2xl border border-neutral-100 shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden">

        {/* ── Top: company info ───────────────────────────── */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                  <FiBriefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" />
                </div>
                <h3 className="font-extrabold text-neutral-900 text-sm sm:text-base md:text-lg leading-tight">
                  {exp.company}
                </h3>
              </div>
              <p className="text-primary-600 font-semibold text-xs sm:text-sm pl-9 sm:pl-10">
                {exp.role}
              </p>
              <span className="inline-block ml-9 sm:ml-10 px-2 py-0.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-full border border-primary-100">
                {exp.type}
              </span>
            </div>

            {/* Period + location */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1.5 flex-wrap shrink-0">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-500 bg-neutral-50 border border-neutral-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                <FiCalendar className="w-3 h-3 text-primary-400 shrink-0" />
                {exp.period}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-400 whitespace-nowrap">
                <FiMapPin className="w-3 h-3 shrink-0" />
                {exp.location}
              </span>
            </div>
          </div>

          <div className="section-divider mb-4" />

          {/* Description bullets */}
          <ul className="space-y-2 mb-5">
            {exp.description.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                <FiCheckCircle className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {exp.techStack.map((tech) => (
              <span
                key={tech}
                className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs font-semibold border ${techColors[tech] ?? defaultTechColor}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom: photo gallery (jika ada) ────────────── */}
        {exp.photos && exp.photos.length > 0 && (
          <div className="border-t border-neutral-100 bg-neutral-50/60 px-4 sm:px-6 md:px-8 py-5 sm:py-6">
            <PhotoGallery photos={exp.photos} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Other Experience Card ─────────────────────────────────────
function OtherExpCard({
  exp,
  index,
}: {
  exp: typeof otherExperiences[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.07,
      }}
      className="bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-card transition-shadow duration-300 p-4"
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="min-w-0">
          <p className="font-bold text-neutral-800 text-xs sm:text-sm truncate">{exp.event}</p>
          <p className="text-xs text-primary-600 font-medium mt-0.5">{exp.role}</p>
          <p className="text-xs text-neutral-400 mt-0.5 truncate">{exp.company}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-neutral-400 shrink-0 whitespace-nowrap">
          <FiCalendar className="w-3 h-3 shrink-0" />
          {exp.period}
        </span>
      </div>
      <ul className="space-y-1">
        {exp.description.slice(0, 2).map((item, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-neutral-500">
            <span className="w-1 h-1 rounded-full bg-primary-400 mt-1.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10 md:mb-14">
          <SectionHeader
            badge="Pengalaman"
            title="Riwayat "
            highlight="Kerja"
            description="Perjalanan profesional saya dari internship hingga proyek nyata di lapangan."
          />
        </div>

        {/* Magang timeline */}
        <div className="mb-12 md:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6 sm:mb-8"
          >
            <FiBriefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-400" />
            Pengalaman Magang
          </motion.h3>

          <div className="relative">
            <div className="absolute left-[6px] sm:left-[7px] top-2 bottom-0 w-0.5 timeline-line" />
            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp, i) => (
                <ExperienceCard key={exp.company} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Other experiences */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4 sm:mb-6"
          >
            <FiBriefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-400" />
            Pengalaman Lainnya
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {otherExperiences.map((exp, i) => (
              <OtherExpCard key={`${exp.company}-${i}`} exp={exp} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
