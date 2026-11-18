import React, { useMemo, useState } from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, RV_CSS, ServiceIcon, accentOf, initials, nextDays, statsOf, telUrl, useFonts, useReveal, waUrl, mapUrl } from './shared';
import { CostEstimator, FooterCols, SECTIONS_CSS } from './Sections';

/** Design 5, Mint: soft tinted light theme, centred hero with a floating appointment bar, tabbed treatments. */
export const Design5: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Inter:wght@400;500;600;700;800;900');
  const ref = useReveal();
  const stats = statsOf(d);
  const days = useMemo(nextDays, []);
  const [svc, setSvc] = useState(0);
  const [day, setDay] = useState(0);
  const [tab, setTab] = useState(0);
  const [name, setName] = useState('');
  const go = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(waUrl(d, `Treatment: ${d.services[svc]?.title}. Day: ${days[day].label} (${days[day].sub}).${name ? ` Patient name: ${name}.` : ''} Please confirm my token and time.`), '_blank');
  };
  const t = d.services[tab] || d.services[0];
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(d.businessName + ', ' + d.address + ', ' + d.city)}&output=embed`;
  return (
    <div className="t5" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <header className="nav"><b><i><ServiceIcon name={d.services[0]?.icon || 'Stethoscope'} size={17} /></i>{d.businessName}</b>
        <nav><a href="#tr">Treatments</a><a href="#dr">Doctor</a><a href="#rv">Reviews</a><a href="#vs">Visit</a></nav>
        <a className="call" href={telUrl(d)}><I.Phone size={15} /> {d.phone}</a></header>

      <section className="hero">
        <span className="pill"><i /> {d.nicheTitle} in {d.city}</span>
        <h1>{d.tagline}</h1>
        <p className="lead">{d.doctorName}, {d.doctorTitle}. {d.doctorExperience.replace(/[.\s]+$/, '')}.</p>
        <form className="bar" onSubmit={go}>
          <label><span>Treatment</span><select value={svc} onChange={e => setSvc(+e.target.value)}>{d.services.map((s, i) => <option key={i} value={i}>{s.title}</option>)}</select></label>
          <label><span>Day</span><select value={day} onChange={e => setDay(+e.target.value)}>{days.map((x, i) => <option key={i} value={i}>{x.label}, {x.sub}</option>)}</select></label>
          <label><span>Patient name</span><input value={name} onChange={e => setName(e.target.value)} placeholder="Optional" /></label>
          <button type="submit"><I.MessageCircle size={17} /> Get my token</button>
        </form>
        <p className="note"><I.Clock size={14} /> {d.timings} · {d.consultationFee}</p>
      </section>

      <section className="stats"><div>{stats.map((s, i) => <p key={i} data-rv><b>{s.v}</b><span>{s.l}</span></p>)}</div></section>

      <section className="sec" id="tr">
        <div className="hd" data-rv><small>Treatments and prices</small><h2>Choose a treatment</h2></div>
        <div className="tabs" data-rv>
          <div className="list" role="tablist">{d.services.map((s, i) => (
            <button key={i} role="tab" aria-selected={tab === i} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}>
              <i><ServiceIcon name={s.icon} size={20} /></i><span>{s.title}</span><em>{s.price || 'Ask'}</em></button>))}</div>
          <div className="panel" role="tabpanel">
            <i className="big"><ServiceIcon name={t.icon} size={44} /></i>
            <h3>{t.title}</h3><p>{t.desc}</p>
            <div className="row"><div><small>Starting from</small><b>{t.price || 'Ask at clinic'}</b></div>
              <a href={waUrl(d, `I would like to book: ${t.title}. Please confirm my token.`)} target="_blank" rel="noreferrer">Book this treatment <I.ArrowRight size={16} /></a></div>
          </div>
        </div>
      </section>

      <section className="sec" id="dr"><div className="doc" data-rv>
        <div className="mono">{initials(d.doctorName)}</div>
        <div><small>Your doctor</small><h2>{d.doctorName}</h2><em>{d.doctorTitle}</em><p>{d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}><I.BadgeCheck size={15} /> {b}</li>)}</ul></div></div></section>

      <section className="sec">
        <div className="hd" data-rv><small>Your first visit</small><h2>Three simple steps</h2></div>
        <div className="steps">{['Pick a treatment and day', 'Receive your fixed token', 'Walk in and be seen'].map((s, i) => (
          <div key={i} data-rv><span>{i + 1}</span><h3>{s}</h3><p>{[`Use the bar above or message us on WhatsApp. ${d.timings}.`, 'We confirm your time slot within minutes, so you never queue.', `Visit ${d.address}. ${d.doctorName} sees you on time.`][i]}</p></div>))}</div>
      </section>

      <section className="sec" id="rv">
        <div className="hd" data-rv><small>Patient feedback</small><h2>Trusted in {d.city}</h2></div>
        <div className="revs">{d.testimonials.slice(0, 3).map((r, i) => (
          <figure key={i} data-rv><div className="st">{'★★★★★'}</div><blockquote>{r.comment}</blockquote><figcaption><b>{r.name}</b>{r.role}</figcaption></figure>))}</div>
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
          <div className="inf"><I.Phone size={20} /><div><b>Phone and WhatsApp</b><span>{d.phone}</span></div></div>
          <a className="dir" href={mapUrl(d)} target="_blank" rel="noreferrer"><I.MapPin size={16} /> Open in Maps</a></div>
        <iframe title="Clinic map" src={embed} loading="lazy" />
      </section>
      <FooterCols d={d} /><FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t5{--ink:#0f172a;--card:#fff;--line:#e2e8f0;--on:#fff;--r:24px;--hf:Inter,sans-serif;--hw:800;--hw3:700;--hls:-.03em;--btn:var(--a);--btn-fg:#fff;--wi-bg:color-mix(in srgb,var(--a) 12%,#fff);--wi-fg:var(--a);--ico:var(--a);--est-bg:#0f172a;--est-fg:#fff;--band-bg:var(--a);--band-fg:#fff;--fbg:#0b1220;--fink:#e2e8f0;min-height:100vh;background:color-mix(in srgb,var(--a) 5%,#fff);color:var(--ink);font-family:Inter,system-ui,sans-serif;font-size:16px;line-height:1.6;overflow-x:clip}
.t5 *{box-sizing:border-box}.t5 h1,.t5 h2,.t5 h3{font-family:Inter,sans-serif}.t5 a{color:inherit}
.t5 a:focus-visible,.t5 button:focus-visible,.t5 select:focus-visible,.t5 input:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.nav{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;padding:20px}.nav b{display:flex;gap:10px;align-items:center;font-weight:800;font-size:17px;margin-right:auto;letter-spacing:-.02em}.nav b i{width:34px;height:34px;border-radius:11px;background:var(--a);color:#fff;display:grid;place-items:center}
.nav nav{display:flex;gap:26px;font-size:14.5px;font-weight:500;color:#475569}.nav nav a{text-decoration:none}.nav nav a:hover{color:var(--ink)}
.call{display:inline-flex;gap:8px;align-items:center;background:var(--a);color:#fff!important;padding:10px 20px;border-radius:999px;font-weight:600;font-size:14px;text-decoration:none}
.hero{position:relative;text-align:center;padding:64px 20px 110px;background:radial-gradient(700px 320px at 15% 0%,color-mix(in srgb,var(--a) 18%,transparent),transparent),radial-gradient(600px 320px at 90% 20%,color-mix(in srgb,var(--a) 12%,#c4b5fd 30%),transparent)}
.pill{display:inline-flex;gap:9px;align-items:center;padding:7px 16px;border-radius:999px;background:#fff;border:1px solid var(--line);font-size:13px;font-weight:600;color:#334155}.pill i{width:8px;height:8px;border-radius:50%;background:var(--a)}
.t5 h1{font-size:clamp(38px,6vw,78px);line-height:1.04;font-weight:900;letter-spacing:-.04em;margin:24px auto 0;max-width:13em}
.lead{font-size:18px;color:#475569;max-width:38em;margin:22px auto 0}
.bar{position:absolute;left:50%;bottom:-48px;transform:translateX(-50%);width:min(980px,calc(100% - 40px));background:#fff;border:1px solid var(--line);border-radius:28px;padding:12px;display:grid;grid-template-columns:1.4fr 1fr 1fr auto;gap:6px;box-shadow:0 30px 60px rgba(15,23,42,.14);text-align:left}
.bar label{display:grid;padding:10px 20px;border-radius:18px;gap:2px}.bar label:hover{background:#f8fafc}.bar span{font-size:11.5px;font-weight:700;color:var(--a);text-transform:uppercase;letter-spacing:.08em}
.bar select,.bar input{all:unset;box-sizing:border-box;font:600 15px Inter,sans-serif;color:var(--ink);width:100%;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.bar input{cursor:text}.bar input::placeholder{color:#94a3b8;font-weight:500}
.bar button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:8px;align-items:center;justify-content:center;background:var(--a);color:#fff;font:700 15px Inter,sans-serif;padding:0 30px;border-radius:20px;transition:transform .2s,box-shadow .2s;box-shadow:0 12px 26px color-mix(in srgb,var(--a) 35%,transparent)}.bar button:hover{transform:translateY(-1px)}.bar button:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
.note{display:none}
.stats{max-width:1240px;margin:0 auto;padding:88px 20px 0}.stats>div{background:#fff;border:1px solid var(--line);border-radius:28px;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));padding:26px 10px}
.stats p{margin:0;padding:6px 24px;display:grid;text-align:center;border-left:1px solid var(--line)}.stats p:first-child{border:0}.stats b{font-size:clamp(28px,3.2vw,40px);font-weight:900;letter-spacing:-.035em;color:var(--a);line-height:1.15}.stats span{font-size:13px;color:#64748b}
.sec{max-width:1240px;margin:0 auto;padding:96px 20px 0}.hd{text-align:center;max-width:640px;margin:0 auto 44px}.hd.l{text-align:left;margin:0 0 28px}
.hd small,.doc small{font-size:12px;font-weight:700;color:var(--a);text-transform:uppercase;letter-spacing:.14em}.hd h2,.doc h2{font-size:clamp(30px,4vw,48px);line-height:1.08;font-weight:800;letter-spacing:-.03em;margin:8px 0 10px}
.tabs{display:grid;grid-template-columns:.9fr 1.1fr;gap:20px;align-items:stretch}
.list{display:grid;gap:10px;align-content:start}
.list button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;gap:14px;align-items:center;background:#fff;border:1.5px solid var(--line);border-radius:20px;padding:16px 20px;transition:.2s}
.list button:hover{border-color:color-mix(in srgb,var(--a) 50%,var(--line))}.list button.on{border-color:var(--a);box-shadow:0 14px 30px color-mix(in srgb,var(--a) 18%,transparent)}.list button:focus-visible{outline:3px solid var(--a);outline-offset:2px}
.list i,.big{display:grid;place-items:center;border-radius:15px;background:color-mix(in srgb,var(--a) 12%,#fff);color:var(--a);flex:none}.list i{width:44px;height:44px}.list span{font-weight:700;line-height:1.3;flex:1}.list em{font-style:normal;font-weight:800;font-size:14px;color:var(--a);white-space:nowrap}
.list button.on i{background:var(--a);color:#fff}
.panel{background:linear-gradient(160deg,#fff,color-mix(in srgb,var(--a) 8%,#fff));border:1px solid var(--line);border-radius:30px;padding:40px;display:flex;flex-direction:column;box-shadow:0 20px 44px rgba(15,23,42,.06)}
.big{width:84px;height:84px;border-radius:26px;background:var(--a);color:#fff;margin-bottom:24px;box-shadow:0 18px 36px color-mix(in srgb,var(--a) 35%,transparent)}
.panel h3{margin:0;font-size:clamp(24px,2.6vw,32px);font-weight:800;letter-spacing:-.02em;line-height:1.15}.panel p{margin:12px 0 28px;color:#475569;font-size:16px;max-width:36em}
.row{margin-top:auto;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;padding-top:22px;border-top:1px solid var(--line)}.row div{display:grid}.row small{font-size:12px;color:#64748b}.row b{font-size:26px;font-weight:900;letter-spacing:-.02em}
.row a{display:inline-flex;gap:8px;align-items:center;background:#0f172a;color:#fff!important;font-weight:700;font-size:14.5px;padding:14px 24px;border-radius:16px;text-decoration:none}.row a:hover{background:var(--a)}
.doc{background:#fff;border:1px solid var(--line);border-radius:34px;padding:52px;display:grid;grid-template-columns:.5fr 1.5fr;gap:50px;align-items:center}
.mono{display:grid;place-items:center;width:100%;max-width:230px;aspect-ratio:1;border-radius:40px;background:linear-gradient(135deg,var(--a),color-mix(in srgb,var(--a) 45%,#8b5cf6));color:#fff;font-size:80px;font-weight:900;letter-spacing:-.04em;margin:0 auto;box-shadow:0 30px 60px color-mix(in srgb,var(--a) 35%,transparent)}
.doc em{display:block;font-style:normal;color:var(--a);font-weight:700;margin-bottom:14px}.doc p{color:#475569;margin:0 0 22px}
.doc ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:10px}.doc li{display:flex;gap:7px;align-items:center;padding:9px 16px;border-radius:999px;background:color-mix(in srgb,var(--a) 9%,#fff);color:#334155;font-size:13.5px;font-weight:600}.doc li svg{color:var(--a)}
.steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}.steps>div{background:#fff;border:1px solid var(--line);border-radius:26px;padding:30px}.steps span{width:44px;height:44px;border-radius:14px;background:color-mix(in srgb,var(--a) 12%,#fff);color:var(--a);font-weight:900;font-size:19px;display:grid;place-items:center;margin-bottom:18px}.steps h3{margin:0 0 8px;font-size:19px;font-weight:700}.steps p{margin:0;color:#64748b;font-size:14.5px}
.revs{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}.revs figure{margin:0;background:#fff;border:1px solid var(--line);border-radius:26px;padding:30px}.st{color:#f59e0b;letter-spacing:2px;margin-bottom:14px}.revs blockquote{margin:0 0 22px;font-size:15.5px;color:#334155}.revs figcaption{display:grid;font-size:12.5px;color:#94a3b8}.revs figcaption b{font-size:14.5px;color:var(--ink)}
.two{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:start}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:18px 0;cursor:pointer;font-weight:700}.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 18px;color:#475569}
.visit{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:stretch;padding-bottom:10px}.visit iframe{width:100%;min-height:400px;height:100%;border:0;border-radius:28px;box-shadow:0 24px 50px rgba(15,23,42,.12)}
.inf{display:flex;gap:14px;align-items:flex-start;background:#fff;border:1px solid var(--line);border-radius:20px;padding:18px 22px;margin-bottom:12px}.inf svg{color:var(--a);margin-top:3px;flex:none}.inf div{display:grid;font-size:14px}.inf b{font-size:12px;color:var(--a);text-transform:uppercase;letter-spacing:.08em}.inf span{color:#475569}
.dir{display:inline-flex;gap:8px;align-items:center;margin-top:6px;background:#0f172a;color:#fff!important;font-weight:700;font-size:14.5px;padding:14px 24px;border-radius:16px;text-decoration:none}
.t5 .x-sec{max-width:1240px}
@media(max-width:900px){.nav nav{display:none}.hero{padding:44px 20px 20px}.bar{position:static;transform:none;width:100%;margin-top:34px;grid-template-columns:1fr;border-radius:24px}.bar button{padding:16px;justify-content:center}.note{display:flex;gap:6px;align-items:center;justify-content:center;font-size:13px;color:#64748b;margin:16px 0 0}.stats{padding-top:44px}.stats p{border:0;padding:10px}.tabs,.two,.visit{grid-template-columns:1fr}.panel{padding:28px}.doc{grid-template-columns:1fr;padding:30px;gap:26px}.mono{max-width:150px;font-size:52px;border-radius:28px}.sec{padding-top:64px}}
`;
