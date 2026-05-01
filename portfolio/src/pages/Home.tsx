import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  useReveal();

  React.useEffect(() => {
    const mouseGlow = document.getElementById('mouse-glow');
    if (!mouseGlow) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseGlow.style.opacity = '1';
      mouseGlow.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(34, 197, 94, 0.12), transparent 80%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <div className="dot-grid fixed inset-0 pointer-events-none opacity-[0.03] z-0" />
      <div id="mouse-glow" className="mouse-glow opacity-0 transition-opacity duration-500" />
      <div className="mesh-gradient" />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
