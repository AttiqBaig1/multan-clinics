import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, accentOf, initials, mapUrl, shortName, telUrl, useFonts, waUrl, Img } from './shared';

/** Design 4, Sehat: friendly colour blocks, Urdu headings next to English, big doctor card, 3-step first visit. */
export const Design4: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@500;700');
  return (
    <div className="s4" style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}</style>
      <header className="s4-top">
        <span className="s4-logo">{initials(shortName(d.businessName)).slice(0, 2) || '+'}</span>
        <b>{d.businessName}</b>
        <a href={waUrl(d)} target="_blank" rel="noreferrer" className="s4-pill">WhatsApp</a>
      </header>

      <section className="s4-hero">
        <div className="s4-hero-l">
          <p className="s4-ur" lang="ur" dir="rtl">آپ کی صحت، ہماری ذمہ داری</p>
          <h1>{d.tagline}</h1>
          <p className="s4-sub">{d.nicheTitle} in {d.city}. {d.doctorName} sees you personally, with a fixed token so you do not wait in a queue.</p>
          <div className="s4-cta">
            <a className="s4-btn" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp</a>
            <a className="s4-btn alt" href={telUrl(d)}>Call now</a>
          </div>
        </div>
        <div className="s4-doc">
          <div className="s4-ph"><Img src={d.doctorImage} /><span>{initials(d.doctorName)}</span></div>
          <h2>{d.doctorName}</h2>
          <p className="s4-deg">{d.doctorTitle}</p>
          <p>{d.doctorExperience}</p>
          <div className="s4-meta"><span>{d.timings}</span><span>{d.consultationFee}</span></div>
        </div>
      </section>

      <section className="s4-sec">
        <h2>What we treat <span lang="ur" dir="rtl">ہمارا علاج</span></h2>
        <div className="s4-svc">
          {d.services.map((s, i) => (
            <article key={i}>
              <h3>{s.title}</h3><p>{s.desc}</p>
              <span className="s4-tag">{s.price || 'Ask at clinic'}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="s4-band">
        <div className="s4-sec in">
          <h2>Your first visit, in three steps</h2>
          <ol className="s4-steps">
            <li><b>Message us</b><span>Send the treatment and day you want on WhatsApp.</span></li>
            <li><b>Get your token</b><span>We reply with a time slot, usually within minutes.</span></li>
            <li><b>Walk in</b><span>{d.address}, {d.city}. No queue at the counter.</span></li>
          </ol>
        </div>
      </section>

      <section className="s4-sec s4-two">
        <div>
          <h2>Patient reviews <span lang="ur" dir="rtl">مریضوں کی رائے</span></h2>
          {d.testimonials.slice(0, 3).map((t, i) => (
            <figure key={i} className="s4-rev"><blockquote>{t.comment}</blockquote><figcaption><b>{t.name}</b> · {t.role}</figcaption></figure>
          ))}
        </div>
        <div>
          <BookingCard d={d} title="Book a token" button="Send on WhatsApp" />
          <div className="s4-faq"><h2>Common questions</h2><FaqList d={d} /></div>
        </div>
      </section>

      <footer className="s4-foot">
        <b>{d.businessName}</b><span>{d.address}, {d.city}</span>
        <a href={mapUrl(d)} target="_blank" rel="noreferrer">Open map</a>
      </footer>
    </div>
  );
};

const CSS = `
.s4{--ink:#1d2433;--card:#fff;--line:#e3e7ee;--on:#fff;--r:20px;min-height:100vh;background:#fff;color:var(--ink);font-family:'Plus Jakarta Sans',system-ui,sans-serif;line-height:1.55}
.s4 *{box-sizing:border-box}.s4 a{color:inherit}
.s4 [lang=ur]{font-family:'Noto Nastaliq Urdu',serif;font-weight:700;line-height:2}
.s4-top{display:flex;align-items:center;gap:12px;max-width:1160px;margin:0 auto;padding:16px 24px}
.s4-top b{margin-right:auto;font-size:17px}
.s4-logo{width:38px;height:38px;border-radius:12px;background:var(--a);color:#fff;font-weight:800;display:grid;place-items:center;font-size:14px}
.s4-pill{background:#25d366;color:#fff!important;text-decoration:none;font-weight:700;padding:10px 18px;border-radius:999px;font-size:14px}
.s4-hero{max-width:1160px;margin:8px auto 0;padding:0 24px;display:grid;grid-template-columns:1.1fr .9fr;gap:24px}
.s4-hero-l{background:color-mix(in srgb,var(--a) 12%,#fff);border-radius:32px;padding:48px 44px}
.s4-ur{color:var(--a);font-size:21px;margin:0 0 8px}
.s4-hero h1{font-size:clamp(32px,4.4vw,52px);line-height:1.1;letter-spacing:-.025em;font-weight:800;margin:0;max-width:16ch}
.s4-sub{font-size:17px;max-width:46ch;margin:20px 0 0;opacity:.85}
.s4-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.s4-btn{padding:16px 28px;border-radius:16px;background:var(--a);color:#fff!important;font-weight:700;text-decoration:none}
.s4-btn.alt{background:#fff;color:var(--ink)!important;border:1.5px solid var(--line)}
.s4 a:focus-visible,.s4 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.s4-doc{background:var(--a);color:#fff;border-radius:32px;padding:36px;display:flex;flex-direction:column;justify-content:flex-end}
.s4-ph{position:relative;width:140px;height:140px;border-radius:50%;overflow:hidden;background:rgba(255,255,255,.2);margin-bottom:18px;display:grid;place-items:center;font-size:44px;font-weight:800}
.s4-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.s4-doc h2{margin:0;font-size:26px;letter-spacing:-.01em}.s4-deg{font-weight:700;margin:4px 0 8px;opacity:.95}.s4-doc p{margin:0 0 6px;opacity:.9}
.s4-meta{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.s4-meta span{background:rgba(255,255,255,.18);border-radius:999px;padding:6px 14px;font-size:13px;font-weight:600}
.s4-sec{max-width:1160px;margin:0 auto;padding:72px 24px}
.s4 h2{font-size:clamp(26px,3vw,36px);letter-spacing:-.02em;font-weight:800;margin:0 0 28px}
.s4 h2 span{font-size:.62em;color:var(--a);margin-left:10px}
.s4-svc{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px}
.s4-svc article{border:1.5px solid var(--line);border-radius:22px;padding:24px;display:flex;flex-direction:column}
.s4-svc article:nth-child(4n+1){background:color-mix(in srgb,var(--a) 8%,#fff)}
.s4-svc h3{margin:0;font-size:18px}.s4-svc p{margin:8px 0 16px;font-size:15px;opacity:.78;flex:1}
.s4-tag{align-self:flex-start;background:var(--a);color:#fff;padding:5px 14px;border-radius:999px;font-size:13px;font-weight:700}
.s4-band{background:#14213d;color:#fff}.s4-band .in{padding:64px 24px}.s4-band h2{color:#fff}
.s4-steps{list-style:none;counter-reset:s;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.s4-steps li{counter-increment:s;background:rgba(255,255,255,.07);border-radius:20px;padding:26px;display:grid;gap:6px}
.s4-steps li:before{content:counter(s);width:34px;height:34px;border-radius:50%;background:var(--a);display:grid;place-items:center;font-weight:800}
.s4-steps span{opacity:.8;font-size:15px}
.s4-two{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.s4-rev{margin:0 0 14px;padding:22px;border-radius:20px;background:#f5f7fa}.s4-rev blockquote{margin:0 0 10px;font-size:16px}.s4-rev figcaption{font-size:13.5px;opacity:.75}
.s4-faq{margin-top:36px}.s4-faq h2{font-size:24px}
.faq-i{border-top:1px solid var(--line)}
.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:15px 0;cursor:pointer;font-weight:600}
.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 14px;opacity:.78}
.s4-foot{display:flex;flex-wrap:wrap;gap:8px 20px;justify-content:center;padding:28px 24px 44px;font-size:14px;border-top:1px solid var(--line)}
@media(max-width:860px){.s4-hero,.s4-two{grid-template-columns:1fr}.s4-hero-l{padding:32px 24px}.s4-steps{grid-template-columns:1fr}.s4-sec{padding:52px 20px}.s4-hero{padding:0 16px}.s4-top{padding:14px 16px}.s4-two{gap:36px}}
`;
