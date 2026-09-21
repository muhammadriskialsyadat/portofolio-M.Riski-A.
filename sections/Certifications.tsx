"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiAward } from "react-icons/fi";
import { SiJavascript } from "react-icons/si";
import { FiCode, FiDatabase } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import { certifications } from "@/data/portfolio";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const cfg: Record<string, { icon: React.ReactNode; accent: string; dot: string }> = {
  hki:        { icon: <FiAward className="w-5 h-5" />,       accent: "text-yellow-600", dot: "bg-yellow-400" },
  web:        { icon: <FiCode className="w-5 h-5" />,        accent: "text-brand-600",  dot: "bg-brand-400" },
  javascript: { icon: <SiJavascript className="w-5 h-5" />,  accent: "text-yellow-500", dot: "bg-yellow-400" },
  database:   { icon: <FiDatabase className="w-5 h-5" />,    accent: "text-emerald-600",dot: "bg-emerald-400" },
  oracle:     { icon: <FiDatabase className="w-5 h-5" />,    accent: "text-red-500",    dot: "bg-red-400" },
};
const cfgDef = { icon: <FiAward className="w-5 h-5" />, accent: "text-ink-500", dot: "bg-ink-400" };

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-12">
          <SectionHeader
            eyebrow="Sertifikasi"
            title="Sertifikat & "
            highlight="pelatihan"
            description="Beberapa sertifikasi yang pernah saya ikuti selama masa studi."
          />
        </div>

        {/* List — bukan grid card, lebih seperti daftar */}
        <div className="border border-ink-200 rounded-2xl overflow-hidden divide-y divide-ink-100">
          {certifications.map((cert, i) => {
            const c = cfg[cert.icon] ?? cfgDef;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                className="flex items-center gap-4 px-5 py-4 bg-white hover:bg-ink-50 transition-colors group"
              >
                {/* Icon */}
                <div className={`shrink-0 ${c.accent}`}>
                  {c.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-ink-900 text-sm">{cert.title}</p>
                    {cert.icon === "hki" && (
                      <span className="px-1.5 py-0.5 bg-yellow-50 text-yellow-700 border border-yellow-200 text-2xs font-bold rounded">
                        RESMI
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <p className="text-xs text-ink-400">{cert.issuer}</p>
                    {cert.certNo && (
                      <>
                        <span className="text-ink-200">·</span>
                        <p className="text-xs text-ink-400 font-mono">{cert.certNo}</p>
                      </>
                    )}
                    {cert.year && (
                      <>
                        <span className="text-ink-200">·</span>
                        <p className="text-xs text-ink-400">{cert.year}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Category */}
                <span className="hidden sm:inline text-xs text-ink-400 shrink-0">{cert.category}</span>

                {/* Link */}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Lihat sertifikat ${cert.title}`}
                    className="shrink-0 text-ink-300 hover:text-brand-600 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
