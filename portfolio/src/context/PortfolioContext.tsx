import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type AboutData = {
  description: string;
  highlights: string[];
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type Experience = {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  highlights: string[];
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: 'Pursuing' | 'Completed';
};

export type PortfolioData = {
  about: AboutData;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  resumeUrl: string;
};

const initialData: PortfolioData = {
  about: {
    description: "I am a passionate UI/UX Developer and Data Analyst who believes in transforming data into meaningful insights with creative design thinking. With a strong analytical mindset and a keen eye for aesthetics, I bridge the gap between complex datasets and intuitive user interfaces.",
    highlights: [
      "Strong analytical mindset with creative problem-solving",
      "Proficient in data visualization and UI/UX design",
      "Experienced in building dashboards and data-driven applications",
      "Fluent in Tamil and English"
    ]
  },
  skills: [
    {
      category: "Languages & Databases",
      items: ["Python", "SQL", "MySQL"]
    },
    {
      category: "Data Science",
      items: ["Pandas", "NumPy", "Machine Learning"]
    },
    {
      category: "Visualization",
      items: ["Power BI", "Tableau", "Matplotlib", "Seaborn"]
    },
    {
      category: "Design & Tools",
      items: ["UI/UX Design", "Excel", "Data Cleaning", "React"]
    }
  ],
  experience: [
    {
      id: "exp-1",
      title: "Full Stack Developer Trainee",
      company: "XOON Infotech Pvt Ltd",
      period: "2025 - Present",
      location: "Chennai",
      responsibilities: [
        "Developing scalable full-stack applications",
        "Collaborating with UI/UX teams for seamless integrations",
        "Optimizing backend queries for faster data retrieval"
      ]
    },
    {
      id: "exp-2",
      title: "IT Governance Intern",
      company: "Sundaram Asset Management",
      period: "2023",
      location: "Chennai",
      responsibilities: [
        "Assisted in maintaining IT compliance and governance frameworks",
        "Analyzed operational data to identify process bottlenecks",
        "Created internal documentation and reporting dashboards"
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Real-Time Sales Performance Dashboard",
      description: "A comprehensive dashboard for tracking sales metrics in real-time.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      technologies: ["Power BI", "SQL", "Excel", "Data Analysis"],
      highlights: [
        "15,000+ records analyzed",
        "Reduced reporting time by 40%",
        "Identified top-performing regional products",
        "Created automated data pipelines"
      ]
    },
    {
      id: "proj-2",
      title: "Financial Fraud Detection",
      description: "Analytical model and dashboard for identifying anomalous financial transactions.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      technologies: ["Power BI", "SQL", "Excel", "KPI Analysis"],
      highlights: [
        "Detected patterns indicating potential fraud",
        "Built interactive visual reports for stakeholders",
        "Analyzed large transactional datasets",
        "Improved risk assessment accuracy"
      ]
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "MCA",
      institution: "SRM University",
      location: "Chennai",
      period: "2024 - 2026",
      status: "Pursuing"
    },
    {
      id: "edu-2",
      degree: "BCA",
      institution: "Loyola College",
      location: "Chennai",
      period: "2021 - 2024",
      status: "Completed"
    }
  ],
  resumeUrl: "/Manikandan Resume new.pdf"
};

type PortfolioContextType = {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse portfolio data", e);
      }
    }
    return initialData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
