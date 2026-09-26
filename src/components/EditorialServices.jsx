import React, { useState } from 'react';
import { Palette, Box, Printer, Megaphone, ArrowUpRight, FileText, Sparkles, Layers, FileCheck, Scissors, Image as ImageIcon, Layout } from 'lucide-react';
import { InteractiveFolder } from './InteractiveFolder';

export const EditorialServices = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeRow, setActiveRow] = useState(0);

  const services = [
    {
      num: '01',
      icon: Palette,
      title: isAr ? 'الهويات البصرية والشعارات' : 'Brand Identity & Systems',
      desc: isAr 
        ? 'بناء هوية فريدة بشعار استثنائي ودليل إرشادي يرسخ حضورك بالسوق.'
        : 'Distinctive brand identities, logos & guidelines crafted for enduring impact.',
      tags: ['Logo & Marks', 'Brand Guidelines', 'Typography', 'Color Systems']
    },
    {
      num: '02',
      icon: Box,
      title: isAr ? 'تصميم التغليف والعلب الفاخرة' : 'Packaging & Structural Dielines',
      desc: isAr
        ? 'قوالب تكسير هندسية CAD ومحاكاة 3D واقعية جاهزة للتصنيع بدقة 100%.'
        : 'Engineered CAD dielines and 3D mockups ready for flawless manufacturing.',
      tags: ['CAD Dielines', '3D Packaging', 'Box Folding', 'Spot UV & Foil']
    },
    {
      num: '03',
      icon: Printer,
      title: isAr ? 'تجهيز المطبوعات والفرز اللوني' : 'Prepress & Print Production',
      desc: isAr
        ? 'ضبط هوامش القص وفرز ألوان البانتون لمنع أي خطأ أو هدر في المطبعة.'
        : 'Zero-error pre-flight checks, bleed control & Pantone spot-color separation.',
      tags: ['Bleed & Trapping', 'Pantone Codes', 'Laser Cutlines', 'PDF/X-1a']
    },
    {
      num: '04',
      icon: Megaphone,
      title: isAr ? 'المطبوعات وحملات السوشيال' : 'Advertising & Campaigns',
      desc: isAr
        ? 'بروفايل الشركات، المطبوعات الدعائية، وحملات متناسقة تلفت الأنظار.'
        : 'Editorial corporate profiles, print collateral & cohesive social campaigns.',
      tags: ['Company Profiles', 'Brochures', 'Social Media', 'Signage']
    }
  ];

  return (
    <section 
      id="services" 
      className="py-16 sm:py-24 bg-[#071610] text-white border-t border-[#143224]/80 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#143224] pb-6">
          <div className="space-y-2">
            <span 
              className="text-xs font-mono font-bold text-[#82E16B] uppercase tracking-widest"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
            >
              // {isAr ? 'مجالات العمل والتخصص' : 'SERVICES & DISCIPLINES'}
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

        {/* Completely Redesigned: Editorial Interactive Rows (Zero Box Cards) */}
        <div className="divide-y divide-[#143224]/70 border-y border-[#143224]/70">
          {services.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeRow === idx;

            return (
              <div 
                key={item.num}
                onClick={() => setActiveRow(isSelected ? null : idx)}
                onMouseEnter={() => setActiveRow(idx)}
                className={`group cursor-pointer py-6 sm:py-8 transition-all duration-300 ${
                  isSelected ? 'bg-[#0B1E16]/90 px-4 sm:px-6 rounded-xl' : 'hover:bg-[#091D15]/40 px-2 sm:px-4'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Large Typography & Icon */}
                  <div className="flex items-center gap-4 sm:gap-7">
                    <span 
                      className={`font-mono text-2xl sm:text-4xl font-black transition-colors ${
                        isSelected ? 'text-[#82E16B]' : 'text-white/20 group-hover:text-[#82E16B]/70'
                      }`}
                      style={{ fontFamily: '"29LT Kaff", monospace' }}
                    >
                      {item.num}
                    </span>
                    
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all ${
                        isSelected ? 'bg-[#82E16B] text-[#071610]' : 'bg-[#071610] text-[#82E16B] border border-[#1A4031]'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 
                        className={`text-lg sm:text-2xl md:text-3xl font-bold transition-colors ${
                          isSelected ? 'text-[#82E16B]' : 'text-white group-hover:text-[#82E16B]'
                        }`}
                        style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right: 1-line description + Tags + Circular Arrow */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 sm:gap-6 ps-10 lg:ps-0">
                    <p 
                      className="text-xs sm:text-sm text-white/70 max-w-sm hidden md:block font-normal"
                      style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                    >
                      {item.desc}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex items-center gap-1.5">
                        {item.tags.slice(0, 2).map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#071610] text-white/60 border border-[#143224]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-[#82E16B] text-[#071610] border-[#82E16B] rotate-45' 
                          : 'border-white/20 text-white/50 group-hover:border-[#82E16B] group-hover:text-[#82E16B]'
                      }`}>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                  </div>

                </div>

                {/* Mobile Description & Specs (Only when selected or on mobile) */}
                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-[#143224]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-white/80 animate-fadeIn">
                    <p className="block md:hidden text-white/80">{item.desc}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono text-[#82E16B] font-bold uppercase me-1">
                        {isAr ? 'المواصفات:' : 'SPECS:'}
                      </span>
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono bg-[#071610] text-white/70 px-2 py-0.5 rounded border border-[#1A4031]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Interactive Deliverables Showcase (حقائب الأصول والتسليم الرقمية التفاعلية) */}
        <div className="pt-10 sm:pt-14 border-t border-[#143224]/70">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="space-y-1">
              <span 
                className="text-xs font-mono font-bold text-[#82E16B] uppercase tracking-widest"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
              >
                // {isAr ? 'حقائب تسليم الأصول الرقمية' : 'INTERACTIVE ASSET VAULTS'}
              </span>
              <h3 
                className="text-xl sm:text-3xl font-black text-white"
                style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
              >
                {isAr ? 'اضغط على أي مجلد لاستكشاف مخرجات كل خدمة' : 'Click Any Folder to Inspect Deliverables'}
              </h3>
            </div>
            <p 
              className="text-xs sm:text-sm text-white/60 max-w-md font-normal leading-relaxed"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
            >
              {isAr 
                ? 'مجلدات تفاعلية تفتح عند النقر عليها وتتفاعل أوراقها الداخلية بفيزيائية عائمة مع حركة الماوس.'
                : 'Click to open and hover to drift floating papers with responsive mouse parallax physics.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-6 items-center justify-items-center">
            
            {/* Folder 1: BRANDING */}
            <div className="flex flex-col items-center gap-3">
              <InteractiveFolder 
                size={1.15}
                color="#82E16B"
                label={isAr ? 'الهوية' : 'BRANDING'}
                darkPapers={false}
                items={[
                  <div key="1" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    <span className="text-[9px] font-bold tracking-tight">Logo Marks</span>
                  </div>,
                  <div key="2" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <span className="text-[9px] font-bold tracking-tight">Guidelines</span>
                  </div>,
                  <div key="3" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <Palette className="w-5 h-5 text-emerald-700" />
                    <span className="text-[9px] font-bold tracking-tight">Pantone Kit</span>
                  </div>
                ]}
              />
              <span className="text-xs font-semibold text-white/80 mt-2 select-none">
                {isAr ? 'أصول الهوية البصرية' : 'Brand Identity'}
              </span>
            </div>

            {/* Folder 2: PACKAGING */}
            <div className="flex flex-col items-center gap-3">
              <InteractiveFolder 
                size={1.15}
                color="#10B981"
                label={isAr ? 'التغليف' : 'PACKAGING'}
                darkPapers={false}
                items={[
                  <div key="1" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <Box className="w-5 h-5 text-emerald-600" />
                    <span className="text-[9px] font-bold tracking-tight">CAD Dielines</span>
                  </div>,
                  <div key="2" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <Layers className="w-5 h-5 text-teal-600" />
                    <span className="text-[9px] font-bold tracking-tight">3D Mockup</span>
                  </div>,
                  <div key="3" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <Scissors className="w-5 h-5 text-emerald-700" />
                    <span className="text-[9px] font-bold tracking-tight">Laser Cutlines</span>
                  </div>
                ]}
              />
              <span className="text-xs font-semibold text-white/80 mt-2 select-none">
                {isAr ? 'نماذج وتكسير العلب' : 'Packaging & Boxes'}
              </span>
            </div>

            {/* Folder 3: PREPRESS */}
            <div className="flex flex-col items-center gap-3">
              <InteractiveFolder 
                size={1.15}
                color="#00D1FF"
                label={isAr ? 'الطباعة' : 'PREPRESS'}
                darkPapers={false}
                items={[
                  <div key="1" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <Printer className="w-5 h-5 text-cyan-600" />
                    <span className="text-[9px] font-bold tracking-tight">CMYK Plates</span>
                  </div>,
                  <div key="2" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <FileCheck className="w-5 h-5 text-sky-600" />
                    <span className="text-[9px] font-bold tracking-tight">PDF/X-1a</span>
                  </div>,
                  <div key="3" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <Layers className="w-5 h-5 text-cyan-700" />
                    <span className="text-[9px] font-bold tracking-tight">Spot UV & Foil</span>
                  </div>
                ]}
              />
              <span className="text-xs font-semibold text-white/80 mt-2 select-none">
                {isAr ? 'ملفات ما قبل الطباعة' : 'Prepress & Print'}
              </span>
            </div>

            {/* Folder 4: CAMPAIGNS */}
            <div className="flex flex-col items-center gap-3">
              <InteractiveFolder 
                size={1.15}
                color="#FF3366"
                label={isAr ? 'الحملات' : 'CAMPAIGNS'}
                darkPapers={false}
                items={[
                  <div key="1" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <ImageIcon className="w-5 h-5 text-pink-600" />
                    <span className="text-[9px] font-bold tracking-tight">Key Visuals</span>
                  </div>,
                  <div key="2" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <Layout className="w-5 h-5 text-rose-600" />
                    <span className="text-[9px] font-bold tracking-tight">Social Grid</span>
                  </div>,
                  <div key="3" className="flex flex-col items-center justify-center gap-1 p-2 text-center text-slate-800">
                    <Megaphone className="w-5 h-5 text-pink-700" />
                    <span className="text-[9px] font-bold tracking-tight">Ad Banners</span>
                  </div>
                ]}
              />
              <span className="text-xs font-semibold text-white/80 mt-2 select-none">
                {isAr ? 'إعلانات وحملات السوشيال' : 'Campaigns & Ads'}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
