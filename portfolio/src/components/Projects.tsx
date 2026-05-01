import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import type { Project } from '../context/PortfolioContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from './ui/dialog';
import { Eye, ExternalLink, X, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const { data } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="section-label">04 / Projects</div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 slide-up">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-poppins mb-4 tracking-tight">Featured <span className="text-green-600">Projects</span></h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.map((project, index) => (
            <div key={project.id} className={`reveal stagger-${(index % 5) + 1} tilt-card`}>
              <Card 
                className="glass-card premium-card hover-glow border-none overflow-hidden group cursor-pointer shadow-sm tilt-card-inner" 
                onClick={() => setSelectedProject(project)}
              >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-green-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-600 hover:text-white bg-white/90 backdrop-blur-sm gap-2">
                    <Eye size={18} /> View Details
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-green-950 font-poppins mb-2 group-hover:text-green-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-green-700 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <Badge key={i} variant="secondary" className="bg-green-100/50 text-green-800 border border-green-200">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="bg-green-100/50 text-green-800 border border-green-200">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="bg-white border-slate-200 text-slate-900 max-w-3xl overflow-hidden p-0 max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <div className="relative h-64 sm:h-80 w-full">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <DialogClose className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-slate-900 hover:bg-black/80 transition-colors">
                  <X size={20} />
                </DialogClose>
              </div>
              
              <div className="p-4 sm:p-8">
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-3xl font-bold font-poppins text-slate-900 mb-2">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-slate-600 text-base">
                    {selectedProject.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-8 space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-green-950 mb-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, i) => (
                        <Badge key={i} className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-600 hover:text-white transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-green-950 mb-3 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span> Key Highlights
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.highlights.map((highlight, i) => (
                        <li key={i} className="text-green-900 flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100">
                          <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-medium leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
