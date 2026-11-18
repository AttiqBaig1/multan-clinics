import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, RV_CSS, ServiceIcon, accentOf, initials, nextDays, statsOf, telUrl, useFonts, useReveal, waUrl, mapUrl } from './shared';
import { CostEstimator, FooterCols, SECTIONS_CSS } from './Sections';

/** Design 5, Spotlight: fully dark with an accent glow, ticket-style token card, bento treatments grid. */
export const Design5: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Manrope:wght@400;500;600;700;800');
  const ref = useReveal();
  const stats = statsOf(d);
  const days = nextDays().slice(0, 3);
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(d.businessName + ', ' + d.address + ', ' + d.city)}&output=embed`;
  return (
    <div className="t5" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <div className="glowtop" />
      <header className="nav"><b>{d.businessName}</b>
        <nav><a href="#tr">Treatments</a><a href="#dr">Doctor</a><a href="#rv">Reviews</a><a href="#vs">Visit</a></nav>
        <a className="call" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp</a></header>

      <section className="hero">
        <div className="l">
          <span className="pill"><i /> {d.nicheTitle} · {d.city}</span>
          <h1>{d.tagline}</h1>
          <p className="lead">{d.doctorName} · {d.doctorTitle}. {d.doctorExperience.replace(/[.\s]+$/, '')}.</p>
          <div className="btns">
            <a className="b p" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={17} /> Book your token</a>
            <a className="b g" href={telUrl(d)}><I.Phone size={16} /> {d.phone}</a>
          </div>
        </div>
        <div className="tk" data-rv>
          <div className="top"><span>Your token</span><b>Held for you</b></div>
          <div className="mid"><h3>{d.services[0]?.title}</h3><p>{d.doctorName}</p></div>
          <div className="cut"><i /><u /><i /></div>
          <div className="days">{days.map((x, i) => <a key={i} href={waUrl(d, `Day: ${x.label} (${x.sub}). Please confirm my token.`)} target="_blank" rel="noreferrer"><b>{x.label}</b><span>{x.sub}</span></a>)}</div>
          <div className="meta"><span><I.Clock size={14} /> {d.timings.split('(')[0].trim()}</span><span>{d.consultationFee.replace(/\s*\(.*\)/, '')}</span></div>
        </div>
      </section>

      <section className="stats"><div>{stats.map((s, i) => <p key={i} data-rv><b>{s.v}</b><span>{s.l}</span></p>)}</div></section>

      <section className="sec" id="tr">
        <div className="hd" data-rv><h2>Treatments</h2><p>Prices listed up front. The doctor confirms the final fee after examination.</p></div>
        <div className="bento">{d.services.map((s, i) => (
          <a className={'tile' + (i === 0 ? ' big' : '') + (i === d.services.length - 1 && i > 0 && (d.services.length - 1) % 2 === 1 ? ' wide' : '')} key={i} href={waUrl(d)} target="_blank" rel="noreferrer" data-rv>
            <i className="ic"><ServiceIcon name={s.icon} size={i === 0 ? 40 : 26} /></i>
            <h3>{s.title}</h3><p>{s.desc}</p>
            <div className="ft"><b>{s.price || 'Ask at clinic'}</b><span>Book <I.ArrowUpRight size={15} /></span></div>
          </a>))}</div>
      </section>

      <section className="sec" id="dr"><div className="doc" data-rv>
        <div className="mono">{initials(d.doctorName)}</div>
        <div><small>Your doctor</small><h2>{d.doctorName}</h2><em>{d.doctorTitle}</em><p>{d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}><I.Check size={14} /> {b}</li>)}</ul></div></div></section>

      <section className="sec" id="rv">
        <div className="hd" data-rv><h2>What patients say</h2></div>
        <div className="revs">{d.testimonials.slice(0, 3).map((t, i) => (
          <figure key={i} data-rv><div className="st">{'★★★★★'}</div><blockquote>{t.comment}</blockquote><figcaption><b>{t.name}</b>{t.role}</figcaption></figure>))}</div>
      </section>

      <CostEstimator d={d} />

      <section className="sec two">
        <div><div className="hd l" data-rv><h2>Questions</h2></div><FaqList d={d} /></div>
        <BookingCard d={d} title="Book your visit" />
      </section>

      <section className="sec visit" id="vs">
        <div><div className="hd l" data-rv><h2>Visit us</h2></div>
          <div className="inf"><I.MapPin size={20} /><div><b>Address</b><span>{d.address}, {d.city}</span></div></div>
          <div className="inf"><I.Clock size={20} /><div><b>Timings</b><span>{d.timings}</span></div></div>
          <div className="inf"><I.Phone size={20} /><div><b>Phone and WhatsApp</b><span>{d.phone}</span></div></div>
          <a className="b g" href={mapUrl(d)} target="_blank" rel="noreferrer"><I.MapPin size={16} /> Open in Maps</a></div>
        <iframe title="Clinic map" src={embed} loading="lazy" />
      </section>
      <FooterCols d={d} /><FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t5{--ink:#f1f5f9;--card:#111a2d;--line:rgba(255,255,255,.12);--on:#06101f;--r:24px;--hf:Manrope,sans-serif;--hw:800;--hw3:700;--hls:-.03em;--btn:var(--a);--btn-fg:#06101f;--wi-bg:rgba(255,255,255,.07);--wi-fg:var(--a);--ico:var(--a);--est-bg:#111a2d;--est-fg:#f1f5f9;--band-bg:var(--a);--band-fg:#06101f;--fbg:#040a15;--fink:#e2e8f0;position:relative;min-height:100vh;background:#06101f;color:var(--ink);font-family:Manrope,system-ui,sans-serif;font-size:16px;line-height:1.6;overflow-x:clip}
.t5 *{box-sizing:border-box}.t5 h1,.t5 h2,.t5 h3{font-family:Manrope,sans-serif}.t5 a{color:inherit}
.t5 a:focus-visible,.t5 button:focus-visible,.t5 select:focus-visible,.t5 input:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.glowtop{position:absolute;left:50%;top:-180px;transform:translateX(-50%);width:900px;height:520px;border-radius:50%;background:color-mix(in srgb,var(--a) 38%,transparent);filter:blur(120px);opacity:.55;pointer-events:none}
.nav{position:relative;z-index:2;max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;padding:22px 20px}.nav b{font-weight:800;font-size:18px;margin-right:auto;letter-spacing:-.02em}.nav nav{display:flex;gap:26px;font-size:14.5px;color:#94a3b8}.nav nav a{text-decoration:none}.nav nav a:hover{color:#fff}
.call{background:var(--a);color:#06101f!important;font-weight:700;font-size:14px;padding:11px 22px;border-radius:999px;text-decoration:none}
.hero{position:relative;z-index:1;max-width:1240px;margin:0 auto;padding:70px 20px 90px;display:grid;grid-template-columns:1.15fr .85fr;gap:60px;align-items:center}
.pill{display:inline-flex;gap:9px;align-items:center;padding:7px 16px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid var(--line);font-size:13px;font-weight:600;color:#cbd5e1}.pill i{width:8px;height:8px;border-radius:50%;background:var(--a);box-shadow:0 0 12px var(--a)}
.t5 h1{font-size:clamp(42px,6.2vw,86px);line-height:1;font-weight:800;letter-spacing:-.045em;margin:24px 0 0;max-width:11em}
.lead{font-size:18px;color:#94a3b8;max-width:34em;margin:24px 0 0}
.btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}.b{display:inline-flex;gap:9px;align-items:center;padding:16px 28px;border-radius:16px;font-weight:700;font-size:15px;text-decoration:none;transition:transform .2s}.b:hover{transform:translateY(-2px)}
.b.p{background:var(--a);color:#06101f!important;box-shadow:0 0 40px color-mix(in srgb,var(--a) 45%,transparent)}.b.g{background:rgba(255,255,255,.07);border:1px solid var(--line);color:#fff!important}
.tk{background:linear-gradient(160deg,#16223b,#0d1628);border:1px solid var(--line);border-radius:28px;box-shadow:0 40px 80px rgba(0,0,0,.45);overflow:hidden;transform:rotate(1.6deg)}
.tk .top{display:flex;justify-content:space-between;align-items:center;padding:22px 26px;background:linear-gradient(135deg,var(--a),color-mix(in srgb,var(--a) 55%,#000));color:#fff}.tk .top span{font-weight:700;font-size:14px}.tk .top b{font-size:15px;font-weight:800}
.mid{padding:24px 26px 6px}.mid h3{margin:0;font-size:22px;font-weight:800;line-height:1.2}.mid p{margin:6px 0 0;color:#94a3b8;font-size:14px}
.cut{display:flex;align-items:center;margin:20px 0}.cut u{flex:1;border-top:2px dashed rgba(255,255,255,.18)}.cut i{width:22px;height:22px;border-radius:50%;background:#06101f;flex:none}.cut i:first-child{margin-left:-11px}.cut i:last-child{margin-right:-11px}
.days{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:0 26px}.days a{text-decoration:none;text-align:center;border:1px solid var(--line);border-radius:14px;padding:12px 6px;display:grid;line-height:1.3;transition:.2s}.days a:hover{background:var(--a);color:#06101f;border-color:var(--a)}.days b{font-size:14px}.days span{font-size:12px;opacity:.7}
.meta{display:flex;justify-content:space-between;gap:10px;padding:18px 26px 24px;font-size:13px;color:#94a3b8;font-weight:600}.meta span{display:flex;gap:6px;align-items:center}
.stats{border-block:1px solid var(--line);background:rgba(255,255,255,.03)}.stats>div{max-width:1240px;margin:0 auto;padding:34px 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
.stats p{margin:0;padding:0 24px;display:grid;border-left:1px solid var(--line)}.stats p:first-child{border:0;padding-left:0}.stats b{font-size:clamp(30px,3.6vw,46px);font-weight:800;letter-spacing:-.04em;color:var(--a);line-height:1.1}.stats span{font-size:13px;color:#94a3b8;margin-top:4px}
.sec{max-width:1240px;margin:0 auto;padding:100px 20px 0}.hd{margin:0 0 40px}.hd.l{margin:0 0 26px}.hd h2,.doc h2{font-size:clamp(32px,4.4vw,56px);line-height:1.04;font-weight:800;letter-spacing:-.04em;margin:0 0 10px}.hd p{margin:0;color:#94a3b8;max-width:40em}
.bento{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:minmax(230px,auto);gap:16px}
.tile{background:#111a2d;border:1px solid var(--line);border-radius:26px;padding:28px;display:flex;flex-direction:column;text-decoration:none;transition:transform .25s,border-color .25s}.tile:hover{transform:translateY(-4px);border-color:var(--a)}
.tile.wide{grid-column:span 2}.tile.big{grid-column:span 2;grid-row:span 2;background:linear-gradient(150deg,var(--a),color-mix(in srgb,var(--a) 45%,#000));color:#fff;border:0;justify-content:flex-end}.tile.big h3{font-size:34px;letter-spacing:-.03em}.tile.big p{color:rgba(255,255,255,.88);font-size:16px}.tile.big .ic{background:rgba(255,255,255,.16);color:#fff;width:76px;height:76px;margin-bottom:auto}
.ic{width:52px;height:52px;border-radius:17px;background:color-mix(in srgb,var(--a) 14%,transparent);color:var(--a);display:grid;place-items:center;margin-bottom:18px}
.tile h3{margin:0;font-size:19px;font-weight:700;line-height:1.25}.tile p{margin:8px 0 18px;color:#94a3b8;font-size:14px}.ft{margin-top:auto;display:flex;justify-content:space-between;align-items:center}.ft b{font-weight:800;font-size:17px}.ft span{display:inline-flex;gap:4px;align-items:center;font-size:13px;font-weight:700;opacity:.8}
.doc{border:1px solid var(--line);background:linear-gradient(160deg,#111a2d,#0a1222);border-radius:34px;padding:52px;display:grid;grid-template-columns:.6fr 1.4fr;gap:50px;align-items:center}
.mono{font-size:clamp(90px,14vw,190px);font-weight:800;letter-spacing:-.07em;line-height:1;color:transparent;-webkit-text-stroke:2px var(--a);text-align:center}
.doc small{font-size:12px;font-weight:700;color:var(--a);text-transform:uppercase;letter-spacing:.14em}.doc h2{margin-top:10px}.doc em{display:block;font-style:normal;color:var(--a);font-weight:600;margin-bottom:14px}.doc p{color:#94a3b8;margin:0 0 20px}
.doc ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:10px}.doc li{display:flex;gap:6px;align-items:center;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid var(--line);font-size:13.5px}.doc li svg{color:var(--a)}
.revs{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}.revs figure{margin:0;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:26px;padding:30px;backdrop-filter:blur(10px)}.st{color:#fbbf24;letter-spacing:2px;margin-bottom:14px}.revs blockquote{margin:0 0 22px;font-size:15.5px;color:#cbd5e1}.revs figcaption{display:grid;font-size:12.5px;color:#64748b}.revs figcaption b{font-size:14.5px;color:#fff}
.two{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:start}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:18px 0;cursor:pointer;font-weight:700}.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 18px;color:#94a3b8}
.visit{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:stretch;padding-bottom:20px}.visit iframe{width:100%;min-height:400px;height:100%;border:0;border-radius:28px;filter:invert(.9) hue-rotate(180deg) saturate(.7)}
.inf{display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:20px;padding:18px 22px;margin-bottom:12px}.inf svg{color:var(--a);margin-top:3px;flex:none}.inf div{display:grid;font-size:14px}.inf b{font-size:12px;color:var(--a);text-transform:uppercase;letter-spacing:.08em}.inf span{color:#94a3b8}.visit .b{margin-top:8px}
.t5 .x-sec{max-width:1240px}
@media(max-width:900px){.hero{grid-template-columns:1fr;padding-top:40px;gap:44px}.tk{transform:none}.nav nav{display:none}.call{padding:10px 16px}.bento{grid-template-columns:1fr 1fr}.tile.big{grid-column:span 2;grid-row:auto;min-height:280px}.doc{grid-template-columns:1fr;padding:30px;gap:10px}.mono{font-size:96px}.two,.visit{grid-template-columns:1fr}.sec{padding-top:64px}.stats p{padding:0 14px}}
@media(max-width:560px){.bento{grid-template-columns:1fr}.tile.big{grid-column:auto}}
`;
