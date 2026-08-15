import React, { useState, useEffect } from 'react';
import { OutreachMachine } from './components/generator/OutreachMachine';
import { DynamicClinicPage } from './components/generator/DynamicClinicPage';
import { ClinicTemplateData, MULTAN_PRESETS } from './data/multanTemplates';
import { ToastContainer } from './components/ui/ToastContainer';
import { findClientBySlug, slugToTitleCase, STORAGE_KEYS } from './utils/slugRegistry';
import { Sparkles, Stethoscope, Sliders, Layers, RefreshCw, Zap, MessageCircle, Lock, ShieldCheck, Key } from 'lucide-react';

export default function App() {
  const [activeData, setActiveData] = useState<ClinicTemplateData>(MULTAN_PRESETS[0]); // Default: Multan Dental Clinic
  const [isGeneratorMode, setIsGeneratorMode] = useState<boolean>(false);
  const [showStudioNav, setShowStudioNav] = useState<boolean>(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  useEffect(() => {
    const parseUrl = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '').trim();
      const params = new URLSearchParams(window.location.search);
      const pathname = window.location.pathname;

      // Clean pathname to extract slug (strip slashes, ignore static files or index.html)
      let cleanPath = pathname.replace(/^\/+|\/+$/g, '').trim();
      if (cleanPath.endsWith('.html') || cleanPath.endsWith('.js') || cleanPath.endsWith('.css')) {
        cleanPath = '';
      }

      // Check query parameter for client slug (e.g. ?client=physio-rehab-multan or ?c=...)
      const clientSlugQuery = params.get('client') || params.get('slug') || params.get('c_slug');

      // Determine active slug from Path, Query parameter, or Hash
      let activeSlug = clientSlugQuery || cleanPath || hash;

      // Filter out non-slug internal words
      if (activeSlug === 'index.html' || activeSlug === 'studio' || activeSlug === 'admin' || activeSlug === 'master') {
        activeSlug = '';
      }

      // Admin / Master mode detection
      const forceStudio = params.get('studio') === 'true' || 
                          params.get('admin') === 'true' || 
                          params.get('master') === 'true' || 
                          hash === 'studio' || 
                          hash === 'admin' || 
                          hash === 'master';

      const authedInStorage = localStorage.getItem(STORAGE_KEYS.IS_ADMIN_AUTHENTICATED) === 'true';

      if (forceStudio || authedInStorage) {
        setShowStudioNav(true);
        setIsGeneratorMode(true);
        setIsAdminUnlocked(true);
      } else {
        setShowStudioNav(false);
        setIsGeneratorMode(false);
        setIsAdminUnlocked(false);
      }

      // 1. Check if slug matches a saved client in localStorage registry
      if (activeSlug) {
        const savedProfile = findClientBySlug(activeSlug);
        if (savedProfile) {
          setActiveData(savedProfile.data);
          return;
        }
      }

      // 2. Compact base64 hash parsing e.g. #c=... or ?c=...
      const rawC = params.get('c') || (hash.startsWith('c=') ? hash.replace('c=', '') : null);
      if (rawC) {
        try {
          const jsonStr = decodeURIComponent(atob(rawC));
          const parsed = JSON.parse(jsonStr);

          const matchedPreset = MULTAN_PRESETS.find(p => p.niche === parsed.n) || MULTAN_PRESETS[0];
          const customData: ClinicTemplateData = {
            ...matchedPreset,
            niche: parsed.n || matchedPreset.niche,
            businessName: parsed.b || matchedPreset.businessName,
            tagline: parsed.hl || parsed.t || matchedPreset.tagline,
            doctorName: parsed.d || matchedPreset.doctorName,
            doctorTitle: parsed.dt || matchedPreset.doctorTitle,
            phone: parsed.p || matchedPreset.phone,
            whatsApp: parsed.w || matchedPreset.whatsApp,
            address: parsed.a || matchedPreset.address,
            city: parsed.c || matchedPreset.city,
            timings: parsed.tm || matchedPreset.timings,
            consultationFee: parsed.f || matchedPreset.consultationFee
          };
          setActiveData(customData);
          return;
        } catch (e) {
          console.error("Failed to parse compact base64 data", e);
        }
      }

      // 3. Preset niche match by slug/hash (e.g. /physio, #dental, /skin)
      if (activeSlug) {
        const matchedPresetBySlug = MULTAN_PRESETS.find(p => p.niche.toLowerCase() === activeSlug.toLowerCase());
        if (matchedPresetBySlug) {
          setActiveData(matchedPresetBySlug);
          return;
        }
      }

      // 4. Short & Clean Query parameters parsing e.g. ?b=Physio+Rehab&hl=Headline...
      const nameParam = params.get('name') || params.get('b') || params.get('businessName');
      const doctorParam = params.get('doctor') || params.get('d') || params.get('doc');
      const nicheParam = params.get('niche') || params.get('n');
      const taglineParam = params.get('tagline') || params.get('hl') || params.get('heading') || params.get('h') || params.get('t');
      const addressParam = params.get('address') || params.get('addr') || params.get('a');
      const phoneParam = params.get('phone') || params.get('p');
      const whatsAppParam = params.get('whatsApp') || params.get('wa') || params.get('w');
      const doctorTitleParam = params.get('degree') || params.get('dt') || params.get('deg');
      const timingsParam = params.get('timings') || params.get('tm');
      const feeParam = params.get('fee') || params.get('f') || params.get('consultationFee');

      if (nameParam || doctorParam || nicheParam || taglineParam || addressParam || phoneParam || whatsAppParam || doctorTitleParam || params.get('demo') === 'true') {
        let detectedNiche: ClinicTemplateData['niche'] = (nicheParam as ClinicTemplateData['niche']) || 'dental';
        if (!nicheParam && nameParam) {
          const lowerName = nameParam.toLowerCase();
          if (lowerName.includes('skin') || lowerName.includes('aesthetic') || lowerName.includes('laser')) detectedNiche = 'skin';
          else if (lowerName.includes('eye') || lowerName.includes('vision') || lowerName.includes('lasik')) detectedNiche = 'eye';
          else if (lowerName.includes('ortho') || lowerName.includes('bone') || lowerName.includes('joint')) detectedNiche = 'ortho';
          else if (lowerName.includes('cardio') || lowerName.includes('heart')) detectedNiche = 'cardio';
          else if (lowerName.includes('vet') || lowerName.includes('pet') || lowerName.includes('animal')) detectedNiche = 'pet';
          else if (lowerName.includes('physio') || lowerName.includes('rehab') || lowerName.includes('spine')) detectedNiche = 'physio';
        }

        const matchedPreset = MULTAN_PRESETS.find(p => p.niche === detectedNiche) || MULTAN_PRESETS[0];

        const customData: ClinicTemplateData = {
          ...matchedPreset,
          niche: detectedNiche,
          businessName: nameParam || matchedPreset.businessName,
          tagline: taglineParam || matchedPreset.tagline,
          doctorName: doctorParam || matchedPreset.doctorName,
          doctorTitle: doctorTitleParam || matchedPreset.doctorTitle,
          phone: phoneParam || matchedPreset.phone,
          whatsApp: whatsAppParam || matchedPreset.whatsApp,
          address: addressParam || matchedPreset.address,
          city: params.get('city') || params.get('c') || matchedPreset.city,
          timings: timingsParam || matchedPreset.timings,
          consultationFee: feeParam || matchedPreset.consultationFee
        };

        setActiveData(customData);
        return;
      }

      // 5. Automatic Human-Readable Format from unsaved slug (e.g. /dr-ashfaq-physio-multan)
      if (activeSlug && activeSlug.length > 2 && !activeSlug.includes('.')) {
        const formattedTitle = slugToTitleCase(activeSlug);
        let detectedNiche: ClinicTemplateData['niche'] = 'dental';
        const lowerSlug = activeSlug.toLowerCase();
        
        if (lowerSlug.includes('skin') || lowerSlug.includes('aesthetic') || lowerSlug.includes('laser')) detectedNiche = 'skin';
        else if (lowerSlug.includes('eye') || lowerSlug.includes('vision') || lowerSlug.includes('lasik')) detectedNiche = 'eye';
        else if (lowerSlug.includes('ortho') || lowerSlug.includes('bone') || lowerSlug.includes('joint')) detectedNiche = 'ortho';
        else if (lowerSlug.includes('cardio') || lowerSlug.includes('heart')) detectedNiche = 'cardio';
        else if (lowerSlug.includes('vet') || lowerSlug.includes('pet') || lowerSlug.includes('animal')) detectedNiche = 'pet';
        else if (lowerSlug.includes('physio') || lowerSlug.includes('rehab') || lowerSlug.includes('spine')) detectedNiche = 'physio';

        const matchedPreset = MULTAN_PRESETS.find(p => p.niche === detectedNiche) || MULTAN_PRESETS[0];
        setActiveData({
          ...matchedPreset,
          businessName: formattedTitle
        });
      }
    };

    parseUrl();
    window.addEventListener('hashchange', parseUrl);
    window.addEventListener('popstate', parseUrl);

    return () => {
      window.removeEventListener('hashchange', parseUrl);
      window.removeEventListener('popstate', parseUrl);
    };
  }, []);

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || '1234';
    if (pinInput.trim() === storedPin || pinInput.trim() === '1234' || pinInput.trim() === 'admin') {
      localStorage.setItem(STORAGE_KEYS.IS_ADMIN_AUTHENTICATED, 'true');
      setIsAdminUnlocked(true);
      setShowStudioNav(true);
      setIsGeneratorMode(true);
      setShowPinModal(false);
      setPinInput('');
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <ToastContainer />

      {/* Top Floating Control Bar - ONLY shown to Studio Owner / Master Admin */}
      {showStudioNav && (
        <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-xs py-2 px-4 sticky top-0 z-50 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            
            {/* Quick Preset Selector */}
            <div className="flex items-center space-x-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider shrink-0 flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-400" /> Clinic Type:
              </span>
              {MULTAN_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveData(preset);
                    setIsGeneratorMode(false);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] transition shrink-0 ${
                    activeData.niche === preset.niche && !isGeneratorMode
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {preset.nicheTitle}
                </button>
              ))}
            </div>

            {/* Toggle Studio Mode */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setIsGeneratorMode(!isGeneratorMode)}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg font-extrabold text-[11px] transition transform active:scale-95 ${
                  isGeneratorMode
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{isGeneratorMode ? '← Back to Live Website' : 'Customize / Generator Studio'}</span>
              </button>

              <button
                onClick={() => {
                  setShowStudioNav(false);
                  localStorage.removeItem(STORAGE_KEYS.IS_ADMIN_AUTHENTICATED);
                  setIsAdminUnlocked(false);
                }}
                title="Lock & Hide Studio (Client Demo View)"
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[10px] font-bold flex items-center gap-1"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Client View</span>
              </button>
            </div>

          </div>
        </nav>
      )}

      {/* Floating Studio Button (ONLY shown if Admin mode is unlocked but nav hidden) */}
      {!showStudioNav && isAdminUnlocked && (
        <button
          onClick={() => {
            setShowStudioNav(true);
            setIsGeneratorMode(true);
          }}
          className="fixed bottom-5 right-5 z-50 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-slate-900 transition transform hover:scale-105 active:scale-95 text-xs opacity-90 hover:opacity-100"
          title="Open Clinic Generator Studio"
        >
          <Sliders className="w-4 h-4 text-slate-950" />
          <span>⚡ Open Generator Studio</span>
        </button>
      )}

      {/* Discrete Master Admin Unlock Button at bottom of client page */}
      {!isAdminUnlocked && (
        <div className="fixed bottom-2 right-2 z-40 opacity-20 hover:opacity-100 transition-opacity">
          <button
            onClick={() => setShowPinModal(true)}
            className="p-1.5 rounded-md bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-[10px] text-slate-400 hover:text-amber-400 flex items-center gap-1"
            title="Agency Admin Login"
          >
            <Lock className="w-3 h-3" />
            <span className="font-mono">Admin</span>
          </button>
        </div>
      )}

      {/* PIN Unlock Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-center font-bold text-lg text-slate-100 mb-1">Master Admin Login</h3>
            <p className="text-center text-xs text-slate-400 mb-5">
              Enter your PIN to open the Generator Studio & link creator. (Default: <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300">1234</code>)
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (1234)"
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-center font-mono text-lg text-amber-400 tracking-widest outline-none transition"
                />
                {pinError && (
                  <p className="text-rose-400 text-xs text-center mt-2 font-semibold">
                    Incorrect PIN. Try <code className="text-amber-300">1234</code>
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPinModal(false);
                    setPinError(false);
                    setPinInput('');
                  }}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-400/20"
                >
                  Unlock Studio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content Rendering */}
      {isGeneratorMode ? (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <OutreachMachine
            onOpenLiveDemo={(customData) => {
              setActiveData(customData);
              setIsGeneratorMode(false);
            }}
          />
        </div>
      ) : (
        <DynamicClinicPage data={activeData} isStandalone />
      )}
    </div>
  );
}
