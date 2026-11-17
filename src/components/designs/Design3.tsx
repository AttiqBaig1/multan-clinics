import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, Img, accentOf, mapUrl, shortName, telUrl, useFonts, waUrl } from './shared';

/** Design 3, Night Suite: deep navy full-bleed hero, a glowing speciality accent, glass booking panel. */
export const Design3: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Manrope:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@1,6..72,400');
  return (
    <div className="n3" style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}</style>
      <section className="n3-hero">
        <Img src={d.heroImage} className="n3-bg" />
        <div className="n3-shade" />
        <header className="n3-top"><span>{d.businessName}</span><a href={telUrl(d)}>{d.phone}</a></header>
        <div className="n3-grid">
          <div>
            <p className="n3-tag">{d.nicheTitle}</p>
            <h1>{d.tagline}</h1>
            <p className="n3-sub"><em>{d.doctorName}</em>, {d.doctorTitle}. {d.doctorExperience}.</p>
            <ul className="n3-chips">{d.badges.slice(0, 3).map((b, i) => <li key={i}>{b}</li>)}</ul>
          </div>
          <BookingCard d={d} title="Book your visit" />
        </div>
      </section>

      <section className="n3-sec">
        <h2>Treatments</h2>
        <div className="n3-tiles">
          {d.services.map((s, i) => (
            <article key={i} className="n3-tile">
              <h3>{s.title}</h3><p>{s.desc}</p>
              <div className="n3-price">{s.price || 'Ask at clinic'}</div>
            </article>
          ))}
        </div>
      </section>

      {d.procedures && d.procedures.length > 0 && (
        <section className="n3-sec">
          <h2>Inside the clinic</h2>
          <div className="n3-proc">
            {d.procedures.slice(0, 3).map((p, i) => (
              <figure key={i}><div className="n3-ph"><Img src={p.img} /></div><figcaption><b>{p.title}</b><span>{p.desc}</span></figcaption></figure>
            ))}
          </div>
        </section>
      )}

      <section className="n3-sec n3-two">
        <div>
          <h2>Patients say</h2>
          {d.testimonials.slice(0, 2).map((t, i) => (
            <blockquote key={i}>“{t.comment}”<footer>{t.name}, {t.role}</footer></blockquote>
          ))}
        </div>
        <div>
          <h2>Questions</h2>
          <FaqList d={d} />
        </div>
      </section>

      <section className="n3-end">
        <h2>{shortName(d.businessName)}</h2>
        <p>{d.address}, {d.city} · {d.timings}</p>
        <div className="n3-cta">
          <a className="n3-b" href={waUrl(d)} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="n3-b ghost" href={mapUrl(d)} target="_blank" rel="noreferrer">Directions</a>
        </div>
      </section>
    </div>
  );
};

