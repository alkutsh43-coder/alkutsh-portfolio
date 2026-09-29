import React, { useState, useEffect, useRef } from 'react';
import { LogOut, User, Check, ChevronDown, X, Sparkles, ExternalLink } from 'lucide-react';
import { GOOGLE_CLIENT_ID } from '../config/authConfig';

// Helper to decode JWT token from Google Identity Services
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const GoogleAuthButton = ({ lang, isMobile = false }) => {
  const isAr = lang === 'ar';
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('alkutsh_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize official Google Identity Services if client ID is configured
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    const loadGoogleScript = () => {
      if (window.google?.accounts?.id) {
        initGIS();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initGIS;
      document.body.appendChild(script);
    };

    const initGIS = () => {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
        });
      } catch (err) {
        console.error('GIS init error:', err);
      }
    };

    loadGoogleScript();
  }, []);

  const handleCredentialResponse = (response) => {
    if (response?.credential) {
      const payload = parseJwt(response.credential);
      if (payload) {
        const userData = {
          name: payload.name || payload.given_name || 'User',
          email: payload.email,
          picture: payload.picture,
          sub: payload.sub,
        };
        setUser(userData);
        try {
          localStorage.setItem('alkutsh_user', JSON.stringify(userData));
        } catch {}
        setIsModalOpen(false);
      }
    }
  };

  const handleSignInClick = () => {
    if (GOOGLE_CLIENT_ID && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.prompt();
        return;
      } catch (e) {
        console.warn('Google prompt fallback:', e);
      }
    }
    // If Client ID is not configured or prompt fails, show the interactive sign-in modal
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsDropdownOpen(false);
    try {
      localStorage.removeItem('alkutsh_user');
      if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch {}
  };

  // One-click interactive mock sign in for testing when Client ID is empty
  const handleSimulatedGoogleSignIn = (customEmail = '', customName = '') => {
    const mockUser = {
      name: customName || (isAr ? 'عميل مميز' : 'Valued Client'),
      email: customEmail || 'client@gmail.com',
      picture: 'https://lh3.googleusercontent.com/a/default-user',
      sub: 'mock-12345',
    };
    setUser(mockUser);
    try {
      localStorage.setItem('alkutsh_user', JSON.stringify(mockUser));
    } catch {}
    setIsModalOpen(false);
  };

  // Google SVG Icon (4 Colors)
  const GoogleIcon = ({ className = "w-4 h-4" }) => (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.28-2.1 3.64-5.18 3.64-9.14z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.26v3.15C3.25 21.36 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.32 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.26A11.95 11.95 0 0 0 0 12c0 1.92.45 3.74 1.26 5.42l4.06-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.64 1.26 6.58l4.06 3.15c.94-2.83 3.58-4.98 6.68-4.98z"
      />
    </svg>
  );

  return (
    <div className="relative inline-block text-start" ref={dropdownRef} dir={isAr ? 'rtl' : 'ltr'}>
      {/* 1. When NOT logged in: Google Sign In Pill Button */}
      {!user ? (
        <button
          onClick={handleSignInClick}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/40 hover:border-[#82E16B] bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer select-none ${
            isMobile ? 'w-full justify-center py-2.5' : ''
          }`}
          style={{ fontFamily: isAr ? '"Noto Sans Arabic", "Cairo", sans-serif' : 'sans-serif' }}
          title={isAr ? 'تسجيل الدخول باستخدام Google' : 'Sign in with Google'}
        >
          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5">
            <GoogleIcon className="w-3.5 h-3.5" />
          </div>
          <span>{isAr ? 'تسجيل الدخول بجوجل' : 'Sign in with Google'}</span>
        </button>
      ) : (
        /* 2. When Logged in: User Avatar & Name Pill */
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#82E16B]/60 hover:border-[#82E16B] bg-[#0B1E16] hover:bg-[#0D281E] text-white text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer select-none ${
              isMobile ? 'w-full justify-between' : ''
            }`}
            style={{ fontFamily: isAr ? '"Noto Sans Arabic", "Cairo", sans-serif' : 'sans-serif' }}
          >
            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover border border-[#82E16B]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-[#82E16B] text-[#071610] text-[10px] font-black flex items-center justify-center">
                {user.name?.charAt(0) || 'U'}
              </div>
            )}
            <span className="max-w-[120px] truncate text-white">
              {user.name}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#82E16B] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div 
              className={`absolute mt-2 w-64 bg-[#071610] border border-[#1A4031] rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn ${
                isAr ? 'left-0 sm:right-auto' : 'right-0 sm:left-auto'
              }`}
            >
              <div className="space-y-3">
                {/* Profile Header */}
                <div className="flex items-center gap-3 border-b border-[#143224] pb-3">
                  <div className="w-10 h-10 rounded-full bg-[#82E16B]/20 border border-[#82E16B] flex items-center justify-center text-[#82E16B] font-bold">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-white/60 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0B1E16] border border-[#143224] text-[11px] text-[#82E16B] font-medium">
                  <GoogleIcon className="w-3 h-3 flex-shrink-0" />
                  <span>{isAr ? 'حساب Google متصل' : 'Connected with Google'}</span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold transition-colors cursor-pointer border border-red-500/20"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تسجيل الخروج' : 'Sign out'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Interactive Modal (For Google Sign-In Setup & Instant Login) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div 
            className="w-full max-w-md bg-[#0B1E16] border border-[#1A4031] rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 sm:top-5 sm:left-5 text-white/50 hover:text-white transition-colors cursor-pointer p-1 rounded-full bg-[#071610]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 text-start">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-md">
                <GoogleIcon className="w-7 h-7" />
              </div>
              <h3 
                className="text-xl sm:text-2xl font-black text-white"
                style={{ fontFamily: isAr ? '"Zain Length 1", "Cairo", sans-serif' : 'inherit' }}
              >
                {isAr ? 'تسجيل الدخول بحساب Google' : 'Sign in with Google'}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {isAr 
                  ? 'سجّل دخولك لحفظ مشروعاتك، متابعة حالة طلبات التصميم، والتواصل المباشر مع استوديو الكوتش ديزاين.'
                  : 'Sign in to save your design projects, track progress, and communicate directly with Alkutsh studio.'}
              </p>
            </div>

            {/* Sign in Action Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleSimulatedGoogleSignIn()}
                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white hover:bg-gray-100 text-[#071610] font-extrabold text-sm sm:text-base transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <GoogleIcon className="w-5 h-5" />
                <span>{isAr ? 'المتابعة بحساب Google' : 'Continue with Google'}</span>
              </button>
            </div>

            {/* Google Cloud Client ID Notice / Info */}
            <div className="bg-[#071610] border border-[#143224] rounded-2xl p-3.5 space-y-1.5 text-start">
              <span className="text-[11px] font-mono text-[#82E16B] font-bold block">
                // {isAr ? 'ملاحظة المطورين (Google OAuth)' : 'Developer Notice'}
              </span>
              <p className="text-[11px] text-white/60 leading-relaxed">
                {isAr
                  ? 'لتفعيل نافذة جوجل الرسمية المنبثقة مباشرة، يمكنك وضع المعرّف (Client ID) داخل ملف: src/config/authConfig.js'
                  : 'To enable Google’s live production popup, paste your Client ID in src/config/authConfig.js'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
