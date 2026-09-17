import React, { useState } from 'react';
import { ArrowDown, Globe, Menu, X } from 'lucide-react';
import { AlkutshLogo } from './AlkutshLogo';

export const AlkutshHero = ({ lang, setLang, scrollToSection }) => {
  const isAr = lang === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full bg-[#071610] text-white flex flex-col justify-between overflow-hidden"
    >
      
      {/* 1. Background Photo: Ultra-HD 2K (2730x1536) - Ahmed Maher on the right, plant & dark space on the left */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="./assets/alkutsh_raw_bg_hd.png"
          alt="Ahmed Maher - Al Kutsh Designer"
          loading="eager"
          decoding="sync"
          className="hero-bg-photo w-full h-full object-cover object-[70%_center] sm:object-[68%_center] lg:object-[65%_center] select-none"
          style={{ 
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        />
        {/* Mobile ambient gradient veil */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071610] via-[#071610]/30 to-transparent lg:hidden pointer-events-none"></div>
        {/* Seamless bottom vignette blend into page */}
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 lg:h-52 bg-gradient-to-t from-[#071610] via-[#071610]/75 to-transparent pointer-events-none"></div>
      </div>

      {/* 2. Top Navigation Bar */}
      <header 
        className="relative z-30 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 pt-6 sm:pt-9 flex items-center justify-between" 
        style={{ direction: 'ltr' }}
      >
        
        {/* Left Side: Alkutsh Designs Emblem + Typography */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="group cursor-pointer select-none flex items-center"
          aria-label="Alkutsh Designs Home"
        >
          <AlkutshLogo className="h-9 sm:h-12" light={true} />
        </a>

        {/* Right Side: Navigation Links & Language Switcher Pill */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          <nav 
            className="flex items-center gap-6 lg:gap-8 text-base lg:text-[17px] font-semibold select-none"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", "29LT Kaff", sans-serif' : 'sans-serif' }}
          >
            {/* الرئيسية (Active Tab with Lime Green Accent & Underline) */}
            <button
              onClick={() => handleNavClick('home')}
              className="relative text-[#82E16B] font-bold py-1 hover:text-[#9df288] transition-colors cursor-pointer"
            >
              {isAr ? 'الرئيسية' : 'Home'}
              <span className="absolute -bottom-1 inset-x-0 h-[2.5px] bg-[#82E16B] rounded-full"></span>
            </button>

            {/* نبذه عني */}
            <button
              onClick={() => handleNavClick('about')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 cursor-pointer"
            >
              {isAr ? 'نبذه عني' : 'About'}
            </button>

            {/* الاعمال */}
            <button
              onClick={() => handleNavClick('portfolio')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 cursor-pointer"
            >
              {isAr ? 'الاعمال' : 'Portfolio'}
            </button>

            {/* الخدمات */}
            <button
              onClick={() => handleNavClick('services')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 cursor-pointer"
            >
              {isAr ? 'الخدمات' : 'Services'}
            </button>

            {/* التواصل */}
            <button
              onClick={() => handleNavClick('contact')}
              className="text-white/90 hover:text-[#82E16B] transition-colors py-1 cursor-pointer"
            >
              {isAr ? 'التواصل' : 'Contact'}
            </button>
          </nav>

          {/* Language Pill Switcher: (🌐 EN) */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/40 hover:border-[#82E16B] bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer"
            title={isAr ? 'Switch to English' : 'التحويل للعربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#82E16B]" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>
        </div>

        {/* Mobile Controls: Language Switcher + Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/30 bg-black/60 backdrop-blur-md text-white text-xs font-bold shadow-md cursor-pointer"
          >
            <Globe className="w-3 h-3 text-[#82E16B]" />
            <span>{isAr ? 'EN' : 'عربي'}</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#82E16B] hover:text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden relative z-40 bg-[#071610]/98 backdrop-blur-xl border-b border-[#1A4031] px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-3" style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}>
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center justify-between text-base font-extrabold text-[#82E16B] py-2 border-b border-[#143224] text-start cursor-pointer"
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
              <span className="w-2 h-2 rounded-full bg-[#82E16B]"></span>
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="flex items-center justify-between text-base font-bold text-white/90 hover:text-[#82E16B] py-2 border-b border-[#143224] text-start transition-colors cursor-pointer"
            >
              <span>{isAr ? 'نبذه عني' : 'About'}</span>
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className="flex items-center justify-between text-base font-bold text-white/90 hover:text-[#82E16B] py-2 border-b border-[#143224] text-start transition-colors cursor-pointer"
            >
              <span>{isAr ? 'الاعمال' : 'Portfolio'}</span>
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="flex items-center justify-between text-base font-bold text-white/90 hover:text-[#82E16B] py-2 border-b border-[#143224] text-start transition-colors cursor-pointer"
            >
              <span>{isAr ? 'الخدمات' : 'Services'}</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="flex items-center justify-between text-base font-bold text-white/90 hover:text-[#82E16B] py-2 text-start transition-colors cursor-pointer"
            >
              <span>{isAr ? 'التواصل' : 'Contact'}</span>
            </button>
          </nav>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. الصندوق الرئيسي لنصوص الهيرو (Hero Typography Container)                */}
      {/* ========================================================================= */}
      <div 
        className="hero-text-container relative z-20 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 my-auto -mt-6 sm:-mt-12 lg:-mt-20 py-4 sm:py-6"
        style={{ 
          direction: 'ltr',
          /* 📌 [1] تحريك كتلة النصوص كلها مع بعضها:
             - رقم أكبر (مثلاً 220px أو 250px) ينزل الكتلة كلها لتحت.
             - رقم أصغر (مثلاً 150px أو 100px أو 50px) يرفع الكتلة كلها لفوق.
          */
          transform: 'translateY(170px)' 
        }}
      >
        <div className="flex justify-start">
          <div 
            className="w-full max-w-xl sm:max-w-2xl space-y-3 sm:space-y-4 text-left flex flex-col items-start"
            style={{ direction: 'ltr', textAlign: 'left' }}
          >
            
            {/* ------------------------------------------------------------- */}
            {/* 📌 [2] السطر التمهيدي: "مـصـمـم جـرافـيـك"                     */}
            {/* ------------------------------------------------------------- */}
            <div 
              /* حجم خط كلمة مصمم جرافيك: تقدر تغير md:text-[30px] لأي مقاس */
              className="hero-eyebrow text-white font-medium text-sm sm:text-base md:text-[30px] text-white/95"
              style={{ 
                fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit',
                /* لضبط التباعد بين الحروف: كبّر الرقم (مثلاً 0.4em) أو صغّره (0.2em) */
                letterSpacing: isAr ? '.2em' : '0em',
                /* لرفع أو تنزيل هذا السطر بمفرده (سالب = لفوق، موجب = لتحت): */
                transform: 'translateY(10px)',
                /* مسافة فراغ تحته: */
                marginBottom: '10px'
              }}
            >
              {isAr ? 'مـصـمـم   جـــرافـــــيــــــــك' : 'GRAPHIC   DESIGNER'}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 📌 [3] العنوان الرئيسي: "أحمد ماهر" و "الكوتش ديزاين"         */}
            {/* ------------------------------------------------------------- */}
            <h1 
              /* حجم الخط في الشاشات: تقدر تعدل lg:text-[80px] */
              className="hero-title text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[88px] font-black leading-[1.08] tracking-tight select-none"
              style={{ 
                fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif',
                /* لرفع أو تنزيل العنوان بالكامل بمفرده (سالب = لفوق، موجب = لتحت): */
                transform: 'translateY(0px)'
              }}
            >
              {/* سطر (1): "أحمد ماهر" */}
              <span 
                className="block text-white font-extrabold"
                style={{
                  /* لرفع أو تنزيل كلمة "أحمد ماهر" وحدها (سالب = لفوق، موجب = لتحت): */
                  transform: 'translateY(10px)'
                }}
              >
                {isAr ? 'أحمد مــاهــر' : 'Ahmed Maher'}
              </span>

              {/* سطر (2): "الكوتش ديزاين" */}
              <span 
                className="block text-[#82E16B] font-extrabold"
                style={{
                  /* المسافة الرأسية بين "أحمد ماهر" و "الكوتش ديزاين" (مثلاً 4px أو 8px أو 14px): */
                  marginTop: '10px',
                  /* لرفع أو تنزيل كلمة "الكوتش ديزاين" وحدها (سالب = لفوق، موجب = لتحت): */
                  transform: 'translateY(0px)'
                }}
              >
                {isAr ? 'الكوتـش ديـزايــن' : 'Al Kutsh Design'}
              </span>
            </h1>

            {/* ------------------------------------------------------------- */}
            {/* 📌 [4] الفقرة الوصفية: "حلول تصميمية حديثة ومتقنة..."         */}
            {/* ------------------------------------------------------------- */}
            <p 
              /* حجم خط الفقرة: تقدر تغير lg:text-[18px] */
              className="hero-desc text-white/95 text-sm sm:text-base md:text-[17px] lg:text-[18px] font-normal leading-relaxed max-w-lg"
              style={{ 
                fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif',
                /* المسافة بين الفقرة والعنوان اللي فوقها: */
                marginTop: '20px',
                /* لرفع أو تنزيل الفقرة وحدها (سالب = لفوق، موجب = لتحت): */
                transform: 'translateY(0px)'
              }}
            >
              {isAr 
                ? 'حلول تصميمية حديثة ومتقنة توازن بدقة بين البساطة والأثر البصري القوي'
                : 'Modern, refined design solutions that balance simplicity with strong visual impact.'}
            </p>

            {/* ------------------------------------------------------------- */}
            {/* 📌 [5] الخط الأخضر الديكوري (—)                                */}
            {/* ------------------------------------------------------------- */}
            <div 
              /* w-12 هو طول الخط، h-[3.5px] هو سمكه */
              className="hero-line w-12 sm:w-14 h-[3.5px] bg-[#82E16B] rounded-full"
              style={{
                /* المسافة بين الخط الأخضر والفقرة فوقه: */
                marginTop: '16px',
                /* لرفع أو تنزيل الخط الأخضر بمفرده (سالب = لفوق، موجب = لتحت): */
                transform: 'translateY(0px)'
              }}
            ></div>

          </div>
        </div>
      </div>

      {/* 4. Bottom Controls: [انتقل لأسفل] on Left & [مصر / العاشر من رمضان] on Right */}
      <footer 
        className="relative z-20 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 pb-6 sm:pb-10 flex items-center justify-between" 
        style={{ direction: 'ltr' }}
      >
        
        {/* Bottom Left: Scroll Down Button */}
        <button
          onClick={() => handleNavClick('about')}
          className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 hover:border-[#82E16B]/60 text-white hover:text-[#82E16B] text-xs sm:text-sm font-medium transition-all shadow-lg cursor-pointer select-none"
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
        >
          <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#82E16B] group-hover:translate-y-0.5 transition-transform" />
          <span>{isAr ? 'انتقل لأسفل' : 'Scroll Down'}</span>
        </button>

        {/* Bottom Right: Location Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium shadow-lg select-none"
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#82E16B] animate-pulse"></span>
          <span>{isAr ? 'مصر / العاشر من رمضان' : 'Egypt / 10th of Ramadan'}</span>
        </div>

      </footer>

    </section>
  );
};
