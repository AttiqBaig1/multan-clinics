import React from 'react';
import { WhyUs, CostEstimator, Steps, FindUs, CallBand, FooterCols, SECTIONS_CSS } from './Sections';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, Img, ServiceIcon, accentOf, galleryOf, initials, mapUrl, shortName, statsOf, telUrl, useFonts, waUrl } from './shared';

/** Design 3, Night Suite: dark, cinematic. Photo-led service tiles, glowing accent, glass booking card, big doctor feature. */
export const Design3: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Manrope:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@1,6..72,400');
  const stats = statsOf(d); const gal = galleryOf(d);
  const pic = (i: number) => gal.length ? gal[i % gal.length].src : '';
  return (
    <div className="n3" style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}</style>
      <section className="n3-hero">
        <Img src={d.heroImage} className="n3-bg" />
        <div className="n3-shade" />
        <header className="n3-top"><b>{d.businessName}</b><a href={telUrl(d)}><I.Phone size={15} /> {d.phone}</a></header>
        <div className="n3-grid">
          <div>
            <span className="n3-tag"><I.BadgeCheck size={16} /> {d.nicheTitle}</span>
            <h1>{d.tagline}</h1>
            <p className="n3-sub"><em>{d.doctorName}</em>, {d.doctorTitle}</p>
            <div className="n3-cta">
              <a className="n3-b" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> Book on WhatsApp</a>
              <a className="n3-b ghost" href={mapUrl(d)} target="_blank" rel="noreferrer"><I.MapPin size={18} /> Directions</a>
            </div>
            <div className="n3-stats">{stats.map((s, i) => <div key={i}><b>{s.v}</b><span>{s.l}</span></div>)}</div>
          </div>
          <BookingCard d={d} title="Book your visit" />
        </div>
      </section>

      <WhyUs d={d} />

      <section className="n3-sec">
        <h2>Treatments</h2>
        <div className="n3-tiles">
          {d.services.map((s, i) => (
            <article key={i} className="n3-tile">
              <div className="n3-tph"><Img src={pic(i)} /><span className="n3-ti"><ServiceIcon name={s.icon} /></span></div>
              <div className="n3-tb"><h3>{s.title}</h3><p>{s.desc}</p>
                <div className="n3-row"><b>{s.price || 'Ask at clinic'}</b><a href={waUrl(d, `Mujhe ${s.title} ke baare mein poochna hai.`)} target="_blank" rel="noreferrer">Enquire</a></div></div>
            </article>
          ))}
        </div>
      </section>

      <CostEstimator d={d} />

      <section className="n3-sec n3-doc">
        <div className="n3-dph"><Img src={d.doctorImage} /><span>{initials(d.doctorName)}</span></div>
        <div>
          <p className="n3-kicker">Your specialist</p>
          <h2>{d.doctorName}</h2>
          <p className="n3-deg">{d.doctorTitle}</p>
          <p>{d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}><I.ShieldCheck size={18} /> {b}</li>)}</ul>
        </div>
      </section>

      <Steps d={d} />

      <section className="n3-sec">
        <h2>Patient stories</h2>
        <div className="n3-rev">
          {d.testimonials.slice(0, 3).map((t, i) => (
            <figure key={i}>
              <div className="n3-st">{Array.from({ length: Math.round(t.rating) }).map((_, k) => <I.Star key={k} size={15} fill="#f5b301" stroke="#f5b301" />)}</div>
              <blockquote>“{t.comment}”</blockquote>
              <figcaption>{t.name}, {t.role}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <FindUs d={d} />

      <section className="n3-sec n3-faqw"><h2>Questions</h2><FaqList d={d} /></section>

      <section className="n3-end">
        <h2>{shortName(d.businessName)}</h2>
        <p>{d.address}, {d.city} · {d.timings}</p>
        <div className="n3-cta"><a className="n3-b" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> WhatsApp</a><a className="n3-b ghost" href={telUrl(d)}><I.Phone size={18} /> {d.phone}</a></div>
      </section>
      <FooterCols d={d} />
      <FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.n3{--ink:#e9eef7;--card:rgba(13,25,43,.78);--line:rgba(255,255,255,.16);--on:#fff;--fbg:#050c16;min-height:100vh;background:#08121f;color:var(--ink);font-family:Manrope,system-ui,sans-serif;line-height:1.6}
.n3 *{box-sizing:border-box}.n3 h1,.n3 h2,.n3 h3{font-family:inherit}.n3 a{color:inherit}
.n3 a:focus-visible,.n3 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.n3-hero{position:relative;overflow:hidden;background:radial-gradient(900px 520px at 88% 8%,color-mix(in srgb,var(--a) 60%,transparent),transparent),linear-gradient(180deg,#0b1a2e,#08121f)}
.n3-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.5}
.n3-shade{position:absolute;inset:0;background:linear-gradient(90deg,#08121f 12%,rgba(8,18,31,.6) 62%,rgba(8,18,31,.25))}
.n3-top{position:relative;display:flex;justify-content:space-between;align-items:center;max-width:1180px;margin:0 auto;padding:22px 24px}
.n3-top a{display:inline-flex;gap:6px;align-items:center;text-decoration:none;font-weight:700;background:rgba(255,255,255,.1);padding:8px 16px;border-radius:999px}
.n3-grid{position:relative;max-width:1180px;margin:0 auto;padding:44px 24px 80px;display:grid;grid-template-columns:1.15fr .85fr;gap:52px;align-items:center}
.n3-tag{display:inline-flex;gap:6px;align-items:center;font-weight:600;font-size:14px;padding:7px 14px;border-radius:999px;background:color-mix(in srgb,var(--a) 28%,transparent);border:1px solid color-mix(in srgb,var(--a) 60%,transparent)}
.n3 h1{font-size:clamp(34px,5vw,62px);line-height:1.05;letter-spacing:-.03em;font-weight:800;margin:20px 0 0;max-width:16ch}
.n3-sub{font-size:17px;opacity:.9;margin:18px 0 0}.n3-sub em{font-family:Newsreader,serif;font-size:1.25em}
.n3-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.n3-b{display:inline-flex;gap:8px;align-items:center;padding:15px 28px;border-radius:999px;background:var(--a);color:#fff!important;font-weight:700;text-decoration:none;box-shadow:0 12px 34px color-mix(in srgb,var(--a) 55%,transparent)}
.n3-b.ghost{background:rgba(255,255,255,.08);border:1px solid var(--line);box-shadow:none}
.n3-stats{display:grid;grid-template-columns:repeat(4,auto);gap:10px 28px;margin-top:40px;justify-content:start}
.n3-stats b{display:block;font-size:24px;font-weight:800}.n3-stats span{font-size:12px;opacity:.7;max-width:110px;display:block;line-height:1.3}
.n3 .bk{backdrop-filter:blur(16px);box-shadow:0 30px 80px rgba(0,0,0,.5),0 0 0 1px color-mix(in srgb,var(--a) 45%,transparent)}
.n3-sec{max-width:1180px;margin:0 auto;padding:80px 24px 0}
.n3 h2{font-size:clamp(27px,3.2vw,40px);letter-spacing:-.02em;font-weight:800;margin:0 0 30px}
.n3-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.n3-tile{border-radius:22px;overflow:hidden;background:#0e1c31;border:1px solid var(--line);display:flex;flex-direction:column;transition:transform .2s,border-color .2s}
.n3-tile:hover{transform:translateY(-4px);border-color:var(--a)}
.n3-tph{position:relative;height:170px;background:linear-gradient(140deg,color-mix(in srgb,var(--a) 55%,#0b1a2e),#0b1a2e)}
.n3-tph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.85}
.n3-tph:after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 40%,#0e1c31)}
.n3-ti{position:absolute;z-index:2;left:18px;bottom:-22px;width:50px;height:50px;border-radius:15px;background:var(--a);display:grid;place-items:center;color:#fff;box-shadow:0 10px 24px color-mix(in srgb,var(--a) 60%,transparent)}
.n3-tb{padding:34px 22px 22px;display:flex;flex-direction:column;flex:1}
.n3-tb h3{margin:0;font-size:18px}.n3-tb p{margin:8px 0 18px;opacity:.72;font-size:14.5px;flex:1}
.n3-row{display:flex;justify-content:space-between;align-items:center}.n3-row b{color:color-mix(in srgb,var(--a) 50%,#fff);font-size:16px}
.n3-row a{font-size:13px;font-weight:700;padding:7px 16px;border-radius:999px;border:1px solid var(--line);text-decoration:none}
.n3-doc{display:grid;grid-template-columns:.85fr 1.15fr;gap:52px;align-items:center}
.n3-dph{position:relative;aspect-ratio:4/5;border-radius:30px;overflow:hidden;background:linear-gradient(150deg,var(--a),#0b1a2e);display:grid;place-items:center;font-size:90px;font-weight:800;box-shadow:0 0 0 1px var(--line),0 30px 80px rgba(0,0,0,.5);max-width:440px}
.n3-dph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.n3-kicker{color:color-mix(in srgb,var(--a) 55%,#fff);font-weight:700;margin:0 0 6px}.n3-doc h2{margin-bottom:8px}
.n3-deg{font-family:Newsreader,serif;font-style:italic;font-size:22px;margin:0 0 10px;opacity:.9}
.n3-doc ul{list-style:none;padding:0;margin:20px 0 0;display:grid;gap:10px}
.n3-doc li{display:flex;gap:10px;align-items:center;padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid var(--line);font-size:14.5px}.n3-doc li svg{color:var(--a);flex:none;filter:brightness(1.5)}
.n3-rev{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
.n3-rev figure{margin:0;padding:26px;border-radius:22px;background:rgba(255,255,255,.05);border:1px solid var(--line)}
.n3-st{display:flex;gap:2px}.n3-rev blockquote{margin:12px 0 16px;font-family:Newsreader,serif;font-style:italic;font-size:19px;line-height:1.45}
.n3-rev figcaption{font-size:13px;opacity:.7}
.n3-faqw{max-width:820px}
.faq-i{border-top:1px solid var(--line)}
.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:18px 0;cursor:pointer;font-weight:600}
.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 18px;opacity:.75}
.n3-end{margin-top:80px;text-align:center;padding:84px 24px 110px;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--a) 28%,#08121f))}
.n3-end h2{font-size:clamp(30px,5vw,54px);margin:0}.n3-end p{opacity:.8;margin:10px 0 0}.n3-end .n3-cta{justify-content:center}
@media(max-width:860px){.n3-grid,.n3-doc{grid-template-columns:1fr;gap:34px}.n3-grid{padding:26px 20px 56px}.n3-shade{background:linear-gradient(180deg,rgba(8,18,31,.55),#08121f 96%)}.n3-sec{padding:56px 20px 0}.n3-stats{grid-template-columns:1fr 1fr}.n3-dph{max-width:320px}}
@media(prefers-reduced-motion:no-preference){.n3-bg{animation:n3z 20s ease-out both}@keyframes n3z{from{transform:scale(1.08)}}}
`;
