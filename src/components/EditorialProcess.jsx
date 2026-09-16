import React from 'react';
import { Search, Lightbulb, Compass, ShieldCheck } from 'lucide-react';

export const EditorialProcess = ({ lang }) => {
  const isAr = lang === 'ar';

  const steps = [
    {
      num: '01',
      icon: Search,
      title: isAr ? 'الاستكشاف والبريف' : 'Discovery & Brief',
      desc: isAr 
        ? 'دراسة علامتك التجارية والمنافسين وتحديد أهداف المشروع.'
        : 'Analyzing brand goals, market landscape & target audience.'
    },
    {
      num: '02',
      icon: Lightbulb,
      title: isAr ? 'الفكرة والاسكتشات' : 'Concept & Ideation',
      desc: isAr
        ? 'عصف ذهني واسكتشات يدوية ومود بورد للاتجاه البصري.'
        : 'Rapid sketching, visual moodboards & aesthetic direction.'
    },
    {
      num: '03',
      icon: Compass,
      title: isAr ? 'التصميم الحرفي' : 'Precision Design',
      desc: isAr
        ? 'تنفيذ فيكتور عالي الدقة ونماذج 3D واقعية للمعاينة.'
        : 'Master vector crafting, typographic grids & 3D mockups.'
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: isAr ? 'الإنتاج والتسليم' : 'Prepress & Handover',
      desc: isAr
        ? 'فحص الألوان وهوامش القص وتسليم ملفات المطابع المعتمدة.'
        : 'Zero-error prepress check & press-ready file delivery.'
    }
  ];

  return (
    <section 
      id="process" 
      className="py-16 sm:py-24 bg-[#071610] text-white border-t border-[#143224]/80 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Section Header - Minimal & Clean */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#143224] pb-6">
          <div className="space-y-2">
            <span 
              className="text-xs font-mono font-bold text-[#82E16B] uppercase tracking-widest"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
            >
              // {isAr ? 'مراحل العمل' : 'WORKFLOW'}
            </span>
            <h2 
              className="text-2xl xs:text-3xl sm:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
            >
              {isAr ? 'منهجية العمل والإنتاج' : 'Design & Production Pipeline'}
            </h2>
          </div>

          <p 
            className="text-xs sm:text-sm text-white/70 max-w-md font-normal leading-relaxed"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
          >
            {isAr 
              ? 'أربع خطوات واضحة ومدروسة من الفكرة الأولى وحتى التسليم الطباعي الخالي من العيوب.'
              : 'A disciplined 4-stage process ensuring transparency, punctuality, and print perfection.'}
          </p>
        </div>

        {/* Minimalist Connected Flow Pipeline */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-7 inset-x-8 h-[1px] bg-gradient-to-r from-[#143224] via-[#82E16B]/30 to-[#143224] z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div 
                  key={step.num}
                  className="group relative rounded-xl p-5 sm:p-6 bg-[#0B1E16]/80 border border-[#143224] hover:border-[#82E16B]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(130,225,107,0.15)]"
                >
                  <div className="space-y-4">
                    {/* Step Number + Icon in sleek pill */}
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-full bg-[#071610] border border-[#1A4031] text-[#82E16B] font-mono text-xs font-bold flex items-center justify-center group-hover:border-[#82E16B] transition-colors">
                        {step.num}
                      </span>
                      <Icon className="w-5 h-5 text-white/40 group-hover:text-[#82E16B] transition-colors" />
                    </div>

                    {/* Step Title */}
                    <h3 
                      className="text-base sm:text-lg font-bold text-white group-hover:text-[#82E16B] transition-colors"
                      style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                    >
                      {step.title}
                    </h3>

                    {/* Step Short Description */}
                    <p 
                      className="text-xs text-white/70 leading-relaxed font-normal"
                      style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Sleek bottom indicator */}
                  <div className="mt-4 pt-3 border-t border-[#143224]/50 flex items-center justify-between text-[10px] font-mono text-white/40">
                    <span>PHASE // 0{idx + 1}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#82E16B]/40 group-hover:bg-[#82E16B] transition-colors"></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
