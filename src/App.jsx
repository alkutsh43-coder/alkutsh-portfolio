import React, { useState, useEffect } from 'react';
import { AlkutshHero } from './components/AlkutshHero';
import { EditorialAbout } from './components/EditorialAbout';
import { EditorialProjects } from './components/EditorialProjects';
import { EditorialBio } from './components/EditorialBio';
import { EditorialFooter } from './components/EditorialFooter';
import { EditorialCaseStudy } from './components/EditorialCaseStudy';

export function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('alkutsh_lang') || 'ar';
    } catch {
      return 'ar';
    }
  });
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('alkutsh_lang', newLang);
    } catch {}
  };

  // Sync RTL / LTR direction with language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#071610] text-white font-sans selection:bg-botanical-lime selection:text-[#071610]">
      
      {/* 1. Full-Screen Cinematic Homepage Hero matching user's exact uploaded design */}
      <AlkutshHero
        lang={lang}
        setLang={handleSetLang}
        scrollToSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* 2. About Ahmed Maher (Alkutsh), Executive Portrait & Practice */}
        <EditorialAbout
          lang={lang}
        />

        {/* 3. Selected Works & Real Campaigns (Nabta Showcase & Continuous Marquee) */}
        <EditorialProjects
          lang={lang}
          onSelectProject={setSelectedProject}
        />

        {/* 4. About Ahmed Maher - Experience & Print Production Perspective */}
        <EditorialBio 
          lang={lang}
        />
      </main>

      {/* 4. Colophon & Direct Contact */}
      <EditorialFooter
        lang={lang}
      />

      {/* 5. Deep-Dive Case Study Reader */}
      {selectedProject && (
        <EditorialCaseStudy
          project={selectedProject}
          lang={lang}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

export default App;
