import React from 'react';
import { D, heroPics, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, RV_CSS, ServiceIcon, Img, pics, accentOf, initials, statsOf, telUrl, useFonts, useReveal, waUrl, mapUrl } from './shared';
import { CostEstimator, FooterCols, SECTIONS_CSS } from './Sections';

/** Design 4, Daylight: light and airy, gradient headline, floating popular-treatments card, icon tiles, dark doctor block. */
export const Design4: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Inter:wght@400;500;600;700;800;900');
  const ref = useReveal();
  const stats = statsOf(d);
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(d.businessName + ', ' + d.address + ', ' + d.city)}&output=embed`;
  const icon = (i: number) => d.services[i]?.icon || d.services[0]?.icon || 'Stethoscope';
  return (
    <div className="t4" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <div className="hw"><div className="hbg4"><Img src={heroPics(d)[0]} /></div>
      <header className="nav"><b><i><ServiceIcon name={icon(0)} size={18} /></i>{d.businessName}</b>
        <nav><a href="#tr">Treatments</a><a href="#dr">Doctor</a><a href="#rv">Reviews</a><a href="#vs">Visit</a></nav>
        <a className="call" href={telUrl(d)}><I.Phone size={15} /> {d.phone}</a></header>

      <section className="hero">
        <div className="blob b1" /><div className="blob b2" />
        <div className="l">
          <span className="pill"><I.Sparkles size={14} /> {d.nicheTitle} in {d.city}</span>
          <h1>{d.tagline}<br />with <span className="grad">{d.doctorName}</span></h1>
          <p className="lead">{d.doctorTitle}. {d.doctorExperience.replace(/[.\s]+$/, '')}. Pick a day, get a fixed token on WhatsApp and skip the waiting room.</p>
          <div className="btns">
            <a className="b p" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp <I.ArrowRight size={16} /></a>
            <a className="b s" href={mapUrl(d)} target="_blank" rel="noreferrer"><I.MapPin size={16} /> Directions</a>
          </div>
          <div className="rate"><span>{'★★★★★'}</span><b>{stats[1]?.v || stats[0]?.v}</b><em>{stats[1]?.l || stats[0]?.l}</em></div>
        </div>
        <div className="r">
          <div className="pop">
            <h3>Popular treatments</h3>
            {d.services.slice(0, 3).map((s, i) => (
              <a key={i} href={waUrl(d)} target="_blank" rel="noreferrer"><i><ServiceIcon name={s.icon} size={20} /></i><span><b>{s.title}</b><em>{s.price || 'Ask at clinic'}</em></span><I.ChevronRight size={18} /></a>))}
            <div className="fee"><I.CalendarCheck size={16} /> {d.consultationFee}</div>
          </div>
          <div className="fl f1"><I.Clock size={16} /> {d.timings.split('(')[0].trim()}</div>
          <div className="fl f2"><I.BadgeCheck size={16} /> {d.badges[0]}</div>
        </div>
      </section>

      </div>

      <section className="strip"><div>{stats.map((s, i) => <p key={i} data-rv><b>{s.v}</b><span>{s.l}</span></p>)}</div></section>

      <section className="sec" id="tr">
        <div className="hd" data-rv><small>Treatments and prices</small><h2>Clear care, clear prices</h2><p>The final fee is confirmed by the doctor after examination.</p></div>
        <div className="bento">{d.services.map((s, i) => (
          <article key={i} className={i === 0 ? 'big' : d.services.length === 4 && i === 3 ? 'wide' : ''} data-rv>
            <i className="ic"><ServiceIcon name={s.icon} size={i === 0 ? 34 : 26} /></i>
            <h3>{s.title}</h3><p>{s.desc}</p>
            <div className="ft"><b>{s.price || 'Ask at clinic'}</b><a href={waUrl(d)} target="_blank" rel="noreferrer">Book <I.ArrowRight size={14} /></a></div>
          </article>))}</div>
      </section>

      <section className="sec" id="rv">
        <div className="hd" data-rv><small>Patient feedback</small><h2>Trusted in {d.city}</h2></div>
        <div className="revs">{d.testimonials.slice(0, 3).map((t, i) => (
          <figure key={i} data-rv><span className="q">“</span><blockquote>{t.comment}</blockquote><figcaption><b>{t.name}</b>{t.role}</figcaption></figure>))}</div>
      </section>

      <section className="sec" id="dr"><div className="doc" data-rv>
        <div className="mono"><span>{initials(d.doctorName)}</span></div>
        <div><small>Your doctor</small><h2>{d.doctorName}</h2><em>{d.doctorTitle}</em><p>{d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}><I.Check size={14} /> {b}</li>)}</ul></div></div></section>

      <section className="sec">
        <div className="hd" data-rv><small>Your first visit</small><h2>Three simple steps</h2></div>
        <div className="steps">{['Message us on WhatsApp', 'Get your fixed token', 'Walk in and be seen'].map((t, i) => (
          <div key={i} data-rv><span>{i + 1}</span><h3>{t}</h3><p>{[`Tell us the treatment and the day. ${d.timings}.`, 'We confirm a time slot within minutes, so you do not queue.', `Visit ${d.address}. The doctor sees you on time.`][i]}</p></div>))}</div>
      </section>

      <CostEstimator d={d} />

      <section className="sec two">
        <div><div className="hd l" data-rv><small>Questions</small><h2>Before you visit</h2></div><FaqList d={d} /></div>
        <BookingCard d={d} title="Book your visit" />
      </section>

      <section className="sec visit" id="vs">
        <div><div className="hd l" data-rv><small>{d.city} clinic</small><h2>Visit us</h2></div>
          <div className="inf"><I.MapPin size={20} /><div><b>Address</b><span>{d.address}, {d.city}</span></div></div>
          <div className="inf"><I.Clock size={20} /><div><b>Timings</b><span>{d.timings}</span></div></div>
          <div className="inf"><I.Phone size={20} /><div><b>Phone and WhatsApp</b><span>{d.phone}</span></div></div></div>
        <iframe title="Clinic map" src={embed} loading="lazy" />
      </section>
      <FooterCols d={d} /><FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t4{--ink:#0f172a;--card:#fff;--line:#e2e8f0;--on:#fff;--r:24px;--hf:Inter,sans-serif;--hw:800;--hw3:700;--hls:-.025em;--btn:var(--a);--btn-fg:#fff;--wi-bg:color-mix(in srgb,var(--a) 12%,#fff);--wi-fg:var(--a);--ico:var(--a);--est-bg:#0f172a;--est-fg:#fff;--band-bg:var(--a);--band-fg:#fff;--fbg:#0b1220;--fink:#e2e8f0;min-height:100vh;background:#f8fafc;color:var(--ink);font-family:Inter,system-ui,sans-serif;font-size:16px;line-height:1.6;overflow-x:clip}
.t4 *{box-sizing:border-box}.t4 h1,.t4 h2,.t4 h3{font-family:Inter,sans-serif}.t4 a{color:inherit}
.t4 a:focus-visible,.t4 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.nav{position:relative;z-index:3;max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;padding:20px}.nav b{display:flex;gap:10px;align-items:center;font-weight:800;font-size:17px;margin-right:auto;letter-spacing:-.02em}.nav b i{width:34px;height:34px;border-radius:11px;background:var(--a);color:#fff;display:grid;place-items:center}
.nav nav{display:flex;gap:26px;font-size:14.5px;font-weight:500;color:#475569}.nav nav a{text-decoration:none}.nav nav a:hover{color:var(--ink)}
.call{display:inline-flex;gap:8px;align-items:center;background:#0f172a;color:#fff!important;padding:10px 20px;border-radius:999px;font-weight:600;font-size:14px;text-decoration:none}
.hero{position:relative;max-width:1240px;margin:0 auto;padding:40px 20px 80px;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}
.bento{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:minmax(210px,auto);gap:18px}.bento article{border:1px solid #e5e7eb;border-radius:26px;padding:26px;background:#fff;display:flex;flex-direction:column;box-shadow:0 12px 30px rgba(15,23,42,.05)}.bento article.big{grid-column:span 2;grid-row:span 2;background:linear-gradient(150deg,var(--a),color-mix(in srgb,var(--a) 55%,#0f172a));color:#fff;border:0;justify-content:flex-end}.bento article.big h3{font-size:30px;line-height:1.1;letter-spacing:-.02em}.bento article.big p{color:rgba(255,255,255,.85);font-size:16px}.bento article.big .ic{background:rgba(255,255,255,.2);color:#fff;margin-bottom:auto}.bento article.big .ft b{color:#fff;font-size:20px}.bento article.big .ft a{background:#fff;color:#0f172a}.bento article.wide{grid-column:span 2}.bento h3{margin:14px 0 6px}.bento p{margin:0 0 18px;color:#64748b;flex:1;font-size:14.5px}.bento .ft{display:flex;justify-content:space-between;align-items:center;gap:10px}
@media(max-width:900px){.bento{grid-template-columns:1fr 1fr}.bento article.big{grid-column:span 2;grid-row:auto;min-height:260px}}
@media(max-width:560px){.bento{grid-template-columns:1fr}.bento article.big,.bento article.wide{grid-column:auto}}
.hw{position:relative;overflow:hidden}.hbg4{position:absolute;inset:0}.hbg4 img{width:100%;height:100%;object-fit:cover;object-position:70% 30%;opacity:.8}.hbg4:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#f8fafc 0%,rgba(248,250,252,.9) 34%,rgba(248,250,252,.25) 100%),linear-gradient(0deg,#f8fafc 0%,transparent 22%)}
.blob{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;z-index:0}.b1{width:420px;height:420px;left:-120px;top:-60px;background:color-mix(in srgb,var(--a) 22%,transparent)}.b2{width:380px;height:380px;right:-60px;bottom:0;background:color-mix(in srgb,var(--a) 14%,#a78bfa 20%)}
.l,.r{position:relative;z-index:1}
.pill{display:inline-flex;gap:7px;align-items:center;padding:7px 15px;border-radius:999px;background:#fff;border:1px solid #e2e8f0;font-size:13px;font-weight:600;color:var(--a);box-shadow:0 1px 2px rgba(15,23,42,.05)}
.t4 h1{font-size:clamp(38px,5.4vw,72px);line-height:1.04;font-weight:900;letter-spacing:-.035em;margin:22px 0 0}
.grad{background:linear-gradient(90deg,var(--a),color-mix(in srgb,var(--a) 45%,#8b5cf6));-webkit-background-clip:text;background-clip:text;color:transparent}
.lead{font-size:18px;color:#475569;max-width:36em;margin:22px 0 0}
.btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}.b{display:inline-flex;gap:8px;align-items:center;padding:15px 28px;border-radius:16px;font-weight:700;font-size:15px;text-decoration:none;transition:transform .2s}.b:hover{transform:translateY(-2px)}
.b.p{background:var(--a);color:#fff!important;box-shadow:0 14px 30px color-mix(in srgb,var(--a) 35%,transparent)}.b.s{background:#fff;border:1px solid #e2e8f0;color:var(--ink)!important}
.rate{display:flex;gap:10px;align-items:center;margin-top:34px;font-size:14px}.rate span{color:#f59e0b;letter-spacing:2px}.rate b{font-size:18px}.rate em{font-style:normal;color:#64748b}
.pop{background:#fff;border:1px solid #e2e8f0;border-radius:28px;padding:26px;box-shadow:0 30px 60px rgba(15,23,42,.1)}.pop h3{margin:0 0 14px;font-size:18px;font-weight:800}
.pop a{display:flex;gap:14px;align-items:center;padding:14px;border-radius:18px;text-decoration:none;transition:background .2s}.pop a:hover{background:#f1f5f9}.pop a>svg{margin-left:auto;color:#94a3b8;flex:none}
.pop i,.ic{width:46px;height:46px;border-radius:15px;background:color-mix(in srgb,var(--a) 12%,#fff);color:var(--a);display:grid;place-items:center;flex:none}.pop span{display:grid}.pop b{font-size:15px;font-weight:700;line-height:1.3}.pop em{font-style:normal;font-size:13.5px;color:var(--a);font-weight:700}
.fee{display:flex;gap:8px;align-items:center;margin-top:12px;padding:12px 16px;border-radius:14px;background:#f1f5f9;font-size:13.5px;font-weight:600;color:#475569}
.fl{position:absolute;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:10px 16px;font-size:13px;font-weight:600;display:flex;gap:8px;align-items:center;box-shadow:0 14px 30px rgba(15,23,42,.12)}.fl svg{color:var(--a)}.f1{left:-30px;bottom:-22px}.f2{right:-14px;top:-22px}
.strip{background:#0f172a;color:#fff}.strip>div{max-width:1240px;margin:0 auto;padding:30px 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:20px}.strip p{margin:0;display:grid;text-align:center}.strip b{font-size:34px;font-weight:900;letter-spacing:-.03em;color:color-mix(in srgb,var(--a) 55%,#fff)}.strip span{font-size:13px;color:#94a3b8}
.sec{max-width:1240px;margin:0 auto;padding:96px 20px 0}.hd{text-align:center;max-width:640px;margin:0 auto 46px}.hd.l{text-align:left;margin:0 0 28px}
.hd small,.doc small{font-size:12px;font-weight:700;color:var(--a);text-transform:uppercase;letter-spacing:.14em}.hd h2,.doc h2{font-size:clamp(30px,4vw,48px);line-height:1.08;font-weight:800;letter-spacing:-.03em;margin:8px 0 10px}.hd p{margin:0;color:#64748b}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:24px}
.grid article{background:#fff;border:1px solid #e2e8f0;border-radius:26px;padding:30px;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s}.grid article:hover{transform:translateY(-4px);box-shadow:0 24px 44px rgba(15,23,42,.1)}
.ic{width:56px;height:56px;border-radius:18px;margin-bottom:20px}.grid h3{margin:0;font-size:20px;font-weight:700;line-height:1.25}.grid p{margin:10px 0 22px;color:#64748b;font-size:14.5px}
.ft{margin-top:auto;display:flex;justify-content:space-between;align-items:center;padding-top:18px;border-top:1px solid #f1f5f9}.ft b{font-weight:800;font-size:18px}.ft a{display:inline-flex;gap:6px;align-items:center;background:color-mix(in srgb,var(--a) 12%,#fff);color:var(--a)!important;font-weight:700;font-size:13.5px;padding:9px 16px;border-radius:12px;text-decoration:none}
.doc{background:#0f172a;color:#fff;border-radius:34px;padding:52px;display:grid;grid-template-columns:.55fr 1.45fr;gap:50px;align-items:center;position:relative;overflow:hidden}.doc:before{content:"";position:absolute;right:-80px;top:-80px;width:340px;height:340px;border-radius:50%;background:color-mix(in srgb,var(--a) 35%,transparent);filter:blur(70px)}
.doc>*{position:relative}.doc h2{margin-top:10px}.doc em{display:block;font-style:normal;color:color-mix(in srgb,var(--a) 50%,#fff);font-weight:600;margin-bottom:14px}.doc p{color:#cbd5e1;margin:0 0 20px}
.mono span{display:grid;place-items:center;width:100%;max-width:240px;aspect-ratio:1;border-radius:36px;background:linear-gradient(135deg,var(--a),color-mix(in srgb,var(--a) 40%,#6d28d9));font-size:84px;font-weight:900;letter-spacing:-.04em;margin:0 auto;box-shadow:0 30px 60px color-mix(in srgb,var(--a) 40%,transparent)}
.doc ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:10px}.doc li{display:flex;gap:6px;align-items:center;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);font-size:13.5px}.doc li svg{color:color-mix(in srgb,var(--a) 60%,#fff)}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:28px;position:relative}.steps>div{padding-top:8px}.steps span{width:46px;height:46px;border-radius:50%;background:var(--a);color:#fff;font-weight:800;display:grid;place-items:center;margin-bottom:18px;box-shadow:0 0 0 8px color-mix(in srgb,var(--a) 14%,transparent)}.steps h3{margin:0 0 8px;font-size:19px;font-weight:700}.steps p{margin:0;color:#64748b;font-size:14.5px}
.revs{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}.revs figure{margin:0;background:#fff;border:1px solid #e2e8f0;border-radius:26px;padding:32px;position:relative}.revs .q{position:absolute;right:26px;top:6px;font-size:90px;line-height:1;color:color-mix(in srgb,var(--a) 18%,#fff);font-family:Georgia,serif}.revs blockquote{margin:0 0 22px;font-size:15.5px;color:#334155;position:relative}.revs figcaption{display:grid;font-size:12.5px;color:#94a3b8}.revs figcaption b{font-size:14.5px;color:var(--ink)}
.two{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:start}
.faq-i{border-top:1px solid #e2e8f0}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:18px 0;cursor:pointer;font-weight:700}.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 18px;color:#475569}
.visit{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:stretch;padding-bottom:10px}.visit iframe{width:100%;min-height:400px;height:100%;border:0;border-radius:28px;box-shadow:0 24px 50px rgba(15,23,42,.12)}
.inf{display:flex;gap:14px;align-items:flex-start;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:18px 22px;margin-bottom:12px}.inf svg{color:var(--a);margin-top:3px;flex:none}.inf div{display:grid;font-size:14px}.inf b{font-size:12px;color:var(--a);text-transform:uppercase;letter-spacing:.08em}.inf span{color:#475569}
.t4 .x-sec{max-width:1240px}
@media(max-width:900px){.hero{grid-template-columns:1fr;padding-bottom:60px}.nav nav{display:none}.f1{left:10px}.f2{right:10px}.doc{grid-template-columns:1fr;padding:30px;gap:28px}.mono span{max-width:150px;font-size:54px;border-radius:26px}.two,.visit{grid-template-columns:1fr}.sec{padding-top:64px}.b{flex:1;justify-content:center}}
`;
