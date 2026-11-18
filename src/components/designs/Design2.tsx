import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, accentOf, initials, pics, statsOf, telUrl, useFonts, useReveal, waUrl } from './shared';
import { CostEstimator, FindUs, FooterCols, SECTIONS_CSS, Steps, WhyUs } from './Sections';

/** Design 2, Terra: sand and deep forest, light serif display, outlined icon trust row, calm editorial lists. */
export const Design2: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=DM+Sans:wght@400;500;600;700');
  const ref = useReveal();
  const ph = pics(d, 1400); const stats = statsOf(d);
  const trust = [
    { i: <I.ShieldCheck size={34} strokeWidth={1.3} />, t: d.doctorTitle.split(',')[0] + ' specialist' },
    { i: <I.CalendarCheck size={34} strokeWidth={1.3} />, t: 'Fixed tokens on WhatsApp' },
    { i: <I.Award size={34} strokeWidth={1.3} />, t: stats[0]?.v + ' ' + (stats[0]?.l || '').toLowerCase() },
    { i: <I.BadgeCheck size={34} strokeWidth={1.3} />, t: `${d.services.length} treatments, prices listed` },
    { i: <I.Clock size={34} strokeWidth={1.3} />, t: d.timings.split('(')[0].trim() },
  ];
  return (
    <div className="t2" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <div className="t2-ann">Appointments by WhatsApp token. {d.timings}. <a href={waUrl(d)} target="_blank" rel="noreferrer">Book now</a></div>
      <header className="t2-nav">
        <b>{d.businessName}</b>
        <nav><a href="#care">Treatments</a><a href="#doctor">Doctor</a><a href="#reviews">Reviews</a><a href="#visit">Visit</a></nav>
        <a className="t2-join" href={telUrl(d)}>{d.phone}</a>
      </header>

      <section className="t2-hero">
        <div className="t2-copy">
          <p className="t2-kick">{d.nicheTitle}, {d.city}</p>
          <h1>{d.tagline}</h1>
          <p className="t2-sub">{d.doctorName} sees you personally at {d.address}. Choose a day, receive a fixed token, and be seen without the long wait.</p>
          <div className="t2-cta">
            <a className="t2-b" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp <I.MessageCircle size={17} /></a>
            <a className="t2-b out" href="#care">See treatments</a>
          </div>
        </div>
        <div className="t2-ph">
          <div className="t2-big"><Img src={ph[0]} /></div>
          <div className="t2-small"><Img src={ph[1]} /></div>
          <div className="t2-note"><b>{d.consultationFee.replace(/\s*\(.*\)/, '')}</b><span>consultation</span></div>
        </div>
      </section>

      <section className="t2-trust">{trust.map((x, i) => <div key={i} data-rv>{x.i}<span>{x.t}</span></div>)}</section>

      <section className="t2-say" data-rv>
        <p>Care that starts with listening. {d.doctorName} takes the time to explain the problem, the options and the cost, before any treatment begins.</p>
      </section>

      <section id="care" className="t2-care">
        <div className="t2-cl" data-rv><h2>Treatments</h2><p>Every price is written next to the treatment. The final fee is confirmed by the doctor after examination.</p>
          <a className="t2-b" href={waUrl(d)} target="_blank" rel="noreferrer">Book a visit</a></div>
        <ul>
          {d.services.map((s, i) => (
            <li key={i} data-rv>
              <div className="th"><Img src={ph[(i + 1) % ph.length]} /></div>
              <div className="tx"><h3>{s.title}</h3><p>{s.desc}</p></div>
              <b>{s.price || 'Ask at clinic'}</b>
            </li>
          ))}
        </ul>
      </section>

      <section id="doctor" className="t2-doc">
        <div className="t2-di">
          <div data-rv>
            <p className="t2-kick l">Your doctor</p>
            <h2>{d.doctorName}</h2>
            <p className="deg">{d.doctorTitle}</p>
            <p>{d.doctorExperience}</p>
            <ul>{d.badges.map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
          <div className="t2-dp" data-rv>{d.doctorImage ? <Img src={d.doctorImage} /> : <span>{initials(d.doctorName)}</span>}</div>
        </div>
      </section>

      <WhyUs d={d} title="Why patients choose us" />
      <CostEstimator d={d} />
      <Steps d={d} />

      <section id="reviews" className="t2-rev">
        <h2 className="x-h" data-rv>In patients' words</h2>
        <div>{d.testimonials.slice(0, 3).map((t, i) => (
          <figure key={i} data-rv><blockquote>“{t.comment}”</blockquote><figcaption><b>{t.name}</b><span>{t.role}</span></figcaption></figure>
        ))}</div>
      </section>

      <div id="visit"><FindUs d={d} /></div>

      <section className="t2-two">
        <div><h2 className="x-h" data-rv>Book your token</h2><p className="t2-lead">Pick a treatment and a day. WhatsApp opens with your message ready to send.</p><FaqList d={d} /></div>
        <BookingCard d={d} title="Request an appointment" />
      </section>
      <FooterCols d={d} />
      <FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t2{--ink:#1c3a33;--card:#fbf7f1;--line:rgba(28,58,51,.18);--on:#fff;--r:6px;--hf:Fraunces,serif;--hw:300;--hw3:500;--hls:-.02em;--btn:#1c3a33;--btn-fg:#f3ebe1;--wi-bg:rgba(28,58,51,.08);--wi-fg:#1c3a33;--ico:#1c3a33;--est-bg:#1c3a33;--est-fg:#f3ebe1;--band-bg:#1c3a33;--band-fg:#f3ebe1;--fbg:#12261f;min-height:100vh;background:#f3ebe1;color:var(--ink);font-family:'DM Sans',system-ui,sans-serif;font-size:17px;line-height:1.65;overflow-x:clip}
.t2 *{box-sizing:border-box}.t2 h1,.t2 h2,.t2 h3{font-family:var(--hf);font-weight:var(--hw)}.t2 a{color:inherit}
.t2 a:focus-visible,.t2 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.t2 .x-sec,.t2-care,.t2-rev,.t2-two{max-width:1240px}
.t2-ann{background:#cfe3d6;text-align:center;font-size:14.5px;padding:10px 16px}.t2-ann a{font-weight:700;text-decoration:underline;margin-left:8px}
.t2-nav{background:#12302a;color:#f3ebe1;display:flex;align-items:center;gap:28px;padding:16px max(20px,calc((100vw - 1240px)/2))}
.t2-nav b{font-family:var(--hf);font-weight:400;font-size:21px;margin-right:auto}.t2-nav nav{display:flex;gap:28px;font-size:15px}.t2-nav nav a{text-decoration:none;opacity:.85}.t2-nav nav a:hover{opacity:1}
.t2-join{border:1.5px solid #f3ebe1;border-radius:999px;padding:9px 22px;text-decoration:none;font-weight:500;font-size:15px}
.t2-hero{max-width:1240px;margin:0 auto;padding:72px 20px 56px;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.t2-kick{font-size:15px;font-weight:500;margin:0 0 20px;color:var(--ink)}.t2-kick:before{content:"";display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--a);margin-right:10px}
.t2 h1{font-size:clamp(46px,6.6vw,96px);line-height:1;letter-spacing:-.025em;margin:0;max-width:12ch;font-variation-settings:"opsz" 144}
.t2-sub{font-size:19px;max-width:44ch;margin:26px 0 0;opacity:.85}
.t2-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:34px}
.t2-b{display:inline-flex;gap:10px;align-items:center;background:#1c3a33;color:#f3ebe1!important;padding:16px 28px;border-radius:999px;font-weight:500;text-decoration:none;transition:transform .2s}
.t2-b:hover{transform:translateY(-2px)}.t2-b.out{background:transparent;color:#1c3a33!important;border:1.5px solid #1c3a33}
.t2-ph{position:relative;height:600px}
.t2-big{position:absolute;right:0;top:0;width:82%;height:92%;border-radius:6px;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 35%,#e8dccb),#1c3a33)}
.t2-small{position:absolute;left:0;bottom:0;width:44%;height:36%;border-radius:6px;overflow:hidden;border:8px solid #f3ebe1;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 30%,#e8dccb),#2d5247)}
.t2-big img,.t2-small img,.th img,.t2-dp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.t2-note{position:absolute;right:16px;bottom:8%;background:#f3ebe1;border-radius:6px;padding:12px 18px;display:grid}.t2-note b{font-family:var(--hf);font-weight:400;font-size:20px}.t2-note span{font-size:12.5px;opacity:.7}
.t2-trust{max-width:1240px;margin:0 auto;padding:0 20px;display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
.t2-trust div{position:relative;border:1.5px solid rgba(28,58,51,.35);border-radius:14px;padding:44px 14px 22px;text-align:center;font-size:15px;line-height:1.35;margin-top:22px}
.t2-trust svg{position:absolute;left:50%;top:-18px;transform:translateX(-50%);background:#f3ebe1;padding:0 8px;box-sizing:content-box}
.t2-say{max-width:980px;margin:0 auto;padding:110px 20px 20px;text-align:center}
.t2-say p{font-family:var(--hf);font-weight:300;font-size:clamp(26px,3.6vw,46px);line-height:1.2;letter-spacing:-.015em;margin:0}
.t2-care{margin:0 auto;padding:90px 20px 0;display:grid;grid-template-columns:.7fr 1.3fr;gap:64px;align-items:start}
.t2-cl{position:sticky;top:30px}.t2 h2{font-size:clamp(32px,4.2vw,58px);line-height:1.04;letter-spacing:-.02em;margin:0 0 18px}.t2-cl p{opacity:.8;margin:0 0 26px;max-width:36ch}
.t2-care ul{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.t2-care li{display:grid;grid-template-columns:110px 1fr auto;gap:24px;align-items:center;padding:24px 0;border-bottom:1px solid var(--line)}
.th{position:relative;width:110px;height:110px;border-radius:6px;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 35%,#e8dccb),#2d5247)}
.t2-care h3{margin:0;font-size:26px;line-height:1.15;font-weight:400}.t2-care p{margin:6px 0 0;font-size:15px;opacity:.75;max-width:48ch}
.t2-care b{font-family:var(--hf);font-weight:400;font-size:22px;color:var(--a);filter:brightness(.85);white-space:nowrap}
.t2-doc{background:#1c3a33;color:#f3ebe1;margin-top:110px;padding:96px 20px}
.t2-di{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1fr .85fr;gap:64px;align-items:center}
.t2-doc h2{color:#f3ebe1}.t2-kick.l{color:#cfe3d6}.t2-doc .deg{font-family:var(--hf);font-size:24px;font-weight:300;margin:0 0 14px;color:#cfe3d6}
.t2-doc ul{list-style:none;margin:26px 0 0;padding:0;border-top:1px solid rgba(243,235,225,.25)}.t2-doc li{padding:14px 0;border-bottom:1px solid rgba(243,235,225,.25)}
.t2-dp{position:relative;aspect-ratio:4/5;border-radius:6px;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 50%,#1c3a33),#12261f);display:grid;place-items:center;font-family:var(--hf);font-size:100px;font-weight:300;color:rgba(243,235,225,.9)}
.t2-rev{margin:0 auto;padding:110px 20px 0}.t2-rev>div{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:40px;margin-top:34px}
.t2-rev figure{margin:0;border-top:1px solid #1c3a33;padding-top:22px}.t2-rev blockquote{margin:0 0 20px;font-family:var(--hf);font-weight:300;font-size:23px;line-height:1.3}
.t2-rev figcaption{display:grid;font-size:14px}.t2-rev figcaption span{opacity:.7}
.t2-two{margin:0 auto;padding:100px 20px 0;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:start}.t2-lead{opacity:.8;margin:-6px 0 26px}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:20px 0;cursor:pointer;font-family:var(--hf);font-size:21px}
.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 20px;opacity:.8;max-width:60ch}
.t2 .x-why article,.t2 .x-steps li,.t2 .x-fi{background:#fbf7f1;border-radius:14px}
@media(max-width:900px){.t2-hero,.t2-care,.t2-di,.t2-two{grid-template-columns:1fr}.t2-ph{height:420px}.t2-trust{grid-template-columns:1fr 1fr}.t2-cl{position:static}.t2-care li{grid-template-columns:80px 1fr}.t2-care li b{grid-column:2}.th{width:80px;height:80px}.t2-nav nav{display:none}.t2-hero{padding-top:44px}.t2-say{padding-top:70px}.t2-doc{margin-top:70px;padding:64px 20px}}
`;
