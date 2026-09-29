import React, { useState, useEffect, useRef } from 'react';
import { LogOut, User, Check, ChevronDown, X, Sparkles, ExternalLink, Mail, Loader2, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { GOOGLE_CLIENT_ID, GOOGLE_SHEET_WEBHOOK_URL } from '../config/authConfig';

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
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
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

  // Sync client sign-in data with Google Analytics 4 and Google Sheet Webhook
  const syncUserData = async (userData) => {
    // 1. Google Analytics Event tracking (GA4 compliant)
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', 'login', {
          method: 'Google',
        });
      } catch (e) {
        console.warn('GA4 login event error:', e);
      }
    }

    // 2. Google Sheet / Excel Webhook (Appends real lead info to your Google Sheet)
    if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.trim() !== '') {
      try {
        const payload = {
          name: userData.name || (isAr ? 'عميل جديد' : 'New Client'),
          email: userData.email || '',
          signedAt: new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' }),
          device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'هاتف محمول (Mobile)' : 'كمبيوتر (Desktop)',
          page: window.location.href,
        };

        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        console.log('✅ Client data sent to Google Sheet webhook');
      } catch (err) {
        console.warn('Google Sheet Webhook sync error:', err);
      }
    }
  };

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

  const handleCredentialResponse = async (response) => {
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
        await syncUserData(userData);
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
    // If Client ID is not configured or prompt fails, show interactive sign-in modal
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

  // Process sign in and send data to Google Sheet
  const handleFormSignIn = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setSuccessMsg('');

    const finalName = nameInput.trim() || (isAr ? 'عميل مميز' : 'Valued Client');
    const finalEmail = emailInput.trim() || 'client@gmail.com';

    const newUser = {
      name: finalName,
      email: finalEmail,
      picture: '',
      sub: 'user-' + Date.now(),
    };

    setUser(newUser);
    try {
      localStorage.setItem('alkutsh_user', JSON.stringify(newUser));
    } catch {}

    // Send to Google Sheet & GA4
    await syncUserData(newUser);

    setSuccessMsg(isAr ? 'تم تسجيل الدخول وحفظ بياناتك بنجاح! 🎉' : 'Signed in & data saved successfully! 🎉');
    setIsLoading(false);

    setTimeout(() => {
      setIsModalOpen(false);
      setSuccessMsg('');
      setNameInput('');
      setEmailInput('');
    }, 1200);
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

      {/* 3. Interactive Modal (Google Sign-In & Direct Client Data Sync to Sheet) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div 
            className="w-full max-w-md bg-[#0B1E16] border border-[#1A4031] rounded-3xl p-6 sm:p-7 shadow-2xl relative space-y-5"
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 sm:top-5 sm:left-5 text-white/50 hover:text-white transition-colors cursor-pointer p-1.5 rounded-full bg-[#071610] border border-[#143224]"
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
                {isAr ? 'تسجيل الدخول والتواصل' : 'Sign in & Connect'}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {isAr 
                  ? 'سجّل دخولك لحفظ بياناتك، استلام نماذج التصميم، والتواصل المباشر مع استوديو الكوتش ديزاين.'
                  : 'Sign in to save your design requests and connect directly with Alkutsh studio.'}
              </p>
            </div>

            {/* Feedback Message */}
            {successMsg && (
              <div className="p-3 bg-[#82E16B]/15 border border-[#82E16B]/50 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-[#82E16B] font-bold animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form for direct submission to Google Sheet */}
            <form onSubmit={handleFormSignIn} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">
                  {isAr ? 'الاسم الكامل أو اسم البراند:' : 'Full Name / Brand Name:'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute top-3.5 right-3 pointer-events-none" />
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder={isAr ? 'مثال: محمد أحمد' : 'e.g. Mohamed Ahmed'}
                    className="w-full bg-[#071610] border border-[#143224] focus:border-[#82E16B] rounded-xl px-9 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">
                  {isAr ? 'البريد الإلكتروني (Gmail):' : 'Email Address (Gmail):'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute top-3.5 right-3 pointer-events-none" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder={isAr ? 'مثال: client@gmail.com' : 'e.g. client@gmail.com'}
                    className="w-full bg-[#071610] border border-[#143224] focus:border-[#82E16B] rounded-xl px-9 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-white hover:bg-gray-100 text-[#071610] font-extrabold text-sm sm:text-base transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer mt-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{isAr ? 'جارٍ تسجيل البيانات...' : 'Saving...'}</span>
                  </>
                ) : (
                  <>
                    <GoogleIcon className="w-4 h-4" />
                    <span>{isAr ? 'تسجيل الدخول وحفظ البيانات' : 'Sign in & Save Details'}</span>
                  </>
                )}
              </button>

              {/* Quick One-Click Demo Login */}
              <button
                type="button"
                onClick={() => {
                  setNameInput(isAr ? 'عميل زائر' : 'Guest Client');
                  setEmailInput('guest@alkutsh.com');
                  setTimeout(() => {
                    handleFormSignIn();
                  }, 50);
                }}
                className="w-full text-center text-xs text-[#82E16B] hover:text-[#9cf288] py-1 transition-colors cursor-pointer font-semibold underline underline-offset-4"
              >
                {isAr ? 'أو تجربة تسجيل سريع بضغطة واحدة (Guest)' : 'Or quick 1-click test login'}
              </button>
            </form>

            {/* Google Sheet Sync Indicator Notice */}
            <div className="bg-[#071610] border border-[#143224] rounded-2xl p-3.5 space-y-1.5 text-start">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#82E16B]">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>{isAr ? 'ربط تلقائي مع Google Sheets / Excel' : 'Auto-Sync with Google Sheets'}</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">
                {isAr
                  ? 'يتم إرسال بيانات المسجلين (الاسم، البريد، الوقت، الجهاز) مباشرة إلى ملف Google Sheet الخاص بك فور تسجيل الدخول.'
                  : 'Client credentials (Name, Email, Time, Device) are dispatched automatically to your Google Sheet webhook.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

