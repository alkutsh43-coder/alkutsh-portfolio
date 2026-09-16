import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Sparkles, Terminal, CheckCircle2, Box, PenTool, Layout, FileSearch, Shield } from 'lucide-react';

export const SoftwareArsenal = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section id="arsenal-services" className="py-16 border-b border-ink-800/10 dark:border-ink-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-print-orange font-bold uppercase tracking-wider mb-2">
            <span>06. // SOFTWARE & TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 dark:text-white">
            {isAr ? 'الترسانة البرمجية والكفاءات الإنتاجية' : 'Software Arsenal & Production Services'}
          </h2>
          <p className="text-sm sm:text-base text-ink-600 dark:text-ink-400 mt-2 max-w-2xl">
            {isAr 
              ? 'تحكم يدوي واحترافي بأدوات أدوبي المعتمدة للمطابع، مع استخدام أدوات الذكاء الاصطناعي حصرياً لتوليد المفاهيم والأفكار (Ideation) فقط دون المساس بملفات التنفيذ.'
              : 'Direct mastery of industry-standard Adobe prepress suites, employing AI strictly for rapid concept ideation without touching final production vectors.'}
          </p>
        </div>

        {/* Dual Column: Design Skills vs Production Knowledge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Column 1: Design Skills */}
          <div className="p-6 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-ink-200 dark:border-ink-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-base text-ink-950 dark:text-white">
                <PenTool className="w-5 h-5 text-print-cyan" />
                <h3>{isAr ? 'مهارات التصميم والابتكار (Design Skills)' : 'Design & Creative Skills'}</h3>
              </div>
              <span className="text-[10px] font-mono text-ink-400 uppercase">AESTHETICS</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-ink-700 dark:text-ink-300 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-print-cyan shrink-0 mt-0.5" />
                <span>{isAr ? 'تصميم الهويات البصرية القابلة للتطبيق الواقعي (Brand Identity)' : 'Physical Brand Identity Systems engineered for real-world print'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-print-cyan shrink-0 mt-0.5" />
                <span>{isAr ? 'تصميم التغليف الفاخر ثلاثي الأبعاد والعلب (3D Packaging Design)' : 'High-End 3D Luxury Packaging & Structural Presentation'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-print-cyan shrink-0 mt-0.5" />
                <span>{isAr ? 'بناء الشبكات التايبوجرافية للمطبوعات المعقدة (Editorial Grids)' : 'Rigorous Typographic Grids for Books, Catalogues & Annual Reports'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-print-cyan shrink-0 mt-0.5" />
                <span>{isAr ? 'توليد أفكار بصرية ذكية ومود بوردز للعملاء (Visual Ideation)' : 'Rapid Visual Ideation, Concept Moodboards & Client Art Direction'}</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Production Knowledge */}
          <div className="p-6 rounded-xl border border-print-orange/40 bg-paper-100 dark:bg-ink-900 shadow-sm space-y-4 relative overflow-hidden">
            <div className="absolute -top-12 -end-12 w-28 h-28 bg-print-orange/10 rounded-full blur-2xl"></div>

            <div className="flex items-center justify-between border-b border-ink-200 dark:border-ink-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-base text-ink-950 dark:text-white">
                <Layout className="w-5 h-5 text-print-orange" />
                <h3>{isAr ? 'المعرفة التقنية والإنتاجية (Production Knowledge)' : 'Production & Prepress Mastery'}</h3>
              </div>
              <span className="text-[10px] font-mono text-print-orange uppercase font-bold">PREPRESS SPEC</span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-ink-900 dark:text-ink-200 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-print-orange shrink-0 mt-0.5" />
                <span>{isAr ? 'رسم قوالب التكسير (CAD Dielines) مع حساب سماكة الورق (Caliper)' : 'CAD Dielines with board caliper and folding hinge allowances'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-print-orange shrink-0 mt-0.5" />
                <span>{isAr ? 'هوامش الـ Bleed ومناطق الأمان وعلامات القص والتسجيل ⌖' : 'Strict 3-5mm Bleed, Safety margins, Crop & Registration marks'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-print-orange shrink-0 mt-0.5" />
                <span>{isAr ? 'أحبار البانتون (Pantone Formula Guide) وفصل ألوان السلك سكرين' : 'Pantone Spot matching & Simulated process screen separations'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-print-orange shrink-0 mt-0.5" />
                <span>{isAr ? 'أقنعة البصمة والـ Spot UV كألواح فيكتور مع خاصية Overprint' : 'Vector Spot UV and Hot Foil stamping masks with Overprint verification'}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-print-orange shrink-0 mt-0.5" />
                <span>{isAr ? 'تجهيز مسارات القص لليزر والراوتر وشيتات الـ UV DTF المجمعة' : 'Laser/CNC vector hairline paths & industrial UV DTF gang sheets'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Software Stack with Usage Statement */}
        <div className="mb-16">
          <h3 className="font-bold text-lg text-ink-950 dark:text-white mb-6 font-mono">
            // {isAr ? 'البرمجيات وأدوات التشغيل' : 'SOFTWARE SUITE & USAGE CONTEXT'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolioData.software.map((sw, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-print-orange"></span>
                    <span className="font-bold text-sm text-ink-950 dark:text-white font-mono">
                      {sw.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-ink-500">{sw.level}</span>
                </div>

                <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
                  {sw.role[lang]}
                </p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-paper-200 dark:bg-ink-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-ink-900 dark:bg-paper-100 rounded-full"
                    style={{ width: sw.level }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Production Centric Services List */}
        <div>
          <h3 className="font-bold text-lg text-ink-950 dark:text-white mb-6 font-mono">
            // {isAr ? 'الخدمات ذات الصياغة الإنتاجية' : 'PRODUCTION-ORIENTED SERVICES'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData.services.map((srv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-ink-200 dark:border-ink-800 bg-paper-100/50 dark:bg-ink-900/60 space-y-2 hover:border-print-orange transition"
              >
                <div className="font-mono text-xs text-print-orange font-bold">
                  SRV-0{idx + 1}
                </div>
                <h4 className="font-bold text-base text-ink-950 dark:text-white">
                  {srv.title[lang]}
                </h4>
                <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
                  {srv.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
