import React from 'react';

export const EditorialBio = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <section 
      id="bio" 
      className="py-24 sm:py-32 bg-[#071610] text-white border-t border-[#143224]/60 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-8 relative z-10">
        
        {/* Header: ABOUT / عن المصمم in prominent clear typeface */}
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-[0.2em] uppercase drop-shadow-md"
          style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
        >
          {isAr ? 'عـن الـمـصـمـم' : 'ABOUT'}
        </h2>

        {/* Narrative Paragraph with large, comfortable, crystal-clear typography */}
        <p 
          className="text-lg sm:text-xl md:text-2xl text-white/95 leading-[2.0] sm:leading-[2.1] font-normal drop-shadow"
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}
        >
          {isAr ? (
            <>
              أنا أحمد ماهر، مصمم جرافيك ولدي أكثر من 3 سنوات من الخبرة العملية المتخصصة في التصميم الجرافيكي، الطباعة، والاتصال البصري. يركز عملي على إنشاء تصاميم احترافية وفعالة للتطبيقات المطبوعة والرقمية، بما في ذلك بناء العلامات التجارية، الهويات البصرية، الشعارات، المواد الإعلانية، واللوحات الإرشادية. لدي خبرة عملية قوية في استخدام Adobe Illustrator وبرامج التصميم المتطورة، إلى جانب معرفة تطبيقية عميقة بمراحل الإنتاج الطباعي وتجهيز ملفات القص بالليزر. يتيح لي هذا المزيج فهم المشروع ليس فقط من المنظور الجمالي، بل ومن المنظور الإنتاجي والتنفيذي أيضاً. أؤمن بأن التصميم الجيد لا يقتصر على المظهر الخارجي، بل يجب أن يوصل الرسالة بدقة، ويخدم هدفه، ويكون عملياً وقابلاً للإنتاج بأعلى معايير الجودة.
            </>
          ) : (
            <>
              I’m Ahmed Maher, a Graphic Designer with over 3 years of practical experience in graphic design, printing, and visual communication. My work focuses on creating professional and effective designs for print and digital applications, including branding, visual identities, logos, advertising materials, signage, and various printed products. I have strong practical experience with Adobe Illustrator and other Adobe Creative Cloud tools, along with hands-on knowledge of printing production and laser cutting preparation. This combination allows me to understand a project not only from a visual perspective, but also from a production and technical perspective. I believe that good design is not only about appearance. It should communicate the right message, serve its purpose, and be practical to produce.
            </>
          )}
        </p>

      </div>
    </section>
  );
};

