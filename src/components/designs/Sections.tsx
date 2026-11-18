import React, { useMemo, useState } from 'react';
import { D, I, ServiceIcon, mapUrl, telUrl, waUrl } from './shared';

/** Extra sections shared by designs 2 to 5. They take their colours from the design's CSS variables. */

const priceNum = (p?: string) => {
  const m = (p || '').replace(/,/g, '').match(/(\d{3,})/);
  return m ? parseInt(m[1], 10) : null;
};
const rs = (n: number) => 'Rs. ' + n.toLocaleString('en-PK');

export const WhyUs: React.FC<{ d: D; title?: string }> = ({ d, title = 'Why patients choose us' }) => {
  const items = [
    { i: <I.Stethoscope size={26} />, t: 'Qualified specialist', p: `${d.doctorName}, ${d.doctorTitle}` },
    { i: <I.Award size={26} />, t: 'Years of experience', p: d.doctorExperience },
    { i: <I.CalendarCheck size={26} />, t: 'Fixed tokens, short waits', p: 'Book on WhatsApp, get a time slot and walk straight in.' },
    { i: <I.ShieldCheck size={26} />, t: 'Prices you can see', p: `Treatment prices are listed on this page. Consultation: ${d.consultationFee}.` },
  ];
  return (
    <section className="x-sec">
      <h2 className="x-h">{title}</h2>
      <div className="x-why">{items.map((x, k) => <article key={k}><span className="x-wi">{x.i}</span><h3>{x.t}</h3><p>{x.p}</p></article>)}</div>
    </section>
  );
};

