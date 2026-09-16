import React from 'react';
import { editorialData } from '../data/portfolioData';
import { AlkutshLogo } from './AlkutshLogo';

export const EditorialHeader = ({ lang, setLang, scrollToSection }) => {
  const isAr = lang === 'ar';
  const { name, role } = editorialData.profile;

  return (
    <header className="sticky top-0 z-40 bg-[#0B1E16]/95 backdrop-blur-md border-b border-[#1A4031] text-white transition-colors">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        
        {/* Designer & Alkutsh Monogram */}
        <div className="flex items-center gap-5">
          <AlkutshLogo className="h-9 sm:h-10" light={true} />
          
          <div className="hidden md:block h-6 w-px bg-[#1A4031]"></div>

          <div className="hidden sm:flex flex-col">
            <a
              href="#works"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('works');
              }}
              className="text-base font-bold tracking-tight text-white hover:text-botanical-lime transition-colors"
            >
              {name[lang]}
            </a>
            <span className="text-[11px] text-[#95D5B2] font-normal">
              {role[lang]}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-5 sm:gap-8 text-xs sm:text-sm font-medium text-[#D8F3DC]">
          <button
            onClick={() => scrollToSection('works')}
            className="hover:text-botanical-lime transition-colors py-1"
          >
            {isAr ? 'الأعمال المختارة' : 'Works'}
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-botanical-lime transition-colors py-1"
          >
            {isAr ? 'عن المصمم' : 'About'}
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-botanical-lime transition-colors py-1"
          >
            {isAr ? 'تواصل' : 'Contact'}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="text-xs font-mono px-2 py-1 border border-[#2D6A4F] rounded text-white hover:border-botanical-lime hover:text-botanical-lime transition"
            title="تبديل اللغة / Switch Language"
          >
            {isAr ? 'EN' : 'عربي'}
          </button>
        </nav>

      </div>
    </header>
  );
};
