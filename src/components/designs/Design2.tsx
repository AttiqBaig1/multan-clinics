import React from 'react';
import { D, Faq, Stars, onImgErr, telUrl, waUrl, mapUrl, initials } from './shared';

/** Design 2: Clean Light, white and sky blue, centred hero, soft cards. */
export const Design2: React.FC<{ d: D }> = ({ d }) => (
  <div className="min-h-screen bg-white text-slate-800" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-sky-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="font-bold text-sky-700 text-lg truncate">{d.businessName}</div>
        <div className="flex gap-2">
          <a href={telUrl(d)} className="hidden sm:inline-flex px-4 py-2 rounded-full border border-sky-200 text-sky-700 text-sm font-semibold">Call {d.phone}</a>
          <a href={waUrl(d)} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-sky-600 text-white text-sm font-semibold">Book Appointment</a>
        </div>
      </div>
    </header>

    <section className="bg-gradient-to-b from-sky-50 to-white px-4 pt-14 pb-10 text-center">
      <p className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-bold tracking-wide">{d.nicheTitle} · {d.city}</p>
      <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-slate-900 max-w-3xl mx-auto leading-tight">{d.tagline}</h1>
      <p className="mt-4 text-slate-600 max-w-xl mx-auto">{d.doctorName}, {d.doctorTitle}. {d.doctorExperience}</p>
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <a href={waUrl(d)} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-sky-600 text-white font-semibold shadow-lg shadow-sky-200">WhatsApp par appointment</a>
        <a href={telUrl(d)} className="px-6 py-3 rounded-full bg-white border border-sky-200 text-sky-700 font-semibold">Abhi call karein</a>
      </div>
      <div className="max-w-5xl mx-auto mt-10 rounded-3xl overflow-hidden shadow-xl border border-sky-100">
        <img src={d.heroImage} onError={onImgErr} alt={d.businessName} className="w-full h-64 md:h-96 object-cover" />
      </div>
      <div className="max-w-5xl mx-auto mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        {d.badges.slice(0, 4).map((b, i) => <div key={i} className="rounded-2xl bg-white border border-sky-100 py-3 px-2 font-semibold text-sky-800">✓ {b}</div>)}
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-2xl md:text-3xl font-bold text-center">Hamari Services</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {d.services.map((s, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 p-6 hover:border-sky-300 hover:shadow-lg transition">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 grid place-items-center font-bold">{i + 1}</div>
            <h3 className="mt-3 font-bold text-lg">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
            {s.price && <p className="mt-3 text-sky-700 font-semibold text-sm">{s.price}</p>}
          </div>
        ))}
      </div>
    </section>

    <section className="bg-sky-50 px-4 py-14">
      <div className="max-w-4xl mx-auto grid md:grid-cols-[auto,1fr] gap-8 items-center">
        <div className="w-32 h-32 rounded-full bg-sky-600 text-white text-4xl font-bold grid place-items-center mx-auto">{initials(d.doctorName)}</div>
        <div className="text-center md:text-left">
          <p className="text-xs font-bold tracking-widest text-sky-700">AAPKE DOCTOR</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-1">{d.doctorName}</h2>
          <p className="text-slate-600 mt-1">{d.doctorTitle}</p>
          <p className="text-slate-600">{d.doctorExperience}</p>
          <p className="mt-3 text-sm"><b>Timings:</b> {d.timings} &nbsp;·&nbsp; <b>Fee:</b> {d.consultationFee}</p>
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-2xl md:text-3xl font-bold text-center">Mareezon ki Raay</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-5">
        {d.testimonials.slice(0, 3).map((t, i) => (
          <figure key={i} className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
            <div className="text-amber-500"><Stars n={t.rating} /></div>
            <blockquote className="mt-2 text-sm text-slate-700">“{t.comment}”</blockquote>
            <figcaption className="mt-3 text-xs font-semibold">{t.name} <span className="text-slate-400 font-normal">· {t.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-4 pb-14">
      <h2 className="text-2xl font-bold text-center mb-6">Aam Sawalat</h2>
      <Faq d={d} cls={{ wrap: 'divide-y divide-slate-200 border border-slate-200 rounded-2xl overflow-hidden', q: 'w-full flex justify-between gap-3 text-left px-5 py-4 font-semibold hover:bg-sky-50', a: 'px-5 pb-4 text-sm text-slate-600' }} />
    </section>

    <section className="bg-sky-700 text-white px-4 py-12 text-center">
      <h2 className="text-2xl font-bold">Appointment book karein</h2>
      <p className="mt-2 text-sky-100">{d.address}, {d.city}</p>
      <div className="mt-5 flex flex-wrap gap-3 justify-center">
        <a href={waUrl(d)} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white text-sky-800 font-semibold">WhatsApp</a>
        <a href={telUrl(d)} className="px-6 py-3 rounded-full border border-white/60 font-semibold">{d.phone}</a>
        <a href={mapUrl(d)} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full border border-white/60 font-semibold">Map kholein</a>
      </div>
    </section>
    <footer className="text-center text-xs text-slate-400 py-6">© {new Date().getFullYear()} {d.businessName}</footer>
  </div>
);
