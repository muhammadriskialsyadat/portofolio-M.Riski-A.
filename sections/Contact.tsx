"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin } from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import { personalInfo } from "@/data/portfolio";

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

function ContactForm() {
  const [form, setForm] = useState({ name: "", subject: "", message: "" });
  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Halo Riski,%0A%0ANama: ${encodeURIComponent(form.name)}%0A%0APesan:%0A${encodeURIComponent(form.message)}`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${body}`;
  };

  const base = "w-full px-4 py-2.5 bg-ink-50 border border-ink-200 rounded-xl text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-400 transition-all";

  return (
    <form onSubmit={submit} className="space-y-3">
      <input type="text" name="name" value={form.name} onChange={set} required
        placeholder="Nama kamu" className={base} aria-label="Nama" />
      <input type="text" name="subject" value={form.subject} onChange={set} required
        placeholder="Subjek" className={base} aria-label="Subjek" />
      <textarea name="message" value={form.message} onChange={set} required
        rows={4} placeholder="Pesan..." className={`${base} resize-none`} aria-label="Pesan" />
      <button type="submit"
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-ink-900 hover:bg-ink-700 text-white text-sm font-semibold rounded-xl transition-colors">
        <FiSend className="w-4 h-4" /> Kirim via Email
      </button>
      <p className="text-2xs text-center text-ink-400">Membuka aplikasi email kamu</p>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28 bg-ink-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-12">
          <SectionHeader
            eyebrow="Kontak"
            title="Yuk, "
            highlight="ngobrol"
            description="Terbuka untuk diskusi, peluang kerja, atau sekadar ngobrol soal teknologi."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Kiri ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease }}
            className="space-y-8"
          >
            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-ink-600 font-medium">Aktif mencari kesempatan pertama</span>
            </div>

            <p className="text-ink-500 text-[15px] leading-relaxed max-w-sm">
              Saya fresh graduate yang sedang mencari tempat untuk belajar dan berkontribusi.
              Senang kalau bisa diskusi lebih lanjut.
            </p>

            {/* Contact list — plain, tidak over-designed */}
            <div className="space-y-3">
              {[
                { icon: FiMail,    label: personalInfo.email,    href: `mailto:${personalInfo.email}` },
                { icon: FiPhone,   label: personalInfo.phone,    href: `tel:${personalInfo.phone}` },
                { icon: FiMapPin,  label: personalInfo.location, href: undefined },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-ink-400 shrink-0" />
                  {href ? (
                    <a href={href} className="text-sm text-ink-600 hover:text-brand-600 transition-colors truncate">
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-ink-600">{label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 pt-2">
              <a href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ink-500 hover:text-brand-600 transition-colors">
                <FiLinkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors">
                <SiGithub className="w-4 h-4" /> GitHub
              </a>
            </div>
          </motion.div>

          {/* ── Kanan: form ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease, delay: 0.08 }}
          >
            <div className="bg-white border border-ink-200 rounded-2xl p-5 sm:p-6">
              <h3 className="font-semibold text-ink-900 text-sm mb-1">Kirim Pesan</h3>
              <p className="text-xs text-ink-400 mb-5">Saya akan balas secepatnya.</p>
              <ContactForm />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
