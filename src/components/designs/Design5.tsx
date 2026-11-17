import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, Img, accentOf, mapUrl, shortName, telUrl, useFonts, waUrl } from './shared';

/** Design 5, Poster: the clinic name set huge on a full accent field, scrolling treatment strip, hard-edged price rows. */
export const Design5: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700');
  const strip = [...d.services.map(s => s.title), ...d.services.map(s => s.title)];
  return (
    <div className="p5" style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}</style>
      <section className="p5-hero">
        <Img src={d.heroImage} className="p5-img" />
        <div className="p5-in">
          <p className="p5-meta">{d.nicheTitle}, {d.city}</p>
          <h1>{shortName(d.businessName)}</h1>
          <p className="p5-line">{d.tagline}</p>
          <div className="p5-cta">
            <a className="p5-b" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp</a>
            <a className="p5-b out" href={telUrl(d)}>{d.phone}</a>
          </div>
        </div>
      </section>

      <div className="p5-strip" aria-hidden><div>{strip.map((t, i) => <span key={i}>{t}</span>)}</div></div>

      <section className="p5-sec">
        <div className="p5-head">
          <h2>{d.doctorName}</h2>
          <p>{d.doctorTitle}. {d.doctorExperience}.</p>
        </div>
        <ul className="p5-rows">
          {d.services.map((s, i) => (
            <li key={i}>
              <div><h3>{s.title}</h3><p>{s.desc}</p></div>
              <b>{s.price || 'Ask at clinic'}</b>
            </li>
          ))}
        </ul>
      </section>

      <section className="p5-split">
        <div className="p5-l">
          <h2>Hours and place</h2>
          <p className="p5-big">{d.timings}</p>
          <p>{d.address}, {d.city}</p>
          <p>Consultation: {d.consultationFee}</p>
          <a className="p5-b" href={mapUrl(d)} target="_blank" rel="noreferrer">Get directions</a>
        </div>
        <BookingCard d={d} title="Pick a day" />
      </section>

      <section className="p5-sec p5-two">
        <div>
          <h2>What patients say</h2>
          {d.testimonials.slice(0, 2).map((t, i) => (
            <blockquote key={i}>“{t.comment}”<footer>{t.name}, {t.role}</footer></blockquote>
          ))}
        </div>
        <div><h2>Questions</h2><FaqList d={d} /></div>
      </section>

      <div className="p5-bar">
        <a href={telUrl(d)}>Call</a><a className="w" href={waUrl(d)} target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </div>
  );
};

const CSS = `
.p5{--ink:#0d0d0d;--card:#fff;--line:#d9d9d9;--on:#fff;--r:6px;min-height:100vh;background:#fff;color:var(--ink);font-family:'Hanken Grotesk',system-ui,sans-serif;line-height:1.5;padding-bottom:64px}
.p5 *{box-sizing:border-box}.p5 a{color:inherit}
.p5 a:focus-visible,.p5 button:focus-visible{outline:3px solid #000;outline-offset:3px}
.p5-hero{position:relative;background:var(--a);color:#fff;overflow:hidden;min-height:82vh;display:flex;align-items:flex-end}
.p5-img{position:absolute;right:0;top:0;width:48%;height:100%;object-fit:cover;mix-blend-mode:multiply;opacity:.9}
.p5-in{position:relative;padding:48px 32px 56px;max-width:1280px;margin:0 auto;width:100%}
.p5-meta{font-weight:600;margin:0 0 12px;font-size:17px}
.p5 h1{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(52px,12vw,168px);line-height:.88;letter-spacing:-.045em;margin:0;max-width:11ch;text-wrap:balance}
.p5-line{font-size:clamp(18px,2vw,24px);font-weight:500;max-width:34ch;margin:22px 0 0}
.p5-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
.p5-b{display:inline-block;padding:17px 28px;background:#0d0d0d;color:#fff!important;font-weight:700;text-decoration:none;border-radius:6px}
.p5-b.out{background:transparent;color:#fff!important;border:2px solid #fff}
.p5-strip{background:#0d0d0d;color:#fff;overflow:hidden;white-space:nowrap;padding:14px 0}
.p5-strip div{display:inline-block;animation:p5m 38s linear infinite}
.p5-strip span{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:20px;margin:0 22px}
.p5-strip span:after{content:"+";margin-left:44px;color:var(--a)}
@keyframes p5m{to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.p5-strip div{animation:none}.p5-strip{overflow-x:auto}}
.p5-sec{max-width:1280px;margin:0 auto;padding:80px 32px}
.p5-head{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:end;margin-bottom:36px}
.p5 h2{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:clamp(30px,4.6vw,60px);line-height:1;letter-spacing:-.035em;margin:0 0 20px}
.p5-head h2{margin:0}.p5-head p{margin:0;font-size:18px;max-width:42ch}
.p5-rows{list-style:none;margin:0;padding:0;border-top:3px solid #0d0d0d}
.p5-rows li{display:grid;grid-template-columns:1fr auto;gap:24px;padding:24px 0;border-bottom:1px solid var(--line);transition:background .15s,padding .15s}
.p5-rows li:hover{background:color-mix(in srgb,var(--a) 9%,#fff);padding-left:14px;padding-right:14px}
.p5-rows h3{margin:0;font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(20px,2.4vw,30px);letter-spacing:-.02em}
.p5-rows p{margin:6px 0 0;opacity:.75;max-width:58ch}
.p5-rows b{font-family:'Bricolage Grotesque',sans-serif;font-size:clamp(18px,2vw,26px);color:var(--a);white-space:nowrap}
.p5-split{background:#f3f3f1;display:grid;grid-template-columns:1fr minmax(320px,440px);gap:56px;padding:72px max(32px,calc((100vw - 1216px)/2));align-items:start}
.p5-big{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:clamp(24px,3vw,38px);line-height:1.1;margin:0 0 16px}
.p5-l p{margin:0 0 6px;font-size:17px}.p5-l .p5-b{margin-top:22px}
.p5-two{display:grid;grid-template-columns:1fr 1fr;gap:64px}
.p5 blockquote{margin:0 0 28px;font-size:20px;font-weight:500;line-height:1.4;padding-top:16px;border-top:3px solid var(--a)}
.p5 blockquote footer{font-size:14px;opacity:.7;margin-top:8px;font-weight:400}
.faq-i{border-top:1px solid var(--line)}
.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:16px 0;cursor:pointer;font-weight:700}
.faq-q:focus-visible{outline:3px solid #000}.faq-a{margin:0 0 16px;opacity:.78}
.p5-bar{position:fixed;left:0;right:0;bottom:0;z-index:40;display:grid;grid-template-columns:1fr 1fr}
.p5-bar a{text-align:center;padding:18px;font-weight:800;text-decoration:none;background:#0d0d0d;color:#fff}.p5-bar a.w{background:var(--a)}
@media(min-width:861px){.p5{padding-bottom:0}.p5-bar{display:none}}
@media(max-width:860px){.p5-img{width:100%;opacity:.28}.p5-head,.p5-two,.p5-split{grid-template-columns:1fr;gap:32px}.p5-sec{padding:56px 20px}.p5-in{padding:36px 20px 44px}.p5-split{padding:56px 20px}.p5-rows li{grid-template-columns:1fr;gap:8px}}
`;
