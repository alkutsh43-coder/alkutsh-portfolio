import React from 'react';
import { Layers, ShieldCheck, Cpu, ArrowDown, Sparkles, CheckSquare, Eye } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const HeroSpread = ({ lang, onOpenProject }) => {
  const isAr = lang === 'ar';
  const heroProject = portfolioData.projects.find(p => p.isHero) || portfolioData.projects[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 border-b border-ink-800/10 dark:border-ink-800/50 bg-grid-technical">
      {/* Corner Crop Marks (Simulated Prepress Print Sheet Marks) */}
      <div className="absolute top-4 start-4 w-6 h-6 border-t-2 border-s-2 border-ink-400/40 pointer-events-none"></div>
      <div className="absolute top-4 end-4 w-6 h-6 border-t-2 border-e-2 border-ink-400/40 pointer-events-none"></div>
      <div className="absolute bottom-4 start-4 w-6 h-6 border-b-2 border-s-2 border-ink-400/40 pointer-events-none"></div>
      <div className="absolute bottom-4 end-4 w-6 h-6 border-b-2 border-e-2 border-ink-400/40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag & Document Identifier */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 font-mono text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink-900 text-paper-50 dark:bg-paper-100 dark:text-ink-950 rounded shadow-sm">
            <span className="w-2 h-2 rounded-full bg-print-orange"></span>
            <span className="font-bold tracking-wider uppercase">
              {isAr ? 'كتالوج الإنتاج المصغر v2.5' : 'MINI PRODUCTION CATALOGUE v2.5'}
            </span>
          </div>

          <div className="text-ink-600 dark:text-ink-400 flex items-center gap-4 text-[11px]">
            <span>REF: AM-KSA-PRINT-2026</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">OUTPUT: PDF/X-4 READY</span>
          </div>
        </div>

        {/* Hero Title and Golden Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-block font-mono text-xs tracking-widest text-print-orange font-semibold uppercase">
                {isAr ? '• فلسفة التصميم المقترن بالتنفيذ' : '• DESIGN TIED TO EXECUTION'}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink-950 dark:text-white leading-[1.15]">
                {isAr ? (
                  <>
                    مصمم يفكر في <span className="text-print-orange underline decoration-print-orange/40">التنفيذ والطباعة</span> من أول لحظة.
                  </>
                ) : (
                  <>
                    A Designer Who Thinks in <span className="text-print-orange underline decoration-print-orange/40">Production & Print</span> from Day One.
                  </>
                )}
              </h1>
            </div>

            {/* Core Message Quote Box */}
            <div className="p-5 rounded-lg border-s-4 border-print-orange bg-paper-100 dark:bg-ink-900/80 border border-ink-200 dark:border-ink-800 shadow-sm">
              <p className="text-base sm:text-lg font-medium text-ink-900 dark:text-paper-100 italic leading-relaxed">
                "{portfolioData.meta.statement[lang]}"
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-ink-600 dark:text-ink-400 border-t border-ink-200 dark:border-ink-800 pt-2">
                <span>{portfolioData.meta.author[lang]} — {portfolioData.meta.title[lang]}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {portfolioData.meta.saudiReadiness.badge[lang]}
                </span>
              </div>
            </div>

            {/* The Golden Thread (Design -> Prepress -> Printing -> Finishing -> Product) */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-600 dark:text-ink-400">
                {isAr ? 'الخيط الذهبي لكل مشروع (The Golden Thread):' : 'The Golden Thread of Every Project:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {portfolioData.meta.goldenThread.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-paper-200/70 dark:bg-ink-800/60 border border-ink-300/60 dark:border-ink-700/60 text-center"
                  >
                    <div className="font-mono text-[10px] text-print-orange font-bold">
                      0{idx + 1}. {item.step}
                    </div>
                    <div className="text-xs font-semibold text-ink-900 dark:text-ink-100 truncate mt-0.5" title={item[lang]}>
                      {item[lang]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fast Proof Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded border border-ink-200 dark:border-ink-800 bg-white/70 dark:bg-ink-900/60">
                <div className="text-xl font-bold font-mono text-ink-950 dark:text-white">100%</div>
                <div className="text-xs text-ink-600 dark:text-ink-400">
                  {isAr ? 'فيكتور CAD وقوالب تكسير دقيقة' : 'Vector CAD & Precision Dielines'}
                </div>
              </div>
              <div className="p-3 rounded border border-ink-200 dark:border-ink-800 bg-white/70 dark:bg-ink-900/60">
                <div className="text-xl font-bold font-mono text-ink-950 dark:text-white">ISO PDF/X</div>
                <div className="text-xs text-ink-600 dark:text-ink-400">
                  {isAr ? 'تجهيز Prepress معتمد للمطابع' : 'Certified Press-Ready Preflight'}
                </div>
              </div>
              <div className="p-3 rounded border border-ink-200 dark:border-ink-800 bg-white/70 dark:bg-ink-900/60 col-span-2 sm:col-span-1">
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {isAr ? 'السعودية' : 'KSA Ready'}
                </div>
                <div className="text-xs text-ink-600 dark:text-ink-400">
                  {isAr ? 'استعداد فوري للعمل والانتقال' : 'Immediate Relocation Readiness'}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Project Spotlight (First 10-Second Impression) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl border-2 border-ink-800 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-xl overflow-hidden group">
              {/* Top Bar of the Spec Card */}
              <div className="bg-ink-900 text-white px-4 py-2.5 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-print-dielineCut animate-ping"></span>
                  <span className="font-bold">HERO SPEC // TIER 01</span>
                </div>
                <span className="text-[11px] text-ink-400">HEIDELBERG XL 106</span>
              </div>

              {/* Product Visual with Prepress Callouts */}
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-950">
                <img
                  src={heroProject.imageUrl}
                  alt={heroProject.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                {/* Floating Technical Overlay Badges */}
                <div className="absolute top-3 start-3 bg-ink-950/90 text-white font-mono text-[10px] px-2.5 py-1 rounded border border-white/20 backdrop-blur-sm">
                  1400 GSM GREYBOARD + ARCTIC VOLUME SILK
                </div>

                <div className="absolute bottom-3 end-3 bg-print-orange/95 text-white font-mono text-[10px] px-2.5 py-1 rounded font-bold shadow-lg">
                  HOT GOLD FOIL + DIE-CUT INSERT
                </div>
              </div>

              {/* Technical Spec Box (Spec Block) */}
              <div className="p-4 bg-paper-100/90 dark:bg-ink-900 border-t border-ink-200 dark:border-ink-800 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-print-orange font-bold uppercase">
                      {heroProject.category[lang]}
                    </span>
                    <h3 className="font-bold text-ink-950 dark:text-white text-base">
                      {heroProject.title[lang]}
                    </h3>
                  </div>
                  <button
                    onClick={() => onOpenProject(heroProject)}
                    className="p-2 bg-ink-900 text-white dark:bg-paper-100 dark:text-ink-950 rounded hover:bg-print-orange dark:hover:bg-print-orange dark:hover:text-white transition shadow-sm text-xs font-mono flex items-center gap-1"
                    title="فتح دراسة الحالة والمواصفات الكاملة"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isAr ? 'عرض المواصفات' : 'View Specs'}</span>
                  </button>
                </div>

                {/* Grid of Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                    <div className="text-[10px] text-ink-500 uppercase">{isAr ? 'المقاس المغلق' : 'Finished Dimensions'}</div>
                    <div className="font-semibold text-ink-900 dark:text-white">{heroProject.specs.dimensions}</div>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                    <div className="text-[10px] text-ink-500 uppercase">{isAr ? 'نظام الألوان' : 'Color System'}</div>
                    <div className="font-semibold text-ink-900 dark:text-white truncate" title={heroProject.specs.colorMode}>
                      {heroProject.specs.colorMode}
                    </div>
                  </div>
                  <div className="p-2 rounded bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-700 col-span-2">
                    <div className="text-[10px] text-ink-500 uppercase">{isAr ? 'التشطيب ومعالجة السطح' : 'Surface Finishing'}</div>
                    <div className="font-semibold text-ink-900 dark:text-white text-[11px]">
                      {heroProject.specs.finishing}
                    </div>
                  </div>
                </div>

                {/* Prepress Guarantee Note */}
                <div className="text-[11px] text-ink-700 dark:text-ink-300 bg-paper-200/60 dark:bg-ink-800/80 p-2 rounded border-s-2 border-emerald-500 font-mono">
                  <strong>Prepress Check:</strong> {heroProject.specs.prepressNotes}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll prompt */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-ink-500 dark:text-ink-400">
          <span className="animate-bounce">⌖</span>
          <span>{isAr ? 'استكشف عارض الـ Prepress التفاعلي ودليل المشاريع بالأسفل' : 'Explore Interactive Prepress Inspector & Curated Works Below'}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

      </div>
    </section>
  );
};
