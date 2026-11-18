import React, { useRef, useState } from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, RV_CSS, ServiceIcon, accentOf, initials, nextDays, statsOf, telUrl, useFonts, useReveal, waUrl, mapUrl } from './shared';
import { CostEstimator, FooterCols, SECTIONS_CSS } from './Sections';

/** Design 5, Vivid: full-colour gradient hero, white sheet rising over it, swipeable treatment cards, review slider. */
export const Design5: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Inter:wght@900&family=Manrope:wght@400;500;600;700;800');
  const ref = useReveal();
  const rail = useRef<HTMLDivElement>(null);
  const [rv, setRv] = useState(0);
  const stats = statsOf(d);
  const days = nextDays().slice(0, 3);
  const revs = d.testimonials.slice(0, 3);
  const r = revs[rv] || revs[0];
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(d.businessName + ', ' + d.address + ', ' + d.city)}&output=embed`;
  const slide = (dir: number) => rail.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  return (
    <div className="t5" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>

      <div className="top">
        <i className="o o1" /><i className="o o2" />
        <header className="nav"><b><span><ServiceIcon name={d.services[0]?.icon || 'Stethoscope'} size={17} /></span>{d.businessName}</b>
          <nav><a href="#tr">Treatments</a><a href="#dr">Doctor</a><a href="#rv">Reviews</a><a href="#vs">Visit</a></nav>
          <a className="call" href={telUrl(d)}><I.Phone size={15} /> {d.phone}</a></header>

        <section className="hero">
          <div className="l">
            <span className="pill"><I.Sparkles size={14} /> {d.nicheTitle} · {d.city}</span>
            <h1>{d.tagline} with <span>{d.doctorName}</span></h1>
            <p className="lead">{d.doctorName} · {d.doctorTitle}. {d.doctorExperience.replace(/[.\s]+$/, '')}.</p>
            <div className="btns">
              <a className="b w" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={17} /> Book on WhatsApp</a>
              <a className="b ol" href={mapUrl(d)} target="_blank" rel="noreferrer"><I.MapPin size={16} /> Directions</a>
            </div>
          </div>
          <div className="r">
            <div className="doc"><span>{initials(d.doctorName)}</span><div><b>{d.doctorName}</b><em>{d.doctorTitle}</em></div></div>
            <div className="tok"><h3>Next tokens</h3>
              <div>{days.map((x, i) => <a key={i} href={waUrl(d, `Day: ${x.label} (${x.sub}). Please confirm my token.`)} target="_blank" rel="noreferrer"><b>{x.label}</b><span>{x.sub}</span></a>)}</div>
              <p><I.Clock size={14} /> {d.timings.split('(')[0].trim()}</p></div>
            <div className="rt"><span>{'★★★★★'}</span><b>{stats[1]?.v || stats[0]?.v}</b></div>
          </div>
        </section>
      </div>

      <div className="sheet">
        <section className="tiles"><div>{stats.map((s, i) => <p key={i} className={'c' + (i % 4)} data-rv><b>{s.v}</b><span>{s.l}</span></p>)}</div></section>

        <section className="sec" id="tr">
          <div className="hd" data-rv><div><small>Treatments and prices</small><h2>Swipe through our treatments</h2></div>
            <div className="arr"><button onClick={() => slide(-1)} aria-label="Previous treatments"><I.ChevronLeft size={20} /></button><button onClick={() => slide(1)} aria-label="Next treatments"><I.ChevronRight size={20} /></button></div></div>
          <div className="rail" ref={rail} tabIndex={0} aria-label="Treatments">
            {d.services.map((s, i) => (
              <a className={'card c' + (i % 4)} key={i} href={waUrl(d, `I would like to book: ${s.title}. Please confirm my token.`)} target="_blank" rel="noreferrer">
                <i className="ic"><ServiceIcon name={s.icon} size={30} /></i>
                <h3>{s.title}</h3><p>{s.desc}</p>
                <div className="ft"><b>{s.price || 'Ask at clinic'}</b><span>Book <I.ArrowRight size={14} /></span></div>
              </a>))}
          </div>
        </section>

        <section className="sec" id="dr">
          <div className="band" data-rv>
            <div className="mono">{initials(d.doctorName)}</div>
            <div><small>Your doctor</small><h2>{d.doctorName}</h2><em>{d.doctorTitle}</em><p>{d.doctorExperience}</p>
              <ul>{d.badges.map((b, i) => <li key={i}><I.Check size={14} /> {b}</li>)}</ul></div>
          </div>
        </section>

        <section className="sec">
          <div className="hd" data-rv><div><small>Your first visit</small><h2>Three steps. No waiting room.</h2></div></div>
          <div className="steps">{['Pick a treatment and day', 'Receive your fixed token', 'Walk in and be seen'].map((t, i) => (
            <div key={i} data-rv><b>{i + 1}</b><h3>{t}</h3><p>{[`Message us on WhatsApp. ${d.timings}.`, 'We confirm a time slot within minutes.', `Visit ${d.address}. ${d.doctorName} sees you on time.`][i]}</p></div>))}</div>
        </section>

        <section className="sec" id="rv">
          <div className="hd" data-rv><div><small>Patient feedback</small><h2>Trusted in {d.city}</h2></div></div>
          {r && <figure className="quote" key={rv}>
            <span className="qm">“</span><blockquote>{r.comment}</blockquote>
            <figcaption><span className="av">{initials(r.name)}</span><div><b>{r.name}</b><em>{r.role}</em></div>
              <div className="dots" role="tablist" aria-label="Choose a review">{revs.map((_, i) => <button key={i} role="tab" aria-selected={rv === i} aria-label={`Review ${i + 1}`} className={rv === i ? 'on' : ''} onClick={() => setRv(i)} />)}</div></figcaption>
          </figure>}
        </section>

        <CostEstimator d={d} />

        <section className="sec two">
          <div><div className="hd l" data-rv><div><small>Questions</small><h2>Before you visit</h2></div></div><FaqList d={d} /></div>
          <BookingCard d={d} title="Book your visit" />
        </section>

        <section className="sec visit" id="vs">
          <div><div className="hd l" data-rv><div><small>{d.city} clinic</small><h2>Visit us</h2></div></div>
            <div className="inf"><I.MapPin size={20} /><div><b>Address</b><span>{d.address}, {d.city}</span></div></div>
            <div className="inf"><I.Clock size={20} /><div><b>Timings</b><span>{d.timings}</span></div></div>
            <div className="inf"><I.Phone size={20} /><div><b>Phone and WhatsApp</b><span>{d.phone}</span></div></div></div>
          <iframe title="Clinic map" src={embed} loading="lazy" />
        </section>
        <FooterCols d={d} />
      </div>
      <FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t5{--ink:#111827;--card:#fff;--line:#e5e7eb;--on:#fff;--r:26px;--hf:Manrope,sans-serif;--hw:800;--hw3:700;--hls:-.035em;--btn:var(--a);--btn-fg:#fff;--wi-bg:color-mix(in srgb,var(--a) 12%,#fff);--wi-fg:var(--a);--ico:var(--a);--est-bg:#111827;--est-fg:#fff;--band-bg:var(--a);--band-fg:#fff;--fbg:#0b0f1a;--fink:#e5e7eb;--deep:color-mix(in srgb,var(--a) 78%,#000);min-height:100vh;background:var(--deep);color:var(--ink);font-family:Manrope,system-ui,sans-serif;font-size:16px;line-height:1.6;overflow-x:clip}
.t5 *{box-sizing:border-box}.t5 h1,.t5 h2,.t5 h3{font-family:Manrope,sans-serif}.t5 a{color:inherit}
.t5 a:focus-visible,.t5 button:focus-visible,.t5 [tabindex]:focus-visible{outline:3px solid #fde047;outline-offset:3px}
.top{position:relative;overflow:hidden;color:#fff;background:linear-gradient(135deg,var(--deep) 0%,color-mix(in srgb,var(--a) 55%,#4c1d95) 100%);padding-bottom:190px}
.o{position:absolute;border-radius:50%;pointer-events:none}.o1{width:560px;height:560px;right:-160px;top:-200px;background:radial-gradient(circle,rgba(255,255,255,.22),transparent 65%)}.o2{width:420px;height:420px;left:-140px;bottom:-120px;border:60px solid rgba(255,255,255,.07)}
.nav{position:relative;z-index:2;max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;padding:22px 20px}.nav b{display:flex;gap:10px;align-items:center;font-weight:800;font-size:17px;margin-right:auto;letter-spacing:-.02em}.nav b span{width:36px;height:36px;border-radius:12px;background:#fff;color:var(--deep);display:grid;place-items:center}
.nav nav{display:flex;gap:26px;font-size:14.5px;font-weight:600;opacity:.9}.nav nav a{text-decoration:none}
.call{display:inline-flex;gap:8px;align-items:center;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff!important;padding:10px 20px;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;backdrop-filter:blur(8px)}
.hero{position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:50px 20px 0;display:grid;grid-template-columns:1.1fr .9fr;gap:50px;align-items:center}
.pill{display:inline-flex;gap:8px;align-items:center;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.28);font-size:13px;font-weight:700}
.t5 h1{font-family:Inter,Manrope,sans-serif;font-size:clamp(36px,5.4vw,72px);line-height:1.04;font-weight:900;letter-spacing:-.04em;margin:24px 0 0;max-width:14em;text-wrap:balance}.t5 h1 span{color:#fde047}
.lead{font-size:18px;opacity:.9;max-width:34em;margin:22px 0 0}
.btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}.b{display:inline-flex;gap:9px;align-items:center;padding:16px 28px;border-radius:18px;font-weight:800;font-size:15px;text-decoration:none;transition:transform .2s}.b:hover{transform:translateY(-2px)}
.b.w{background:#fff;color:var(--deep)!important;box-shadow:0 18px 36px rgba(0,0,0,.25)}.b.ol{border:1.5px solid rgba(255,255,255,.55);color:#fff!important}
.r{position:relative;display:grid;gap:16px;justify-items:end}
.doc{display:flex;gap:14px;align-items:center;width:min(340px,100%);padding:16px 20px;border-radius:24px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);backdrop-filter:blur(14px);transform:rotate(-2deg) translateX(-24px)}
.doc>span{width:56px;height:56px;border-radius:18px;background:#fff;color:var(--deep);font-weight:800;font-size:22px;display:grid;place-items:center;flex:none}.doc div{display:grid;line-height:1.3}.doc b{font-size:16px}.doc em{font-style:normal;font-size:12.5px;opacity:.85}
.tok{width:min(380px,100%);background:#fff;color:var(--ink);border-radius:28px;padding:24px;box-shadow:0 36px 70px rgba(0,0,0,.35);transform:rotate(1.5deg)}
.tok h3{margin:0 0 14px;font-size:18px;font-weight:800}.tok>div{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.tok a{text-decoration:none;text-align:center;border:1.5px solid var(--line);border-radius:16px;padding:12px 6px;display:grid;line-height:1.3;transition:.2s}.tok a:hover{background:var(--deep);color:#fff;border-color:var(--deep)}.tok a b{font-size:14px}.tok a span{font-size:12px;opacity:.65}
.tok p{margin:14px 0 0;display:flex;gap:6px;align-items:center;font-size:13px;color:#6b7280;font-weight:600}
.rt{display:flex;gap:10px;align-items:center;background:#fde047;color:#111827;border-radius:999px;padding:10px 20px;font-weight:800;box-shadow:0 14px 30px rgba(0,0,0,.25);transform:translateX(-10px) rotate(-2deg)}.rt span{letter-spacing:2px;font-size:14px}
.sheet{position:relative;z-index:2;margin-top:-56px;background:#fff;border-radius:44px 44px 0 0;padding-top:20px}
.tiles>div{max-width:1240px;margin:0 auto;padding:0 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;transform:translateY(-52px);margin-bottom:-52px}
.tiles p{margin:0;border-radius:26px;padding:22px 24px;display:grid;box-shadow:0 20px 40px rgba(17,24,39,.12)}.tiles b{font-size:clamp(28px,3vw,38px);font-weight:800;letter-spacing:-.04em;line-height:1.1}.tiles span{font-size:13px;opacity:.85;margin-top:4px}
.t5 .c0{background:var(--a);color:#fff}.t5 .c1{background:#111827;color:#fff}.t5 .c2{background:color-mix(in srgb,var(--a) 14%,#fff);color:#111827}.t5 .c3{background:#fde68a;color:#111827}
.sec{max-width:1240px;margin:0 auto;padding:100px 20px 0}
.hd{display:flex;justify-content:space-between;align-items:end;gap:20px;margin-bottom:34px}.hd.l{margin-bottom:26px}
.hd small,.band small{font-size:12.5px;font-weight:800;color:var(--a);letter-spacing:.06em}.hd h2,.band h2{font-size:clamp(30px,4vw,52px);line-height:1.04;font-weight:800;letter-spacing:-.04em;margin:8px 0 0;max-width:15em}
.arr{display:flex;gap:10px}.arr button{all:unset;cursor:pointer;width:48px;height:48px;border-radius:50%;border:1.5px solid var(--line);display:grid;place-items:center;transition:.2s}.arr button:hover{background:var(--ink);color:#fff;border-color:var(--ink)}.arr button:focus-visible{outline:3px solid var(--a);outline-offset:2px}
.rail{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 4px 30px;margin:0 -4px;scrollbar-width:none}.rail::-webkit-scrollbar{display:none}
.card{flex:none;width:310px;min-height:370px;scroll-snap-align:start;border-radius:32px;padding:30px;display:flex;flex-direction:column;text-decoration:none;transition:transform .25s}.card:hover{transform:translateY(-6px)}
.card .ic{width:64px;height:64px;border-radius:22px;background:rgba(255,255,255,.2);display:grid;place-items:center;margin-bottom:auto}.card.c2 .ic,.card.c3 .ic{background:rgba(17,24,39,.08)}
.card h3{margin:26px 0 0;font-size:24px;font-weight:800;letter-spacing:-.025em;line-height:1.15}.card p{margin:10px 0 22px;font-size:14.5px;opacity:.85}
.card .ft{display:flex;justify-content:space-between;align-items:center;padding-top:18px;border-top:1px solid rgba(255,255,255,.25)}.card.c2 .ft,.card.c3 .ft{border-color:rgba(17,24,39,.15)}.card .ft b{font-size:18px;font-weight:800}.card .ft span{display:inline-flex;gap:5px;align-items:center;font-size:13px;font-weight:800;background:rgba(255,255,255,.2);padding:8px 14px;border-radius:999px}.card.c2 .ft span,.card.c3 .ft span{background:rgba(17,24,39,.08)}
.band{display:grid;grid-template-columns:.5fr 1.5fr;gap:50px;align-items:center;padding:56px;border-radius:40px;color:#fff;background:linear-gradient(135deg,var(--deep),color-mix(in srgb,var(--a) 50%,#4c1d95));position:relative;overflow:hidden}
.band:after{content:"";position:absolute;right:-90px;top:-90px;width:320px;height:320px;border-radius:50%;background:rgba(255,255,255,.1)}.band>*{position:relative;z-index:1}
.band small{color:#fde047}.band h2{margin-bottom:6px}.band em{display:block;font-style:normal;font-weight:700;opacity:.9;margin-bottom:14px}.band p{margin:0 0 22px;opacity:.88}
.mono{display:grid;place-items:center;aspect-ratio:1;max-width:230px;width:100%;margin:0 auto;border-radius:50%;background:#fff;color:var(--deep);font-size:78px;font-weight:800;letter-spacing:-.05em;box-shadow:0 0 0 14px rgba(255,255,255,.16)}
.band ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:10px}.band li{display:flex;gap:6px;align-items:center;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.26);font-size:13.5px;font-weight:600}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:26px}.steps>div{border-top:3px solid var(--ink);padding-top:22px}.steps b{display:block;font-size:84px;line-height:.9;font-weight:800;letter-spacing:-.06em;color:transparent;-webkit-text-stroke:2px var(--a);margin-bottom:16px}.steps h3{margin:0 0 8px;font-size:21px;font-weight:800}.steps p{margin:0;color:#6b7280;font-size:15px}
.quote{margin:0;border-radius:40px;padding:56px;background:color-mix(in srgb,var(--a) 9%,#fff);position:relative;animation:qin .45s ease}.qm{position:absolute;left:36px;top:-6px;font-size:150px;line-height:1;font-family:Georgia,serif;color:var(--a);opacity:.25}
.quote blockquote{margin:0 0 34px;font-size:clamp(22px,2.8vw,36px);line-height:1.3;font-weight:700;letter-spacing:-.02em;max-width:30em;position:relative}
.quote figcaption{display:flex;gap:16px;align-items:center;flex-wrap:wrap}.av{width:52px;height:52px;border-radius:50%;background:var(--a);color:#fff;font-weight:800;display:grid;place-items:center}.quote div{display:grid;line-height:1.35}.quote em{font-style:normal;font-size:13px;color:#6b7280}
.quote .dots{margin-left:auto;display:flex;flex-direction:row;gap:8px}.dots button{all:unset;cursor:pointer;width:12px;height:12px;border-radius:99px;background:rgba(17,24,39,.2);transition:.25s}.dots button.on{width:34px;background:var(--a)}.dots button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
@keyframes qin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.two{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:start}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:18px 0;cursor:pointer;font-weight:800}.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 18px;color:#4b5563}
.visit{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:stretch;padding-bottom:10px}.visit iframe{width:100%;min-height:400px;height:100%;border:0;border-radius:32px}
.inf{display:flex;gap:14px;align-items:flex-start;background:#f9fafb;border:1px solid var(--line);border-radius:22px;padding:18px 22px;margin-bottom:12px}.inf svg{color:var(--a);margin-top:3px;flex:none}.inf div{display:grid;font-size:14px}.inf b{font-size:12px;color:var(--a);letter-spacing:.06em}.inf span{color:#4b5563}
.t5 .x-sec{max-width:1240px}
@media(max-width:900px){.nav nav{display:none}.hero{grid-template-columns:1fr;padding-top:34px}.r{justify-items:stretch}.doc{transform:none}.tok{transform:none;width:100%}.rt{transform:none;justify-self:start}.band{grid-template-columns:1fr;padding:32px;gap:26px}.mono{max-width:150px;font-size:50px}.quote{padding:36px 26px}.two,.visit{grid-template-columns:1fr}.sec{padding-top:70px}.card{width:80vw}.arr{display:none}.top{padding-bottom:150px}}
@media(prefers-reduced-motion:reduce){.quote{animation:none}.card,.b{transition:none}}
`;
