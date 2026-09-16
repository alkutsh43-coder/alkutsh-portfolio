import React, { useState } from 'react';
import { Palette, Box, Printer, Megaphone, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export const EditorialServices = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      id: 'branding',
      icon: Palette,
      num: '01',
      title: isAr ? 'الهويات البصرية والشعارات' : 'Brand Identity & Visual Systems',
      subtitle: isAr ? 'بناء هوية فريدة تعبر عن شخصية علامتك التجارية بدقة وقوة' : 'Unique, enduring brand identities engineered for market distinction',
      desc: isAr
        ? 'تصميم أنظمة هويات بصرية متكاملة تبدأ من دراسة النشاط وبناء الفكرة الأساسية للشعار، وصولاً إلى اختيار الخطوط والألوان وكتيب الإرشادات (Brand Guidelines) لضمان تطبيق الهوية بتناسق تام عبر جميع المنصات.'
        : 'End-to-end brand identity systems starting from competitive discovery and conceptual logo craft, down to typography, color palettes, and comprehensive brand guidelines.',
      features: isAr
        ? [
            'تصميم الشعار الأساسي والفرعي والرموز البصرية والأيقونات',
            'كتيب إرشادات الهوية (Brand Guidelines) متكامل وواضح',
            'لوحة الألوان المعتمدة (RGB / CMYK / Pantone)',
            'اختيار وتنسيق الخطوط والشبكات التايبوجرافية'
          ]
        : [
            'Primary logo, secondary lockups, symbols & custom iconography',
            'Comprehensive brand guideline manual with clear rules',
            'Certified color systems (RGB / CMYK / Pantone Formula)',
            'Rigorous typographic hierarchy and font licensing advice'
          ],
      deliverables: ['Vector AI / EPS', 'Print-ready PDF', 'Web SVG / PNG', 'Brand Guide PDF']
    },
    {
      id: 'packaging',
      icon: Box,
      num: '02',
      title: isAr ? 'تصميم التغليف والعلب الفاخرة' : 'Packaging & Structural Dielines',
      subtitle: isAr ? 'تصميم عبوات وعلب تجمع بين الجاذبية التسويقية والدقة الهندسية' : 'Packaging that commands retail presence and complies with manufacturing specs',
      desc: isAr
        ? 'تخصص تطبيقي عميق في رسم خطوط التكسير (CAD Dielines) للعلب بمختلف أنواعها (علب كرتون، سلايدر، أكياس، ملصقات)، مع مراعاة سماكة الخامات (Caliper) ونقاط الطي والغراء لمنع أي خطأ تصنيعي.'
        : 'Deep structural expertise in CAD dielines for folding cartons, rigid boxes, labels, and pouches, with exact caliper compensation and fold clearances to ensure 100% production accuracy.',
      features: isAr
        ? [
            'رسم قوالب التكسير الهندسية (CAD Dielines) مع هوامش الأمان',
            'محاكاة ثلاثية الأبعاد واقعية للمنتج (3D Packaging Mockups)',
            'تصميم الملصقات (Labels) والستيكرات الترويجية للمنتجات',
            'تحديد أماكن البصمة الحرارية (Foil Stamping) والـ Spot UV'
          ]
        : [
            'Precision CAD dielines with strict bleed and glue allowances',
            'High-resolution photorealistic 3D packaging renderings',
            'Label architecture for bottles, jars, pouches and boxes',
            'Technical vector separation for hot foil stamping & spot varnish'
          ],
      deliverables: ['1:1 Vector Dieline', 'CMYK + Spot Layers', '3D Product Renders', 'Die-Cut Specs']
    },
    {
      id: 'prepress',
      icon: Printer,
      num: '03',
      title: isAr ? 'تجهيز المطبوعات والإنتاج الفني' : 'Prepress & Print Production',
      subtitle: isAr ? 'ضمان طباعة خالية من العيوب بجودة ألوان مطابقة للمواصفات' : 'Zero-error print-ready file preparation for offset, digital & screen printing',
      desc: isAr
        ? 'خبرة حقيقية بأرض المطابع وآلات الطباعة؛ أقوم بفحص الفرز اللوني وفصل ألوان البانتون، وضبط الـ Overprint لمنع تسريب الحواف، وإعداد مسارات القص لليزر والراوتر وشيتات الـ UV DTF.'
        : 'Hands-on printshop expertise ensuring spot-color separations, trapping, overprint control, laser/CNC cutting paths, and industrial gang sheets are technically flawless before hitting the press.',
      features: isAr
        ? [
            'ضبط هوامش القص (Bleed) ومناطق الأمان وعلامات التسجيل ⌖',
            'فرز ألوان السلك سكرين ومطابقة أكواد Pantone',
            'فصل ألواح البصمة والـ Spot UV كفيكتور Overprint معتمد',
            'تجهيز مسارات القص بالليزر والراوتر وشيتات الـ UV DTF'
          ]
        : [
            'Strict 3-5mm bleed margins, safety limits & registration crosshairs',
            'Pantone Formula Guide color matching & screen separations',
            'Overprint spot-plate masks for UV varnish & embossing',
            'Laser/CNC vector hairline paths and UV DTF gang assembly'
          ],
      deliverables: ['PDF/X-1a:2001 Standard', 'Vector Cutlines', 'Pantone Separation', 'Pre-flight Report']
    },
    {
      id: 'marketing',
      icon: Megaphone,
      num: '04',
      title: isAr ? 'المطبوعات الدعائية وتصاميم السوشيال' : 'Marketing Collateral & Campaigns',
      subtitle: isAr ? 'تصاميم تسويقية جذابة تعزز انتشارك التجاري وتلفت الأنظار' : 'High-impact advertising materials and cohesive social media campaigns',
      desc: isAr
        ? 'إعداد ملفات الشركات (Company Profile)، والكتالوجات المتعددة الصفحات، والبروشورات، واللوحات الإعلانية الضخمة، إلى جانب حملات السوشيال ميديا المتسلسلة والمبنية على أساس بصري متين.'
        : 'Design of comprehensive corporate profiles, multi-page catalogs, promotional brochures, outdoor billboards, and strategic social media visual campaigns.',
      features: isAr
        ? [
            'بروفايل الشركات (Company Profile) والكتالوجات التعريفية',
            'حملات سوشيال ميديا متكاملة (بوستات، ستوريهات، بانرات)',
            'تصميم البروشورات، الفولدرات، والمنشورات التسويقية',
            'إعلانات الطرق والبنرات الكبيرة (Outdoor & Signage)'
          ]
        : [
            'Editorial corporate company profiles & product catalogues',
            'Integrated multi-post social media campaign rollouts',
            'Tri-fold brochures, sales presentation folders & flyers',
            'Large-scale outdoor billboards, rollups & signage systems'
          ],
      deliverables: ['High-Res Press PDF', 'Optimized Web Assets', 'Editable Source Files', 'Multi-format Exports']
    }
  ];

  return (
    <section 
      id="services" 
      className="py-20 sm:py-28 bg-[#071610] text-white border-t border-[#143224]/80 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#143224] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div 
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B1E16] border border-[#1A4031] text-xs font-bold text-[#82E16B]"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#82E16B]" />
              <span>{isAr ? 'مجالات التخصص والخدمات' : 'CAPABILITIES & SERVICES'}</span>
            </div>
            
            <h2 
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-sm"
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
            >
              {isAr ? 'خدمات تصميمية تجمع بين الجمال ودقة التنفيذ' : 'Design Services Rooted in Craft & Production Mastery'}
            </h2>
            
            <p 
              className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
            >
              {isAr 
                ? 'حلول بصرية احترافية تلبي تطلعات الشركات، من الفكرة الأولية حتى المنتج النهائي الجاهز للإنتاج والمطبعة دون أخطاء.' 
                : 'Engineered creative solutions that bridge stunning aesthetics with real-world print feasibility and market resonance.'}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-white/60 bg-[#0B1E16] px-4 py-2.5 rounded-xl border border-[#1A4031]">
            <Layers className="w-4 h-4 text-[#82E16B]" />
            <span>{isAr ? '4 مجالات تخصص رئيسية' : '4 CORE DISCIPLINES'}</span>
          </div>
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            const isHovered = activeTab === idx;

            return (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveTab(idx)}
                className={`group relative rounded-2xl p-6 sm:p-8 bg-[#091D15] border transition-all duration-300 flex flex-col justify-between ${
                  isHovered ? 'border-[#82E16B]/60 shadow-[0_0_35px_-8px_rgba(130,225,107,0.25)] bg-[#0B2319]' : 'border-[#143224] hover:border-[#1A4031]'
                }`}
              >
                <div className="space-y-5">
                  {/* Top Row: Icon + Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#071610] border border-[#1A4031] flex items-center justify-center text-[#82E16B] group-hover:scale-105 group-hover:border-[#82E16B]/50 transition-all shadow-inner">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-sm font-bold text-[#82E16B]/50 group-hover:text-[#82E16B] transition-colors">
                      {service.num} //
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 
                      className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#82E16B] transition-colors"
                      style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-1 font-medium">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p 
                    className="text-xs sm:text-sm text-white/80 leading-relaxed border-t border-[#143224]/80 pt-4"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {service.desc}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-2 pt-2">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-white/85">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#82E16B] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables Tags Bottom Row */}
                <div className="mt-6 pt-5 border-t border-[#143224] flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono text-[#82E16B] font-bold uppercase me-1">
                    {isAr ? 'المخرجات:' : 'OUT:'}
                  </span>
                  {service.deliverables.map((deliv, dIdx) => (
                    <span 
                      key={dIdx}
                      className="text-[10px] font-mono bg-[#071610] text-white/75 px-2.5 py-1 rounded-md border border-[#143224]"
                    >
                      {deliv}
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
