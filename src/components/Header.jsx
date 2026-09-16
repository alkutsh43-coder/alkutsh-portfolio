import React from 'react';
import { Printer, Globe, MessageSquare, CheckCircle2, ChevronRight } from 'lucide-react';

export const Header = ({ lang, setLang, isDark, setIsDark }) => {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800/10 dark:border-ink-700/40 bg-paper-50/95 dark:bg-ink-950/95 backdrop-blur-md transition-colors">
      {/* Top CMYK & Technical Calibration Strip */}
      <div className="border-b border-ink-800/10 dark:border-ink-800/60 bg-paper-100/60 dark:bg-ink-900/90 px-4 py-1 flex items-center justify-between text-[10px] font-mono text-ink-600 dark:text-ink-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 bg-[#00A3E0] rounded-sm" title="Cyan (C)"></span>
            <span className="inline-block w-2.5 h-2.5 bg-[#E4007C] rounded-sm" title="Magenta (M)"></span>
            <span className="inline-block w-2.5 h-2.5 bg-[#FFD100] rounded-sm" title="Yellow (Y)"></span>
            <span className="inline-block w-2.5 h-2.5 bg-[#121212] border border-ink-600/40 rounded-sm" title="Key/Black (K)"></span>
            <span className="inline-block w-2.5 h-2.5 bg-[#FF4800] rounded-sm" title="Spot Pantone"></span>
          </div>
          <span className="hidden sm:inline-block tracking-wider font-mono">
            {isAr ? 'معايير جودة الطباعة: ISO 12647-2 | CMYK + SPOT' : 'PRINT CALIBRATION: ISO 12647-2 | CMYK + SPOT'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {isAr ? 'جاهز للانتقال للعمل في السعودية' : 'Ready to Relocate to Saudi Arabia'}
          </span>
          <div className="hidden md:flex items-center gap-2 text-[9px] text-ink-400 dark:text-ink-500 border-s border-ink-300 dark:border-ink-800 ps-3">
            <span>BLEED: 3.0mm</span>
            <span>•</span>
            <span>DPI: 300</span>
            <span>•</span>
            <span>TAC: ≤300%</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Identity */}
        <div className="flex items-center gap-3">
          {/* Target Registration Mark Icon */}
          <div className="relative w-9 h-9 rounded-md border border-ink-800 dark:border-ink-300 flex items-center justify-center bg-paper-200 dark:bg-ink-800 font-mono text-ink-900 dark:text-ink-100 shadow-sm">
            <span className="text-base font-bold">⌖</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-print-orange rounded-full"></div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-ink-950 dark:text-white">
                {isAr ? 'أحمد ماهر' : 'Ahmed Maher'}
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 border border-ink-200 dark:border-ink-700">
                PROD-CATALOGUE
              </span>
            </div>
            <p className="text-xs text-ink-600 dark:text-ink-400 font-medium">
              {isAr ? 'مصمم جرافيك وطباعة خبير بالإنتاج' : 'Production-Aware Print & Packaging Designer'}
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono font-semibold border border-ink-300 dark:border-ink-700 text-ink-800 dark:text-ink-200 hover:bg-paper-200 dark:hover:bg-ink-800 transition"
            title="تبديل اللغة / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-print-orange" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-1.5 rounded text-ink-700 dark:text-ink-300 border border-ink-300 dark:border-ink-700 hover:bg-paper-200 dark:hover:bg-ink-800 transition text-xs font-mono"
            title="تبديل وضع الورق / العتمة"
          >
            {isDark ? '☀️ Paper' : '🌙 Dark'}
          </button>

          {/* Direct WhatsApp CTA */}
          <a
            href="https://wa.me/201067017778?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A3%D8%AD%D9%85%D8%AF%D8%8C%20%D8%A7%D8%B7%D9%84%D8%B9%D8%AA%20%D8%B9%D9%84%D9%89%20%D9%85%D8%B9%D8%B1%D8%B6%20%D8%A3%D8%B9%D9%85%D8%A7%D9%84%D9%83%20%D9%88%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-ink-950 hover:bg-ink-900 dark:bg-paper-100 dark:hover:bg-white text-paper-50 dark:text-ink-950 px-3.5 py-1.5 rounded text-xs font-semibold shadow-sm transition border border-transparent dark:border-ink-300"
          >
            <MessageSquare className="w-3.5 h-3.5 text-print-orange" />
            <span>{isAr ? 'محادثة واتساب سريعة' : 'WhatsApp Contact'}</span>
          </a>
        </div>
      </div>
    </header>
  );
};
