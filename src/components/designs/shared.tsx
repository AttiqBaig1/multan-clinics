import React, { useEffect, useMemo, useState } from 'react';
import { ClinicTemplateData } from '../../data/multanTemplates';
import { photosFor } from '../../data/clinicPhotos';
import { ChevronLeft, ArrowRight, ChevronRight, Check, Leaf, ArrowUpRight, Eye, Sparkles, ShieldCheck, Activity, Heart, Zap, Smile, Crosshair, Sun, Package, Stethoscope, Star, MessageCircle, Phone, MapPin, Clock, BadgeCheck, CalendarCheck, Award } from 'lucide-react';

export const I = { ChevronLeft, Sparkles, ArrowRight, ChevronRight, Check, Leaf, Heart, ArrowUpRight, Star, MessageCircle, Phone, MapPin, Clock, BadgeCheck, CalendarCheck, Award, ShieldCheck, Stethoscope };
const ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = { Eye, Sparkles, Shield: ShieldCheck, ShieldCheck, Activity, Heart, Zap, Smile, Crosshair, Sun, Package, Stethoscope };
export const ServiceIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 24 }) => {
  const C = ICONS[name] || Stethoscope;
  return <C size={size} strokeWidth={1.8} />;
};

/** Real numbers only, taken from the clinic's own data. */
export const statsOf = (d: D) => {
  const yrs = (d.doctorExperience.match(/(\d+)\s*\+?\s*(?:years|yrs)/i) || [])[1];
  const avg = d.testimonials.length ? (d.testimonials.reduce((a, t) => a + t.rating, 0) / d.testimonials.length) : 0;
  const out: { v: string; l: string }[] = [];
  if (yrs) out.push({ v: `${yrs}+`, l: 'Years experience' });
  if (avg) out.push({ v: avg.toFixed(1), l: `Patient rating (${d.testimonials.length} reviews)` });
  out.push({ v: String(d.services.length), l: 'Treatments offered' });
  out.push({ v: d.consultationFee.replace(/\s*\(.*\)/, ''), l: 'Consultation fee' });
  return out.slice(0, 4);
};

/** Speciality photos from the curated pool (hero first). */
import { heroPhotos } from '../../data/clinicPhotos';
export const heroPics = (d: D, w = 1600) => heroPhotos(d.niche, w);
export const pics = (d: D, w = 1400) => photosFor(d.niche, w);
export const galleryOf = (d: D): { src: string; label: string }[] =>
  pics(d, 900).map((src, i) => ({ src, label: ['', 'Our clinic', 'Care and technology', 'Patient comfort'][i] || d.nicheTitle }));

/** Fade-up on scroll; does nothing when the visitor prefers reduced motion. */
export const useReveal = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    root.classList.add('rv-on');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); } }), { threshold: 0.1 });
    root.querySelectorAll('[data-rv]').forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
};
export const RV_CSS = `.rv-on [data-rv]{opacity:0;transform:translateY(28px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1)}.rv-on [data-rv].rv-in{opacity:1;transform:none}`;

/** Counts up to a number when it scrolls into view. Non-numeric text is shown as is. */
export const CountUp: React.FC<{ value: string }> = ({ value }) => {
  const m = value.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  const [n, setN] = useState<number | null>(null);
  const el = React.useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!m || !el.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = parseInt(m[2].replace(/,/g, ''), 10);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => { const k = Math.min(1, (t - t0) / 1100); setN(Math.round(target * (1 - Math.pow(1 - k, 3)))); if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    });
    io.observe(el.current);
    return () => io.disconnect();
  }, [value]);
  if (!m) return <span>{value}</span>;
  return <span ref={el}>{m[1]}{(n ?? parseInt(m[2].replace(/,/g, ''), 10)).toLocaleString('en-US')}{m[3]}</span>;
};

export const FloatingWA: React.FC<{ d: D }> = ({ d }) => (
  <a className="fwa" href={waUrl(d)} target="_blank" rel="noreferrer" aria-label="WhatsApp par appointment">
    <MessageCircle size={26} />
  </a>
);
export const FWA_CSS = `
.fwa{position:fixed;right:18px;bottom:18px;z-index:50;width:58px;height:58px;border-radius:50%;background:#25d366;color:#fff!important;display:grid;place-items:center;box-shadow:0 8px 24px rgba(37,211,102,.5)}
.fwa:after{content:"";position:absolute;inset:0;border-radius:50%;border:2px solid #25d366;animation:fwa 2.2s ease-out infinite}
@keyframes fwa{to{transform:scale(1.55);opacity:0}}
@media(prefers-reduced-motion:reduce){.fwa:after{animation:none}}
`;

