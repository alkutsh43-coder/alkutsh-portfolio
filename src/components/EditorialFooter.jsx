import React from 'react';
import { editorialData } from '../data/portfolioData';
import { AlkutshLogo } from './AlkutshLogo';
import { ArrowUpRight, MessageSquare, Mail, ArrowUp } from 'lucide-react';

export const EditorialFooter = ({ lang }) => {
  const isAr = lang === 'ar';
  const { name, nickname, contact } = editorialData.profile;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-16 sm:py-28 bg-[#0B1E16] text-[#D8F3DC] border-t border-[#1A4031]" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1480px] mx-auto px-5 sm:px-12 space-y-12 sm:space-y-16">
        
        {/* Contact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div className="max-w-2xl space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <AlkutshLogo className="h-9 sm:h-12" light={true} />
            </div>
            <h2 
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
              style={{ fontFamily: isAr ? '"Zain Length 1", "Zain", sans-serif' : '"A Nefel Sereke", sans-serif' }}
            >
              {isAr ? (
                <>
                  جاهز للتعاون الميداني في مشاريع الهويات البصرية والمطبوعات الكبرى.
                </>
              ) : (
                <>
                  Available for on-site roles and major identity & packaging projects.
                </>
              )}
            </h2>
          </div>

          {/* Quick WhatsApp Action Button */}
          <div>
            <a
              href={`https://wa.me/201067017778?text=${encodeURIComponent(isAr ? 'مرحباً أحمد، اطلعت على موقعك وأعمالك وأود التواصل معك.' : 'Hello Ahmed, I reviewed your portfolio and would like to connect.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#82E16B] hover:bg-[#6ed355] text-[#071610] rounded-2xl font-extrabold text-sm sm:text-lg transition shadow-xl hover:scale-105 duration-300 cursor-pointer w-full sm:w-auto"
              style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}
            >
              <MessageSquare className="w-5 h-5 flex-shrink-0" />
              <span>{isAr ? 'محادثة مباشرة عبر واتساب' : 'Direct WhatsApp Chat'}</span>
            </a>
          </div>
        </div>

        {/* Contact Channels Grid with Large, Clear Fonts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-[#1A4031]" style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}>
          
          {/* Email */}
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-xs sm:text-sm font-bold text-[#82E16B] block uppercase tracking-wider">
              {isAr ? 'البريد الإلكتروني' : 'EMAIL'}
            </span>
            <a
              href={`mailto:${contact.email}`}
              className="text-base sm:text-xl font-bold text-white hover:text-[#82E16B] transition-colors block truncate"
            >
              {contact.email}
            </a>
          </div>

          {/* Phone / WhatsApp */}
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-xs sm:text-sm font-bold text-[#82E16B] block uppercase tracking-wider">
              {isAr ? 'رقم التواصل' : 'CONTACT PHONE'}
            </span>
            <div>
              <a
                href={`tel:${contact.phone || '01067017778'}`}
                className="text-base sm:text-xl font-bold text-white hover:text-[#82E16B] transition-colors inline-block tracking-wide"
                style={{ direction: 'ltr', unicodeBidi: 'plaintext' }}
              >
                {contact.whatsappDisplay}
              </a>
            </div>
          </div>

          {/* Online Presence / Behance & LinkedIn */}
          <div className="space-y-1.5 sm:space-y-2">
            <span className="text-xs sm:text-sm font-bold text-[#82E16B] block uppercase tracking-wider">
              {isAr ? 'الشبكات المهنية والأعمال' : 'PROFESSIONAL NETWORKS'}
            </span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-lg font-bold text-white">
              <a 
                href={contact.behance} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#82E16B] transition-colors inline-flex items-center gap-1.5 group"
                title="Behance Portfolio"
              >
                <span>Behance</span>
                <ArrowUpRight className="w-4 h-4 text-[#82E16B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <span className="text-[#1A4031] font-normal">/</span>

              <a 
                href={contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#82E16B] transition-colors inline-flex items-center gap-1.5 group"
                title="LinkedIn Profile"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-[#82E16B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Clear Readable Font */}
        <div className="pt-8 sm:pt-10 border-t border-[#1A4031] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-base text-white/80 text-center sm:text-start" style={{ fontFamily: isAr ? '"Noto Sans Arabic", sans-serif' : 'inherit' }}>
          <div>
            © {new Date().getFullYear()} {name[lang] || name.ar} ({nickname[lang] || nickname.ar}). {isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
          </div>

          <div className="flex items-center gap-5 sm:gap-6">
            <span className="font-semibold">{isAr ? 'مصر / العاشر من رمضان' : 'Egypt / 10th Of Ramadan'}</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#82E16B] text-white transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
            >
              <ArrowUp className="w-4 h-4" />
              <span>{isAr ? 'لأعلى الصفحة' : 'Back to top'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
