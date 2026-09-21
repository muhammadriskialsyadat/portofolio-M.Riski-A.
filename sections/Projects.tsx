"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiChevronDown, FiChevronUp, FiExternalLink, FiAward } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import { projects } from "@/data/portfolio";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const techColor: Record<string, string> = {
  "Laravel 12":         "bg-red-50 text-red-700 border-red-200",
  "Laravel":            "bg-red-50 text-red-700 border-red-200",
  "Filament v3":        "bg-amber-50 text-amber-700 border-amber-200",
  "Filament":           "bg-amber-50 text-amber-700 border-amber-200",
  "Spatie Permissions": "bg-purple-50 text-purple-700 border-purple-200",
  "Fonnte API":         "bg-emerald-50 text-emerald-700 border-emerald-200",
  "MySQL":              "bg-blue-50 text-blue-700 border-blue-200",
  "Tailwind CSS":       "bg-cyan-50 text-cyan-700 border-cyan-200",
  "PHP":                "bg-violet-50 text-violet-700 border-violet-200",
};
const techDef = "bg-ink-50 text-ink-600 border-ink-200";

const badgeColor: Record<string, string> = {
  "HKI":               "bg-yellow-50 text-yellow-800 border-yellow-300",
  "Skripsi":           "bg-brand-50 text-brand-700 border-brand-200",
  "Agile Scrum":       "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Penelitian Ilmiah": "bg-purple-50 text-purple-700 border-purple-200",
  "Client Project":    "bg-orange-50 text-orange-700 border-orange-200",
};

// Browser chrome wrapper
function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl overflow-hidden border border-ink-200 bg-white">
      <div className="flex items-center gap-2 px-3 py-2 bg-ink-50 border-b border-ink-200">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 mx-2 px-2.5 py-0.5 bg-white rounded border border-ink-200">
          <p className="text-2xs text-ink-400 truncate leading-4">localhost:8000</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// Image tabs
function ImageTabs({ images }: { images: { src: string; alt: string; label: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-2">
      {images.length > 1 && (
        <div className="flex gap-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                active === i ? "bg-ink-900 text-white" : "bg-ink-100 text-ink-500 hover:bg-ink-200"
              }`}
            >
              {img.label}
            </button>
          ))}
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <BrowserFrame>
            <div className="relative w-full aspect-video overflow-hidden bg-ink-900">
              <Image
                src={images[active].src} alt={images[active].alt} fill
                className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" priority
              />
            </div>
          </BrowserFrame>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Project card
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isHKI = project.badges.includes("HKI");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease, delay: index * 0.1 }}
      className={`bg-white border rounded-2xl overflow-hidden flex flex-col ${
        isHKI ? "border-yellow-300" : "border-ink-200"
      }`}
    >
      {/* Screenshot */}
      <div className="bg-ink-50 border-b border-ink-100 p-3 sm:p-4 relative">
        {isHKI && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 bg-yellow-400 rounded-md text-2xs font-bold text-yellow-900">
            <FiAward className="w-3 h-3" />
            HKI
          </div>
        )}
        {project.images && project.images.length > 0 ? (
          <ImageTabs images={project.images} />
        ) : (
          <BrowserFrame>
            <div className="aspect-video bg-ink-100 flex items-center justify-center">
              <span className="text-ink-300 text-sm">No preview</span>
            </div>
          </BrowserFrame>
        )}
        <div className="flex items-center gap-1.5 mt-2.5">
          <span className="text-2xs text-ink-400">{project.period}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">
        <div>
          <p className="text-2xs font-semibold tracking-[0.1em] uppercase text-brand-500 mb-1">
            {project.subtitle}
          </p>
          <h3 className="font-bold text-ink-900 text-sm sm:text-base leading-snug">
            {project.title}
          </h3>
        </div>

        <p className="text-xs text-ink-500 leading-relaxed">{project.description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.badges.map((b) => (
            <span key={b} className={`px-2 py-0.5 rounded-md text-2xs font-semibold border ${badgeColor[b] ?? techDef}`}>
              {b}
            </span>
          ))}
        </div>

        <div className="sep" />

        {/* Expandable detail */}
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium transition-colors"
        >
          {expanded ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
          {expanded ? "Sembunyikan" : "Lihat detail"}
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
              className="overflow-hidden space-y-1.5"
            >
              {project.details.map((d, i) => (
                <li key={i} className="flex gap-2.5 text-xs text-ink-600 leading-relaxed">
                  <span className="mt-[5px] w-1 h-1 rounded-full bg-brand-400 shrink-0" />
                  {d}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.techStack.map((t) => (
            <span key={t} className={`px-2 py-0.5 rounded-md text-2xs font-medium border ${techColor[t] ?? techDef}`}>
              {t}
            </span>
          ))}
        </div>

        {(project.demoUrl || project.repoUrl) && (
          <div className="flex gap-2 pt-1">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-ink-900 hover:bg-ink-700 text-white text-xs font-semibold rounded-lg transition-colors">
                <FiExternalLink className="w-3.5 h-3.5" /> Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-ink-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <SectionHeader
            eyebrow="Proyek"
            title="Yang pernah "
            highlight="saya kerjakan"
            description="Proyek dari masa kuliah — penelitian, skripsi, dan klien nyata."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* HKI note — minimal */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
        >
          <FiAward className="w-4 h-4 text-yellow-600 shrink-0" />
          <p className="text-xs text-yellow-800">
            <span className="font-semibold">HKI terdaftar</span> — proyek skripsi
            tercatat di Kementerian Hukum RI, nomor <span className="font-mono">EC00202613459</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
