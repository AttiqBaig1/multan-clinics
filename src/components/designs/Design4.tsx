import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, Img, ServiceIcon, accentOf, galleryOf, initials, mapUrl, statsOf, telUrl, useFonts, waUrl } from './shared';

/** Design 4, Sehat: playful and colourful. Sunny yellow beside the speciality colour, big rounded blocks, bold icon cards, 3-step first visit. */
export const Design4: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Nunito:wght@500;600;700;800;900');
  const stats = statsOf(d); const gal = galleryOf(d);
  return (
    <div className="s4" style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}</style>
      <header className="s4-top">
        <span className="s4-logo">{initials(d.businessName).slice(0, 2)}</span>
        <b>{d.businessName}</b>
        <a href={telUrl(d)} className="s4-ph"><I.Phone size={15} /> {d.phone}</a>
        <a href={waUrl(d)} target="_blank" rel="noreferrer" className="s4-pill"><I.MessageCircle size={16} /> WhatsApp</a>
      </header>

      <section className="s4-hero">
        <div className="s4-hl">
          <span className="s4-tag">{d.nicheTitle}</span>
          <h1>{d.tagline}</h1>
          <p>{d.doctorName} sees every patient personally. Pick a day, get a fixed token and walk straight in.</p>
          <div className="s4-cta">
            <a className="s4-btn" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> Book on WhatsApp</a>
            <a className="s4-btn alt" href={telUrl(d)}><I.Phone size={18} /> Call</a>
          </div>
          <ul className="s4-ticks">{d.badges.slice(0, 3).map((b, i) => <li key={i}><I.BadgeCheck size={18} /> {b}</li>)}</ul>
        </div>
        <div className="s4-hr">
          <div className="s4-sun" aria-hidden />
          <div className="s4-dp"><Img src={d.doctorImage} /><span>{initials(d.doctorName)}</span></div>
          <div className="s4-card"><b>{d.doctorName}</b><small>{d.doctorTitle}</small></div>
        </div>
      </section>

      <section className="s4-stats">{stats.map((s, i) => <div key={i} className={'k' + (i % 4)}><b>{s.v}</b><span>{s.l}</span></div>)}</section>

      <section className="s4-sec">
        <h2>How we can help</h2>
        <div className="s4-svc">
          {d.services.map((s, i) => (
            <article key={i} className={'k' + (i % 4)}>
              <div className="s4-ic"><ServiceIcon name={s.icon} size={28} /></div>
              <h3>{s.title}</h3><p>{s.desc}</p>
              <span className="s4-price">{s.price || 'Ask at clinic'}</span>
            </article>
          ))}
        </div>
      </section>

      {gal.length > 1 && (
        <section className="s4-sec"><h2>A look inside</h2>
          <div className="s4-gal">{gal.map((g, i) => <figure key={i}><div><Img src={g.src} /></div><figcaption>{g.label}</figcaption></figure>)}</div>
        </section>
      )}

      <section className="s4-band">
        <div className="s4-in">
          <h2>Your first visit in 3 easy steps</h2>
          <ol>
            <li><I.MessageCircle size={26} /><b>Message us</b><span>Tell us the treatment and the day you prefer.</span></li>
            <li><I.CalendarCheck size={26} /><b>Get your token</b><span>We confirm a time slot, usually within minutes.</span></li>
            <li><I.MapPin size={26} /><b>Walk in</b><span>{d.address}, {d.city}. No queue at the counter.</span></li>
          </ol>
        </div>
      </section>

      <section className="s4-sec s4-two">
        <div>
          <h2>Happy patients</h2>
          {d.testimonials.slice(0, 3).map((t, i) => (
            <figure key={i} className={'s4-rev k' + (i % 4)}>
              <div className="s4-stars">{Array.from({ length: Math.round(t.rating) }).map((_, k) => <I.Star key={k} size={16} fill="#f5b301" stroke="#f5b301" />)}</div>
              <blockquote>{t.comment}</blockquote><figcaption><b>{t.name}</b> · {t.role}</figcaption>
            </figure>
          ))}
        </div>
        <div><BookingCard d={d} title="Book a token" button="Send on WhatsApp" />
          <div className="s4-faq"><h2>Good to know</h2><FaqList d={d} /></div></div>
      </section>

      <footer className="s4-foot"><b>{d.businessName}</b><span>{d.address}, {d.city}</span><a href={mapUrl(d)} target="_blank" rel="noreferrer">Open map</a></footer>
      <FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.s4{--ink:#1c2340;--card:#fff;--line:#e6e9f2;--on:#fff;--r:24px;--sun:#ffc93c;min-height:100vh;background:#fffdf8;color:var(--ink);font-family:Nunito,system-ui,sans-serif;line-height:1.6;font-weight:600}
.s4 *{box-sizing:border-box}.s4 h1,.s4 h2,.s4 h3{font-family:inherit}.s4 a{color:inherit}
.s4 a:focus-visible,.s4 button:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.s4 .k0{--c:var(--a)}.s4 .k1{--c:#ff8a5b}.s4 .k2{--c:#8b6cf0}.s4 .k3{--c:#22b573}
.s4-top{display:flex;align-items:center;gap:12px;max-width:1180px;margin:0 auto;padding:16px 20px}
.s4-top b{margin-right:auto;font-size:19px;font-weight:900}
.s4-logo{width:42px;height:42px;border-radius:14px;background:var(--a);color:#fff;font-weight:900;display:grid;place-items:center;transform:rotate(-6deg)}
.s4-ph{display:inline-flex;gap:6px;align-items:center;text-decoration:none;font-weight:800;font-size:14px}
.s4-pill{display:inline-flex;gap:6px;align-items:center;background:#25d366;color:#fff!important;text-decoration:none;font-weight:800;padding:10px 18px;border-radius:999px;font-size:14px}
.s4-hero{max-width:1180px;margin:6px auto 0;padding:0 20px;display:grid;grid-template-columns:1.1fr .9fr;gap:20px}
.s4-hl{background:color-mix(in srgb,var(--a) 14%,#fffdf8);border-radius:40px;padding:50px 46px}
.s4-tag{display:inline-block;background:var(--sun);color:#3a2a00;font-weight:900;font-size:14px;padding:6px 16px;border-radius:999px}
.s4 h1{font-size:clamp(32px,4.6vw,56px);line-height:1.08;font-weight:900;letter-spacing:-.02em;margin:18px 0 0;max-width:15ch}
.s4-hl p{font-size:17.5px;max-width:44ch;margin:18px 0 0}
.s4-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
.s4-btn{display:inline-flex;align-items:center;gap:8px;padding:16px 28px;border-radius:18px;background:var(--a);color:#fff!important;font-weight:900;text-decoration:none;box-shadow:0 8px 0 color-mix(in srgb,var(--a) 60%,#000);transition:transform .1s,box-shadow .1s}
.s4-btn:active{transform:translateY(4px);box-shadow:0 4px 0 color-mix(in srgb,var(--a) 60%,#000)}
.s4-btn.alt{background:#fff;color:var(--ink)!important;box-shadow:0 8px 0 var(--line);border:2px solid var(--line)}
.s4-ticks{list-style:none;padding:0;margin:26px 0 0;display:grid;gap:8px}.s4-ticks li{display:flex;gap:8px;align-items:center;font-weight:700}.s4-ticks svg{color:var(--a);flex:none}
.s4-hr{position:relative;background:var(--a);border-radius:40px;display:grid;place-items:center;padding:36px;overflow:hidden;min-height:420px}
.s4-sun{position:absolute;width:300px;height:300px;border-radius:50%;background:var(--sun);right:-80px;top:-80px;opacity:.95}
.s4-dp{position:relative;width:min(100%,300px);aspect-ratio:1;border-radius:50%;overflow:hidden;border:8px solid #fff;background:rgba(255,255,255,.25);display:grid;place-items:center;font-size:76px;font-weight:900;color:#fff;box-shadow:0 20px 50px rgba(0,0,0,.25)}
.s4-dp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.s4-card{position:absolute;left:24px;right:24px;bottom:22px;background:#fff;border-radius:20px;padding:12px 18px;display:grid;box-shadow:0 12px 30px rgba(0,0,0,.2)}.s4-card small{color:#667}
.s4-stats{max-width:1180px;margin:20px auto 0;padding:0 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.s4-stats div{background:color-mix(in srgb,var(--c) 14%,#fff);border-radius:26px;padding:22px 18px;text-align:center}
.s4-stats b{display:block;font-size:30px;font-weight:900;color:var(--c);line-height:1.15}.s4-stats span{font-size:13px}
.s4-sec{max-width:1180px;margin:0 auto;padding:76px 20px 0}
.s4 h2{font-size:clamp(28px,3.4vw,42px);font-weight:900;letter-spacing:-.015em;margin:0 0 28px}
.s4-svc{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px}
.s4-svc article{background:#fff;border:2px solid var(--line);border-radius:30px;padding:26px;display:flex;flex-direction:column;transition:transform .15s,border-color .15s}
.s4-svc article:hover{transform:translateY(-4px) rotate(-.6deg);border-color:var(--c)}
.s4-ic{width:60px;height:60px;border-radius:20px;background:var(--c);color:#fff;display:grid;place-items:center}
.s4-svc h3{font-size:19px;font-weight:900;margin:16px 0 6px}.s4-svc p{margin:0 0 16px;font-size:14.5px;flex:1;color:#4b5270}
.s4-price{align-self:flex-start;background:color-mix(in srgb,var(--c) 15%,#fff);color:var(--c);font-weight:900;padding:5px 14px;border-radius:999px;font-size:14px}
.s4-gal{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.s4-gal figure{margin:0}.s4-gal div{position:relative;aspect-ratio:4/3;border-radius:28px;overflow:hidden;background:linear-gradient(140deg,var(--sun),var(--a))}
.s4-gal img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.s4-gal figcaption{padding:8px 6px 0;font-size:14px}
.s4-band{margin-top:80px;background:#1c2340;color:#fff;padding:66px 20px}.s4-in{max-width:1180px;margin:0 auto}.s4-band h2{color:#fff}
.s4-band ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.s4-band li{background:rgba(255,255,255,.08);border-radius:26px;padding:26px;display:grid;gap:6px;align-content:start}
.s4-band li svg{color:var(--sun);margin-bottom:4px}.s4-band li b{font-size:19px;font-weight:900}.s4-band li span{opacity:.8;font-size:15px}
.s4-two{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:start}
.s4-rev{margin:0 0 14px;padding:24px;border-radius:26px;background:color-mix(in srgb,var(--c) 11%,#fff)}
.s4-stars{display:flex;gap:2px}.s4-rev blockquote{margin:10px 0;font-size:16px}.s4-rev figcaption{font-size:13.5px;color:#4b5270}
.s4-faq{margin-top:34px}.s4-faq h2{font-size:26px}
.faq-i{border-bottom:2px solid var(--line)}
.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:16px 0;cursor:pointer;font-weight:800}
.faq-q:focus-visible{outline:3px solid var(--ink)}.faq-a{margin:0 0 16px;color:#4b5270}
.s4-foot{display:flex;flex-wrap:wrap;gap:6px 20px;justify-content:center;padding:44px 20px 100px;font-size:14px}
@media(max-width:860px){.s4-hero,.s4-two{grid-template-columns:1fr}.s4-hl{padding:32px 24px}.s4-hr{min-height:360px}.s4-stats{grid-template-columns:1fr 1fr}.s4-band ol{grid-template-columns:1fr}.s4-sec{padding-top:54px}.s4-ph{display:none}.s4-top b{font-size:16px}}
`;
