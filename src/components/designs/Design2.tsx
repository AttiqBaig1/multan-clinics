import React from 'react';
import { D, BOOKING_CSS, BookingCard, CountUp, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, ServiceIcon, accentOf, initials, mapUrl, pics, statsOf, telUrl, useFonts, useReveal, waUrl } from './shared';
import { CostEstimator, FindUs, FooterCols, SECTIONS_CSS, Steps, WhyUs } from './Sections';

/** Design 2, Bento: floating pill nav, photo collage hero, then one bento grid that shows treatments, doctor, hours, reviews at a glance. */
export const Design2: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600');
  const ref = useReveal();
  const ph = pics(d, 1200); const stats = statsOf(d);
  const rating = stats.find(s => s.l.startsWith('Patient'))?.v;
  const t0 = d.testimonials[0];
  return (
    <div className="b2" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <header className="b2-nav">
        <span className="b2-mono">{initials(d.businessName)}</span><b>{d.businessName}</b>
        <nav><a href="#care">Treatments</a><a href="#doctor">Doctor</a><a href="#visit">Visit</a></nav>
        <a className="b2-bk" href={waUrl(d)} target="_blank" rel="noreferrer">Book now</a>
      </header>

      <section className="b2-hero">
        <div className="b2-hl">
          {rating && <span className="b2-pill"><I.Star size={15} fill="#f5b301" stroke="#f5b301" /> {rating} rated by patients</span>}
          <h1>{d.tagline}</h1>
          <p>{d.nicheTitle} in {d.city}. See {d.doctorName} at {d.address}, with a fixed token so you are never left waiting.</p>
          <div className="b2-cta">
            <a className="b2-btn" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> Book on WhatsApp</a>
            <a className="b2-btn ghost" href={telUrl(d)}><I.Phone size={18} /> {d.phone}</a>
          </div>
          <div className="b2-trust">
            <div className="b2-av">{d.testimonials.slice(0, 3).map((t, i) => <span key={i}>{initials(t.name)}</span>)}</div>
            <small>Trusted by patients across {d.city}</small>
          </div>
        </div>
        <div className="b2-col" aria-hidden>
          <div className="b2-p1"><Img src={ph[0]} /></div>
          <div className="b2-p2"><Img src={ph[1]} /></div>
          <div className="b2-p3"><Img src={ph[2] || ph[0]} /></div>
          <div className="b2-glass"><I.Clock size={18} /><div><b>Open</b><small>{d.timings}</small></div></div>
        </div>
      </section>

      <section id="care" className="b2-sec">
        <h2 className="b2-h" data-rv>Everything you need to know, at a glance</h2>
        <div className="b2-grid">
          <article className="bt big" data-rv>
            <Img src={ph[3] || ph[0]} /><div className="shade" />
            <div className="cap"><b>{d.services.length} treatments</b><span>with the price written next to each one</span>
              <a href={waUrl(d)} target="_blank" rel="noreferrer">Book a visit</a></div>
          </article>
          {d.services.slice(0, 4).map((s, i) => (
            <article key={i} className="bt svc" data-rv>
              <span className="ic"><ServiceIcon name={s.icon} /></span>
              <h3>{s.title}</h3><p>{s.desc}</p><b>{s.price || 'Ask at clinic'}</b>
            </article>
          ))}
          <article id="doctor" className="bt doc" data-rv>
            <span className="dm">{initials(d.doctorName)}</span>
            <div><h3>{d.doctorName}</h3><p className="deg">{d.doctorTitle}</p><p>{d.doctorExperience}</p>
              <div className="chips">{d.badges.slice(0, 3).map((b, i) => <span key={i}>{b}</span>)}</div></div>
          </article>
          {stats.slice(0, 2).map((s, i) => (
            <article key={i} className={'bt stat' + (i ? ' dark' : '')} data-rv><b><CountUp value={s.v} /></b><span>{s.l}</span></article>
          ))}
          <article className="bt rev" data-rv>
            <div className="stars">{Array.from({ length: Math.round(t0?.rating || 5) }).map((_, k) => <I.Star key={k} size={16} fill="#f5b301" stroke="#f5b301" />)}</div>
            <blockquote>{t0?.comment}</blockquote><small>{t0?.name}, {t0?.role}</small>
          </article>
          <a className="bt map" href={mapUrl(d)} target="_blank" rel="noreferrer" data-rv>
            <I.MapPin size={26} /><div><b>{d.address}</b><span>{d.city} · tap for directions</span></div>
          </a>
        </div>
      </section>

      <WhyUs d={d} />
      <CostEstimator d={d} />
      <Steps d={d} />

      <section className="b2-sec">
        <h2 className="b2-h" data-rv>What patients say</h2>
        <div className="b2-rv">{d.testimonials.slice(0, 3).map((t, i) => (
          <figure key={i} data-rv><div className="stars">{Array.from({ length: Math.round(t.rating) }).map((_, k) => <I.Star key={k} size={15} fill="#f5b301" stroke="#f5b301" />)}</div>
            <blockquote>{t.comment}</blockquote><figcaption><span>{initials(t.name)}</span><div><b>{t.name}</b><small>{t.role}</small></div></figcaption></figure>
        ))}</div>
      </section>

      <div id="visit"><FindUs d={d} /></div>

      <section className="b2-sec b2-two">
        <div><h2 className="b2-h" data-rv>Book your token</h2><p className="b2-lead">Pick a treatment and a day. WhatsApp opens with your message ready to send.</p><FaqList d={d} /></div>
        <BookingCard d={d} title="Request an appointment" />
      </section>
      <FooterCols d={d} />
      <FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.b2{--ink:#0f1c2e;--card:#fff;--line:#e3e9f1;--on:#fff;--r:26px;--hf:Outfit,sans-serif;min-height:100vh;background:radial-gradient(900px 500px at 10% -10%,color-mix(in srgb,var(--a) 14%,transparent),transparent),radial-gradient(800px 500px at 100% 0,color-mix(in srgb,var(--a) 10%,transparent),transparent),#f7f9fc;color:var(--ink);font-family:Inter,system-ui,sans-serif;line-height:1.6;overflow-x:clip}
.b2 *{box-sizing:border-box}.b2 h1,.b2 h2,.b2 h3{font-family:var(--hf)}.b2 a{color:inherit}
.b2 a:focus-visible,.b2 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.b2-nav{position:sticky;top:12px;z-index:40;margin:12px auto 0;max-width:1120px;width:calc(100% - 24px);display:flex;align-items:center;gap:12px;padding:10px 12px 10px 14px;border-radius:999px;background:rgba(255,255,255,.82);backdrop-filter:blur(14px);box-shadow:0 8px 30px rgba(15,28,46,.1),0 0 0 1px rgba(15,28,46,.05)}
.b2-nav b{font-family:var(--hf);font-size:16px;margin-right:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.b2-mono{width:34px;height:34px;border-radius:50%;background:var(--a);color:#fff;display:grid;place-items:center;font-weight:700;font-size:13px;flex:none}
.b2-nav nav{display:flex;gap:22px;font-size:14px;font-weight:500;margin-right:14px}.b2-nav nav a{text-decoration:none;opacity:.75}.b2-nav nav a:hover{opacity:1}
.b2-bk{background:var(--ink);color:#fff!important;text-decoration:none;padding:10px 20px;border-radius:999px;font-weight:600;font-size:14px;white-space:nowrap}
.b2-hero{max-width:1180px;margin:0 auto;padding:56px 20px 30px;display:grid;grid-template-columns:1.05fr .95fr;gap:40px;align-items:center}
.b2-pill{display:inline-flex;gap:6px;align-items:center;padding:7px 14px;border-radius:999px;background:#fff;box-shadow:0 0 0 1px var(--line);font-size:13.5px;font-weight:500}
.b2 h1{font-size:clamp(36px,5.4vw,66px);line-height:1.04;font-weight:700;letter-spacing:-.035em;margin:20px 0 0;max-width:14ch}
.b2-hl>p{font-size:18px;max-width:46ch;margin:20px 0 0;color:#46566d}
.b2-cta{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.b2-btn{display:inline-flex;gap:8px;align-items:center;padding:16px 26px;border-radius:999px;background:var(--a);color:#fff!important;font-weight:600;text-decoration:none;box-shadow:0 14px 30px color-mix(in srgb,var(--a) 40%,transparent)}
.b2-btn.ghost{background:#fff;color:var(--ink)!important;box-shadow:0 0 0 1px var(--line)}
.b2-trust{display:flex;align-items:center;gap:12px;margin-top:30px}.b2-trust small{color:#5b6b82}
.b2-av{display:flex}.b2-av span{width:36px;height:36px;border-radius:50%;background:var(--a);color:#fff;border:3px solid #f7f9fc;display:grid;place-items:center;font-size:12px;font-weight:700;margin-left:-8px}.b2-av span:first-child{margin-left:0}.b2-av span:nth-child(2){filter:hue-rotate(40deg)}.b2-av span:nth-child(3){filter:hue-rotate(-40deg)}
.b2-col{position:relative;height:520px}
.b2-col>div{position:absolute;overflow:hidden;border-radius:30px;background:linear-gradient(150deg,color-mix(in srgb,var(--a) 30%,#fff),color-mix(in srgb,var(--a) 75%,#0f1c2e));box-shadow:0 24px 60px rgba(15,28,46,.18)}
.b2-col img,.bt img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.b2-p1{left:6%;top:0;width:58%;height:68%}.b2-p2{right:0;top:12%;width:34%;height:40%}.b2-p3{right:6%;bottom:0;width:52%;height:36%}
.b2-col .b2-glass{display:flex;gap:10px;align-items:center;left:0;bottom:12%;background:rgba(255,255,255,.88);backdrop-filter:blur(12px);padding:12px 18px;border-radius:20px;overflow:visible}
.b2-glass svg{color:var(--a)}.b2-glass b{display:block;font-size:14px}.b2-glass small{color:#5b6b82;font-size:12px}
.b2-sec{max-width:1180px;margin:0 auto;padding:84px 20px 0}
.b2-h{font-family:var(--hf);font-size:clamp(28px,3.8vw,46px);font-weight:700;letter-spacing:-.03em;line-height:1.08;margin:0 0 30px;max-width:20ch}
.b2-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:minmax(190px,auto);gap:16px}
.bt{position:relative;border-radius:var(--r);padding:24px;background:#fff;box-shadow:0 0 0 1px var(--line);overflow:hidden;display:flex;flex-direction:column}
.bt.big{grid-column:span 2;grid-row:span 2;padding:0;justify-content:flex-end;background:linear-gradient(150deg,var(--a),#0f1c2e)}
.bt .shade{position:absolute;inset:0;background:linear-gradient(transparent 35%,rgba(8,16,30,.85))}
.bt .cap{position:relative;color:#fff;padding:30px;display:grid;gap:4px}.bt .cap b{font-family:var(--hf);font-size:32px;line-height:1}.bt .cap span{opacity:.85}
.bt .cap a{justify-self:start;margin-top:14px;background:#fff;color:var(--ink);text-decoration:none;font-weight:600;padding:11px 20px;border-radius:999px;font-size:14px}
.bt.svc{transition:transform .25s,box-shadow .25s}.bt.svc:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(15,28,46,.12),0 0 0 1px var(--a)}
.bt .ic{width:46px;height:46px;border-radius:14px;background:color-mix(in srgb,var(--a) 13%,#fff);color:var(--a);display:grid;place-items:center}
.bt.svc h3{font-size:18px;margin:14px 0 4px;line-height:1.2}.bt.svc p{font-size:13.5px;color:#5b6b82;margin:0 0 12px;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.bt.svc b{color:var(--a)}
.bt.doc{grid-column:span 2;flex-direction:row;gap:20px;align-items:center;background:color-mix(in srgb,var(--a) 9%,#fff)}
.dm{width:96px;height:96px;border-radius:50%;background:var(--a);color:#fff;font-family:var(--hf);font-size:34px;font-weight:700;display:grid;place-items:center;flex:none}
.bt.doc h3{margin:0;font-size:22px}.bt.doc .deg{color:var(--a);font-weight:600;margin:2px 0}.bt.doc p{margin:2px 0;font-size:14px}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.chips span{font-size:12px;padding:4px 10px;border-radius:999px;background:#fff;box-shadow:0 0 0 1px var(--line)}
.bt.stat{justify-content:flex-end}.bt.stat b{font-family:var(--hf);font-size:clamp(34px,4vw,52px);line-height:1;color:var(--a)}.bt.stat>span{font-size:13px;color:#5b6b82;margin-top:6px}
.bt.stat.dark{background:var(--ink);color:#fff}.bt.stat.dark b{color:#fff}.bt.stat.dark>span{color:#b9c6da}
.bt.rev{grid-column:span 2;justify-content:space-between}.stars{display:flex;gap:2px}.bt.rev blockquote{margin:10px 0;font-family:var(--hf);font-size:19px;line-height:1.35}.bt.rev small{color:#5b6b82}
.bt.map{grid-column:span 2;flex-direction:row;gap:16px;align-items:center;text-decoration:none;background:var(--a);color:#fff}.bt.map b{display:block;font-family:var(--hf);font-size:19px}.bt.map span{opacity:.88;font-size:14px}
.b2-rv{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
.b2-rv figure{margin:0;background:#fff;border-radius:var(--r);padding:26px;box-shadow:0 0 0 1px var(--line)}.b2-rv blockquote{margin:12px 0 18px;font-size:15.5px}
.b2-rv figcaption{display:flex;gap:12px;align-items:center}.b2-rv figcaption span{width:40px;height:40px;border-radius:50%;background:var(--a);color:#fff;display:grid;place-items:center;font-weight:700;font-size:13px}.b2-rv small{display:block;color:#64748b;font-size:12.5px}
.b2-two{display:grid;grid-template-columns:1.1fr .9fr;gap:44px;align-items:start}.b2-lead{color:#5b6b82;margin:-14px 0 24px}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:17px 0;cursor:pointer;font-weight:600}
.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 17px;color:#5b6b82}
@media(max-width:900px){.b2-hero,.b2-two{grid-template-columns:1fr}.b2-col{height:380px}.b2-grid{grid-template-columns:1fr 1fr}.bt.big{grid-row:span 1;min-height:280px}.bt.doc,.bt.rev,.bt.map{grid-column:span 2}.b2-nav nav{display:none}.b2-sec{padding-top:60px}.b2-hero{padding-top:36px}}
@media(max-width:520px){.b2-grid{grid-template-columns:1fr}.bt.big,.bt.doc,.bt.rev,.bt.map{grid-column:span 1}.bt.doc{flex-direction:column;align-items:flex-start}}
`;
