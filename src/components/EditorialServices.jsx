import React from 'react';
import { Palette, Box, Printer, Megaphone, ArrowUpRight } from 'lucide-react';

export const EditorialServices = ({ lang }) => {
  const isAr = lang === 'ar';

  const services = [
    {
      num: '01',
      icon: Palette,
      title: isAr ? 'الهويات البصرية والشعارات' : 'Brand Identity & Systems',
      desc: isAr 
        ? 'بناء هوية فريدة بشعار استثنائي ودليل إرشادي يرسخ حضورك بالسوق.'
        : 'Distinctive brand identities, logos & guidelines crafted for enduring impact.',
      tags: ['Logo & Marks', 'Brand Guidelines', 'Typography', 'Palette']
    },
    {
      num: '02',
      icon: Box,
      title: isAr ? 'تصميم التغليف والعلب' : 'Packaging & Structural Dielines',
      desc: isAr
        ? 'قوالب تكسير هندسية ومحاكاة 3D واقعية جاهزة للتصنيع بدقة 100%.'
        : 'Engineered CAD dielines and 3D mockups ready for flawless manufacturing.',
      tags: ['CAD Dielines', '3D Packaging', 'Labels', 'Spot UV & Foil']
    },
    {
      num: '03',
      icon: Printer,
      title: isAr ? 'تجهيز المطبوعات والفرز' : 'Prepress & Print Production',
      desc: isAr
        ? 'ضبط هوامش القص وفرز ألوان البانتون لمنع أي خطأ أو هدر في المطبعة.'
        : 'Zero-error pre-flight checks, bleed control & Pantone spot-color separation.',
      tags: ['Bleed & Trapping', 'Pantone Codes', 'Laser Paths', 'PDF/X-1a']
    },
    {
      num: '04',
      icon: Megaphone,
      title: isAr ? 'المطبوعات وحملات السوشيال' : 'Advertising & Campaigns',
      desc: isAr
        ? 'بروفايل الشركات، المطبوعات الدعائية، وحملات متناسقة تلفت الأنظار.'
        : 'Editorial corporate profiles, print collateral & cohesive social campaigns.',
      tags: ['Company Profiles', 'Brochures', 'Social Media', 'Billboards']
    }
  ];

  return (
    <section 
      id="services" 
      className="py-16 sm:py-24 bg-[#071610] text-white border-t border-[#143224]/80 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Section Header - Minimal & Punchy */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#143224] pb-6">
          <div className="space-y-2">
            <span 
              className="text-xs font-mono font-bold text-[#82E16B] uppercase tracking-widest"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
            >
              // {isAr ? 'مجالات العمل والتخصص' : 'CAPABILITIES'}
            </span>
            <h2 
              className="text-2xl xs:text-3xl sm:text-5xl font-black text-white leading-tight"
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
            >
              {isAr ? 'خدمات التصميم والتنفيذ' : 'Design & Production Services'}
            </h2>
          </div>

          <p 
            className="text-xs sm:text-sm text-white/70 max-w-md font-normal leading-relaxed"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
          >
            {isAr 
              ? 'حلول بصرية مدروسة تجمع بين الابتكار الإبداعي والدقة الهندسية للمطابع.'
              : 'End-to-end design solutions balancing creative flair with technical print precision.'}
          </p>
        </div>

        {/* Minimal Editorial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.num}
                className="group relative rounded-xl p-6 bg-[#0B1E16]/80 border border-[#143224] hover:border-[#82E16B]/50 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(130,225,107,0.15)]"
              >
                {/* Top: Minimal Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold text-white/35 group-hover:text-[#82E16B] transition-colors">
                    {item.num}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#071610] border border-[#1A4031] flex items-center justify-center text-[#82E16B] group-hover:bg-[#82E16B] group-hover:text-[#071610] transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content: Clean Title & 1-line Description */}
                <div className="space-y-2 mb-6">
                  <h3 
                    className="text-lg sm:text-xl font-bold text-white group-hover:text-[#82E16B] transition-colors"
                    style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-xs text-white/75 leading-relaxed font-normal"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Bottom: Sleek Micro-tags */}
                <div className="pt-4 border-t border-[#143224]/60 flex flex-wrap gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#071610] text-white/60 border border-[#1A4031]/60 group-hover:border-[#82E16B]/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