export const CostEstimator: React.FC<{ d: D }> = ({ d }) => {
  const priced = useMemo(() => d.services.filter(s => priceNum(s.price)), [d]);
  const [idx, setIdx] = useState(0);
  const [qty, setQty] = useState(1);
  if (!priced.length) return null;
  const s = priced[idx];
  const unit = priceNum(s.price)!;
  const total = unit * qty;
  return (
    <section className="x-sec">
      <div className="x-est">
        <div>
          <h2 className="x-h">Estimate your cost</h2>
          <p className="x-lead">Choose a treatment to see the starting price. The doctor confirms the final amount after examination.</p>
          <ul className="x-estl">{priced.map((p, k) => (
            <li key={k}><button type="button" className={k === idx ? 'on' : ''} onClick={() => setIdx(k)}><ServiceIcon name={p.icon} size={18} /><span>{p.title}</span><b>{p.price}</b></button></li>
          ))}</ul>
        </div>
        <div className="x-estc">
          <p className="x-estk">{s.title}</p>
          <div className="x-estq">
            <button type="button" aria-label="Less" onClick={() => setQty(Math.max(1, qty - 1))}>–</button>
            <span><b>{qty}</b> {qty === 1 ? 'session / unit' : 'sessions / units'}</span>
            <button type="button" aria-label="More" onClick={() => setQty(Math.min(20, qty + 1))}>+</button>
          </div>
          <div className="x-esttot"><small>Estimated total</small><b>{rs(total)}</b></div>
          <a className="x-estb" href={waUrl(d, `Mujhe ${s.title} ka estimate chahiye (${qty}). Andaza: ${rs(total)}.`)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> Confirm on WhatsApp</a>
          <small className="x-estn">Starting price only. Final fee depends on the case.</small>
        </div>
      </div>
    </section>
  );
};

export const Steps: React.FC<{ d: D; title?: string }> = ({ d, title = 'Your first visit in 3 steps' }) => (
  <section className="x-sec">
    <h2 className="x-h">{title}</h2>
    <ol className="x-steps">
      <li><span className="x-sn">1</span><I.MessageCircle size={26} /><h3>Message us</h3><p>Send the treatment and the day you prefer on WhatsApp.</p></li>
      <li><span className="x-sn">2</span><I.CalendarCheck size={26} /><h3>Get your token</h3><p>We confirm a time slot, usually within minutes.</p></li>
      <li><span className="x-sn">3</span><I.MapPin size={26} /><h3>Walk in</h3><p>{d.address}, {d.city}. No queue at the counter.</p></li>
    </ol>
  </section>
);

export const FindUs: React.FC<{ d: D }> = ({ d }) => {
  const q = encodeURIComponent(`${d.address}, ${d.city}, Pakistan`);
  return (
    <section className="x-sec">
      <h2 className="x-h">Find us</h2>
      <div className="x-find">
        <div className="x-fi">
          <div className="x-fr"><I.MapPin size={20} /><div><b>Address</b><span>{d.address}, {d.city}</span></div></div>
          <div className="x-fr"><I.Clock size={20} /><div><b>Timings</b><span>{d.timings}</span></div></div>
          <div className="x-fr"><I.Phone size={20} /><div><b>Phone / WhatsApp</b><span>{d.phone}</span></div></div>
          <div className="x-fb">
            <a className="x-btn" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> WhatsApp</a>
            <a className="x-btn out" href={mapUrl(d)} target="_blank" rel="noreferrer"><I.MapPin size={18} /> Directions</a>
          </div>
        </div>
        <div className="x-map"><iframe title="Clinic location map" loading="lazy" src={`https://maps.google.com/maps?q=${q}&output=embed`} /></div>
      </div>
    </section>
  );
};

export const CallBand: React.FC<{ d: D }> = ({ d }) => (
  <section className="x-band">
    <div>
      <h2>Need to see the doctor soon?</h2>
      <p>Call or message now and we will fit you in at the earliest slot.</p>
    </div>
    <div className="x-bb">
      <a className="x-btn" href={telUrl(d)}><I.Phone size={18} /> {d.phone}</a>
      <a className="x-btn out" href={waUrl(d)} target="_blank" rel="noreferrer"><I.MessageCircle size={18} /> WhatsApp</a>
    </div>
  </section>
);

export const FooterCols: React.FC<{ d: D }> = ({ d }) => (
  <footer className="x-foot">
    <div className="x-fc">
      <div><b className="x-fn">{d.businessName}</b><p>{d.nicheTitle} in {d.city}. {d.doctorName}.</p></div>
      <div><b>Treatments</b>{d.services.slice(0, 5).map((s, i) => <span key={i}>{s.title}</span>)}</div>
      <div><b>Contact</b><span>{d.address}, {d.city}</span><span>{d.phone}</span><span>{d.timings}</span></div>
    </div>
    <p className="x-copy">© {new Date().getFullYear()} {d.businessName}. All rights reserved.</p>
  </footer>
);

export const SECTIONS_CSS = `
.x-sec{max-width:1180px;margin:0 auto;padding:80px 20px 0}
.x-h{font-family:var(--hf,inherit);font-size:clamp(28px,3.6vw,48px);font-weight:var(--hw,800);letter-spacing:var(--hls,-.02em);line-height:1.08;margin:0 0 14px;color:inherit}
.x-lead{margin:0 0 22px;opacity:.75;max-width:52ch}
.x-why{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:26px}
.x-why article{background:var(--card);border:1px solid var(--line);border-radius:var(--r,20px);padding:26px}
.x-wi{width:54px;height:54px;border-radius:calc(var(--r,20px)*.7);background:var(--wi-bg,var(--a));color:var(--wi-fg,var(--on));display:grid;place-items:center;margin-bottom:14px}
.x-why h3,.x-steps h3{font-family:var(--hf,inherit);font-weight:var(--hw3,700);font-size:19px;margin:0 0 6px}.x-why p,.x-steps p{margin:0;opacity:.75;font-size:14.5px}
.x-est{display:grid;grid-template-columns:1.2fr .8fr;gap:36px;align-items:start}
.x-estl{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.x-estl button{all:unset;box-sizing:border-box;width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;border-radius:calc(var(--r,20px)*.7);border:1.5px solid var(--line);background:var(--card);cursor:pointer;font-weight:600}
.x-estl button span{flex:1}.x-estl button b{color:var(--a);filter:brightness(1.15);white-space:nowrap}
.x-estl button.on{border-color:var(--a);box-shadow:0 0 0 3px color-mix(in srgb,var(--a) 22%,transparent)}
.x-estl button:focus-visible,.x-estq button:focus-visible,.x-estb:focus-visible,.x-btn:focus-visible{outline:3px solid var(--a);outline-offset:3px}
.x-estc{background:var(--est-bg,var(--a));color:var(--est-fg,var(--on));border-radius:var(--r,24px);padding:30px;display:grid;gap:14px;position:sticky;top:90px}
.x-estk{margin:0;font-weight:700;font-size:17px}
.x-estq{display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,.16);border-radius:14px;padding:8px}
.x-estq button{all:unset;width:40px;height:40px;border-radius:10px;background:#fff;color:#111;text-align:center;line-height:40px;font-size:22px;font-weight:700;cursor:pointer}
.x-estq span{font-size:14px}.x-estq b{font-size:20px}
.x-esttot small{display:block;opacity:.85}.x-esttot b{font-size:clamp(30px,4vw,42px);line-height:1.1}
.x-estb{display:flex;gap:8px;justify-content:center;align-items:center;background:#fff;color:#111!important;text-decoration:none;font-weight:800;padding:14px;border-radius:14px}
.x-estn{opacity:.85;font-size:12px;text-align:center}
.x-steps{list-style:none;margin:26px 0 0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;position:relative}
.x-steps li{position:relative;background:var(--card);border:1px solid var(--line);border-radius:var(--r,20px);padding:28px 24px;display:grid;gap:8px;align-content:start}
.x-steps li svg{color:var(--ico,var(--a));filter:brightness(1.1)}
.x-sn{position:absolute;top:18px;right:20px;width:34px;height:34px;border-radius:50%;background:var(--wi-bg,var(--a));color:var(--wi-fg,var(--on));display:grid;place-items:center;font-weight:800;font-size:15px}
.x-find{display:grid;grid-template-columns:.9fr 1.1fr;gap:28px;align-items:stretch;margin-top:26px}
.x-fi{background:var(--card);border:1px solid var(--line);border-radius:var(--r,20px);padding:28px;display:grid;gap:18px;align-content:start}
.x-fr{display:flex;gap:14px;align-items:flex-start}.x-fr svg{color:var(--a);filter:brightness(1.15);flex:none;margin-top:2px}
.x-fr b{display:block;font-size:14px;opacity:.65;font-weight:600}.x-fr span{font-weight:600}
.x-fb{display:flex;flex-wrap:wrap;gap:10px;margin-top:6px}
.x-btn{display:inline-flex;gap:8px;align-items:center;background:var(--btn,var(--a));color:var(--btn-fg,var(--on))!important;text-decoration:none;font-weight:700;padding:13px 22px;border-radius:999px}
.x-btn.out{background:transparent;color:inherit!important;border:1.5px solid var(--line)}
.x-map{border-radius:var(--r,20px);overflow:hidden;min-height:340px;border:1px solid var(--line);background:color-mix(in srgb,var(--a) 10%,var(--card))}
.x-map iframe{width:100%;height:100%;min-height:340px;border:0;display:block}
.x-band{margin:84px 0 0;background:var(--band-bg,var(--a));color:var(--band-fg,var(--on));padding:42px max(20px,calc((100vw - 1140px)/2));display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
.x-band h2{font-family:var(--hf,inherit);font-weight:var(--hw,800);font-size:clamp(26px,3.4vw,42px);margin:0 0 4px}.x-band p{margin:0;opacity:.9}
.x-bb{display:flex;gap:10px;flex-wrap:wrap}.x-band .x-btn{background:#fff;color:#111!important}.x-band .x-btn.out{background:transparent;color:inherit!important;border:1.5px solid rgba(255,255,255,.7)}
.x-foot{margin-top:0;padding:56px max(20px,calc((100vw - 1140px)/2)) 96px;background:var(--fbg,#0f1626);color:var(--fink,#cfd8ea)}
.x-fc{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:34px}
.x-fc b{display:block;color:#fff;margin-bottom:10px}.x-fc .x-fn{font-size:19px}.x-fc span{display:block;font-size:14px;margin:6px 0;opacity:.85}.x-fc p{font-size:14px;opacity:.8;margin:0;max-width:34ch}
.x-copy{margin:36px 0 0;padding-top:20px;border-top:1px solid rgba(255,255,255,.14);font-size:12.5px;opacity:.7}
@media(max-width:860px){.x-est,.x-find,.x-fc,.x-steps{grid-template-columns:1fr}.x-estc{position:static}.x-sec{padding-top:56px}.x-band{margin-top:56px}}
`;
