import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Phone, MessageSquare, Printer, QrCode, ExternalLink, ArrowUp, Globe, CheckCircle } from 'lucide-react';

export const ContactFooter = ({ lang }) => {
  const isAr = lang === 'ar';
  const { author, contact, saudiReadiness } = portfolioData.meta;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrintCatalogue = () => {
    window.print();
  };

  return (
    <footer id="contact-footer" className="bg-ink-950 text-paper-100 border-t-2 border-ink-800 relative">
      
      {/* Registration Marks Strip on Bottom */}
      <div className="bg-ink-900 border-b border-ink-800 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-ink-400">
        <div className="flex items-center gap-3">
          <span className="text-print-orange font-bold">⌖ REGISTRATION ACCURACY</span>
          <span>•</span>
          <span className="hidden sm:inline">TOLERANCE: ±0.1mm</span>
          <span>•</span>
          <span className="hidden sm:inline">BLEED: 3.0mm CHECKED</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#00A3E0]" title="Cyan"></span>
            <span className="w-2 h-2 bg-[#E4007C]" title="Magenta"></span>
            <span className="w-2 h-2 bg-[#FFD100]" title="Yellow"></span>
            <span className="w-2 h-2 bg-[#121212] border border-ink-600" title="Black"></span>
            <span className="w-2 h-2 bg-[#C5A059]" title="Gold"></span>
          </div>
          <span className="text-[10px] text-ink-400 font-mono">100% CMYK READY</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Author & Production Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-print-orange/20 text-print-orange font-mono text-xs font-bold uppercase">
                <span>// CONNECT FOR PRODUCTION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {author[lang]}
              </h2>
              <p className="text-base text-ink-300 font-medium">
                {portfolioData.meta.title[lang]}
              </p>
            </div>

            <p className="text-sm text-ink-400 leading-relaxed max-w-lg">
              {isAr ? (
                <>
                  جاهز لتقديم إضافة نوعية لمطبعتك أو مصنعك في المملكة العربية السعودية: تصميم يبهر العميل، ويخرج من الماكينات دون تأخير أو أخطاء تقنية في خامات الورق والتشطيب.
                </>
              ) : (
                <>
                  Ready to deliver measurable value to your commercial printing press or packaging plant in Saudi Arabia: creative design that wows clients, engineered to pass effortlessly through prepress and finishing lines.
                </>
              )}
            </p>

            {/* Quick Contact Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/201067017778?text=${encodeURIComponent(isAr ? 'مرحباً أحمد، اطلعت على كتالوجك الإنتاجي وأود التواصل معك.' : 'Hello Ahmed, I reviewed your production catalogue and would like to connect.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-mono font-bold transition shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isAr ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp Chat'}</span>
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink-900 hover:bg-ink-800 text-paper-100 border border-ink-700 rounded-lg text-xs font-mono font-semibold transition"
              >
                <Mail className="w-4 h-4 text-print-orange" />
                <span>{contact.email}</span>
              </a>

              <button
                onClick={handlePrintCatalogue}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink-900 hover:bg-ink-800 text-paper-100 border border-ink-700 rounded-lg text-xs font-mono font-semibold transition"
                title="طباعة أو حفظ نسخة PDF"
              >
                <Printer className="w-4 h-4 text-print-cyan" />
                <span>{isAr ? 'طباعة / حفظ PDF' : 'Print / Export PDF'}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Digital QR Code & Mobile Fast Connect */}
          <div className="lg:col-span-3 bg-ink-900 border border-ink-800 p-6 rounded-2xl text-center space-y-4">
            <div className="font-mono text-xs font-bold text-print-orange uppercase tracking-wider">
              {isAr ? '// مسح الرمز السريع (QR CODE)' : '// QUICK SCAN QR CODE'}
            </div>

            {/* Crisp Simulated Vector QR Code */}
            <div className="inline-block p-4 bg-white rounded-xl shadow-lg">
              <svg viewBox="0 0 120 120" className="w-32 h-32">
                {/* Outer finder patterns */}
                <rect x="10" y="10" width="30" height="30" fill="#0B0F17" rx="4" />
                <rect x="16" y="16" width="18" height="18" fill="#FFFFFF" rx="2" />
                <rect x="20" y="20" width="10" height="10" fill="#FF4800" rx="1" />

                <rect x="80" y="10" width="30" height="30" fill="#0B0F17" rx="4" />
                <rect x="86" y="16" width="18" height="18" fill="#FFFFFF" rx="2" />
                <rect x="90" y="20" width="10" height="10" fill="#FF4800" rx="1" />

                <rect x="10" y="80" width="30" height="30" fill="#0B0F17" rx="4" />
                <rect x="16" y="86" width="18" height="18" fill="#FFFFFF" rx="2" />
                <rect x="20" y="90" width="10" height="10" fill="#FF4800" rx="1" />

                {/* Random aesthetic QR grid elements */}
                <rect x="48" y="12" width="6" height="6" fill="#0B0F17" />
                <rect x="58" y="18" width="6" height="6" fill="#0B0F17" />
                <rect x="68" y="12" width="6" height="6" fill="#0B0F17" />
                <rect x="48" y="30" width="6" height="6" fill="#0B0F17" />
                <rect x="62" y="32" width="8" height="8" fill="#00A3E0" />

                <rect x="12" y="48" width="6" height="6" fill="#0B0F17" />
                <rect x="24" y="58" width="8" height="6" fill="#0B0F17" />
                <rect x="36" y="48" width="6" height="6" fill="#0B0F17" />
                <rect x="48" y="48" width="24" height="24" fill="#0B0F17" rx="2" />
                <rect x="54" y="54" width="12" height="12" fill="#FFFFFF" rx="1" />
                <rect x="58" y="58" width="4" height="4" fill="#FF4800" />

                <rect x="80" y="48" width="6" height="6" fill="#0B0F17" />
                <rect x="94" y="54" width="8" height="6" fill="#0B0F17" />
                <rect x="84" y="68" width="12" height="6" fill="#0B0F17" />

                <rect x="48" y="84" width="6" height="6" fill="#0B0F17" />
                <rect x="60" y="94" width="8" height="6" fill="#0B0F17" />
                <rect x="76" y="84" width="6" height="18" fill="#0B0F17" />
                <rect x="90" y="90" width="14" height="6" fill="#0B0F17" />
              </svg>
            </div>

            <p className="text-[11px] font-mono text-ink-400">
              {isAr ? 'امسح الرمز بالجوال للتواصل المباشر' : 'Scan with mobile camera to chat'}
            </p>
          </div>

          {/* Column 3: Quick Navigation & Technical Metadata */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs">
            <div className="font-bold text-white uppercase tracking-wider border-b border-ink-800 pb-2">
              // {isAr ? 'بيانات الوثيقة' : 'DOCUMENT METRICS'}
            </div>

            <div className="space-y-2 text-ink-400">
              <div className="flex justify-between">
                <span>VERSION:</span>
                <span className="text-white">2.5 PRODUCTION</span>
              </div>
              <div className="flex justify-between">
                <span>ORIENTATION:</span>
                <span className="text-white">BILINGUAL (AR/EN)</span>
              </div>
              <div className="flex justify-between">
                <span>AVAILABILITY:</span>
                <span className="text-emerald-400 font-bold">IMMEDIATE (KSA)</span>
              </div>
              <div className="flex justify-between">
                <span>TARGET:</span>
                <span className="text-white">OFFSET / PACKAGING</span>
              </div>
            </div>

            <div className="pt-4 border-t border-ink-800">
              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-center gap-2 py-2 rounded bg-ink-900 hover:bg-ink-800 border border-ink-700 text-paper-100 transition text-xs"
              >
                <ArrowUp className="w-3.5 h-3.5 text-print-orange" />
                <span>{isAr ? 'العودة لأعلى الصفحة' : 'Back to Top'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-ink-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-500">
          <div>
            © {new Date().getFullYear()} {author[lang]}. {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4">
            <span>DESIGN → PREPRESS → PRODUCTION</span>
            <span>•</span>
            <span className="text-print-orange font-bold">RIYADH / JEDDAH / EASTERN</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
