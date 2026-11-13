import React, { useEffect, useRef, useState } from 'react';
import './rd.css';
import {
  CompactClinic, compactFromLongLink, detectNiche, fetchCompact, sameClinic, linkOrigin, listSlugs, loadToken, NICHES, Niche,
  OWNER, REPO, saveClients, saveToken, slugFor, slugify, toWhatsApp, uniqueSlug, verifyToken,
} from '../../utils/clientStore';

/**
 * Clinic Demo dashboard — same layout as the Realtor Engine dashboard.
 * 0 Connect GitHub (once) → 1 Long link → short link → 2 Clinics (manual or CSV)
 * → 3 Links & Preview. Each clinic is saved as c/<slug>.json on the `clients`
 * branch and opens at websitedemos.space/<slug>.
 * Open with ?dashboard. Password-gated (only a SHA-256 hash is in the code).
 */

const PASSWORD_SHA256 = '818c5bb3b67b2c72f54d0b936e465662292792129d45ef2f29450c113e75c8fb';
const AUTH_KEY = 'wds_dash_ok';
const sha256Hex = async (s: string) =>
  Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))).map(b => b.toString(16).padStart(2, '0')).join('');

const SAMPLE_CSV = `Clinic Name,Niche,Doctor,Degrees,Headline,Phone,WhatsApp,Address,City,Timings,Fee
Laser Eye Centre Multan,eye,Dr. M. Safdar Iqbal Hashmi,"M.B.B.S (1987), F.C.P.S (2004), M.C.P.S, D.O.M.S (Gold Medalist, 1991)",#1 Eye Care in Multan,03044485777,923044485777,"20-30, Zainab Arcade, Nishtar Rd, near Ghuri Lab, Al Rahim Colony",Multan,03:30 PM - 08:30 PM (Mon - Sat),"Rs. 1,500"
Smile Dental Studio,dental,Dr. Ayesha Khan,"BDS, FCPS (Orthodontics)",Painless Dentistry in Multan,03001234567,,"Bosan Road, near Chungi No. 9",Multan,05:00 PM - 10:00 PM,"Rs. 1,000"
City Physio & Rehab,physio,Dr. Usman Ali,"DPT, MS (Neuro)",Back & Joint Pain Relief,03111234567,,"Gulgasht Colony",Multan,10:00 AM - 06:00 PM,"Rs. 2,000"`;

interface Entry {
  b: string; n: Niche | 'auto'; d: string; p: string;
  dt: string; hl: string; w: string; a: string; c: string; tm: string; f: string; open: boolean;
}
const blank = (): Entry => ({ b: '', n: 'auto', d: '', p: '', dt: '', hl: '', w: '', a: '', c: 'Multan', tm: '', f: '', open: false });

interface Site { key: string; slug: string; link: string; data: CompactClinic; updated: boolean }

const pretty = (url: string) => url.replace(/^https?:\/\//, '');
const csvQ = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const download = (filename: string, data: string, type = 'text/csv') => {
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([data], { type })), download: filename });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
};

