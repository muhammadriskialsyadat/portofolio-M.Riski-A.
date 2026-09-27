"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/SectionHeader";
import { personalInfo, education, stats, softSkills } from "@/data/portfolio";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease, delay } },
});

export default function About() {
  const [imgErr, setImgErr] = useState(false);

  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            eyebrow="Tentang Saya"
            title="Siapa saya, "
            highlight="sebenarnya?"
            description="Fresh graduate yang senang belajar, senang berkolaborasi, dan percaya bahwa kode yang baik dimulai dari memahami masalah dengan baik."
            descriptionClass="text-justify hyphens-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Kiri: foto + stats ────────────────────────── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
            className="space-y-6"
          >
            {/* Foto — frame natural */}
            <div className="relative w-fit mx-auto lg:mx-0">
              {/* Offset shadow box */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-brand-100" />
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden bg-ink-100 border border-ink-200">
                {!imgErr ? (
                  <Image
                    src={personalInfo.profileImage}
                    alt={`Foto ${personalInfo.name}`}
                    fill
                    className="object-cover object-top"
                    sizes="240px"
                    priority
                    onError={() => setImgErr(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-ink-300 tracking-tighter">RA</span>
                  </div>
                )}
              </div>
              {/* Status */}
              <div className="absolute -bottom-3 left-4 flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-ink-200 shadow-card text-xs font-medium text-ink-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to Work
              </div>
            </div>

            {/* Stats — tabel bukan card grid */}
            <div className="border border-ink-200 rounded-2xl overflow-hidden divide-y divide-ink-100">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp(i * 0.06)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-center justify-between px-5 py-3.5 bg-white hover:bg-ink-50 transition-colors"
                >
                  <span className="text-sm text-ink-500">{s.label}</span>
                  <span className="text-lg font-bold text-ink-900">{s.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact — plain list */}
            <div className="space-y-2 text-sm text-ink-500">
              <p>{personalInfo.location}</p>
              <a href={`mailto:${personalInfo.email}`} className="block hover:text-brand-600 transition-colors truncate">
                {personalInfo.email}
              </a>
              <a href={`tel:${personalInfo.phone}`} className="block hover:text-brand-600 transition-colors">
                {personalInfo.phone}
              </a>
            </div>
          </motion.div>

          {/* ── Kanan: bio + pendidikan + soft skills ────── */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
            className="space-y-10"
          >
            {/* Bio */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-ink-400 mb-3">Profil</h3>
              <p className="text-ink-600 leading-relaxed text-[15px] text-justify hyphens-auto">{personalInfo.bio}</p>
            </div>

            <div className="sep" />

            {/* Pendidikan */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-ink-400 mb-4">Pendidikan</h3>
              {education.map((edu) => (
                <div key={edu.institution} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink-900 text-sm">{edu.institution}</p>
                    <p className="text-sm text-ink-500 mt-0.5">{edu.degree}</p>
                    <p className="text-xs text-ink-400 mt-0.5">{edu.location}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block px-2.5 py-0.5 bg-brand-50 text-brand-700 text-xs font-bold rounded-md border border-brand-100">
                      IPK {edu.gpa}
                    </span>
                    <p className="text-xs text-ink-400 mt-1">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="sep" />

            {/* Soft skills — tag cloud, bukan grid card */}
            <div>
              <h3 className="text-xs font-semibold tracking-[0.12em] uppercase text-ink-400 mb-4">Karakter Kerja</h3>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-lg bg-ink-50 border border-ink-200 text-ink-700 text-xs font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
