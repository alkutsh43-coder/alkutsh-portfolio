import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { CheckCircle, XCircle, ShieldCheck, AlertCircle, Wrench } from 'lucide-react';

export const ProductionMatrix = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="production-matrix" className="py-16 border-b border-ink-800/10 dark:border-ink-800/50 bg-paper-100/40 dark:bg-ink-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-ink-900 text-white dark:bg-paper-100 dark:text-ink-950 rounded text-xs font-mono font-bold tracking-wider">
            <Wrench className="w-3.5 h-3.5 text-print-orange" />
            <span>05. // PRODUCTION MINDSET COMPARISON</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 dark:text-white">
            {isAr ? 'عقلية المصمم العادي مقابل مهندس الإنتاج' : 'Screen Designer Mind vs. Production Engineer Mind'}
          </h2>
          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-400">
            {isAr
              ? 'الفرق الجوهري الذي يمنع خسائر الورق وتأخير خطوط الطباعة: كيف يفكر أحمد ماهر في كل تفصيلة ميكانيكية للملف.'
              : 'The critical difference preventing substrate waste and press-stop delays: how Ahmed Maher engineers every technical detail.'}
          </p>
        </div>

        {/* Matrix Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-ink-300 dark:border-ink-800 shadow-sm bg-white dark:bg-ink-900">
          <table className="w-full text-start border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-ink-300 dark:border-ink-800 bg-paper-200/90 dark:bg-ink-950 text-ink-900 dark:text-white font-mono uppercase text-xs">
                <th className="py-4 px-4 sm:px-6 text-start w-1/4">
                  {isAr ? 'المعيار التقني' : 'Technical Criterion'}
                </th>
                <th className="py-4 px-4 sm:px-6 text-start w-3/8 text-red-600 dark:text-red-400 bg-red-500/5">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    <span>{isAr ? 'المصمم العادي (Screen-Only)' : 'Standard Graphic Designer'}</span>
                  </div>
                </th>
                <th className="py-4 px-4 sm:px-6 text-start w-3/8 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isAr ? 'أحمد ماهر (Production-Aware)' : 'Ahmed Maher (Production-Aware)'}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-200 dark:divide-ink-800">
              {portfolioData.matrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-paper-50 dark:hover:bg-ink-800/40 transition">
                  <td className="py-4 px-4 sm:px-6 font-mono font-bold text-ink-900 dark:text-white align-top">
                    <div className="flex items-center gap-2">
                      <span className="text-print-orange">0{idx + 1}.</span>
                      <span>{item.criterion[lang]}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-ink-600 dark:text-ink-400 bg-red-500/5 align-top leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 font-bold shrink-0">✕</span>
                      <span>{item.designerWay[lang]}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-ink-900 dark:text-paper-100 font-medium bg-emerald-500/5 align-top leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{item.ahmedWay[lang]}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Banner with Preflight Seal */}
        <div className="mt-8 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-800 dark:text-paper-100">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              {isAr
                ? 'النتيجة: ملفات جاهزة للطباعة فوراً بدون أي تأخير في قسم ما قبل الطباعة (Zero Prepress Bottlenecks).'
                : 'Outcome: Press-ready files running straight onto CTP and die-cut lines with zero operator hold-ups.'}
            </span>
          </div>
          <span className="px-3 py-1 bg-emerald-600 text-white rounded font-bold uppercase tracking-wider text-[10px]">
            ZERO WASTE PROTOCOL
          </span>
        </div>

      </div>
    </section>
  );
};
