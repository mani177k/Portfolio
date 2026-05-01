import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Button } from './ui/button';
import { ArrowRight, Download, MapPin } from 'lucide-react';

export default function Hero() {
  const { data } = usePortfolio();
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="blob bg-green-500/20 w-64 h-64 md:w-96 md:h-96 rounded-full top-1/4 -left-20"></div>
      <div className="blob bg-emerald-500/20 w-56 h-56 md:w-80 md:h-80 rounded-full bottom-1/4 -right-10" style={{ animationDelay: '2s' }}></div>
      <div className="blob bg-green-600/10 w-48 h-48 md:w-72 md:h-72 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center pb-32 md:pb-0">
        <div className="flex flex-col items-start gap-6 slide-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-slate-200/50 text-sm font-medium text-green-600 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-poppins leading-tight">
            Hi, I'm <br />
            <span className="premium-gradient-text">
              Manikandan A
            </span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
            UI/UX Developer & Data Analyst
          </h2>
          
          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            Transforming data into meaningful insights with creative design thinking.
          </p>

          <div className="flex items-center gap-2 text-slate-600 mt-2">
            <MapPin size={18} className="text-green-600" />
            <span>Kodambakkam, Chennai</span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4 w-full sm:w-auto">
            <Button 
              className="w-full sm:w-auto bg-green-600 shadow-lg shadow-green-600/20 hover:-translate-y-1 hover:shadow-green-600/40 transition-all duration-300 hover:bg-green-500 text-white px-8 py-6 rounded-full text-lg gap-2 group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto border-green-600/50 text-green-600 hover:bg-green-950/30 hover:text-green-300 px-8 py-6 rounded-full text-lg gap-2"
              onClick={() => {
                const link = document.createElement('a');
                link.href = data.resumeUrl;
                link.download = 'Manikandan_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download size={18} />
              Download CV
            </Button>
          </div>


        </div>

        <div className="relative hidden md:flex justify-center items-center slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-96 h-96 flex items-center justify-center">
            {/* Main Circle */}
            <div className="glass-card w-56 h-56 rounded-full flex flex-col items-center justify-center z-20 glow-green float border-2 border-green-500/30">
              <span className="text-4xl font-black font-poppins text-green-950 tracking-tighter">UI/UX</span>
              <div className="h-0.5 w-12 bg-green-500 my-2 rounded-full"></div>
              <span className="text-3xl font-bold font-poppins text-green-800 tracking-tighter">DATA</span>
            </div>

            {/* Orbiting Ring 1 */}
            <div className="absolute inset-0 border border-green-500/10 rounded-full orbit">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Orbiting Ring 2 */}
            <div className="absolute inset-8 border border-emerald-500/10 rounded-full orbit-reverse">
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-emerald-500 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.6)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Orbiting Ring 3 */}
            <div className="absolute inset-20 border border-lime-500/5 rounded-full orbit" style={{ animationDuration: '25s' }}>
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-lime-500 rounded-full shadow-[0_0_15px_rgba(163,230,53,0.4)]"></div>
            </div>

            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-green-200/20 blur-xl rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-emerald-200/20 blur-xl rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
