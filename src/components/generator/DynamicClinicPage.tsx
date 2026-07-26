import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  Star,
  Award,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  User,
  Heart,
  Smile,
  Zap,
  Activity,
  Eye,
  Building2,
  Home,
  TrendingUp,
  Package,
  Crosshair,
  ArrowRight,
  ExternalLink,
  Calculator,
  Camera,
  Layers,
  Check,
  Flame,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  GraduationCap,
  BadgeCheck,
  Verified,
  Sparkle
} from 'lucide-react';
import { ClinicTemplateData } from '../../data/multanTemplates';

interface DynamicClinicPageProps {
  data: ClinicTemplateData;
  isStandalone?: boolean;
}

export const DynamicClinicPage: React.FC<DynamicClinicPageProps> = ({ data, isStandalone = false }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedService, setSelectedService] = useState(data.services[0]?.title || 'General Consultation');
  const [preferredDate, setPreferredDate] = useState('');
  const [calcQuantity, setCalcQuantity] = useState(1);
  const [calcServiceIndex, setCalcServiceIndex] = useState(0);

  const cleanPhone = data.whatsApp || data.phone.replace(/[^0-9]/g, '');
  const waNumber = cleanPhone.startsWith('92') ? cleanPhone : `92${cleanPhone.replace(/^0/, '')}`;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.onerror = null;
    target.src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800';
  };

  const getWhatsAppUrl = (customMsg?: string) => {
    const defaultMsg = `Assalam-o-Alaikum ${data.doctorName || 'Dr. Sahib'}!\n\nMain ${data.businessName} par appointment book karwana chahta/chahti hoon.\n\n👤 Patient Name: ${patientName || 'Aapka Mareez'}\n📞 Contact: ${patientPhone || 'Direct WhatsApp'}\n🩺 OPD / Treatment: ${selectedService}\n📅 Preferred Date: ${preferredDate || 'Earliest Available'}\n\nMeherbani farma kar consultation time aur token confirm kar dein. Shukriya!`;
    const text = customMsg || defaultMsg;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleWhatsAppInquiry = (customMsg: string) => {
    const url = getWhatsAppUrl(customMsg);
    window.open(url, '_blank');
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppUrl();
    window.open(url, '_blank');
  };

  // Niche-specific clinical procedure & high-tech facility showcase data
  const getClinicalProcedures = () => {
    if (data.niche === 'dental') {
      return [
        {
          title: '3D Scan & German Titanium Implant Suite',
          desc: 'Computerized precision tooth replacement with lifetime titanium warranty and zero pain.',
          img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
          badge: 'German Tech',
          stats: 'Lifetime Warranty'
        },
        {
          title: 'Computerized Painless Root Canal Theatre',
          desc: '100% Painless single-sitting root canal treatment using microscopic rotary systems.',
          img: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
          badge: 'Single Sitting',
          stats: '100% Painless'
        },
        {
          title: 'Laser Teeth Whitening & Smile Studio',
          desc: 'Advanced laser scaling and instant whitening for 3 shades brighter smile in 30 mins.',
          img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
          badge: '30-Min Sitting',
          stats: 'Celebrity Glow'
        }
      ];
    }
    if (data.niche === 'skin') {
      return [
        {
          title: 'Hydrafacial MD & Pore Cleansing Lounge',
          desc: 'Deep pore exfoliation, blackhead extraction, and antioxidant serum hydration.',
          img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
          badge: 'Hydrafacial MD',
          stats: 'Instant Glow'
        },
        {
          title: 'Triple Wavelength Laser Hair Removal',
          desc: 'Painless permanent hair reduction with contact cooling technology for South Asian skin.',
          img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800',
          badge: 'Diode Laser',
          stats: 'Painless & Safe'
        },
        {
          title: 'Acne Scar Microneedling & Vampire PRP',
          desc: 'Collagen-induction therapy and plasma treatment for smooth, poreless glass skin.',
          img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800',
          badge: 'FDA Approved',
          stats: 'FCPS Specialist'
        }
      ];
    }
    if (data.niche === 'ortho') {
      return [
        {
          title: 'Total Knee Joint Replacement OT',
          desc: 'Minimally invasive knee joint replacement with rapid 48-hour walking recovery protocol.',
          img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
          badge: 'UK Implant Protocol',
          stats: '48-Hour Walk'
        },
        {
          title: 'Computerized Spine Decompression Lounge',
          desc: 'Non-surgical mechanical traction therapy for herniated discs, sciatica, and chronic back pain.',
          img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
          badge: 'Non-Surgical',
          stats: 'Sciatica Relief'
        },
        {
          title: 'Keyhole Arthroscopy & Sports Rehab',
          desc: 'Mini-incision ligament repair (ACL), meniscus repair, and shoulder joint stabilization.',
          img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
          badge: 'Keyhole Surgery',
          stats: 'FCPS Surgeon'
        }
      ];
    }
    if (data.niche === 'cardio') {
      return [
        {
          title: 'High-Resolution Color Doppler Echo Suite',
          desc: 'Comprehensive cardiac chamber, valve, and arterial blood flow diagnostic evaluation.',
          img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
          badge: 'Color Doppler',
          stats: 'Instant Report'
        },
        {
          title: 'Digital ECG & Emergency BP Desk',
          desc: 'Immediate cardiac diagnostic screening and individualized hypertension regulation protocol.',
          img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
          badge: 'Emergency Desk',
          stats: 'Zero Wait Time'
        },
        {
          title: 'Post-Angiography & Stent Care Clinic',
          desc: 'Specialized long-term medication reviews and preventive cardiovascular risk management.',
          img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
          badge: 'Interventional Care',
          stats: 'FCPS Cardiologist'
        }
      ];
    }
    if (data.niche === 'eye') {
      return [
        {
          title: '10-Minute Phaco Cataract Operation Theatre',
          desc: 'Painless, no-injection, no-stitch cataract removal with premium foldable intraocular lens.',
          img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
          badge: 'No Stitch / No Pain',
          stats: '10-Min Sitting'
        },
        {
          title: 'Swiss LASIK Glasses Removal Laser Suite',
          desc: 'Permanent vision correction for reading and distance glasses with advanced Swiss laser.',
          img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
          badge: 'Swiss Laser Tech',
          stats: 'Clear Vision'
        },
        {
          title: 'Diabetic Retina & Glaucoma Screening',
          desc: 'OCT retinal imaging, intraocular pressure checking, and diabetic eye care protocols.',
          img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
          badge: 'OCT Diagnostics',
          stats: 'Senior Eye Specialist'
        }
      ];
    }
    if (data.niche === 'peds') {
      return [
        {
          title: 'Cold-Chain Certified Vaccination Suite',
          desc: 'Official EPI and imported vaccines maintained in temperature-monitored cold storage.',
          img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
          badge: 'Cold-Chain Safe',
          stats: 'Official Booklet'
        },
        {
          title: 'Newborn Phototherapy & Growth Lounge',
          desc: 'Specialized neonatal jaundice phototherapy, weight tracking, and infant nutrition care.',
          img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
          badge: 'Infant Suite',
          stats: 'FCPS Child Doctor'
        },
        {
          title: 'Pediatric Asthma & Allergy OPD',
          desc: 'Kid-friendly nebulization, chest physiotherapy, and chronic cough management.',
          img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
          badge: 'Kid Friendly',
          stats: 'Gentle Care'
        }
      ];
    }
    if (data.niche === 'gynae') {
      return [
        {
          title: '4D Antenatal Fetal Ultrasound Suite',
          desc: 'High-resolution pregnancy monitoring, fetal development scans, and high-risk pregnancy OPD.',
          img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
          badge: '4D Ultrasound',
          stats: 'Female Specialist'
        },
        {
          title: 'Private PCOS & Hormonal Balance Lounge',
          desc: 'Targeted diagnostic and therapeutic plans for irregular cycles, weight management, and acne.',
          img: 'https://images.unsplash.com/photo-1594824813566-82823d5afe4a?auto=format&fit=crop&q=80&w=800',
          badge: '100% Private Suite',
          stats: 'FCPS Consultant'
        },
        {
          title: 'Infertility Evaluation & Follicular Tracking',
          desc: 'Comprehensive ovulation induction protocols and expert fertility counseling.',
          img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
          badge: 'Fertility Care',
          stats: 'Compassionate Care'
        }
      ];
    }
    if (data.niche === 'pet') {
      return [
        {
          title: 'PVMC Certified Core Pet Vaccination Suite',
          desc: 'Rabies, FVRCP, and 7-in-1 core puppy & kitten vaccinations with official booklet.',
          img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
          badge: 'PVMC Registered',
          stats: 'Official Booklet'
        },
        {
          title: 'Medicated Bath & Full Pet Grooming Parlor',
          desc: 'Anti-tick medicated bath, full coat clipping, nail trimming, and ear hygiene care.',
          img: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800',
          badge: 'Gentle Handling',
          stats: 'Full Grooming'
        },
        {
          title: 'Sterile Pet Surgery & Orthopedic OT',
          desc: 'Spaying, neutering, fracture plate fixing, and urgent soft-tissue surgeries.',
          img: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800',
          badge: 'Sterile OT',
          stats: '24/7 Emergency'
        }
      ];
    }
    if (data.niche === 'physio') {
      return [
        {
          title: 'Computerized Spinal Decompression Lounge',
          desc: 'Mechanical traction therapy for slip disc, herniated lumbar spine, and sciatica relief.',
          img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
          badge: 'Spinal Decompression',
          stats: 'DPT Specialist'
        },
        {
          title: 'Post-Stroke & Neuromuscular Rehab Gym',
          desc: 'Targeted limb mobility exercises, stroke recovery, and gait training protocols.',
          img: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
          badge: 'Neuromuscular Rehab',
          stats: 'Certified DPT'
        },
        {
          title: 'Knee & Joint Manual Mobilization Studio',
          desc: 'Non-surgical physical therapy for osteoarthritis, frozen shoulder, and sports injuries.',
          img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
          badge: 'Manual Therapy',
          stats: 'Rapid Recovery'
        }
      ];
    }
    return [
      {
        title: 'Executive Diabetes & HbA1c Desk',
        desc: 'In-house rapid blood sugar analysis, insulin adjustment, and diabetic foot screening.',
        img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
        badge: 'Diabetologist',
        stats: 'In-House Lab'
      },
      {
        title: 'Hypertension & Cardiac OPD Suite',
        desc: 'Comprehensive cardiovascular risk checking, cholesterol management, and BP control.',
        img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
        badge: 'FCPS Physician',
        stats: 'Senior Doctor'
      },
      {
        title: 'Complete Preventive Health Screening',
        desc: 'Sterilized hygiene, liver & kidney function checkups supervised by senior specialist.',
        img: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
        badge: '100% Sterile',
        stats: 'Zero Wait Time'
      }
    ];
  };

  const selectedCalcService = data.services[calcServiceIndex] || data.services[0];

  return (
    <div className={`font-sans text-slate-800 bg-slate-50 min-h-screen ${isStandalone ? 'w-full' : ''}`}>
      
      {/* Top Banner */}
      <div className="bg-emerald-950 text-emerald-100 py-2.5 px-4 text-xs md:text-sm font-medium border-b border-emerald-800/80">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-semibold">{data.address}, {data.city}</span>
            <span className="hidden md:inline text-emerald-400">•</span>
            <span className="hidden md:inline"><Clock className="w-3.5 h-3.5 inline mr-1 text-emerald-300" />{data.timings}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Priority WhatsApp Token
            </span>
            <a
              href={`tel:${data.phone}`}
              className="hover:underline flex items-center font-extrabold text-white"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-emerald-300" />
              <span>{data.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-600/20 shrink-0">
              {data.businessName.charAt(0)}
            </div>
            <div className="min-w-0">
              <h1 className="font-extrabold text-slate-900 text-sm sm:text-base md:text-xl leading-tight flex items-center gap-1">
                <span className="truncate">{data.businessName}</span>
                <BadgeCheck className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
              </h1>
              <p className="text-[11px] text-emerald-700 font-bold uppercase tracking-wider truncate">
                {data.nicheTitle} • {data.city}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <a
              href={`tel:${data.phone}`}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span>Reception</span>
            </a>
            <a
              href={getWhatsAppUrl(`Assalam-o-Alaikum ${data.doctorName || 'Dr. Sahib'}! Main ${data.businessName} ke baray mein appointment booking details janna chahta/chahti hoon.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition transform active:scale-95 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              <span className="hidden sm:inline">WhatsApp Booking</span>
              <span className="sm:hidden">Book</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Split Feature & OPD Slot Card Layout */}
      <section className="relative bg-slate-950 text-white py-14 md:py-24 px-4 overflow-hidden border-b border-slate-800">
        {/* Rich Visible Clinic Facility Hero Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImage}
            alt={data.businessName}
            referrerPolicy="no-referrer"
            onError={handleImgError}
            className="w-full h-full object-cover object-center filter brightness-105 contrast-105"
          />
          {/* Overlays to ensure contrast and readable text while keeping background image vivid */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>#1 Rated {data.nicheTitle} in {data.city}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              {data.tagline}
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              Supervised directly by <span className="text-amber-300 font-bold">{data.doctorName}</span> ({data.doctorTitle}). Experience painless procedures, 100% German sterilization protocols, and priority appointment booking in {data.city}.
            </p>

            {/* Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-xl">
              {data.badges.map((badge, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 text-xs text-slate-100 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href="#quick-booking"
                className="flex items-center justify-center space-x-2 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition"
              >
                <Calendar className="w-5 h-5" />
                <span>Reserve Appointment Slot</span>
              </a>
              <a
                href={getWhatsAppUrl(`Assalam-o-Alaikum! Please tell me about consultation fees and available times at ${data.businessName}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                <span>Ask Reception on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Facility & OPD Priority Booking Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/15 p-6 rounded-3xl shadow-2xl relative space-y-4">
              
              {/* Category Specialty Banner Thumbnail in Card */}
              <div className="relative h-32 rounded-2xl overflow-hidden border border-slate-700 shadow-md">
                <img 
                  src={data.heroImage} 
                  alt={data.nicheTitle} 
                  referrerPolicy="no-referrer" 
                  onError={handleImgError}
                  className="w-full h-full object-cover filter brightness-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-950" /> {data.nicheTitle}
                </div>
                <div className="absolute bottom-2 left-2.5 text-white font-extrabold text-xs">
                  {data.businessName}
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                  <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
                    OPD Reception Active
                  </span>
                </div>
                <span className="bg-amber-400/20 text-amber-300 font-black text-[10px] uppercase px-2.5 py-1 rounded-full border border-amber-400/30">
                  Priority Token
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium block">Lead Consultant & Specialist</span>
                  <div className="text-white font-black text-lg mt-0.5">{data.doctorName}</div>
                  <div className="text-emerald-400 text-xs font-semibold">{data.doctorTitle}</div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Consultation Fee</span>
                    <span className="font-extrabold text-amber-300">{data.consultationFee}</span>
                  </div>
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Clinical Practice</span>
                    <span className="font-extrabold text-emerald-300">{data.doctorExperience}</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                  <span className="text-slate-400">Timings:</span>
                  <span className="font-bold text-slate-200">{data.timings}</span>
                </div>
              </div>

              <a
                href={getWhatsAppUrl(`Assalam-o-Alaikum! I want to confirm an OPD appointment token for today at ${data.businessName}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Get Instant WhatsApp Token</span>
              </a>

            </div>
          </div>

        </div>
      </section>

      {/* Trust Stats Counter Bar */}
      <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white py-8 px-4 shadow-inner">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-2">
            <div className="text-3xl md:text-4xl font-black tracking-tight text-white">12,500+</div>
            <div className="text-xs text-emerald-100 font-bold uppercase tracking-wider mt-1">Satisfied Patients in Multan</div>
          </div>
          <div className="p-2">
            <div className="text-3xl md:text-4xl font-black tracking-tight text-white">100%</div>
            <div className="text-xs text-emerald-100 font-bold uppercase tracking-wider mt-1">German Sterilized Equipment</div>
          </div>
          <div className="p-2">
            <div className="text-3xl md:text-4xl font-black tracking-tight text-amber-300">4.9 ★</div>
            <div className="text-xs text-emerald-100 font-bold uppercase tracking-wider mt-1">Google Reviews Rating</div>
          </div>
          <div className="p-2">
            <div className="text-3xl md:text-4xl font-black tracking-tight text-white">0% Pain</div>
            <div className="text-xs text-emerald-100 font-bold uppercase tracking-wider mt-1">Advanced Painless Tech</div>
          </div>
        </div>
      </section>

      {/* Emergency Helpline Banner */}
      <section className="bg-amber-500 text-slate-950 py-3.5 px-4 font-bold text-xs md:text-sm shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-slate-950 animate-bounce" />
            <span>Emergency Case or Acute Pain in Multan? Priority slots available today!</span>
          </div>
          <a
            href={getWhatsAppUrl(`URGENT EMERGENCY: Assalam-o-Alaikum ${data.doctorName || 'Dr. Sahib'}! Mujhe emergency consultation ki zaroorat hai at ${data.businessName}. Please priority token share kar dein.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-950 text-white hover:bg-slate-900 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition shrink-0"
          >
            Emergency WhatsApp Hotline
          </a>
        </div>
      </section>

      {/* Services & Procedures Grid */}
      <section className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-800 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Specialized Treatments & Procedures
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Comprehensive Services at {data.businessName}
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Equipped with state-of-the-art diagnostic machinery and international medical protocols in {data.city}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-xl mb-4 shadow-md shadow-emerald-500/20 group-hover:scale-110 transition">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">{service.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-4">{service.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {service.price || 'Specialist Rate'}
                </span>
                <a
                  href={getWhatsAppUrl(`Assalam-o-Alaikum ${data.doctorName || 'Dr. Sahib'}! Main ${service.title} ke liye ${data.businessName} mein appointment book karwana chahta/chahti hoon. Please timing confirm kar dein.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-extrabold text-emerald-600 hover:text-emerald-800 flex items-center space-x-1"
                >
                  <span>Book</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Treatment Cost Estimator & Savings Calculator */}
      <section className="py-16 bg-slate-900 text-white px-4 border-y border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full">
              Transparent Pricing & Estimator
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
              Treatment Cost & Discount Estimator
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-2">
              Select your required procedure to view estimated costs and claim your WhatsApp discount token.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-6">
              <div>
                <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2">
                  1. Select Procedure / Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {data.services.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCalcServiceIndex(idx)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between ${
                        calcServiceIndex === idx
                          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-lg'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      {calcServiceIndex === idx && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2">
                  <span>2. Quantity / Sessions / Scope</span>
                  <span className="text-amber-400 font-black text-sm">{calcQuantity} Sessions / Treatments</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={calcQuantity}
                  onChange={e => setCalcQuantity(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Selected Procedure:</span>
                  <span className="font-bold text-white">{selectedCalcService.title}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Listed Rate per session:</span>
                  <span className="font-bold text-emerald-400">{selectedCalcService.price}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>WhatsApp Booking Privilege:</span>
                  <span className="font-bold text-amber-400">Free Priority Token Included</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-gradient-to-br from-emerald-900 to-teal-950 p-6 rounded-2xl border border-emerald-700/50 text-center space-y-4">
              <div className="inline-flex items-center space-x-1.5 bg-amber-400/20 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-xs font-black">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Special WhatsApp Package</span>
              </div>

              <div>
                <span className="text-xs text-emerald-200 block font-semibold">Estimated Package Offer</span>
                <span className="text-3xl font-black text-white block mt-1">
                  {selectedCalcService.price}
                </span>
                <span className="text-[11px] text-emerald-300 font-medium">Includes Consultation & Full Sterilized Kit</span>
              </div>

              <a
                href={getWhatsAppUrl(`Assalam-o-Alaikum! I used the price estimator on your website for ${selectedCalcService.title} (${calcQuantity} sessions/units). Please confirm availability.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-amber-400/20 transition"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Claim WhatsApp Price Token</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Clinical Facility & Technology Showcase Gallery */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 h-80 bg-slate-900">
              <img
                src={data.heroImage}
                alt="Clinic Facility"
                referrerPolicy="no-referrer"
                onError={handleImgError}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-slate-950/20"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 shadow-lg">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">German Sterilization Standard</h4>
                    <p className="text-[11px] text-slate-600">Autoclave & UV Purified Operation Theater</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-emerald-800 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
              State-of-the-Art Infrastructure
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              Modern Clinical Facilities in {data.city}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              At {data.businessName}, we believe in combining cutting-edge medical technology with utmost patient comfort. Our facility features private consultation lounges, digital diagnostic imaging, and 100% infection-free environments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-800">
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Private VIP Patient Lounges</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Digital 3D Diagnostic Imaging</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Wait Time Appointment Slots</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated Emergency OPD Desk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Clinical Procedures & Advanced Care Showcase */}
      <section className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-800 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Clinical Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-3">
            Specialized Procedures & Technology Showcase
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            State-of-the-art treatment standards and specialized clinical facilities at {data.businessName}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getClinicalProcedures().map((p: any, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative rounded-2xl overflow-hidden h-52 border border-slate-200 bg-slate-900 mb-4 shadow-sm group-hover:scale-[1.01] transition-transform duration-300">
                  <img
                    src={p.img}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    onError={handleImgError}
                    className="w-full h-full object-cover filter brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-lg shadow-md">
                    {p.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-amber-400 text-slate-950 text-[11px] font-black uppercase px-2.5 py-1 rounded-lg shadow-md">
                    {p.stats}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mt-2">
                  {p.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => handleWhatsAppInquiry(`Assalam-o-Alaikum ${data.doctorName}! Main ${p.title} ke baray mein details aur availability inquire karna chahta/chahti hoon.`)}
                  className="w-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                  <span>Inquire Procedure on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Patient Journey Timeline */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-950 text-white px-4 border-y border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest bg-emerald-400/10 px-3.5 py-1.5 rounded-full border border-emerald-400/20">
              Painless Protocol
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-3">
              Your Step-by-Step Patient Journey
            </h2>
            <p className="text-slate-300 text-xs md:text-sm mt-2">
              From online booking to post-procedure care, we ensure a seamless, queue-free experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'WhatsApp Token',
                desc: 'Reserve your appointment time online without waiting in reception queues.',
                icon: MessageCircle
              },
              {
                step: '02',
                title: 'Digital Examination',
                desc: 'Comprehensive initial evaluation with modern diagnostic scanning.',
                icon: Activity
              },
              {
                step: '03',
                title: 'Painless Procedure',
                desc: 'Performed directly by senior specialist using sterilized equipment.',
                icon: ShieldCheck
              },
              {
                step: '04',
                title: 'Post-Care Support',
                desc: 'Complete aftercare guide & direct WhatsApp follow-up with doctor.',
                icon: Heart
              }
            ].map((st, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <st.icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-700">{st.step}</span>
                </div>
                <h3 className="font-bold text-white text-base">{st.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Credentials & Medical Leadership Matrix (No Face Photo Required) */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 text-center lg:text-left space-y-4">
              <div className="inline-flex items-center space-x-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Verified Specialist Council Seal</span>
              </div>

              <div className="w-24 h-24 mx-auto lg:mx-0 rounded-3xl bg-gradient-to-br from-amber-400 via-emerald-500 to-teal-700 p-1 shadow-2xl">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                  <ShieldCheck className="w-12 h-12 text-amber-400" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">{data.doctorName}</h3>
                <p className="text-emerald-300 text-xs font-extrabold mt-1">{data.doctorTitle}</p>
                <p className="text-slate-400 text-xs mt-2">{data.businessName} • {data.city}</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Medical Leadership & Clinical Qualifications
              </h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                With over <strong className="text-amber-300">{data.doctorExperience}</strong> of active clinical experience, {data.doctorName} supervises all surgical and diagnostic protocols at {data.businessName}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 font-bold text-white">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span>Specialist Qualification</span>
                  </div>
                  <p className="text-slate-400">{data.doctorTitle}</p>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 font-bold text-white">
                    <Verified className="w-4 h-4 text-emerald-400" />
                    <span>Official Council Registration</span>
                  </div>
                  <p className="text-slate-400">Verified Medical License in Punjab</p>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 font-bold text-white">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>OPD Consultation Schedule</span>
                  </div>
                  <p className="text-slate-400">{data.timings}</p>
                </div>

                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                  <div className="flex items-center space-x-2 font-bold text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Sterilization Standard</span>
                  </div>
                  <p className="text-slate-400">100% German Autoclave Sterilized</p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={getWhatsAppUrl(`Assalam-o-Alaikum ${data.doctorName || 'Dr. Sahib'}! Main ${data.businessName} par aap ke sath direct consultation token request karna chahta/chahti hoon.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg transition"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Request Direct Consultation on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Patient Reviews Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-emerald-800 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Real Patient Feedback
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            What Our Multan Patients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-3">
              <div className="flex items-center space-x-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 text-sm italic leading-relaxed">
                "{t.comment}"
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="font-extrabold text-slate-900 block">{t.name}</span>
                  <span className="text-slate-500">{t.role}</span>
                </div>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                  ✓ Verified Patient
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Booking Form Section */}
      <section id="quick-booking" className="py-16 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white px-4 border-t border-slate-800">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-5 space-y-4">
            <span className="bg-amber-400/20 text-amber-300 font-extrabold text-xs uppercase tracking-wider px-3 py-1 rounded-full border border-amber-400/30">
              Priority WhatsApp Booking
            </span>
            <h2 className="text-3xl font-black text-white">
              Reserve Your Slot Today
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed">
              Fill out this quick form to receive your priority token directly on WhatsApp from our clinic reception.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{data.address}, {data.city}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{data.timings}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{data.phone}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white text-slate-900 p-6 md:p-8 rounded-3xl shadow-2xl">
            <h3 className="font-extrabold text-lg text-slate-900 mb-4 flex items-center justify-between">
              <span>Appointment Form</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                Instant Confirmation
              </span>
            </h3>

            <form onSubmit={handleBookNow} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  placeholder="e.g. Muhammad Ali"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Mobile No.</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={e => setPatientPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Procedure</label>
                  <select
                    value={selectedService}
                    onChange={e => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm bg-white"
                  >
                    {data.services.map((s, idx) => (
                      <option key={idx} value={s.title}>{s.title}</option>
                    ))}
                    <option value="General Consultation">General Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center space-x-2 transition"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Confirm Appointment on WhatsApp</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FAQ Accordion */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-16 px-4 max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-emerald-800 font-extrabold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4.5 flex items-center justify-between font-extrabold text-slate-900 text-sm hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="p-4.5 pt-0 text-slate-600 text-xs border-t border-slate-100 bg-slate-50/50 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Live Map & Location Footer Section */}
      <section className="bg-slate-900 text-white py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-3">
            <span className="bg-emerald-500/20 text-emerald-400 font-extrabold text-xs uppercase px-3 py-1 rounded-full border border-emerald-500/30">
              Location & Directions
            </span>
            <h3 className="text-2xl font-black text-white">{data.businessName}</h3>
            <p className="text-slate-300 text-xs">{data.address}, {data.city}</p>
            <p className="text-slate-400 text-xs">OPD Timings: {data.timings}</p>
            <div className="pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`${data.businessName} ${data.address} ${data.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition"
              >
                <MapPin className="w-4 h-4" />
                <span>Open Google Maps Directions</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-3">
            <div className="font-extrabold text-white text-sm">Clinic Reception Contact</div>
            <p>Direct Phone: <strong className="text-emerald-400">{data.phone}</strong></p>
            <p>WhatsApp Reception: <strong className="text-emerald-400">{data.whatsApp || data.phone}</strong></p>
            <p>City: <strong>{data.city}, Punjab, Pakistan</strong></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-8 border-t border-slate-800 text-xs text-center px-4">
        <div className="max-w-6xl mx-auto space-y-2">
          <p className="font-extrabold text-slate-300 text-sm">{data.businessName} - {data.city}</p>
          <p>{data.address} • Phone: {data.phone}</p>
          <p className="text-slate-600 text-[11px] pt-2">
            © {new Date().getFullYear()} {data.businessName}. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Floating Sticky WhatsApp Button */}
      <a
        href={getWhatsAppUrl(`Assalam-o-Alaikum ${data.doctorName || 'Dr. Sahib'}! Main ${data.businessName} par priority appointment booking details janna chahta/chahti hoon. Please confirm token availability.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-4 sm:right-6 z-50 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-4 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 border-2 border-white/90 group cursor-pointer"
        title="Direct WhatsApp Appointment"
      >
        <MessageCircle className="w-6 h-6 fill-white shrink-0 animate-pulse" />
        <span className="font-extrabold text-xs sm:text-sm whitespace-nowrap tracking-wide">WhatsApp Booking</span>
      </a>

    </div>
  );
};
