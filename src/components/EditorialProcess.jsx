import React, { useState } from 'react';
import { Search, Lightbulb, Compass, ShieldCheck } from 'lucide-react';

export const EditorialProcess = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      icon: Search,
      title: isAr ? 'الاستكشاف والبريف' : 'Discovery & Brief',
      desc: isAr 
        ? 'دراسة علامتك التجارية والمنافسين وتحديد أهداف المشروع.'
        : 'Analyzing brand goals, market landscape & target audience.',
      pill: isAr ? 'التحليل الاستراتيجي' : 'Strategy'
    },
    {
      num: '02',
      icon: Lightbulb,
      title: isAr ? 'الفكرة والاسكتشات' : 'Concept & Ideation',
      desc: isAr
        ? 'عصف ذهني واسكتشات يدوية ومود بورد للاتجاه البصري.'
        : 'Rapid sketching, visual moodboards & aesthetic direction.',
      pill: isAr ? 'العصف الذهني' : 'Sketching'
    },
    {
      num: '03',
      icon: Compass,
      title: isAr ? 'التصميم الحرفي' : 'Precision Design',
      desc: isAr
        ? 'تنفيذ فيكتور عالي الدقة ونماذج 3D واقعية للمعاينة.'
        : 'Master vector crafting, typographic grids & 3D mockups.',
      pill: isAr ? 'التنفيذ الرقمي' : 'Craft & 3D'
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: isAr ? 'الإنتاج والتسليم' : 'Prepress & Handover',
      desc: isAr
        ? 'فحص الألوان وهوامش القص وتسليم ملفات المطابع المعتمدة.'
        : 'Zero-error prepress check & press-ready file delivery.',
      pill: isAr ? 'الجودة الطباعية' : 'Zero Error'
    }
  ];

  return (
    <section 
      id="process" 
      className="py-16 sm:py-24 bg-[#071610] text-white border-t border-[#143224]/80 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-10 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#143224] pb-6">
          <div className="space-y-2">
            <span 
              className="text-xs font-mono font-bold text-[#82E16B] uppercase tracking-widest"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
            >
              // {isAr ? 'مراحل العمل والإنتاج' : 'THE WORKFLOW'}
            </span>
            <h2 
              className="text-2xl xs:text-3xl sm:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
            >
              {isAr ? 'من الفكرة إلى المنتج المطبوع' : 'From Concept to Physical Reality'}
            </h2>
          </div>

          <p 
            className="text-xs sm:text-sm text-white/70 max-w-md font-normal leading-relaxed"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
          >
            {isAr 
              ? 'أربع خطوات واضحة تضمن تسليم العمل بدقة متناهية وفي الوقت المحدد.'
              : 'A disciplined 4-stage pipeline eliminating surprises and guaranteeing print perfection.'}
          </p>
        </div>

        {/* Completely Redesigned: Open Stepper Timeline (Zero Box Cards) */}
        <div className="relative">
          
          {/* Continuous Laser Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-6 inset-x-12 h-[2px] bg-gradient-to-r from-[#143224] via-[#82E16B]/40 to-[#143224] z-0"></div>

          {/* 4 Open Timeline Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCurrent = activeStep === idx;

              return (
                <div 
                  key={step.num}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="group cursor-pointer relative flex flex-col justify-between transition-all duration-300"
                >
                  <div className="space-y-4">
                    
                    {/* Node Milestone Pill */}
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center font-mono text-sm font-black transition-all ${
                        isCurrent 
                          ? 'bg-[#82E16B] text-[#071610] border-[#82E16B] shadow-[0_0_20px_rgba(130,225,107,0.4)] scale-105' 
                          : 'bg-[#071610] text-[#82E16B] border-[#1A4031] group-hover:border-[#82E16B]'
                      }`}>
                        {step.num}
                      </div>

                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#0B1E16] text-[#82E16B] border border-[#1A4031]">
                        {step.pill}
                      </span>
                    </div>

                    {/* Step Title & Icon */}
                    <div className="pt-2">
                      <h3 
                        className={`text-lg sm:text-xl font-bold transition-colors ${
                          isCurrent ? 'text-[#82E16B]' : 'text-white group-hover:text-[#82E16B]'
                        }`}
                        style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                      >
                        {step.title}
                      </h3>
                      
                      <p 
                        className="text-xs text-white/70 leading-relaxed mt-2 font-normal"
                        style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                      >
                        {step.desc}
                      </p>
                    </div>

                  </div>

                  {/* Minimal progress bottom marker */}
                  <div className="mt-6 pt-2 border-t border-[#143224]/40 flex items-center justify-between text-[10px] font-mono text-white/30">
                    <span>PHASE // 0{idx + 1}</span>
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isCurrent ? 'bg-[#82E16B]' : 'bg-[#143224]'}`}></span>
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
