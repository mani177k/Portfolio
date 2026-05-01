import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card, CardContent } from './ui/card';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export default function Experience() {
  const { data } = usePortfolio();

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="section-label">03 / Experience</div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-poppins mb-4 tracking-tight">Work <span className="text-green-600">Experience</span></h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-green-500/50 to-transparent -translate-x-1/2 md:translate-x-0 hidden md:block"></div>
          
          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <div key={exp.id} className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} reveal stagger-${(index % 5) + 1}`}>
                
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] -translate-x-1/2 z-10 hidden md:block"></div>
                
                <div className="w-full md:w-1/2"></div>
                
                <Card className="w-full md:w-1/2 glass-card premium-card hover-glow border-none group">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-green-100 p-3 rounded-xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shadow-inner">
                        <Briefcase size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-950 font-poppins">{exp.title}</h3>
                        <p className="text-green-600 font-semibold">{exp.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-green-700 mb-6">
                      <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-green-900 flex items-start gap-3 text-sm leading-relaxed">
                          <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-green-500 mt-2"></span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
