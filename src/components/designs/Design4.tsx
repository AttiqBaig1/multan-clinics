import React from 'react';
import { D, BOOKING_CSS, BookingCard, CountUp, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, ServiceIcon, accentOf, initials, pics, statsOf, telUrl, useFonts, useReveal, waUrl } from './shared';
import { CostEstimator, FindUs, FooterCols, SECTIONS_CSS, Steps, WhyUs } from './Sections';

/** Design 4, Sehat: playful. Organic photo blob with stickers, zig-zag treatment rows, coloured stat pills, speech-bubble doctor. */
export const Design4: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Nunito:wght@600;700;800;900');
  const ref = useReveal();
  const ph = pics(d, 1200); const stats = statsOf(d);
  const rating = stats.find(s => s.l.startsWith('Patient'))?.v;
  return (
    <div className="s4" ref={ref} style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>
      <header className="s4-top">
        <span className="s4-logo">{initials(d.businessName)}</span><b>{d.businessName}</b>
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
        </div>
        <div className="s4-hr" aria-hidden>
          <span className="s4-sun" />
          <div className="s4-blob"><Img src={ph[0]} /></div>
          {rating && <span className="s4-st a"><I.Star size={18} fill="#f5b301" stroke="#f5b301" /> {rating} rated</span>}
          <span className="s4-st b"><I.CalendarCheck size={18} /> Fixed token</span>
          <span className="s4-st c"><I.Clock size={18} /> {d.timings.split('(')[0].trim()}</span>
        </div>
      </section>
      <svg className="s4-wave" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden><path d="M0 35C180 80 360 0 540 28s360 52 540 8 270-24 360-4V70H0Z" fill="color-mix(in srgb,var(--a) 12%,#fffdf8)" /></svg>

      <section className="s4-pills">{stats.map((s, i) => <div key={i} className={'k' + (i % 4)} data-rv><b><CountUp value={s.v} /></b><span>{s.l}</span></div>)}</section>

      <section className="s4-sec">
        <h2 data-rv>How we can help</h2>
        <div className="s4-zz">
          {d.services.map((s, i) => (
            <article key={i} className={'k' + (i % 4) + (i % 2 ? ' flip' : '')} data-rv>
              <div className="ph"><Img src={ph[(i + 1) % ph.length]} /><span className="ic"><ServiceIcon name={s.icon} size={26} /></span></div>
              <div className="tx"><h3>{s.title}</h3><p>{s.desc}</p>
                <div className="rw"><span className="pr">{s.price || 'Ask at clinic'}</span><a href={waUrl(d, `Mujhe ${s.title} ke baare mein poochna hai.`)} target="_blank" rel="noreferrer">Ask on WhatsApp</a></div></div>
            </article>
          ))}
        </div>
      </section>

      <section className="s4-sec s4-doc" data-rv>
        <div className="s4-mono">{initials(d.doctorName)}</div>
        <div className="s4-bubble">
          <p className="q">“Every patient gets time, a clear plan and a clear price.”</p>
          <h3>{d.doctorName}</h3><p className="deg">{d.doctorTitle}</p><p>{d.doctorExperience}</p>
        </div>
      </section>

      <WhyUs d={d} title="Why families trust us" />
      <CostEstimator d={d} />
      <Steps d={d} />

      <section className="s4-sec">
        <h2 data-rv>Happy patients</h2>
        <div className="s4-rv">{d.testimonials.slice(0, 3).map((t, i) => (
          <figure key={i} className={'k' + (i % 4)} data-rv>
            <div className="st">{Array.from({ length: Math.round(t.rating) }).map((_, k) => <I.Star key={k} size={16} fill="#f5b301" stroke="#f5b301" />)}</div>
            <blockquote>{t.comment}</blockquote><figcaption><b>{t.name}</b> · {t.role}</figcaption>
          </figure>
        ))}</div>
      </section>

      <FindUs d={d} />

      <section className="s4-sec s4-two">
        <div><h2 data-rv>Good to know</h2><FaqList d={d} /></div>
        <BookingCard d={d} title="Book a token" button="Send on WhatsApp" />
      </section>
      <FooterCols d={d} />
      <FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.s4{--ink:#1c2340;--card:#fff;--line:#e6e9f2;--on:#fff;--r:28px;--sun:#ffc93c;--fbg:#1c2340;--hf:Nunito,sans-serif;min-height:100vh;background:#fffdf8;color:var(--ink);font-family:Nunito,system-ui,sans-serif;line-height:1.6;font-weight:600;overflow-x:clip}
.s4 *{box-sizing:border-box}.s4 h1,.s4 h2,.s4 h3{font-family:inherit}.s4 a{color:inherit}
.s4 a:focus-visible,.s4 button:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.s4 .k0{--c:var(--a)}.s4 .k1{--c:#ff8a5b}.s4 .k2{--c:#8b6cf0}.s4 .k3{--c:#22b573}
.s4-top{display:flex;align-items:center;gap:12px;max-width:1180px;margin:0 auto;padding:16px 20px}.s4-top b{margin-right:auto;font-size:19px;font-weight:900}
.s4-logo{width:42px;height:42px;border-radius:14px;background:var(--a);color:#fff;font-weight:900;display:grid;place-items:center;transform:rotate(-6deg)}
.s4-ph{display:inline-flex;gap:6px;align-items:center;text-decoration:none;font-weight:800;font-size:14px}
.s4-pill{display:inline-flex;gap:6px;align-items:center;background:#25d366;color:#fff!important;text-decoration:none;font-weight:800;padding:10px 18px;border-radius:999px;font-size:14px}
.s4-hero{max-width:1180px;margin:0 auto;padding:30px 20px 50px;display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center}
.s4-tag{display:inline-block;background:var(--sun);color:#3a2a00;font-weight:900;font-size:14px;padding:6px 16px;border-radius:999px;transform:rotate(-2deg)}
.s4 h1{font-size:clamp(36px,5.2vw,64px);line-height:1.04;font-weight:900;letter-spacing:-.025em;margin:18px 0 0;max-width:14ch}
.s4-hl>p{font-size:18px;max-width:42ch;margin:18px 0 0}
.s4-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
.s4-btn{display:inline-flex;align-items:center;gap:8px;padding:16px 28px;border-radius:18px;background:var(--a);color:#fff!important;font-weight:900;text-decoration:none;box-shadow:0 8px 0 color-mix(in srgb,var(--a) 60%,#000);transition:transform .1s,box-shadow .1s}
.s4-btn:active{transform:translateY(4px);box-shadow:0 4px 0 color-mix(in srgb,var(--a) 60%,#000)}.s4-btn.alt{background:#fff;color:var(--ink)!important;box-shadow:0 8px 0 var(--line);border:2px solid var(--line)}
.s4-hr{position:relative;height:480px}
.s4-sun{position:absolute;right:2%;top:0;width:230px;height:230px;border-radius:50%;background:var(--sun)}
.s4-blob{position:absolute;left:6%;top:30px;width:88%;height:92%;border-radius:63% 37% 54% 46% / 55% 48% 52% 45%;overflow:hidden;background:linear-gradient(150deg,var(--a),color-mix(in srgb,var(--a) 50%,#1c2340));box-shadow:0 26px 60px rgba(28,35,64,.22);animation:s4b 9s ease-in-out infinite}
.s4-blob img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
@keyframes s4b{50%{border-radius:42% 58% 40% 60% / 50% 56% 44% 50%}}
.s4-st{position:absolute;display:inline-flex;gap:8px;align-items:center;background:#fff;font-weight:900;font-size:14px;padding:11px 18px;border-radius:999px;box-shadow:0 10px 26px rgba(28,35,64,.18)}.s4-st svg{color:var(--a)}
.s4-st.a{top:8%;left:0;transform:rotate(-6deg)}.s4-st.b{bottom:20%;left:-2%;transform:rotate(4deg)}.s4-st.c{bottom:4%;right:4%;transform:rotate(-3deg)}
.s4-wave{display:block;width:100%;height:60px;margin-top:-60px;position:relative}
.s4-pills{background:color-mix(in srgb,var(--a) 12%,#fffdf8);padding:0 max(20px,calc((100vw - 1140px)/2)) 56px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.s4-pills div{background:#fff;border-radius:26px;padding:22px 18px;text-align:center;box-shadow:0 8px 0 color-mix(in srgb,var(--c) 22%,#fff)}
.s4-pills b{display:block;font-size:clamp(28px,3.4vw,40px);font-weight:900;color:var(--c);line-height:1.1}.s4-pills div>span{font-size:13px}
.s4-sec{max-width:1180px;margin:0 auto;padding:84px 20px 0}
.s4 h2{font-size:clamp(30px,4vw,48px);font-weight:900;letter-spacing:-.02em;margin:0 0 30px;line-height:1.05}
.s4-zz{display:grid;gap:26px}
.s4-zz article{display:grid;grid-template-columns:.9fr 1.1fr;gap:34px;align-items:center;background:color-mix(in srgb,var(--c) 9%,#fff);border-radius:40px;padding:22px}
.s4-zz article.flip{grid-template-columns:1.1fr .9fr}.s4-zz article.flip .ph{order:2}
.s4-zz .ph{position:relative;aspect-ratio:4/3;border-radius:30px;overflow:hidden;background:linear-gradient(140deg,var(--c),color-mix(in srgb,var(--c) 40%,#1c2340))}
.s4-zz .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.s4-zz .ic{position:absolute;left:16px;bottom:16px;width:56px;height:56px;border-radius:18px;background:var(--c);color:#fff;display:grid;place-items:center;box-shadow:0 8px 20px rgba(0,0,0,.25)}
.s4-zz h3{font-size:clamp(22px,2.6vw,32px);font-weight:900;margin:0;line-height:1.1}.s4-zz p{margin:10px 0 18px;font-size:16px;color:#46506f;max-width:48ch}
.s4-zz .rw{display:flex;align-items:center;gap:14px;flex-wrap:wrap}.s4-zz .pr{background:var(--c);color:#fff;font-weight:900;padding:8px 18px;border-radius:999px}
.s4-zz .rw a{font-weight:800;color:var(--c);filter:brightness(.8)}
.s4-doc{display:grid;grid-template-columns:auto 1fr;gap:30px;align-items:center}
.s4-mono{width:190px;height:190px;border-radius:50%;background:var(--a);color:#fff;font-size:68px;font-weight:900;display:grid;place-items:center;box-shadow:0 0 0 12px color-mix(in srgb,var(--a) 20%,#fff),0 0 0 26px color-mix(in srgb,var(--a) 9%,#fff)}
.s4-bubble{position:relative;background:var(--sun);border-radius:36px;padding:32px 36px;color:#2b2000}
.s4-bubble:before{content:"";position:absolute;left:-18px;top:60px;border:18px solid transparent;border-right-color:var(--sun);border-left:0}
.s4-bubble .q{font-size:clamp(19px,2.2vw,26px);font-weight:900;line-height:1.25;margin:0 0 14px}.s4-bubble h3{margin:0;font-size:22px;font-weight:900}.s4-bubble p{margin:2px 0}.s4-bubble .deg{font-weight:800}
.s4-rv{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}
.s4-rv figure{margin:0;padding:26px;border-radius:30px;background:color-mix(in srgb,var(--c) 12%,#fff)}.s4-rv figure:nth-child(2){transform:translateY(16px)}
.s4-rv .st{display:flex;gap:2px}.s4-rv blockquote{margin:10px 0 14px;font-size:16px}.s4-rv figcaption{font-size:13.5px;color:#46506f}
.s4-two{display:grid;grid-template-columns:1.1fr .9fr;gap:44px;align-items:start}
.faq-i{border-bottom:2px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:17px 0;cursor:pointer;font-weight:800}
.faq-q:focus-visible{outline:3px solid var(--ink)}.faq-a{margin:0 0 16px;color:#46506f}
@media(max-width:860px){.s4-hero,.s4-two,.s4-doc,.s4-zz article,.s4-zz article.flip{grid-template-columns:1fr}.s4-zz article.flip .ph{order:0}.s4-hr{height:340px}.s4-pills{grid-template-columns:1fr 1fr}.s4-sec{padding-top:60px}.s4-ph{display:none}.s4-top b{font-size:16px}.s4-mono{width:140px;height:140px;font-size:50px;margin:0 auto}.s4-bubble:before{display:none}.s4-rv figure:nth-child(2){transform:none}}
@media(prefers-reduced-motion:reduce){.s4-blob{animation:none}}
`;
