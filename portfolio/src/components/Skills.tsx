import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export default function Skills() {
  const { data } = usePortfolio();

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="section-label">02 / Skills</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-poppins mb-4 tracking-tight">My <span className="text-green-600">Skills</span></h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.skills.map((category, index) => (
            <div key={index} className={`reveal stagger-${(index % 5) + 1} tilt-card`}>
              <Card className="glass-card premium-card hover-glow border-none shadow-sm tilt-card-inner">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 tracking-wide font-poppins">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="secondary"
                        className="bg-green-100/50 text-green-800 hover:bg-green-600 hover:text-white border border-green-200 transition-all px-4 py-2 text-sm shimmer"
                      >
                        {skill}
                      </Badge>
                    ))}
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
