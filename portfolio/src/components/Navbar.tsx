import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-50/80 backdrop-blur-md shadow-lg shadow-green-900/5 shadow-black/20 border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-green-400 via-green-600 to-green-400 transition-all duration-150" 
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-lg sm:text-2xl font-bold font-poppins cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-slate-900 group-hover:text-green-600 transition-colors duration-500">M</span>
          <span className="text-green-600">anikandan</span>
          <span className="text-green-600">&nbsp;A</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="text-sm font-medium text-slate-800 hover:text-green-600 transition-colors"
            >
              {link}
            </button>
          ))}
          <Button
            variant="default"
            className="bg-green-600 shadow-lg shadow-green-600/20 hover:-translate-y-1 hover:shadow-green-600/40 transition-all duration-300 hover:bg-green-500 text-white rounded-full px-6"
            onClick={() => scrollToSection('Contact')}
          >
            Hire Me
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-800 hover:text-slate-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-50/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center py-6 gap-6 fade-in shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="text-lg font-medium text-slate-800 hover:text-green-600 transition-colors w-full text-center py-2"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
