import React from 'react';
import { WhyUs, CostEstimator, Steps, FindUs, CallBand, FooterCols, SECTIONS_CSS } from './Sections';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, Img, ServiceIcon, accentOf, galleryOf, initials, mapUrl, statsOf, telUrl, useFonts, waUrl } from './shared';

/** Design 2, Fresh: bright gradient hero with the doctor's portrait and floating info chips, overlapping stat cards, icon service cards. */
export const Design2: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Poppins:wght@400;500;600;700;800');
  const stats = statsOf(d); const gal = galleryOf(d);
  return (
    <div className="f2" style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}</style>
      <div className="f2-bar"><span><I.Clock size={14} /> {d.timings}</span><a href={telUrl(d)}><I.Phone size={14} /> {d.phone}</a></div>
      <header className="f2-nav">
        <b>{d.businessName}</b>
        <a className="f2-book" href={waUrl(d)} target="_blank" rel="noreferrer">Book appointment</a>
      </header>

      <section className="f2-hero">
        <div className="f2-hero-in">
          <div className="f2-txt">
            <span className="f2-pill"><I.BadgeCheck size={16} /> {d.nicheTitle}</span>
            <h1>{d.tagline}</h1>
            <p>Consult {d.doctorName} at {d.address}, {d.city}. Reserve your token on WhatsApp and skip the waiting room.</p>
            <div className="f2-cta">
              <a className="f2-btn" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> WhatsApp appointment</a>
              <a className="f2-btn ghost" href={telUrl(d)}><I.Phone size={18} /> Call now</a>
            </div>
          </div>
          <div className="f2-photo">
            <div className="f2-ring"><Img src={d.doctorImage} /><span>{initials(d.doctorName)}</span></div>
            <div className="f2-chip c1"><I.Star size={16} fill="#f5b301" stroke="#f5b301" /> <b>{stats.find(s => s.l.startsWith('Patient'))?.v || '5.0'}</b> rated</div>
            <div className="f2-chip c2"><I.ShieldCheck size={16} /> {d.badges[0]}</div>
            <div className="f2-chip c3"><b>{d.doctorName}</b><small>{d.doctorTitle.split(',')[0]}</small></div>
          </div>
        </div>
        <svg className="f2-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden><path d="M0 40C240 90 480 0 720 30s480 60 720 10V80H0Z" fill="#f6f9fc" /></svg>
      </section>

      <section className="f2-stats">
        {stats.map((s, i) => <div key={i}><b>{s.v}</b><span>{s.l}</span></div>)}
      </section>

      <WhyUs d={d} />

      <section className="f2-sec">
        <h2>Our treatments</h2><p className="f2-lead">Clear prices, modern equipment, one specialist.</p>
        <div className="f2-svc">
          {d.services.map((s, i) => (
            <article key={i}>
              <div className="f2-ic"><ServiceIcon name={s.icon} /></div>
              <h3>{s.title}</h3><p>{s.desc}</p>
              <div className="f2-foot"><b>{s.price || 'Ask at clinic'}</b><a href={waUrl(d, `Mujhe ${s.title} ke baare mein poochna hai.`)} target="_blank" rel="noreferrer">Ask us</a></div>
            </article>
          ))}
        </div>
      </section>

      <CostEstimator d={d} />

      {gal.length > 1 && (
        <section className="f2-sec">
          <h2>Inside the clinic</h2>
          <div className="f2-gal">{gal.map((g, i) => <figure key={i} className={i === 0 ? 'big' : ''}><div className="f2-gi"><Img src={g.src} /></div><figcaption>{g.label}</figcaption></figure>)}</div>
        </section>
      )}

      <section className="f2-sec f2-doc">
        <div className="f2-dph"><Img src={d.doctorImage} /><span>{initials(d.doctorName)}</span></div>
        <div>
          <h2>Meet {d.doctorName}</h2>
          <p className="f2-deg">{d.doctorTitle}</p>
          <p>{d.doctorExperience}</p>
          <ul>{d.badges.map((b, i) => <li key={i}><I.BadgeCheck size={18} /> {b}</li>)}</ul>
        </div>
      </section>

      <Steps d={d} />

      <section className="f2-sec">
        <h2>What patients say</h2>
        <div className="f2-rev">
          {d.testimonials.slice(0, 3).map((t, i) => (
            <figure key={i}>
              <div className="f2-st">{Array.from({ length: Math.round(t.rating) }).map((_, k) => <I.Star key={k} size={16} fill="#f5b301" stroke="#f5b301" />)}</div>
              <blockquote>{t.comment}</blockquote>
              <figcaption><span>{initials(t.name)}</span><div><b>{t.name}</b><small>{t.role}</small></div></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <FindUs d={d} />

      <section className="f2-cta2">
        <div className="f2-cta2-in">
          <div><h2>Book your token today</h2><p><I.MapPin size={16} /> {d.address}, {d.city}</p><p><I.Clock size={16} /> {d.timings}</p>
            <a className="f2-btn light" href={mapUrl(d)} target="_blank" rel="noreferrer">Get directions</a></div>
          <BookingCard d={d} title="Request an appointment" />
        </div>
      </section>

      <section className="f2-sec f2-faqw"><h2>Common questions</h2><FaqList d={d} /></section>
      <CallBand d={d} />
      <FooterCols d={d} />
      <FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.f2{--ink:#14233b;--card:#fff;--line:#e2e9f2;--on:#fff;--r:20px;min-height:100vh;background:#f6f9fc;color:var(--ink);font-family:Poppins,system-ui,sans-serif;line-height:1.6}
.f2 *{box-sizing:border-box}.f2 h1,.f2 h2,.f2 h3{font-family:inherit}.f2 a{color:inherit}
.f2 a:focus-visible,.f2 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.f2-bar{background:#0f1d33;color:#dbe6f5;font-size:13px;display:flex;justify-content:space-between;gap:12px;padding:8px max(20px,calc((100vw - 1180px)/2));flex-wrap:wrap}
.f2-bar span,.f2-bar a{display:inline-flex;align-items:center;gap:6px;text-decoration:none}
.f2-nav{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.94);backdrop-filter:blur(10px);display:flex;justify-content:space-between;align-items:center;padding:12px max(20px,calc((100vw - 1180px)/2));box-shadow:0 2px 14px rgba(20,35,59,.07)}
.f2-nav b{font-size:18px;color:var(--a)}
.f2-book{background:var(--a);color:#fff!important;text-decoration:none;padding:10px 20px;border-radius:999px;font-weight:600;font-size:14px}
.f2-hero{position:relative;background:linear-gradient(135deg,color-mix(in srgb,var(--a) 70%,#0a1a33),var(--a) 55%,color-mix(in srgb,var(--a) 70%,#fff));color:#fff;overflow:hidden}
.f2-hero:before{content:"";position:absolute;width:520px;height:520px;border-radius:50%;background:rgba(255,255,255,.1);right:-120px;top:-160px}
.f2-hero-in{position:relative;max-width:1180px;margin:0 auto;padding:64px 20px 130px;display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center}
.f2-pill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.18);padding:7px 16px;border-radius:999px;font-size:13.5px;font-weight:500}
.f2 h1{font-size:clamp(32px,4.8vw,56px);line-height:1.12;font-weight:800;margin:20px 0 0;letter-spacing:-.02em;max-width:16ch}
.f2-txt p{font-size:17px;max-width:46ch;margin:18px 0 0;opacity:.95}
.f2-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}
.f2-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:var(--a)!important;font-weight:700;text-decoration:none;padding:15px 26px;border-radius:999px;box-shadow:0 10px 26px rgba(0,0,0,.18)}
.f2-btn.ghost{background:transparent;color:#fff!important;border:2px solid rgba(255,255,255,.7);box-shadow:none}
.f2-btn.light{margin-top:18px}
.f2-photo{position:relative;display:grid;place-items:center;min-height:380px}
.f2-ring{position:relative;width:min(100%,380px);aspect-ratio:1;border-radius:50%;border:10px solid rgba(255,255,255,.35);overflow:hidden;background:rgba(255,255,255,.2);display:grid;place-items:center;font-size:80px;font-weight:800;box-shadow:0 30px 70px rgba(0,0,0,.3)}
.f2-ring img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.f2-chip{position:absolute;background:#fff;color:var(--ink);border-radius:16px;padding:10px 16px;font-size:13.5px;box-shadow:0 14px 34px rgba(0,0,0,.2);display:flex;align-items:center;gap:7px}
.f2-chip small{display:block;color:#64748b;font-size:12px}.f2-chip.c3{flex-direction:column;align-items:flex-start;gap:0}
.c1{top:8%;left:0}.c2{bottom:14%;left:-4%;max-width:230px}.c3{bottom:2%;right:0}
.f2-wave{position:absolute;left:0;bottom:-1px;width:100%;height:70px}
.f2-stats{position:relative;z-index:2;max-width:1060px;margin:-62px auto 0;padding:0 20px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.f2-stats div{background:#fff;border-radius:20px;padding:20px 16px;text-align:center;box-shadow:0 16px 40px rgba(20,35,59,.1)}
.f2-stats b{display:block;font-size:26px;color:var(--a);font-weight:800;line-height:1.2}.f2-stats span{font-size:12.5px;color:#5b6b82}
.f2-sec{max-width:1180px;margin:0 auto;padding:76px 20px 0}
.f2-sec h2{font-size:clamp(26px,3.2vw,38px);font-weight:700;letter-spacing:-.015em;margin:0}
.f2-lead{color:#5b6b82;margin:8px 0 0}
.f2-svc{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin-top:32px}
.f2-svc article{background:#fff;border-radius:22px;padding:28px;box-shadow:0 10px 30px rgba(20,35,59,.07);display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
.f2-svc article:hover{transform:translateY(-4px);box-shadow:0 20px 44px rgba(20,35,59,.13)}
.f2-ic{width:54px;height:54px;border-radius:16px;background:color-mix(in srgb,var(--a) 13%,#fff);color:var(--a);display:grid;place-items:center}
.f2-svc h3{font-size:18px;margin:18px 0 6px}.f2-svc p{margin:0 0 18px;color:#5b6b82;font-size:14.5px;flex:1}
.f2-foot{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid var(--line);padding-top:14px}
.f2-foot b{color:var(--a);white-space:nowrap}.f2-foot a{font-size:13px;font-weight:600;color:#128c7e;white-space:nowrap;text-decoration:none;border:1px solid #bfe6dc;border-radius:999px;padding:5px 14px}
.f2-gal{display:grid;grid-template-columns:2fr 1fr 1fr;grid-auto-rows:190px;gap:16px;margin-top:28px}
.f2-gal figure{margin:0;position:relative;border-radius:22px;overflow:hidden;background:linear-gradient(140deg,color-mix(in srgb,var(--a) 30%,#fff),color-mix(in srgb,var(--a) 70%,#14233b))}
.f2-gal .big{grid-row:span 2}.f2-gi,.f2-gi img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.f2-gal figcaption{position:absolute;left:0;right:0;bottom:0;padding:30px 16px 12px;color:#fff;font-size:13px;font-weight:600;background:linear-gradient(transparent,rgba(10,20,40,.75))}
.f2-doc{display:grid;grid-template-columns:.8fr 1.2fr;gap:48px;align-items:center}
.f2-dph{position:relative;aspect-ratio:1;border-radius:32px;overflow:hidden;background:linear-gradient(140deg,var(--a),color-mix(in srgb,var(--a) 50%,#14233b));display:grid;place-items:center;color:#fff;font-size:90px;font-weight:800;max-width:430px;box-shadow:0 26px 60px rgba(20,35,59,.2)}
.f2-dph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.f2-deg{color:var(--a);font-weight:600;margin:6px 0}.f2-doc ul{list-style:none;padding:0;margin:18px 0 0;display:grid;gap:10px}
.f2-doc li{display:flex;gap:10px;align-items:center;background:#fff;padding:12px 16px;border-radius:14px;box-shadow:0 6px 18px rgba(20,35,59,.06);font-size:14.5px}.f2-doc li svg{color:var(--a);flex:none}
.f2-rev{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-top:28px}
.f2-rev figure{margin:0;background:#fff;border-radius:22px;padding:26px;box-shadow:0 10px 30px rgba(20,35,59,.07)}
.f2-st{display:flex;gap:2px}.f2-rev blockquote{margin:12px 0 18px;font-size:15px}
.f2-rev figcaption{display:flex;gap:12px;align-items:center}.f2-rev figcaption span{width:42px;height:42px;border-radius:50%;background:var(--a);color:#fff;display:grid;place-items:center;font-weight:700;font-size:14px}
.f2-rev small{display:block;color:#64748b;font-size:12.5px}
.f2-cta2{margin-top:80px;background:linear-gradient(135deg,color-mix(in srgb,var(--a) 75%,#0a1a33),var(--a));color:#fff;padding:70px 20px}
.f2-cta2-in{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.f2-cta2 h2{font-size:clamp(26px,3.4vw,40px);margin:0 0 14px;font-weight:700}.f2-cta2 p{display:flex;gap:8px;align-items:center;margin:6px 0;opacity:.95}
.f2-faqw{max-width:820px}.f2 .faq{margin-top:20px}.faq-i{border-bottom:1px solid var(--line)}
.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:18px 0;cursor:pointer;font-weight:600}
.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 18px;color:#5b6b82}
.f2-end{text-align:center;padding:48px 20px 90px;font-size:13px;color:#64748b}
@media(max-width:860px){.f2-hero-in,.f2-doc,.f2-cta2-in{grid-template-columns:1fr}.f2-hero-in{padding:40px 20px 110px;gap:28px}.f2-photo{min-height:300px}.f2-ring{width:260px}.c2{left:0}.f2-stats{grid-template-columns:1fr 1fr}.f2-gal{grid-template-columns:1fr 1fr;grid-auto-rows:150px}.f2-gal .big{grid-column:span 2;grid-row:span 1}.f2-sec{padding-top:56px}.f2-nav b{font-size:15px}}
`;
