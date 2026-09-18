import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      {/* ── Sticky Navbar ──────────────────────────────────── */}
      <Navbar />

      {/* ── Main content ───────────────────────────────────── */}
      <main>
        {/* Hero — Task 3 ✅ */}
        <Hero />

        {/* About — Task 4 ✅ */}
        <About />

        {/* Skills — Task 5 ✅ */}
        <Skills />

        {/* Experience — Task 6 ✅ */}
        <Experience />

        {/* Projects — Task 7 ✅ */}
        <Projects />

        {/* Certifications — Task 8 ✅ */}
        <Certifications />

        {/* Contact — Task 8 ✅ */}
        <Contact />
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
