"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FiCode,
  FiDatabase,
  FiLayout,
  FiTool,
} from "react-icons/fi";
import {
  SiHtml5, SiCss, SiJavascript, SiPhp, SiLaravel,
  SiDotnet, SiBootstrap, SiTailwindcss, SiMysql,
  SiPostgresql, SiFigma, SiGithub, SiGitlab, SiPostman,
} from "react-icons/si";
import { TbBrandCSharp, TbApi } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import SectionHeader from "@/components/SectionHeader";
import { skillCategories } from "@/data/portfolio";

// ── Icon map: skill name → react-icon ────────────────────────
// Fixes for react-icons v5: SiCss3→SiCss, SiMicrosoftsqlserver/SiOracle/SiCanva not available
const skillIconMap: Record<string, React.ReactNode> = {
  "HTML":               <SiHtml5 className="text-orange-500" />,
  "CSS":                <SiCss className="text-blue-500" />,
  "JavaScript":         <SiJavascript className="text-yellow-400" />,
  "PHP":                <SiPhp className="text-indigo-500" />,
  "C#":                 <TbBrandCSharp className="text-purple-600" />,
  "Laravel":            <SiLaravel className="text-red-500" />,
  "Blade":              <SiLaravel className="text-red-400" />,
  ".NET Core Web API":  <SiDotnet className="text-purple-500" />,
  "Bootstrap":          <SiBootstrap className="text-purple-600" />,
  "Tailwind CSS":       <SiTailwindcss className="text-cyan-500" />,
  "Filament":           <SiLaravel className="text-orange-400" />,
  "RESTful API":        <TbApi className="text-green-500" />,
  "Layering Structure": <FiCode className="text-primary-500" />,
  "Audit Trail":        <FiCode className="text-primary-500" />,
  "OOP":                <FiCode className="text-primary-500" />,
  "MySQL":              <SiMysql className="text-blue-600" />,
  "PostgreSQL":         <SiPostgresql className="text-blue-700" />,
  "SQL Server":         <FiDatabase className="text-red-600" />,
  "Oracle":             <FiDatabase className="text-red-500" />,
  "Figma":              <SiFigma className="text-pink-500" />,
  "Draw.io":            <FiLayout className="text-orange-500" />,
  "Canva":              <FiLayout className="text-teal-500" />,
  "GitHub":             <SiGithub className="text-neutral-800" />,
  "GitLab":             <SiGitlab className="text-orange-500" />,
  "VS Code":            <VscCode className="text-blue-500" />,
  "Postman":            <SiPostman className="text-orange-500" />,
  "Swagger":            <TbApi className="text-green-600" />,
  "Sourcetree":         <FiTool className="text-blue-500" />,
  "Microsoft Office":   <FiTool className="text-blue-600" />,
  "AI IDE":             <VscCode className="text-purple-500" />,
};

// ── Category icon map ─────────────────────────────────────────
const categoryIconMap: Record<string, React.ReactNode> = {
  code:     <FiCode className="w-5 h-5" />,
  database: <FiDatabase className="w-5 h-5" />,
  design:   <FiLayout className="w-5 h-5" />,
  tools:    <FiTool className="w-5 h-5" />,
};

// ── Category accent colors ────────────────────────────────────
const categoryColors: Record<string, { bg: string; border: string; icon: string; badge: string }> = {
  code:     { bg: "from-blue-50 to-indigo-50",   border: "border-blue-100",    icon: "bg-blue-100 text-blue-600",       badge: "bg-blue-50 text-blue-700 border-blue-100"          },
  database: { bg: "from-emerald-50 to-teal-50",  border: "border-emerald-100", icon: "bg-emerald-100 text-emerald-600", badge: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  design:   { bg: "from-pink-50 to-rose-50",     border: "border-pink-100",    icon: "bg-pink-100 text-pink-600",       badge: "bg-pink-50 text-pink-700 border-pink-100"          },
  tools:    { bg: "from-amber-50 to-orange-50",  border: "border-amber-100",   icon: "bg-amber-100 text-amber-600",     badge: "bg-amber-50 text-amber-700 border-amber-100"       },
};

// ── Single skill badge ────────────────────────────────────────
function SkillBadge({ name, colorClass }: { name: string; colorClass: string }) {
  const icon = skillIconMap[name];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${colorClass} transition-all duration-200 hover:scale-105`}
    >
      {icon && <span className="text-sm leading-none">{icon}</span>}
      {name}
    </span>
  );
}

// ── Tilt card per category ────────────────────────────────────
function SkillCard({
  category,
  icon,
  skills,
  index,
}: {
  category: string;
  icon: string;
  skills: string[];
  index: number;
}) {
  const colors = categoryColors[icon] ?? categoryColors.tools;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.1,
      }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.08}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="16px"
        scale={1.02}
        transitionSpeed={400}
        className="h-full"
      >
        <div
          className={`h-full bg-gradient-to-br ${colors.bg} rounded-2xl border ${colors.border} p-4 sm:p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col gap-3 sm:gap-4`}
        >
          {/* Card header */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${colors.icon} flex items-center justify-center shadow-sm shrink-0`}>
              {categoryIconMap[icon]}
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-sm sm:text-base leading-tight">
                {category}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {skills.length} teknologi
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/60" />

          {/* Skill badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {skills.map((skill) => (
              <SkillBadge key={skill} name={skill} colorClass={colors.badge} />
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────
export default function Skills() {
  const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <section
      id="skills"
      className="py-16 md:py-24 bg-neutral-50 border-b border-neutral-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 md:mb-14">
          <SectionHeader
            badge="Keahlian"
            title="Tech "
            highlight="Stack"
            description={`Kumpulan teknologi dan tools yang saya kuasai ${totalSkills} skill tersebar di ${skillCategories.length} kategori.`}
          />
        </div>

        {/* Cards grid — 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {skillCategories.map((cat, i) => (
            <SkillCard
              key={cat.category}
              category={cat.category}
              icon={cat.icon}
              skills={cat.skills}
              index={i}
            />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-xs sm:text-sm text-neutral-400 mt-8 md:mt-10"
        >
          💡 Hover pada card untuk efek 3D tilt interaktif
        </motion.p>
      </div>
    </section>
  );
}
