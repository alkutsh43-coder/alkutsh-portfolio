import React, { useState, useEffect, useRef } from 'react';

export const EditorialAbout = ({ lang }) => {
  const isAr = lang === 'ar';
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ p1: 0, p2: 0, p3: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // trigger once smoothly
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth number counter animation for stats
  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    const duration = 1600; // 1.6s

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic curve: f(x) = 1 - (1 - x)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setCounts({
        p1: Math.floor(easeProgress * 45),
        p2: Math.floor(easeProgress * 20),
        p3: Math.floor(easeProgress * 3),
      });

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCounts({ p1: 45, p2: 20, p3: 3 });
      }
    };

    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, 700);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const smoothCurve = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 sm:py-28 bg-[#071610] text-white border-t border-[#143224]/80 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      
      {/* Ambient background glow with soft breathing animation */}
      <div 
        className={`absolute top-1/2 -left-40 -translate-y-1/2 w-96 h-96 bg-[#82E16B]/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-110' : 'opacity-0 scale-75'
        }`}
      ></div>

      <div className="max-w-[1480px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Main Grid: Portrait Card + Narrative & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Portrait Column with Rounded Corners & Entrance Animation */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              className={`group relative max-w-[460px] w-full transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-x-0 scale-100 blur-0' 
                  : 'opacity-0 scale-95 blur-[4px]'
              }`}
              style={{ transitionTimingFunction: smoothCurve }}
            >
              {/* Backlight halo glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#82E16B]/20 via-[#4EBA6F]/15 to-transparent rounded-[44px] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>

              {/* Image Frame */}
              <div className="relative rounded-[32px] sm:rounded-[42px] overflow-hidden shadow-2xl border border-[#1A4031] group-hover:border-[#82E16B]/70 group-hover:shadow-[0_20px_50px_rgba(130,225,107,0.22)] transition-all duration-700 aspect-[3/4] bg-[#0A1D15]">
                <img
                  src="./assets/ahmed_maher_about.jpg"
                  alt={isAr ? "أحمد ماهر - مصمم جرافيك" : "Ahmed Maher - Graphic Designer"}
                  className="w-full h-full object-cover select-none transform transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  loading="eager"
                />

                {/* Shimmer light pass on entrance */}
                <div 
                  className={`absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out ${
                    isVisible ? 'translate-x-full opacity-0' : '-translate-x-full opacity-100'
                  }`}
                  style={{ transitionDelay: '500ms' }}
                />

                {/* Subtle bottom vignette */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#071610]/80 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Narrative & Stats Column with Staggered Entrance and Crisp Clear Fonts */}
          <div className={`lg:col-span-7 space-y-7 ${isAr ? 'text-right' : 'text-left'}`}>
            
            {/* Tag: نبذه عني ────── matching media_1789554728026.png */}
            <div 
              className={`flex items-center gap-3 text-sm sm:text-base font-bold tracking-wide text-white/85 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}
              style={{ 
                fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif',
                transitionDelay: '150ms',
                transitionTimingFunction: smoothCurve 
              }}
            >
              {isAr ? (
                <>
                  <span>نبذه عني</span>
                  <span className="w-12 sm:w-16 h-[2px] bg-[#82E16B] rounded-full"></span>
                </>
              ) : (
                <>
                  <span className="w-10 h-[2px] bg-[#82E16B] rounded-full"></span>
                  <span>ABOUT ME</span>
                </>
              )}
            </div>

            {/* Headline with subtle, clean line-height and simple gap matching user request */}
            <div 
              className={`text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] font-black text-white tracking-tight transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif',
                transitionDelay: '300ms',
                transitionTimingFunction: smoothCurve 
              }}
            >
              {isAr ? (
                <div className="space-y-0.5 sm:space-y-1 leading-[1.18] sm:leading-[1.22]">
                  <div>
                    مصمم <span className="text-[#82E16B] inline-block tracking-wider">هـويـات بـصـريـة</span>
                  </div>
                  <div>
                    مبنية على أثر وهدف حقيقي
                  </div>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 leading-[1.25]">
                  <div>
                    Designer of <span className="text-[#82E16B] inline-block hover:scale-[1.02] transition-transform">identities</span>
                  </div>
                  <div>
                    That feel intentional.
                  </div>
                </div>
              )}
            </div>

            {/* 3 Paragraphs with enlarged font size & Noto Sans Arabic 'Black' weight (900) */}
            <div 
              className="space-y-4 sm:space-y-5 text-white text-[16.5px] sm:text-[17.5px] lg:text-[18.5px] leading-[1.85] sm:leading-[1.9] max-w-2xl" 
              style={{ 
                fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", serif',
                fontWeight: isAr ? 900 : 400
              }}
            >
              
              <p 
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ 
                  transitionDelay: '450ms',
                  transitionTimingFunction: smoothCurve 
                }}
              >
                {isAr 
                  ? 'أنا أحمد ماهر، مصمم جرافيك مقيم في مصر ولدي أكثر من 3 سنوات من الخبرة العملية المتخصصة في التصميم الجرافيكي ومجال الطباعة وإنتاجها'
                  : 'I’m Ahmed Maher, an Egypt-based Graphic Designer with over 3 years of practical experience in graphic design and printing.'}
              </p>

              <p 
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ 
                  transitionDelay: '600ms',
                  transitionTimingFunction: smoothCurve 
                }}
              >
                {isAr
                  ? 'متخصص في بناء الهويات البصرية، تصميم الشعارات، المطبوعات التجارية، المواد الإعلانية واللوحات الإرشادية. خبرتي الميدانية في التصميم ومراحل الإنتاج الطباعي تتيح لي ابتكار تصاميم ليست فقط قوية وجذابة بصرياً، بل وعملية وقابلة للتنفيذ والطباعة بأعلى جودة'
                  : 'Specializing in visual identity, logo design, print design, advertising materials, and signage. My experience in both design and print production allows me to create designs that are not only visually strong, but also practical and ready for production.'}
              </p>

              <p 
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ 
                  transitionDelay: '750ms',
                  transitionTimingFunction: smoothCurve 
                }}
              >
                {isAr
                  ? 'من خلال الممارسة العملية لمشاريع متعددة، أبتكر حلولاً تصميمية نظيفة واحترافية توازن بدقة بين الإبداع، والوضوح، والتأثير البصري المباشر - مما يساعد العلامات التجارية على التواصل بفاعلية مع جمهورها وإبراز هويتها'
                  : 'Through hands-on experience with various projects, I create clean and professional design solutions that balance creativity, clarity, and visual impact — helping brands communicate their identity effectively.'}
              </p>

            </div>

            {/* Stats Grid matching media_1789554728026.png (No top border, 45+ with plus on right, Noto Sans Arabic labels) */}
            <div 
              className={`pt-8 sm:pt-10 grid grid-cols-3 gap-6 sm:gap-10 max-w-xl transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: '900ms',
                transitionTimingFunction: smoothCurve 
              }}
            >
              
              {/* Stat 1: 45+ */}
              <div className="group cursor-default">
                <div 
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#82E16B] to-[#2B6645] tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 inline-block" 
                  dir="ltr"
                  style={{ fontFamily: '"A Nefel Sereke", sans-serif' }}
                >
                  {counts.p1}+
                </div>
                <div 
                  className="text-sm sm:text-base text-white font-bold mt-3" 
                  style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                >
                  {isAr ? 'مشروعات مستقله' : 'Freelance Projects'}
                </div>
              </div>

              {/* Stat 2: 20 */}
              <div className="group cursor-default">
                <div 
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#82E16B] to-[#2B6645] tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 inline-block" 
                  dir="ltr"
                  style={{ fontFamily: '"A Nefel Sereke", sans-serif' }}
                >
                  {counts.p2}
                </div>
                <div 
                  className="text-sm sm:text-base text-white font-bold mt-3" 
                  style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                >
                  {isAr ? 'اعمال مختاره' : 'Featured Works'}
                </div>
              </div>

              {/* Stat 3: 3 */}
              <div className="group cursor-default">
                <div 
                  className="text-5xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#82E16B] to-[#2B6645] tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 inline-block" 
                  dir="ltr"
                  style={{ fontFamily: '"A Nefel Sereke", sans-serif' }}
                >
                  {counts.p3}
                </div>
                <div 
                  className="text-sm sm:text-base text-white font-bold mt-3" 
                  style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                >
                  {isAr ? 'تخصصات أساسية' : 'Disciplines'}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

