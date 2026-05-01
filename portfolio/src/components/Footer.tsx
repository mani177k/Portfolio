import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-green-50/80 border-t border-green-100 py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        <div className="text-xl sm:text-2xl font-bold font-poppins mb-6">
          <span className="text-green-950">Manikandan</span>
          <span className="text-green-600">&nbsp;A</span>
        </div>

        <div className="flex gap-6 mb-8">
          <a href="https://linkedin.com/in/manikandana177" target="_blank" rel="noopener noreferrer" className="bg-white p-3 rounded-xl text-green-700 hover:text-white hover:bg-green-600 transition-all shadow-lg shadow-green-900/5">
            <User size={20} />
          </a>
          <a href="mailto:manikandanak177@gmail.com" className="bg-white p-3 rounded-xl text-green-700 hover:text-white hover:bg-green-600 transition-all shadow-lg shadow-green-900/5">
            <Mail size={20} />
          </a>
          <a href="tel:8825628288" className="bg-white p-3 rounded-xl text-green-700 hover:text-white hover:bg-green-600 transition-all shadow-lg shadow-green-900/5">
            <Phone size={20} />
          </a>
        </div>

        <div className="text-center text-green-800 text-sm mb-2 font-medium">
          <p>&copy; {new Date().getFullYear()} Manikandan A. All rights reserved.</p>
        </div>
        
        <div className="text-center text-green-600 text-xs font-semibold">
          <p>Built with React & Tailwind CSS</p>
        </div>
        
      </div>
      
      {/* Hidden Admin Button */}
      <button 
        onClick={() => navigate('/admin')}
        className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-green-200 opacity-20 hover:opacity-100 hover:w-8 hover:h-8 hover:bg-green-600 transition-all flex items-center justify-center group"
        aria-label="Admin Panel"
      >
        <span className="hidden group-hover:block text-[12px] text-white">⚙️</span>
      </button>
    </footer>
  );
}
