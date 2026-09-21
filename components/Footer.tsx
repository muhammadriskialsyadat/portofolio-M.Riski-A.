"use client";

import { SiGithub } from "react-icons/si";
import { FiLinkedin } from "react-icons/fi";
import { personalInfo, navLinks } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-ink-900 text-ink-400">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Brand */}
          <div className="space-y-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-bold text-xl tracking-tight text-white"
            >
              riski<span className="text-brand-400">.</span>
            </button>
            <p className="text-sm text-ink-500 max-w-xs leading-relaxed">
              Fresh Graduate · System Engineer · Siap Berkembang
            </p>
            <div className="flex items-center gap-4">
              <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-ink-500 hover:text-white transition-colors">
                <FiLinkedin className="w-4 h-4" />
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-ink-500 hover:text-white transition-colors">
                <SiGithub className="w-4 h-4" />
              </a>
              <a href={`mailto:${personalInfo.email}`}
                className="text-ink-500 hover:text-white transition-colors text-sm">
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="text-sm text-ink-500 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink-600">© {year} Muhammad Riski Alsyadat</p>
          <p className="text-xs text-ink-600">Built with Next.js + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
