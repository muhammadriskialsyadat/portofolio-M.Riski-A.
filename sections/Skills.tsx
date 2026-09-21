"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiHtml5, SiCss, SiJavascript, SiPhp, SiLaravel,
  SiDotnet, SiBootstrap, SiTailwindcss, SiMysql,
  SiPostgresql, SiFigma, SiGithub, SiGitlab, SiPostman,
} from "react-icons/si";
import { TbBrandCSharp, TbApi } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import { FiCode, FiDatabase, FiLayout, FiTool } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import { skillCategories } from "@/data/portfolio";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

// icon map — brand colors tetap, tapi lebih muted
const iconMap: Record<string, React.ReactNode> = {
  "HTML":               <SiHtml5 className="text-orange-400" />,
  "CSS":                <SiCss className="text-blue-400" />,
  "JavaScript":         <SiJavascript className="text-yellow-400" />,
  "PHP":                <SiPhp className="text-violet-400" />,
  "C#":                 <TbBrandCSharp className="text-purple-400" />,
  "Laravel":            <SiLaravel className="text-red-400" />,
  "Blade":              <SiLaravel className="text-red-300" />,
  ".NET Core Web API":  <SiDotnet className="text-purple-400" />,
  "Bootstrap":          <SiBootstrap className="text-purple-400" />,
  "Tailwind CSS":       <SiTailwindcss className="text-cyan-400" />,
  "Filament":           <SiLaravel className="text-amber-400" />,
  "RESTful API":        <TbApi className="text-emerald-400" />,
  "Layering Structure": <FiCode className="text-ink-400" />,
  "Audit Trail":        <FiCode className="text-ink-400" />,
  "OOP":                <FiCode className="text-ink-400" />,
  "MySQL":              <SiMysql className="text-blue-400" />,
  "PostgreSQL":         <SiPostgresql className="text-blue-500" />,
  "SQL Server":         <FiDatabase className="text-red-400" />,
  "Oracle":             <FiDatabase className="text-red-400" />,
  "Figma":              <SiFigma className="text-pink-400" />,
  "Draw.io":            <FiLayout className="text-orange-400" />,
  "Canva":              <FiLayout className="text-teal-400" />,
  "GitHub":             <SiGithub className="text-ink-700" />,
  "GitLab":             <SiGitlab className="text-orange-400" />,
  "VS Code":            <VscCode className="text-blue-400" />,
  "Postman":            <SiPostman className="text-orange-400" />,
  "Swagger":            <TbApi className="text-emerald-400" />,
  "Sourcetree":         <FiTool className="text-blue-400" />,
  "Microsoft Office":   <FiTool className="text-blue-400" />,
  "AI IDE":             <VscCode className="text-violet-400" />,
};

const catIcon: Record<string, React.ReactNode> = {
  code:     <FiCode className="w-4 h-4" />,
  database: <FiDatabase className="w-4 h-4" />,
  design:   <FiLayout className="w-4 h-4" />,
  tools:    <FiTool className="w-4 h-4" />,
};

export default function Skills() {
  const [active, setActive] = useState(0);
  const cat = skillCategories[active];

  return (
    <section id="skills" className="py-20 md:py-28 bg-ink-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-12">
          <SectionHeader
            eyebrow="Keahlian"
            title="Teknologi yang "
            highlight="pernah saya pakai"
            size="md"
            description="Dipelajari dan digunakan selama kuliah, magang, dan proyek pribadi."
          />
        </div>

        {/* Layout: tab kiri + konten kanan */}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-10">

          {/* Category tabs — vertikal di sm+, horisontal di mobile */}
          <div className="flex flex-row sm:flex-col gap-1 sm:w-44 shrink-0 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
            {skillCategories.map((c, i) => (
              <button
                key={c.category}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap sm:whitespace-normal ${
                  active === i
                    ? "bg-white border border-ink-200 text-ink-900 shadow-card"
                    : "text-ink-500 hover:text-ink-800 hover:bg-white/60"
                }`}
              >
                <span className={active === i ? "text-brand-500" : "text-ink-400"}>
                  {catIcon[c.icon]}
                </span>
                <span className="truncate">{c.category}</span>
              </button>
            ))}
          </div>

          {/* Skill grid */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
            className="flex-1 bg-white border border-ink-200 rounded-2xl p-5 sm:p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="text-brand-500">{catIcon[cat.icon]}</span>
              <h3 className="font-semibold text-ink-900 text-sm">{cat.category}</h3>
              <span className="ml-auto text-xs text-ink-400">{cat.skills.length} skill</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.25, ease }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-50 border border-ink-200 text-ink-700 text-xs font-medium hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-colors cursor-default"
                >
                  {iconMap[skill] && (
                    <span className="text-base leading-none">{iconMap[skill]}</span>
                  )}
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
