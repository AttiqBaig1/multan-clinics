import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  Share2, 
  MessageCircle, 
  FileCode, 
  Globe, 
  Settings, 
  Eye, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Building2, 
  Stethoscope, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  DollarSign, 
  Code,
  Zap,
  ChevronRight
} from 'lucide-react';
import { MULTAN_PRESETS, ClinicTemplateData } from '../../data/presets';
import { DynamicClinicPage } from './DynamicClinicPage';

interface OutreachMachineProps {
  onOpenLiveDemo?: (data: ClinicTemplateData) => void;
}

export const OutreachMachine: React.FC<OutreachMachineProps> = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  const [formData, setFormData] = useState<ClinicTemplateData>(MULTAN_PRESETS[0]);
  const [activeTab, setActiveTab] = useState<'preview' | 'url' | 'pitch' | 'github'>('preview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedShortLink, setCopiedShortLink] = useState(false);
  const [customDomainName, setCustomDomainName] = useState('alshafi-dental-multan');
  const [githubPagesBaseUrl, setGithubPagesBaseUrl] = useState<string>('https://attiqbaig1.github.io/multan-clinics/');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [isShortening, setIsShortening] = useState<boolean>(false);
  const [useShortLinkInPitch, setUseShortLinkInPitch] = useState<boolean>(true);

  // Handle selecting a preset
  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setFormData(MULTAN_PRESETS[index]);
    setCustomDomainName(
      MULTAN_PRESETS[index].businessName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    );
  };

  // Update form fields
  const handleChange = (field: keyof ClinicTemplateData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Add a service
  const handleAddService = () => {
    setFormData(prev => ({
      ...prev,
      services: [
        ...prev.services,
        { title: 'New Treatment Service', desc: 'High quality clinical treatment procedure in Multan.', icon: 'Sparkles', price: 'Rs. 3,000' }
      ]
    }));
  };

  // Remove service
  const handleRemoveService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  // Update service detail
  const handleUpdateService = (index: number, key: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) => (i === index ? { ...s, [key]: val } : s))
    }));
  };

  // Get sanitized base URL ensuring /multan-clinics/ is always present for GitHub Pages
  const getSanitizedBaseUrl = () => {
    if (window.location.hostname.includes('github.io')) {
      const pathname = window.location.pathname;
      let cleanPath = pathname.endsWith('/') ? pathname : pathname + '/';
      if (!cleanPath.includes('multan-clinics')) {
        cleanPath = '/multan-clinics/';
      }
      return `${window.location.origin}${cleanPath}`;
    }

    let base = githubPagesBaseUrl.trim();
    if (!base) {
      base = 'https://attiqbaig1.github.io/multan-clinics/';
    }
    if (!base.startsWith('http://') && !base.startsWith('https://')) {
      base = 'https://' + base;
    }
    if (base.includes('github.io') && !base.includes('multan-clinics')) {
      base = base.replace(/\/$/, '') + '/multan-clinics/';
    }
    if (!base.endsWith('/')) {
      base += '/';
    }
    return base;
  };

  // Generate Dynamic Query or Hash URL for clean sharing
  const generateDynamicUrl = () => {
    const baseUrl = getSanitizedBaseUrl();

    const defaultPreset = MULTAN_PRESETS.find(p => p.niche === formData.niche);
    const isExactPreset = defaultPreset && (
      formData.businessName === defaultPreset.businessName &&
      formData.doctorName === defaultPreset.doctorName &&
      formData.phone === defaultPreset.phone
    );

    if (isExactPreset) {
      return `${baseUrl}#${formData.niche}`;
    }

    const params = new URLSearchParams();
    params.set('demo', 'true');
    params.set('niche', formData.niche);
    params.set('name', formData.businessName);
    params.set('tagline', formData.tagline);
    params.set('doctor', formData.doctorName);
    params.set('degree', formData.doctorTitle);
    params.set('phone', formData.phone);
    params.set('wa', formData.whatsApp);
    params.set('address', formData.address);
    params.set('city', formData.city);
    params.set('timings', formData.timings);
    params.set('fee', formData.consultationFee);

    return `${baseUrl}?${params.toString()}`;
  };

  const dynamicUrl = generateDynamicUrl();

  // Function to automatically shorten long URLs using TinyURL API
  const shortenToTinyUrl = async (longUrl: string) => {
    if (!longUrl) return;
    setIsShortening(true);

    try {
      const tinyApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;
      
      let res = await fetch(`https://corsproxy.io/?${encodeURIComponent(tinyApi)}`).catch(() => null);
      if (!res || !res.ok) {
        res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(tinyApi)}`).catch(() => null);
      }
      if (!res || !res.ok) {
        res = await fetch(tinyApi, { mode: 'cors' }).catch(() => null);
      }

      if (res && res.ok) {
        const text = await res.text();
        if (text && text.trim().startsWith('http')) {
          setShortUrl(text.trim());
          setIsShortening(false);
          return text.trim();
        }
      }
    } catch (err) {
      console.warn('TinyURL shorten error:', err);
    }

    setIsShortening(false);
  };

  // Debounced auto-shorten on form/url change
  useEffect(() => {
    const timer = setTimeout(() => {
      shortenToTinyUrl(dynamicUrl);
    }, 500);
    return () => clearTimeout(timer);
  }, [dynamicUrl]);

  // Active URL to embed in pitch script
  const activePitchUrl = (useShortLinkInPitch && shortUrl) ? shortUrl : dynamicUrl;

  // Generate WhatsApp Roman Urdu Pitch Script
  const generatePitchScript = () => {
    if (formData.niche === 'ortho') {
      return `Assalam-o-Alaikum ${formData.doctorName}! 👋

Main ne ${formData.businessName} (${formData.address}, ${formData.city}) ke liye ek modern, high-converting orthopedic & joint replacement clinic website demo tayar kiya hai.

Is website ke zariye aap ke patients:
✅ Knee replacement, spine pain relief & fracture surgery packages check kar saktay hain
✅ Direct WhatsApp priority OPD appointment book kar saktay hain
✅ Digital X-Ray & UK trained specialist profile dekh saktay hain

📌 Aap ke orthopedic center ka website demo yahan se dekhein:
${activePitchUrl}

Agar aap ko yeh design pasand aye to hum is ko 1 hour ke andar live kar saktay hain!

Regards,
Web & Digital Lead Consultant
WhatsApp: ${formData.phone}`;
    }

    if (formData.niche === 'skin') {
      return `Assalam-o-Alaikum ${formData.doctorName}! 👋

Main ne ${formData.businessName} (${formData.address}, ${formData.city}) ke liye ek luxury skin aesthetics, Hydrafacial & laser clinic website demo tayar kiya hai.

Is website ke zariye aap ke patients:
✅ Hydrafacial MD, Laser Hair Removal & PRP treatment charges check kar saktay hain
✅ Private aesthetic consultation Direct WhatsApp pe book kar saktay hain
✅ Female aesthetic suite & consultant profile dekh saktay hain

📌 Aap ka skin clinic demo yahan se dekhein:
${activePitchUrl}

Agar aap ko yeh design pasand aye to hum is ko aap ke custom domain pe 1 hour ke andar live kar saktay hain!

Regards,
Web & Digital Lead Consultant
WhatsApp: ${formData.phone}`;
    }

    return `Assalam-o-Alaikum ${formData.doctorName}! 👋

Main ne ${formData.businessName} (${formData.address}, ${formData.city}) ke liye ek modern, high-converting website demo tayar kiya hai.

Is website ke zariye aap ke patients Direct WhatsApp pe appointment book kar saktay hain, treatment prices dekh saktay hain aur clinic timing check kar saktay hain.

📌 Aap ka website demo yahan se dekhein:
${activePitchUrl}

Agar aap ko yeh design pasand aye to hum is ko aap ke custom domain pe 1 hour ke andar live kar saktay hain!

Regards,
Web & Digital Lead Consultant
WhatsApp: ${formData.phone}`;
  };

  const pitchScript = generatePitchScript();

  const handleCopy = (text: string, type: 'link' | 'code' | 'pitch' | 'short') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (type === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else if (type === 'pitch') {
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2000);
    } else if (type === 'short') {
      setCopiedShortLink(true);
      setTimeout(() => setCopiedShortLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Dynamic Multan Outreach Machine v3.0</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Multan Clinics 1-Click Generator & Shortener
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              Instant custom URLs, auto TinyURL links, and personalized WhatsApp pitch scripts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === 'preview' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === 'url' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Generated Links</span>
            </button>
            <button
              onClick={() => setActiveTab('pitch')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                activeTab === 'pitch' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Pitch</span>
            </button>
          </div>
        </div>

        {/* TAB 2: Generated Links */}
        {activeTab === 'url' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-300">
                  ⚡ Your Generated Live URL ({formData.businessName})
                </label>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                  Auto-Updated Live
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  readOnly
                  value={dynamicUrl}
                  className="w-full bg-slate-900 border border-slate-700 text-amber-300 px-3 py-2.5 rounded-lg text-xs font-mono select-all focus:outline-none"
                />
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy(dynamicUrl, 'link')}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1 shrink-0"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <a
                    href={dynamicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg flex items-center space-x-1 shrink-0"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Test Live Site</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Auto-Shortened TinyURL Box */}
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-950 p-4 rounded-xl border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>✨ Instant Short Link (TinyURL)</span>
                </label>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                  WhatsApp Ready
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  readOnly
                  value={isShortening ? 'Auto-generating short link...' : (shortUrl || 'Click shorten to create TinyURL')}
                  className="w-full bg-slate-900 border border-amber-500/40 text-emerald-400 px-3 py-2.5 rounded-lg text-xs font-mono font-bold select-all focus:outline-none"
                />
                <div className="flex gap-2 shrink-0">
                  {shortUrl ? (
                    <>
                      <button
                        onClick={() => handleCopy(shortUrl, 'short')}
                        className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1 shrink-0"
                      >
                        {copiedShortLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedShortLink ? 'Copied!' : 'Copy Short Link'}</span>
                      </button>
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-lg flex items-center space-x-1 shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Test Link</span>
                      </a>
                    </>
                  ) : (
                    <button
                      onClick={() => shortenToTinyUrl(dynamicUrl)}
                      disabled={isShortening}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg flex items-center space-x-1 shrink-0 disabled:opacity-50"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isShortening ? 'Shortening...' : 'Generate TinyURL'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