export type D = ClinicTemplateData;
export const DESIGN_NAMES: Record<number, string> = {
  1: 'Classic Pro', 2: 'Academy', 3: 'Night Suite', 4: 'Daylight', 5: 'Vivid', 6: 'Dental',
};

/** Each speciality gets its own accent so every clinic's site looks made for it. */
const ACCENTS: Record<string, string> = {
  dental: '#0e9f9a', skin: '#d6456f', eye: '#2563eb', ortho: '#ea6a1a', cardio: '#d1303a', peds: '#e8960c',
  gynae: '#b83a85', pet: '#2f9e50', general: '#0f766e', physio: '#7442d6', ent: '#0891b2', neuro: '#6d3fd0',
  uro: '#0369a1', nephro: '#1d4ed8', gastro: '#b7791f', pulmo: '#0284c7', psych: '#7a55c4', endo: '#0d9488',
  onco: '#b4235f', lab: '#4f46e5', radiology: '#51607a', hair: '#a8561a', plastic: '#d12a82', surgery: '#b42323',
  homeo: '#2f8a45', nutrition: '#5f9a14', pharmacy: '#0a9468', ivf: '#c23fd0', homecare: '#e0561b', hospital: '#0e7490',
};
export const accentOf = (d: D) => ACCENTS[d.niche] || '#0f766e';

export const waNumber = (d: D) => {
  const c = (d.whatsApp || d.phone || '').replace(/[^0-9]/g, '');
  return c.startsWith('92') ? c : `92${c.replace(/^0/, '')}`;
};
export const waUrl = (d: D, extra = '') =>
  `https://wa.me/${waNumber(d)}?text=${encodeURIComponent(`Assalam-o-Alaikum ${d.doctorName || 'Doctor Sahib'}! Main ${d.businessName} mein appointment lena chahta/chahti hoon. ${extra}`.trim())}`;
export const telUrl = (d: D) => `tel:+${waNumber(d)}`;
export const mapUrl = (d: D) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.businessName} ${d.address} ${d.city}`)}`;
export const initials = (n: string) => n.replace(/^(prof\.?|dr\.?|assoc\.?|asst\.?)\s*/gi, '').replace(/^(dr\.?)\s*/i, '').split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
export const shortName = (n: string) => n.replace(/\s+(multan|lahore|karachi|islamabad)$/i, '');

/** Image that quietly disappears if it cannot load, so the box behind it still looks designed. */
export const Img: React.FC<{ src: string; alt?: string; className?: string; style?: React.CSSProperties }> = ({ src, alt = '', className, style }) => {
  const [bad, setBad] = useState(false);
  if (bad || !src) return null;
  return <img src={src} alt={alt} className={className} style={style} onError={() => setBad(true)} loading="eager" />;
};

export const useFonts = (families: string) => {
  useEffect(() => {
    const id = 'dz-fonts-' + families.length + families.slice(0, 12);
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
    document.head.appendChild(l);
  }, [families]);
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const nextDays = () => {
  const out: { label: string; sub: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const x = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    out.push({ label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : DAYS[x.getDay()], sub: x.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) });
  }
  return out;
};

