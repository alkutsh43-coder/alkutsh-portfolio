import React, { useState, useEffect, useRef } from 'react';
import { LogOut, User, Check, ChevronDown, X, Sparkles, ExternalLink, KeyRound, CheckCircle2, FileSpreadsheet, AlertCircle } from 'lucide-react';
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

  // Read saved user session
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('alkutsh_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Client ID (from config or saved locally for instant live testing)
  const [clientId, setClientId] = useState(() => {
    return GOOGLE_CLIENT_ID || localStorage.getItem('alkutsh_google_client_id') || '';
  });

  const [inputClientId, setInputClientId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGisReady, setIsGisReady] = useState(false);
  const [authError, setAuthError] = useState('');

  const dropdownRef = useRef(null);
  const officialGoogleBtnRef = useRef(null);

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

  // Sync real authenticated user data to Google Sheets & GA4
  const syncUserData = async (userData) => {
    // 1. Google Analytics Event tracking
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', 'login', {
          method: 'Google',
        });
      } catch (e) {
        console.warn('GA4 login event error:', e);
      }
    }

    // 2. Google Sheet / Excel Webhook
    if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.trim() !== '') {
      try {
        const payload = {
          name: userData.name || '',
          email: userData.email || '',
          picture: userData.picture || '',
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
        console.log('✅ Real client data dispatched to Google Sheet webhook');
      } catch (err) {
        console.warn('Google Sheet Webhook sync error:', err);
      }
    }
  };

  // Google credential callback (receives real Google user data)
  const handleCredentialResponse = async (response) => {
    if (response?.credential) {
      const payload = parseJwt(response.credential);
      if (payload) {
        const realUserData = {
          name: payload.name || payload.given_name || 'Google User',
          email: payload.email,
          picture: payload.picture,
          sub: payload.sub,
        };
        setUser(realUserData);
        try {
          localStorage.setItem('alkutsh_user', JSON.stringify(realUserData));
        } catch {}
        await syncUserData(realUserData);
        setIsModalOpen(false);
      }
    }
  };

  // Initialize official Google Identity Services whenever clientId is available
  useEffect(() => {
    if (!clientId) {
      setIsGisReady(false);
      return;
    }

    const initGIS = () => {
      if (!window.google?.accounts?.id) return;
      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        setIsGisReady(true);

        // Mount the official Google button if container exists
        if (officialGoogleBtnRef.current) {
          officialGoogleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(officialGoogleBtnRef.current, {
            theme: 'filled_blue',
            size: 'large',
            text: 'signin_with',
            shape: 'pill',
            width: 280,
            logo_alignment: 'left',
          });
        }
      } catch (err) {
        console.error('GIS initialization error:', err);
        setAuthError(err.message || 'Error initializing Google sign-in');
      }
    };

    if (window.google?.accounts?.id) {
      initGIS();
    } else {
      // Check every 200ms until script loads
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          initGIS();
        }
      }, 200);
      return () => clearInterval(timer);
    }
  }, [clientId, isModalOpen]);

  // Handle click on top navbar sign in button
  const handleSignInClick = () => {
    if (clientId && window.google?.accounts?.id) {
      try {
        // Trigger Google One-Tap or open official sign in modal
        window.google.accounts.id.prompt();
      } catch (e) {
        console.warn('GIS prompt error:', e);
      }
    }
    // Always open modal to ensure official Google button is directly clickable
    setIsModalOpen(true);
  };

  // Logout
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

  // Save manual Client ID if entered by user
  const handleSaveClientId = (e) => {
    e.preventDefault();
    if (!inputClientId.trim()) return;
    const cleanId = inputClientId.trim();
    setClientId(cleanId);
    try {
      localStorage.setItem('alkutsh_google_client_id', cleanId);
    } catch {}
    setInputClientId('');
    setAuthError('');
  };

  // Google 4-Color SVG Icon
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
          title={isAr ? 'تسجيل الدخول الحقيقي بحساب Google' : 'Sign in with Google'}
        >
          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center p-0.5">
            <GoogleIcon className="w-3.5 h-3.5" />
          </div>
          <span>{isAr ? 'تسجيل الدخول بجوجل' : 'Sign in with Google'}</span>
        </button>
      ) : (
        /* 2. When Logged in: User Real Profile & Name */
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
                referrerPolicy="no-referrer"
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
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-[#82E16B]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#82E16B]/20 border border-[#82E16B] flex items-center justify-center text-[#82E16B] font-bold">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div className="space-y-0.5 overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{user.name}</p>
                    <p className="text-xs text-white/60 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0B1E16] border border-[#143224] text-[11px] text-[#82E16B] font-medium">
                  <GoogleIcon className="w-3 h-3 flex-shrink-0" />
                  <span>{isAr ? 'حساب Google حقيقي متصل' : 'Verified Google Account'}</span>
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

      {/* 3. Official Google Sign-In Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
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
                {isAr ? 'تسجيل الدخول الحقيقي بحساب Google' : 'Sign in with Google'}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                {isAr 
                  ? 'اختر حسابك الرسمي في Google بضغطة زر واحدة بدون كتابة أي بيانات يدوياً.'
                  : 'Select your verified Google account with a single click — no manual typing required.'}
              </p>
            </div>

            {/* CASE 1: When Client ID is ACTIVE -> Show Official Google Rendered Button */}
            {clientId ? (
              <div className="space-y-4 py-3 flex flex-col items-center justify-center">
                <div className="w-full flex justify-center py-2" ref={officialGoogleBtnRef}>
                  {/* Official Google Button renders here */}
                </div>

                <div className="flex items-center gap-2 text-xs text-[#82E16B] bg-[#071610] border border-[#143224] px-3 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{isAr ? 'نافذة جوجل الرسمية جاهزة ومفعلة' : 'Official Google Sign-in Ready'}</span>
                </div>
              </div>
            ) : (
              /* CASE 2: When Client ID is NOT yet set -> Explain the requirement and allow 1-click paste */
              <div className="space-y-4 pt-1">
                <div className="bg-[#071610] border border-amber-500/30 rounded-2xl p-4 space-y-2.5 text-start">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{isAr ? 'لتشغيل نافذة جوجل الحقيقية المنبثقة:' : 'To enable real Google popup:'}</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {isAr
                      ? 'تفرض شركة Google شرطاً أمنياً إلزاميًا: أن يكون لدى الموقع معرّف رسمي مجاني (Google Client ID) حتى تفتح لك نافذة اختيار حساباتك بدون كتابة.'
                      : 'Google strictly requires a registered free Google Client ID to open the official account chooser.'}
                  </p>
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#82E16B] hover:text-[#9cf288] font-bold underline underline-offset-4"
                  >
                    <span>{isAr ? 'إنشاء المعرّف مجاناً في دقيقتين من Google Cloud' : 'Create free Client ID on Google Cloud'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Instant paste & test field */}
                <form onSubmit={handleSaveClientId} className="space-y-2">
                  <label className="block text-xs font-bold text-white/80">
                    {isAr ? 'إذا كان لديك المعرّف، الصقه هنا لتفعيله فوراً:' : 'Paste your Client ID here to activate:'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputClientId}
                      onChange={(e) => setInputClientId(e.target.value)}
                      placeholder="xxxxxxxx.apps.googleusercontent.com"
                      className="flex-1 bg-[#071610] border border-[#143224] focus:border-[#82E16B] rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#82E16B] hover:bg-[#9cf288] text-[#071610] font-bold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap"
                    >
                      {isAr ? 'تفعيل الآن' : 'Activate'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Automatic Google Sheet Sync Note */}
            <div className="bg-[#071610] border border-[#143224] rounded-2xl p-3.5 space-y-1 text-start">
              <div className="flex items-center gap-2 text-[11px] font-bold text-[#82E16B]">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>{isAr ? 'ربط مباشر مع شيت الإكسل (Google Sheets)' : 'Direct Sync to Google Sheets'}</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">
                {isAr
                  ? 'بمجرد اختيار العميل لحسابه الحقيقي في جوجل، يتم سحب اسمه وإيميله تلقائياً وتسجيلهما فوراً في شيت الإكسل الخاص بك.'
                  : 'Once a client selects their Google account, their verified name and email are logged automatically to your Sheet.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
