import React from 'react';
import { D, Faq, Stars, onImgErr, telUrl, waUrl, mapUrl } from './shared';

/** Design 3: Premium Gold, dark editorial, serif headings, full-bleed hero. */
export const Design3: React.FC<{ d: D }> = ({ d }) => {
  const gold = '#d4af37';
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-xl tracking-wide text-white" style={{ fontFamily: 'Georgia, serif' }}>{d.businessName}</div>
          <a href={waUrl(d)} target="_blank" rel="noreferrer" className="px-5 py-2 text-sm font-semibold border" style={{ borderColor: gold, color: gold }}>Reserve a Visit</a>
        </div>
      </header>

      <section className="relative min-h-[88vh] flex items-end">
        <img src={d.heroImage} onError={onImgErr} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 pb-16 pt-40 w-full">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: gold }}>{d.nicheTitle} · {d.city}</p>
          <h1 className="mt-4 text-4xl md:text-6xl text-white max-w-3xl leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{d.tagline}</h1>
          <p className="mt-5 text-neutral-300 max-w-xl">Under the care of {d.doctorName}, {d.doctorTitle}.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waUrl(d)} target="_blank" rel="noreferrer" className="px-7 py-3 font-semibold text-black" style={{ background: gold }}>Book on WhatsApp</a>
            <a href={telUrl(d)} className="px-7 py-3 font-semibold border border-neutral-600 text-white">{d.phone}</a>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs tracking-widest uppercase">
          {d.badges.slice(0, 4).map((b, i) => <div key={i} style={{ color: gold }}>{b}</div>)}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <p className="text-xs tracking-[0.3em] uppercase" style={{ color: gold }}>Treatments</p>
        <h2 className="text-3xl md:text-4xl text-white mt-2" style={{ fontFamily: 'Georgia, serif' }}>Care, refined.</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-px bg-neutral-800">
          {d.services.map((s, i) => (
            <div key={i} className="bg-neutral-950 p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl text-white" style={{ fontFamily: 'Georgia, serif' }}>{s.title}</h3>
                {s.price && <span className="text-sm whitespace-nowrap" style={{ color: gold }}>{s.price}</span>}
              </div>
              <p className="mt-2 text-sm text-neutral-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-900 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase" style={{ color: gold }}>The Physician</p>
          <h2 className="text-3xl md:text-5xl text-white mt-3" style={{ fontFamily: 'Georgia, serif' }}>{d.doctorName}</h2>
          <p className="mt-3 text-neutral-300">{d.doctorTitle}</p>
          <p className="text-neutral-400">{d.doctorExperience}</p>
          <div className="mt-8 inline-flex flex-wrap gap-8 justify-center text-sm">
            <div><div style={{ color: gold }} className="text-xs tracking-widest uppercase">Hours</div>{d.timings}</div>
            <div><div style={{ color: gold }} className="text-xs tracking-widest uppercase">Consultation</div>{d.consultationFee}</div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl text-white" style={{ fontFamily: 'Georgia, serif' }}>Patient voices</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {d.testimonials.slice(0, 3).map((t, i) => (
            <figure key={i} className="border border-neutral-800 p-6">
              <div style={{ color: gold }}><Stars n={t.rating} /></div>
              <blockquote className="mt-3 text-sm text-neutral-300">“{t.comment}”</blockquote>
              <figcaption className="mt-4 text-xs text-neutral-500">{t.name} · {t.role}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-20">
        <h2 className="text-3xl text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>Questions</h2>
        <Faq d={d} cls={{ wrap: 'divide-y divide-neutral-800 border-y border-neutral-800', q: 'w-full flex justify-between gap-3 text-left py-4 text-white', a: 'pb-4 text-sm text-neutral-400' }} />
      </section>

      <section className="border-t border-neutral-800 px-4 py-14 text-center">
        <p className="text-neutral-400">{d.address}, {d.city}</p>
        <div className="mt-5 flex flex-wrap gap-3 justify-center">
          <a href={waUrl(d)} target="_blank" rel="noreferrer" className="px-7 py-3 font-semibold text-black" style={{ background: gold }}>WhatsApp</a>
          <a href={mapUrl(d)} target="_blank" rel="noreferrer" className="px-7 py-3 border border-neutral-600 text-white">Directions</a>
        </div>
        <p className="mt-10 text-xs text-neutral-600">© {new Date().getFullYear()} {d.businessName}</p>
      </section>
    </div>
  );
};
