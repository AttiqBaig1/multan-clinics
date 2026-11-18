import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, accentOf, initials, pics, statsOf, telUrl, useFonts, useReveal, waUrl, CountUp } from './shared';
import { CostEstimator, FindUs, FooterCols, SECTIONS_CSS, Steps, WhyUs } from './Sections';

/** Design 3, Ink: deep navy and ivory, large editorial serif, split-screen hero, glowing accent. */
export const Design3: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600;700');
  const ref = useReveal();
  const ph = pics(d, 1400); const stats = statsOf(d);
  return (
    <div className="t3" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <header className="t3-nav"><b>{d.businessName}</b>
        <nav><a href="#tr">Treatments</a><a href="#dr">Doctor</a><a href="#rv">Reviews</a><a href="#vs">Visit</a></nav>
        <a className="t3-cta" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp</a></header>

      <section className="t3-hero">
        <div className="t3-l">
          <p className="t3-k">{d.nicheTitle} in {d.city}</p>
          <h1>{d.tagline}</h1>
          <p className="t3-s">{d.doctorName}, {d.doctorTitle}. {d.address}.</p>
          <div className="t3-row">
            <a className="t3-btn" href={waUrl(d)} target="_blank" rel="noreferrer">Book your token <I.MessageCircle size={17} /></a>
            <a className="t3-btn g" href={telUrl(d)}><I.Phone size={16} /> {d.phone}</a>
          </div>
          <dl className="t3-st">{stats.slice(0, 3).map((s, i) => <div key={i}><dt><CountUp value={s.v} /></dt><dd>{s.l}</dd></div>)}</dl>
        </div>
        <div className="t3-r"><Img src={ph[0]} /><div className="t3-fade" /></div>
      </section>

      <section id="tr" className="t3-tr">
        <div className="t3-hd" data-rv><h2>Treatments and prices</h2><p>Everything is priced up front. {d.consultationFee}</p></div>
        <div className="t3-g">
          {d.services.map((s, i) => (
            <article key={i} data-rv>
              <div className="im"><Img src={ph[(i + 1) % ph.length]} /></div>
              <div className="bd"><h3>{s.title}</h3><p>{s.desc}</p><div className="ft"><b>{s.price || 'Ask at clinic'}</b><a href={waUrl(d)} target="_blank" rel="noreferrer">Book</a></div></div>
            </article>
          ))}
        </div>
      </section>

      <section id="dr" className="t3-dr">
        <div className="t3-dp" data-rv>{d.doctorImage ? <Img src={d.doctorImage} /> : <span>{initials(d.doctorName)}</span>}</div>
        <div data-rv>
          <p className="t3-k">Meet your doctor</p>
          <h2>{d.doctorName}</h2>
          <p className="q">“{d.testimonials[0]?.comment}”</p>
          <p className="by">{d.testimonials[0]?.name}, {d.testimonials[0]?.role}</p>
          <p className="ex">{d.doctorTitle}. {d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}><I.Check size={16} /> {b}</li>)}</ul>
        </div>
      </section>

      <WhyUs d={d} title="Why patients choose us" />
      <CostEstimator d={d} />
      <Steps d={d} />

      <section id="rv" className="t3-rv"><h2 className="x-h" data-rv>What patients say</h2>
        <div>{d.testimonials.slice(0, 3).map((t, i) => <figure key={i} data-rv><blockquote>“{t.comment}”</blockquote><figcaption><b>{t.name}</b> {t.role}</figcaption></figure>)}</div></section>
      <div id="vs"><FindUs d={d} /></div>
      <section className="t3-two"><div><h2 className="x-h" data-rv>Questions</h2><FaqList d={d} /></div><BookingCard d={d} title="Request an appointment" /></section>
      <FooterCols d={d} /><FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t3{--ink:#f4efe6;--card:#121f3a;--line:rgba(244,239,230,.16);--on:#0b1426;--r:14px;--hf:'Instrument Serif',serif;--hw:400;--hw3:400;--hls:-.015em;--btn:var(--a);--btn-fg:#0b1426;--wi-bg:rgba(244,239,230,.08);--wi-fg:var(--a);--ico:var(--a);--est-bg:#121f3a;--est-fg:#f4efe6;--band-bg:var(--a);--band-fg:#0b1426;--fbg:#070e1c;--fink:#f4efe6;min-height:100vh;background:#0b1426;color:var(--ink);font-family:'Instrument Sans',system-ui,sans-serif;font-size:17px;line-height:1.65;overflow-x:clip}
.t3 *{box-sizing:border-box}.t3 h1,.t3 h2,.t3 h3{font-family:var(--hf);font-weight:400}.t3 a{color:inherit}
.t3 a:focus-visible,.t3 button:focus-visible,.t3 select:focus-visible,.t3 input:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.t3-nav{position:absolute;z-index:5;left:0;right:0;display:flex;align-items:center;gap:28px;padding:22px max(20px,calc((100vw - 1280px)/2))}
.t3-nav b{font-family:var(--hf);font-size:24px;font-weight:400;margin-right:auto}.t3-nav nav{display:flex;gap:28px;font-size:15px}.t3-nav nav a{text-decoration:none;opacity:.8}
.t3-cta{background:var(--a);color:#0b1426!important;padding:11px 22px;border-radius:999px;font-weight:600;text-decoration:none;font-size:15px}
.t3-hero{display:grid;grid-template-columns:1fr 1fr;min-height:100vh;position:relative}
.t3-l{padding:150px max(20px,calc((100vw - 1280px)/2)) 70px max(20px,calc((100vw - 1280px)/2));display:flex;flex-direction:column;justify-content:center;background:radial-gradient(600px 400px at 0% 100%,color-mix(in srgb,var(--a) 22%,transparent),transparent)}
.t3-k{margin:0 0 20px;font-size:15px;color:var(--a);font-weight:600}
.t3 h1{font-size:clamp(52px,7vw,112px);line-height:.96;letter-spacing:-.02em;margin:0;max-width:11ch}
.t3-s{margin:26px 0 0;max-width:42ch;opacity:.8;font-size:18px}
.t3-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.t3-btn{display:inline-flex;gap:10px;align-items:center;background:var(--a);color:#0b1426!important;padding:16px 28px;border-radius:999px;font-weight:600;text-decoration:none}
.t3-btn.g{background:transparent;color:#f4efe6!important;border:1.5px solid var(--line)}
.t3-st{display:flex;gap:44px;margin:52px 0 0;padding-top:28px;border-top:1px solid var(--line)}.t3-st div{display:grid}
.t3-st dt{font-family:var(--hf);font-size:44px;line-height:1}.t3-st dt>span{font:inherit}.t3-st dd{margin:6px 0 0;font-size:14px;opacity:.7}
.t3-r{position:relative;min-height:420px;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 40%,#0b1426),#0b1426)}
.t3-r img,.t3 .im img,.t3-dp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.t3-fade{position:absolute;inset:0;background:linear-gradient(90deg,#0b1426 0%,transparent 28%),linear-gradient(180deg,rgba(11,20,38,.75),transparent 22%)}
.t3-tr{max-width:1280px;margin:0 auto;padding:130px 20px 0}
.t3-hd{display:flex;justify-content:space-between;align-items:end;gap:30px;flex-wrap:wrap;margin-bottom:44px}.t3 h2{font-size:clamp(36px,4.8vw,68px);line-height:1;letter-spacing:-.015em;margin:0}.t3-hd p{margin:0;opacity:.75;max-width:36ch}
.t3-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.t3-g article{background:#121f3a;border-radius:var(--r);overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--line);transition:border-color .25s}.t3-g article:hover{border-color:var(--a)}
.t3 .im{position:relative;aspect-ratio:16/10;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 40%,#121f3a),#0b1426)}
.bd{padding:22px 24px 24px;display:flex;flex-direction:column;flex:1}.t3-g h3{margin:0;font-size:28px;line-height:1.1}.t3-g p{margin:8px 0 18px;font-size:15px;opacity:.72}
.ft{margin-top:auto;display:flex;justify-content:space-between;align-items:center}.ft b{font-weight:600;color:var(--a)}.ft a{font-size:14px;text-decoration:none;border:1px solid var(--line);padding:7px 16px;border-radius:999px}.ft a:hover{background:var(--a);color:#0b1426}
.t3-dr{max-width:1280px;margin:0 auto;padding:140px 20px 0;display:grid;grid-template-columns:.8fr 1.2fr;gap:70px;align-items:center}
.t3-dp{position:relative;aspect-ratio:4/5;border-radius:var(--r);overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 50%,#0b1426),#070e1c);display:grid;place-items:center;font-family:var(--hf);font-size:110px;color:rgba(244,239,230,.85)}
.t3-dr .q{font-family:var(--hf);font-size:clamp(26px,3vw,40px);line-height:1.18;margin:20px 0 10px}.by{opacity:.65;font-size:14.5px;margin:0 0 24px}.ex{opacity:.85;margin:0 0 18px}
.t3-dr ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}.t3-dr li{display:flex;gap:10px;align-items:center}.t3-dr li svg{color:var(--a)}
.t3-rv{max-width:1280px;margin:0 auto;padding:130px 20px 0}.t3-rv>div{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:34px}
.t3-rv figure{margin:0;background:#121f3a;border-radius:var(--r);padding:30px;border:1px solid var(--line)}.t3-rv blockquote{margin:0 0 20px;font-family:var(--hf);font-size:25px;line-height:1.25}.t3-rv figcaption{font-size:14px;opacity:.75}
.t3-two{max-width:1280px;margin:0 auto;padding:120px 20px 0;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:start}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:20px 0;cursor:pointer;font-family:var(--hf);font-size:24px}.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 20px;opacity:.75;max-width:60ch}
.t3 .x-sec{max-width:1280px}
@media(max-width:900px){.t3-hero{grid-template-columns:1fr}.t3-r{order:-1;min-height:340px}.t3-fade{background:linear-gradient(0deg,#0b1426,transparent 40%)}.t3-l{padding:44px 20px 56px}.t3-nav{position:relative;background:#0b1426}.t3-nav nav{display:none}.t3-cta{display:none}.t3-dr,.t3-two{grid-template-columns:1fr}.t3-st{gap:26px}.t3-tr{padding-top:80px}.t3-dr{padding-top:80px}}
`;
