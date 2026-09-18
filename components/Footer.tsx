"use client";

import { personalInfo, navLinks } from "@/data/portfolio";
import { FiLinkedin, FiGithub, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* 1-col mobile → 2-col tablet → 3-col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">

          {/* Col 1: Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                R
              </div>
              <span className="font-bold text-white text-lg">
                Riski<span className="text-primary-400">.</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Fresh Graduate Sistem Informasi yang bersemangat dalam pengembangan perangkat lunak. Siap berkontribusi dan berkembang bersama tim yang dinamis.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { href: personalInfo.linkedIn, icon: FiLinkedin, label: "LinkedIn" },
                { href: personalInfo.github,   icon: FiGithub,   label: "GitHub" },
                { href: `mailto:${personalInfo.email}`, icon: FiMail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-neutral-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Nav */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest">Navigasi</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-xs uppercase tracking-widest">Kontak</h3>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${personalInfo.email}`} className="flex items-start gap-2.5 text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                  <FiMail className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="break-all text-xs sm:text-sm">{personalInfo.email}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2.5 text-sm text-neutral-400 hover:text-primary-400 transition-colors">
                  <FiPhone className="w-4 h-4 shrink-0" />
                  <span className="text-xs sm:text-sm">{personalInfo.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-neutral-400">
                <FiMapPin className="w-4 h-4 shrink-0" />
                <span className="text-xs sm:text-sm">{personalInfo.location}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            © {currentYear} Muhammad Riski Alsyadat. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">
            Built with <span className="text-primary-400">Next.js</span> &amp; <span className="text-primary-400">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
