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
  Zap,
  Phone,
  MapPin,
  Building2,
  CheckCircle2,
  RefreshCw,
  Plus,
  Trash2,
  Image as ImageIcon,
  ShieldCheck,
  Code
} from 'lucide-react';
import { ClinicTemplateData, MULTAN_PRESETS, PAKISTANI_IMAGES } from '../../data/multanTemplates';
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

    // If exact preset, use clean hash e.g. https://attiqbaig1.github.io/multan-clinics/#skin
    if (isExactPreset) {
      return `${baseUrl}#${formData.niche}`;
    }

    // For customized inputs, use full query string on /multan-clinics/
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
  const githubPagesDemoUrl = `https://yourusername.github.io/${customDomainName || 'multan-demo'}/`;

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

  // Generate WhatsApp Roman Urdu Pitch Script tailored per niche
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

    if (formData.niche === 'cardio') {
      return `Assalam-o-Alaikum ${formData.doctorName}! 👋

Main ne ${formData.businessName} (${formData.address}, ${formData.city}) ke liye ek modern cardiology & heart institute website demo tayar kiya hai.

Is website ke zariye aap ke patients:
✅ ECG, Color Doppler Echo & blood pressure consultation check kar saktay hain
✅ Direct WhatsApp appointment book kar saktay hain
✅ Emergency OPD & senior cardiologist profile dekh saktay hain

📌 Aap ke heart institute ka website demo yahan se dekhein:
${activePitchUrl}

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

    if (formData.niche === 'pet') {
      return `Assalam-o-Alaikum ${formData.doctorName}! 👋

Main ne ${formData.businessName} (${formData.address}, ${formData.city}) ke liye ek modern veterinary hospital, pet surgery & pet store website demo tayar kiya hai.

Is website se pet owners:
✅ Pet vaccination, grooming, surgery & boarding packages dekh saktay hain
✅ Imported Royal Canin & Reflex pet food rates inquire kar saktay hain
✅ Emergency Vet Visit WhatsApp pe book kar saktay hain

📌 Aap ke pet center ka website demo yahan se dekhein:
${activePitchUrl}

Agar aap ko yeh design pasand aye to hum is ko aap ke custom domain pe 1 hour ke andar live kar saktay hain!

Regards,
Web & Digital Lead Consultant
WhatsApp: ${formData.phone}`;
    }

    if (formData.niche === 'eye') {
      return `Assalam-o-Alaikum ${formData.doctorName}! 👋

Main ne ${formData.businessName} (${formData.address}, ${formData.city}) ke liye ek high-converting eye specialist & laser surgery hospital website demo tayar kiya hai.

Is website ke zariye aap ke patients:
✅ No-stitch Phaco Cataract Surgery & LASIK laser charges check kar saktay hain
✅ Direct WhatsApp appointment book kar saktay hain
✅ Vitreo-Retinal surgeon profile & OPD timing check kar saktay hain

📌 Aap ke eye hospital ka website demo yahan se dekhein:
${activePitchUrl}

Agar aap ko yeh design pasand aye to hum is ko aap ke custom domain pe 1 hour ke andar live kar saktay hain!

Regards,
Web & Digital Lead Consultant
WhatsApp: ${formData.phone}`;
    }

    // Default Dental / General Clinic
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

  // Generate Standalone HTML file string
  const generateHTMLCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.businessName} - ${formData.city}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-slate-50 text-slate-800 font-sans">

  <!-- Top Bar -->
  <div class="bg-emerald-800 text-emerald-50 py-2 px-4 text-xs md:text-sm">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div>📍 ${formData.address}, ${formData.city} | 🕒 ${formData.timings}</div>
      <div>📞 Call: <a href="tel:${formData.phone}" class="font-bold text-white">${formData.phone}</a></div>
    </div>
  </div>

  <!-- Header -->
  <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold text-xl flex items-center justify-center">
          ${formData.businessName.charAt(0)}
        </div>
        <div>
          <h1 class="font-bold text-slate-900 text-lg">${formData.businessName}</h1>
          <p class="text-xs text-emerald-700 font-semibold">${formData.nicheTitle} • ${formData.city}</p>
        </div>
      </div>
      <a href="https://wa.me/${formData.whatsApp}?text=Assalam-o-Alaikum!%20I%20want%20to%20book%20an%20appointment" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-md">
        <i class="fab fa-whatsapp mr-1"></i> WhatsApp Booking
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white py-16 px-4">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <span class="bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase px-3 py-1 rounded-full border border-emerald-500/30">
          Top Rated Clinic in ${formData.city}
        </span>
        <h1 class="text-3xl md:text-5xl font-extrabold mt-4 mb-4 leading-tight">${formData.tagline}</h1>
        <p class="text-slate-300 text-sm mb-6">
          Led by <strong class="text-emerald-300">${formData.doctorName}</strong> (${formData.doctorTitle}). ${formData.doctorExperience}.
        </p>
        <a href="https://wa.me/${formData.whatsApp}?text=Assalam-o-Alaikum!%20I%20want%20to%20book%20an%20appointment" class="inline-block bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg">
          <i class="fab fa-whatsapp text-lg mr-1"></i> Book Appointment via WhatsApp
        </a>
      </div>
      <div>
        <img src="${formData.doctorImage}" class="rounded-2xl border-2 border-white/20 shadow-2xl w-full h-80 object-cover object-top" />
      </div>
    </div>
  </section>

  <!-- Services -->
  <section class="py-16 px-4 max-w-6xl mx-auto">
    <h2 class="text-2xl font-extrabold text-slate-900 text-center mb-8">Our Specialist Procedures</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${formData.services
        .map(
          s => `
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="font-bold text-slate-900 mb-2">${s.title}</h3>
          <p class="text-slate-600 text-xs mb-4">${s.desc}</p>
          <div class="font-bold text-emerald-700 text-xs">${s.price || 'Specialist Rate'}</div>
        </div>
      `
        )
        .join('')}
    </div>
  </section>

  <!-- WhatsApp Floating Button -->
  <a href="https://wa.me/${formData.whatsApp}?text=Assalam-o-Alaikum!%20I%20want%20to%20book%20an%20appointment" style="position:fixed;bottom:20px;right:20px;z-index:999;background:#10b981;color:#fff;padding:14px 20px;border-radius:50px;font-weight:bold;box-shadow:0 10px 25px rgba(0,0,0,0.3);text-decoration:none;">
    <i class="fab fa-whatsapp text-xl"></i> WhatsApp Booking
  </a>

</body>
</html>`;
  };

  const handleDownloadHTML = () => {
    const htmlContent = generateHTMLCode();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customDomainName || 'index'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-2 min-h-screen bg-[#0B1120] text-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Machine Header Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 border border-amber-500/20 rounded-3xl p-6 md:p-8 mb-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Multan Lead & Demo Generator Studio</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-serif">
                Multan Business Outreach & Website Engine
              </h1>
              <p className="text-slate-300 text-sm mt-2 max-w-2xl">
                Generate high-converting website demos tailored for Dentists, Skin Aesthetics, Vet Clinics, Eye Specialists & Realtors in Multan. Send direct WhatsApp pitches or export free GitHub Pages code!
              </p>
            </div>

            {/* Quick Preset Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {MULTAN_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(idx)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                    selectedPresetIndex === idx
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  <span>{preset.businessName.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-75">({preset.niche})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid: Controls + Preview Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Generator Form Controls */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="font-bold text-lg text-white flex items-center space-x-2">
                <Settings className="w-5 h-5 text-amber-400" />
                <span>Customize Clinic Details</span>
              </h2>
              <button
                onClick={() => handleSelectPreset(selectedPresetIndex)}
                className="text-xs text-amber-400 hover:underline flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-bold mb-1">Business / Clinic Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={e => handleChange('businessName', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Tagline / Catchy Headline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={e => handleChange('tagline', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-500 focus:outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Doctor / Specialist Name</label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={e => handleChange('doctorName', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Degree / Qualifications</label>
                  <input
                    type="text"
                    value={formData.doctorTitle}
                    onChange={e => handleChange('doctorTitle', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">WhatsApp No. (With 92)</label>
                  <input
                    type="text"
                    value={formData.whatsApp}
                    onChange={e => handleChange('whatsApp', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phone / Call Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Address in Multan</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => handleChange('address', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Timings</label>
                  <input
                    type="text"
                    value={formData.timings}
                    onChange={e => handleChange('timings', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-500 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Consultation Fee</label>
                  <input
                    type="text"
                    value={formData.consultationFee}
                    onChange={e => handleChange('consultationFee', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:border-amber-500 text-xs"
                  />
                </div>
              </div>

              {/* Facility & Lounge Image Selector */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Clinic Facility / Lounge Preset</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {PAKISTANI_IMAGES.facilities.map((fac, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChange('heroImage', fac.url)}
                      className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                        formData.heroImage === fac.url ? 'border-amber-400 scale-105' : 'border-slate-800 opacity-60'
                      }`}
                      title={fac.name}
                    >
                      <img
                        src={fac.url}
                        alt={fac.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Services List Manager */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-slate-300 font-bold">Services & Procedures</label>
                  <button
                    onClick={handleAddService}
                    className="text-[11px] text-amber-400 hover:underline flex items-center space-x-1 font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {formData.services.map((s, idx) => (
                    <div key={idx} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={s.title}
                          onChange={e => handleUpdateService(idx, 'title', e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-white px-2 py-1 rounded text-xs w-full font-bold"
                        />
                        <button
                          onClick={() => handleRemoveService(idx)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={s.desc}
                        onChange={e => handleUpdateService(idx, 'desc', e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 rounded text-[11px] w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Multi-tab Display Engine */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Top View Selector Tabs */}
            <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                  activeTab === 'preview'
                    ? 'bg-amber-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Live Demo</span>
              </button>

              <button
                onClick={() => setActiveTab('url')}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                  activeTab === 'url'
                    ? 'bg-amber-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Dynamic URL</span>
              </button>

              <button
                onClick={() => setActiveTab('pitch')}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                  activeTab === 'pitch'
                    ? 'bg-amber-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Pitch</span>
              </button>

              <button
                onClick={() => setActiveTab('github')}
                className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 ${
                  activeTab === 'github'
                    ? 'bg-amber-500 text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span>GitHub Exporter</span>
              </button>
            </div>

            {/* TAB CONTENT PANELS */}

            {/* TAB 1: Live Interactive Demo Render */}
            {activeTab === 'preview' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                    <span className="text-slate-300 font-mono text-[11px] ml-2">
                      https://{customDomainName}.com
                    </span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                    LIVE INTERACTIVE PREVIEW
                  </span>
                </div>

                <div className="max-h-[650px] overflow-y-auto">
                  <DynamicClinicPage data={formData} />
                </div>
              </div>
            )}

            {/* TAB 2: Dynamic URL Sharing */}
            {activeTab === 'url' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Clean Demo Links (WhatsApp-Ready)</h3>
                    <p className="text-xs text-slate-400">
                      Short, clean & professional links. When clients open these, it directly opens their specific clinic website without showing the studio editor!
                    </p>
                  </div>
                </div>

                {/* GitHub Pages Base URL config */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <label className="block text-xs font-bold text-slate-300">Your GitHub Pages Repo Domain / URL</label>
                  <p className="text-[11px] text-slate-400">
                    Must include your repo name <code className="text-amber-400 font-bold">/multan-clinics/</code> at the end (e.g. <code className="text-amber-300">https://attiqbaig1.github.io/multan-clinics/</code>):
                  </p>
                  <input
                    type="text"
                    value={githubPagesBaseUrl}
                    onChange={(e) => setGithubPagesBaseUrl(e.target.value)}
                    placeholder="https://attiqbaig1.github.io/multan-clinics/"
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Active Selected Clinic Link */}
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

                  <p className="text-[11px] text-slate-400 italic">
                    💡 <strong>Yeh Link Aapka Live Website Hai!</strong> Form me jaise hi aap text change karte hain, yeh URL automatic update ho jata hai. Kisi deployment ya code save karne ki zaroorat nahi hoti!
                  </p>
                </div>

                {/* Auto-Shortened TinyURL Link Box */}
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

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-slate-400 gap-2 pt-1 border-t border-slate-800/80">
                    <p>
                      ⚡ <strong>Automatic TinyURL Generator:</strong> TinyURL pe jaa kar manually paste karne ki bilkul zaroorat nahi hai!
                    </p>
                    <a
                      href={`https://tinyurl.com/cut-urls?url=${encodeURIComponent(dynamicUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-400 underline font-bold hover:text-amber-300 text-xs shrink-0 flex items-center space-x-1"
                    >
                      <span>Custom Name Alias (e.g. tinyurl.com/dr-ashfaq)</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Quick Clean Preset Links List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">All Clinic Clean Preset Links</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {MULTAN_PRESETS.map((preset, idx) => {
                      const rootUrl = window.location.hostname.includes('github.io')
                        ? `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}/`
                        : githubPagesBaseUrl.trim().replace(/\/$/, '') + '/';
                      const cleanUrl = `${rootUrl}#${preset.niche}`;
                      return (
                        <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                          <div className="overflow-hidden">
                            <p className="font-bold text-xs text-white truncate">{preset.nicheTitle}</p>
                            <p className="font-mono text-[10px] text-amber-400/90 truncate">{cleanUrl}</p>
                          </div>
                          <button
                            onClick={() => handleCopy(cleanUrl, 'link')}
                            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-amber-400 font-bold rounded-lg shrink-0 flex items-center space-x-1"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bulk Campaign Guide for 200 Dentists */}
                <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/30 p-5 rounded-xl space-y-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                    <Zap className="w-5 h-5 text-amber-400" />
                    <span>How to Send Personalized Demos to 200 Dentists (1-Click Method)</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    You do <strong className="text-white">NOT</strong> need 200 separate GitHub repos or code files! Your single live website link (<code className="text-amber-300 font-bold">https://attiqbaig1.github.io/multan-clinics/</code>) dynamically renders all 200 clinics automatically based on URL parameters!
                  </p>

                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-slate-200">📊 Google Sheets / Excel Formula (Auto-generate 200 Links in 5 seconds):</div>
                    <p className="text-slate-400 text-[11px]">
                      Put Clinic Name in Column A (e.g. <code className="text-emerald-400">Al-Rahman Dental</code>), Doctor Name in Column B (e.g. <code className="text-emerald-400">Dr. Ali Ahmad</code>), and paste this Excel formula in Column C:
                    </p>
                    <div className="bg-slate-900 p-2.5 rounded border border-slate-700 text-amber-300 font-mono text-[11px] overflow-x-auto select-all">
                      {`="https://attiqbaig1.github.io/multan-clinics/?demo=true&niche=dental&name=" & ENCODEURL(A2) & "&doctor=" & ENCODEURL(B2)`}
                    </div>
                  </div>
                </div>

                {/* Shortener Advice */}
                <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-xl space-y-2 text-xs">
                  <h4 className="font-bold text-emerald-300 flex items-center space-x-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Want Short Branded Links for WhatsApp?</span>
                  </h4>
                  <p className="text-slate-300">
                    You can paste any clean preset link above into <a href="https://tinyurl.com" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold">TinyURL.com</a> or <a href="https://bitly.com" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold">Bitly</a> to make custom names like <span className="font-mono text-amber-300">tinyurl.com/alshafi-dental</span>!
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3: WhatsApp Pitch Script */}
            {activeTab === 'pitch' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                      <span>WhatsApp Roman Urdu Pitch Script</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Ready-to-send outreach message customized for {formData.doctorName} in Multan.
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${formData.whatsApp}?text=${encodeURIComponent(pitchScript)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center space-x-2 shadow-lg hover:scale-105 transition"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>

                {/* Short Link Toggle Bar */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="useShortToggle"
                      checked={useShortLinkInPitch}
                      onChange={(e) => setUseShortLinkInPitch(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
                    />
                    <label htmlFor="useShortToggle" className="text-xs font-bold text-slate-200 cursor-pointer flex items-center space-x-1">
                      <span>Use Short TinyURL Link in Pitch Message</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </label>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300 font-bold bg-slate-900 px-2.5 py-1 rounded border border-slate-800 truncate max-w-xs select-all">
                    {activePitchUrl}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed relative">
                  {pitchScript}
                  <button
                    onClick={() => handleCopy(pitchScript, 'pitch')}
                    className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-sans flex items-center space-x-1"
                  >
                    {copiedPitch ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPitch ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: 1-Click GitHub Pages Code Exporter */}
            {activeTab === 'github' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                      <Code className="w-5 h-5 text-amber-400" />
                      <span>1-Click Standalone HTML / GitHub Exporter</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Download a self-contained <code className="text-amber-300">index.html</code> file with Tailwind CSS and full WhatsApp booking code. Host 100% free on GitHub Pages!
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleDownloadHTML}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-lg transition hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download index.html</span>
                    </button>
                    <button
                      onClick={() => handleCopy(generateHTMLCode(), 'code')}
                      className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center space-x-1.5 transition"
                    >
                      {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>

                {/* GitHub Deployment Instructions */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <h4 className="font-bold text-amber-300 flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>How to Publish on GitHub Pages in 60 Seconds (100% Free)</span>
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
                    <li>Log in to <a href="https://github.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">GitHub.com</a> and create a new repository named <span className="font-mono text-emerald-300">{customDomainName}</span>.</li>
                    <li>Click <strong>"Add file" → "Upload files"</strong> and upload the downloaded <span className="font-mono text-emerald-300">index.html</span> file.</li>
                    <li>Go to repository <strong>Settings → Pages</strong>, choose <span className="font-mono text-amber-300">main</span> branch as source, and click Save!</li>
                    <li>Your live website link will be ready instantly at: <span className="font-mono text-amber-300">{githubPagesDemoUrl}</span></li>
                  </ol>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
