import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquare, Check, Sparkles, Box, Printer, Megaphone, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { AlkutshLogo } from './AlkutshLogo';

export const EditorialBriefModal = ({ lang, onClose }) => {
  const isAr = lang === 'ar';

  const [formData, setFormData] = useState({
    clientName: '',
    companyName: '',
    contactInfo: '',
    selectedServices: ['branding'],
    projectDetails: '',
    timeline: 'normal', // rush, normal, flexible
    budget: 'medium'
  });

  const [isCopied, setIsCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const serviceOptions = [
    { id: 'branding', icon: Sparkles, ar: 'هوية بصرية وشعار', en: 'Brand Identity & Logo' },
    { id: 'packaging', icon: Box, ar: 'تصميم علب وتغليف CAD', en: 'Packaging & Dielines' },
    { id: 'prepress', icon: Printer, ar: 'تجهيز مطبوعات وفرز ألوان', en: 'Prepress & Print Production' },
    { id: 'campaigns', icon: Megaphone, ar: 'حملات إعلانية وسوشيال', en: 'Advertising & Campaigns' }
  ];

  const toggleService = (id) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(id);
      const next = exists 
        ? prev.selectedServices.filter((s) => s !== id)
        : [...prev.selectedServices, id];
      return { ...prev, selectedServices: next.length ? next : [id] };
    });
  };

  const generateWhatsAppMessage = () => {
    const serviceNames = formData.selectedServices
      .map((sId) => serviceOptions.find((o) => o.id === sId)?.[isAr ? 'ar' : 'en'])
      .filter(Boolean)
      .join('، ');

    if (isAr) {
      return `مرحباً أحمد ماهر (الكوتش ديزاين)،
أود مشاركة موجز مشروعي الإبداعي (Creative Brief) معك:

• اسم العميل: ${formData.clientName || 'غير محدد'}
• الشركة / البراند: ${formData.companyName || 'مشروع جديد'}
• رقم التواصل: ${formData.contactInfo || 'عبر الواتساب'}
• الخدمات المطلوبة: ${serviceNames}
• الجدولة: ${formData.timeline === 'rush' ? 'عاجل جداً' : formData.timeline === 'flexible' ? 'مرن' : 'متوسط (خلال أسابيع)'}
• تفاصيل الفكرة:
${formData.projectDetails || 'أود مناقشة تفاصيل الفكرة معك في محادثة مباشرة.'}

بانتظار ردك لمناقشة الخطوات القادمة.`;
    } else {
      return `Hello Ahmed Maher (Alkutsh Design),
I would like to share our project creative brief with you:

• Client Name: ${formData.clientName || 'Not specified'}
• Company / Brand: ${formData.companyName || 'New Project'}
• Contact: ${formData.contactInfo || 'Via WhatsApp'}
• Requested Services: ${serviceNames}
• Timeline: ${formData.timeline}
• Project Scope:
${formData.projectDetails || 'Looking forward to discussing the project scope directly.'}

Awaiting your feedback.`;
    }
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/201067017778?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = () => {
    const text = generateWhatsAppMessage();
    const subject = encodeURIComponent(
      isAr 
        ? `طلب بريف مشروع جديد - ${formData.companyName || formData.clientName || 'عميل جديد'}`
        : `Project Creative Brief - ${formData.companyName || formData.clientName || 'New Client'}`
    );
    const body = encodeURIComponent(text);
    window.location.href = `mailto:alkutsh43@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn select-none"
      onClick={onClose}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#091E15] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'Inter, sans-serif' }}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#82E16B] to-transparent"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#82E16B]/5 blur-3xl pointer-events-none rounded-full"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#82E16B]/15 border border-[#82E16B]/30 flex items-center justify-center text-[#82E16B]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-[#82E16B] uppercase tracking-wider block">
                // {isAr ? 'استمارة البريف الإبداعي' : 'PROJECT CREATIVE BRIEF'}
              </span>
              <h3 
                className="text-xl sm:text-2xl font-black text-white"
                style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"29LT Kaff", sans-serif' }}
              >
                {isAr ? 'شاركنا تفاصيل مشروعك القادم' : 'Tell Us About Your Next Project'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all cursor-pointer"
            aria-label="Close brief modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendWhatsApp} className="space-y-6">
          
          {/* Row 1: Name & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/80 block">
                {isAr ? 'الاسم الكريم' : 'Your Name'} <span className="text-[#82E16B]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={isAr ? 'مثال: أ. محمد العتيبي' : 'e.g. John Doe'}
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-[#82E16B] focus:ring-1 focus:ring-[#82E16B] text-white text-sm outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/80 block">
                {isAr ? 'اسم الشركة أو العلامة التجارية' : 'Company or Brand Name'}
              </label>
              <input
                type="text"
                placeholder={isAr ? 'مثال: شركة نبراس للأغذية' : 'e.g. Acme Corp'}
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-[#82E16B] focus:ring-1 focus:ring-[#82E16B] text-white text-sm outline-none transition"
              />
            </div>
          </div>

          {/* Row 2: Contact Info */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/80 block">
              {isAr ? 'رقم الواتساب أو البريد الإلكتروني للتواصل' : 'WhatsApp Number or Email'}
            </label>
            <input
              type="text"
              placeholder={isAr ? '010xxxxxxx أو email@example.com' : '+20... or email@company.com'}
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-[#82E16B] focus:ring-1 focus:ring-[#82E16B] text-white text-sm outline-none transition"
            />
          </div>

          {/* Row 3: Services Needed (Interactive Multi-Select) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/80 block">
              {isAr ? 'الخدمات والتطبيقات المطلوبة (حدد ما يناسبك):' : 'Required Disciplines (Select all that apply):'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {serviceOptions.map((opt) => {
                const isSelected = formData.selectedServices.includes(opt.id);
                const Icon = opt.icon;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => toggleService(opt.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#82E16B]/15 border-[#82E16B] text-white shadow-sm'
                        : 'bg-black/30 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-[#82E16B]' : 'text-white/40'}`} />
                      <span>{opt[isAr ? 'ar' : 'en']}</span>
                    </div>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[#82E16B] flex items-center justify-center text-[#071610]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Project Scope / Details */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-white/80 block">
              {isAr ? 'نبذة عن فكرة المشروع وأهدافه' : 'Project Scope & Brief Notes'}
            </label>
            <textarea
              rows={3}
              placeholder={isAr 
                ? 'اكتب هنا ما تتطلع إليه (مثلاً: تصميم علبة فاخرة لمنتج جديد، أو تجديد هوية كاملة للشركة)...'
                : 'Briefly describe your goals, products, or design preferences...'}
              value={formData.projectDetails}
              onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 focus:border-[#82E16B] focus:ring-1 focus:ring-[#82E16B] text-white text-sm outline-none transition resize-none leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#82E16B] hover:bg-[#96f481] text-[#071610] font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(130,225,107,0.4)] transition-all transform hover:scale-[1.02] cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{isAr ? 'إرسال البريف عبر واتساب مباشرة' : 'Send Brief via WhatsApp'}</span>
            </button>

            <button
              type="button"
              onClick={handleSendEmail}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#82E16B]" />
              <span>{isAr ? 'إرسال بالبريد' : 'Email'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
