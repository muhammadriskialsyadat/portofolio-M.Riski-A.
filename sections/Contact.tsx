"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail, FiPhone, FiMapPin, FiLinkedin,
  FiGithub, FiSend, FiUser, FiMessageSquare,
} from "react-icons/fi";
import SectionHeader from "@/components/SectionHeader";
import { personalInfo } from "@/data/portfolio";

// ── Contact info items ────────────────────────────────────────
const contactItems = [
  {
    icon: FiMail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FiPhone,
    label: "WhatsApp / Telepon",
    value: personalInfo.phone,
    href: `https://wa.me/62${personalInfo.phone.replace(/^0/, "")}`,
    color: "bg-green-50 text-green-600",
  },
  {
    icon: FiMapPin,
    label: "Lokasi",
    value: personalInfo.location,
    href: "https://maps.google.com/?q=Depok+Indonesia",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "Muhammad Riski Alsyadat",
    href: personalInfo.linkedIn,
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "github.com/riskialsyadat",
    href: personalInfo.github,
    color: "bg-neutral-100 text-neutral-700",
  },
];

// ── Simple mailto form ────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", subject: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Halo Riski,%0A%0ANama: ${encodeURIComponent(form.name)}%0A%0APesan:%0A${encodeURIComponent(form.message)}`;
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const inputClass =
    "w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div className="relative">
        <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Nama kamu"
          className={`${inputClass} pl-10`}
          aria-label="Nama"
        />
      </div>

      {/* Subject */}
      <div className="relative">
        <FiMessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          placeholder="Subjek pesan"
          className={`${inputClass} pl-10`}
          aria-label="Subjek"
        />
      </div>

      {/* Message */}
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        required
        rows={5}
        placeholder="Tulis pesanmu di sini..."
        className={`${inputClass} resize-none`}
        aria-label="Pesan"
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
      >
        <FiSend className="w-4 h-4" />
        Kirim Pesan
      </button>

      <p className="text-xs text-neutral-400 text-center">
        Akan membuka aplikasi email kamu secara otomatis.
      </p>
    </form>
  );
}

// ── Main Section ──────────────────────────────────────────────
export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <SectionHeader
            badge="Kontak"
            title="Mari "
            highlight="Terhubung"
            description="Terbuka untuk peluang kerja, kolaborasi proyek, atau sekadar ngobrol seputar teknologi. Jangan ragu untuk menghubungi saya!"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── LEFT: Contact info ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="space-y-6"
          >
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-green-700">
                Tersedia untuk kesempatan baru
              </span>
            </div>

            {/* Intro text */}
            <p className="text-neutral-600 leading-relaxed text-[15px]">
              Saya aktif mencari peluang kerja sebagai{" "}
              <span className="text-primary-600 font-semibold">Back End Developer</span> atau{" "}
              <span className="text-primary-600 font-semibold">Full Stack Developer</span>.
              Respon biasanya dalam 1×24 jam.
            </p>

            {/* Contact items */}
            <div className="space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-card hover:border-primary-100 transition-all duration-200 group"
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">{label}</p>
                    <p className="text-xs sm:text-sm font-medium text-neutral-800 truncate mt-0.5">{value}</p>
                  </div>
                  <FiMail className="w-3.5 h-3.5 text-neutral-300 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Contact Form ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          >
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-card p-6 md:p-8">
              {/* Form header */}
              <div className="mb-6 space-y-1">
                <h3 className="text-lg font-extrabold text-neutral-900">
                  Kirim Pesan
                </h3>
                <p className="text-sm text-neutral-500">
                  Isi form berikut dan saya akan segera membalasnya.
                </p>
              </div>

              <ContactForm />
            </div>
          </motion.div>

        </div>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center space-y-4"
        >
          <div className="section-divider" />
          <p className="text-sm text-neutral-400 pt-4">
            Prefer langsung? Kirim email ke{" "}
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              {personalInfo.email}
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
