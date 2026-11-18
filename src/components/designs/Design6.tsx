import React, { useRef } from 'react';
import { D, BOOKING_CSS, BookingCard, FaqList, FloatingWA, FWA_CSS, I, Img, RV_CSS, ServiceIcon, accentOf, initials, pics, statsOf, telUrl, useFonts, useReveal, waUrl, mapUrl } from './shared';
import { CostEstimator, FooterCols, SECTIONS_CSS } from './Sections';

/** Design 6, Dental: photo hero inside a rounded frame, doctor card, service pills, photo service cards, about block, stats and a booking banner. */
export const Design6: React.FC<{ d: D }> = ({ d }) => {
  useFonts('family=Manrope:wght@400;500;600;700;800');
  const ref = useReveal();
  const rail = useRef<HTMLDivElement>(null);
  const stats = statsOf(d);
  const ph = pics(d, 1400);
  const ph2 = pics(d, 900);
  const at = (i: number) => ph2[i % Math.max(ph2.length, 1)];
  const niche = d.nicheTitle.split(/[&,]/)[0].trim().replace(/\s+(clinic|center|centre|hospital)$/i, '') || d.nicheTitle;
  const rating = stats.find(s => /rating/i.test(s.l));
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(d.businessName + ', ' + d.address + ', ' + d.city)}&output=embed`;
  const scroll = (n: number) => rail.current?.scrollBy({ left: n * 300, behavior: 'smooth' });
  const icons = [<I.ShieldCheck size={22} />, <I.Heart size={22} />, <I.Award size={22} />, <I.Star size={22} />];
  return (
    <div className="t6" ref={ref} id="top" style={{ ['--a' as string]: accentOf(d) }}>
      <style>{CSS}{BOOKING_CSS}{FWA_CSS}{SECTIONS_CSS}{RV_CSS}</style>

      <section className="frame">
        <div className="bg"><Img src={ph[1] || ph[0]} /></div>
        <div className="shade" />
        <header className="hd6">
          <a className="lg" href="#top"><i><ServiceIcon name={d.services[0]?.icon || 'Stethoscope'} size={20} /></i><b>{d.businessName}</b></a>
          <nav aria-label="Main"><a href="#tr">Treatments</a><a href="#ab">About</a><a href="#rv">Reviews</a><a href="#vs">Contact</a></nav>
          <a className="hbk" href={waUrl(d)} target="_blank" rel="noreferrer">Book now <I.ArrowRight size={16} /></a>
        </header>
        <p className="tr6">Trusted {d.nicheTitle.toLowerCase()} in {d.city}, with modern technology and clear prices.</p>
        <div className="cont">
          <div className="ht">
            <h1>Modern {niche} with care for you</h1>
            <p>{d.doctorName}, {d.doctorTitle}. {d.doctorExperience.replace(/[.\s]+$/, '')}.</p>
            <div className="pills">{d.services.slice(0, 6).map((s, i) => <a key={i} className={i === 0 ? 'on' : ''} href="#tr">{s.title.length > 30 ? s.title.slice(0, 28) + '…' : s.title}</a>)}</div>
          </div>
          <aside className="dcard">
            <span className="av">{initials(d.doctorName)}</span>
            <div><b>{d.doctorName}</b><em>{d.doctorTitle.split(',')[0]}</em>
              <small>{rating ? <><span>{'★★★★★'}</span> {rating.v} · {rating.l.replace(/^Patient rating\s*/i, '').replace(/[()]/g, '')}</> : d.nicheTitle}</small></div>
          </aside>
        </div>
      </section>

      <section className="sec" id="tr">
        <div className="two6" data-rv>
          <div><small>Our treatments</small><h2>Discover our {niche} services</h2></div>
          <p>{d.nicheTitle} in {d.city} with clear prices. The final fee is confirmed by the doctor after examination. {d.consultationFee}.</p>
        </div>
        <div className="railrow">
          <div className="side" data-rv>
            <div className="rv-chip"><span className="avs">{[0, 1, 2].map(i => <i key={i}>{initials(d.testimonials[i]?.name || d.doctorName)}</i>)}</span><div><b>{d.testimonials.length}+</b><em>patient reviews</em></div></div>
            <p>We make every visit comfortable and explain each step before we start.</p>
            <div className="arrows"><button type="button" aria-label="Previous" onClick={() => scroll(-1)}><I.ChevronLeft size={18} /></button><button type="button" aria-label="Next" onClick={() => scroll(1)}><I.ChevronRight size={18} /></button></div>
          </div>
          <div className="rail" ref={rail}>
            {d.services.map((s, i) => (
              <a key={i} href={waUrl(d)} target="_blank" rel="noreferrer" className="sc">
                <Img src={at(i + 2)} /><span className="ov" />
                <div className="tx"><i><ServiceIcon name={s.icon} size={18} /></i><b>{s.title}</b><em>{s.price || 'Ask at clinic'}</em></div>
                <span className="go"><I.ArrowRight size={18} /></span>
              </a>))}
          </div>
        </div>
      </section>

      <section className="sec about" id="ab">
        <div className="ph" data-rv><Img src={at(3)} /><span>{d.city}</span></div>
        <div data-rv>
          <small>About the clinic</small>
          <h2>High standards of care and a personal approach</h2>
          <p>{d.doctorName} leads {d.businessName} in {d.city}. {d.doctorExperience}</p>
          <a className="ol" href="#vs">Details <I.ArrowRight size={16} /></a>
          <div className="mini">
            <div><span className="av">{initials(d.doctorName)}</span><div><b>{d.doctorName}</b><em>{d.doctorTitle.split(',')[0]}</em><small>{'★★★★★'} {rating?.v || '5.0'}</small></div></div>
            <div><span className="av alt"><I.Clock size={18} /></span><div><b>Timings</b><em>{d.timings.split('(')[0].trim()}</em></div></div>
          </div>
        </div>
      </section>

      <section className="sec"><div className="stat6" data-rv>
        {stats.map((s, i) => <div key={i}><i>{icons[i % 4]}</i><p><b>{s.v}</b><span>{s.l}</span></p></div>)}
      </div></section>

      <section className="sec" id="rv">
        <div className="two6" data-rv><div><small>Patient feedback</small><h2>Trusted in {d.city}</h2></div><p>What patients say about {d.doctorName} and the team.</p></div>
        <div className="revs6">{d.testimonials.slice(0, 3).map((t, i) => (
          <figure key={i} data-rv><span className="st">{'★★★★★'.slice(0, Math.max(1, Math.round(t.rating)))}</span><blockquote>{t.comment}</blockquote><figcaption><b>{t.name}</b>{t.role}</figcaption></figure>))}</div>
      </section>

      <CostEstimator d={d} />

      <section className="sec cta" data-rv>
        <div className="bn">
          <div><small>Ready for a healthier visit?</small><h2>Book your appointment today</h2><p>Message us on WhatsApp, get a fixed token and skip the waiting room.</p>
            <a className="b p" href={waUrl(d)} target="_blank" rel="noreferrer">Book on WhatsApp <I.ArrowRight size={16} /></a></div>
          <div className="im"><Img src={at(0)} /></div>
        </div>
      </section>

      <section className="sec two">
        <div><div className="hd l" data-rv><small>Questions</small><h2>Before you visit</h2></div><FaqList d={d} /></div>
        <BookingCard d={d} title="Book your visit" />
      </section>

      <section className="sec visit" id="vs">
        <div><div className="hd l" data-rv><small>{d.city} clinic</small><h2>Visit us</h2></div>
          <div className="inf"><I.MapPin size={20} /><div><b>Address</b><span>{d.address}, {d.city}</span></div></div>
          <div className="inf"><I.Clock size={20} /><div><b>Timings</b><span>{d.timings}</span></div></div>
          <div className="inf"><I.Phone size={20} /><div><b>Phone and WhatsApp</b><a href={telUrl(d)}>{d.phone}</a></div></div>
          <a className="ol" href={mapUrl(d)} target="_blank" rel="noreferrer"><I.MapPin size={16} /> Directions</a></div>
        <iframe title="Clinic map" src={embed} loading="lazy" />
      </section>
      <FooterCols d={d} /><FloatingWA d={d} />
    </div>
  );
};

const CSS = `
.t6{--ink:#0f1f2e;--card:#fff;--line:#e3eaf0;--on:#fff;--r:22px;--hf:Manrope,sans-serif;--hw:800;--hw3:700;--hls:-.02em;--btn:var(--a);--btn-fg:#fff;--wi-bg:color-mix(in srgb,var(--a) 12%,#fff);--wi-fg:var(--a);--ico:var(--a);--est-bg:#0f2a35;--est-fg:#fff;--band-bg:var(--a);--band-fg:#fff;--fbg:#0c1c26;--fink:#dbe7ee;min-height:100vh;background:#fff;color:var(--ink);font-family:Manrope,system-ui,sans-serif;font-size:16px;line-height:1.6;overflow-x:clip}
.t6 *{box-sizing:border-box}.t6 h1,.t6 h2,.t6 h3{font-family:Manrope,sans-serif}.t6 a{color:inherit;text-decoration:none}
.t6 a:focus-visible,.t6 button:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.t6 .sec h2{color:var(--ink)}
.t6 small{font-size:13px;font-weight:700;color:var(--a)}
.frame{position:relative;max-width:1240px;margin:14px auto 0;border-radius:30px;overflow:hidden;min-height:620px;background:linear-gradient(135deg,#0f3b46,#0b2430);color:#fff;display:flex;flex-direction:column;width:calc(100% - 28px)}
.bg{position:absolute;inset:0}.bg img{width:100%;height:100%;object-fit:cover;object-position:60% 22%}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(9,36,46,.92) 0%,rgba(9,36,46,.7) 34%,rgba(9,36,46,.12) 66%,rgba(9,36,46,0) 100%),linear-gradient(0deg,rgba(9,36,46,.55),transparent 45%)}
.hd6{position:relative;z-index:2;display:flex;align-items:center;gap:28px;padding:22px 30px}
.lg{display:flex;align-items:center;gap:10px;margin-right:auto;font-weight:800;font-size:17px;letter-spacing:-.01em}.lg i{width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);display:grid;place-items:center;font-style:normal}
.hd6 nav{display:flex;gap:28px;font-size:14.5px;font-weight:500;color:rgba(255,255,255,.88)}.hd6 nav a:hover{color:#fff}
.hbk{white-space:nowrap;display:inline-flex;align-items:center;gap:8px;background:#fff;color:#0f1f2e!important;font-weight:700;font-size:14.5px;padding:11px 22px;border-radius:999px;transition:transform .2s}.hbk:hover{transform:translateY(-2px)}
.cont{position:relative;z-index:2;flex:1;display:flex;align-items:flex-end;justify-content:space-between;gap:30px;padding:40px 36px 36px}
.ht{max-width:560px}.t6 .ht h1{font-size:clamp(32px,4.2vw,52px);line-height:1.06;font-weight:800;letter-spacing:-.03em;margin:0}.ht h1 span{display:block;margin-top:6px;color:color-mix(in srgb,var(--a) 40%,#fff)}
.ht p{margin:18px 0 0;color:rgba(255,255,255,.86);max-width:30em}
.pills{display:flex;flex-wrap:wrap;gap:10px;margin-top:26px;max-width:520px}.pills a{padding:10px 20px;border-radius:999px;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);backdrop-filter:blur(6px);font-size:14px;font-weight:600}.pills a.on,.pills a:hover{background:#fff;color:#0f1f2e}
.dcard{display:flex;gap:16px;align-items:center;background:#fff;color:var(--ink);border-radius:22px;padding:16px 22px 16px 16px;box-shadow:0 24px 50px rgba(0,0,0,.28);min-width:290px}
.av{width:62px;height:62px;border-radius:16px;background:linear-gradient(135deg,var(--a),color-mix(in srgb,var(--a) 50%,#0b2430));color:#fff;display:grid;place-items:center;font-weight:800;font-size:22px;flex:none}.av.alt{width:44px;height:44px;border-radius:50%;background:color-mix(in srgb,var(--a) 14%,#fff);color:var(--a)}
.dcard b{display:block;font-size:16px;line-height:1.25}.dcard em{display:block;font-style:normal;color:#64748b;font-size:13.5px}.dcard small{display:block;margin-top:6px;color:var(--ink);font-weight:700}.dcard small span{color:#f59e0b;letter-spacing:1px}
.sec{max-width:1240px;margin:0 auto;padding:84px 20px 0}
.two6{display:grid;grid-template-columns:1.1fr 1fr;gap:50px;align-items:end;margin-bottom:34px}.two6 h2,.about h2,.bn h2{font-size:clamp(28px,3.6vw,44px);line-height:1.1;font-weight:800;letter-spacing:-.03em;margin:8px 0 0}.two6 p{margin:0;color:#52667a}
.railrow{display:grid;grid-template-columns:240px 1fr;gap:26px;align-items:stretch}
.side{display:flex;flex-direction:column;justify-content:space-between;gap:18px;padding:6px 0}.rv-chip{display:flex;gap:12px;align-items:center}.rv-chip b{display:block;font-size:26px;font-weight:800;line-height:1}.rv-chip em{font-style:normal;font-size:13px;color:#64748b}
.avs{display:flex}.avs i{width:36px;height:36px;border-radius:50%;background:color-mix(in srgb,var(--a) 20%,#fff);color:var(--a);border:2px solid #fff;display:grid;place-items:center;font-style:normal;font-size:12px;font-weight:800;margin-left:-8px}.avs i:first-child{margin-left:0}
.side p{margin:0;color:#52667a;font-size:14.5px}.arrows{display:flex;gap:10px}.arrows button{width:42px;height:42px;border-radius:50%;border:1px solid var(--line);background:#fff;display:grid;place-items:center;cursor:pointer;color:var(--ink)}.arrows button:hover{background:var(--ink);color:#fff}
.rail{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:4px}.rail::-webkit-scrollbar{display:none}
.sc{position:relative;flex:0 0 min(280px,78%);height:340px;border-radius:24px;overflow:hidden;scroll-snap-align:start;background:linear-gradient(160deg,color-mix(in srgb,var(--a) 70%,#0b2430),#0b2430);color:#fff;display:block;transition:transform .25s}.sc:hover{transform:translateY(-4px)}
.sc img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ov{position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,30,40,.95) 0%,rgba(8,30,40,.78) 30%,rgba(8,30,40,.12) 62%)}
.tx{position:absolute;left:20px;right:70px;bottom:20px;display:grid;gap:4px}.tx i{width:36px;height:36px;border-radius:12px;background:rgba(255,255,255,.2);backdrop-filter:blur(6px);display:grid;place-items:center;margin-bottom:6px}.tx b{text-shadow:0 1px 10px rgba(0,0,0,.5);font-size:17px;line-height:1.25;font-weight:700}.tx em{font-style:normal;font-size:13.5px;font-weight:700;color:color-mix(in srgb,var(--a) 35%,#fff)}
.go{position:absolute;right:18px;bottom:20px;width:42px;height:42px;border-radius:50%;background:#fff;color:var(--ink);display:grid;place-items:center}
.about{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.ph{position:relative;height:430px;border-radius:28px;overflow:hidden;background:linear-gradient(150deg,color-mix(in srgb,var(--a) 60%,#0b2430),#0b2430)}.ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ph span{position:absolute;left:18px;bottom:18px;background:#fff;color:var(--ink);font-weight:700;font-size:13px;padding:8px 16px;border-radius:999px}
.about p{margin:16px 0 24px;color:#52667a}
.ol{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:999px;border:1.5px solid #cbd5e1;font-weight:700;font-size:14.5px;background:#fff;transition:background .2s}.ol:hover{background:#f1f5f9}
.mini{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:26px}.mini>div{display:flex;gap:12px;align-items:center;padding:14px;border:1px solid var(--line);border-radius:18px;background:#fff;box-shadow:0 10px 24px rgba(15,31,46,.05)}.mini .av{width:48px;height:48px;font-size:17px;border-radius:14px}.mini b{display:block;font-size:14.5px;line-height:1.25}.mini em{font-style:normal;font-size:12.5px;color:#64748b}
.stat6{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;padding:26px;border-radius:26px;background:#f1f6f9}.stat6>div{display:flex;gap:14px;align-items:center;padding:6px 16px;border-left:1px solid #d6e0e7}.stat6>div:first-child{border:0}
.stat6 i{width:50px;height:50px;border-radius:50%;background:var(--a);color:#fff;display:grid;place-items:center;flex:none}.stat6 p{margin:0;display:grid;line-height:1.2}.stat6 b{font-size:24px;font-weight:800;letter-spacing:-.02em}.stat6 span{font-size:12.5px;color:#64748b}
.revs6{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px}.revs6 figure{margin:0;border:1px solid var(--line);border-radius:24px;padding:28px;background:#fff;box-shadow:0 14px 34px rgba(15,31,46,.06)}.revs6 .st{color:#f59e0b;letter-spacing:2px;font-size:15px}.revs6 blockquote{margin:12px 0 20px;color:#33475b;font-size:15.5px}.revs6 figcaption{display:grid;font-size:12.5px;color:#94a3b8}.revs6 figcaption b{font-size:14.5px;color:var(--ink)}
.bn{display:grid;grid-template-columns:1.1fr .9fr;border-radius:28px;overflow:hidden;background:linear-gradient(120deg,color-mix(in srgb,var(--a) 14%,#fff),#eef5f8)}.bn>div:first-child{padding:46px}.bn p{margin:12px 0 24px;color:#52667a}
.b{display:inline-flex;gap:8px;align-items:center;padding:14px 26px;border-radius:999px;font-weight:700;font-size:15px}.b.p{background:var(--a);color:#fff!important}
.im{position:relative;min-height:260px;background:linear-gradient(150deg,color-mix(in srgb,var(--a) 50%,#fff),#cfe3ea)}.im img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.two{display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:start}.hd.l{margin-bottom:24px}.hd.l h2{font-size:clamp(28px,3.4vw,42px);font-weight:800;letter-spacing:-.03em;margin:6px 0 0;line-height:1.1}
.faq-i{border-top:1px solid var(--line)}.faq-q{all:unset;box-sizing:border-box;width:100%;display:flex;justify-content:space-between;gap:16px;padding:18px 0;cursor:pointer;font-weight:700}.faq-q:focus-visible{outline:3px solid var(--a)}.faq-a{margin:0 0 18px;color:#52667a}
.visit{display:grid;grid-template-columns:1fr 1fr;gap:44px;align-items:stretch;padding-bottom:10px}.visit iframe{width:100%;min-height:400px;height:100%;border:0;border-radius:26px;box-shadow:0 20px 44px rgba(15,31,46,.12)}
.inf{display:flex;gap:14px;align-items:flex-start;background:#f6f9fb;border:1px solid var(--line);border-radius:18px;padding:16px 20px;margin-bottom:12px}.inf svg{color:var(--a);margin-top:3px;flex:none}.inf div{display:grid;font-size:14px}.inf b{font-size:12px;color:var(--a)}.inf span,.inf a{color:#475569}
.t6 .x-sec{max-width:1240px}
.t6 .ht h1{font-size:clamp(28px,3.6vw,46px);font-weight:600;text-transform:uppercase;line-height:1.12;letter-spacing:.005em}
.ht p{font-size:15px;max-width:26em}
.tr6{position:absolute;z-index:2;right:36px;top:112px;max-width:250px;margin:0;padding:12px 16px;border-radius:16px;background:rgba(9,36,46,.55);backdrop-filter:blur(8px);font-size:13.5px;line-height:1.5;color:rgba(255,255,255,.88)}
.pills{max-width:440px;gap:8px}.pills a{padding:9px 18px;font-size:13px;font-weight:500}
.t6 .two6 h2,.t6 .about h2,.t6 .bn h2,.t6 .hd.l h2{font-size:clamp(24px,2.7vw,36px);font-weight:500;text-transform:uppercase;line-height:1.18;letter-spacing:.005em}
.t6 small{color:#4b5d6c;font-weight:500}
.t6 .sec{padding-top:72px}
.mini small{display:block;color:#f59e0b;font-size:12px;letter-spacing:1px;margin-top:2px}
.bn{background:linear-gradient(110deg,#e2eff1,#f1f7f8)}.bn .b.p{background:color-mix(in srgb,var(--a) 82%,#0b2430);padding:12px 22px;font-size:14px}
.stat6 b{font-weight:700}
@media(max-width:900px){.tr6{display:none}.hd6{padding:16px 18px}.hd6 nav{display:none}.cont{flex-direction:column;align-items:stretch;padding:28px 20px 22px}.dcard{min-width:0}.frame{min-height:640px}.shade{background:linear-gradient(0deg,rgba(9,36,46,.92) 20%,rgba(9,36,46,.45) 100%)}.two6,.about,.two,.visit,.bn{grid-template-columns:1fr}.two6{gap:12px}.railrow{grid-template-columns:1fr}.side{flex-direction:row;flex-wrap:wrap;align-items:center}.side p{display:none}.arrows{margin-left:auto}.sec{padding-top:60px}.ph{height:300px}.mini{grid-template-columns:1fr}.bn>div:first-child{padding:30px 24px}.stat6>div{border:0}}
`;
