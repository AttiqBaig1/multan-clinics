import React, { useState, useEffect } from 'react';
import { OutreachMachine } from './components/generator/OutreachMachine';
import { DynamicClinicPage } from './components/generator/DynamicClinicPage';
import { ClinicTemplateData, MULTAN_PRESETS } from './data/multanTemplates';
import { ToastContainer } from './components/ui/ToastContainer';
import { Sparkles, Stethoscope, Sliders, Layers, RefreshCw, Zap, MessageCircle } from 'lucide-react';

export default function App() {
  const [activeData, setActiveData] = useState<ClinicTemplateData>(MULTAN_PRESETS[0]); // Default: Multan Dental Clinic
  const [isGeneratorMode, setIsGeneratorMode] = useState<boolean>(false);
  const [showStudioNav, setShowStudioNav] = useState<boolean>(true);

  useEffect(() => {
    const parseUrl = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '').trim();
      const params = new URLSearchParams(window.location.search);
      const isGithubPages = window.location.hostname.includes('github.io');
      const forceStudio = params.get('studio') === 'true' || params.get('admin') === 'true';

      // 1. Compact custom clinic hash parsing e.g. #c=...
      if (hash.startsWith('c=')) {
        try {
          const rawB64 = hash.replace('c=', '');
          const jsonStr = decodeURIComponent(atob(rawB64));
          const parsed = JSON.parse(jsonStr);

          const matchedPreset = MULTAN_PRESETS.find(p => p.niche === parsed.n) || MULTAN_PRESETS[0];
          const customData: ClinicTemplateData = {
            ...matchedPreset,
            niche: parsed.n || matchedPreset.niche,
            businessName: parsed.b || matchedPreset.businessName,
            tagline: parsed.t || matchedPreset.tagline,
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
          if (!forceStudio) setShowStudioNav(false);
          return;
        } catch (e) {
          console.error("Failed to parse compact hash", e);
        }
      }

      // 2. Clean preset hash e.g. #dental, #skin, #eye, #ortho, #cardio, #pet
      const matchedPresetByHash = MULTAN_PRESETS.find(p => p.niche.toLowerCase() === hash.toLowerCase());

      if (matchedPresetByHash) {
        setActiveData(matchedPresetByHash);
        if (!forceStudio) setShowStudioNav(false);
        return;
      }

      // 3. Fallback for query parameters or default GitHub Pages landing
      const isDemo = params.get('demo') === 'true';
      if ((isDemo || isGithubPages) && !forceStudio) {
        setShowStudioNav(false);
      } else if (forceStudio) {
        setShowStudioNav(true);
        setIsGeneratorMode(true);
      }

      if (isDemo || params.has('niche')) {
        const niche = (params.get('niche') || 'dental') as ClinicTemplateData['niche'];
        const matchedPreset = MULTAN_PRESETS.find(p => p.niche === niche) || MULTAN_PRESETS[0];

        const customData: ClinicTemplateData = {
          ...matchedPreset,
          businessName: params.get('name') || matchedPreset.businessName,
          tagline: params.get('tagline') || matchedPreset.tagline,
          doctorName: params.get('doctor') || matchedPreset.doctorName,
          doctorTitle: params.get('degree') || matchedPreset.doctorTitle,
          phone: params.get('phone') || matchedPreset.phone,
          whatsApp: params.get('wa') || matchedPreset.whatsApp,
          address: params.get('address') || matchedPreset.address,
          city: params.get('city') || matchedPreset.city,
          timings: params.get('timings') || matchedPreset.timings,
          consultationFee: params.get('fee') || matchedPreset.consultationFee
        };

        setActiveData(customData);
      }
    };

    parseUrl();
    window.addEventListener('hashchange', parseUrl);
    return () => window.removeEventListener('hashchange', parseUrl);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <ToastContainer />

      {/* Top Floating Control Bar - ONLY shown to Studio Owner (Hidden for Client Demos & Published Sites) */}
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
                onClick={() => setShowStudioNav(false)}
                title="Hide Studio Nav (Simulate Client View)"
                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-[10px] font-bold"
              >
                Hide
              </button>
            </div>

          </div>
        </nav>
      )}

      {/* Floating Studio Button when Nav is hidden */}
      {!showStudioNav && (
        <button
          onClick={() => {
            setShowStudioNav(true);
            setIsGeneratorMode(true);
          }}
          className="fixed bottom-5 right-5 z-50 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-slate-900 transition transform hover:scale-105 active:scale-95 text-xs"
          title="Open Clinic Generator Studio"
        >
          <Sliders className="w-4 h-4 text-slate-950" />
          <span>⚡ Open Generator Studio</span>
        </button>
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
