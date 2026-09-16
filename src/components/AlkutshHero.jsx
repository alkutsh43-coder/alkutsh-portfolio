import React, { useState } from 'react';
import { ArrowDown, Menu, X } from 'lucide-react';
import { AlkutshLogo } from './AlkutshLogo';

export const AlkutshHero = ({ lang, setLang, scrollToSection }) => {
  const isAr = lang === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <section id="home" className="relative min-h-screen w-full bg-[#071610] text-white flex flex-col justify-between overflow-hidden">
      
      {/* 1. Background Photo: Ultra-HD 2K (2560x1440) - Full-bleed, edge-to-edge, zero frame, pure crisp natural lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="./assets/alkutsh_raw_bg_hd.png?v=5"
          alt="Ahmed Maher - Al Kutsh Design"
          loading="eager"
          decoding="sync"
          className="w-full h-[50vh] sm:h-[56vh] lg:h-full object-cover object-[70%_14%] sm:object-[68%_14%] lg:object-right-top select-none"
          style={{ 
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        />
        {/* Seamless gradient fade at the bottom of the photo into the #071610 background */}
        <div className="absolute top-[36vh] sm:top-[42vh] lg:top-auto lg:bottom-0 inset-x-0 h-36 sm:h-44 lg:h-48 bg-gradient-to-t from-[#071610] via-[#071610]/85 to-transparent pointer-events-none"></div>
      </div>

      {/* 2. Top Navigation Bar */}
      <header 
        className="relative z-30 w-full max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 sm:pt-10 flex items-center justify-between" 
      >
        
        {/* Clickable Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="group cursor-pointer select-none drop-shadow-md flex items-center"
        >
          <AlkutshLogo className="h-8 sm:h-12" light={true} />
        </a>

        {/* Desktop Navigation Links & Language Switcher */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-5 lg:gap-7 text-sm lg:text-base font-bold tracking-wider" style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}>
            <button
              onClick={() => handleNavClick('home')}
              className="text-[#82E16B] font-extrabold relative py-1 hover:text-white transition-colors tracking-wide drop-shadow cursor-pointer"
            >
              {isAr ? 'الرئيسية' : 'HOME'}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#82E16B] rounded-full"></span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 tracking-wide drop-shadow cursor-pointer"
            >
              {isAr ? 'عن المصمم' : 'ABOUT'}
            </button>

            <button
              onClick={() => handleNavClick('portfolio')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 tracking-wide drop-shadow cursor-pointer"
            >
              {isAr ? 'الأعمال' : 'PORTFOLIO'}
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 tracking-wide drop-shadow cursor-pointer"
            >
              {isAr ? 'تواصل' : 'CONTACT'}
            </button>
          </nav>

          {/* Language Toggle (العربية / EN) */}
          <div className="flex items-center bg-black/60 backdrop-blur-md rounded-full border border-white/25 p-1 shadow-lg text-xs sm:text-sm font-bold">
            <button
              onClick={() => setLang('ar')}
              className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                isAr ? 'bg-[#82E16B] text-[#071610] shadow-sm font-extrabold' : 'text-white/80 hover:text-white'
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-full transition-all duration-300 cursor-pointer ${
                !isAr ? 'bg-[#82E16B] text-[#071610] shadow-sm font-extrabold' : 'text-white/80 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Right Controls: Language Switcher + Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2.5">
          {/* Compact Language Toggle */}
          <div className="flex items-center bg-black/70 backdrop-blur-md rounded-full border border-white/20 p-0.5 shadow-md text-xs font-bold">
            <button
              onClick={() => setLang('ar')}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                isAr ? 'bg-[#82E16B] text-[#071610] font-extrabold shadow-sm' : 'text-white/70'
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                !isAr ? 'bg-[#82E16B] text-[#071610] font-extrabold shadow-sm' : 'text-white/70'
              }`}
            >
              EN
            </button>
          </div>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#82E16B] hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Mobile Menu Dropdown Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden relative z-40 bg-[#071610]/98 backdrop-blur-xl border-b border-[#1A4031] px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-3" style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}>
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center justify-between text-base font-extrabold text-[#82E16B] py-2 border-b border-[#143224] text-start cursor-pointer"
            >
              <span>{isAr ? 'الرئيسية' : 'HOME'}</span>
              <span className="w-2 h-2 rounded-full bg-[#82E16B]"></span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="flex items-center justify-between text-base font-bold text-white/90 hover:text-[#82E16B] py-2 border-b border-[#143224] text-start transition-colors cursor-pointer"
            >
              <span>{isAr ? 'عن المصمم' : 'ABOUT'}</span>
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="flex items-center justify-between text-base font-bold text-white/90 hover:text-[#82E16B] py-2 border-b border-[#143224] text-start transition-colors cursor-pointer"
            >
              <span>{isAr ? 'الأعمال المختارة' : 'PORTFOLIO'}</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-between text-base font-bold text-white/90 hover:text-[#82E16B] py-2 text-start transition-colors cursor-pointer"
            >
              <span>{isAr ? 'تواصل معي' : 'CONTACT'}</span>
            </button>
          </nav>
        </div>
      )}

      {/* 3. Hero Typography:
             - On Mobile (< lg): Positioned UNDER the portrait via pt-[38vh] xs:pt-[42vh], centered horizontally in the screen
             - On Desktop (lg): Positioned on the LEFT side over the dark background canvas (lg:pt-0 lg:text-start lg:justify-start)
      */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 my-auto pt-[46vh] xs:pt-[50vh] sm:pt-[54vh] lg:pt-0 py-4 sm:py-8 lg:py-12">
        <div className="w-full flex justify-center lg:justify-start">
          <div 
            className={`w-full max-w-xl sm:max-w-2xl space-y-3 sm:space-y-5 text-center lg:text-start ${isAr ? 'lg:text-right' : 'lg:text-left'} mx-auto lg:mx-0`}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            
            {/* Eyebrow */}
            <div 
              className={`text-xs sm:text-base font-bold text-[#82E16B] drop-shadow ${isAr ? 'tracking-normal' : 'tracking-[0.2em] uppercase'}`} 
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
            >
              {isAr ? 'مـصـمـم جـرافـيـك وهـويـات بـصـريـة' : 'G R A P H I C   D E S I G N E R'}
            </div>

            {/* Main Headline */}
            <h1 
              className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight text-white leading-[1.14] sm:leading-[1.05] drop-shadow-lg" 
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
            >
              {isAr ? (
                <>
                  أحمد ماهر
                  <span className="block text-[#82E16B] mt-1 font-extrabold">الكوتش للتصميم</span>
                </>
              ) : (
                <>
                  Al Kutsh
                  <span className="block text-[#82E16B] mt-1 font-extrabold">Design</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p 
              className="text-xs sm:text-base md:text-lg text-white/90 leading-relaxed font-medium pt-1 max-w-[280px] sm:max-w-md lg:max-w-xl mx-auto lg:mx-0 drop-shadow-md px-1 sm:px-0" 
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
            >
              {isAr 
                ? 'حلول تصميمية حديثة ومتقنة توازن بدقة بين البساطة والأثر البصري القوي.' 
                : 'MODERN, REFINED DESIGN SOLUTIONS THAT BALANCE SIMPLICITY WITH STRONG VISUAL IMPACT.'}
            </p>

            {/* Accent Divider Line */}
            <div className={`w-14 sm:w-20 h-[3px] bg-[#82E16B] rounded-full mt-2 sm:mt-4 shadow mx-auto ${isAr ? 'lg:mr-0 lg:ml-auto' : 'lg:ml-0 lg:mr-auto'}`}></div>

          </div>
        </div>
      </div>

      {/* 5. Bottom Row: Interactive Scroll Down Button & Location Badge */}
      <footer 
        className="relative z-10 w-full max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 pb-6 sm:pb-12 flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-3 sm:gap-4" 
      >
        
        {/* Scroll Down Button */}
        <button
          onClick={() => handleNavClick('about')}
          className="group inline-flex items-center justify-center gap-2.5 text-xs sm:text-sm font-bold tracking-wider text-white hover:text-[#82E16B] transition-colors cursor-pointer bg-black/60 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/20 shadow-lg"
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
        >
          <ArrowDown className="w-4 h-4 text-[#82E16B] group-hover:translate-y-1 transition-transform animate-bounce" />
          <span className="uppercase">
            {isAr ? 'انتقل للأسفل' : 'SCROLL DOWN'}
          </span>
        </button>

        {/* Location Badge */}
        <div 
          className="flex items-center justify-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-white shadow-lg"
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#82E16B] animate-pulse"></span>
          <span>{isAr ? 'مصر / العاشر من رمضان' : 'Egypt / 10th Of Ramadan'}</span>
        </div>

      </footer>

    </section>
  );
};
