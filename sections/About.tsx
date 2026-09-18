"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiMapPin, FiMail, FiPhone, FiBookOpen,
  FiAward, FiCheckCircle, FiCalendar,
} from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import SectionHeader from "@/components/SectionHeader";
import { personalInfo, education, stats, softSkills } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: i * 0.07 },
  }),
};
const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-xl border border-neutral-100 shadow-card"
    >
      <span className="text-2xl sm:text-3xl font-extrabold gradient-text leading-none">{value}</span>
      <span className="text-[10px] sm:text-xs text-neutral-500 font-medium mt-1 uppercase tracking-wide text-center">{label}</span>
    </motion.div>
  );
}

export default function About() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10 md:mb-14">
          <SectionHeader
            badge="Tentang Saya"
            title="Siapa "
            highlight="Riski?"
            description="Fresh graduate yang passionate dalam software development, dengan pengalaman nyata di industri dan proyek akademik yang berdampak."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── LEFT col ───────────────────────────────────── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col items-center lg:items-start gap-5"
          >
            {/* Photo */}
            <div className="relative">
              <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-br from-primary-100 to-blue-100 -z-10" />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden bg-neutral-100 shadow-card">
                {!imgError ? (
                  <Image
                    src={personalInfo.profileImage}
                    alt={`Foto profil ${personalInfo.name}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 240px"
                    priority
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-blue-100">
                    <span className="text-5xl font-black gradient-text select-none">RA</span>
                  </div>
                )}
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-2.5 -right-2.5 flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-full shadow-md border border-neutral-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-neutral-700">Open to Work</span>
              </div>
            </div>

            {/* Contact card */}
            <div className="w-full bg-neutral-50 rounded-2xl border border-neutral-100 p-4 sm:p-5 space-y-2.5">
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Informasi Kontak</p>
              {[
                { icon: FiMapPin, text: personalInfo.location },
                { icon: FiMail,   text: personalInfo.email,  href: `mailto:${personalInfo.email}` },
                { icon: FiPhone,  text: personalInfo.phone,  href: `tel:${personalInfo.phone}` },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-600" />
                  </div>
                  {href ? (
                    <a href={href} className="text-xs sm:text-sm text-neutral-600 hover:text-primary-600 transition-colors truncate min-w-0">
                      {text}
                    </a>
                  ) : (
                    <span className="text-xs sm:text-sm text-neutral-600 truncate">{text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Stats grid 2×2 */}
            <div className="w-full grid grid-cols-2 gap-2 sm:gap-3">
              {stats.map((stat, i) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} delay={i} />
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT col ──────────────────────────────────── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Bio */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                <FiBookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 shrink-0" />
                Profil
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-[15px]">{personalInfo.bio}</p>
            </div>

            <div className="section-divider" />

            {/* Education */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                <HiOutlineAcademicCap className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 shrink-0" />
                Pendidikan
              </h3>
              {education.map((edu) => (
                <div key={edu.institution} className="relative pl-4 sm:pl-5 border-l-2 border-primary-200 space-y-1">
                  <div className="absolute -left-2 top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-primary-600 border-2 border-white shadow-sm" />
                  {/* Wrap: name left, badges right — stack on xs */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5 sm:gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-neutral-900 text-sm sm:text-base leading-snug">{edu.institution}</p>
                      <p className="text-xs sm:text-sm text-neutral-600">{edu.degree}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 flex-wrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-full border border-primary-100 whitespace-nowrap">
                        <FiAward className="w-3 h-3" />
                        IPK {edu.gpa}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-neutral-400 whitespace-nowrap">
                        <FiCalendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 flex items-center gap-1">
                    <FiMapPin className="w-3 h-3 shrink-0" />{edu.location}
                  </p>
                </div>
              ))}
            </div>

            <div className="section-divider" />

            {/* Soft Skills */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 flex items-center gap-2">
                <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 shrink-0" />
                Keterampilan Interpersonal
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {softSkills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-primary-200 hover:bg-primary-50/50 transition-colors group"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center shrink-0 transition-colors">
                      <FiCheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary-600" />
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-700 font-medium leading-snug">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
