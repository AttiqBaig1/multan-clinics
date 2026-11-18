import React, { useRef, useState } from 'react';
import { D, BOOKING_CSS, BookingCard, CountUp, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, ServiceIcon, accentOf, initials, pics, statsOf, telUrl, useFonts, useReveal, waUrl } from './shared';
import { CostEstimator, FindUs, FooterCols, SECTIONS_CSS, Steps, WhyUs } from './Sections';

/** Design 3, Cinematic: full-screen photo with a huge headline, horizontal treatment reel, giant numbers, outlined doctor monogram. */
export const Design3: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Syne:wght@600;700;800&family=Manrope:wght@400;500;600;700');
  const ref = useReveal();
  const reel = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState(0);
  const ph = pics(d, 1600); const stats = statsOf(d);
  const nudge = (dir: number) => reel.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });
  const t = d.testimonials[q % Math.max(1, d.testimonials.length)];
  return (
    <div className="c3" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <section className="c3-hero">
        <Img src={ph[0]} className="c3-bg" /><div className="c3-shade" />
        <header className="c3-nav"><b>{d.businessName}</b><a href={waUrl(d)} target="_blank" rel="noreferrer">Book a visit</a></header>
        <div className="c3-in">
          <p className="c3-tag">{d.nicheTitle} · {d.city}</p>
          <h1>{d.tagline}</h1>
          <div className="c3-cta">
            <a className="c3-b" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> WhatsApp appointment</a>
            <a className="c3-b ghost" href={telUrl(d)}><I.Phone size={18} /> {d.phone}</a>
          </div>
          <div className="c3-meta"><span><I.Clock size={15} /> {d.timings}</span><span><I.MapPin size={15} /> {d.address}, {d.city}</span><span><I.Stethoscope size={15} /> {d.doctorName}</span></div>
        </div>
      </section>

      <section className="c3-sec c3-wide">
        <div className="c3-rh"><h2 data-rv>Treatments</h2>
          <div className="c3-arrows"><button type="button" aria-label="Previous" onClick={() => nudge(-1)}>←</button><button type="button" aria-label="Next" onClick={() => nudge(1)}>→</button></div></div>
        <div className="c3-reel" ref={reel} tabIndex={0} aria-label="Treatments">
          {d.services.map((s, i) => (
            <article key={i} className="c3-card">
              <Img src={ph[(i + 1) % ph.length]} /><div className="sh" />
              <span className="ic"><ServiceIcon name={s.icon} size={22} /></span>
              <div className="tx"><h3>{s.title}</h3><p>{s.desc}</p>
                <div className="rw"><b>{s.price || 'Ask at clinic'}</b><a href={waUrl(d, `Mujhe ${s.title} ke baare mein poochna hai.`)} target="_blank" rel="noreferrer">Enquire</a></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="c3-num">
        {stats.map((s, i) => <div key={i} data-rv><b><CountUp value={s.v} /></b><span>{s.l}</span></div>)}
      </section>

      <section className="c3-doc">
        <div className="c3-big" aria-hidden data-rv>{initials(d.doctorName)}</div>
        <div data-rv>
          <p className="c3-tag">Your specialist</p>
          <h2>{d.doctorName}</h2>
          <p className="c3-deg">{d.doctorTitle}</p>
          <p>{d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}><I.BadgeCheck size={18} /> {b}</li>)}</ul>
        </div>
      </section>

      <WhyUs d={d} />
      <CostEstimator d={d} />
      <Steps d={d} />

      {d.testimonials.length > 0 && (
        <section className="c3-sec c3-q" data-rv>
          <div className="c3-stars">{Array.from({ length: Math.round(t.rating) }).map((_, k) => <I.Star key={k} size={20} fill="#f5b301" stroke="#f5b301" />)}</div>
          <blockquote>“{t.comment}”</blockquote>
          <p>{t.name}, {t.role}</p>
          <div className="c3-dots">{d.testimonials.map((_, i) => <button key={i} aria-label={`Review ${i + 1}`} className={i === q % d.testimonials.length ? 'on' : ''} onClick={() => setQ(i)} />)}</div>
        </section>
      )}

      <FindUs d={d} />

      <section className="c3-sec c3-two">
        <div><h2 data-rv>Book your token</h2><FaqList d={d} /></div>
        <BookingCard d={d} title="Request an appointment" />
      </section>
      <FooterCols d={d} />
      <FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.c3{--ink:#eaf0f8;--card:#0e1829;--line:rgba(255,255,255,.14);--on:#fff;--r:24px;--hf:Syne,sans-serif;--fbg:#050a12;min-height:100vh;background:#070d18;color:var(--ink);font-family:Manrope,system-ui,sans-serif;line-height:1.65;overflow-x:clip}
.c3 *{box-sizing:border-box}.c3 h1,.c3 h2,.c3 h3{font-family:var(--hf)}.c3 a{color:inherit}
.c3 a:focus-visible,.c3 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.c3-hero{position:relative;min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 50%,#070d18),#070d18)}
.c3-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.c3-shade{position:absolute;inset:0;background:linear-gradient(0deg,#070d18 4%,rgba(7,13,24,.5) 55%,rgba(7,13,24,.35))}
.c3-nav{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:22px max(20px,calc((100vw - 1240px)/2));z-index:2}
.c3-nav b{font-family:var(--hf);font-size:18px}.c3-nav a{text-decoration:none;font-weight:700;font-size:14px;padding:10px 20px;border-radius:999px;background:rgba(255,255,255,.14);backdrop-filter:blur(10px);border:1px solid var(--line)}
.c3-in{position:relative;padding:130px max(20px,calc((100vw - 1240px)/2)) 44px}
.c3-tag{margin:0 0 14px;font-weight:700;font-size:14px;color:color-mix(in srgb,var(--a) 45%,#fff)}
.c3 h1{font-size:clamp(42px,9vw,128px);line-height:.95;font-weight:800;letter-spacing:-.04em;margin:0;max-width:13ch;text-wrap:balance}
.c3-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.c3-b{display:inline-flex;gap:8px;align-items:center;padding:16px 28px;border-radius:999px;background:var(--a);color:#fff!important;font-weight:700;text-decoration:none;box-shadow:0 14px 40px color-mix(in srgb,var(--a) 55%,transparent)}
.c3-b.ghost{background:rgba(255,255,255,.1);border:1px solid var(--line);box-shadow:none;backdrop-filter:blur(8px)}
.c3-meta{display:flex;flex-wrap:wrap;gap:10px 28px;margin-top:40px;padding-top:22px;border-top:1px solid var(--line);font-size:14px;opacity:.9}.c3-meta span{display:inline-flex;gap:8px;align-items:center}
.c3-sec{max-width:1240px;margin:0 auto;padding:96px 20px 0}.c3-wide{max-width:none;padding-right:0;padding-left:max(20px,calc((100vw - 1240px)/2))}
.c3 h2{font-size:clamp(30px,4.4vw,56px);font-weight:800;letter-spacing:-.03em;line-height:1.05;margin:0 0 24px}
.c3-rh{display:flex;justify-content:space-between;align-items:end;padding-right:max(20px,calc((100vw - 1240px)/2))}
.c3-arrows{display:flex;gap:8px;margin-bottom:24px}.c3-arrows button{all:unset;width:48px;height:48px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;cursor:pointer;font-size:20px}.c3-arrows button:hover{background:var(--a)}
.c3-arrows button:focus-visible{outline:3px solid var(--a)}
.c3-reel{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 20px 24px 0;scrollbar-width:none}.c3-reel::-webkit-scrollbar{display:none}
.c3-card{position:relative;flex:0 0 min(360px,82vw);height:460px;border-radius:var(--r);overflow:hidden;scroll-snap-align:start;background:linear-gradient(150deg,color-mix(in srgb,var(--a) 55%,#070d18),#0e1829);display:flex;flex-direction:column;justify-content:flex-end;border:1px solid var(--line)}
.c3-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s}.c3-card:hover img{transform:scale(1.06)}
.c3-card .sh{position:absolute;inset:0;background:linear-gradient(transparent 25%,rgba(7,13,24,.94))}
.c3-card .ic{position:absolute;top:18px;left:18px;width:46px;height:46px;border-radius:14px;background:var(--a);display:grid;place-items:center;color:#fff}
.c3-card .tx{position:relative;padding:24px}.c3-card h3{margin:0;font-size:24px;line-height:1.15}.c3-card p{margin:8px 0 16px;font-size:14px;opacity:.8;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.c3-card .rw{display:flex;justify-content:space-between;align-items:center}.c3-card .rw b{font-size:18px;color:color-mix(in srgb,var(--a) 40%,#fff)}
.c3-card .rw a{font-size:13px;font-weight:700;padding:8px 16px;border-radius:999px;background:#fff;color:#0b1220;text-decoration:none}
.c3-num{max-width:1240px;margin:96px auto 0;padding:0 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.c3-num div{border-top:2px solid var(--a);padding-top:18px}
.c3-num b{display:block;font-family:var(--hf);font-size:clamp(40px,6vw,84px);font-weight:800;line-height:1;color:transparent;-webkit-text-stroke:2px color-mix(in srgb,var(--a) 55%,#fff)}
.c3-num div>span{font-size:14px;opacity:.75}
.c3-doc{max-width:1240px;margin:100px auto 0;padding:0 20px;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.c3-big{font-family:var(--hf);font-weight:800;font-size:clamp(140px,26vw,360px);line-height:.85;color:transparent;-webkit-text-stroke:3px color-mix(in srgb,var(--a) 70%,#fff);text-align:center;letter-spacing:-.05em}
.c3-deg{font-size:20px;font-weight:600;color:color-mix(in srgb,var(--a) 45%,#fff);margin:0 0 8px}.c3-doc ul{list-style:none;padding:0;margin:20px 0 0;display:grid;gap:10px}
.c3-doc li{display:flex;gap:10px;align-items:center;padding:12px 16px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid var(--line);font-size:14.5px}.c3-doc li svg{color:var(--a);filter:brightness(1.5);flex:none}
.c3-q{text-align:center;max-width:900px}.c3-stars{display:flex;gap:3px;justify-content:center}
.c3-q blockquote{font-family:var(--hf);font-size:clamp(24px,3.6vw,42px);line-height:1.2;font-weight:700;margin:18px 0}.c3-q p{opacity:.75;margin:0}
.c3-dots{display:flex;gap:8px;justify-content:center;margin-top:22px}.c3-dots button{width:10px;height:10px;border-radius:50%;border:0;background:var(--line);cursor:pointer;padding:0}.c3-dots .on{background:var(--a)}
.c3-two{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:start}
.c3 .bk{backdrop-filter:blur(16px);box-shadow:0 30px 80px rgba(0,0,0,.45),0 0 0 1px color-mix(in srgb,var(--a) 45%,transparent)}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:18px 0;cursor:pointer;font-weight:600}
.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 18px;opacity:.75}
@media(max-width:860px){.c3-doc,.c3-two{grid-template-columns:1fr}.c3-num{grid-template-columns:1fr 1fr}.c3-big{font-size:46vw}.c3-card{height:400px}.c3-sec{padding-top:64px}.c3-arrows{display:none}}
@media(prefers-reduced-motion:no-preference){.c3-bg{animation:c3k 22s ease-out both}@keyframes c3k{from{transform:scale(1.1)}}}
`;
