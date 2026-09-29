import React, { useState } from 'react';
import { 
  CreditCard, 
  FileText, 
  BookOpen, 
  Image as ImageIcon, 
  Building2, 
  Sparkles, 
  Check, 
  Lightbulb, 
  Store, 
  Briefcase, 
  MessageSquare, 
  AlertCircle, 
  HelpCircle, 
  ArrowLeft, 
  ArrowUpRight,
  Info
} from 'lucide-react';

export const PrintDecisionGuide = ({ lang, scrollToSection }) => {
  const isAr = lang === 'ar';

  // 1. Goal Cards State
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(0);

  // 2. Real-World Scenario Tab State (Phone Store vs Company)
  const [activeScenario, setActiveScenario] = useState('phoneStore');

  // 3. Interactive Quiz State
  const [quizAnswers, setQuizAnswers] = useState({
    goal: 'announcement', // default selected
    action: 'visit',
    place: 'handout'
  });

  const handlePortfolioScroll = () => {
    if (scrollToSection) {
      scrollToSection('portfolio');
    } else {
      const el = document.getElementById('portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 5 Core Goal Items
  const goalItems = [
    {
      id: 'businessCard',
      icon: CreditCard,
      goalTag: isAr ? 'التعريف والتواصل' : 'Networking & Contact',
      question: isAr ? 'عايز الناس تعرفك وتتواصل معاك؟' : 'Want people to remember & contact you?',
      typeTitle: isAr ? 'Business Card (بزنس كارد): كارت شخصي' : 'Business Card: Personal Card',
      subtitle: isAr ? 'تعريف سريع + بيانات التواصل' : 'Quick introduction + Contact info',
      whenToUse: isAr 
        ? 'مناسب عندما تريد ترك وسيلة تواصل سريعة ومهنية تدوم مع العميل في محفظته أو على مكتبه بعد اللقاء المباشر.'
        : 'When you want to leave an instant, tactile professional contact card that stays with the client.',
      suitableFor: isAr 
        ? ['الاجتماعات واللقاءات الشخصية', 'المعارض والمؤتمرات', 'العملاء المترددين على المحل أو المكتب']
        : ['In-person Meetings', 'Exhibitions & Events', 'Visiting Walk-in Clients'],
      usuallyContains: isAr
        ? ['الاسم والصفة المهنية', 'الشعار والهوية البصرية', 'أرقام التواصل والإيميل', 'رمز QR مباشر للواتساب أو الموقع']
        : ['Name & Professional Title', 'Brand Logo & Colors', 'Phone, WhatsApp & Email', 'Direct QR Code'],
      realExample: isAr
        ? 'كارت تسلّمه للعميل في نهاية اجتماع أو زيارة، ليحتفظ به ويتواصل معك في اللحظة التي يحتاج فيها خدمتك.'
        : 'Handed at the end of a consultation, so the prospect easily reaches out whenever ready.',
      ctaText: isAr ? 'محتاج تصميم كارت شخصي؟ شوف أعمال الكروت' : 'Need a business card? View card projects'
    },
    {
      id: 'flyer',
      icon: FileText,
      goalTag: isAr ? 'عروض وإعلانات سريعة' : 'Promotions & Offers',
      question: isAr ? 'عايز تعلن عن عرض أو خدمة؟' : 'Promoting a special offer or service?',
      typeTitle: isAr ? 'Flyer (فلاير): منشور إعلاني' : 'Flyer: Promotional Leaflet',
      subtitle: isAr ? 'إعلان سريع + عرض أو خدمة' : 'Quick announcement + Offer or service',
      whenToUse: isAr
        ? 'مناسب عندما تريد توصيل عرض ترويجي أو رسالة محددة ومؤقتة بسرعة فائقة لجمهور واسع بأقل تكلفة.'
        : 'When communicating a targeted, time-sensitive promotion or special deal rapidly and cost-effectively.',
      suitableFor: isAr
        ? ['الخصومات والأسعار الترويجية', 'الافتتاحات وفروع المحلات الجديدة', 'إطلاق المنتجات والخدمات الجديدة']
        : ['Promotional Discounts', 'Grand Openings & Branch Launches', 'New Product Drops'],
      usuallyContains: isAr
        ? ['عنوان واضح وملفت', 'صورة أو رسمة قوية للمنتج', 'تفاصيل العرض بوضوح', 'وسيلة تواصل وموقع الفرع مباشرة']
        : ['Punchy Headline', 'Hero Product Visual', 'Crystal-clear Offer Terms', 'Direct Phone & Address'],
      realExample: isAr
        ? 'منشور إعلاني يُوزع بمناسبة افتتاح الفرع الجديد يعلن عن خصم 20% على باقة معينة لفترة محدودة.'
        : 'A promotional flyer distributed for a branch launch offering a 20% discount for a limited time.',
      ctaText: isAr ? 'محتاج فلاير لمشروعك؟ شوف أعمال الفلاير' : 'Need a flyer for your campaign? View flyers'
    },
    {
      id: 'brochure',
      icon: BookOpen,
      goalTag: isAr ? 'شرح وتفاصيل متعددة' : 'In-depth Services',
      question: isAr ? 'عايز تشرح خدماتك أو منتجاتك بالتفصيل؟' : 'Explaining multiple services or packages?',
      typeTitle: isAr ? 'Brochure (بروشور): مطوية تعريفية' : 'Brochure: Multi-fold Guide',
      subtitle: isAr ? 'شرح وتفاصيل + أكثر من معلومة' : 'Organized depth + Multi-section guide',
      whenToUse: isAr
        ? 'مناسب عندما يكون لديك عدة خدمات أو باقات أو منتجات تحتاج شرحاً منظماً ومقسماً لصفحات وثنيات متعددة.'
        : 'When you have multiple tiers, services, or products requiring structured folding sections and reading flow.',
      suitableFor: isAr
        ? ['قوائم الخدمات الشاملة', 'المراكز الطبية والعيادات', 'الشركات الخدمية والمعاهد التدريبية', 'صالات الاستقبال']
        : ['Complete Service Lists', 'Medical Centers & Clinics', 'Training Institutes', 'Reception Lounges'],
      usuallyContains: isAr
        ? ['مقدمة تعريفية عن النشاط', 'تبويب الخدمات والمميزات', 'صور وتوضيحات تفصيلية', 'باقات الأسعار وشروط الضمان']
        : ['Introductory Overview', 'Categorized Services', 'Supporting Imagery', 'Tiered Packages & Warranty'],
      realExample: isAr
        ? 'مطوية أنيقة (Tri-fold) موضوعة في صالة الاستقبال يقرأها العميل بهدوء ليتعرف على كافة خيارات الخدمات.'
        : 'A sleek tri-fold in the reception area allowing customers to browse all available package details.',
      ctaText: isAr ? 'محتاج بروشور تعريفي؟ شوف أعمال المطبوعات' : 'Need a brochure? View print collateral'
    },
    {
      id: 'poster',
      icon: ImageIcon,
      goalTag: isAr ? 'لفت الانتباه من مسافة' : 'Long-distance Impact',
      question: isAr ? 'عايز إعلان يلفت الانتباه من مسافة؟' : 'Need to grab attention from a distance?',
      typeTitle: isAr ? 'Poster (بوستر): ملصق إعلاني' : 'Poster: Large Wall Impact',
      subtitle: isAr ? 'رسالة واضحة + جذب الانتباه' : 'Bold message + Visual magnetic draw',
      whenToUse: isAr
        ? 'مناسب لجذب عيون المارة أو الزوار من على بعد ونقل فكرة بصرية واحدة قوية ومباشرة في ثوانٍ معدودة.'
        : 'Engineered to stop walking traffic and broadcast one clear, memorable message in seconds.',
      suitableFor: isAr
        ? ['واجهات المحلات والزجاج الخارجي', 'قاعات المعارض والمؤتمرات', 'لوحات الإعلانات الداخلية والجداريات']
        : ['Storefront Windows', 'Conference Halls & Expos', 'Indoor Wall Signage'],
      usuallyContains: isAr
        ? ['فكرة بصرية جريئة وطاغية', 'عنوان رئيسي ضخم ومختصر', 'تاريخ أو موعد أو موقع', 'دعوة واضحة لاتخاذ إجراء (CTA)']
        : ['Dominant Creative Visual', 'Bold, Concise Headline', 'Date or Location', 'High-visibility CTA'],
      realExample: isAr
        ? 'بوستر بحجم كبير معلق على واجهة المتجر أو داخل المول يجذب انتباه كل من يمر بجواره نحو الفعالية أو العرض.'
        : 'A large-format poster on a retail facade catching the eye of every passerby about an upcoming sale.',
      ctaText: isAr ? 'محتاج بوستر إعلاني؟ شوف أعمال البوسترات' : 'Need a display poster? View poster projects'
    },
    {
      id: 'companyProfile',
      icon: Building2,
      goalTag: isAr ? 'تقديم مؤسسي متكامل' : 'Corporate Identity',
      question: isAr ? 'عايز تقدم شركتك بشكل متكامل؟' : 'Presenting your firm to corporate clients?',
      typeTitle: isAr ? 'Company Profile (كومباني بروفايل): ملف تعريفي للشركة' : 'Company Profile: Corporate Portfolio',
      subtitle: isAr ? 'تعريف متكامل + معلومات عن الشركة' : 'Complete corporate prestige & portfolio',
      whenToUse: isAr
        ? 'مناسب للشركات والمؤسسات، العروض التجارية، الاجتماعات، المعارض، وإرسال الملف عبر واتساب أو البريد للتعريف بالشركة للعملاء والشركاء.'
        : 'Ideal for companies, sales pitches, meetings, exhibitions, and emailing/sharing via WhatsApp to introduce credentials to clients and partners.',
      suitableFor: isAr
        ? ['الشركات والمؤسسات', 'العروض التجارية والاجتماعات', 'المعارض الرسمية', 'التعريف بالشركة للعملاء والشركاء']
        : ['Enterprises & Companies', 'Sales Pitches & Meetings', 'Expos & Trade Shows', 'Partner & Client Introductions'],
      usuallyContains: isAr
        ? ['نبذة عن الشركة ورؤيتها وقيمها', 'سابقة الأعمال والمشاريع المنفذة', 'قائمة العملاء وشهادات الاعتماد', 'الهيكل وقنوات التواصل الرسمية']
        : ['About, Vision & Core Values', 'Portfolio & Delivered Projects', 'Client Roster & Accreditations', 'Official Contact Channels'],
      realExample: isAr
        ? 'ملف أنيق (مطبوع فاخر أو PDF رقمي تفاعلي) ترسله لعميل جديد أو تقدمه في اجتماع لتثبت خبرة وموثوقية شركتك.'
        : 'A polished digital PDF or luxury print dossier sent to clients or presented in meetings establishing firm credibility.',
      ctaText: isAr ? 'محتاج بروفايل لشركتك؟ شوف نماذج البروفايل' : 'Need a company profile? View corporate profiles'
    }
  ];

  // Quick Comparison Matrix Items (احتياجك ➔ التصميم)
  const comparisonItems = [
    {
      need: isAr ? 'بيانات التواصل' : 'Direct Contact Info',
      design: isAr ? 'كارت شخصي' : 'Business Card',
      badge: 'Business Card'
    },
    {
      need: isAr ? 'عرض أو إعلان' : 'Special Offer or Deal',
      design: isAr ? 'فلاير' : 'Flyer',
      badge: 'Flyer'
    },
    {
      need: isAr ? 'تفاصيل وخدمات متعددة' : 'Multiple Services & Details',
      design: isAr ? 'بروشور' : 'Brochure',
      badge: 'Brochure'
    },
    {
      need: isAr ? 'رسالة كبيرة وواضحة' : 'Bold Visibility from Afar',
      design: isAr ? 'بوستر' : 'Poster',
      badge: 'Poster'
    },
    {
      need: isAr ? 'تقديم شركة' : 'Corporate Presentation',
      design: isAr ? 'بروفايل شركة' : 'Company Profile',
      badge: 'Company Profile'
    }
  ];

  // Quiz Options
  const quizQuestions = {
    goals: [
      { id: 'identity', label: isAr ? 'التعريف بنفسي أو نشاطي' : 'Introduce myself or my business' },
      { id: 'announcement', label: isAr ? 'الإعلان عن عرض أو خصم' : 'Promote a discount or offer' },
      { id: 'services', label: isAr ? 'شرح خدمات أو منتجات متعددة' : 'Explain multiple services / products' },
      { id: 'corporate', label: isAr ? 'تقديم شركة أو مؤسسة' : 'Present a corporate company' },
      { id: 'attention', label: isAr ? 'جذب انتباه المارة والجمهور' : 'Grab passersby attention' }
    ],
    actions: [
      { id: 'call', label: isAr ? 'يتصل بي أو يراسلني مباشرة' : 'Call or message me directly' },
      { id: 'visit', label: isAr ? 'يزور المكان أو الفرع' : 'Visit our physical branch' },
      { id: 'buy', label: isAr ? 'يشتري أو يستفيد من العرض فوراً' : 'Claim offer or buy immediately' },
      { id: 'explore', label: isAr ? 'يتعرف على كافة خدماتي وباقاتي' : 'Explore full service range & packages' },
      { id: 'save', label: isAr ? 'يحتفظ ببياناتي لوقت الحاجة' : 'Keep my contact card for later' }
    ],
    places: [
      { id: 'direct', label: isAr ? 'مع العملاء مباشرة في اجتماعات' : 'Direct face-to-face meetings' },
      { id: 'handout', label: isAr ? 'توزيعه على الناس باليد أو المولات' : 'Handed out in streets or malls' },
      { id: 'inside', label: isAr ? 'داخل المحل أو مقر الشركة' : 'Inside branch or company showroom' },
      { id: 'online', label: isAr ? 'على الإنترنت ووسائل التواصل' : 'Online & social media' }
    ]
  };

  // Smart Consultative Recommendation Logic
  const getRecommendation = () => {
    const { goal, action, place } = quizAnswers;

    if (goal === 'corporate' || (action === 'explore' && place === 'direct')) {
      return {
        type: isAr ? 'بروفايل شركة (Company Profile)' : 'Company Profile',
        why: isAr 
          ? 'لأن هدفك هو تقديم نشاطك للعملاء أو الشركاء بشكل متكامل وموثوق يبرز سابقة أعمالك وقوة فريقك.'
          : 'Because your goal is introducing your company comprehensively and building institutional trust.',
        complementaryTip: isAr
          ? 'وقد يكون من المفيد دعم الملف بكارت شخصي فاخر (Business Card) تسلّمه بيدك في الاجتماعات المباشرة.'
          : 'Pro Tip: Pair it with a tactile luxury Business Card to hand personally during face-to-face meetings.'
      };
    }

    if (goal === 'identity' || action === 'save' || (place === 'direct' && action === 'call')) {
      return {
        type: isAr ? 'كارت شخصي (Business Card)' : 'Business Card',
        why: isAr
          ? 'لأن أولويتك هي أن يحتفظ العميل بوسيلة تواصل مباشرة تدوم في جيبه وتسهل عليه الرجوع إليك وقت الحاجة.'
          : 'Because leaving a tactile, persistent contact card in your client’s pocket is priority #1.',
        complementaryTip: isAr
          ? 'وقد يكون من المفيد تجهيز تصميم فلاير ترويجي مرافق إذا كان لديك عرض افتتاحي محدد تود إرفاقه.'
          : 'Pro Tip: You might also add a promotional flyer if you have an active launch discount.'
      };
    }

    if (goal === 'services' || action === 'explore') {
      return {
        type: isAr ? 'بروشور تعريفي (Brochure)' : 'Brochure (Catalog)',
        why: isAr
          ? 'لأن لديك باقات ومعلومات متعددة تحتاج تنظيماً بصرياً مقسماً لطيات يسهل على العميل قراءتها والمقارنة بينها.'
          : 'Because multiple services require structured page folds for effortless reading and comparison.',
        complementaryTip: isAr
          ? 'وقد يكون من المفيد وضع كود QR داخل البروشور يوجه العميل إلى محادثة واتساب لحجز الخدمة فوراً.'
          : 'Pro Tip: Include a dedicated QR code on the back flap linking directly to your WhatsApp.'
      };
    }

    if (goal === 'attention' || (place === 'inside' && action === 'visit')) {
      return {
        type: isAr ? 'بوستر إعلاني (Poster)' : 'Promotional Poster',
        why: isAr
          ? 'لأنك تريد خطف الأنظار من مسافة بعيدة ونقل رسالة بصرية واحدة وسريعة للمارة دون تشتيت.'
          : 'Because high visual prominence and instant 3-second comprehension are essential here.',
        complementaryTip: isAr
          ? 'وقد يكون من المفيد توفير ستاند فلايرات صغيرة بجوار البوستر لمن يريد أخذ العرض معه إلى البيت.'
          : 'Pro Tip: Place a compact flyer holder underneath the poster for grab-and-go customer leads.'
      };
    }

    // Default: Flyer (Promotion, deals, handouts, branch visits)
    return {
      type: isAr ? 'فلاير إعلاني (Flyer)' : 'Promotional Flyer',
      why: isAr
        ? 'لأن هدفك هو الترويج لعرض أو خدمة محددة وتوجيه العميل إلى اتخاذ إجراء سريع (زيارة الفرع أو الشراء).'
        : 'Because your goal is promoting a specific offer and driving rapid customer action.',
      complementaryTip: isAr
        ? 'وقد يكون من المفيد أيضاً دعم الحملة بتصميم رقمي متناسق لنفس العرض لنشره عبر منصات التواصل.'
        : 'Pro Tip: Supporting this print flyer with a matching digital social design will multiply your campaign impact.'
    };
  };

  const currentRecommendation = getRecommendation();

  // WhatsApp Message Generator matching user's exact specification
  const generateWhatsAppUrl = () => {
    const selectedGoalText = quizQuestions.goals.find(g => g.id === quizAnswers.goal)?.label || '';
    const selectedActionText = quizQuestions.actions.find(a => a.id === quizAnswers.action)?.label || '';
    const selectedPlaceText = quizQuestions.places.find(p => p.id === quizAnswers.place)?.label || '';

    const text = isAr
      ? `مرحبًا أحمد، أحتاج مساعدة في اختيار التصميم المناسب لمشروعي.\n- الهدف: ${selectedGoalText}\n- الإجراء المطلوب: ${selectedActionText}\n- مكان الاستخدام: ${selectedPlaceText}\nوأريد معرفة النوع المناسب لاحتياجي.`
      : `Hello Ahmed, I need guidance choosing the right design for my project.\n- Goal: ${selectedGoalText}\n- Desired Action: ${selectedActionText}\n- Placement: ${selectedPlaceText}\nI would like to explore the best path forward.`;

    return `https://wa.me/201067017778?text=${encodeURIComponent(text)}`;
  };

  const activeGoal = goalItems[selectedGoalIndex];

  return (
    <section 
      id="guide"
      className="py-16 sm:py-24 bg-[#071610] text-white border-t border-[#143224]/80 relative overflow-hidden"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Background Ambience Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. ترويسة القسم (Header & Eyebrow)                                         */}
        {/* ========================================================================= */}
        <div className="border-b border-[#143224] pb-6 space-y-3">
          <div className="flex items-center gap-2">
            <span 
              className="text-xs font-mono font-bold text-[#82E16B] uppercase tracking-widest inline-flex items-center gap-2"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'monospace' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              // PRINT & DESIGN GUIDE
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-2.5 max-w-3xl">
              <h2 
                className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight"
                style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
              >
                {isAr ? 'مش عارف تبدأ منين؟ خلينا نساعدك تختار' : "Not Sure Where to Start? Let's Help You Choose"}
              </h2>
              
              <p 
                className="text-base sm:text-lg text-white/85 font-medium leading-relaxed"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
              >
                {isAr 
                  ? 'مش كل تصميم مناسب لكل هدف. اعرف احتياجك أولًا، واختار التصميم الذي يخدمه.'
                  : 'Not every design fits every goal. Understand your objective first, then select the piece that serves it.'}
              </p>
            </div>

            <div className="bg-[#0B1E16] border border-[#1A4031] rounded-xl px-4 py-2.5 max-w-sm">
              <p 
                className="text-xs text-[#82E16B] font-medium leading-normal flex items-center gap-2"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
              >
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>{isAr ? 'اختيار التصميم الصحيح يبدأ بفهم الهدف الذي تريد تحقيقه.' : 'The right design begins with a clear understanding of your goal.'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. اختيار حسب الهدف: 5 كروت أساسية مع فتح التفاصيل عند الضغط               */}
        {/* ========================================================================= */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#82E16B] tracking-wider uppercase block">
              [ {isAr ? 'اضغط على الكارت لعرض التفاصيل' : 'CLICK ANY CARD FOR DETAILS'} ]
            </span>
            <span className="text-xs text-white/40 hidden sm:inline-block">
              {isAr ? '5 أنواع مطبوعات وتصميمات أساسية' : '5 Core Formats'}
            </span>
          </div>

          {/* 5 Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {goalItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedGoalIndex === idx;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedGoalIndex(idx)}
                  className={`relative text-start p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-[#0B1E16] border-[#82E16B] shadow-[0_0_25px_rgba(130,225,107,0.18)] scale-[1.02]'
                      : 'bg-[#091B13]/70 hover:bg-[#0B1E16] border-[#143224] hover:border-[#82E16B]/50'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-[#82E16B] text-[#071610]' 
                          : 'bg-[#071610] text-[#82E16B] border border-[#1A4031] group-hover:border-[#82E16B]/60'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
                        isSelected 
                          ? 'bg-[#82E16B]/15 text-[#82E16B] border-[#82E16B]/40' 
                          : 'bg-[#071610] text-white/40 border-[#143224]'
                      }`}>
                        0{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p 
                        className="text-xs font-medium text-white/60 line-clamp-1"
                        style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                      >
                        {item.goalTag}
                      </p>
                      <h4 
                        className={`text-sm sm:text-base font-bold leading-snug transition-colors ${
                          isSelected ? 'text-[#82E16B]' : 'text-white group-hover:text-[#82E16B]'
                        }`}
                        style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit' }}
                      >
                        {item.question}
                      </h4>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#143224]/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-white/80 truncate">
                      {item.typeTitle.split(':')[0]}
                    </span>
                    <span className={`w-2 h-2 rounded-full transition-all ${
                      isSelected ? 'bg-[#82E16B] scale-125' : 'bg-white/20'
                    }`}></span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progressive Details Reveal for the Active Card */}
          {activeGoal && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1E16] border border-[#82E16B]/50 shadow-2xl relative overflow-hidden transition-all duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#82E16B]/5 rounded-bl-full pointer-events-none"></div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
                
                {/* Left/Main Column: Title, Goal, When to Use */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#82E16B]/10 text-[#82E16B] border border-[#82E16B]/30 text-xs font-mono">
                      <activeGoal.icon className="w-3.5 h-3.5" />
                      <span>{activeGoal.goalTag}</span>
                    </div>

                    <h3 
                      className="text-2xl sm:text-3xl font-extrabold text-white"
                      style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
                    >
                      {activeGoal.typeTitle}
                    </h3>

                    <p 
                      className="text-sm sm:text-base text-white/85 leading-relaxed font-normal pt-1"
                      style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                    >
                      <strong className="text-[#82E16B] font-semibold">{isAr ? 'متى تحتاجه؟ ' : 'When is it needed? '}</strong>
                      {activeGoal.whenToUse}
                    </p>
                  </div>

                  {/* Practical Example Box */}
                  <div className="p-4 rounded-2xl bg-[#071610] border border-[#1A4031] space-y-1.5">
                    <span className="text-xs font-bold text-[#82E16B] flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-[#82E16B]" />
                      {isAr ? 'مثال عملي من الواقع:' : 'Practical Real-World Example:'}
                    </span>
                    <p 
                      className="text-xs sm:text-sm text-white/90 leading-relaxed"
                      style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                    >
                      {activeGoal.realExample}
                    </p>
                  </div>

                  {/* Contextual Link to Portfolio Works (Feature 4 from user request) */}
                  <div className="pt-1">
                    <button
                      onClick={handlePortfolioScroll}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#82E16B] hover:text-[#a0f58b] bg-[#071610] hover:bg-[#071610]/80 border border-[#1A4031] hover:border-[#82E16B] px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer group"
                      style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
                    >
                      <span>{activeGoal.ctaText}</span>
                      <ArrowUpRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${isAr ? 'rotate-[-90deg]' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Right Column: Suitable For & Contains */}
                <div className="lg:col-span-5 space-y-4 bg-[#071610]/80 p-5 rounded-2xl border border-[#143224]">
                  {/* Suitable For */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#82E16B] uppercase tracking-wider block">
                      {isAr ? 'مناسب لـ:' : 'Best suited for:'}
                    </span>
                    <ul className="space-y-1.5">
                      {activeGoal.suitableFor.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/85">
                          <Check className="w-3.5 h-3.5 text-[#82E16B] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Usually Contains */}
                  <div className="space-y-2 pt-3 border-t border-[#143224]">
                    <span className="text-xs font-bold text-[#82E16B] uppercase tracking-wider block">
                      {isAr ? 'يحتوي غالبًا على:' : 'Typically contains:'}
                    </span>
                    <ul className="space-y-1.5">
                      {activeGoal.usuallyContains.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white/85">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#82E16B] flex-shrink-0"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. إيه الفرق بينهم؟ مقارنة مختصرة جداً (احتياجك ➔ التصميم)                   */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-4 border-t border-[#143224]/80">
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-[#82E16B] tracking-wider uppercase block">
              // {isAr ? 'مقارنة سريعة' : 'QUICK MATRIX'}
            </span>
            <h3 
              className="text-2xl sm:text-3xl font-extrabold text-white"
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
            >
              {isAr ? 'إيه الفرق بينهم؟' : "What's the Difference?"}
            </h3>
          </div>

          {/* Clean Streamlined Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {comparisonItems.map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#0B1E16] border border-[#143224] hover:border-[#82E16B]/60 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-1">
                  <span className="text-[10px] text-white/40 block font-mono">
                    {isAr ? 'احتياجك:' : 'Your Need:'}
                  </span>
                  <h4 
                    className="text-sm sm:text-base font-bold text-white group-hover:text-[#82E16B] transition-colors"
                    style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit' }}
                  >
                    {item.need}
                  </h4>
                </div>

                <div className="pt-2 border-t border-[#143224] space-y-0.5">
                  <span className="text-[10px] text-[#82E16B] block font-mono font-bold">
                    ➔ {isAr ? 'التصميم' : 'Design'}:
                  </span>
                  <p 
                    className="text-sm font-extrabold text-white"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
                  >
                    {item.design}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. أمثلة من الواقع: سيناريوهات عملية حقيقية                                  */}
        {/* ========================================================================= */}
        <div className="space-y-5 pt-4 border-t border-[#143224]/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#82E16B] tracking-wider uppercase block">
                // {isAr ? 'سيناريوهات عملية' : 'REAL WORLD USE CASES'}
              </span>
              <h3 
                className="text-2xl sm:text-3xl font-extrabold text-white"
                style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
              >
                {isAr ? 'مثال من الواقع' : 'Real-World Scenarios'}
              </h3>
            </div>

            {/* Scenario Switcher Tabs */}
            <div className="flex items-center gap-2 bg-[#0B1E16] p-1.5 rounded-2xl border border-[#143224] select-none">
              <button
                onClick={() => setActiveScenario('phoneStore')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeScenario === 'phoneStore'
                    ? 'bg-[#82E16B] text-[#071610] shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
              >
                <Store className="w-4 h-4" />
                <span>{isAr ? 'محل صيانة هواتف' : 'Phone Repair Shop'}</span>
              </button>

              <button
                onClick={() => setActiveScenario('corporate')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeScenario === 'corporate'
                    ? 'bg-[#82E16B] text-[#071610] shadow-md'
                    : 'text-white/70 hover:text-white'
                }`}
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
              >
                <Briefcase className="w-4 h-4" />
                <span>{isAr ? 'شركة أو مؤسسة' : 'Company or Enterprise'}</span>
              </button>
            </div>
          </div>

          {/* Scenario Content Cards */}
          {activeScenario === 'phoneStore' ? (
            <div className="bg-[#0B1E16] border border-[#1A4031] rounded-3xl p-5 sm:p-7 space-y-5">
              <div className="flex items-center gap-3 border-b border-[#143224] pb-3">
                <div className="w-9 h-9 rounded-xl bg-[#82E16B]/15 text-[#82E16B] border border-[#82E16B]/30 flex items-center justify-center">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h4 
                    className="text-base sm:text-lg font-bold text-white"
                    style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit' }}
                  >
                    {isAr ? 'عندك محل صيانة هواتف جديد؟' : 'Have a new phone repair business?'}
                  </h4>
                  <p className="text-xs text-white/60">
                    {isAr ? 'نفس المحل ولكن الهدف يحدد نوع التصميم:' : 'Same business, but your goal dictates the exact format:'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-[#071610] border border-[#143224] hover:border-[#82E16B]/50 rounded-2xl p-4 space-y-2.5 transition-colors">
                  <span className="text-[10px] font-mono text-[#82E16B] px-2 py-0.5 rounded bg-[#0B1E16] border border-[#1A4031]">
                    {isAr ? 'الهدف: اتصال وتواصل' : 'GOAL: CONTACT'}
                  </span>
                  <p 
                    className="text-xs sm:text-sm text-white/80 leading-relaxed"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {isAr 
                      ? 'عايز العميل يحتفظ برقمك وبيانات المحل لوقت الطوارئ؟'
                      : 'Want the client to save your phone and shop address for future repairs?'}
                  </p>
                  <div className="pt-2 border-t border-[#143224] flex items-center gap-2">
                    <span className="text-[#82E16B] font-bold">➔</span>
                    <strong className="text-white text-xs sm:text-sm font-extrabold">{isAr ? 'كارت شخصي (Business Card)' : 'Business Card'}</strong>
                  </div>
                </div>

                <div className="bg-[#071610] border border-[#143224] hover:border-[#82E16B]/50 rounded-2xl p-4 space-y-2.5 transition-colors">
                  <span className="text-[10px] font-mono text-[#82E16B] px-2 py-0.5 rounded bg-[#0B1E16] border border-[#1A4031]">
                    {isAr ? 'الهدف: إعلان عرض' : 'GOAL: PROMOTION'}
                  </span>
                  <p 
                    className="text-xs sm:text-sm text-white/80 leading-relaxed"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {isAr 
                      ? 'عندك خصم على تغيير الشاشة وبطاريات الهواتف لفترة محدودة؟'
                      : 'Have an urgent 25% discount on screen or battery replacements?'}
                  </p>
                  <div className="pt-2 border-t border-[#143224] flex items-center gap-2">
                    <span className="text-[#82E16B] font-bold">➔</span>
                    <strong className="text-white text-xs sm:text-sm font-extrabold">{isAr ? 'فلاير إعلاني (Flyer)' : 'Promotional Flyer'}</strong>
                  </div>
                </div>

                <div className="bg-[#071610] border border-[#143224] hover:border-[#82E16B]/50 rounded-2xl p-4 space-y-2.5 transition-colors">
                  <span className="text-[10px] font-mono text-[#82E16B] px-2 py-0.5 rounded bg-[#0B1E16] border border-[#1A4031]">
                    {isAr ? 'الهدف: تفاصيل وأسعار' : 'GOAL: SERVICES & PRICES'}
                  </span>
                  <p 
                    className="text-xs sm:text-sm text-white/80 leading-relaxed"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {isAr 
                      ? 'عندك خدمات صيانة متعددة وتفاصيل أسعار وباقات وضمان؟'
                      : 'Have multiple repair tiers, parts pricing, and warranty details?'}
                  </p>
                  <div className="pt-2 border-t border-[#143224] flex items-center gap-2">
                    <span className="text-[#82E16B] font-bold">➔</span>
                    <strong className="text-white text-xs sm:text-sm font-extrabold">{isAr ? 'بروشور تعريفي (Brochure)' : 'Service Brochure'}</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0B1E16] border border-[#1A4031] rounded-3xl p-5 sm:p-7 space-y-5">
              <div className="flex items-center gap-3 border-b border-[#143224] pb-3">
                <div className="w-9 h-9 rounded-xl bg-[#82E16B]/15 text-[#82E16B] border border-[#82E16B]/30 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 
                    className="text-base sm:text-lg font-bold text-white"
                    style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit' }}
                  >
                    {isAr ? 'عندك شركة أو مؤسسة أعمال؟' : 'Running a commercial enterprise?'}
                  </h4>
                  <p className="text-xs text-white/60">
                    {isAr ? 'المطبوع المناسب لكل موقف تجاري واجتماع رسمي:' : 'Matching collateral to every business context:'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-[#071610] border border-[#143224] hover:border-[#82E16B]/50 rounded-2xl p-4 space-y-2.5 transition-colors">
                  <span className="text-[10px] font-mono text-[#82E16B] px-2 py-0.5 rounded bg-[#0B1E16] border border-[#1A4031]">
                    {isAr ? 'الهدف: تقديم متكامل' : 'GOAL: CREDENTIALS'}
                  </span>
                  <p 
                    className="text-xs sm:text-sm text-white/80 leading-relaxed"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {isAr 
                      ? 'إذا كنت تريد تقديم الشركة في اجتماع رسمي مع عميل لتوثيق أعمالكم:'
                      : 'If presenting your firm history, case studies, and team in a client meeting:'}
                  </p>
                  <div className="pt-2 border-t border-[#143224] flex items-center gap-2">
                    <span className="text-[#82E16B] font-bold">➔</span>
                    <strong className="text-white text-xs sm:text-sm font-extrabold">{isAr ? 'بروفايل شركة (Company Profile)' : 'Company Profile'}</strong>
                  </div>
                </div>

                <div className="bg-[#071610] border border-[#143224] hover:border-[#82E16B]/50 rounded-2xl p-4 space-y-2.5 transition-colors">
                  <span className="text-[10px] font-mono text-[#82E16B] px-2 py-0.5 rounded bg-[#0B1E16] border border-[#1A4031]">
                    {isAr ? 'الهدف: إعلان خدمة محددة' : 'GOAL: SPECIFIC OFFER'}
                  </span>
                  <p 
                    className="text-xs sm:text-sm text-white/80 leading-relaxed"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {isAr 
                      ? 'إذا كنت تريد الإعلان عن خدمة محددة جديدة للجمهور المستهدف:'
                      : 'If announcing a specific standalone business package or solution:'}
                  </p>
                  <div className="pt-2 border-t border-[#143224] flex items-center gap-2">
                    <span className="text-[#82E16B] font-bold">➔</span>
                    <strong className="text-white text-xs sm:text-sm font-extrabold">{isAr ? 'فلاير إعلاني (Flyer)' : 'Campaign Flyer'}</strong>
                  </div>
                </div>

                <div className="bg-[#071610] border border-[#143224] hover:border-[#82E16B]/50 rounded-2xl p-4 space-y-2.5 transition-colors">
                  <span className="text-[10px] font-mono text-[#82E16B] px-2 py-0.5 rounded bg-[#0B1E16] border border-[#1A4031]">
                    {isAr ? 'الهدف: جذب داخل المقر' : 'GOAL: ONSITE IMPACT'}
                  </span>
                  <p 
                    className="text-xs sm:text-sm text-white/80 leading-relaxed"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {isAr 
                      ? 'إذا كنت تريد إعلانًا يوضع داخل مقر الشركة أو في المعارض للفت الأنظار:'
                      : 'If placing an eye-catching poster inside the office lobby or exhibition booth:'}
                  </p>
                  <div className="pt-2 border-t border-[#143224] flex items-center gap-2">
                    <span className="text-[#82E16B] font-bold">➔</span>
                    <strong className="text-white text-xs sm:text-sm font-extrabold">{isAr ? 'بوستر إعلاني (Poster)' : 'Display Poster'}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 5. لمسات سريعة: 3 أسئلة قبل الطلب + أخطاء شائعة (Compact Cards)              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4 border-t border-[#143224]/80">
          
          {/* Card A: 3 Questions Before Ordering */}
          <div className="bg-[#0B1E16] border border-[#143224] rounded-3xl p-5 sm:p-6 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[#82E16B]">
                <HelpCircle className="w-5 h-5 flex-shrink-0" />
                <h4 
                  className="text-base sm:text-lg font-bold text-white"
                  style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit' }}
                >
                  {isAr ? 'قبل ما تطلب التصميم، اسأل نفسك 3 أسئلة' : '3 Questions to Ask Before Requesting Design'}
                </h4>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#071610] border border-[#143224]">
                  <span className="w-5 h-5 rounded-full bg-[#82E16B]/20 text-[#82E16B] text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                  <p className="text-xs sm:text-sm text-white/90 font-medium">
                    {isAr ? 'إيه الهدف الأساسي من التصميم؟' : 'What is the primary objective of this design?'}
                  </p>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#071610] border border-[#143224]">
                  <span className="w-5 h-5 rounded-full bg-[#82E16B]/20 text-[#82E16B] text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                  <p className="text-xs sm:text-sm text-white/90 font-medium">
                    {isAr ? 'مين الشخص اللي هيشوفه؟' : 'Who is the audience who will view it?'}
                  </p>
                </div>

                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#071610] border border-[#143224]">
                  <span className="w-5 h-5 rounded-full bg-[#82E16B]/20 text-[#82E16B] text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                  <p className="text-xs sm:text-sm text-white/90 font-medium">
                    {isAr ? 'إيه أهم معلومة عايز العميل يفتكرها أو يتصرف بناءً عليها؟' : 'What is the main takeaway you want them to act upon?'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#143224]">
              <p 
                className="text-xs text-white/70 italic leading-relaxed"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
              >
                {isAr 
                  ? '«التصميم الجيد مش مجرد شكل جميل. التصميم الناجح هو اللي يوصل الرسالة المناسبة للشخص المناسب بالطريقة المناسبة.»'
                  : '"Great design delivers the right message to the right person through the right medium."'}
              </p>
            </div>
          </div>

          {/* Card B: 4 Common Mistakes */}
          <div className="bg-[#0B1E16] border border-[#143224] rounded-3xl p-5 sm:p-6 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[#82E16B]">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <h4 
                  className="text-base sm:text-lg font-bold text-white"
                  style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit' }}
                >
                  {isAr ? 'أخطاء بنشوفها كتير' : 'Common Pitfalls to Avoid'}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-[#071610] border border-[#143224] space-y-0.5">
                  <span className="text-[10px] font-mono text-red-400 block font-bold">✕ {isAr ? 'تكدس المحتوى' : 'Clutter'}</span>
                  <p className="text-xs text-white/90 font-semibold">{isAr ? 'معلومات كثيرة بدون ترتيب' : 'Cluttered data without hierarchy'}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#071610] border border-[#143224] space-y-0.5">
                  <span className="text-[10px] font-mono text-red-400 block font-bold">✕ {isAr ? 'صعوبة القراءة' : 'Legibility'}</span>
                  <p className="text-xs text-white/90 font-semibold">{isAr ? 'خطوط صغيرة يصعب قراءتها' : 'Tiny, illegible typography'}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#071610] border border-[#143224] space-y-0.5">
                  <span className="text-[10px] font-mono text-red-400 block font-bold">✕ {isAr ? 'تشتيت بصري' : 'Distraction'}</span>
                  <p className="text-xs text-white/90 font-semibold">{isAr ? 'ألوان وعناصر كثيرة تشتت الانتباه' : 'Excessive colors that distract'}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#071610] border border-[#143224] space-y-0.5">
                  <span className="text-[10px] font-mono text-red-400 block font-bold">✕ {isAr ? 'غياب الوظيفة' : 'No Purpose'}</span>
                  <p className="text-xs text-white/90 font-semibold">{isAr ? 'تصميم جميل لكن بدون هدف واضح' : 'Pretty look with no clear goal'}</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#143224]">
              <p 
                className="text-xs text-[#82E16B] font-medium leading-relaxed"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
              >
                {isAr 
                  ? '«الهدف مش إننا نحط أكبر قدر من المعلومات، لكن إن أهم معلومة توصل للعميل بسهولة.»'
                  : '"The goal is never cramming maximum text, but ensuring your core message registers effortlessly."'}
              </p>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 6. الاختبار التفاعلي الذكي: مساعد اتخاذ القرار                                 */}
        {/* ========================================================================= */}
        <div className="bg-[#0B1E16] border border-[#1A4031] rounded-3xl p-6 sm:p-9 relative overflow-hidden space-y-7">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#82E16B]/5 rounded-br-full pointer-events-none"></div>

          {/* Assistant Header */}
          <div className="space-y-1.5 relative z-10 max-w-2xl">
            <span className="text-[11px] font-mono text-[#82E16B] tracking-wider uppercase block">
              // {isAr ? 'المساعد التفاعلي لاتخاذ القرار' : 'INTERACTIVE DECISION ASSISTANT'}
            </span>
            <h3 
              className="text-2xl sm:text-3xl font-extrabold text-white"
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
            >
              {isAr ? 'لسه مش عارف إيه المناسب ليك؟' : 'Still Wondering What Fits Best?'}
            </h3>
            <p 
              className="text-xs sm:text-sm text-white/70"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
            >
              {isAr 
                ? 'جاوب على 3 أسئلة بسيطة، وهتقدر تحدد نقطة البداية المناسبة لمشروعك.'
                : 'Answer 3 straightforward questions to pinpoint the most effective starting point.'}
            </p>
          </div>

          {/* 3 Questions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
            
            {/* Question 1: Core Goal */}
            <div className="space-y-2.5 bg-[#071610] p-4 sm:p-5 rounded-2xl border border-[#143224]">
              <span className="text-xs font-mono font-bold text-[#82E16B] block">
                01 // {isAr ? 'إيه هدفك الأساسي؟' : 'Primary Goal'}
              </span>
              <div className="space-y-2">
                {quizQuestions.goals.map((item) => {
                  const isChecked = quizAnswers.goal === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, goal: item.id }))}
                      className={`w-full text-start p-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer border ${
                        isChecked
                          ? 'bg-[#82E16B]/15 text-[#82E16B] border-[#82E16B]'
                          : 'bg-[#0B1E16] text-white/80 border-[#1A4031] hover:border-white/30'
                      }`}
                      style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                    >
                      <span>{item.label}</span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isChecked ? 'border-[#82E16B] bg-[#82E16B]' : 'border-white/30'
                      }`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-[#071610]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Desired Action (The core question requested by user) */}
            <div className="space-y-2.5 bg-[#071610] p-4 sm:p-5 rounded-2xl border border-[#143224]">
              <span className="text-xs font-mono font-bold text-[#82E16B] block">
                02 // {isAr ? 'عايز العميل يعمل إيه بعد ما يشوفه؟' : 'Desired Customer Action'}
              </span>
              <div className="space-y-2">
                {quizQuestions.actions.map((item) => {
                  const isChecked = quizAnswers.action === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, action: item.id }))}
                      className={`w-full text-start p-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer border ${
                        isChecked
                          ? 'bg-[#82E16B]/15 text-[#82E16B] border-[#82E16B]'
                          : 'bg-[#0B1E16] text-white/80 border-[#1A4031] hover:border-white/30'
                      }`}
                      style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                    >
                      <span>{item.label}</span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isChecked ? 'border-[#82E16B] bg-[#82E16B]' : 'border-white/30'
                      }`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-[#071610]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 3: Usage Place */}
            <div className="space-y-2.5 bg-[#071610] p-4 sm:p-5 rounded-2xl border border-[#143224]">
              <span className="text-xs font-mono font-bold text-[#82E16B] block">
                03 // {isAr ? 'هتستخدم التصميم فين؟' : 'Distribution Placement'}
              </span>
              <div className="space-y-2">
                {quizQuestions.places.map((item) => {
                  const isChecked = quizAnswers.place === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setQuizAnswers(prev => ({ ...prev, place: item.id }))}
                      className={`w-full text-start p-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer border ${
                        isChecked
                          ? 'bg-[#82E16B]/15 text-[#82E16B] border-[#82E16B]'
                          : 'bg-[#0B1E16] text-white/80 border-[#1A4031] hover:border-white/30'
                      }`}
                      style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                    >
                      <span>{item.label}</span>
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isChecked ? 'border-[#82E16B] bg-[#82E16B]' : 'border-white/30'
                      }`}>
                        {isChecked && <Check className="w-2.5 h-2.5 text-[#071610]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Dynamic Advisory Result Box with Explicit "لماذا؟" (Features 1 & 2 from user request) */}
          <div className="p-5 sm:p-7 rounded-2xl bg-[#071610] border border-[#82E16B]/40 space-y-4 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-2.5">
                <span className="text-[11px] font-mono text-[#82E16B] tracking-wider uppercase block">
                  // {isAr ? 'النتيجة والاستشارة المقترحة' : 'ADVISORY RECOMMENDATION'}
                </span>
                
                <h4 
                  className="text-lg sm:text-2xl font-bold text-white"
                  style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit' }}
                >
                  {isAr ? (
                    <>نقطة البداية المقترحة: قد يكون <span className="text-[#82E16B] font-black underline underline-offset-4 decoration-[#82E16B]/50">{currentRecommendation.type}</span> نقطة بداية مناسبة لاحتياجك.</>
                  ) : (
                    <>Suggested Starting Point: <span className="text-[#82E16B] font-black">{currentRecommendation.type}</span> looks like an ideal starting point.</>
                  )}
                </h4>

                {/* Explicit "لماذا؟" section requested by user */}
                <div className="space-y-1">
                  <p 
                    className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    <strong className="text-[#82E16B] font-bold">{isAr ? 'لماذا؟ ' : 'Why? '}</strong>
                    {currentRecommendation.why}
                  </p>

                  <p 
                    className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal"
                    style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
                  >
                    {currentRecommendation.complementaryTip}
                  </p>
                </div>
              </div>

              {/* Action Button: WhatsApp with pre-filled smart contextual message */}
              <div className="flex-shrink-0 pt-2 lg:pt-0">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#82E16B] hover:bg-[#9cf288] text-[#071610] font-black text-sm sm:text-base transition-all duration-300 shadow-[0_4px_20px_rgba(130,225,107,0.3)] hover:scale-105 active:scale-95 cursor-pointer no-underline w-full sm:w-auto"
                  style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
                >
                  <MessageSquare className="w-4 h-4 text-[#071610]" />
                  <span>{isAr ? 'تحدث معي عن مشروعك' : 'Discuss Your Project'}</span>
                  <ArrowLeft className={`w-4 h-4 ${isAr ? '' : 'rotate-180'}`} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 7. الخاتمة ودعوة اتخاذ الإجراء (Final Section CTA)                           */}
        {/* ========================================================================= */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0B1E16] via-[#102C20] to-[#0B1E16] border border-[#1A4031] text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-white"
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
            >
              {isAr ? 'مش متأكد من الاختيار؟' : 'Still Not Entirely Sure?'}
            </h3>

            <p 
              className="text-sm sm:text-base text-white/80 leading-relaxed"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
            >
              {isAr 
                ? 'احكي لنا عن نشاطك والهدف اللي عايز توصله، ونساعدك تحدد نوع التصميم المناسب قبل ما تبدأ.'
                : 'Tell us about your brand and what you aim to achieve, and we will help you pinpoint the ideal format before starting.'}
            </p>
          </div>

          <div>
            <a
              href={`https://wa.me/201067017778?text=${encodeURIComponent(
                isAr 
                  ? 'مرحبًا أحمد، اطلعت على دليل المطبوعات والتصميمات وأود استشارتك لتحديد نوع التصميم المناسب لمشروعي قبل البدء.' 
                  : 'Hello Ahmed, I reviewed your Print & Design Guide and would like your advice on the best format for my project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#82E16B] hover:bg-[#9cf288] text-[#071610] font-black text-base sm:text-lg transition-all duration-300 shadow-[0_4px_25px_rgba(130,225,107,0.35)] hover:shadow-[0_8px_35px_rgba(130,225,107,0.55)] hover:scale-105 active:scale-95 cursor-pointer no-underline"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", "29LT Kaff", sans-serif' : 'inherit' }}
            >
              <span>{isAr ? 'ابدأ الحديث عن مشروعك' : 'Start Talking About Your Project'}</span>
              <span className="text-xl font-bold">{isAr ? '←' : '→'}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
