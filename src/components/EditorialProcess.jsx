import React from 'react';
import { Search, Lightbulb, Compass, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export const EditorialProcess = ({ lang }) => {
  const isAr = lang === 'ar';

  const steps = [
    {
      num: '01',
      icon: Search,
      title: isAr ? 'الاستكشاف وتحليل البريف' : 'Discovery & Strategic Brief',
      subtitle: isAr ? 'فهم عميق للنشاط والجمهور المستهدف والمنافسين' : 'Deconstructing the brand challenge, audience & market positioning',
      desc: isAr
        ? 'جلسة استكشافية لفهم رؤيتك وأهداف المشروع، ودراسة المنافسين ونقاط القوة لعلامتك التجارية لضمان بناء تصميم ذي جدوى تسويقية حقيقية.'
        : 'Deep dive into your brand mission, competitive landscape, and business objectives to establish solid visual logic before opening software.'
    },
    {
      num: '02',
      icon: Lightbulb,
      title: isAr ? 'بناء المفهوم والاسكتشات' : 'Concept & Sketching',
      subtitle: isAr ? 'توليد الأفكار البصرية والمود بورد والاسكتشات الأولية' : 'Raw ideation, visual moodboards & structural explorations',
      desc: isAr
        ? 'مرحلة العصف الذهني ورسم الاسكتشات اليدوية، وبناء لوحات الإلهام (Moodboards) لتحديد الاتجاه البصري والتايبوجرافي المناسب.'
        : 'Sketching initial concepts, exploring typographic pairings, structural dielines, and crafting moodboards to define the aesthetic direction.'
    },
    {
      num: '03',
      icon: Compass,
      title: isAr ? 'التنفيذ الحرفي والتطوير' : 'Precision Design & Craft',
      subtitle: isAr ? 'تحويل الفكرة إلى تصاميم فيكتور دقيقة وعالية الجودة' : 'Digital vector execution, color harmony & 3D visualization',
      desc: isAr
        ? 'بناء التصاميم بأعلى دقة على برامج أدوبي المعتمدة، وضبط النسب والتناغم اللوني، وتجهيز نماذج ثلاثية الأبعاد واقعية للمعاينة.'
        : 'Translating concepts into master vector artboards, refining typographic grids, and creating realistic 3D mockups for client evaluation.'
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: isAr ? 'التجهيز الطباعي والتسليم' : 'Prepress & Production Handover',
      subtitle: isAr ? 'فحص الألوان وخطوط التكسير وتسليم ملفات الإنتاج المعتمدة' : 'Zero-error prepress flight check & open editable production delivery',
      desc: isAr
        ? 'المعايرة الطباعية الكاملة، ضبط الـ Bleed والفرز اللوني (Pantone / CMYK)، وتصدير الملفات بصيغ المطابع العالمية مع دعم فني أثناء مرحلة الطباعة.'
        : 'Meticulous pre-flight verification, bleed/cutline clearance, spot-color layer separation, and delivery of archival press-ready packages.'
    }
  ];

  return (
    <section 
      id="process" 
      className="py-20 sm:py-28 bg-[#071610] text-white border-t border-[#143224]/80 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-14 sm:space-y-18">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1E16] border border-[#1A4031] text-xs font-bold text-[#82E16B]"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#82E16B] animate-pulse"></span>
            <span>{isAr ? 'منهجية ومراحل العمل' : 'CREATIVE & PRODUCTION WORKFLOW'}</span>
          </div>

          <h2 
            className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-sm"
            style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
          >
            {isAr ? 'كيف نحول الفكرة إلى واقع بصري ومطبوع؟' : 'From Initial Concept to Flawless Print Execution'}
          </h2>

          <p 
            className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
          >
            {isAr 
              ? 'خطوات عمل واضحة ومدروسة تضمن لك الشفافية التامة، الالتزام بالوقت، ومخرجات نهائية تخلو من أي أخطاء تصميمية أو إنتاجية.' 
              : 'A structured 4-stage pipeline that eliminates surprises, respects production deadlines, and delivers commercial impact.'}
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;

            return (
              <div 
                key={step.num}
                className="group relative rounded-2xl p-6 sm:p-7 bg-[#091D15] border border-[#143224] hover:border-[#82E16B]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_25px_-5px_rgba(130,225,107,0.2)]"
              >
                <div className="space-y-4">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span 
                      className="text-3xl font-black text-[#82E16B]/40 group-hover:text-[#82E16B] transition-colors"
                      style={{ fontFamily: '"29LT Kaff", sans-serif' }}
                    >
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#071610] border border-[#1A4031] flex items-center justify-center text-[#82E16B] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 
                    className="text-lg sm:text-xl font-bold text-white group-hover:text-[#82E16B] transition-colors"
                    style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                  >
                    {step.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs font-semibold text-[#82E16B]/80 leading-normal">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  <p 
                    className="text-xs text-white/75 leading-relaxed border-t border-[#143224] pt-3"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Progress bar accent */}
                <div className="mt-6 pt-3 flex items-center justify-between text-[11px] font-mono text-white/50">
                  <span>STAGE // 0{idx + 1}</span>
                  <span className="text-[#82E16B]">✓ COMPLETE</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