/** Small CSV reader (quotes, commas and new lines inside quotes). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = []; let cell = ''; let q = false;
  const t = text.replace(/^﻿/, '');
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (q) {
      if (ch === '"' && t[i + 1] === '"') { cell += '"'; i++; } else if (ch === '"') q = false; else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') { if (ch === '\r' && t[i + 1] === '\n') i++; row.push(cell); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(c => c.trim()));
}
const HEADERS: [keyof CompactClinic, RegExp][] = [
  ['dt', /degree|qualif/], ['d', /doctor|dr\b|physician/], ['hl', /headline|tagline|heading|h1/],
  ['w', /whats/], ['p', /phone|mobile|contact|number/], ['tm', /timing|hours|time/], ['f', /fee|charges/],
  ['n', /niche|category|specialty|speciality|type/], ['a', /address|location/], ['c', /city/], ['b', /clinic|name|business|hospital/],
];
function rowsFromCsv(text: string): CompactClinic[] {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const map = new Map<number, keyof CompactClinic>();
  rows[0].forEach((h, i) => {
    const k = h.toLowerCase().trim();
    const hit = HEADERS.find(([key, re]) => re.test(k) && ![...map.values()].includes(key));
    if (hit) map.set(i, hit[0]);
  });
  return rows.slice(1).map(r => {
    const o: CompactClinic = {};
    map.forEach((key, i) => { const v = (r[i] || '').trim(); if (v) (o as any)[key] = v; });
    if (o.n) o.n = NICHES.some(x => x.id === o.n!.toLowerCase()) ? o.n.toLowerCase() : detectNiche(o.n);
    return o;
  }).filter(o => o.b);
}

const finish = (o: CompactClinic): CompactClinic => {
  const out: CompactClinic = { ...o, c: o.c || 'Multan', n: o.n || detectNiche(`${o.b || ''} ${o.hl || ''}`) };
  if (out.p && !out.w) out.w = toWhatsApp(out.p);
  return out;
};

// ===================================================================== gate
export const ClinicDashboard: React.FC = () => {
  useEffect(() => {
    if (document.getElementById('rd-fonts')) return;
    const l = Object.assign(document.createElement('link'), { id: 'rd-fonts', rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap' });
    document.head.appendChild(l);
  }, []);
  const [ok, setOk] = useState(() => { try { return sessionStorage.getItem(AUTH_KEY) === PASSWORD_SHA256; } catch { return false; } });
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  if (ok) return <Dashboard />;
  return (
    <div className="rd"><div className="gate">
      <form onSubmit={async e => {
        e.preventDefault(); setErr('');
        if ((await sha256Hex(pw)) === PASSWORD_SHA256) { try { sessionStorage.setItem(AUTH_KEY, PASSWORD_SHA256); } catch { /* */ } setOk(true); }
        else { setErr('Password galat hai. Dobara try karein.'); setPw(''); }
      }}>
        <div className="brand"><span className="logo">WD</span><div><b>Clinic<br />Demos</b><small>Dashboard</small></div></div>
        <h1>Login</h1>
        <label className="f" htmlFor="rd-pw">Password<input id="rd-pw" type="password" autoFocus autoComplete="current-password" value={pw} onChange={e => setPw(e.target.value)} /></label>
        {err && <div className="alert bad">{err}</div>}
        <button className="btn primary big" type="submit" style={{ width: '100%' }}>Dashboard kholein</button>
        <a className="rail-link" href="/">← Website par wapas</a>
      </form>
    </div></div>
  );
};

