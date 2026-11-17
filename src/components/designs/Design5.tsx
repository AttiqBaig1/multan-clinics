import React from 'react';
import { D, Faq, Stars, onImgErr, telUrl, waUrl, mapUrl } from './shared';

/** Design 5: Bold Modern, big type, emerald and black blocks, mobile call bar. */
export const Design5: React.FC<{ d: D }> = ({ d }) => (
  <div className="min-h-screen bg-white text-black pb-20 md:pb-0" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
    <header className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between text-sm">
        <span className="font-black tracking-tight text-base">{d.businessName.toUpperCase()}</span>
        <span className="hidden sm:block text-emerald-400">{d.timings}</span>
      </div>
    </header>

    <section className="bg-emerald-500">
      <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3">
          <p className="font-black text-xs tracking-widest">{d.nicheTitle.toUpperCase()} · {d.city.toUpperCase()}</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-black leading-[1.05] tracking-tight">{d.tagline}</h1>
          <p className="mt-4 font-semibold">{d.doctorName} · {d.doctorTitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waUrl(d)} target="_blank" rel="noreferrer" className="px-7 py-4 bg-black text-white font-black">BOOK ON WHATSAPP →</a>
            <a href={telUrl(d)} className="px-7 py-4 border-2 border-black font-black">{d.phone}</a>
          </div>
        </div>
        <img src={d.heroImage} onError={onImgErr} alt="" className="md:col-span-2 w-full h-64 md:h-96 object-cover border-4 border-black" />
      </div>
    </section>

    <section className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-bold tracking-wide">
        {d.badges.slice(0, 4).map((b, i) => <div key={i} className="text-emerald-400">■ {b.toUpperCase()}</div>)}
      </div>
    </section>

    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-5xl font-black tracking-tight">SERVICES</h2>
      <div className="mt-8 border-t-4 border-black">
        {d.services.map((s, i) => (
          <div key={i} className="grid md:grid-cols-[4rem,1fr,auto] gap-3 md:gap-6 py-5 border-b border-neutral-300 items-start">
            <div className="text-3xl font-black text-emerald-500">{String(i + 1).padStart(2, '0')}</div>
            <div><h3 className="text-xl font-extrabold">{s.title}</h3><p className="text-neutral-600 text-sm mt-1">{s.desc}</p></div>
            {s.price && <div className="font-black text-emerald-600">{s.price}</div>}
          </div>
        ))}
      </div>
    </section>

    <section className="bg-neutral-100 px-4 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-4xl font-black tracking-tight">MEET<br />{d.doctorName.toUpperCase()}</h2>
          <p className="mt-4 font-semibold">{d.doctorTitle}</p>
          <p className="text-neutral-600">{d.doctorExperience}</p>
          <p className="mt-4 text-sm"><b>Fee:</b> {d.consultationFee}<br /><b>Timings:</b> {d.timings}</p>
        </div>
        <div className="grid gap-4">
          {d.testimonials.slice(0, 2).map((t, i) => (
            <figure key={i} className="bg-white border-2 border-black p-5">
              <div className="text-emerald-600"><Stars n={t.rating} /></div>
              <blockquote className="text-sm mt-1">“{t.comment}”</blockquote>
              <figcaption className="text-xs font-bold mt-2">{t.name} · {t.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-black mb-6">FAQ</h2>
      <Faq d={d} cls={{ wrap: 'border-t-4 border-black', q: 'w-full flex justify-between gap-3 text-left py-4 font-extrabold border-b border-neutral-300', a: 'py-3 text-sm text-neutral-600' }} />
    </section>

    <section className="bg-black text-white px-4 py-14 text-center">
      <h2 className="text-3xl md:text-4xl font-black">VISIT US</h2>
      <p className="mt-2 text-neutral-400">{d.address}, {d.city}</p>
      <a href={mapUrl(d)} target="_blank" rel="noreferrer" className="inline-block mt-5 px-7 py-3 bg-emerald-500 text-black font-black">GET DIRECTIONS</a>
      <p className="mt-10 text-xs text-neutral-600">© {new Date().getFullYear()} {d.businessName}</p>
    </section>

    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t-4 border-black">
      <a href={telUrl(d)} className="bg-white py-4 text-center font-black">CALL</a>
      <a href={waUrl(d)} target="_blank" rel="noreferrer" className="bg-emerald-500 py-4 text-center font-black">WHATSAPP</a>
    </div>
  </div>
);
