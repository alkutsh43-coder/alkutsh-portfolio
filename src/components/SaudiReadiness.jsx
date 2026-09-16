import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { MapPin, Plane, CheckCircle, Building2, Briefcase } from 'lucide-react';

export const SaudiReadiness = ({ lang }) => {
  const isAr = lang === 'ar';
  const { saudiReadiness } = portfolioData.meta;

  return (
    <section id="saudi-readiness" className="py-16 border-b border-ink-800/10 dark:border-ink-800/50 bg-ink-950 text-white relative overflow-hidden">
      {/* Background Graphic Watermark */}
      <div className="absolute -end-16 -bottom-16 w-80 h-80 rounded-full border border-ink-800/50 opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{saudiReadiness.badge[lang]}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {saudiReadiness.title[lang]}
            </h2>

            <p className="text-base sm:text-lg text-ink-300 leading-relaxed max-w-3xl">
              {saudiReadiness.description[lang]}
            </p>

            {/* Target Cities & Operations */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="text-xs font-mono uppercase text-ink-400">
                {isAr ? 'المدن المستهدفة للعمل الميداني:' : 'Targeted Industrial Hubs:'}
              </span>
              {saudiReadiness.cities.map((city, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1 rounded bg-ink-900 border border-ink-800 text-xs font-semibold text-paper-100"
                >
                  <MapPin className="w-3.5 h-3.5 text-print-orange" />
                  <span>{city[lang]}</span>
                </div>
              ))}
            </div>

            {/* Practical Assurances for Print House Directors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs font-mono">
              <div className="flex items-start gap-2 p-3 rounded bg-ink-900/80 border border-ink-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-ink-200">
                  {isAr ? 'جاهزية استخراج التأشيرة أو نقل الكفالة فوراً' : 'Ready for direct work visa issuance or sponsorship transfer'}
                </span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded bg-ink-900/80 border border-ink-800">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-ink-200">
                  {isAr ? 'معرفة بالمصطلحات الفنية الميدانية لعمال ومشغلي الماكينات' : 'Fluent in shop-floor prepress and pressman terminology'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Letter to Print House Directors */}
          <div className="lg:col-span-4 bg-ink-900 border border-ink-800 p-6 rounded-xl space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-print-orange font-mono text-xs font-bold uppercase">
              <Building2 className="w-4 h-4" />
              <span>{isAr ? 'رسالة لمدير المطبعة والإنتاج' : 'To The Print Director'}</span>
            </div>

            <p className="text-xs sm:text-sm text-ink-300 leading-relaxed font-sans">
              {isAr ? (
                <>
                  "أنا لست مصمماً يرسل ملفاً غير مفحوص ويترك عمال الـ CTP ومشغلي الأوفست ومقصات التكسير يتعاملون مع الأخطاء. أنا أقدم حلاً يحمي وقت الماكينة وهادر الورق، وأفهم تماماً معنى مواعيد التسليم في مواسم الذروة."
                </>
              ) : (
                <>
                  "I am not a designer who hands over unverified files and leaves CTP operators, offset pressmen, and guillotine cutters to fix errors. I protect machine uptime and paper waste, fully respecting rush delivery deadlines during peak seasons."
                </>
              )}
            </p>

            <div className="pt-2 border-t border-ink-800 flex items-center justify-between text-xs font-mono text-ink-400">
              <span>{portfolioData.meta.author[lang]}</span>
              <span className="text-print-orange font-bold">AHMED MAHER</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
