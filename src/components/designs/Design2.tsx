import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, Img, accentOf, initials, mapUrl, shortName, telUrl, useFonts, waUrl } from './shared';

/** Design 2, Mist: calm editorial light. Arch-shaped photo, serif headlines, treatments laid out like a price list. */
export const Design2: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Figtree:wght@400;500;600;700');
  const [q, setQ] = React.useState(0);
  const t = d.testimonials[q % Math.max(1, d.testimonials.length)];
  return (
    <div className="m2" style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}</style>
      <header className="m2-top">
        <span className="m2-brand">{d.businessName}</span>
        <nav><a href="#treatments">Treatments</a><a href="#doctor">Doctor</a><a href="#visit">Visit</a></nav>
        <a className="m2-call" href={telUrl(d)}>{d.phone}</a>
      </header>

      <section className="m2-hero">
        <div className="m2-copy">
          <p className="m2-kicker">{d.nicheTitle}, {d.city}</p>
          <h1>{d.tagline}</h1>
          <p className="m2-sub">{d.doctorName} sees patients {d.timings.toLowerCase()}. Book a token on WhatsApp and walk in at your time.</p>
          <div className="m2-cta">
            <a className="m2-btn" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp</a>
            <a className="m2-btn ghost" href={telUrl(d)}>Call {d.phone}</a>
          </div>
          <ul className="m2-badges">{d.badges.slice(0, 3).map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>
        <div className="m2-arch" aria-hidden>
          <Img src={d.heroImage} className="m2-arch-img" />
          <div className="m2-arch-note"><b>{d.consultationFee}</b><span>consultation</span></div>
        </div>
      </section>

      <section id="treatments" className="m2-sec">
        <h2>Treatments and prices</h2>
        <p className="m2-lead">What you pay is written here, so there are no surprises at the counter.</p>
        <ul className="m2-menu">
          {d.services.map((s, i) => (
            <li key={i}>
              <div className="m2-row"><h3>{s.title}</h3><i /><b>{s.price || 'Ask at clinic'}</b></div>
              <p>{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="doctor" className="m2-doc">
        <div className="m2-mono" aria-hidden>{initials(d.doctorName)}</div>
        <div>
          <h2>{d.doctorName}</h2>
          <p className="m2-deg">{d.doctorTitle}</p>
          <p>{d.doctorExperience}</p>
          <p className="m2-hours">{d.timings}</p>
        </div>
      </section>

      {d.testimonials.length > 0 && (
        <section className="m2-sec m2-quote">
          <blockquote>“{t.comment}”</blockquote>
          <p className="m2-who"><b>{t.name}</b>, {t.role}</p>
          <div className="m2-dots">{d.testimonials.map((_, i) => <button key={i} aria-label={`Review ${i + 1}`} className={i === q % d.testimonials.length ? 'on' : ''} onClick={() => setQ(i)} />)}</div>
        </section>
      )}

      <section id="visit" className="m2-sec m2-visit">
        <div>
          <h2>Pick a day, we will hold your token</h2>
          <p className="m2-lead">{d.address}, {d.city}</p>
          <a className="m2-link" href={mapUrl(d)} target="_blank" rel="noreferrer">Open in Google Maps</a>
          <FaqList d={d} wrap="faq m2-faq" />
        </div>
        <BookingCard d={d} title="Request an appointment" />
      </section>
      <footer className="m2-foot">{d.businessName} · {d.address}, {d.city} · {d.phone}</footer>
    </div>
  );
};

const CSS = `
.m2{--ink:#10262c;--card:#fff;--line:#d5e0e3;--on:#fff;--r:18px;min-height:100vh;background:#f1f6f7;color:var(--ink);font-family:Figtree,system-ui,sans-serif;line-height:1.55}
.m2 *{box-sizing:border-box}
.m2 a{color:inherit}
.m2-top{display:flex;align-items:center;gap:24px;max-width:1160px;margin:0 auto;padding:18px 24px}
.m2-brand{font-family:Fraunces,serif;font-weight:600;font-size:20px;margin-right:auto}
.m2-top nav{display:flex;gap:22px;font-size:14.5px}.m2-top nav a{text-decoration:none;opacity:.8}.m2-top nav a:hover{opacity:1}
.m2-call{font-weight:700;text-decoration:none;color:var(--a);font-size:15px}
.m2-hero{max-width:1160px;margin:0 auto;padding:36px 24px 64px;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}
.m2-kicker{font-weight:600;color:var(--a);margin:0 0 14px;font-size:15px}
.m2-hero h1{font-family:Fraunces,serif;font-weight:600;font-size:clamp(34px,5vw,58px);line-height:1.08;letter-spacing:-.02em;margin:0;max-width:15ch}
.m2-sub{font-size:18px;max-width:46ch;margin:22px 0 0;opacity:.85}
.m2-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.m2-btn{display:inline-block;padding:15px 26px;border-radius:999px;background:var(--a);color:#fff;font-weight:700;text-decoration:none}
.m2-btn.ghost{background:transparent;color:var(--ink);border:1.5px solid var(--ink)}
.m2-btn:focus-visible,.m2 a:focus-visible,.m2 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.m2-badges{list-style:none;padding:0;margin:30px 0 0;display:grid;gap:8px;font-size:15px}
.m2-badges li{padding-left:26px;position:relative}
.m2-badges li:before{content:"";position:absolute;left:0;top:.45em;width:14px;height:8px;border-left:2.5px solid var(--a);border-bottom:2.5px solid var(--a);transform:rotate(-45deg)}
.m2-arch{position:relative;aspect-ratio:4/5;border-radius:999px 999px 24px 24px;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 35%,#fff),color-mix(in srgb,var(--a) 75%,#10262c))}
.m2-arch-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.m2-arch-note{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);background:#fff;border-radius:14px;padding:10px 20px;text-align:center;box-shadow:0 10px 30px rgba(16,38,44,.18);display:grid;white-space:nowrap}
.m2-arch-note b{font-size:15px}.m2-arch-note span{font-size:12px;opacity:.7}
.m2-sec{max-width:1160px;margin:0 auto;padding:72px 24px}
.m2-sec h2,.m2-doc h2{font-family:Fraunces,serif;font-weight:600;font-size:clamp(28px,3.4vw,40px);line-height:1.15;letter-spacing:-.015em;margin:0}
.m2-lead{opacity:.75;margin:10px 0 0;font-size:17px}
.m2-menu{list-style:none;margin:36px 0 0;padding:0;max-width:820px}
.m2-menu li{padding:22px 0;border-top:1px solid var(--line)}.m2-menu li:last-child{border-bottom:1px solid var(--line)}
.m2-row{display:flex;align-items:baseline;gap:12px}.m2-row h3{font-size:20px;font-weight:600;margin:0}
.m2-row i{flex:1;border-bottom:2px dotted color-mix(in srgb,var(--ink) 30%,transparent);transform:translateY(-4px)}
.m2-row b{color:var(--a);font-size:17px;white-space:nowrap}
.m2-menu p{margin:6px 0 0;opacity:.78;max-width:60ch}
.m2-doc{max-width:1160px;margin:0 auto;padding:56px 24px;display:grid;grid-template-columns:auto 1fr;gap:40px;align-items:center;background:color-mix(in srgb,var(--a) 9%,#fff);border-radius:28px}
.m2-doc{width:calc(100% - 48px)}
.m2-mono{width:170px;height:170px;border-radius:50%;background:var(--a);color:#fff;font-family:Fraunces,serif;font-size:60px;display:grid;place-items:center;margin-left:24px}
.m2-deg{font-weight:600;color:var(--a);margin:8px 0 4px}.m2-doc p{margin:4px 0;max-width:56ch}.m2-hours{opacity:.75}
.m2-quote{text-align:center;max-width:820px}
.m2-quote blockquote{font-family:Fraunces,serif;font-size:clamp(22px,3vw,32px);line-height:1.35;margin:0;font-weight:500}
.m2-who{margin:18px 0 0;opacity:.8}
.m2-dots{display:flex;gap:8px;justify-content:center;margin-top:18px}
.m2-dots button{width:10px;height:10px;border-radius:50%;border:0;background:var(--line);cursor:pointer;padding:0}.m2-dots .on{background:var(--a)}
.m2-visit{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:start}
.m2-link{display:inline-block;margin-top:10px;font-weight:700;color:var(--a)}
.faq{margin-top:28px}.faq-i{border-top:1px solid var(--line)}
.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:16px 0;cursor:pointer;font-weight:600}
.faq-q:focus-visible{outline:3px solid var(--a)}
.faq-a{margin:0 0 16px;opacity:.8;max-width:60ch}
.m2-foot{text-align:center;font-size:13px;opacity:.6;padding:28px 24px 40px}
@media(max-width:860px){.m2-top nav{display:none}.m2-hero,.m2-visit{grid-template-columns:1fr;gap:36px}.m2-arch{max-width:420px;width:100%;margin:0 auto}.m2-doc{grid-template-columns:1fr;text-align:center;justify-items:center;padding:36px 20px}.m2-mono{margin:0;width:120px;height:120px;font-size:44px}.m2-sec{padding:52px 20px}.m2-hero{padding:20px 20px 44px}.m2-top{padding:14px 20px}.m2-row{flex-wrap:wrap}.m2-row i{display:none}.m2-row b{width:100%}}
@media(prefers-reduced-motion:no-preference){.m2-hero .m2-copy{animation:m2in .7s ease both}@keyframes m2in{from{opacity:0;transform:translateY(10px)}}}
`;
