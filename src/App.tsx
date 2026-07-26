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
    // Check URL parameters
    const params = new URLSearchParams(window.location.search);
    const isDemo = params.get('demo') === 'true';
    const isClient = params.get('client') === 'true';
    const forceStudio = params.get('studio') === 'true' || params.get('admin') === 'true';
    const isGithubPages = window.location.hostname.includes('github.io');

    // If client link or github pages demo or demo=true, hide studio nav unless explicitly forced via ?studio=true
    if ((isDemo || isClient || isGithubPages) && !forceStudio) {
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

    // Keyboard shortcut (Ctrl + Shift + S) to toggle studio mode secretly anytime!
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        setShowStudioNav(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
