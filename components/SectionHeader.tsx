"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  badge: string;
  title: string;
  highlight?: string; // kata yang di-highlight dengan gradient
  description?: string;
  center?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  center = false,
}: SectionHeaderProps) {
  const titleParts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={`space-y-3 ${center ? "text-center" : ""}`}
    >
      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-widest">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
        {badge}
      </span>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 leading-tight">
        {highlight ? (
          <>
            {titleParts[0]}
            <span className="gradient-text">{highlight}</span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {/* Divider line */}
      <div className={`flex ${center ? "justify-center" : ""}`}>
        <div className="h-1 w-12 bg-primary-600 rounded-full" />
      </div>

      {/* Description */}
      {description && (
        <p className="text-neutral-500 max-w-2xl leading-relaxed text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}
