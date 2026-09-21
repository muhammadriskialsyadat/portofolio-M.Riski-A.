"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, personalInfo } from "@/data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled]             = useState(false);
  const [menuOpen, setMenuOpen]             = useState(false);
  const [activeSection, setActiveSection]   = useState("");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const obs: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/96 backdrop-blur-sm border-b border-ink-200/60 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Wordmark — tidak ada avatar circle */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-baseline gap-0.5"
              aria-label="Ke atas"
            >
              <span className="font-bold text-base tracking-tight text-ink-900 group-hover:text-brand-600 transition-colors">
                riski
              </span>
              <span className="text-brand-500 font-black text-lg leading-none">.</span>
            </button>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = activeSection === link.href.replace("#", "");
                return (
                  <button
                    key={link.href}
                    onClick={() => go(link.href)}
                    className={`relative px-3 py-1.5 text-sm transition-colors rounded-md ${
                      active
                        ? "text-ink-900 font-medium"
                        : "text-ink-500 hover:text-ink-800 hover:bg-ink-50"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-md bg-ink-100 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              {/* CV — outlined, bukan solid */}
              <a
                href={personalInfo.cvUrl}
                download="CV_Muhammad_Riski_Alsyadat.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium rounded-lg border border-ink-300 text-ink-700 hover:border-brand-500 hover:text-brand-600 transition-colors"
              >
                CV
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-ink-100 transition-colors"
                aria-label="Menu"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-4.5 h-px bg-ink-800 rounded-full origin-center"
                  style={{ width: 18 }}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-px bg-ink-800 rounded-full"
                  style={{ width: 18 }}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-px bg-ink-800 rounded-full origin-center"
                  style={{ width: 18 }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink-900/30 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[58px] sm:top-[66px] inset-x-3 z-50 bg-white rounded-2xl border border-ink-200 shadow-card-lg overflow-hidden md:hidden"
              style={{ maxHeight: "calc(100dvh - 80px)" }}
            >
              <div className="overflow-y-auto p-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => go(link.href)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                      activeSection === link.href.replace("#", "")
                        ? "bg-brand-50 text-brand-700 font-medium"
                        : "text-ink-700 hover:bg-ink-50"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-2 pt-2 border-t border-ink-100">
                  <a
                    href={personalInfo.cvUrl}
                    download="CV_Muhammad_Riski_Alsyadat.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-ink-800 bg-ink-50 hover:bg-ink-100 rounded-xl transition-colors"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
