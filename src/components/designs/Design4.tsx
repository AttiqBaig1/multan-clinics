import React from 'react';
import { D, Faq, Stars, onImgErr, telUrl, waUrl, mapUrl, initials } from './shared';

/** Design 4: Warm Family, cream and rose, rounded, doctor-first. */
export const Design4: React.FC<{ d: D }> = ({ d }) => (
  <div className="min-h-screen text-stone-800" style={{ background: '#fff8f1', fontFamily: 'Inter, system-ui, sans-serif' }}>
    <header className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-rose-700 text-lg"><span className="w-9 h-9 rounded-full bg-rose-600 text-white grid place-items-center text-sm">♥</span>{d.businessName}</div>
      <a href={telUrl(d)} className="text-sm font-semibold text-rose-700">{d.phone}</a>
    </header>

    <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <span className="inline-block bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full">{d.nicheTitle}</span>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-stone-900">{d.tagline}</h1>
        <p className="mt-4 text-stone-600">Aap ke apne shehar {d.city} mein, {d.doctorName} ki dekh-bhal mein.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={waUrl(d)} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-2xl bg-rose-600 text-white font-bold shadow-lg shadow-rose-200">WhatsApp par baat karein</a>
          <a href={telUrl(d)} className="px-6 py-3 rounded-2xl bg-white border border-rose-200 text-rose-700 font-bold">Call</a>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">{d.badges.slice(0, 4).map((b, i) => <span key={i} className="text-xs bg-white border border-rose-100 rounded-full px-3 py-1">{b}</span>)}</div>
      </div>
      <div className="relative">
        <img src={d.heroImage} onError={onImgErr} alt="" className="w-full h-80 md:h-[26rem] object-cover rounded-[2.5rem] shadow-xl" />
        <div className="absolute -bottom-5 left-4 right-4 md:left-8 md:right-auto bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-rose-600 text-white font-bold text-lg grid place-items-center">{initials(d.doctorName)}</div>
          <div><div className="font-bold">{d.doctorName}</div><div className="text-xs text-stone-500">{d.doctorTitle}</div></div>
        </div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 pt-16 pb-12">
      <div className="grid sm:grid-cols-3 gap-4 text-center">
        <div className="bg-white rounded-3xl p-5 border border-rose-100"><div className="text-xs text-stone-500">Timings</div><div className="font-bold mt-1 text-sm">{d.timings}</div></div>
        <div className="bg-white rounded-3xl p-5 border border-rose-100"><div className="text-xs text-stone-500">Consultation</div><div className="font-bold mt-1 text-sm">{d.consultationFee}</div></div>
        <div className="bg-white rounded-3xl p-5 border border-rose-100"><div className="text-xs text-stone-500">Tajurba</div><div className="font-bold mt-1 text-sm">{d.doctorExperience}</div></div>
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-extrabold">Hum kya ilaaj karte hain</h2>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        {d.services.map((s, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-rose-100 flex gap-4">
            <div className="w-12 h-12 shrink-0 rounded-2xl bg-rose-100 text-rose-700 font-bold grid place-items-center">{i + 1}</div>
            <div><h3 className="font-bold">{s.title}</h3><p className="text-sm text-stone-600 mt-1">{s.desc}</p>{s.price && <p className="text-sm text-rose-700 font-semibold mt-2">{s.price}</p>}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-extrabold">Mareez kya kehte hain</h2>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {d.testimonials.slice(0, 3).map((t, i) => (
          <figure key={i} className="bg-rose-50 rounded-3xl p-6">
            <div className="text-amber-500"><Stars n={t.rating} /></div>
            <blockquote className="text-sm mt-2">“{t.comment}”</blockquote>
            <figcaption className="text-xs font-bold mt-3">{t.name}<span className="font-normal text-stone-500"> · {t.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-extrabold mb-5">Sawal jawab</h2>
      <Faq d={d} cls={{ wrap: 'space-y-3', q: 'w-full flex justify-between gap-3 text-left bg-white rounded-2xl border border-rose-100 px-5 py-4 font-semibold', a: 'px-5 pt-2 pb-3 text-sm text-stone-600' }} />
    </section>

    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-rose-600 text-white rounded-[2rem] p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold">Aaj hi appointment lein</h2>
        <p className="mt-2 text-rose-100">{d.address}, {d.city}</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <a href={waUrl(d)} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-2xl bg-white text-rose-700 font-bold">WhatsApp</a>
          <a href={mapUrl(d)} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-2xl border border-white/60 font-bold">Map</a>
        </div>
      </div>
      <p className="text-center text-xs text-stone-400 mt-8">© {new Date().getFullYear()} {d.businessName}</p>
    </section>
  </div>
);