const CSS = `
.n3{--ink:#e9eef7;--card:rgba(13,25,43,.72);--line:rgba(255,255,255,.16);--on:#04101c;min-height:100vh;background:#08121f;color:var(--ink);font-family:Manrope,system-ui,sans-serif;line-height:1.55}
.n3 *{box-sizing:border-box}.n3 a{color:inherit}
.n3-hero{position:relative;overflow:hidden;background:radial-gradient(900px 500px at 85% 10%,color-mix(in srgb,var(--a) 55%,transparent),transparent),linear-gradient(180deg,#0b1a2e,#08121f)}
.n3-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.38}
.n3-shade{position:absolute;inset:0;background:linear-gradient(90deg,#08121f 20%,rgba(8,18,31,.55) 70%,rgba(8,18,31,.35))}
.n3-top{position:relative;display:flex;justify-content:space-between;align-items:center;max-width:1180px;margin:0 auto;padding:22px 24px;font-weight:700}
.n3-top a{text-decoration:none;color:var(--a);filter:brightness(1.5)}
.n3-grid{position:relative;max-width:1180px;margin:0 auto;padding:56px 24px 88px;display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center}
.n3-tag{margin:0 0 16px;font-weight:700;font-size:14px;color:color-mix(in srgb,var(--a) 55%,#fff)}
.n3 h1{font-size:clamp(34px,5vw,60px);line-height:1.06;letter-spacing:-.03em;font-weight:800;margin:0;max-width:17ch}
.n3-sub{font-size:18px;opacity:.85;max-width:48ch;margin:22px 0 0}
.n3-sub em{font-family:Newsreader,serif;font-size:1.2em}
.n3-chips{list-style:none;padding:0;margin:28px 0 0;display:flex;flex-wrap:wrap;gap:10px}
.n3-chips li{font-size:13.5px;font-weight:600;padding:8px 14px;border-radius:999px;border:1px solid var(--line);background:rgba(255,255,255,.06)}
.n3 .bk{backdrop-filter:blur(14px);box-shadow:0 30px 80px rgba(0,0,0,.45),0 0 0 1px color-mix(in srgb,var(--a) 40%,transparent)}
.n3 .bk-d.on{color:#04101c}
.n3-sec{max-width:1180px;margin:0 auto;padding:72px 24px}
.n3 h2{font-size:clamp(26px,3vw,36px);letter-spacing:-.02em;font-weight:800;margin:0 0 28px}
.n3-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
.n3-tile{padding:26px;border-radius:18px;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:1px solid var(--line);border-top:3px solid var(--a);display:flex;flex-direction:column}
.n3-tile h3{margin:0;font-size:19px}.n3-tile p{margin:8px 0 18px;opacity:.75;font-size:15px;flex:1}
.n3-price{font-weight:800;color:color-mix(in srgb,var(--a) 55%,#fff)}
.n3-proc{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
.n3-proc figure{margin:0}.n3-ph{aspect-ratio:4/3;border-radius:16px;overflow:hidden;background:linear-gradient(150deg,color-mix(in srgb,var(--a) 40%,#0b1a2e),#0b1a2e)}
.n3-ph img{width:100%;height:100%;object-fit:cover;display:block}
.n3-proc figcaption{display:grid;gap:3px;padding-top:12px;font-size:14px}.n3-proc figcaption span{opacity:.7}
.n3-two{display:grid;grid-template-columns:1fr 1fr;gap:56px}
.n3 blockquote{margin:0 0 22px;padding:0 0 0 18px;border-left:3px solid var(--a);font-family:Newsreader,serif;font-style:italic;font-size:21px;line-height:1.45}
.n3 blockquote footer{font-family:Manrope,sans-serif;font-style:normal;font-size:13px;opacity:.7;margin-top:8px}
.faq-i{border-top:1px solid var(--line)}
.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:16px 0;cursor:pointer;font-weight:600}
.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 16px;opacity:.78}
.n3-end{text-align:center;padding:80px 24px 90px;background:linear-gradient(180deg,transparent,color-mix(in srgb,var(--a) 22%,#08121f))}
.n3-end h2{font-size:clamp(30px,5vw,52px);margin:0}.n3-end p{opacity:.8;margin:10px 0 0}
.n3-cta{display:flex;gap:12px;justify-content:center;margin-top:26px;flex-wrap:wrap}
.n3-b{padding:15px 30px;border-radius:999px;background:var(--a);color:#fff;font-weight:700;text-decoration:none}.n3-b.ghost{background:transparent;border:1.5px solid var(--line)}
@media(max-width:860px){.n3-grid,.n3-two{grid-template-columns:1fr;gap:36px}.n3-grid{padding:28px 20px 56px}.n3-shade{background:linear-gradient(180deg,rgba(8,18,31,.6),#08121f 95%)}.n3-sec{padding:52px 20px}}
@media(prefers-reduced-motion:no-preference){.n3-bg{animation:n3z 18s ease-out both}@keyframes n3z{from{transform:scale(1.08)}}}
`;
