"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import {
  FiCalendar, FiCheckCircle, FiChevronDown,
  FiChevronUp, FiExternalLink, FiGithub, FiAward,
  FiMonitor,
} from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/portfolio";

// ── Tech badge colors ─────────────────────────────────────────
const techColors: Record<string, string> = {
  "Laravel 12":         "bg-red-50 text-red-700 border-red-100",
  "Laravel":            "bg-red-50 text-red-700 border-red-100",
  "Filament v3":        "bg-amber-50 text-amber-700 border-amber-100",
  "Filament":           "bg-amber-50 text-amber-700 border-amber-100",
  "Spatie Permissions": "bg-purple-50 text-purple-700 border-purple-100",
  "Fonnte API":         "bg-green-50 text-green-700 border-green-100",
  "MySQL":              "bg-blue-50 text-blue-700 border-blue-100",
  "Tailwind CSS":       "bg-cyan-50 text-cyan-700 border-cyan-100",
  "PHP":                "bg-indigo-50 text-indigo-700 border-indigo-100",
};
const defaultTechColor = "bg-neutral-50 text-neutral-700 border-neutral-200";

const specialBadgeStyles: Record<string, string> = {
  "HKI":               "bg-yellow-50 text-yellow-700 border-yellow-300 font-bold",
  "Skripsi":           "bg-blue-50 text-blue-700 border-blue-200",
  "Agile Scrum":       "bg-green-50 text-green-700 border-green-200",
  "Penelitian Ilmiah": "bg-purple-50 text-purple-700 border-purple-200",
  "Client Project":    "bg-orange-50 text-orange-700 border-orange-200",
};

// ── Browser mockup wrapper ────────────────────────────────────
// Membungkus screenshot dengan chrome browser palsu agar terlihat
// lebih profesional seperti tampilan website sungguhan.
function BrowserMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-neutral-200 bg-white">
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-100 border-b border-neutral-200">
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        {/* URL bar */}
        <div className="flex-1 mx-2 px-2 py-0.5 bg-white rounded-md border border-neutral-200">
          <p className="text-[10px] text-neutral-400 truncate leading-4">localhost:8000</p>
        </div>
        {/* Monitor icon */}
        <FiMonitor className="w-3 h-3 text-neutral-400 shrink-0" />
      </div>
      {/* Screenshot content */}
      {children}
    </div>
  );
}

// ── Image preview tabs (untuk project dengan multiple images) ─
function ImagePreview({
  images,
}: {
  images: { src: string; alt: string; label: string }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-2">
      {/* Tab switcher — only show if more than 1 image */}
      {images.length > 1 && (
        <div className="flex gap-1.5 px-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
                active === i
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
              }`}
            >
              {img.label}
            </button>
          ))}
        </div>
      )}

      {/* Screenshot */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <BrowserMockup>
            <div className="relative w-full aspect-video overflow-hidden bg-neutral-900">
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </BrowserMockup>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Project Card ──────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: typeof projects[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isHKI = project.badges.includes("HKI");
  const hasImages = project.images && project.images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.15,
      }}
      className="h-full"
    >
      <Tilt
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareEnable={true}
        glareMaxOpacity={0.05}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="20px"
        scale={1.01}
        transitionSpeed={500}
        className="h-full"
        tiltEnable={
          typeof window !== "undefined" &&
          window.matchMedia("(hover: hover)").matches
        }
      >
        <div
          className={`h-full flex flex-col bg-white rounded-2xl border shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden ${
            isHKI ? "border-yellow-200" : "border-neutral-100"
          }`}
        >
          {/* ── Screenshot preview area ──────────────────── */}
          <div className="relative bg-neutral-50 border-b border-neutral-100 p-3 sm:p-4">
            {/* HKI badge */}
            {isHKI && (
              <div className="absolute top-3 right-3 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-400 rounded-full text-xs font-extrabold text-yellow-900 shadow-md">
                  <FiAward className="w-3 h-3" />
                  HKI
                </span>
              </div>
            )}

            {hasImages ? (
              <ImagePreview images={project.images!} />
            ) : (
              /* Fallback gradient jika tidak ada screenshot */
              <BrowserMockup>
                <div className="aspect-video bg-gradient-to-br from-primary-100 via-blue-50 to-indigo-100 flex items-center justify-center">
                  <FiMonitor className="w-10 h-10 text-primary-300" />
                </div>
              </BrowserMockup>
            )}

            {/* Period pill */}
            <div className="mt-2.5 flex items-center gap-1.5">
              <FiCalendar className="w-3 h-3 text-primary-400" />
              <span className="text-xs text-neutral-500 font-medium">{project.period}</span>
            </div>
          </div>

          {/* ── Card body ────────────────────────────────── */}
          <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">

            {/* Subtitle */}
            <p className="text-xs font-semibold text-primary-500 uppercase tracking-widest">
              {project.subtitle}
            </p>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 leading-tight -mt-1">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              {project.description}
            </p>

            {/* Special badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.badges.map((badge) => (
                <span
                  key={badge}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                    specialBadgeStyles[badge] ?? defaultTechColor
                  }`}
                >
                  {badge === "HKI" && <FiAward className="w-3 h-3" />}
                  {badge}
                </span>
              ))}
            </div>

            {/* Divider */}
            <div className="section-divider" />

            {/* Expandable details */}
            <div>
              <button
                onClick={() => setExpanded((p) => !p)}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors mb-2"
                aria-expanded={expanded}
              >
                {expanded ? (
                  <><FiChevronUp className="w-3.5 h-3.5" />Sembunyikan Detail</>
                ) : (
                  <><FiChevronDown className="w-3.5 h-3.5" />Lihat Detail</>
                )}
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden space-y-2 mb-2"
                  >
                    {project.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-600 leading-relaxed">
                        <FiCheckCircle className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-xs font-semibold border ${
                    techColors[tech] ?? defaultTechColor
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            {(project.demoUrl || project.repoUrl) && (
              <div className="flex gap-2 pt-1">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" />
                    Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-xl transition-colors"
                  >
                    <FiGithub className="w-3.5 h-3.5" />
                    Source
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-neutral-50 border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10 md:mb-14">
          <SectionHeader
            badge="Proyek"
            title="Karya "
            highlight="Terbaik"
            description="Beberapa proyek yang pernah saya kerjakan selama masa studi — dari tugas penelitian hingga skripsi yang sudah saya selesaikan."
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Bottom callout HKI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-2xl border border-primary-100 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center shrink-0">
              <FiAward className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-bold text-neutral-800 text-xs sm:text-sm">Hak Kekayaan Intelektual (HKI)</p>
              <p className="text-xs text-neutral-500">Proyek skripsi telah terdaftar dan memiliki HKI resmi.</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-neutral-200" />
          <p className="text-xs text-neutral-400 max-w-xs">
            Klik <span className="text-primary-500 font-semibold">Lihat Detail</span> pada setiap card untuk melihat penjelasan lengkap.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
