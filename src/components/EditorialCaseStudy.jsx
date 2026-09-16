import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft, MessageSquare, Maximize2, Sparkles, Target, Layers } from 'lucide-react';
import { AlkutshLogo } from './AlkutshLogo';

export const EditorialCaseStudy = ({ project, lang, onClose }) => {
  const isAr = lang === 'ar';

  // Support multi-design browsing within the modal
  const designsList = (project.designs && project.designs.length > 0) 
    ? project.designs 
    : [project];

  const [activeIdx, setActiveIdx] = useState(
    typeof project.initialIndex === 'number' ? project.initialIndex : 0
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Get current active design
  const currentDesign = designsList[activeIdx] || designsList[0] || project;

  // Sync back to parent stage if callback provided
  const handleSelectIdx = (idx) => {
    setActiveIdx(idx);
    if (project.onIndexChange) {
      project.onIndexChange(idx);
    }
  };

  const handleNext = () => {
    if (designsList.length <= 1) return;
    handleSelectIdx((activeIdx + 1) % designsList.length);
  };

  const handlePrev = () => {
    if (designsList.length <= 1) return;
    handleSelectIdx((activeIdx - 1 + designsList.length) % designsList.length);
  };

  // Keyboard navigation (Esc to close, Arrows to flip)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        if (isAr) handlePrev();
        else handleNext();
      } else if (e.key === 'ArrowLeft') {
        if (isAr) handleNext();
        else handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIdx, isLightboxOpen, onClose, isAr, designsList.length]);

  // Interactive Pointer & Touch Drag Physics inside the modal
  const [modalDragOffset, setModalDragOffset] = useState(0);
  const [isModalDragging, setIsModalDragging] = useState(false);
  const modalDragStartRef = useRef({ x: 0, y: 0, time: 0, isHorizontal: null });
  const modalHasDraggedFarRef = useRef(false);

  const handleModalPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    modalDragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
      isHorizontal: null,
    };
    modalHasDraggedFarRef.current = false;
    setIsModalDragging(true);
    setModalDragOffset(0);
  };

  const handleModalPointerMove = (e) => {
    if (!modalDragStartRef.current || !isModalDragging) return;
    const dx = e.clientX - modalDragStartRef.current.x;
    const dy = e.clientY - modalDragStartRef.current.y;

    if (modalDragStartRef.current.isHorizontal === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        modalDragStartRef.current.isHorizontal = Math.abs(dx) >= Math.abs(dy);
      }
    }

    if (modalDragStartRef.current.isHorizontal) {
      if (Math.abs(dx) > 10) modalHasDraggedFarRef.current = true;
      setModalDragOffset(dx);
    }
  };

  const handleModalPointerUp = (e) => {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    setIsModalDragging(false);
    const offset = modalDragOffset;
    setModalDragOffset(0);

    if (offset < -50) {
      handleNext();
    } else if (offset > 50) {
      handlePrev();
    }
  };

  if (!project) return null;

  // Resolve localized text fields
  const clientName = project.clientName?.[lang] || project.clientName?.ar 
    || (typeof project.client === 'object' ? (project.client?.[lang] || project.client?.ar) : project.client) 
    || (isAr ? 'عميل سابق' : 'Previous Client');

  const clientShortName = project.clientShortName?.[lang] || project.clientShortName?.ar || clientName;
  const clientLogo = project.clientLogo || project.client?.logoUrl || null;
  const clientYear = currentDesign.year || project.year || '2025';

  const clientRequest = project.clientRequest?.[lang] || project.clientRequest?.ar 
    || project.client?.clientRequest?.[lang] || project.client?.clientRequest?.ar 
    || (isAr ? 'بناء حملة وهوية بصرية متكاملة تعكس التميز والاحترافية بأعلى معايير الإنتاج.' : 'Comprehensive creative campaign and visual identity engineered to the highest production standards.');

  const designTitle = currentDesign.title?.[lang] || currentDesign.title?.ar 
    || currentDesign.title 
    || (isAr ? 'تصميم حصري' : 'Selected Artwork');

  const designConcept = currentDesign.concept?.[lang] || currentDesign.concept?.ar 
    || currentDesign.story?.[lang] || currentDesign.story?.ar 
    || currentDesign.leadText?.[lang] 
    || (isAr ? 'اعتمدت الفكرة على معالجة بصرية راقية توازن بين الجاذبية الإبداعية والدقة التقنية في تنفيذ الخامات وتوزيع المساحات.' : 'The creative concept is anchored on refined aesthetic balance and technical precision in execution.');

  const designImage = currentDesign.image || currentDesign.heroImage || project.heroImage || '';

  // Resolve Category Label
  const getCategoryLabel = () => {
    const key = currentDesign.categoryKey;
    if (key === 'social') return isAr ? 'سوشيال ميديا وإعلانات' : 'Social Media & Campaigns';
    if (key === 'print') return isAr ? 'مطبوعات وتغليف هندسي' : 'Print & Structural Packaging';
    if (key === 'branding') return isAr ? 'هوية بصرية وشعارات' : 'Visual Identity & Branding';
    if (currentDesign.category) return currentDesign.category[lang] || currentDesign.category.ar;
    if (project.clientCategory) return project.clientCategory[lang] || project.clientCategory.ar;
    return isAr ? 'أعمال مختارة' : 'Selected Work';
  };

  const whatsappMessage = encodeURIComponent(
    isAr 
      ? `مرحباً أحمد، اطلعت على تفاصيل عمل: "${designTitle}" للعميل (${clientShortName}) وأود مناقشة تفاصيل تنفيذ مشروع مشابه.`
      : `Hello Ahmed, I reviewed your work: "${designTitle}" for (${clientShortName}) and would like to discuss a similar project.`
  );

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#071610] text-white selection:bg-[#82E16B] selection:text-[#071610]"
      role="dialog"
      aria-modal="true"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Subtle Background Glows */}
      <div className="fixed top-1/4 -right-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-10 -left-40 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* ======================================================== */}
      {/* 1. STICKY TOP NAVIGATION BAR (Mobile-Optimized & Compact) */}
      {/* ======================================================== */}
      <div className="sticky top-0 z-40 bg-[#0A1D15]/95 backdrop-blur-md border-b border-[#1A4031] px-3.5 sm:px-8 lg:px-12 py-2.5 sm:py-4 flex items-center justify-between shadow-2xl">
        
        {/* Brand Monogram & Client Identity */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <AlkutshLogo className="h-6 sm:h-8 flex-shrink-0" light={true} />
          
          <div className="h-4 sm:h-5 w-px bg-[#1A4031]"></div>
          
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {clientLogo && (
              <img 
                src={clientLogo} 
                alt={clientShortName} 
                className="h-4 sm:h-6 w-auto max-w-[60px] sm:max-w-[80px] object-contain hidden md:inline-block"
              />
            )}
            <span 
              className="text-xs sm:text-base font-extrabold text-white truncate max-w-[110px] xs:max-w-[150px] sm:max-w-none"
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit' }}
            >
              {clientShortName}
            </span>
            <span className="text-[#1A4031] hidden xs:inline">•</span>
            <span className="text-[10px] sm:text-xs font-mono text-[#82E16B] font-bold hidden xs:inline">
              {clientYear}
            </span>
          </div>
        </div>

        {/* Counter & Navigation Controls & Close Button */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Quick Counter Badge */}
          {designsList.length > 1 && (
            <div className="flex items-center gap-1 bg-[#06160F] border border-[#1A4031] rounded-full p-0.5 sm:p-1 text-xs font-mono">
              <button
                onClick={handlePrev}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[#82E16B] hover:bg-[#82E16B] hover:text-[#071610] transition-colors cursor-pointer"
                title={isAr ? 'التصميم السابق' : 'Previous Design'}
              >
                <span className="text-[11px] sm:text-xs font-bold">{isAr ? '➔' : '⬅'}</span>
              </button>

              <span className="px-1.5 sm:px-2 font-bold text-white text-[10px] sm:text-[11px]">
                {activeIdx + 1}/{designsList.length}
              </span>

              <button
                onClick={handleNext}
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[#82E16B] hover:bg-[#82E16B] hover:text-[#071610] transition-colors cursor-pointer"
                title={isAr ? 'التصميم التالي' : 'Next Design'}
              >
                <span className="text-[11px] sm:text-xs font-bold">{isAr ? '⬅' : '➔'}</span>
              </button>
            </div>
          )}

          {/* Close Action Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-[#122E22] hover:bg-[#82E16B] hover:text-[#071610] p-2 sm:px-4 sm:py-2 rounded-xl border border-[#2D6A4F] hover:border-[#82E16B] transition-all duration-300 shadow-md cursor-pointer"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
            title={isAr ? 'إغلاق والعودة (Esc)' : 'Close (Esc)'}
            aria-label="Close"
          >
            <span className="hidden sm:inline">{isAr ? 'إغلاق' : 'Close'}</span>
            <X className="w-4 h-4 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN CASE STUDY CONTENT CONTAINER                     */}
      {/* ======================================================== */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-12 space-y-6 sm:space-y-12">
        
        {/* Top Header: Category Tag & Artwork Title */}
        <header className="space-y-2 sm:space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E2C1E] border border-[#82E16B]/40 text-[#82E16B] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#82E16B] animate-pulse"></span>
            <span style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}>
              {getCategoryLabel()}
            </span>
          </div>

          <h1 
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-snug sm:leading-[1.25] tracking-tight drop-shadow-md"
            style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
          >
            {designTitle}
          </h1>
        </header>

        {/* Two-Column Grid: Visual Artwork (Left) & Comprehensive Story (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
          
          {/* ======================================================== */}
          {/* COLUMN 1: Visual Artwork Card with Zoom & Swipe         */}
          {/* NOTE: lg:sticky only so it NEVER blocks mobile scrolling!*/}
          {/* ======================================================== */}
          <div className="lg:col-span-6 flex flex-col items-center space-y-3 sm:space-y-4 static lg:sticky lg:top-24 w-full">
            
            <div 
              className={`w-full max-w-[480px] lg:max-w-none aspect-[4/5] sm:aspect-square lg:aspect-[4/5] max-h-[62vh] lg:max-h-none rounded-[22px] sm:rounded-[32px] overflow-hidden relative shadow-2xl border-2 border-[#1A4031] bg-[#0A1D15] group select-none ${
                isModalDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onClick={() => {
                if (!modalHasDraggedFarRef.current) {
                  setIsLightboxOpen(true);
                }
              }}
              onPointerDown={handleModalPointerDown}
              onPointerMove={handleModalPointerMove}
              onPointerUp={handleModalPointerUp}
              onPointerCancel={handleModalPointerUp}
              style={{
                touchAction: 'pan-y',
                transform: isModalDragging
                  ? `translateX(${modalDragOffset * 0.75}px) rotate(${modalDragOffset * 0.02}deg)`
                  : 'none',
                transition: isModalDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <img
                src={designImage}
                alt={designTitle}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 select-none"
                loading="eager"
              />

              {/* Hover Zoom Prompt Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="px-3.5 py-2 rounded-full bg-black/80 backdrop-blur-md border border-[#82E16B] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 className="w-3.5 h-3.5 text-[#82E16B]" />
                  <span style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}>
                    {isAr ? 'اضغط لتكبير الصورة بدقة كاملة' : 'Click to expand full screen'}
                  </span>
                </span>
              </div>

              {/* Floating Side Arrows on Image */}
              {designsList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute start-2 sm:start-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[#82E16B] hover:text-white hover:bg-black flex items-center justify-center transition-all shadow-2xl active:scale-90 cursor-pointer"
                    aria-label="Previous Design"
                  >
                    <span className="text-base sm:text-lg font-black">{isAr ? '➔' : '⬅'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute end-2 sm:end-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[#82E16B] hover:text-white hover:bg-black flex items-center justify-center transition-all shadow-2xl active:scale-90 cursor-pointer"
                    aria-label="Next Design"
                  >
                    <span className="text-base sm:text-lg font-black">{isAr ? '⬅' : '➔'}</span>
                  </button>
                </>
              )}

              {/* Counter Badge */}
              <div className="absolute top-3 end-3 sm:top-4 sm:end-4 z-20 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-mono font-bold text-white shadow-xl pointer-events-none">
                <span className="text-[#82E16B]">{activeIdx + 1}</span>
                <span className="text-white/40 mx-1">/</span>
                <span>{designsList.length}</span>
              </div>
            </div>

            {/* Helper Text below Image */}
            <p 
              className="text-[11px] sm:text-sm text-white/50 text-center flex items-center gap-1.5"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
            >
              <span>{isAr ? '💡 انقر على الصورة لتكبيرها، أو اسحب بإصبعك للتقليب بين التصاميم.' : '💡 Tap image to zoom, or swipe horizontally to flip designs.'}</span>
            </p>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: Client Request, Creative Story & Tech Specs   */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-8 w-full">
            
            {/* BOX 1: طلب العميل (Client Request) */}
            <div className="rounded-[20px] sm:rounded-[28px] bg-[#0A1D15]/90 border border-[#1A4031] p-4 sm:p-7 space-y-3 sm:space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 sm:gap-3 border-b border-[#1A4031]/80 pb-2.5 sm:pb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#122E22] flex items-center justify-center text-[#82E16B] border border-[#2D6A4F] flex-shrink-0">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-3xl font-extrabold text-white"
                  style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                >
                  {isAr ? 'طـلـب الـعـمـيـل (The Brief)' : 'CLIENT REQUEST'}
                </h2>
              </div>

              <p 
                className="text-sm sm:text-lg lg:text-[1.15rem] text-[#E2F5E8] leading-[1.8] sm:leading-[1.9] font-normal"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
              >
                {clientRequest}
              </p>
            </div>

            {/* BOX 2: الفكرة وقصة التصميم (Design Concept & Story) */}
            <div className="rounded-[20px] sm:rounded-[28px] bg-[#0A1D15]/90 border border-[#1A4031] p-4 sm:p-7 space-y-3 sm:space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 sm:gap-3 border-b border-[#1A4031]/80 pb-2.5 sm:pb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#122E22] flex items-center justify-center text-[#82E16B] border border-[#2D6A4F] flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 
                  className="text-xl sm:text-3xl font-extrabold text-white"
                  style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                >
                  {isAr ? 'الـفـكـرة الـتـصـمـيـمـيـة وقـصـة الـعـمـل' : 'DESIGN CONCEPT & STORY'}
                </h2>
              </div>

              <p 
                className="text-sm sm:text-lg lg:text-[1.15rem] text-[#E2F5E8] leading-[1.8] sm:leading-[1.9] font-normal"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
              >
                {designConcept}
              </p>
            </div>

            {/* BOX 3: المواصفات الفنية والإنتاجية (Production Specifications) */}
            <div className="rounded-[20px] sm:rounded-[28px] bg-[#06160F] border border-[#1A4031] p-4 sm:p-7 space-y-4 sm:space-y-5 shadow-xl">
              <div className="flex items-center gap-2.5 sm:gap-3 border-b border-[#1A4031]/80 pb-2.5 sm:pb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#122E22] flex items-center justify-center text-[#82E16B] border border-[#2D6A4F] flex-shrink-0">
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 
                  className="text-lg sm:text-2xl font-extrabold text-white"
                  style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : 'inherit' }}
                >
                  {isAr ? 'المواصفات الفنية والإنتاجية' : 'TECHNICAL SPECIFICATIONS'}
                </h3>
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 text-xs font-mono">
                <div className="bg-[#0A1D15] p-3 sm:p-3.5 rounded-xl border border-[#1A4031]">
                  <span className="text-[#82E16B] block text-[10px] sm:text-[11px] uppercase tracking-wider font-bold mb-1">
                    {isAr ? 'مجال التطبيق' : 'APPLICATION'}
                  </span>
                  <span className="text-white font-bold text-xs sm:text-sm">
                    {getCategoryLabel()}
                  </span>
                </div>

                <div className="bg-[#0A1D15] p-3 sm:p-3.5 rounded-xl border border-[#1A4031]">
                  <span className="text-[#82E16B] block text-[10px] sm:text-[11px] uppercase tracking-wider font-bold mb-1">
                    {isAr ? 'برامج التنفيذ' : 'SOFTWARE SUITE'}
                  </span>
                  <span className="text-white font-bold text-xs sm:text-sm">
                    Adobe Illustrator / Photoshop
                  </span>
                </div>

                <div className="bg-[#0A1D15] p-3 sm:p-3.5 rounded-xl border border-[#1A4031]">
                  <span className="text-[#82E16B] block text-[10px] sm:text-[11px] uppercase tracking-wider font-bold mb-1">
                    {isAr ? 'نظام الألوان والدقة' : 'COLOR & RESOLUTION'}
                  </span>
                  <span className="text-white font-bold text-xs sm:text-sm">
                    CMYK / RGB • 300 DPI High-Res
                  </span>
                </div>

                <div className="bg-[#0A1D15] p-3 sm:p-3.5 rounded-xl border border-[#1A4031]">
                  <span className="text-[#82E16B] block text-[10px] sm:text-[11px] uppercase tracking-wider font-bold mb-1">
                    {isAr ? 'جاهزية التصنيع' : 'PRODUCTION AUDIT'}
                  </span>
                  <span className="text-white font-bold text-xs sm:text-sm">
                    {isAr ? 'مفروز وجاهز للطباعة والقص' : 'Press-Ready & Die-Cut Verified'}
                  </span>
                </div>
              </div>
            </div>

            {/* BOX 4: Direct WhatsApp Action Button */}
            <div className="pt-1 sm:pt-2">
              <a
                href={`https://wa.me/201067017778?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 bg-[#82E16B] hover:bg-[#6ed355] text-[#071610] rounded-2xl font-extrabold text-sm sm:text-lg transition-all duration-300 shadow-2xl hover:scale-[1.02] cursor-pointer text-center"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{isAr ? 'ناقش هذا المشروع مع أحمد ماهر عبر واتساب' : 'Discuss This Project on WhatsApp'}</span>
              </a>
            </div>

          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. BOTTOM ACTIONS BAR (Mobile-Friendly Flexbox)           */}
        {/* ======================================================== */}
        <div className="pt-6 sm:pt-10 border-t border-[#1A4031] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          
          {/* Quick Design Switcher Buttons on Mobile */}
          {designsList.length > 1 && (
            <div className="flex items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrev}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-full border border-white/20 hover:border-[#82E16B] bg-[#0E2C1E] text-white hover:text-[#82E16B] text-xs sm:text-sm font-bold transition cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
              >
                <span>{isAr ? '➔' : '⬅'}</span>
                <span>{isAr ? 'العمل السابق' : 'Previous'}</span>
              </button>

              <button
                onClick={handleNext}
                className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-full border border-white/20 hover:border-[#82E16B] bg-[#0E2C1E] text-white hover:text-[#82E16B] text-xs sm:text-sm font-bold transition cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
              >
                <span>{isAr ? 'العمل التالي' : 'Next'}</span>
                <span>{isAr ? '⬅' : '➔'}</span>
              </button>
            </div>
          )}

          {/* Back to All Works */}
          <button
            onClick={onClose}
            className="w-full sm:w-auto text-center py-2 sm:py-0 inline-flex items-center justify-center gap-2 text-sm sm:text-base font-bold text-[#82E16B] hover:text-white transition-colors cursor-pointer"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
          >
            <span>{isAr ? '← العودة لكافة الأعمال السابقة' : '← Back to all previous works'}</span>
          </button>
        </div>

      </main>

      {/* ======================================================== */}
      {/* 4. FULL-SCREEN LIGHTBOX OVERLAY (On Image Click)          */}
      {/* ======================================================== */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-8 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 end-4 sm:top-6 sm:end-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={isAr ? 'إغلاق العرض المكبر' : 'Close Zoom'}
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div 
            className="max-w-5xl max-h-[85vh] sm:max-h-[90vh] flex items-center justify-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={designImage}
              alt={designTitle}
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] object-contain rounded-xl sm:rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/20"
            />
          </div>

          <p 
            className="text-white/70 text-xs sm:text-sm mt-3 sm:mt-4 text-center px-4"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
          >
            {designTitle} • {clientShortName}
          </p>
        </div>
      )}

    </div>
  );
};
