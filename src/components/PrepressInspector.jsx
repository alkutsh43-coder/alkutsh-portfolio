import React, { useState } from 'react';
import { Layers, Sliders, Eye, Check, AlertTriangle, Crosshair, Sparkles } from 'lucide-react';

export const PrepressInspector = ({ lang }) => {
  const isAr = lang === 'ar';

  // Toggleable Prepress Layers
  const [layers, setLayers] = useState({
    artwork: true,
    dielineCut: true,
    dielineCrease: true,
    foilMask: true,
    bleedGuides: true,
    overprintPreview: true,
  });

  const [activeTab, setActiveTab] = useState('interactive'); // 'interactive' or 'comparison'
  const [sliderPosition, setSliderPosition] = useState(50); // percentage for split slider

  const toggleLayer = (key) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="prepress-inspector" className="py-16 border-b border-ink-800/10 dark:border-ink-800/50 bg-paper-100/50 dark:bg-ink-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-print-orange font-bold uppercase tracking-wider mb-1">
              <Crosshair className="w-4 h-4" />
              <span>{isAr ? 'العارض التقني التفاعلي لما قبل الطباعة' : 'INTERACTIVE PREPRESS & DIELINE INSPECTOR'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-950 dark:text-white">
              {isAr ? 'فحص ملفات الطباعة والـ Dieline الحية' : 'Live Prepress & Packaging CAD Inspection'}
            </h2>
            <p className="text-sm text-ink-600 dark:text-ink-400 mt-1 max-w-2xl">
              {isAr 
                ? 'تحكم في طبقات ملف الإنتاج بنفسك: عاين خطوط القص، الثني، أقنعة بصمة الذهب، وهوامش الـ Bleed قبل إرسال الملف للزنكات وماكينات التكسير.' 
                : 'Inspect production layers firsthand: view CAD cut lines, crease rules, hot foil separation masks, and bleed clearances before plate imaging.'}
            </p>
          </div>

          {/* View Mode Selector */}
          <div className="flex items-center gap-2 bg-paper-200 dark:bg-ink-800 p-1 rounded-lg border border-ink-300 dark:border-ink-700 font-mono text-xs">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded font-semibold transition ${
                activeTab === 'interactive'
                  ? 'bg-ink-900 text-white dark:bg-paper-100 dark:text-ink-950 shadow-sm'
                  : 'text-ink-700 dark:text-ink-300 hover:text-ink-950'
              }`}
            >
              {isAr ? 'مستكشف الطبقات (Layer Stacks)' : 'Layer Inspector'}
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded font-semibold transition ${
                activeTab === 'comparison'
                  ? 'bg-ink-900 text-white dark:bg-paper-100 dark:text-ink-950 shadow-sm'
                  : 'text-ink-700 dark:text-ink-300 hover:text-ink-950'
              }`}
            >
              {isAr ? 'مقارنة قبل / بعد (Split Slider)' : 'Before / After Slider'}
            </button>
          </div>
        </div>

        {/* Main Inspector Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Canvas: The Interactive Prepress Box Blueprint */}
          <div className="lg:col-span-8 bg-ink-900 rounded-xl border-2 border-ink-800 shadow-2xl overflow-hidden relative">
            {/* Top Sheet Header */}
            <div className="bg-ink-950 px-4 py-2 border-b border-ink-800 flex items-center justify-between text-[11px] font-mono text-ink-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-white font-bold">AL_REEM_PERFUME_BOX_DIE_REV4.PDF</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-print-cyan">SCALE: 1:1</span>
                <span>•</span>
                <span>BLEED: +4.0mm</span>
              </div>
            </div>

            {/* View Mode: Interactive Layer Stacks */}
            {activeTab === 'interactive' ? (
              <div className="relative aspect-[16/10] bg-[#07090E] flex items-center justify-center p-6 select-none overflow-hidden">
                {/* Background Blueprint Grid */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                {/* Layer 1: Bleed & Safety Boundary (Green Guides) */}
                {layers.bleedGuides && (
                  <div className="absolute inset-8 sm:inset-12 border border-emerald-500/70 pointer-events-none transition-opacity">
                    <span className="absolute -top-3.5 start-2 bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-mono px-1 rounded">
                      TRIM LINE (BLEED MARGIN +4mm)
                    </span>
                    {/* Corner Registration Marks */}
                    <div className="absolute -top-3 -left-3 text-emerald-400 font-mono text-xs">⌖</div>
                    <div className="absolute -top-3 -right-3 text-emerald-400 font-mono text-xs">⌖</div>
                    <div className="absolute -bottom-3 -left-3 text-emerald-400 font-mono text-xs">⌖</div>
                    <div className="absolute -bottom-3 -right-3 text-emerald-400 font-mono text-xs">⌖</div>
                  </div>
                )}

                {/* Interactive SVG Packaging CAD Dieline Structure */}
                <div className="relative w-full max-w-lg aspect-[1.4/1] flex items-center justify-center">
                  <svg viewBox="0 0 500 360" className="w-full h-full drop-shadow-md">
                    {/* Base Artwork Fill (Rich Green CMYK) */}
                    {layers.artwork && (
                      <g className="transition-opacity duration-300">
                        {/* Main Body panels */}
                        <rect x="130" y="90" width="240" height="180" fill="#0C261E" rx="2" />
                        <rect x="50" y="90" width="80" height="180" fill="#091F18" />
                        <rect x="370" y="90" width="80" height="180" fill="#091F18" />
                        <rect x="130" y="30" width="240" height="60" fill="#0A221B" />
                        <rect x="130" y="270" width="240" height="60" fill="#0A221B" />
                        {/* Glue Flaps */}
                        <polygon points="50,90 20,110 20,250 50,270" fill="#071813" />
                      </g>
                    )}

                    {/* Gold Hot Foil Plate Layer */}
                    {layers.foilMask && (
                      <g className="transition-opacity duration-300">
                        {/* Center Emblem Foil */}
                        <circle cx="250" cy="180" r="35" fill="none" stroke="#E5C158" strokeWidth="2.5" />
                        <polygon points="250,155 260,175 282,175 264,188 271,208 250,195 229,208 236,188 218,175 240,175" fill="#C5A059" />
                        <text x="250" y="235" textAnchor="middle" fill="#E5C158" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold" letterSpacing="3">
                          AL-REEM OUD
                        </text>
                        <text x="250" y="247" textAnchor="middle" fill="#A88B38" fontSize="7" fontFamily="JetBrains Mono" letterSpacing="1">
                          HOT STAMPED GOLD FOIL (OVERPRINT)
                        </text>
                      </g>
                    )}

                    {/* Crease Lines (Cyan Dashed) */}
                    {layers.dielineCrease && (
                      <g stroke="#00A3E0" strokeWidth="1.5" strokeDasharray="5,4" className="transition-opacity duration-300">
                        <line x1="130" y1="30" x2="130" y2="330" />
                        <line x1="370" y1="30" x2="370" y2="330" />
                        <line x1="50" y1="90" x2="450" y2="90" />
                        <line x1="50" y1="270" x2="450" y2="270" />
                      </g>
                    )}

                    {/* Cut Lines (Solid Magenta) */}
                    {layers.dielineCut && (
                      <g stroke="#FF0055" strokeWidth="2" fill="none" className="transition-opacity duration-300">
                        {/* Outer Perimeter Cut */}
                        <polygon points="
                          130,30 370,30 370,90 450,90 450,270 370,270 370,330 130,330 130,270 50,270 20,250 20,110 50,90 130,90
                        " />
                        {/* Thumb notch / Finger cut */}
                        <path d="M 370,170 A 10,10 0 0,0 370,190" stroke="#FF0055" strokeWidth="2" fill="none" />
                      </g>
                    )}
                  </svg>
                </div>

                {/* Bottom Watermark / Status */}
                <div className="absolute bottom-3 start-4 flex items-center gap-3 font-mono text-[10px] text-ink-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-print-dielineCut"></span>
                    CUT: #FF0055 (0.5pt)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-print-dielineCrease"></span>
                    CREASE: #00A3E0 (Dashed)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-print-gold"></span>
                    FOIL: SPOT_GOLD_871
                  </span>
                </div>
              </div>
            ) : (
              /* View Mode: Split Screen Slider Comparison */
              <div className="relative aspect-[16/10] bg-ink-950 overflow-hidden select-none">
                {/* Underlying Finished Real Product Photo */}
                <img
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80"
                  alt="Final Printed Product"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-3 end-3 bg-ink-950/80 text-white font-mono text-[10px] px-2 py-1 rounded border border-white/20">
                  {isAr ? 'المنتج المطبوع الفعلي (After)' : 'Final Printed Product (After)'}
                </div>

                {/* Clipped Prepress Blueprint View */}
                <div
                  className="absolute inset-0 bg-[#07090E] border-e-2 border-print-orange"
                  style={{ width: `${sliderPosition}%` }}
                >
                  {/* Internal Blueprint Graphic */}
                  <div className="w-[100vw] max-w-[800px] h-full flex items-center justify-center p-8">
                    <div className="text-center font-mono text-ink-300">
                      <div className="text-print-dielineCut font-bold text-sm mb-1">
                        [PREPRESS DIELINE & SPOT PLATE VIEW]
                      </div>
                      <div className="text-xs text-ink-400">
                        {isAr ? 'قالب التكسير الفيكتور + علامات القص والريجة' : 'Vector CAD cutlines + Crease rules + Bleed'}
                      </div>
                      <div className="mt-4 inline-block p-4 border border-dashed border-print-dielineCrease rounded bg-ink-900/90 text-xs">
                        <div className="text-white font-semibold">AL-REEM RIGID BOX PREPRESS</div>
                        <div className="text-emerald-400 text-[11px] mt-1">✓ Overprint Fill Enabled</div>
                        <div className="text-print-cyan text-[11px]">✓ Flute & Board Caliper +1.5mm</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 start-3 bg-print-orange text-white font-mono text-[10px] px-2 py-1 rounded font-bold">
                    {isAr ? 'ملف ما قبل الطباعة (Before)' : 'Prepress & Dieline (Before)'}
                  </div>
                </div>

                {/* Slider Range Controller */}
                <input
                  type="range"
                  min="5"
                  max="95"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-x-4 bottom-4 z-20 w-full accent-print-orange cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Right Column: Layer Controllers & Prepress Audit Checklist */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Layer Toggles Box */}
            <div className="bg-white dark:bg-ink-900 p-5 rounded-xl border border-ink-200 dark:border-ink-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-ink-200 dark:border-ink-800 pb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-print-orange" />
                  <h3 className="font-bold text-sm text-ink-950 dark:text-white">
                    {isAr ? 'التحكم في طبقات الملف (Separations)' : 'Active Separation Layers'}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-ink-500">PDF/X-4</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {/* Dieline Cut Layer */}
                <label className="flex items-center justify-between p-2 rounded bg-paper-100 dark:bg-ink-800/80 cursor-pointer hover:bg-paper-200 dark:hover:bg-ink-800 transition">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-print-dielineCut"></span>
                    <span className="font-semibold text-ink-900 dark:text-white">
                      {isAr ? 'خطوط القص (Cut Line)' : 'Cut Line (Die Blade)'}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={layers.dielineCut}
                    onChange={() => toggleLayer('dielineCut')}
                    className="rounded accent-print-dielineCut cursor-pointer"
                  />
                </label>

                {/* Crease Layer */}
                <label className="flex items-center justify-between p-2 rounded bg-paper-100 dark:bg-ink-800/80 cursor-pointer hover:bg-paper-200 dark:hover:bg-ink-800 transition">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-print-dielineCrease"></span>
                    <span className="font-semibold text-ink-900 dark:text-white">
                      {isAr ? 'خطوط الريجة/الثني (Crease)' : 'Crease Rules (Score)'}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={layers.dielineCrease}
                    onChange={() => toggleLayer('dielineCrease')}
                    className="rounded accent-print-dielineCrease cursor-pointer"
                  />
                </label>

                {/* Hot Foil Stamping */}
                <label className="flex items-center justify-between p-2 rounded bg-paper-100 dark:bg-ink-800/80 cursor-pointer hover:bg-paper-200 dark:hover:bg-ink-800 transition">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-print-gold"></span>
                    <span className="font-semibold text-ink-900 dark:text-white">
                      {isAr ? 'بصمة الذهب (Foil Stamp Mask)' : 'Foil Stamping Mask'}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={layers.foilMask}
                    onChange={() => toggleLayer('foilMask')}
                    className="rounded accent-print-orange cursor-pointer"
                  />
                </label>

                {/* CMYK Artwork */}
                <label className="flex items-center justify-between p-2 rounded bg-paper-100 dark:bg-ink-800/80 cursor-pointer hover:bg-paper-200 dark:hover:bg-ink-800 transition">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                    <span className="font-semibold text-ink-900 dark:text-white">
                      {isAr ? 'التصميم والألوان (CMYK Print)' : 'CMYK Process Artwork'}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={layers.artwork}
                    onChange={() => toggleLayer('artwork')}
                    className="rounded accent-emerald-600 cursor-pointer"
                  />
                </label>

                {/* Bleed & Crop Marks */}
                <label className="flex items-center justify-between p-2 rounded bg-paper-100 dark:bg-ink-800/80 cursor-pointer hover:bg-paper-200 dark:hover:bg-ink-800 transition">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    <span className="font-semibold text-ink-900 dark:text-white">
                      {isAr ? 'زوائد الطباعة (Bleed Guides)' : 'Bleed Box (+4mm)'}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={layers.bleedGuides}
                    onChange={() => toggleLayer('bleedGuides')}
                    className="rounded accent-emerald-500 cursor-pointer"
                  />
                </label>
              </div>

              {/* Prepress Director Proof Note */}
              <div className="pt-3 border-t border-ink-200 dark:border-ink-800 text-[11px] text-ink-600 dark:text-ink-400 space-y-1.5 font-sans">
                <div className="flex items-start gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>
                    {isAr 
                      ? 'خاصية Overprint مفعلة على طبقة البصمة لعدم تفريغ اللون تحتها.' 
                      : 'Overprint enabled on Foil plate to prevent white knockout gaps.'}
                  </span>
                </div>
                <div className="flex items-start gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>
                    {isAr 
                      ? 'حساب تمدد الكرتون المقوى (Board Caliper) 1.5 مم لضمان إغلاق محكم.' 
                      : 'Compensated for 1.5mm board caliper so hinges close flush.'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Specs Sheet for this packaging */}
            <div className="bg-ink-950 text-white p-4 rounded-xl font-mono text-xs space-y-2 border border-ink-800">
              <div className="text-[10px] text-print-orange font-bold uppercase tracking-wider">
                {isAr ? '// بطاقة تشغيل الماكينة' : '// PRESS JOB SPEC SHEET'}
              </div>
              <div className="flex justify-between border-b border-ink-800 py-1 text-ink-300">
                <span>SUBSTRATE:</span>
                <span className="text-white font-semibold">1400 GSM GREYBOARD</span>
              </div>
              <div className="flex justify-between border-b border-ink-800 py-1 text-ink-300">
                <span>PRESS:</span>
                <span className="text-white font-semibold">HEIDELBERG XL 106</span>
              </div>
              <div className="flex justify-between border-b border-ink-800 py-1 text-ink-300">
                <span>DIE-CUTTER:</span>
                <span className="text-white font-semibold">BOBST AUTOPLATEN</span>
              </div>
              <div className="flex justify-between py-1 text-ink-300">
                <span>STATUS:</span>
                <span className="text-emerald-400 font-bold">VERIFIED FOR RUN</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
