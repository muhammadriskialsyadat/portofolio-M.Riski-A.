"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  descriptionClass?: string;   // override tambahan untuk description
  align?: "left" | "center";
  size?: "md" | "lg";
}

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  descriptionClass = "",
  align = "left",
  size = "lg",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease }}
      className={`${isCenter ? "text-center" : ""} space-y-2`}
    >
      {/* Eyebrow — teks kecil plain, tanpa pill/badge */}
      {eyebrow && (
        <p className="text-2xs font-semibold tracking-[0.15em] uppercase text-brand-500 mb-1">
          {eyebrow}
        </p>
      )}

      {/* Title — lebih besar, lebih weight, no gradient spam */}
      <h2
        className={`font-bold leading-tight tracking-tight text-ink-900 ${
          size === "lg"
            ? "text-3xl sm:text-4xl md:text-[2.6rem]"
            : "text-2xl sm:text-3xl"
        }`}
      >
        {highlight ? (
          <>
            {titleParts[0]}
            {/* Highlight: underline, bukan gradient */}
            <span className="relative inline-block">
              <span className="relative z-10">{highlight}</span>
              <span
                className="absolute bottom-0.5 left-0 w-full h-[6px] bg-brand-100 -z-0 rounded-sm"
                aria-hidden="true"
              />
            </span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {/* Description — lebih lebar, lebih readable */}
      {description && (
        <p
          className={`text-ink-500 leading-relaxed text-sm sm:text-base ${
            isCenter ? "max-w-xl mx-auto" : "max-w-2xl"
          } mt-3 ${descriptionClass}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
