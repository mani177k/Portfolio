import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import type { PortfolioData } from '../context/PortfolioContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const { data, updateData } = usePortfolio();
  const { toast } = useToast();
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSave = () => {
    updateData(formData);
    toast({
      title: "Changes Saved",
      description: "Portfolio data has been updated successfully.",
      className: "bg-green-900 border-green-500 text-slate-900",
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'Admin@123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-green-50/50 flex items-center justify-center p-4">
        <div className="glass-card p-8 max-w-md w-full rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-poppins text-green-950 mb-2">Admin Access</h1>
            <p className="text-green-700">Please sign in to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-green-900">Email Address</label>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-green-50 border-green-200 text-green-950 focus:ring-green-500 rounded-xl h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-green-900">Security Password</label>
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-green-50 border-green-200 text-green-950 focus:ring-green-500 rounded-xl h-12"
                required
              />
            </div>
            {loginError && <p className="text-red-500 text-sm font-medium animate-pulse">{loginError}</p>}
            <Button type="submit" className="w-full bg-green-600 shadow-xl shadow-green-600/20 hover:-translate-y-1 hover:shadow-green-600/40 transition-all duration-300 hover:bg-green-500 text-white h-12 rounded-xl text-lg font-bold">
              Unlock Dashboard
            </Button>
          </form>
          <Button variant="ghost" onClick={() => navigate('/')} className="w-full mt-6 text-green-700 hover:text-green-900 hover:bg-green-100/50 rounded-xl">
            <ArrowLeft size={16} className="mr-2" /> Return to Site
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black font-poppins text-green-950 mb-2">Admin <span className="text-green-600">Dashboard</span></h1>
            <p className="text-green-700 font-medium">Control and curate your professional presence</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <Button variant="outline" onClick={() => navigate('/')} className="border-green-200 text-green-800 hover:bg-green-100/50 rounded-xl h-12 px-6">
              <ArrowLeft size={16} className="mr-2" /> Back
            </Button>
            <Button variant="outline" onClick={handleLogout} className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl h-12 px-6">
              Logout
            </Button>
            <Button onClick={handleSave} className="bg-green-600 shadow-xl shadow-green-600/20 hover:-translate-y-1 hover:shadow-green-600/40 transition-all duration-300 hover:bg-green-500 text-white rounded-xl h-12 px-6 font-bold flex-1 md:flex-none">
              <Save size={16} className="mr-2" /> Save Changes
            </Button>
          </div>
        </div>

        <div className="glass-card p-2 sm:p-6 rounded-3xl">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="bg-green-100/50 border-green-200/50 mb-8 flex flex-wrap h-auto p-1.5 rounded-2xl">
              <TabsTrigger value="about" className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-xl py-2.5 px-6 font-semibold">About</TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-xl py-2.5 px-6 font-semibold">Skills</TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-xl py-2.5 px-6 font-semibold">Experience</TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-xl py-2.5 px-6 font-semibold">Projects</TabsTrigger>
              <TabsTrigger value="education" className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-xl py-2.5 px-6 font-semibold">Education</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-800">Description</label>
                <Textarea 
                  value={formData.about.description}
                  onChange={(e) => setFormData({...formData, about: {...formData.about, description: e.target.value}})}
                  className="bg-slate-50 border-slate-200 text-slate-900 min-h-[150px]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-800">Highlights (One per line)</label>
                <Textarea 
                  value={formData.about.highlights.join('\n')}
                  onChange={(e) => setFormData({...formData, about: {...formData.about, highlights: e.target.value.split('\n')}})}
                  className="bg-slate-50 border-slate-200 text-slate-900 min-h-[150px]"
                />
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-8">
              {formData.skills.map((category, catIndex) => (
                <div key={catIndex} className="bg-white/60 p-4 glass-card p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <Input 
                      value={category.category}
                      onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[catIndex].category = e.target.value;
                        setFormData({...formData, skills: newSkills});
                      }}
                      className="bg-white border-slate-200 text-slate-900 font-bold w-1/2"
                    />
                    <Button variant="destructive" size="icon" onClick={() => {
                      const newSkills = formData.skills.filter((_, i) => i !== catIndex);
                      setFormData({...formData, skills: newSkills});
                    }}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 mb-1 block">Skills (Comma separated)</label>
                    <Textarea 
                      value={category.items.join(', ')}
                      onChange={(e) => {
                        const newSkills = [...formData.skills];
                        newSkills[catIndex].items = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        setFormData({...formData, skills: newSkills});
                      }}
                      className="bg-white border-slate-200 text-slate-900 h-20"
                    />
                  </div>
                </div>
              ))}
              <Button onClick={() => setFormData({...formData, skills: [...formData.skills, { category: "New Category", items: [] }]})} 
                className="w-full bg-slate-50 hover:bg-gray-200 text-slate-900 border border-gray-400">
                <Plus size={16} className="mr-2" /> Add Skill Category
              </Button>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-8">
              {formData.experience.map((exp, idx) => (
                <div key={exp.id} className="bg-white/60 p-6 glass-card p-6 rounded-2xl space-y-4 relative">
                  <Button variant="destructive" size="icon" className="absolute top-4 right-4" onClick={() => {
                      const newExp = formData.experience.filter(e => e.id !== exp.id);
                      setFormData({...formData, experience: newExp});
                    }}>
                    <Trash2 size={16} />
                  </Button>
                  
                  <div className="grid md:grid-cols-2 gap-4 pr-12">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Title</label>
                      <Input value={exp.title} onChange={(e) => {
                        const newExp = [...formData.experience];
                        newExp[idx].title = e.target.value;
                        setFormData({...formData, experience: newExp});
                      }} className="bg-white border-slate-200 text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Company</label>
                      <Input value={exp.company} onChange={(e) => {
                        const newExp = [...formData.experience];
                        newExp[idx].company = e.target.value;
                        setFormData({...formData, experience: newExp});
                      }} className="bg-white border-slate-200 text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Period</label>
                      <Input value={exp.period} onChange={(e) => {
                        const newExp = [...formData.experience];
                        newExp[idx].period = e.target.value;
                        setFormData({...formData, experience: newExp});
                      }} className="bg-white border-slate-200 text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Location</label>
                      <Input value={exp.location} onChange={(e) => {
                        const newExp = [...formData.experience];
                        newExp[idx].location = e.target.value;
                        setFormData({...formData, experience: newExp});
                      }} className="bg-white border-slate-200 text-slate-900" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600">Responsibilities (One per line)</label>
                    <Textarea value={exp.responsibilities.join('\n')} onChange={(e) => {
                      const newExp = [...formData.experience];
                      newExp[idx].responsibilities = e.target.value.split('\n');
                      setFormData({...formData, experience: newExp});
                    }} className="bg-white border-slate-200 text-slate-900 h-32" />
                  </div>
                </div>
              ))}
              <Button onClick={() => setFormData({...formData, experience: [...formData.experience, { id: `exp-${Date.now()}`, title: "", company: "", period: "", location: "", responsibilities: [] }]})} 
                className="w-full bg-slate-50 hover:bg-gray-200 text-slate-900 border border-gray-400">
                <Plus size={16} className="mr-2" /> Add Experience
              </Button>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-8">
              {formData.projects.map((proj, idx) => (
                <div key={proj.id} className="bg-white/60 p-6 glass-card p-6 rounded-2xl space-y-4 relative">
                  <Button variant="destructive" size="icon" className="absolute top-4 right-4" onClick={() => {
                      const newProj = formData.projects.filter(p => p.id !== proj.id);
                      setFormData({...formData, projects: newProj});
                    }}>
                    <Trash2 size={16} />
                  </Button>
                  
                  <div className="grid md:grid-cols-2 gap-4 pr-12">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Project Title</label>
                      <Input value={proj.title} onChange={(e) => {
                        const newProj = [...formData.projects];
                        newProj[idx].title = e.target.value;
                        setFormData({...formData, projects: newProj});
                      }} className="bg-white border-slate-200 text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Project Image (Upload)</label>
                      <div className="flex items-center gap-3">
                        {proj.image && (
                          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200">
                            <img src={proj.image} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <Input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const newProj = [...formData.projects];
                                newProj[idx].image = reader.result as string;
                                setFormData({...formData, projects: newProj});
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                          className="bg-white border-slate-200 text-slate-900 cursor-pointer file:text-slate-700 file:font-medium" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600">Description</label>
                    <Textarea value={proj.description} onChange={(e) => {
                      const newProj = [...formData.projects];
                      newProj[idx].description = e.target.value;
                      setFormData({...formData, projects: newProj});
                    }} className="bg-white border-slate-200 text-slate-900 h-24" />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Technologies (Comma separated)</label>
                      <Textarea value={proj.technologies.join(', ')} onChange={(e) => {
                        const newProj = [...formData.projects];
                        newProj[idx].technologies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        setFormData({...formData, projects: newProj});
                      }} className="bg-white border-slate-200 text-slate-900 h-32" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Highlights (One per line)</label>
                      <Textarea value={proj.highlights.join('\n')} onChange={(e) => {
                        const newProj = [...formData.projects];
                        newProj[idx].highlights = e.target.value.split('\n');
                        setFormData({...formData, projects: newProj});
                      }} className="bg-white border-slate-200 text-slate-900 h-32" />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={() => setFormData({...formData, projects: [...formData.projects, { id: `proj-${Date.now()}`, title: "", description: "", image: "", technologies: [], highlights: [] }]})} 
                className="w-full bg-slate-50 hover:bg-gray-200 text-slate-900 border border-gray-400">
                <Plus size={16} className="mr-2" /> Add Project
              </Button>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education" className="space-y-8">
              {formData.education.map((edu, idx) => (
                <div key={edu.id} className="bg-white/60 p-6 glass-card p-6 rounded-2xl space-y-4 relative">
                  <Button variant="destructive" size="icon" className="absolute top-4 right-4" onClick={() => {
                      const newEdu = formData.education.filter(e => e.id !== edu.id);
                      setFormData({...formData, education: newEdu});
                    }}>
                    <Trash2 size={16} />
                  </Button>
                  
                  <div className="grid md:grid-cols-2 gap-4 pr-12">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Degree</label>
                      <Input value={edu.degree} onChange={(e) => {
                        const newEdu = [...formData.education];
                        newEdu[idx].degree = e.target.value;
                        setFormData({...formData, education: newEdu});
                      }} className="bg-white border-slate-200 text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Institution</label>
                      <Input value={edu.institution} onChange={(e) => {
                        const newEdu = [...formData.education];
                        newEdu[idx].institution = e.target.value;
                        setFormData({...formData, education: newEdu});
                      }} className="bg-white border-slate-200 text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Location</label>
                      <Input value={edu.location} onChange={(e) => {
                        const newEdu = [...formData.education];
                        newEdu[idx].location = e.target.value;
                        setFormData({...formData, education: newEdu});
                      }} className="bg-white border-slate-200 text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Period</label>
                      <Input value={edu.period} onChange={(e) => {
                        const newEdu = [...formData.education];
                        newEdu[idx].period = e.target.value;
                        setFormData({...formData, education: newEdu});
                      }} className="bg-white border-slate-200 text-slate-900" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600">Status</label>
                      <select 
                        value={edu.status} 
                        onChange={(e) => {
                          const newEdu = [...formData.education];
                          newEdu[idx].status = e.target.value as 'Pursuing' | 'Completed';
                          setFormData({...formData, education: newEdu});
                        }} 
                        className="w-full bg-white border border-slate-200 text-slate-900 h-10 px-3 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                      >
                        <option value="Pursuing">Pursuing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={() => setFormData({...formData, education: [...formData.education, { id: `edu-${Date.now()}`, degree: "", institution: "", location: "", period: "", status: "Pursuing" }]})} 
                className="w-full bg-slate-50 hover:bg-gray-200 text-slate-900 border border-gray-400">
                <Plus size={16} className="mr-2" /> Add Education
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
