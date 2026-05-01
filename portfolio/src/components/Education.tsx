import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

export default function Education() {
  const { data } = usePortfolio();

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      <div className="section-label">05 / Education</div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-6xl font-black font-poppins mb-4 tracking-tight">My <span className="text-green-600">Education</span></h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.education.map((edu, index) => (
            <div key={edu.id} className={`reveal stagger-${(index % 5) + 1} tilt-card`}>
              <Card className="glass-card premium-card hover-glow border-none shadow-sm group tilt-card-inner">
                <CardContent className="p-8 relative overflow-hidden">
                  <div className="absolute -bottom-6 -right-6 text-green-100 group-hover:text-green-200 transition-colors duration-500">
                    <GraduationCap size={120} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-green-100 p-4 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shadow-inner">
                        <GraduationCap size={32} />
                      </div>
                      <Badge variant={edu.status === 'Pursuing' ? 'default' : 'secondary'} 
                             className={edu.status === 'Pursuing' 
                               ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-600/20' 
                               : 'bg-emerald-100 text-emerald-700 border border-emerald-200'}>
                        {edu.status}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-green-950 font-poppins mb-2">{edu.degree}</h3>
                    <p className="text-lg text-green-800 font-semibold mb-6">{edu.institution}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 text-sm font-medium">
                      <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                        <Calendar size={16} className="text-green-600" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <MapPin size={16} className="text-emerald-600" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
