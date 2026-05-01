import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function About() {
  const { data } = usePortfolio();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="section-label">01 / About</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-6xl font-black font-poppins mb-4 tracking-tight">About <span className="text-green-600">Me</span></h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="slide-up">
            <Card className="glass-card premium-card border-none">
              <CardContent className="p-10">
                <h3 className="text-2xl font-bold text-green-950 mb-6 font-poppins flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 text-sm">01</span>
                  My Background
                </h3>
                <p className="text-green-900 leading-relaxed text-lg font-medium opacity-90">
                  {data.about.description}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 slide-up" style={{ animationDelay: '0.2s' }}>
            {data.about.highlights.map((highlight, index) => (
              <Card key={index} className="glass-card premium-card group border-none">
                <CardContent className="p-8 flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center group-hover:bg-green-600 transition-colors duration-500">
                    <CheckCircle2 size={24} className="text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-green-950 font-bold text-lg leading-tight">{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
