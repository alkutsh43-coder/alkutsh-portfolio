import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Eye, Layers, FileText, ArrowUpRight, CheckCircle2, SlidersHorizontal } from 'lucide-react';

export const ProjectsCatalog = ({ lang, onSelectProject }) => {
  const isAr = lang === 'ar';
  const [selectedTier, setSelectedTier] = useState('all');

  const filteredProjects = selectedTier === 'all'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.tier === selectedTier);

  return (
    <section id="projects-catalog" className="py-16 border-b border-ink-800/10 dark:border-ink-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Editorial Subtext */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-print-orange font-bold uppercase tracking-wider mb-2">
              <span>04. // CURATED PRODUCTION ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-950 dark:text-white">
              {isAr ? 'دليل الأعمال المختارة ودراسات الإنتاج' : 'Curated Works & Production Case Studies'}
            </h2>
            <p className="text-sm sm:text-base text-ink-600 dark:text-ink-400 mt-2 max-w-3xl leading-relaxed">
              {isAr 
                ? 'مشاريع مقسمة حسب أولويتها التقنية للمطابع الكبرى، يتبع كل مشروع قالب موحد: (Brief → Concept → Design → Spec Block → Prepress → Production).'
                : 'Curated into three technical tiers for commercial print houses. Each project adheres to the rigorous formula: (Brief → Concept → Design → Spec Block → Prepress → Production).'}
            </p>
          </div>

          {/* Tier Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-paper-200/80 dark:bg-ink-900 p-1.5 rounded-lg border border-ink-300 dark:border-ink-800 font-mono text-xs">
            <button
              onClick={() => setSelectedTier('all')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                selectedTier === 'all'
                  ? 'bg-ink-950 text-white dark:bg-paper-100 dark:text-ink-950 shadow-sm'
                  : 'text-ink-700 dark:text-ink-300 hover:text-ink-950'
              }`}
            >
              {isAr ? 'كافة المشاريع (10)' : 'All Projects (10)'}
            </button>
            <button
              onClick={() => setSelectedTier('tier-1')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                selectedTier === 'tier-1'
                  ? 'bg-ink-950 text-white dark:bg-paper-100 dark:text-ink-950 shadow-sm'
                  : 'text-ink-700 dark:text-ink-300 hover:text-ink-950'
              }`}
            >
              {isAr ? 'الطبقة الأولى (تغليف وليبل)' : 'Tier 1 (Packaging)'}
            </button>
            <button
              onClick={() => setSelectedTier('tier-2')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                selectedTier === 'tier-2'
                  ? 'bg-ink-950 text-white dark:bg-paper-100 dark:text-ink-950 shadow-sm'
                  : 'text-ink-700 dark:text-ink-300 hover:text-ink-950'
              }`}
            >
              {isAr ? 'الطبقة الثانية (كتالوجات وليزر)' : 'Tier 2 (Editorial & Laser)'}
            </button>
            <button
              onClick={() => setSelectedTier('tier-3')}
              className={`px-3 py-1.5 rounded-md font-semibold transition ${
                selectedTier === 'tier-3'
                  ? 'bg-ink-950 text-white dark:bg-paper-100 dark:text-ink-950 shadow-sm'
                  : 'text-ink-700 dark:text-ink-300 hover:text-ink-950'
              }`}
            >
              {isAr ? 'الطبقة الثالثة (تشطيب وحريري)' : 'Tier 3 (Finishing)'}
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const tierInfo = portfolioData.tiers.find(t => t.id === project.tier);

            return (
              <div
                key={project.id}
                className="group flex flex-col rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Visual Header with Image & Overlay */}
                <div className="relative aspect-[16/10] overflow-hidden bg-ink-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />

                  {/* Corner Badges */}
                  <div className="absolute top-3 start-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-ink-950/85 text-white border border-white/20 backdrop-blur-sm">
                      {tierInfo?.number} // {project.tier.toUpperCase()}
                    </span>
                    {project.isHero && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-print-orange text-white shadow-sm">
                        HERO
                      </span>
                    )}
                  </div>

                  {/* Quick Preview Action on Hover */}
                  <button
                    onClick={() => onSelectProject(project)}
                    className="absolute inset-0 bg-ink-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs font-semibold backdrop-blur-[2px]"
                  >
                    <Eye className="w-4 h-4 text-print-orange" />
                    <span>{isAr ? 'فتح المواصفات الفنية الكاملة' : 'View Case Study & Specs'}</span>
                  </button>
                </div>

                {/* Project Header Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono font-semibold text-print-orange uppercase tracking-wide">
                      {project.category[lang]}
                    </div>
                    <h3 className="font-bold text-lg text-ink-950 dark:text-white leading-snug group-hover:text-print-orange transition-colors">
                      {project.title[lang]}
                    </h3>
                    <p className="text-xs text-ink-600 dark:text-ink-400 line-clamp-2 leading-relaxed">
                      {project.summary[lang]}
                    </p>
                  </div>

                  {/* The Signature "Spec Block" (Technical Editorial Format) */}
                  <div className="bg-paper-100/80 dark:bg-ink-950/70 p-3 rounded-lg border border-ink-200 dark:border-ink-800/80 font-mono text-[11px] space-y-2">
                    <div className="flex items-center justify-between border-b border-ink-200 dark:border-ink-800/60 pb-1.5 text-[10px] text-ink-500 uppercase tracking-wider font-bold">
                      <span>// SPEC BLOCK</span>
                      <span className="text-print-orange">ISO CALIBRATED</span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px]">
                      <div>
                        <span className="text-ink-500 block text-[9px] uppercase">{isAr ? 'المقاس' : 'DIMENSIONS'}:</span>
                        <span className="font-semibold text-ink-900 dark:text-ink-100 truncate block">
                          {project.specs.dimensions}
                        </span>
                      </div>
                      <div>
                        <span className="text-ink-500 block text-[9px] uppercase">{isAr ? 'الألوان' : 'COLOR'}:</span>
                        <span className="font-semibold text-ink-900 dark:text-ink-100 truncate block" title={project.specs.colorMode}>
                          {project.specs.colorMode}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-ink-500 block text-[9px] uppercase">{isAr ? 'الخامة والجراماج' : 'SUBSTRATE & GSM'}:</span>
                        <span className="font-semibold text-ink-900 dark:text-ink-100 text-[10.5px] truncate block" title={project.specs.stock}>
                          {project.specs.stock}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-ink-500 block text-[9px] uppercase">{isAr ? 'التشطيب' : 'FINISHING'}:</span>
                        <span className="font-semibold text-ink-900 dark:text-ink-100 text-[10.5px] line-clamp-1" title={project.specs.finishing}>
                          {project.specs.finishing}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prepress Assurance Badge */}
                  <div className="pt-2 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-ink-500 truncate max-w-[200px]" title={project.specs.printMethod}>
                      {project.specs.printMethod.split('+')[0]}
                    </span>
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1 text-print-orange hover:text-ink-900 dark:hover:text-white font-bold transition"
                    >
                      <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
