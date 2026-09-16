import React from 'react';
import { X, Layers, Printer, FileText, CheckCircle2, Crosshair, ArrowRight, ArrowLeft } from 'lucide-react';

export const ProjectModal = ({ project, lang, onClose }) => {
  if (!project) return null;
  const isAr = lang === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink-950/80 backdrop-blur-md overflow-y-auto">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-800 dark:border-ink-700 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Title Bar */}
        <div className="bg-ink-950 text-white px-6 py-4 flex items-center justify-between border-b border-ink-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-print-orange"></span>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-300">
              CASE STUDY // {project.tier.toUpperCase()} // ID: {project.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-ink-800 hover:bg-print-orange text-ink-300 hover:text-white transition"
            title="إغلاق / Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          
          {/* Header Title and Category */}
          <div className="space-y-2">
            <div className="inline-block px-2.5 py-0.5 rounded bg-print-orange/10 text-print-orange font-mono text-xs font-bold uppercase">
              {project.category[lang]}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-950 dark:text-white">
              {project.title[lang]}
            </h2>
            <p className="text-sm sm:text-base text-ink-600 dark:text-ink-400">
              {project.summary[lang]}
            </p>
          </div>

          {/* Full Screen Image Presentation */}
          <div className="rounded-xl overflow-hidden border border-ink-200 dark:border-ink-800 bg-ink-950 aspect-[16/9] relative">
            <img
              src={project.imageUrl}
              alt={project.title[lang]}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 start-3 bg-ink-950/85 text-white font-mono text-[10px] px-3 py-1.5 rounded border border-white/20 backdrop-blur-sm">
              FINISHED PRODUCTION SAMPLE
            </div>
          </div>

          {/* Case Study Formula: Brief & Concept */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. The Brief */}
            <div className="p-5 rounded-xl border border-ink-200 dark:border-ink-800 bg-paper-100 dark:bg-ink-800/60 space-y-2">
              <div className="font-mono text-xs text-print-orange font-bold uppercase">
                01. // {isAr ? 'موجز العميل والمشكلة (Brief)' : 'The Brief & Goal'}
              </div>
              <p className="text-sm text-ink-800 dark:text-ink-200 leading-relaxed font-sans">
                {project.brief[lang]}
              </p>
            </div>

            {/* 2. The Concept */}
            <div className="p-5 rounded-xl border border-ink-200 dark:border-ink-800 bg-paper-100 dark:bg-ink-800/60 space-y-2">
              <div className="font-mono text-xs text-print-cyan font-bold uppercase">
                02. // {isAr ? 'الفكرة وتناغم الخامات (Concept)' : 'Concept & Material Rationale'}
              </div>
              <p className="text-sm text-ink-800 dark:text-ink-200 leading-relaxed font-sans">
                {project.concept[lang]}
              </p>
            </div>
          </div>

          {/* The Authoritative Technical Spec Block */}
          <div className="bg-ink-950 text-white rounded-xl p-6 border border-ink-800 space-y-4">
            <div className="flex items-center justify-between border-b border-ink-800 pb-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-print-orange" />
                <span className="font-bold tracking-wider uppercase text-paper-100">
                  {isAr ? 'مربع البيانات والمواصفات الفنية الكاملة (Spec Block)' : 'COMPLETE SPECIFICATION BLOCK'}
                </span>
              </div>
              <span className="text-emerald-400 font-bold">READY FOR PRESS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-3 rounded bg-ink-900 border border-ink-800">
                <span className="text-ink-400 block text-[10px] uppercase">{isAr ? 'المقاس المغلق' : 'FINISHED SIZE'}:</span>
                <span className="text-white font-semibold text-sm">{project.specs.dimensions}</span>
              </div>

              <div className="p-3 rounded bg-ink-900 border border-ink-800">
                <span className="text-ink-400 block text-[10px] uppercase">{isAr ? 'نظام وتوزيع الألوان' : 'COLOR SYSTEM'}:</span>
                <span className="text-white font-semibold text-sm">{project.specs.colorMode}</span>
              </div>

              <div className="p-3 rounded bg-ink-900 border border-ink-800 col-span-1 sm:col-span-2">
                <span className="text-ink-400 block text-[10px] uppercase">{isAr ? 'نوع الورق / الخامة والجراماج' : 'SUBSTRATE & GRAMMAGE'}:</span>
                <span className="text-paper-100 font-semibold text-sm">{project.specs.stock}</span>
              </div>

              <div className="p-3 rounded bg-ink-900 border border-ink-800 col-span-1 sm:col-span-2">
                <span className="text-ink-400 block text-[10px] uppercase">{isAr ? 'التشطيب ومعالجة السطح' : 'FINISHING & EMBELLISHMENT'}:</span>
                <span className="text-paper-100 font-semibold text-sm">{project.specs.finishing}</span>
              </div>

              <div className="p-3 rounded bg-ink-900 border border-ink-800 col-span-1 sm:col-span-2">
                <span className="text-ink-400 block text-[10px] uppercase">{isAr ? 'ماكينة وتكنولوجيا الطباعة' : 'PRESS & BINDERY MACHINERY'}:</span>
                <span className="text-print-cyan font-semibold text-sm">{project.specs.printMethod}</span>
              </div>
            </div>

            {/* Prepress Guarantee Note */}
            <div className="p-4 rounded bg-ink-900/90 border-s-4 border-emerald-500 text-xs font-mono text-ink-300">
              <span className="text-emerald-400 font-bold block mb-1">
                // {isAr ? 'ملاحظات ما قبل الطباعة (Prepress Preflight Note):' : 'Prepress Preflight Audit:'}
              </span>
              {project.specs.prepressNotes}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ink-200 dark:border-ink-800">
            <span className="text-xs text-ink-500 font-mono">
              Designed & Prepress Audited by Ahmed Maher
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`https://wa.me/201067017778?text=${encodeURIComponent(`مرحباً أحمد، أود الاستفسار عن تفاصيل تنفيذ مشروع: ${project.title.ar}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-4 py-2 bg-ink-950 hover:bg-print-orange text-white rounded-lg text-xs font-mono font-bold transition"
              >
                {isAr ? 'ناقش هذا المشروع مع أحمد' : 'Discuss This Project on WhatsApp'}
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-paper-200 dark:bg-ink-800 hover:bg-paper-300 dark:hover:bg-ink-700 text-ink-800 dark:text-ink-200 rounded-lg text-xs font-mono transition"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