/** Working booking widget: pick a treatment and a day, WhatsApp opens with the message filled in. */
export const BookingCard: React.FC<{ d: D; title?: string; cta?: string; button?: string }> = ({ d, title = 'Appointment request', cta, button = 'Send on WhatsApp' }) => {
  const days = useMemo(nextDays, []);
  const [svc, setSvc] = useState(d.services[0]?.title || 'General consultation');
  const [day, setDay] = useState(0);
  const [name, setName] = useState('');
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const when = `${days[day].label} (${days[day].sub})`;
    window.open(waUrl(d, `Treatment: ${svc}. Day: ${when}.${name ? ` Patient name: ${name}.` : ''} Please confirm my token and time.`), '_blank');
  };
  return (
    <form className="bk" onSubmit={send}>
      <h3 className="bk-t">{title}</h3>
      <label className="bk-l" htmlFor="bk-svc">Treatment</label>
      <select id="bk-svc" className="bk-i" value={svc} onChange={e => setSvc(e.target.value)}>
        {d.services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
        <option value="General consultation">General consultation</option>
      </select>
      <span className="bk-l">Day</span>
      <div className="bk-days" role="radiogroup" aria-label="Din">
        {days.map((x, i) => (
          <button key={i} type="button" role="radio" aria-checked={day === i} className={'bk-d' + (day === i ? ' on' : '')} onClick={() => setDay(i)}>
            <b>{x.label}</b><small>{x.sub}</small>
          </button>
        ))}
      </div>
      <label className="bk-l" htmlFor="bk-name">Patient name (optional)</label>
      <input id="bk-name" className="bk-i" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <button className="bk-b" type="submit">{button}</button>
      <p className="bk-n">{cta || `${d.timings} · Fee: ${d.consultationFee}`}</p>
    </form>
  );
};

/** Base styles for the booking widget; each design supplies --a (accent), --ink, --card, --line, --on (text on accent). */
export const BOOKING_CSS = `
.bk{display:grid;gap:8px;background:var(--card);color:var(--ink);border:1px solid var(--line);border-radius:var(--r,16px);padding:22px}
.bk-t{font-size:18px;font-weight:700;margin:0 0 4px}
.bk-l{font-size:12.5px;font-weight:600;opacity:.75;margin-top:6px}
.bk-i{width:100%;font:inherit;font-size:15px;padding:11px 12px;border-radius:10px;border:1px solid var(--line);background:transparent;color:inherit}
.bk-i option{color:#111}
.bk-i:focus-visible,.bk-b:focus-visible,.bk-d:focus-visible{outline:3px solid var(--a);outline-offset:2px}
.bk-days{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
.bk-d{font:inherit;color:inherit;background:transparent;border:1px solid var(--line);border-radius:10px;padding:8px 2px;cursor:pointer;display:grid;gap:1px;text-align:center}
.bk-d b{font-size:13px}.bk-d small{font-size:11px;opacity:.65}
.bk-d.on{background:var(--btn,var(--a));color:var(--btn-fg,var(--on));border-color:var(--btn,var(--a))}
.bk-b{font:inherit;font-weight:700;font-size:15.5px;margin-top:10px;padding:14px;border:0;border-radius:12px;background:var(--btn,var(--a));color:var(--btn-fg,var(--on));cursor:pointer}
.bk-b:hover{filter:brightness(1.07)}
.bk-n{font-size:12px;opacity:.7;margin:4px 0 0;text-align:center}
`;

export const FaqList: React.FC<{ d: D; wrap?: string }> = ({ d, wrap = 'faq' }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className={wrap}>
      {d.faqs.map((f, i) => (
        <div key={i} className="faq-i">
          <button type="button" className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
            <span>{f.q}</span><span aria-hidden>{open === i ? '–' : '+'}</span>
          </button>
          {open === i && <p className="faq-a">{f.a}</p>}
        </div>
      ))}
    </div>
  );
};


/** Designs 2-6 only: top up thin content so every clinic page feels complete. Facts come from the clinic's own data. */
export const enrichClinic = (d: D): D => {
  const more: { q: string; a: string }[] = [
    { q: 'How much is the consultation fee?', a: `${d.consultationFee}. The doctor confirms any treatment cost after examination, so there are no surprises.` },
    { q: 'What are the clinic timings?', a: `${d.timings}. Message us on WhatsApp to get a fixed token and avoid waiting.` },
    { q: 'Where is the clinic?', a: `${d.businessName} is at ${d.address}, ${d.city}. Use the Directions button to open the map.` },
    { q: 'Do I need to book in advance?', a: 'Booking is recommended. Pick a day on this page and send the request on WhatsApp. We reply with your token.' },
  ];
  const have = new Set(d.faqs.map(f => f.q));
  const faqs = [...d.faqs, ...more.filter(f => !have.has(f.q))].slice(0, Math.max(4, d.faqs.length));
  return { ...d, faqs };
};
