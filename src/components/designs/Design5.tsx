import React, { useState } from 'react';
import { D, BOOKING_CSS, BookingCard, CountUp, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, ServiceIcon, accentOf, initials, mapUrl, pics, shortName, statsOf, telUrl, useFonts, useReveal, waUrl } from './shared';
import { CostEstimator, FindUs, FooterCols, SECTIONS_CSS, Steps, WhyUs } from './Sections';

/** Design 5, Poster: huge name on a full accent field, photo-reveal treatment index, mosaic and outlined stats. */
export const Design5: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Archivo:wdth,wght@100,500;100,700;100,800&family=Hanken+Grotesk:wght@400;500;600;700');
  const ref = useReveal();
  const [hov, setHov] = useState(0);
  const ph = pics(d, 1200); const stats = statsOf(d);
  const strip = [...d.services.map(s => s.title), ...d.services.map(s => s.title)];
  return (
    <div className="p5" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <section className="p5-hero">
        <Img src={ph[0]} className="p5-img" />
        <div className="p5-in">
          <p className="p5-meta"><I.MapPin size={16} /> {d.nicheTitle}, {d.city}</p>
          <h1>{shortName(d.businessName)}</h1>
          <p className="p5-line">{d.tagline}</p>
          <div className="p5-cta">
            <a className="p5-b" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> Book on WhatsApp</a>
            <a className="p5-b out" href={telUrl(d)}><I.Phone size={18} /> {d.phone}</a>
          </div>
        </div>
      </section>
      <div className="p5-strip" aria-hidden><div>{strip.map((t, i) => <span key={i}>{t}</span>)}</div></div>

      <section className="p5-stats">{stats.map((s, i) => <div key={i} data-rv><b><CountUp value={s.v} /></b><span>{s.l}</span></div>)}</section>

      <section className="p5-sec">
        <h2 data-rv>Treatments</h2>
        <div className="p5-idx">
          <ul>
            {d.services.map((s, i) => (
              <li key={i} className={hov === i ? 'on' : ''} onMouseEnter={() => setHov(i)} onFocus={() => setHov(i)} onClick={() => setHov(i)} data-rv>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <div><h3>{s.title}</h3><p>{s.desc}</p></div>
                <b>{s.price || 'Ask'}</b>
                <a className="go" href={waUrl(d, `Mujhe ${s.title} ke baare mein poochna hai.`)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${s.title}`}><I.MessageCircle size={18} /></a>
              </li>
            ))}
          </ul>
          <div className="p5-view" aria-hidden>
            {d.services.map((s, i) => <div key={i} className={'f' + (hov === i ? ' on' : '')}><Img src={ph[(i + 1) % ph.length]} /><span className="ic"><ServiceIcon name={s.icon} size={28} /></span></div>)}
          </div>
        </div>
      </section>

      <WhyUs d={d} title="Why choose us" />
      <CostEstimator d={d} />

      <section className="p5-mos">{ph.slice(0, 4).map((u, i) => <figure key={i} data-rv><Img src={u} /></figure>)}</section>

      <section className="p5-sec p5-docw">
        <div data-rv>
          <h2>{d.doctorName}</h2>
          <p className="p5-deg">{d.doctorTitle}</p>
          <p>{d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}><I.BadgeCheck size={20} /> {b}</li>)}</ul>
        </div>
        <div className="p5-dp" aria-hidden data-rv>{initials(d.doctorName)}</div>
      </section>

      <Steps d={d} />
      <FindUs d={d} />

      <section className="p5-sec p5-two">
        <div>
          <h2 data-rv>Patients say</h2>
          {d.testimonials.slice(0, 2).map((t, i) => <blockquote key={i} data-rv>“{t.comment}”<footer>{t.name}, {t.role}</footer></blockquote>)}
        </div>
        <div><h2 data-rv>Book a token</h2><BookingCard d={d} title="Pick a day" /><div style={{ height: 30 }} /><FaqList d={d} /></div>
      </section>
      <FooterCols d={d} />
      <div className="p5-bar"><a href={telUrl(d)}>Call</a><a className="w" href={waUrl(d)} target="_blank" rel="noreferrer">WhatsApp</a></div>
      <FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.p5{--ink:#0d0d0d;--card:#fff;--line:#d9d9d9;--on:#fff;--r:6px;--hf:Archivo,sans-serif;--fbg:#0d0d0d;min-height:100vh;background:#fff;color:var(--ink);font-family:'Hanken Grotesk',system-ui,sans-serif;line-height:1.55;padding-bottom:62px;overflow-x:clip}
.p5 *{box-sizing:border-box}.p5 h1,.p5 h2,.p5 h3{font-family:var(--hf)}.p5 a{color:inherit}
.p5 a:focus-visible,.p5 button:focus-visible,.p5 li:focus-visible{outline:3px solid #000;outline-offset:3px}
.p5-hero{position:relative;background:var(--a);color:#fff;overflow:hidden;min-height:88vh;display:flex;align-items:flex-end}
.p5-img{position:absolute;right:0;top:0;width:46%;height:100%;object-fit:cover;mix-blend-mode:multiply;opacity:.95}
.p5-in{position:relative;padding:48px 32px 60px;max-width:1280px;margin:0 auto;width:100%}
.p5-meta{display:flex;gap:6px;align-items:center;font-weight:600;margin:0 0 12px;font-size:17px}
.p5 h1{font-weight:800;font-size:clamp(52px,12vw,176px);line-height:.88;letter-spacing:-.04em;margin:0;max-width:11ch;text-wrap:balance}
.p5-line{font-size:clamp(18px,2vw,24px);font-weight:500;max-width:34ch;margin:22px 0 0}
.p5-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:30px}
.p5-b{display:inline-flex;gap:8px;align-items:center;padding:17px 28px;background:#0d0d0d;color:#fff!important;font-weight:700;text-decoration:none;border-radius:6px}.p5-b.out{background:transparent;border:2px solid #fff}
.p5-strip{background:#0d0d0d;color:#fff;overflow:hidden;white-space:nowrap;padding:14px 0}.p5-strip div{display:inline-block;animation:p5m 38s linear infinite}
.p5-strip span{font-family:var(--hf);font-weight:700;font-size:20px;margin:0 22px}.p5-strip span:after{content:"+";margin-left:44px;color:var(--a);filter:brightness(1.4)}
@keyframes p5m{to{transform:translateX(-50%)}}
@media(prefers-reduced-motion:reduce){.p5-strip div{animation:none}.p5-strip{overflow-x:auto}}
.p5-stats{max-width:1280px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:repeat(4,1fr);border-bottom:3px solid #0d0d0d}
.p5-stats div{padding:30px 20px 26px 0}.p5-stats b{display:block;font-family:var(--hf);font-size:clamp(34px,5vw,68px);font-weight:800;line-height:1;color:transparent;-webkit-text-stroke:2px var(--a)}.p5-stats div>span{font-size:14px;opacity:.75}
.p5-sec{max-width:1280px;margin:0 auto;padding:90px 32px 0}
.p5 h2{font-weight:800;font-size:clamp(32px,5vw,68px);line-height:1;letter-spacing:-.04em;margin:0 0 28px}
.p5-idx{display:grid;grid-template-columns:1.25fr .75fr;gap:48px;align-items:start}
.p5-idx ul{list-style:none;margin:0;padding:0;border-top:3px solid #0d0d0d}
.p5-idx li{display:grid;grid-template-columns:auto 1fr auto auto;gap:20px;align-items:center;padding:22px 0;border-bottom:1px solid var(--line);cursor:pointer;transition:background .2s,padding .2s}
.p5-idx li.on{background:color-mix(in srgb,var(--a) 10%,#fff);padding-left:16px;padding-right:16px}
.p5-idx .n{font-family:var(--hf);font-weight:800;font-size:18px;color:var(--a)}
.p5-idx h3{margin:0;font-size:clamp(20px,2.4vw,30px);letter-spacing:-.02em}.p5-idx p{margin:4px 0 0;opacity:.72;max-width:52ch;font-size:15px}
.p5-idx b{font-family:var(--hf);font-size:clamp(17px,1.8vw,24px);color:var(--a);white-space:nowrap}
.p5-idx .go{width:42px;height:42px;border-radius:50%;background:#0d0d0d;color:#fff;display:grid;place-items:center;text-decoration:none}
.p5-view{position:sticky;top:24px;aspect-ratio:4/5;background:var(--a);overflow:hidden;box-shadow:14px 14px 0 #0d0d0d}
.p5-view .f{position:absolute;inset:0;opacity:0;transform:scale(1.06);transition:opacity .45s,transform .6s}.p5-view .f.on{opacity:1;transform:none}
.p5-view img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p5-view .ic{position:absolute;left:16px;bottom:16px;width:60px;height:60px;background:#fff;color:var(--a);display:grid;place-items:center}
.p5-mos{max-width:1280px;margin:90px auto 0;padding:0 32px;display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:12px;height:380px}
.p5-mos figure{margin:0;position:relative;overflow:hidden;background:linear-gradient(150deg,var(--a),#0d0d0d)}.p5-mos img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p5-docw{display:grid;grid-template-columns:1.2fr .8fr;gap:56px;align-items:center}
.p5-deg{font-weight:700;color:var(--a);font-size:19px;margin:0 0 6px}.p5-docw ul{list-style:none;margin:22px 0 0;padding:0;display:grid;gap:10px}
.p5-docw li{display:flex;gap:10px;align-items:center;font-weight:600;border-top:1px solid var(--line);padding-top:10px}.p5-docw li svg{color:var(--a);flex:none}
.p5-dp{aspect-ratio:1;background:var(--a);color:#fff;font-family:var(--hf);font-weight:800;font-size:clamp(90px,16vw,220px);display:grid;place-items:center;letter-spacing:-.05em;box-shadow:16px 16px 0 #0d0d0d}
.p5-two{display:grid;grid-template-columns:1fr 1fr;gap:64px}
.p5 blockquote{margin:0 0 28px;font-size:21px;font-weight:500;line-height:1.4;padding-top:16px;border-top:3px solid var(--a)}.p5 blockquote footer{font-size:14px;opacity:.7;margin-top:8px;font-weight:400}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:16px 0;cursor:pointer;font-weight:700}
.faq-q:focus-visible{outline:3px solid #000}.faq-a{margin:0 0 16px;opacity:.78}
.p5-bar{position:fixed;left:0;right:0;bottom:0;z-index:40;display:grid;grid-template-columns:1fr 1fr}.p5-bar a{text-align:center;padding:18px;font-weight:800;text-decoration:none;background:#0d0d0d;color:#fff}.p5-bar a.w{background:var(--a)}
@media(min-width:861px){.p5{padding-bottom:0}.p5-bar{display:none}}
@media(max-width:860px){.p5-img{width:100%;opacity:.3}.p5-docw,.p5-two,.p5-idx{grid-template-columns:1fr;gap:32px}.p5-view{display:none}.p5-idx li{grid-template-columns:auto 1fr;gap:12px}.p5-idx b,.p5-idx .go{grid-column:2}.p5-sec{padding:60px 20px 0}.p5-in{padding:36px 20px 44px}.p5-stats{grid-template-columns:1fr 1fr;padding:0 20px}.p5-mos{grid-template-columns:1fr 1fr;height:auto;grid-auto-rows:170px;padding:0 20px;margin-top:60px}.p5-dp{box-shadow:10px 10px 0 #0d0d0d;max-width:300px}.fwa{bottom:76px}}
`;
