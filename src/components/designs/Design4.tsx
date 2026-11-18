import React from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, accentOf, initials, pics, statsOf, telUrl, useFonts, useReveal, waUrl } from './shared';
import { CostEstimator, FindUs, FooterCols, SECTIONS_CSS, Steps, WhyUs } from './Sections';

/** Design 4, Bloom: cream and sage, arch photo masks, soft serif, wellness feel. */
export const Design4: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Figtree:wght@400;500;600;700');
  const ref = useReveal();
  const ph = pics(d, 1200); const stats = statsOf(d);
  return (
    <div className="t4" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <header className="t4-nav"><b>{d.businessName}</b>
        <nav><a href="#tr">Treatments</a><a href="#dr">Doctor</a><a href="#rv">Reviews</a><a href="#vs">Visit</a></nav>
        <a className="t4-pill" href={telUrl(d)}><I.Phone size={15} /> {d.phone}</a></header>

      <section className="t4-hero">
        <div className="t4-c">
          <p className="t4-tag"><I.Leaf size={15} /> {d.nicheTitle}, {d.city}</p>
          <h1>{d.tagline}</h1>
          <p className="t4-s">Gentle, unhurried care with {d.doctorName}. Choose a day and we hold your token on WhatsApp.</p>
          <div className="t4-row"><a className="t4-b" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp</a><a className="t4-b o" href="#tr">View treatments</a></div>
          <ul className="t4-chips">{d.badges.slice(0, 3).map((b, i) => <li key={i}><I.Check size={14} /> {b}</li>)}</ul>
        </div>
        <div className="t4-arches">
          <div className="a1"><Img src={ph[0]} /></div>
          <div className="a2"><Img src={ph[1]} /></div>
          <div className="t4-circle"><b>{stats[0]?.v}</b><span>{stats[0]?.l}</span></div>
        </div>
      </section>

      <section className="t4-strip"><div>{stats.slice(0, 4).map((s, i) => <p key={i}><b>{s.v}</b><span>{s.l}</span></p>)}</div></section>

      <section id="tr" className="t4-tr">
        <div className="t4-hd" data-rv><h2>Treatments, explained simply</h2><p>Each one comes with a clear price. {d.consultationFee}</p></div>
        <div className="t4-g">
          {d.services.map((s, i) => (
            <article key={i} data-rv>
              <div className="ph"><Img src={ph[(i + 1) % ph.length]} /></div>
              <h3>{s.title}</h3><p>{s.desc}</p>
              <div className="ft"><b>{s.price || 'Ask at clinic'}</b><a href={waUrl(d)} target="_blank" rel="noreferrer">Book</a></div>
            </article>
          ))}
        </div>
      </section>

      <section id="dr" className="t4-dr">
        <div className="t4-di">
          <div className="t4-dp" data-rv><Img src={ph[2] || ph[0]} /><span>{initials(d.doctorName)}</span></div>
          <div data-rv>
            <p className="t4-tag"><I.Heart size={15} /> Your doctor</p>
            <h2>{d.doctorName}</h2>
            <p className="dg">{d.doctorTitle}</p>
            <p>{d.doctorExperience}</p>
            <blockquote>“{d.testimonials[0]?.comment}”<cite>{d.testimonials[0]?.name}</cite></blockquote>
          </div>
        </div>
      </section>

      <WhyUs d={d} title="Why patients choose us" />
      <CostEstimator d={d} />
      <Steps d={d} />

      <section id="rv" className="t4-rv"><h2 className="x-h" data-rv>Kind words</h2>
        <div>{d.testimonials.slice(0, 3).map((t, i) => <figure key={i} data-rv><div className="st">{'★★★★★'}</div><blockquote>{t.comment}</blockquote><figcaption><b>{t.name}</b> {t.role}</figcaption></figure>)}</div></section>
      <div id="vs"><FindUs d={d} /></div>
      <section className="t4-two"><div><h2 className="x-h" data-rv>Common questions</h2><FaqList d={d} /></div><BookingCard d={d} title="Request an appointment" /></section>
      <FooterCols d={d} /><FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t4{--ink:#2b3a2f;--card:#fff;--line:rgba(43,58,47,.14);--on:#fff;--r:22px;--hf:Fraunces,serif;--hw:400;--hw3:400;--hls:-.015em;--btn:#2f4a38;--btn-fg:#fbf7f0;--wi-bg:#dfe8dc;--wi-fg:#2f4a38;--ico:#2f4a38;--est-bg:#2f4a38;--est-fg:#fbf7f0;--band-bg:#2f4a38;--band-fg:#fbf7f0;--fbg:#22352a;min-height:100vh;background:#fbf7f0;color:var(--ink);font-family:Figtree,system-ui,sans-serif;font-size:17px;line-height:1.65;overflow-x:clip}
.t4 *{box-sizing:border-box}.t4 h1,.t4 h2,.t4 h3{font-family:var(--hf);font-weight:var(--hw)}.t4 a{color:inherit}
.t4 a:focus-visible,.t4 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.t4-nav{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;padding:22px 20px}.t4-nav b{font-family:var(--hf);font-size:22px;font-weight:600;margin-right:auto}.t4-nav nav{display:flex;gap:26px;font-size:15px}.t4-nav nav a{text-decoration:none;opacity:.8}
.t4-pill{display:inline-flex;gap:8px;align-items:center;background:#dfe8dc;border-radius:999px;padding:10px 20px;font-weight:600;text-decoration:none;font-size:15px}
.t4-hero{max-width:1240px;margin:0 auto;padding:40px 20px 70px;display:grid;grid-template-columns:1.05fr .95fr;gap:50px;align-items:center}
.t4-tag{display:inline-flex;gap:8px;align-items:center;margin:0 0 20px;font-size:14.5px;font-weight:600;background:#dfe8dc;padding:7px 16px;border-radius:999px}
.t4 h1{font-size:clamp(44px,6vw,86px);line-height:1.02;letter-spacing:-.02em;margin:0;max-width:13ch}
.t4-s{font-size:19px;max-width:44ch;margin:24px 0 0;opacity:.82}.t4-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
.t4-b{background:#2f4a38;color:#fbf7f0!important;padding:16px 28px;border-radius:999px;font-weight:600;text-decoration:none;transition:transform .2s}.t4-b:hover{transform:translateY(-2px)}.t4-b.o{background:transparent;color:#2f4a38!important;border:1.5px solid #2f4a38}
.t4-chips{list-style:none;display:flex;flex-wrap:wrap;gap:10px;margin:30px 0 0;padding:0;font-size:14.5px}.t4-chips li{display:flex;gap:6px;align-items:center}.t4-chips svg{color:var(--a)}
.t4-arches{position:relative;height:560px}
.a1,.a2{position:absolute;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 35%,#dfe8dc),#2f4a38)}
.a1{left:0;top:0;width:62%;height:100%;border-radius:999px 999px 24px 24px}.a2{right:0;bottom:0;width:42%;height:52%;border-radius:999px 999px 24px 24px;border:8px solid #fbf7f0}
.a1 img,.a2 img,.ph img,.t4-dp img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.t4-circle{position:absolute;right:6%;top:6%;width:128px;height:128px;border-radius:50%;background:var(--a);color:#fff;display:grid;place-content:center;text-align:center;line-height:1.15;transform:rotate(-8deg)}.t4-circle b{font-family:var(--hf);font-size:34px;font-weight:400}.t4-circle span{font-size:12.5px;max-width:9ch;margin:auto}
.t4-strip{background:#dfe8dc}.t4-strip>div{max-width:1240px;margin:0 auto;padding:30px 20px;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:20px;text-align:center}.t4-strip p{margin:0;display:grid}.t4-strip b{font-family:var(--hf);font-size:36px;font-weight:400}.t4-strip span{font-size:14px;opacity:.75}
.t4-tr{max-width:1240px;margin:0 auto;padding:120px 20px 0}.t4-hd{text-align:center;max-width:640px;margin:0 auto 54px}.t4 h2{font-size:clamp(34px,4.4vw,58px);line-height:1.05;letter-spacing:-.015em;margin:0 0 14px}.t4-hd p{margin:0;opacity:.75}
.t4-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:34px 26px}
.t4-g article{display:flex;flex-direction:column}.ph{position:relative;aspect-ratio:1/1.05;border-radius:999px 999px 22px 22px;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 35%,#dfe8dc),#2f4a38);margin-bottom:20px}
.t4-g h3{margin:0;font-size:26px;line-height:1.12}.t4-g p{margin:8px 0 16px;font-size:15px;opacity:.75}.ft{margin-top:auto;display:flex;justify-content:space-between;align-items:center}.ft b{color:#2f4a38;font-weight:700}.ft a{font-size:14px;font-weight:600;text-decoration:none;background:#dfe8dc;padding:7px 16px;border-radius:999px}
.t4-dr{background:#dfe8dc;margin-top:120px;padding:100px 20px}.t4-di{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:.8fr 1.2fr;gap:64px;align-items:center}
.t4-dp{position:relative;aspect-ratio:4/5;border-radius:999px 999px 24px 24px;overflow:hidden;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 45%,#2f4a38),#22352a);display:grid;place-items:center;font-family:var(--hf);font-size:90px;color:rgba(255,255,255,.85)}
.dg{font-family:var(--hf);font-size:22px;margin:0 0 12px;opacity:.85}.t4-dr blockquote{margin:26px 0 0;padding:26px;background:#fbf7f0;border-radius:var(--r);font-family:var(--hf);font-size:22px;line-height:1.3}.t4-dr cite{display:block;margin-top:12px;font:600 14px Figtree,sans-serif;opacity:.7}
.t4-rv{max-width:1240px;margin:0 auto;padding:120px 20px 0}.t4-rv>div{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px;margin-top:34px}
.t4-rv figure{margin:0;background:#fff;border-radius:var(--r);padding:30px;border:1px solid var(--line)}.st{color:#d9a441;letter-spacing:2px;margin-bottom:12px}.t4-rv blockquote{margin:0 0 18px;font-family:var(--hf);font-size:21px;line-height:1.35}.t4-rv figcaption{font-size:14px;opacity:.75}
.t4-two{max-width:1240px;margin:0 auto;padding:110px 20px 0;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:start}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:20px 0;cursor:pointer;font-family:var(--hf);font-size:21px}.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 20px;opacity:.8;max-width:60ch}
.t4 .x-sec{max-width:1240px}
@media(max-width:900px){.t4-hero,.t4-di,.t4-two{grid-template-columns:1fr}.t4-arches{height:400px}.t4-nav nav{display:none}.t4-dr{padding:64px 20px;margin-top:80px}.t4-tr{padding-top:80px}.t4-dp{max-width:320px}}
`;
