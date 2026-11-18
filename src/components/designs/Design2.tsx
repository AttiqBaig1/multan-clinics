import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, initials, pics, statsOf, telUrl, useFonts, useReveal, waUrl, mapUrl } from './shared';
import { CostEstimator, FooterCols, SECTIONS_CSS } from './Sections';

/** Design 2, Academy: dark teal hero with centred headline, glass stat chips, 3 steps, photo cards (locked from the Nishtar Academy page). */
export const Design2: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Inter:wght@400;500;600;700;800;900');
  const ref = useReveal();
  const ph = pics(d, 900); const stats = statsOf(d);
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(d.businessName + ', ' + d.address + ', ' + d.city)}&output=embed`;
  const steps = [
    { t: 'Message us on WhatsApp', p: `Tell us the treatment and the day you prefer. ${d.doctorName} sees patients ${d.timings}.`, tag: d.phone },
    { t: 'Get your fixed token', p: 'We confirm a time slot, usually within minutes, so you do not wait in a queue.', tag: 'Reply within minutes' },
    { t: 'Walk in and be seen', p: `Come to ${d.address}. Your token is held for you and the doctor sees you on time.`, tag: d.city },
  ];
  return (
    <div className="t2" ref={ref}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <section className="hero">
        <div className="glow" />
        <div className="in">
          <span className="pill"><I.Sparkles size={15} /> {d.businessName} · {d.nicheTitle}, {d.city}</span>
          <h1>{d.tagline} with <span className="grad">{d.doctorName}</span></h1>
          <p className="lead">{d.doctorTitle}. {d.doctorExperience.replace(/[.\s]+$/, '')}. Book a fixed token on WhatsApp and skip the waiting room.</p>
          <div className="btns">
            <a className="b p" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp <I.ArrowRight size={16} /></a>
            <a className="b g" href={telUrl(d)}><I.Phone size={16} /> Call {d.phone}</a>
            <a className="b e" href={mapUrl(d)} target="_blank" rel="noreferrer"><I.MapPin size={16} /> Directions</a>
          </div>
          <div className="chips">{stats.map((s, i) => <div key={i}><b>{s.v}</b><span>{s.l}</span></div>)}</div>
        </div>
      </section>

      <section className="sec">
        <div className="hd" data-rv><small>Simple 3-step visit</small><h2>How your visit works</h2><p>No calls on hold. Everything is arranged on WhatsApp.</p></div>
        <div className="g3">{steps.map((s, i) => (
          <div className="card step" key={i} data-rv><div className={'num ' + (i === 1 ? 'em' : '')}>{i + 1}</div><h3>{i + 1}. {s.t}</h3><p>{s.p}</p><span className={'tg ' + (i === 1 ? 'em' : '')}>{s.tag}</span></div>))}</div>
      </section>

      <section className="band" id="tr">
        <div className="wrap">
          <div className="hd l" data-rv><small>Treatments and prices</small><h2>What we treat</h2><p>Every price is listed. {d.consultationFee}</p></div>
          <div className="g3">{d.services.map((s, i) => (
            <div className="card course" key={i} data-rv>
              <div className="th"><Img src={ph[(i + 1) % ph.length]} /><span className="cat">{d.nicheTitle}</span></div>
              <div className="bd"><h3>{s.title}</h3><p>{s.desc}</p>
                <div className="ft"><b>{s.price || 'Ask at clinic'}</b><a href={waUrl(d)} target="_blank" rel="noreferrer">Book <I.ChevronRight size={14} /></a></div></div>
            </div>))}</div>
        </div>
      </section>

      <section className="sec"><div className="card fac" data-rv>
        <div className="mono"><span>{initials(d.doctorName)}</span><b>{d.doctorName}</b><em>{d.doctorTitle}</em></div>
        <div>
          <small>Your doctor</small>
          <h2>Care you can trust, from one doctor</h2>
          <p>{d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}><I.BadgeCheck size={16} /> {b}</li>)}</ul>
        </div></div></section>

      <section className="band alt">
        <div className="wrap"><div className="hd" data-rv><small>Patient feedback</small><h2>Trusted by patients in {d.city}</h2></div>
          <div className="g3">{d.testimonials.slice(0, 3).map((t, i) => (
            <div className="card rv" key={i} data-rv><div className="st">{'★★★★★'}</div><p>“{t.comment}”</p><b>{t.name}</b><span>{t.role}</span></div>))}</div></div>
      </section>

      <CostEstimator d={d} />

      <section className="sec two" id="book">
        <div><div className="hd l" data-rv><small>Questions</small><h2>Before you visit</h2></div><FaqList d={d} /></div>
        <BookingCard d={d} title="Book your visit" />
      </section>

      <section className="sec visit" id="vs">
        <div><div className="hd l" data-rv><small>{d.city} clinic</small><h2>Visit us</h2></div>
          <div className="card info"><I.MapPin size={20} /><div><b>Address</b><span>{d.address}, {d.city}</span></div></div>
          <div className="card info"><I.Clock size={20} /><div><b>Timings</b><span>{d.timings}</span></div></div>
          <div className="card info"><I.Phone size={20} /><div><b>Phone and WhatsApp</b><span>{d.phone}</span></div></div>
          <a className="b p" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={16} /> Message the clinic on WhatsApp</a></div>
        <iframe title="Clinic map" src={embed} loading="lazy" />
      </section>
      <FooterCols d={d} /><FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t2{--a:#0d9488;--btn:#0d9488;--btn-fg:#fff;--ink:#0f172a;--card:#fff;--line:#e2e8f0;--on:#fff;--r:24px;--hf:Inter,sans-serif;--hw:800;--hw3:700;--hls:-.02em;--wi-bg:#f0fdfa;--wi-fg:#0f766e;--ico:#0f766e;--est-bg:#0f172a;--est-fg:#fff;--band-bg:#0f766e;--band-fg:#fff;--fbg:#0b1220;--fink:#e2e8f0;min-height:100vh;background:#f8fafc;color:var(--ink);font-family:Inter,system-ui,sans-serif;font-size:16px;line-height:1.6;overflow-x:clip}
.t2 *{box-sizing:border-box}.t2 h1,.t2 h2,.t2 h3{font-family:Inter,sans-serif}.t2 a{color:inherit}
.t2 a:focus-visible,.t2 button:focus-visible{outline:3px solid #14b8a6;outline-offset:3px}
.hero{position:relative;overflow:hidden;background:linear-gradient(180deg,#042f2e,#0f172a 55%,#020617);color:#fff;padding:84px 20px 90px;border-bottom:1px solid rgba(20,184,166,.25)}
.glow{position:absolute;left:50%;top:22%;transform:translateX(-50%);width:620px;height:300px;background:rgba(13,148,136,.2);border-radius:50%;filter:blur(70px);pointer-events:none}
.in{position:relative;max-width:1100px;margin:0 auto;text-align:center}
.pill{display:inline-flex;gap:8px;align-items:center;padding:7px 16px;border-radius:999px;background:rgba(20,184,166,.15);border:1px solid rgba(45,212,191,.3);color:#5eead4;font-size:13px;font-weight:600}
.t2 h1{font-size:clamp(34px,5.6vw,66px);line-height:1.08;font-weight:900;letter-spacing:-.03em;margin:26px auto 0;max-width:15em}
.grad{background:linear-gradient(90deg,#2dd4bf,#6ee7b7);-webkit-background-clip:text;background-clip:text;color:transparent}
.lead{font-size:clamp(16px,1.7vw,19px);color:#cbd5e1;max-width:40em;margin:22px auto 0}
.btns{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:34px}
.b{display:inline-flex;gap:8px;align-items:center;justify-content:center;padding:15px 28px;border-radius:16px;font-weight:700;font-size:15px;text-decoration:none;transition:transform .2s,background .2s}
.b:hover{transform:translateY(-2px)}.b.p{background:#0d9488;color:#fff!important;box-shadow:0 14px 30px rgba(13,148,136,.3)}.b.p:hover{background:#0f766e}
.b.g{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff!important;backdrop-filter:blur(8px)}.b.e{background:rgba(5,150,105,.2);border:1px solid rgba(16,185,129,.3);color:#6ee7b7!important}
.chips{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;max-width:880px;margin:54px auto 0;padding-top:34px;border-top:1px solid rgba(30,41,59,.9);text-align:left}
.chips div{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:16px 18px;display:grid}.chips b{font-size:26px;font-weight:900;color:#5eead4;line-height:1.1}.chips span{font-size:12.5px;color:#94a3b8;margin-top:4px}
.sec{max-width:1240px;margin:0 auto;padding:90px 20px 0}.wrap{max-width:1240px;margin:0 auto;padding:0 20px}
.hd{text-align:center;max-width:680px;margin:0 auto 46px}.hd.l{text-align:left;margin:0 0 30px}
.hd small,.fac small{font-size:12px;font-weight:700;color:#0f766e;text-transform:uppercase;letter-spacing:.14em}.hd h2,.fac h2{font-size:clamp(28px,3.8vw,44px);line-height:1.1;font-weight:800;letter-spacing:-.025em;margin:8px 0 10px}.hd p{margin:0;color:#64748b}
.g3{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:26px}
.card{background:#fff;border:1px solid #e2e8f0;border-radius:24px;box-shadow:0 1px 2px rgba(15,23,42,.04);transition:box-shadow .25s,transform .25s}.card:hover{box-shadow:0 18px 40px rgba(15,23,42,.1)}
.step{padding:32px}.num{width:48px;height:48px;border-radius:16px;background:#f0fdfa;color:#0f766e;font-weight:900;font-size:20px;display:grid;place-items:center;margin-bottom:16px}.num.em{background:#ecfdf5;color:#047857}
.step h3{margin:0 0 10px;font-size:19px;font-weight:700}.step p{margin:0 0 16px;font-size:14.5px;color:#475569}
.tg{font:600 12px/1 ui-monospace,monospace;background:#f1f5f9;color:#0f766e;padding:7px 11px;border-radius:10px;display:inline-block}.tg.em{background:#ecfdf5;color:#047857}
.band{background:#f1f5f9;border-block:1px solid #e2e8f0;margin-top:90px;padding:80px 0}.band.alt{background:#f8fafc;border:0;margin-top:30px;padding-bottom:0}
.course{overflow:hidden;display:flex;flex-direction:column}.th{position:relative;aspect-ratio:16/9;background:linear-gradient(135deg,#0f766e,#0f172a)}.th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.cat{position:absolute;left:12px;top:12px;background:rgba(17,94,89,.92);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:8px}
.bd{padding:22px 24px 24px;display:flex;flex-direction:column;flex:1}.course h3{margin:0;font-size:18px;font-weight:700;line-height:1.3}.course p{margin:8px 0 18px;font-size:13.5px;color:#64748b}
.ft{margin-top:auto;padding-top:16px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center}.ft b{font-weight:800;font-size:17px}.ft a{display:inline-flex;gap:4px;align-items:center;background:#0d9488;color:#fff!important;font-size:13px;font-weight:700;padding:9px 18px;border-radius:12px;text-decoration:none}
.fac{display:grid;grid-template-columns:.7fr 1.3fr;gap:50px;padding:46px;align-items:center}
.mono{text-align:center;display:grid;gap:6px;justify-items:center}.mono span{width:140px;height:140px;border-radius:30px;background:#0f766e;color:#fff;font-size:52px;font-weight:900;display:grid;place-items:center;box-shadow:0 18px 36px rgba(15,118,110,.3)}.mono b{font-size:19px;margin-top:12px}.mono em{font-style:normal;font-size:13.5px;color:#0f766e;font-weight:600;max-width:24ch}
.fac p{color:#475569;margin:0 0 20px}.fac ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;font-size:14px}.fac li{display:flex;gap:8px;align-items:center}.fac li svg{color:#0d9488;flex:none}
.rv{padding:28px}.st{color:#f59e0b;letter-spacing:2px;margin-bottom:14px}.rv p{margin:0 0 20px;font-size:14.5px;color:#475569}.rv b{display:block;font-size:14px}.rv span{font-size:12px;color:#94a3b8}
.two{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:start}
.visit{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:stretch;padding-bottom:20px}.visit iframe{width:100%;min-height:420px;height:100%;border:0;border-radius:24px;box-shadow:0 18px 40px rgba(15,23,42,.1)}
.info{display:flex;gap:14px;align-items:flex-start;padding:18px 22px;margin-bottom:12px}.info svg{color:#0d9488;margin-top:3px;flex:none}.info div{display:grid;font-size:14px}.info b{font-size:12px;color:#0f766e;text-transform:uppercase;letter-spacing:.08em}.info span{color:#475569}.visit .b{margin-top:10px}
.faq-i{border-top:1px solid #e2e8f0}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:18px 0;cursor:pointer;font-weight:700}.faq-q:focus-visible{outline:3px solid #14b8a6}.faq-a{margin:0 0 18px;color:#475569}
.t2 .x-sec{max-width:1240px}
@media(max-width:900px){.chips{grid-template-columns:1fr 1fr}.fac,.two,.visit{grid-template-columns:1fr}.fac{padding:28px}.fac ul{grid-template-columns:1fr}.hero{padding:56px 20px 64px}.sec{padding-top:64px}.band{margin-top:64px;padding:56px 0}.b{width:100%}}
`;
