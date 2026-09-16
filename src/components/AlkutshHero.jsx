import React from 'react';
import { ArrowDown, Globe } from 'lucide-react';
import { AlkutshLogo } from './AlkutshLogo';

export const AlkutshHero = ({ lang, setLang, scrollToSection }) => {
  const isAr = lang === 'ar';

  return (
    <section id="home" className="relative min-h-screen w-full bg-[#071610] text-white flex flex-col justify-between overflow-hidden">
      
      {/* 1. Background Photo: Ultra-HD 2K (2560x1440) - Pure, Crisp, Zero Muddy Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="./assets/alkutsh_raw_bg_hd.png?v=5"
          alt="Ahmed Maher - Al Kutsh Design"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover object-[75%_center] sm:object-center lg:object-right-top select-none"
          style={{ 
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        />
        {/* Subtle bottom fade to smoothly transition into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#071610] to-transparent pointer-events-none"></div>
      </div>

      {/* 2. Top Navigation Bar (Logo on Left, Nav Links and Lang Toggle on Right) */}
      <header 
        className="relative z-20 w-full max-w-[1520px] mx-auto px-6 sm:px-12 pt-6 sm:pt-10 flex items-center justify-between" 
        style={{ direction: 'ltr' }}
      >
        
        {/* Clickable Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="group cursor-pointer select-none drop-shadow-md flex items-center"
        >
          <AlkutshLogo className="h-10 sm:h-12" light={true} />
        </a>

        {/* Navigation Links and Clear Dual-Language Switcher */}
        <div className="flex items-center gap-5 sm:gap-8">
          <nav className="flex items-center gap-4 sm:gap-7 text-sm sm:text-base font-bold tracking-wider" style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}>
            <button
              onClick={() => scrollToSection('home')}
              className="text-[#82E16B] font-extrabold relative py-1 hover:text-white transition-colors tracking-wide drop-shadow cursor-pointer"
            >
              {isAr ? 'الرئيسية' : 'HOME'}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#82E16B] rounded-full"></span>
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 tracking-wide drop-shadow cursor-pointer"
            >
              {isAr ? 'عن المصمم' : 'ABOUT'}
            </button>

            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 tracking-wide drop-shadow cursor-pointer"
            >
              {isAr ? 'الأعمال' : 'PORTFOLIO'}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 tracking-wide drop-shadow cursor-pointer"
            >
              {isAr ? 'تواصل' : 'CONTACT'}
            </button>
          </nav>

          {/* Clear, Prominent Language Toggle (العربية / EN) */}
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

      </header>

      {/* 3. Hero Typography strictly positioned on the LEFT over the dark background */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-12 my-auto py-12">
        <div className="flex justify-start" style={{ direction: 'ltr' }}>
          <div 
            className="max-w-xl sm:max-w-2xl space-y-5 text-left"
            style={{ direction: 'ltr' }}
          >
            
            {/* Eyebrow in Zain Length 1 */}
            <div 
              className="text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-[#82E16B] drop-shadow" 
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
            >
              {isAr ? 'مـصـمـم جـرافـيـك وهـويـات بـصـريـة' : 'G R A P H I C   D E S I G N E R'}
            </div>

            {/* Main Big Headline: in Zain Length 1 */}
            <h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[94px] font-black tracking-tight text-white leading-[1.05] drop-shadow-lg" 
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

            {/* Subtitle with Noto Sans Arabic */}
            <p 
              className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed font-medium pt-1 max-w-xl drop-shadow-md" 
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
            >
              {isAr 
                ? 'حلول تصميمية حديثة ومتقنة توازن بدقة بين البساطة والأثر البصري القوي.' 
                : 'MODERN, REFINED DESIGN SOLUTIONS THAT BALANCE SIMPLICITY WITH STRONG VISUAL IMPACT.'}
            </p>

            {/* Accent Divider Line */}
            <div className="w-20 h-[3px] bg-[#82E16B] rounded-full mt-4 shadow"></div>

          </div>
        </div>
      </div>

      {/* 4. Bottom Row: Interactive Scroll Down Button on Left & Location on Right */}
      <footer 
        className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-12 pb-8 sm:pb-12 flex items-center justify-between" 
        style={{ direction: 'ltr' }}
      >
        
        {/* Scroll Down Button */}
        <button
          onClick={() => scrollToSection('about')}
          className="group inline-flex items-center gap-3 text-sm font-bold tracking-wider text-white hover:text-[#82E16B] transition-colors cursor-pointer bg-black/60 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 shadow-lg"
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
        >
          <ArrowDown className="w-4 h-4 text-[#82E16B] group-hover:translate-y-1 transition-transform animate-bounce" />
          <span className="uppercase">
            {isAr ? 'انتقل للأسفل' : 'SCROLL DOWN'}
          </span>
        </button>

        {/* Location Badge */}
        <div 
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-sm font-semibold text-white shadow-lg"
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#82E16B] animate-pulse"></span>
          <span>{isAr ? 'مصر / العاشر من رمضان' : 'Egypt / 10th Of Ramadan'}</span>
        </div>

      </footer>

    </section>
  );
};