// ===================================================================== dashboard
const Dashboard: React.FC = () => {
  const origin = linkOrigin();
  const host = pretty(origin);
  const linkFor = (slug: string) => `${origin}/${slug}`;

  const [copiedKey, setCopiedKey] = useState('');
  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedKey(key); setTimeout(() => setCopiedKey(k => (k === key ? '' : k)), 1600);
  };

  // ---------------------------------------------------------------- 0. GitHub
  const [token, setToken] = useState(loadToken());
  const [tokenInput, setTokenInput] = useState('');
  const [ghUser, setGhUser] = useState('');
  const [ghErr, setGhErr] = useState('');
  const [ghBusy, setGhBusy] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const refreshSaved = async (t = token) => { try { setSaved((await listSlugs(t)).sort()); } catch { /* shown on save */ } };
  const connect = async (t: string) => {
    setGhBusy(true); setGhErr('');
    try {
      const who = await verifyToken(t.trim());
      saveToken(t.trim()); setToken(t.trim()); setGhUser(who); setTokenInput('');
      refreshSaved(t.trim());
    } catch (e: any) { setGhErr(e?.message || String(e)); }
    setGhBusy(false);
  };
  useEffect(() => { if (token) connect(token); /* eslint-disable-next-line */ }, []);
  const connected = !!token && !!ghUser;

  // ---------------------------------------------------------------- save helper
  const [updateExisting, setUpdateExisting] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const saveMany = async (items: CompactClinic[], where: 'quick' | 'list'): Promise<Site[]> => {
    setBusy(true); setMsg(null);
    try {
      const taken = new Set(await listSlugs(token));
      const inBatch = new Set<string>();
      const plan: (Site & { same: boolean })[] = [];
      for (const [i, raw] of items.entries()) {
        const data = finish(raw);
        const base = slugFor(data);
        let slug = ''; let updated = false; let same = false;
        // exactly the same clinic already saved -> give back its link
        for (const cand of [base, ...Array.from({ length: 8 }, (_, k) => `${base}-${k + 2}`)]) {
          if (!taken.has(cand) || inBatch.has(cand)) continue;
          const old = await fetchCompact(cand);
          if (old && sameClinic(old, data)) { slug = cand; same = true; break; }
        }
        if (!slug) {
          if (updateExisting && taken.has(base) && !inBatch.has(base)) { slug = base; updated = true; }
          else slug = uniqueSlug(base, new Set([...taken, ...inBatch]));
        }
        inBatch.add(slug);
        plan.push({ key: `${Date.now()}-${i}`, slug, data, updated, same, link: linkFor(slug) });
      }
      await saveClients(token, plan.filter(p => !p.same).map(p => ({ slug: p.slug, data: p.data })));
      setSaved(s => [...new Set([...s, ...plan.map(p => p.slug)])].sort());
      const renamed = plan.filter(p => !p.updated && !p.same && p.slug !== slugFor(p.data)).length;
      const sameN = plan.filter(p => p.same).length;
      setMsg({
        ok: true,
        text: `${plan.length} link${plan.length === 1 ? "" : "s"} tayyar aur live hain.`
          + (renamed ? ` ${renamed} ka naam pehle se use ho chuka tha, unke link ke aakhir mein number laga diya (purane link waise hi rahenge).` : '')
          + (sameN ? ` ${sameN} bilkul same pehle se saved the, unka purana link hi diya.` : '')
          + (plan.some(p => p.updated) ? ` ${plan.filter(p => p.updated).length} purane link update hue.` : ''),
      });
      if (where === 'list') {
        setSites(plan);
        setTimeout(() => document.getElementById('rd-links')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      }
      return plan;
    } catch (e: any) {
      setMsg({ ok: false, text: e?.message || String(e) });
      return [];
    } finally { setBusy(false); }
  };

  // ---------------------------------------------------------------- 1. long -> short
  const [longUrl, setLongUrl] = useState('');
  const longParsed = longUrl.trim() ? compactFromLongLink(longUrl) : null;
  const [quickSite, setQuickSite] = useState<Site | null>(null);

  // ---------------------------------------------------------------- 2. clinics
  const [method, setMethod] = useState<'manual' | 'csv'>('manual');
  const [entries, setEntries] = useState<Entry[]>([blank()]);
  const [csvRows, setCsvRows] = useState<CompactClinic[]>([]);
  const [csvErr, setCsvErr] = useState('');
  const [over, setOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const setCount = (n: number) => {
    const c = Math.max(1, Math.min(100, n || 1));
    setEntries(es => (c > es.length ? [...es, ...Array.from({ length: c - es.length }, blank)] : es.slice(0, c)));
  };
  const upd = (i: number, k: keyof Entry, v: any) => setEntries(es => es.map((e, j) => (j === i ? { ...e, [k]: v } : e)));
  const loadCsv = (text: string) => {
    setCsvErr('');
    const rows = rowsFromCsv(text);
    if (!rows.length) setCsvErr('CSV mein koi clinic nahi mila. Pehli line mein headings hon (Clinic Name, Niche, Doctor, Phone ...).');
    setCsvRows(rows);
  };
  const toSave: CompactClinic[] = method === 'csv'
    ? csvRows
    : entries.filter(e => e.b.trim()).map(e => {
      const o: CompactClinic = { b: e.b.trim(), d: e.d.trim(), p: e.p.trim(), dt: e.dt.trim(), hl: e.hl.trim(), w: e.w.trim(), a: e.a.trim(), c: e.c.trim(), tm: e.tm.trim(), f: e.f.trim() };
      if (e.n !== 'auto') o.n = e.n;
      return Object.fromEntries(Object.entries(o).filter(([, v]) => v)) as CompactClinic;
    });

  const exportResults = () => {
    const head = 'Clinic,Doctor,Phone,Demo Link';
    const body = sites.map(s => [s.data.b || '', s.data.d || '', s.data.p || '', s.link].map(v => csvQ(String(v))).join(','));
    download('clinic-demo-links.csv', '﻿' + [head, ...body].join('\n'));
  };
  const allLinks = sites.map(s => `${s.data.b}: ${s.link}`).join('\n');
  const nicheLabel = (n?: string) => NICHES.find(x => x.id === n)?.label || n || '';

  return (
    <div className="rd"><div className="shell">
      {/* ======================= RAIL ======================= */}
      <aside className="rail" aria-label="Steps">
        <div className="brand"><span className="logo">WD</span><div><b>Clinic<br />Demos</b><small>Clean demo links · Pakistan</small></div></div>
        <nav className="steps">
          <a href="#rd-gh" className={connected ? 'done' : ''}><span className="n">0</span><span>GitHub<small>{connected ? `Connected · ${ghUser}` : 'Ek dafa connect'}</small></span></a>
          <a href="#rd-quick" className={quickSite ? 'done' : ''}><span className="n">1</span><span>Lamba → Chhota<small>Purana link paste karein</small></span></a>
          <a href="#rd-gen" className={toSave.length ? 'done' : ''}><span className="n">2</span><span>Clinics<small>Manual ya CSV</small></span></a>
          <a href="#rd-links" className={sites.length ? 'done' : ''}><span className="n">3</span><span>Links &amp; Preview<small>Copy karke bhejein</small></span></a>
        </nav>
        <div className="meters">
          <div className="meter"><b>{sites.length}</b><span>Is dafa bane</span></div>
          <div className="meter"><b>{saved.length}</b><span>Kul saved links</span></div>
          <div className="meter wide"><span className={`dot ${connected ? 'on' : ''}`} /><span>{host}</span></div>
        </div>
        <a className="rail-link" href="/">← Demo website dekhein</a>
      </aside>

      <main className="main">
        <header className="hero">
          <h1>Lamba link nahi. <em>Sirf clinic ka naam.</em></h1>
          <p>Har clinic ka saaf, chhota link — jaise <code>{host}/laser-eye-centre-multan</code>. Doctor, degrees, timings, fee aur phone sab save rehte hain aur link kisi bhi mobile par poori website khol deta hai. Ek hi naam dobara aaye to naya link <code>-2</code> leta hai, purana kabhi overwrite nahi hota.</p>
        </header>

        {/* ---------- 0. GITHUB ---------- */}
        <section className="panel" id="rd-gh">
          <div className="ph"><span className="n">0</span><div><h2>GitHub connection</h2><p>Links save karne ke liye sirf ek dafa. Token isi browser mein rehta hai.</p></div>
            {connected && <span className="right pill ok">● Connected · {ghUser}</span>}
          </div>
          {connected ? (
            <div className="bar" style={{ justifyContent: 'space-between' }}>
              <span>Data repo: <code>{OWNER}/{REPO}</code> → branch <code>clients</code></span>
              <button className="btn ghost sm" type="button" onClick={() => { saveToken(''); setToken(''); setGhUser(''); setSaved([]); }}>Disconnect</button>
            </div>
          ) : (
            <section style={{ display: 'grid', gap: 12 }}>
              <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7, color: 'var(--muted)' }}>
                <li><a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">GitHub token page</a> kholein.</li>
                <li>Repository access: <b>Only select repositories</b> → <code>{REPO}</code>.</li>
                <li>Permissions → Repository → <b>Contents: Read and write</b>.</li>
                <li><b>Generate token</b> dabayein, copy karein aur neeche paste karein.</li>
              </ol>
              <div className="f3">
                <label className="f" htmlFor="rd-tok" style={{ gridColumn: 'span 2' }}>GitHub token<input id="rd-tok" type="password" autoComplete="off" value={tokenInput} onChange={e => setTokenInput(e.target.value)} placeholder="github_pat_…" /></label>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}><button className="btn primary" style={{ width: '100%' }} type="button" disabled={!tokenInput.trim() || ghBusy} onClick={() => connect(tokenInput)}>{ghBusy ? 'Check ho raha hai…' : 'Connect'}</button></div>
              </div>
              {ghErr && <div className="alert bad">{ghErr}</div>}
            </section>
          )}
        </section>

        {/* ---------- 1. LONG -> SHORT ---------- */}
        <section className="panel" id="rd-quick">
          <div className="ph"><span className="n">1</span><div><h2>⚡ Lamba link → chhota link</h2><p>Purana lamba link (<code>?n=eye&amp;b=…</code>) paste karein — saari details utha kar chhota link bana dega.</p></div></div>
          <label className="f" htmlFor="rd-long">Lamba link<textarea id="rd-long" rows={3} value={longUrl} onChange={e => { setLongUrl(e.target.value); setQuickSite(null); }} placeholder="https://websitedemos.space/?n=eye&b=Laser+Eye+Centre+Multan&d=…" /></label>
          {longUrl.trim() && !longParsed && <div className="alert bad">Is link mein clinic ki details nahi milin.</div>}
          {longParsed && (
            <div className="linkbox">
              <div className="bar" style={{ gap: 8 }}>
                <span className="chip">🏥 {longParsed.b}</span>
                {longParsed.d && <span className="chip">👨‍⚕️ {longParsed.d}</span>}
                <span className="chip">🩺 {nicheLabel(finish(longParsed).n)}</span>
                {longParsed.p && <span className="chip">📞 {longParsed.p}</span>}
                {longParsed.tm && <span className="chip">🕒 {longParsed.tm}</span>}
                {longParsed.f && <span className="chip">💵 {longParsed.f}</span>}
              </div>
              {!quickSite ? (
                <button className="btn primary big" type="button" disabled={!connected || busy} onClick={async () => { const r = await saveMany([longParsed], 'quick'); if (r[0]) setQuickSite(r[0]); }}>
                  {busy ? 'Save ho raha hai…' : connected ? '🔗 Chhota link banao' : 'Pehle step 0 mein GitHub connect karein'}
                </button>
              ) : (
                <>
                  <a className="the-link" href={quickSite.link} target="_blank" rel="noopener noreferrer">{pretty(quickSite.link)}</a>
                  <div className="bar">
                    <button className="btn primary" type="button" onClick={() => copy(quickSite.link, 'q')}>{copiedKey === 'q' ? 'Copy ho gaya ✓' : '📋 Copy link'}</button>
                    <a className="btn ghost" href={quickSite.link} target="_blank" rel="noopener noreferrer">Kholein ↗</a>
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* ---------- 2. CLINICS ---------- */}
        <section className="panel" id="rd-gen">
          <div className="ph"><span className="n">2</span><div><h2>Clinics ki list</h2><p>Naya clinic ek ek karke ya CSV se poori list.</p></div>
            <div className="right seg" role="group" aria-label="Input method">
              <button type="button" aria-pressed={method === 'manual'} onClick={() => setMethod('manual')}>✍️ Manual entry</button>
              <button type="button" aria-pressed={method === 'csv'} onClick={() => setMethod('csv')}>📄 Upload CSV</button>
            </div>
          </div>

          {method === 'manual' ? (
            <section style={{ display: 'grid', gap: 14 }}>
              <div className="count">
                <span style={{ fontWeight: 600, fontSize: 14 }}>Kitne clinics?</span>
                <span className="num">
                  <button type="button" aria-label="Fewer" onClick={() => setCount(entries.length - 1)}>−</button>
                  <input aria-label="How many clinics" type="number" min={1} max={100} value={entries.length} onChange={e => setCount(parseInt(e.target.value, 10))} />
                  <button type="button" aria-label="More" onClick={() => setCount(entries.length + 1)}>+</button>
                </span>
              </div>
              <div className="rows">
                {entries.map((e, i) => (
                  <div className="biz" key={i}>
                    <div className="biz-main">
                      <span className="idx">#{i + 1}</span>
                      <label className="f" htmlFor={`rd-b${i}`}>Clinic name<input id={`rd-b${i}`} value={e.b} onChange={x => upd(i, 'b', x.target.value)} placeholder="Laser Eye Centre Multan" /></label>
                      <label className="f" htmlFor={`rd-d${i}`}>Doctor<input id={`rd-d${i}`} value={e.d} onChange={x => upd(i, 'd', x.target.value)} placeholder="Dr. M. Safdar Iqbal Hashmi" /></label>
                      <label className="f" htmlFor={`rd-p${i}`}>Phone<input id={`rd-p${i}`} value={e.p} onChange={x => upd(i, 'p', x.target.value)} placeholder="03044485777" inputMode="tel" /></label>
                    </div>
                    <div className="biz-more" style={{ marginTop: 10 }}>
                      <label className="f" htmlFor={`rd-n${i}`}>Niche
                        <select id={`rd-n${i}`} value={e.n} onChange={x => upd(i, 'n', x.target.value)}>
                          <option value="auto">Auto (naam se){e.b ? ` → ${nicheLabel(detectNiche(e.b))}` : ''}</option>
                          {NICHES.map(n => <option key={n.id} value={n.id}>{n.label}</option>)}
                        </select>
                      </label>
                    </div>
                    <button type="button" className="more-toggle" onClick={() => upd(i, 'open', !e.open)}>{e.open ? '− Kam details' : '+ Aur details (degrees, headline, address, timings, fee, WhatsApp)'}</button>
                    {e.open && (
                      <div className="biz-more">
                        <label className="f" htmlFor={`rd-dt${i}`}>Degrees<input id={`rd-dt${i}`} value={e.dt} onChange={x => upd(i, 'dt', x.target.value)} placeholder="MBBS, FCPS" /></label>
                        <label className="f" htmlFor={`rd-hl${i}`}>Headline (H1)<input id={`rd-hl${i}`} value={e.hl} onChange={x => upd(i, 'hl', x.target.value)} placeholder="#1 Eye Care in Multan" /></label>
                        <label className="f" htmlFor={`rd-a${i}`}>Address<input id={`rd-a${i}`} value={e.a} onChange={x => upd(i, 'a', x.target.value)} placeholder="Nishtar Rd, Al Rahim Colony" /></label>
                        <label className="f" htmlFor={`rd-c${i}`}>City<input id={`rd-c${i}`} value={e.c} onChange={x => upd(i, 'c', x.target.value)} /></label>
                        <label className="f" htmlFor={`rd-tm${i}`}>Timings<input id={`rd-tm${i}`} value={e.tm} onChange={x => upd(i, 'tm', x.target.value)} placeholder="03:30 PM - 08:30 PM (Mon - Sat)" /></label>
                        <label className="f" htmlFor={`rd-f${i}`}>Fee<input id={`rd-f${i}`} value={e.f} onChange={x => upd(i, 'f', x.target.value)} placeholder="Rs. 1,500" /></label>
                        <label className="f" htmlFor={`rd-w${i}`}>WhatsApp <span className="hint">(khaali = phone)</span><input id={`rd-w${i}`} value={e.w} onChange={x => upd(i, 'w', x.target.value)} placeholder="923044485777" /></label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section style={{ display: 'grid', gap: 12 }}>
              <label className={`drop ${over ? 'over' : ''}`} htmlFor="rd-csv"
                onDragOver={e => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
                onDrop={async e => { e.preventDefault(); setOver(false); const f = e.dataTransfer.files[0]; if (f) loadCsv(await f.text()); }}>
                <input id="rd-csv" ref={fileRef} type="file" accept=".csv,text/csv" style={{ display: 'none' }} onChange={async e => { const f = e.target.files?.[0]; if (f) loadCsv(await f.text()); }} />
                <span style={{ fontSize: 28 }} aria-hidden="true">📄</span>
                <b>CSV file yahan drop karein ya click karein</b>
                <span style={{ color: 'var(--muted)', fontWeight: 500 }}>Columns: <code>Clinic Name, Niche, Doctor, Degrees, Headline, Phone, WhatsApp, Address, City, Timings, Fee</code></span>
              </label>
              <div className="bar">
                <button className="btn ghost" type="button" onClick={() => loadCsv(SAMPLE_CSV)}>Sample list use karein</button>
                <button className="btn ghost" type="button" onClick={() => download('clinic-template.csv', '﻿' + SAMPLE_CSV)}>CSV template download</button>
              </div>
              {csvErr && <div className="alert bad">{csvErr}</div>}
              {csvRows.length > 0 && (
                <div className="tbl"><table>
                  <thead><tr><th>#</th><th>Clinic</th><th>Niche</th><th>Doctor</th><th>Phone</th></tr></thead>
                  <tbody>{csvRows.map((r, i) => (
                    <tr key={i}><td className="mono">{i + 1}</td><td><strong>{r.b}</strong><br /><span style={{ color: 'var(--muted)' }}>{r.c || 'Multan'}</span></td>
                      <td>{nicheLabel(finish(r).n)}</td><td>{r.d}</td><td className="mono">{r.p}</td></tr>
                  ))}</tbody>
                </table></div>
              )}
            </section>
          )}

          <div style={{ display: 'grid', gap: 14, paddingTop: 6, borderTop: '1px solid var(--line)' }}>
            <label className="toggle" htmlFor="rd-up"><input id="rd-up" type="checkbox" checked={updateExisting} onChange={e => setUpdateExisting(e.target.checked)} /> Agar is naam ka link pehle se hai to <b>usi ko update</b> karein <span style={{ color: 'var(--muted)' }}>(warna naya link <code>-2</code> ke saath banega)</span></label>
            <button className="btn primary big" type="button" disabled={!connected || toSave.length === 0 || busy} onClick={() => saveMany(toSave, 'list')}>
              {busy ? 'Save ho raha hai…' : !connected ? 'Pehle step 0 mein GitHub connect karein' : `🔗 Save & generate links${toSave.length > 1 ? ` (${toSave.length})` : ''}`}
            </button>
            {msg && <div className={`alert ${msg.ok ? 'ok' : 'bad'}`}>{msg.text}</div>}
          </div>
        </section>

        {/* ---------- 3. LINKS & PREVIEW ---------- */}
        <section className="panel" id="rd-links">
          <div className="ph"><span className="n">3</span><div><h2>Links &amp; Preview</h2><p>Link copy karein aur clinic ko bhej dein.</p></div></div>
          {sites.length === 0 ? <div className="empty">Pehle step 2 mein links banayein.</div> : (
            <section style={{ display: 'grid', gap: 14 }}>
              <div className="bar" style={{ justifyContent: 'space-between' }}>
                <strong>{sites.length} link(s) tayyar</strong>
                <div className="bar">
                  <button className="btn sm primary" type="button" onClick={() => copy(allLinks, 'all')}>{copiedKey === 'all' ? 'Copy ho gaya ✓' : '📋 Copy all'}</button>
                  <button className="btn sm" type="button" onClick={exportResults}>⬇️ CSV</button>
                </div>
              </div>
              <div className="tbl"><table>
                <thead><tr><th>Clinic</th><th>Niche</th><th>Demo link</th><th></th></tr></thead>
                <tbody>{sites.map(s => (
                  <tr key={s.key}>
                    <td><strong>{s.data.b}</strong>{s.data.d ? <><br /><span style={{ color: 'var(--muted)' }}>{s.data.d}</span></> : null}</td>
                    <td><span className="chip">{nicheLabel(s.data.n)}</span></td>
                    <td style={{ maxWidth: 360, wordBreak: 'break-all' }}><a href={s.link} target="_blank" rel="noopener noreferrer">{pretty(s.link)}</a>{s.updated && <><br /><span className="st">↻ updated</span></>}</td>
                    <td><button className="btn sm" type="button" onClick={() => copy(s.link, s.key)}>{copiedKey === s.key ? '✓' : 'Copy'}</button></td>
                  </tr>
                ))}</tbody>
              </table></div>
              <div className="rows">{sites.map(s => (
                <details className="card" key={s.key}>
                  <summary>👁️ {s.data.b} <span className="chip">{nicheLabel(s.data.n)}</span></summary>
                  <div className="card-body">
                    <div className="bar">
                      <button className="btn" type="button" onClick={() => copy(s.link, 'p' + s.key)}>{copiedKey === 'p' + s.key ? 'Copy ho gaya ✓' : '📋 Copy link'}</button>
                      <a className="btn ghost" href={s.link} target="_blank" rel="noopener noreferrer">Naye tab mein kholein ↗</a>
                    </div>
                    <div className="frame"><iframe title={`Preview of ${s.data.b}`} src={`/${s.slug}`} loading="lazy" /></div>
                  </div>
                </details>
              ))}</div>
            </section>
          )}

          {saved.length > 0 && (
            <details className="card" style={{ marginTop: 14 }}>
              <summary>📚 Pehle se saved links ({saved.length})</summary>
              <div className="card-body">
                <div className="tbl"><table><tbody>{saved.map(sl => (
                  <tr key={sl}><td style={{ wordBreak: 'break-all' }}><a href={linkFor(sl)} target="_blank" rel="noopener noreferrer">{pretty(linkFor(sl))}</a></td>
                    <td><button className="btn sm" type="button" onClick={() => copy(linkFor(sl), 's' + sl)}>{copiedKey === 's' + sl ? '✓' : 'Copy'}</button></td></tr>
                ))}</tbody></table></div>
              </div>
            </details>
          )}
        </section>
      </main>
    </div></div>
  );
};

export { slugify };
