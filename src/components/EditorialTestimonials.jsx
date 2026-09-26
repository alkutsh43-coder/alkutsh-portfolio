import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const EditorialTestimonials = ({ lang }) => {
  const isAr = lang === 'ar';

  const testimonialsCol1 = [
    {
      name: { ar: 'د. ياسر المنشاوي', en: 'Dr. Yasser El-Minshawi' },
      role: { ar: 'مدير التسويق • نبتة للنباتات الداخلية', en: 'Marketing Director • Nabta Indoor Botany' },
      initials: isAr ? 'ي م' : 'YM',
      color: '#10B981',
      rating: 5,
      verified: true,
      quote: {
        ar: 'أحمد ماهر استوعب روح وهوية "نبتة" من أول جلسة عمل. تصاميم البوسترات والمطبوعات رفعت مظهر البراند لمستوى راقٍ جداً، وتضاعف تفاعل ومبيعات المتجر أكثر من 180% خلال الشهر الأول.',
        en: 'Ahmed grasped the organic soul of Nabta from our first brief. The botanical campaign and print collateral elevated our brand to an elite standard, surging engagement and sales by over 180%.'
      }
    },
    {
      name: { ar: 'م. كريم عبد العزيز', en: 'Eng. Karim Abdelaziz' },
      role: { ar: 'الرئيس التنفيذي • كيميت وين UPVC', en: 'CEO • Kemet Win UPVC Profiles' },
      initials: isAr ? 'ك ع' : 'KA',
      color: '#4F46E5',
      rating: 5,
      verified: true,
      quote: {
        ar: 'صندوق عينات قطاعات الـ UPVC والكتالوج المعماري اللي أخرجه الكوتش ديزاين كان العامل الحاسم في اعتماد مواصفاتنا الهندسية لدى كبرى مكاتب الاستشارات والمقاولات في مشروعات كبرى.',
        en: 'The architectural sample box and technical binder directed by Alkutsh Design were decisive in winning engineering approvals from premier consultancies across flagship construction developments.'
      }
    },
    {
      name: { ar: 'أ. طارق الشناوي', en: 'Tarek El-Shennawy' },
      role: { ar: 'شريك مؤسس • سمارت باك للحلول التغليفية', en: 'Co-Founder • Smart Pack Packaging' },
      initials: isAr ? 'ط ش' : 'TS',
      color: '#F59E0B',
      rating: 5,
      verified: true,
      quote: {
        ar: 'الخبرة الميدانية في إعداد وتجهيز ملفات ما قبل الطباعة (Prepress) بدون مليمتر واحد خطأ وفّرت علينا مبالغ طائلة في تكاليف المطابع. نادر جداً تلاقي مصمم يجمع بين الإبداع البصري والهندسة الطباعية.',
        en: 'His hands-on prepress engineering saved us substantial printing costs with zero dieline tolerances. Finding a creative designer who also possesses rigorous pressroom mastery is truly rare.'
      }
    }
  ];

  const testimonialsCol2 = [
    {
      name: { ar: 'م. سارة المهدي', en: 'Eng. Sarah El-Mahdi' },
      role: { ar: 'مديرة الهوية البصرية • أركان للتطوير', en: 'Brand Director • Arkan Developments' },
      initials: isAr ? 'س م' : 'SM',
      color: '#EC4899',
      rating: 5,
      verified: true,
      quote: {
        ar: 'التزام تام بالمواعيد واحترافية فائقة. أسلوب أحمد في التايبوجرافي العربي النقي واختيار درجات الألوان يمنح أي مشروع ثقلاً بصرياً وهيبة لا تخطئها العين.',
        en: 'Absolute punctuality and executive professionalism. Ahmed’s command of pure Arabic typography and nuanced color systems imparts commanding authority to any high-profile project.'
      }
    },
    {
      name: { ar: 'أ. عمرو فهمي', en: 'Amr Fahmy' },
      role: { ar: 'مدير الابتكار • أنظمة الشبكات والتقنية', en: 'Innovation Lead • IT Systems & Networks' },
      initials: isAr ? 'ع ف' : 'AF',
      color: '#06B6D4',
      rating: 5,
      verified: true,
      quote: {
        ar: 'إتقان استثنائي فاق كل توقعاتنا. الهوية البصرية لقطاع السيرفرات وغرف التحكم خرجت عصرية ومحكمة جداً، مع مراعاة كاملة لكافة معايير الاستخدام الصناعي والواقعي.',
        en: 'Exceptional craft that exceeded our milestones. The visual systems for our control room infrastructure emerged sleek, contemporary, and strictly compliant with industrial standards.'
      }
    },
    {
      name: { ar: 'د. هيثم عز الدين', en: 'Dr. Haitham Ezzeldin' },
      role: { ar: 'استشاري استراتيجيات البراند • كايرو فيجن', en: 'Brand Strategy Consultant • Cairo Vision' },
      initials: isAr ? 'هـ ع' : 'HE',
      color: '#8B5CF6',
      rating: 5,
      verified: true,
      quote: {
        ar: 'الكوتش ديزاين لا يقدم مجرد صور فوتوشوب، بل يبني حلولاً بصرية متكاملة نابعة من دراسة واعية لحاجة السوق والمنافسين. شريك تصميمي يعتمد عليه للشركات الطموحة.',
        en: 'Alkutsh does not merely provide artwork; he builds strategic visual frameworks grounded in market intelligence and competitive reality. An invaluable creative partner.'
      }
    }
  ];

  const testimonialsCol3 = [
    {
      name: { ar: 'م. محمد البدري', en: 'Eng. Mohamed El-Badry' },
      role: { ar: 'مدير التسويق • البرنس فريش للصناعات الغذائية', en: 'Marketing Lead • El Prince Fresh Foods' },
      initials: isAr ? 'م ب' : 'MB',
      color: '#10B981',
      rating: 5,
      verified: true,
      quote: {
        ar: 'تصاميم أغلفة وعبوات المنتجات على أرفف السوبرماركت أحدثت فارقاً حاسماً في لفت انتباه المستهلكين وسرعة الشراء. لمسة فنية واقعية ومبهرة أضافت قيمة فورية للمنتج.',
        en: 'The retail packaging on supermarket shelves delivered an immediate leap in shelf dwell time and conversion. A tactile, visually irresistible aesthetic that boosted product equity.'
      }
    },
    {
      name: { ar: 'أ. ريم عبد القادر', en: 'Reem Abdelkader' },
      role: { ar: 'مديرة الاتصال • جلوبال لوجستيكس', en: 'Comms Director • Global Logistics' },
      initials: isAr ? 'ر ع' : 'RA',
      color: '#6366F1',
      rating: 5,
      verified: true,
      quote: {
        ar: 'مرونة مذهلة في التعديلات وسرعة استيعاب دقيقة لأدق الملاحظات. أحمد ماهر شريك حقيقي يعتمد عليه في أوقات العمل الحرجة وبأعلى معايير الجودة التنفيذية.',
        en: 'Remarkable agility with feedback and razor-sharp attention to nuanced revisions. Ahmed is a steadfast partner during high-stakes deadlines without ever diluting quality.'
      }
    },
    {
      name: { ar: 'م. شريف سالم', en: 'Eng. Sherif Salem' },
      role: { ar: 'المؤسس والمدير الإبداعي • فيكتوري ستوديو', en: 'Founder & CD • Victory Creative' },
      initials: isAr ? 'ش س' : 'SS',
      color: '#F43F5E',
      rating: 5,
      verified: true,
      quote: {
        ar: 'من أمهر المصممين في السوق المصري؛ يمتلك حساً إخراجياً سينمائياً وعيناً ناقدة للتفاصيل تجعل مخرجاته تنافس أعمال الوكالات العالمية الكبرى بكل جدارة.',
        en: 'Among the sharpest editorial talents in the Egyptian market. His cinematic art direction and uncompromising aesthetic standards easily compete with premier international agencies.'
      }
    }
  ];

  // Helper card renderer
  const renderCard = (item, idx) => (
    <div
      key={idx}
      className="group/card relative p-6 rounded-2xl bg-[#091e15]/80 hover:bg-[#0d2a1e] border border-white/10 hover:border-[#82E16B]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_30px_rgba(130,225,107,0.12)] hover:-translate-y-1 select-none flex flex-col justify-between"
      style={{
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div>
        {/* Rating Stars + Verified Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-[#82E16B]">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#82E16B] text-[#82E16B]" />
            ))}
          </div>
          {item.verified && (
            <div className="inline-flex items-center gap-1 text-[11px] font-medium text-white/60 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-[#82E16B]" />
              <span>{isAr ? 'عميل موثق' : 'Verified'}</span>
            </div>
          )}
        </div>

        {/* Quote text */}
        <p 
          className="text-white/85 text-sm sm:text-[14.5px] leading-relaxed mb-6 font-normal"
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'Inter, sans-serif' }}
        >
          "{item.quote[lang]}"
        </p>
      </div>

      {/* Author Info with Initial-Based Colored Disc Avatar (Zero asset dependency) */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm shadow-md shrink-0 select-none"
          style={{ 
            backgroundColor: item.color,
            fontFamily: isAr ? '"Zain", sans-serif' : 'Inter, sans-serif'
          }}
        >
          {item.initials}
        </div>
        <div className="min-w-0 flex-1">
          <h4 
            className="text-white font-bold text-sm tracking-tight truncate group-hover/card:text-[#82E16B] transition-colors"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", "29LT Kaff", sans-serif' : 'Inter, sans-serif' }}
          >
            {item.name[lang]}
          </h4>
          <p 
            className="text-white/50 text-xs truncate font-normal mt-0.5"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'Inter, sans-serif' }}
          >
            {item.role[lang]}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="testimonials" 
      className="relative py-24 sm:py-32 bg-[#071610] text-white overflow-hidden border-t border-white/5"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#82E16B]/5 blur-[140px] pointer-events-none rounded-full"></div>

      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs sm:text-sm font-medium mb-4 backdrop-blur-sm">
            <Quote className="w-3.5 h-3.5 text-[#82E16B]" />
            <span>{isAr ? 'شهادات وشراكات النجاح' : 'Client Endorsements & Trust'}</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]"
            style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
          >
            {isAr ? (
              <>
                ماذا يقول <span className="text-[#82E16B]">شركاء الأعمال</span> عن عملنا؟
              </>
            ) : (
              <>
                What <span className="text-[#82E16B]">Industry Leaders</span> Say
              </>
            )}
          </h2>

          <p 
            className="text-white/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 font-normal leading-relaxed"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
          >
            {isAr 
              ? 'تجارب حقيقية لعملاء وثقوا برؤيتنا في تحويل علاماتهم التجارية إلى أدوات تسويقية ذات تأثير بصري واستثماري ملموس.'
              : 'Authentic perspectives from founders and directors who partnered with us to transform brand identity into commercial momentum.'}
          </p>
        </div>

        {/* 
          3-Column Vertical Drifting Marquee Component 
          - Three columns drifting vertically at different speeds
          - Middle column reversed
          - Top and bottom gradient mask
          - Group hover pauses all lanes at once
          - Responsive: 3 columns on desktop, 2 on tablet, 1 on mobile
        */}
        <div className="group/testimonials relative h-[680px] sm:h-[720px] overflow-hidden rounded-3xl testimonials-mask">
          
          {/* Top & Bottom Gradient Masks for Seamless Edge Fade */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#071610] via-[#071610]/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#071610] via-[#071610]/80 to-transparent z-20 pointer-events-none"></div>

          {/* Marquee Columns Grid */}
          <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 h-full items-start">
            
            {/* Lane 1: Upward Drift (Normal speed ~38s) */}
            <div className="marquee-lane h-full overflow-hidden">
              <div className="marquee-track flex flex-col gap-5 sm:gap-6 animate-drift-up group-hover/testimonials:[animation-play-state:paused]">
                {/* Primary Card Set */}
                {testimonialsCol1.map((item, idx) => renderCard(item, `col1-${idx}`))}
                {/* Duplicate Set for Seamless Loop */}
                {testimonialsCol1.map((item, idx) => (
                  <div key={`col1-dup-${idx}`} aria-hidden="true">
                    {renderCard(item, `col1-dup-card-${idx}`)}
                  </div>
                ))}
              </div>
            </div>

            {/* Lane 2: Downward Drift (Reversed speed ~30s) - Hidden on mobile (<768px) */}
            <div className="marquee-lane hidden md:block h-full overflow-hidden">
              <div className="marquee-track flex flex-col gap-5 sm:gap-6 animate-drift-down group-hover/testimonials:[animation-play-state:paused]">
                {/* Primary Card Set */}
                {testimonialsCol2.map((item, idx) => renderCard(item, `col2-${idx}`))}
                {/* Duplicate Set for Seamless Loop */}
                {testimonialsCol2.map((item, idx) => (
                  <div key={`col2-dup-${idx}`} aria-hidden="true">
                    {renderCard(item, `col2-dup-card-${idx}`)}
                  </div>
                ))}
              </div>
            </div>

            {/* Lane 3: Upward Drift (Slower speed ~46s) - Visible only on large screens (>=1024px) */}
            <div className="marquee-lane hidden lg:block h-full overflow-hidden">
              <div className="marquee-track flex flex-col gap-5 sm:gap-6 animate-drift-up-slow group-hover/testimonials:[animation-play-state:paused]">
                {/* Primary Card Set */}
                {testimonialsCol3.map((item, idx) => renderCard(item, `col3-${idx}`))}
                {/* Duplicate Set for Seamless Loop */}
                {testimonialsCol3.map((item, idx) => (
                  <div key={`col3-dup-${idx}`} aria-hidden="true">
                    {renderCard(item, `col3-dup-card-${idx}`)}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Micro hint below container */}
          <div className="absolute bottom-2 inset-x-0 text-center z-20 pointer-events-none">
            <span className="text-[11px] text-white/40 tracking-wider">
              {isAr ? '• حرّك المؤشر فوق أي بطاقة لإيقاف الحركة مؤقتاً •' : '• Hover to pause drifting cards •'}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
