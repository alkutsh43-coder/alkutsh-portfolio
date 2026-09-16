import React, { useState, useEffect, useRef, useMemo } from 'react';
import { clientsData } from '../data/clientPortfolios';

const ALL_CATEGORIES = [
  { id: 'all', name: { ar: 'الـكـل', en: 'All' } },
  { id: 'social', name: { ar: 'سـوشـيـال مـيـديـا', en: 'Social Media' } },
  { id: 'print', name: { ar: 'مـطـبـوعـات وتـغـلـيـف', en: 'Print & Packaging' } },
  { id: 'branding', name: { ar: 'هـويـة بـصـريـة', en: 'Visual Identity' } },
];

export const EditorialProjects = ({ lang, onSelectProject }) => {
  const isAr = lang === 'ar';
  const [selectedClientId, setSelectedClientId] = useState('nabta');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animTrigger, setAnimTrigger] = useState(0);

  // Active Client & its designs
  const activeClient = clientsData.find(c => c.id === selectedClientId) || clientsData[0];
  const clientDesigns = activeClient.designs || [];

  // Dynamic available categories strictly for THIS active client ("ان وجد للعميل المختار")
  const availableCategories = useMemo(() => {
    const presentKeys = new Set(clientDesigns.map((d) => d.categoryKey).filter(Boolean));
    return ALL_CATEGORIES.filter(
      (cat) => cat.id === 'all' || presentKeys.has(cat.id)
    );
  }, [clientDesigns]);

  // Client-scoped filtered designs
  const visibleDesigns = useMemo(() => {
    if (selectedCategory === 'all') return clientDesigns;
    const filtered = clientDesigns.filter((d) => d.categoryKey === selectedCategory);
    return filtered.length > 0 ? filtered : clientDesigns;
  }, [clientDesigns, selectedCategory]);

  const currentDesign = visibleDesigns[currentIndex] || visibleDesigns[0] || clientDesigns[0] || {};

  const handleSelectClient = (clientId) => {
    if (clientId === selectedClientId) return;
    setSelectedClientId(clientId);
    setSelectedCategory('all');
    setCurrentIndex(0);
    setAnimTrigger((prev) => prev + 1);
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setCurrentIndex(0);
    setAnimTrigger((prev) => prev + 1);
  };

  const handleSelect = (index) => {
    setCurrentIndex(index);
    setAnimTrigger((prev) => prev + 1);
  };

  const handleNext = () => {
    if (!visibleDesigns.length) return;
    handleSelect((currentIndex + 1) % visibleDesigns.length);
  };

  const handlePrev = () => {
    if (!visibleDesigns.length) return;
    handleSelect((currentIndex - 1 + visibleDesigns.length) % visibleDesigns.length);
  };

  const handleOpenCaseStudy = (designToOpen = currentDesign, indexToOpen = currentIndex) => {
    if (!onSelectProject) return;
    onSelectProject({
      ...designToOpen,
      client: activeClient,
      clientName: activeClient.name,
      clientShortName: activeClient.shortName,
      clientLogo: activeClient.logoUrl,
      clientRequest: activeClient.clientRequest,
      clientCategory: activeClient.category,
      designs: visibleDesigns,
      initialIndex: indexToOpen,
      onIndexChange: (newIdx) => {
        handleSelect(newIdx);
      }
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, clientDesigns.length]);

  // Interactive Real-Time Drag & Touch Physics (سحب وتحريك التصاميم باللمس والماوس لحظياً)
  const [carouselDragOffset, setCarouselDragOffset] = useState(0);
  const [isCarouselDragging, setIsCarouselDragging] = useState(false);
  const carouselDragStartRef = useRef({ x: 0, y: 0, time: 0, isHorizontal: null });
  const carouselHasDraggedFarRef = useRef(false);

  const [stageDragOffset, setStageDragOffset] = useState(0);
  const [isStageDragging, setIsStageDragging] = useState(false);
  const stageDragStartRef = useRef({ x: 0, y: 0, time: 0, isHorizontal: null });
  const stageHasDraggedFarRef = useRef(false);

  // Unified Carousel Drag Handlers (Touch + Mouse with live tracking)
  const handleCarouselPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    carouselDragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
      isHorizontal: null,
    };
    carouselHasDraggedFarRef.current = false;
    setIsCarouselDragging(true);
    setCarouselDragOffset(0);
  };

  const handleCarouselPointerMove = (e) => {
    if (!carouselDragStartRef.current || !isCarouselDragging) return;
    const dx = e.clientX - carouselDragStartRef.current.x;
    const dy = e.clientY - carouselDragStartRef.current.y;

    if (carouselDragStartRef.current.isHorizontal === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        carouselDragStartRef.current.isHorizontal = Math.abs(dx) >= Math.abs(dy);
      }
    }

    if (carouselDragStartRef.current.isHorizontal) {
      if (Math.abs(dx) > 10) carouselHasDraggedFarRef.current = true;
      setCarouselDragOffset(dx);
    }
  };

  const handleCarouselPointerUp = (e) => {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    setIsCarouselDragging(false);
    const offset = carouselDragOffset;
    setCarouselDragOffset(0);

    if (offset < -50) {
      handleNext();
    } else if (offset > 50) {
      handlePrev();
    }
  };

  // Unified Stage Artwork Drag Handlers
  const handleStagePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    stageDragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
      isHorizontal: null,
    };
    stageHasDraggedFarRef.current = false;
    setIsStageDragging(true);
    setStageDragOffset(0);
  };

  const handleStagePointerMove = (e) => {
    if (!stageDragStartRef.current || !isStageDragging) return;
    const dx = e.clientX - stageDragStartRef.current.x;
    const dy = e.clientY - stageDragStartRef.current.y;

    if (stageDragStartRef.current.isHorizontal === null) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        stageDragStartRef.current.isHorizontal = Math.abs(dx) >= Math.abs(dy);
      }
    }

    if (stageDragStartRef.current.isHorizontal) {
      if (Math.abs(dx) > 10) stageHasDraggedFarRef.current = true;
      setStageDragOffset(dx);
    }
  };

  const handleStagePointerUp = (e) => {
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    setIsStageDragging(false);
    const offset = stageDragOffset;
    setStageDragOffset(0);

    if (offset < -50) {
      handleNext();
    } else if (offset > 50) {
      handlePrev();
    }
  };

  // Seamless Infinite Clients Track (40 items for 100% continuous, unbreakable infinite loop)
  const infiniteClients = useMemo(() => {
    const base = [
      ...clientsData,
      ...clientsData,
      ...clientsData,
      ...clientsData,
    ];
    return [...base, ...base];
  }, []);

  const ribbonContainerRef = useRef(null);
  const [centerShift, setCenterShift] = useState(0);
  const [isCentering, setIsCentering] = useState(false);
  const [centeredInstanceKey, setCenteredInstanceKey] = useState(null);
  const glideTimerRef = useRef(null);

  const handleResumeMarquee = () => {
    if (glideTimerRef.current) clearTimeout(glideTimerRef.current);
    setCenteredInstanceKey(null);
    setIsCentering(false);
  };

  const handleClientLogoClick = (e, clientId, instanceKey) => {
    if (!e || !e.currentTarget || !ribbonContainerRef.current) return;

    // Toggle: clicking the currently centered logo resumes marquee
    if (centeredInstanceKey === instanceKey) {
      handleResumeMarquee();
      return;
    }

    // 1. Immediately pause the continuous marquee at its exact current location
    setIsCentering(true);

    // 2. Clear any pending glide timer
    if (glideTimerRef.current) clearTimeout(glideTimerRef.current);

    // 3. Keep all logos at normal scale during transit so none grows off-center
    setCenteredInstanceKey(null);

    // 4. Calculate exact viewport delta to dead center of container
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = ribbonContainerRef.current.getBoundingClientRect();

    const elementCenter = rect.left + rect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const diff = containerCenter - elementCenter;

    // 5. Shift track smoothly to center the clicked logo
    setCenterShift((prev) => prev + diff);

    // 6. Update stage designs below
    handleSelectClient(clientId);

    // 7. Magnify ONLY when the logo arrives in the dead center
    glideTimerRef.current = setTimeout(() => {
      setCenteredInstanceKey(instanceKey);
    }, 420);
  };

  // Continuous Auto-Advance: Automatically swaps the Stage & Carousel every 5.5s
  useEffect(() => {
    if (isHovered || visibleDesigns.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered, visibleDesigns.length]);

  // Compute signed circular distance for seamless centering loop
  const getCircularDiff = (index, current, length) => {
    if (length <= 1) return 0;
    let diff = index - current;
    const half = Math.floor(length / 2);
    while (diff > half) diff -= length;
    while (diff < -half) diff += length;
    return diff;
  };

  // Compute exact CSS transform and styling for centered coverflow with live drag physics
  const getCardStyle = (diff) => {
    const dragPx = isCarouselDragging ? carouselDragOffset : 0;
    const transition = isCarouselDragging 
      ? 'none' 
      : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, filter 0.5s ease';

    if (Math.abs(diff) > 2) {
      return {
        transform: `translate(calc(-50% + ${diff * 135}% + ${dragPx}px), -50%) scale(0.6)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        transition,
      };
    }

    if (diff === 0) {
      return {
        transform: `translate(calc(-50% + ${dragPx}px), -50%) scale(1.15)`,
        opacity: 1,
        zIndex: 25,
        filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.85))',
        cursor: isCarouselDragging ? 'grabbing' : 'default',
        transition,
      };
    }

    if (Math.abs(diff) === 1) {
      return {
        transform: `translate(calc(-50% + ${diff * 105}% + ${dragPx}px), -50%) scale(0.92)`,
        opacity: 0.75,
        zIndex: 15,
        filter: 'brightness(0.8) drop-shadow(0 15px 25px rgba(0,0,0,0.6))',
        cursor: isCarouselDragging ? 'grabbing' : 'pointer',
        transition,
      };
    }

    return {
      transform: `translate(calc(-50% + ${diff * 102}% + ${dragPx}px), -50%) scale(0.78)`,
      opacity: 0.42,
      zIndex: 10,
      filter: 'brightness(0.6) drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
      cursor: isCarouselDragging ? 'grabbing' : 'pointer',
      transition,
    };
  };

  // Reusable Category Filter and Navigation Controls Block
  const renderFilterAndNavControls = (isMobileLayout = false) => (
    <div className={`space-y-5 ${isMobileLayout ? 'pt-5' : 'pt-3 border-t border-[#1A4031]/80'}`}>
      
      {/* Category Filter Buttons (أزرار الأقسام) */}
      <div className="space-y-2.5">
        <div 
          className="text-xs sm:text-sm font-bold text-white/50 uppercase tracking-wider flex items-center gap-2"
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'sans-serif' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#82E16B]"></span>
          <span>{isAr ? 'تـصـنـيـف الأعـمـال والـتـخـصـص:' : 'FILTER BY SPECIALTY:'}</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {availableCategories.map((cat) => {
            const isCatActive = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? clientDesigns.length 
              : clientDesigns.filter(d => d.categoryKey === cat.id).length;

            return (
              <button
                key={`cat-btn-${isMobileLayout ? 'mob-' : 'desk-'}${cat.id}`}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer select-none flex items-center gap-2 border ${
                  isCatActive
                    ? 'bg-[#82E16B] text-[#071610] border-[#82E16B] shadow-[0_0_20px_rgba(130,225,107,0.45)] scale-105'
                    : 'bg-[#06160F] text-white/70 border-[#1A4031] hover:border-[#82E16B]/60 hover:text-white hover:bg-[#0E2C1E]'
                }`}
                style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
              >
                {isCatActive && <span className="w-2 h-2 rounded-full bg-[#071610] animate-pulse"></span>}
                <span>{cat.name[lang] || cat.name.ar}</span>
                <span className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  isCatActive ? 'bg-[#071610]/20 text-[#071610]' : 'bg-white/10 text-white/60'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Navigation Buttons Side by Side (بمحاذاة بعضهما في العرض) */}
      <div className="flex flex-row items-center gap-3 sm:gap-4 pt-1">
        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-8 py-3.5 rounded-full border border-white/30 hover:border-[#82E16B] bg-[#071610]/90 hover:bg-[#0E261B] transition-all duration-300 shadow-xl cursor-pointer min-w-0 sm:min-w-[180px]"
        >
          <span className="text-[#82E16B] text-base sm:text-xl font-bold group-hover:-translate-x-1.5 transition-transform duration-300">
            {isAr ? '➔' : '⬅'}
          </span>
          <span 
            className="text-white text-xs sm:text-base font-bold tracking-wider whitespace-nowrap"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}
          >
            {isAr ? 'التصميم السابق' : 'PREV DESIGN'}
          </span>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 sm:gap-3 px-4 sm:px-8 py-3.5 rounded-full border border-white/30 hover:border-[#82E16B] bg-[#071610]/90 hover:bg-[#0E261B] transition-all duration-300 shadow-xl cursor-pointer min-w-0 sm:min-w-[180px]"
        >
          <span 
            className="text-white text-xs sm:text-base font-bold tracking-wider whitespace-nowrap"
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}
          >
            {isAr ? 'التصميم التالي' : 'NEXT DESIGN'}
          </span>
          <span className="text-[#82E16B] text-base sm:text-xl font-bold group-hover:translate-x-1.5 transition-transform duration-300">
            {isAr ? '⬅' : '➔'}
          </span>
        </button>
      </div>

    </div>
  );

  return (
    <section id="portfolio" className="py-20 sm:py-28 bg-[#071610] text-white border-t border-[#143224]/80 overflow-hidden relative" dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-[#82E16B]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-14 sm:space-y-18">
        
        {/* ======================================================== */}
        {/* 1. CONTINUOUS INFINITE LOGOS STREAM (الشريط المتحرك الأصلي مع التكبير والتمركز) */}
        {/* ======================================================== */}
        <div className="relative py-4 sm:py-6 select-none">
          
          {/* Borderless Stream Container */}
          <div 
            ref={ribbonContainerRef}
            className="relative overflow-hidden py-4 sm:py-6"
            dir="ltr"
          >
            {/* Cinematic Edge Fade Masks */}
            <div className="pointer-events-none absolute left-0 inset-y-0 w-20 sm:w-48 bg-gradient-to-r from-[#071610] via-[#071610]/80 to-transparent z-20"></div>
            <div className="pointer-events-none absolute right-0 inset-y-0 w-20 sm:w-48 bg-gradient-to-l from-[#071610] via-[#071610]/80 to-transparent z-20"></div>

            {/* Shift Wrapper for Smooth Centering Glide */}
            <div 
              className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center"
              style={{ transform: `translate3d(${centerShift}px, 0, 0)` }}
            >
              {/* Infinite Gliding Track: Pure Logos to Infinity */}
              <div 
                className={`client-marquee-track flex items-center ${isCentering ? 'client-marquee-paused' : ''}`}
                style={{ direction: 'ltr' }}
              >
                {infiniteClients.map((client, idx) => {
                  const instanceKey = `client-pure-logo-${client.id}-${idx}`;
                  const isCentered = centeredInstanceKey === instanceKey;
                  return (
                    <button
                      key={instanceKey}
                      onClick={(e) => handleClientLogoClick(e, client.id, instanceKey)}
                      className={`group/client relative flex-shrink-0 flex items-center justify-center cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCentered
                          ? 'mx-8 sm:mx-12 z-30 scale-[1.55] sm:scale-[1.7] opacity-100'
                          : 'mx-5 sm:mx-7 z-10 scale-[0.88] sm:scale-[0.92] opacity-45 hover:opacity-100 hover:scale-[1.05]'
                      }`}
                      style={{
                        minWidth: '130px',
                      }}
                      title={client.name[lang] || client.name.ar}
                      aria-label={client.name[lang] || client.name.ar}
                    >
                      {/* Standardized Uniform Height Pure Logo - Noticeably Larger */}
                      <img
                        src={client.logoUrl}
                        alt={client.name[lang] || client.name.ar}
                        className={`h-14 sm:h-17 md:h-20 w-auto max-w-[200px] sm:max-w-[260px] object-contain transition-all duration-500 pointer-events-none ${
                          isCentered
                            ? 'filter drop-shadow-[0_0_30px_rgba(130,225,107,0.95)] brightness-125'
                            : 'filter drop-shadow-sm grayscale-[15%] hover:grayscale-0'
                        }`}
                        loading="lazy"
                      />

                      {/* Active Glowing Emerald Accent below the selected logo */}
                      {isCentered && (
                        <span className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none animate-fadeIn">
                          <span className="w-12 sm:w-16 h-1 sm:h-1.5 bg-[#82E16B] rounded-full shadow-[0_0_16px_rgba(130,225,107,1)] animate-pulse"></span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Resume stream pill when centered */}
          {isCentering && (
            <div className="flex justify-center -mt-1 mb-1">
              <button
                onClick={handleResumeMarquee}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E2C1E]/90 border border-[#82E16B]/40 text-[#82E16B] hover:text-white hover:bg-[#82E16B]/20 text-xs font-bold transition-all shadow-md cursor-pointer"
                style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
              >
                <span>↻</span>
                <span>{isAr ? 'استئناف حركة الشريط التلقائية' : 'Resume Auto Stream'}</span>
              </button>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 2. SECTION HEADER: صحيفة اعمالي السابقة                   */}
        {/* ======================================================== */}
        <div className="text-center pt-2">
          <h2 
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-[0.12em] uppercase drop-shadow-md"
            style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
          >
            {isAr ? 'صحيفة اعمالي السابقة' : 'INTERACTIVE SHOWCASE STAGE'}
          </h2>
        </div>

        {/* ======================================================== */}
        {/* 3. TOP STAGE CONTAINER (Visual Left, Narrative & Buttons Right) */}
        {/* ======================================================== */}
        <div 
          className="relative rounded-[32px] sm:rounded-[44px] bg-[#0A1D15]/85 border border-[#1A4031] shadow-2xl p-6 sm:p-10 lg:p-12 transition-all duration-500 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Visual Column - Artwork with Touch Flip & Mobile Controls Placed Underneath */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div 
                key={`stage-visual-${selectedClientId}-${currentIndex}-${animTrigger}`}
                className={`w-full max-w-[460px] aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden relative shadow-2xl border-2 border-[#1A4031] group animate-stage-slide hover:border-[#82E16B]/60 transition-colors select-none ${
                  isStageDragging ? 'cursor-grabbing' : 'cursor-grab'
                }`}
                onClick={() => {
                  if (!stageHasDraggedFarRef.current) {
                    handleOpenCaseStudy();
                  }
                }}
                onPointerDown={handleStagePointerDown}
                onPointerMove={handleStagePointerMove}
                onPointerUp={handleStagePointerUp}
                onPointerCancel={handleStagePointerUp}
                style={{
                  touchAction: 'pan-y',
                  transform: isStageDragging
                    ? `translateX(${stageDragOffset * 0.75}px) rotate(${stageDragOffset * 0.02}deg)`
                    : 'none',
                  transition: isStageDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <img
                  src={currentDesign.image}
                  alt={currentDesign.title?.[lang] || currentDesign.title?.ar || 'Design'}
                  className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-103"
                  loading="eager"
                />

                {/* Hover Prompt Cue */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2.5 rounded-full bg-black/80 backdrop-blur-md border border-[#82E16B] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[#82E16B]">🔍</span>
                    <span style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}>
                      {isAr ? 'اضغط لعرض قصة وتفاصيل العمل' : 'Click to view story & details'}
                    </span>
                  </span>
                </div>

                {/* Counter Badge on Image */}
                <div className="absolute top-3.5 end-3.5 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-white shadow-lg pointer-events-none">
                  <span className="text-[#82E16B]">{currentIndex + 1}</span>
                  <span className="text-white/40 mx-1">/</span>
                  <span>{visibleDesigns.length}</span>
                </div>

                {/* Floating Chevron Overlays on Mobile for Immediate Touch Flipping */}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="lg:hidden absolute start-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/75 backdrop-blur-md border border-white/25 text-[#82E16B] hover:text-white flex items-center justify-center transition-all shadow-2xl active:scale-90 cursor-pointer"
                  aria-label="Previous Design"
                >
                  <span className="text-base font-black">{isAr ? '➔' : '⬅'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="lg:hidden absolute end-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/75 backdrop-blur-md border border-white/25 text-[#82E16B] hover:text-white flex items-center justify-center transition-all shadow-2xl active:scale-90 cursor-pointer"
                  aria-label="Next Design"
                >
                  <span className="text-base font-black">{isAr ? '⬅' : '➔'}</span>
                </button>
              </div>

              {/* Mobile / Small Screens Only: Controls Placed Directly Under the Artwork */}
              <div className="w-full max-w-[460px] block lg:hidden">
                {renderFilterAndNavControls(true)}
              </div>
            </div>

            {/* Narrative & Scroll Buttons Column */}
            <div 
              key={`stage-details-${selectedClientId}-${currentIndex}-${animTrigger}`}
              className="lg:col-span-7 flex flex-col justify-between space-y-6 sm:space-y-8 animate-details-reveal"
            >
              
              {/* Top Row: Year and Brand Name with Clear Contrast */}
              <div className="flex items-center justify-between border-b border-[#1A4031] pb-3 sm:pb-4">
                <span 
                  className="text-white text-xl sm:text-2xl font-bold tracking-widest"
                  style={{ fontFamily: 'Netron, sans-serif' }}
                >
                  {currentDesign.year || activeClient.year}
                </span>
                <div className="flex-1 mx-6 h-[1px] bg-[#1A4031]/60"></div>
                <span 
                  className="text-[#82E16B] text-2xl sm:text-3xl font-extrabold tracking-wide"
                  style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"29LT Kaff", sans-serif' }}
                >
                  {activeClient.shortName[lang] || activeClient.shortName.ar}
                </span>
              </div>

              {/* Block 1: طلب العميل / Client Request */}
              <div className="space-y-3">
                <h3 
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                >
                  {isAr ? 'طلب العميل' : 'Client Request'}
                </h3>
                <p 
                  className="text-lg sm:text-xl lg:text-[1.2rem] text-[#E2F5E8] leading-[1.85] font-normal"
                  style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                >
                  {activeClient.clientRequest[lang] || activeClient.clientRequest.ar}
                </p>
              </div>

              {/* Block 2: الفكرة التصميمية / Design Concept */}
              <div className="space-y-3">
                <h3 
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                >
                  {isAr ? 'الفكرة التصميمية' : 'Design Concept'}
                </h3>
                <p 
                  className="text-lg sm:text-xl lg:text-[1.2rem] text-[#E2F5E8] leading-[1.85] font-normal"
                  style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : '"A Nefel Sereke", sans-serif' }}
                >
                  {currentDesign.concept?.[lang] || currentDesign.concept?.ar}
                </p>
              </div>

              {/* Desktop Only: Specialty Filter & Step Buttons Container */}
              <div className="hidden lg:block">
                {renderFilterAndNavControls(false)}
              </div>

            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. CENTER-LOCKED 5-CARD CAROUSEL (Selected Client Designs) */}
        {/* ======================================================== */}
        <div 
          className="relative pt-6 pb-6 select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Overlay Navigation Chevron: Left (<) */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-3 text-[#82E16B] hover:text-white hover:scale-125 transition-all duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(130,225,107,0.9)]"
            title="Previous"
            aria-label="Previous Design"
          >
            <svg className="w-10 h-10 sm:w-14 sm:h-14 stroke-[2.8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Overlay Navigation Chevron: Right (>) */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-3 text-[#82E16B] hover:text-white hover:scale-125 transition-all duration-300 cursor-pointer drop-shadow-[0_0_15px_rgba(130,225,107,0.9)]"
            title="Next"
            aria-label="Next Design"
          >
            <svg className="w-10 h-10 sm:w-14 sm:h-14 stroke-[2.8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Edge Vignettes for Cinematic Depth */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#071610] to-transparent z-30"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#071610] to-transparent z-30"></div>

          {/* Mathematical Center-Stage Carousel Track with Real-Time Drag */}
          <div 
            className={`relative w-full h-[380px] sm:h-[440px] md:h-[480px] overflow-hidden flex items-center justify-center select-none ${
              isCarouselDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ direction: 'ltr', touchAction: 'pan-y' }}
            onPointerDown={handleCarouselPointerDown}
            onPointerMove={handleCarouselPointerMove}
            onPointerUp={handleCarouselPointerUp}
            onPointerCancel={handleCarouselPointerUp}
          >
            {visibleDesigns.map((design, idx) => {
              const diff = getCircularDiff(idx, currentIndex, visibleDesigns.length);
              const isCenter = diff === 0;
              const cardStyle = getCardStyle(diff);

              return (
                <div
                  key={design.id || `card-${idx}`}
                  onClick={() => {
                    if (carouselHasDraggedFarRef.current) return;
                    if (isCenter) {
                      handleOpenCaseStudy(design, idx);
                    } else {
                      handleSelect(idx);
                    }
                  }}
                  className={`absolute top-1/2 left-1/2 w-[200px] sm:w-[240px] md:w-[270px] lg:w-[300px] aspect-[4/5] rounded-[24px] sm:rounded-[28px] overflow-hidden select-none transition-all duration-500 cursor-pointer ${
                    isCenter
                      ? 'border-2 border-[#82E16B] ring-4 ring-[#82E16B]/40 shadow-2xl glow-botanical-lg'
                      : 'border border-[#1A4031] hover:border-[#82E16B]/70'
                  }`}
                  style={cardStyle}
                >
                  <img
                    src={design.image}
                    alt={design.title?.ar || 'Work'}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>

          {/* Dots Indicator for Active Design */}
          <div className="flex items-center justify-center gap-2 pt-6">
            {visibleDesigns.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => handleSelect(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? 'w-8 bg-[#82E16B] shadow-[0_0_12px_rgba(130,225,107,0.9)]'
                    : 'w-2 bg-[#1A4031] hover:bg-[#82E16B]/60'
                }`}
                aria-label={`Go to design 0${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
