import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, accentOf, initials, pics, statsOf, telUrl, useFonts, useReveal, waUrl, CountUp } from './shared';
import { CostEstimator, FindUs, FooterCols, SECTIONS_CSS, Steps, WhyUs } from './Sections';

/** Design 5, Grid: white, hairline grid, huge tight sans, one bold accent block, photo strip. */
export const Design5: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Inter+Tight:wght@400;500;600;700;800&family=Inter:wght@400;500;600');
  const ref = useReveal();
  const ph = pics(d, 1400); const stats = statsOf(d);
  return (
    <div className="t5" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <header className="t5-nav"><b>{d.businessName}</b>
        <nav><a href="#tr">Treatments</a><a href="#dr">Doctor</a><a href="#rv">Reviews</a><a href="#vs">Visit</a></nav>
        <a className="t5-cta" href={waUrl(d)} target="_blank" rel="noreferrer">Book now</a></header>

      <section className="t5-hero">
        <h1>{d.businessName}</h1>
        <div className="t5-hr">
          <p>{d.tagline}</p>
          <div className="t5-row"><a className="t5-btn" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp <I.ArrowUpRight size={18} /></a><a className="t5-btn o" href={telUrl(d)}>{d.phone}</a></div>
        </div>
      </section>

      <section className="t5-strip">{[0, 1, 2].map(i => <div key={i} className="p"><Img src={ph[i] || ph[0]} /></div>)}</section>

      <section className="t5-stats">
        <div className="blk"><b>{d.doctorName}</b><span>{d.doctorTitle}</span></div>
        {stats.slice(0, 3).map((s, i) => <div key={i}><b><CountUp value={s.v} /></b><span>{s.l}</span></div>)}
      </section>

      <section id="tr" className="t5-tr">
        <div className="t5-hd" data-rv><h2>Treatments</h2><p>{d.nicheTitle} in {d.city}. Prices listed. {d.consultationFee}</p></div>
        <ul>{d.services.map((s, i) => (
          <li key={i} data-rv>
            <a href={waUrl(d)} target="_blank" rel="noreferrer">
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="t"><h3>{s.title}</h3><em>{s.desc}</em></span>
              <span className="pp"><Img src={ph[(i + 1) % ph.length]} /></span>
              <b>{s.price || 'Ask at clinic'}</b>
              <I.ArrowUpRight size={22} />
            </a>
          </li>))}</ul>
      </section>

      <section id="dr" className="t5-dr">
        <div className="t5-dp" data-rv>{d.doctorImage ? <Img src={d.doctorImage} /> : <span>{initials(d.doctorName)}</span>}</div>
        <div data-rv><h2>{d.doctorName}</h2><p className="dg">{d.doctorTitle}</p><p>{d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}>{b}</li>)}</ul></div>
      </section>

      <WhyUs d={d} title="Why patients choose us" />
      <CostEstimator d={d} />
      <Steps d={d} />

      <section id="rv" className="t5-rv"><h2 className="x-h" data-rv>Reviews</h2>
        <div>{d.testimonials.slice(0, 3).map((t, i) => <figure key={i} data-rv><blockquote>{t.comment}</blockquote><figcaption><b>{t.name}</b> {t.role}</figcaption></figure>)}</div></section>
      <div id="vs"><FindUs d={d} /></div>
      <section className="t5-two"><div><h2 className="x-h" data-rv>Questions</h2><FaqList d={d} /></div><BookingCard d={d} title="Request an appointment" /></section>
      <FooterCols d={d} /><FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t5{--ink:#0e0e10;--card:#fff;--line:#0e0e10;--on:#fff;--r:0px;--hf:'Inter Tight',sans-serif;--hw:700;--hw3:600;--hls:-.035em;--btn:#0e0e10;--btn-fg:#fff;--wi-bg:var(--a);--wi-fg:#fff;--ico:var(--a);--est-bg:#0e0e10;--est-fg:#fff;--band-bg:var(--a);--band-fg:#fff;--fbg:#0e0e10;min-height:100vh;background:#fff;color:var(--ink);font-family:Inter,system-ui,sans-serif;font-size:17px;line-height:1.6;overflow-x:clip}
.t5 *{box-sizing:border-box}.t5 h1,.t5 h2,.t5 h3{font-family:var(--hf);font-weight:var(--hw)}.t5 a{color:inherit}
.t5 a:focus-visible,.t5 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.t5-nav{display:flex;align-items:center;gap:28px;padding:18px max(20px,calc((100vw - 1320px)/2));border-bottom:1px solid #0e0e10}.t5-nav b{font:700 18px var(--hf);letter-spacing:-.02em;margin-right:auto}.t5-nav nav{display:flex;gap:26px;font-size:15px}.t5-nav nav a{text-decoration:none}
.t5-cta{background:var(--a);color:#fff!important;padding:10px 20px;font-weight:600;text-decoration:none;font-size:15px}
.t5-hero{max-width:1320px;margin:0 auto;padding:60px 20px 40px}
.t5 h1{font-size:clamp(52px,10.5vw,170px);line-height:.88;letter-spacing:-.05em;margin:0;overflow-wrap:anywhere}
.t5-hr{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:44px;align-items:end}.t5-hr p{font:500 clamp(22px,2.4vw,34px)/1.2 var(--hf);letter-spacing:-.02em;margin:0;max-width:24ch}
.t5-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end}
.t5-btn{display:inline-flex;gap:8px;align-items:center;background:#0e0e10;color:#fff!important;padding:17px 28px;font-weight:600;text-decoration:none}.t5-btn.o{background:#fff;color:#0e0e10!important;border:1.5px solid #0e0e10}.t5-btn:hover{background:var(--a)}
.t5-strip{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:0;height:min(46vw,520px);border-block:1px solid #0e0e10}
.p{position:relative;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 40%,#fff),#0e0e10);border-right:1px solid #0e0e10}.p:last-child{border:0}
.p img,.pp img,.t5-dp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1);transition:filter .5s}.p:hover img,.t5-tr li a:hover .pp img{filter:none}
.t5-stats{max-width:1320px;margin:0 auto;display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;border-inline:1px solid #0e0e10}
.t5-stats div{padding:30px 24px;border-right:1px solid #0e0e10;display:grid;gap:4px}.t5-stats div:last-child{border:0}
.t5-stats b{font:700 clamp(30px,3.4vw,52px)/1 var(--hf);letter-spacing:-.03em}.t5-stats b>span{font:inherit}.t5-stats span{font-size:14px;opacity:.7}
.t5-stats .blk{background:var(--a);color:#fff}.t5-stats .blk b{font-size:clamp(24px,2.6vw,38px)}.t5-stats .blk span{opacity:.9}
.t5-tr{max-width:1320px;margin:0 auto;padding:120px 20px 0}.t5-hd{display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;margin-bottom:34px}
.t5 h2{font-size:clamp(40px,6vw,92px);line-height:.92;letter-spacing:-.04em;margin:0}.t5-hd p{margin:0;max-width:34ch;opacity:.75}
.t5-tr ul{list-style:none;margin:0;padding:0;border-top:2px solid #0e0e10}.t5-tr li{border-bottom:1px solid #0e0e10}
.t5-tr li a{display:grid;grid-template-columns:50px 1fr 140px auto 30px;gap:22px;align-items:center;padding:20px 0;text-decoration:none;transition:padding .25s}.t5-tr li a:hover{padding-left:14px;background:color-mix(in srgb,var(--a) 8%,#fff)}
.n{font-size:14px;opacity:.5}.t h3{margin:0;font-size:clamp(22px,2.6vw,34px);letter-spacing:-.03em;line-height:1.1}.t em{display:block;font-style:normal;font-size:15px;opacity:.7;margin-top:4px;max-width:52ch}
.pp{position:relative;height:84px;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 40%,#fff),#0e0e10);overflow:hidden}.t5-tr b{font:700 20px var(--hf);color:var(--a);white-space:nowrap}
.t5-dr{max-width:1320px;margin:120px auto 0;padding:0 20px;display:grid;grid-template-columns:.9fr 1.1fr;gap:0;border:1px solid #0e0e10;margin-inline:auto}
.t5-dp{position:relative;min-height:440px;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 50%,#fff),#0e0e10);display:grid;place-items:center;font:800 100px var(--hf);color:rgba(255,255,255,.85)}
.t5-dr>div:last-child{padding:48px}.dg{font:600 22px var(--hf);color:var(--a);margin:12px 0}.t5-dr ul{list-style:none;margin:24px 0 0;padding:0;border-top:1px solid #0e0e10}.t5-dr li{padding:12px 0;border-bottom:1px solid #0e0e10}
.t5-rv{max-width:1320px;margin:0 auto;padding:120px 20px 0}.t5-rv>div{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));border:1px solid #0e0e10;margin-top:34px}
.t5-rv figure{margin:0;padding:32px;border-right:1px solid #0e0e10}.t5-rv figure:last-child{border:0}.t5-rv blockquote{margin:0 0 22px;font:500 22px/1.3 var(--hf);letter-spacing:-.02em}.t5-rv figcaption{font-size:14px;opacity:.75}
.t5-two{max-width:1320px;margin:0 auto;padding:110px 20px 0;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:start}
.faq-i{border-top:1px solid #0e0e10}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:20px 0;cursor:pointer;font:600 21px var(--hf);letter-spacing:-.02em}.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 20px;opacity:.8;max-width:60ch}
.t5 .x-sec{max-width:1320px}
@media(max-width:900px){.t5-hr,.t5-dr,.t5-two{grid-template-columns:1fr}.t5-row{justify-content:flex-start}.t5-strip{grid-template-columns:1fr 1fr;height:auto}.t5-strip .p{height:200px}.t5-strip .p:first-child{grid-column:span 2}.t5-stats{grid-template-columns:1fr 1fr}.t5-stats div{border-bottom:1px solid #0e0e10}.t5-tr li a{grid-template-columns:1fr auto;gap:10px}.n,.pp{display:none}.t5-nav nav{display:none}.t5-dr>div:last-child{padding:28px}.t5-tr{padding-top:80px}}
`;
