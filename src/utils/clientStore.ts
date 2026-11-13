/**
 * Clean clinic links: websitedemos.space/<slug>
 * The dashboard saves each clinic (no account, no token) and the site reads it
 * back from the slug. See "storage: is.gd" below.
 */
import { ClinicTemplateData, MULTAN_PRESETS } from '../data/multanTemplates';

export const OWNER = 'AttiqBaig1';
export const REPO = 'multan-clinics';
export const DATA_BRANCH = 'clients';
export const SITE_ORIGIN = 'https://websitedemos.space';
const RAW = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${DATA_BRANCH}/c/`;

export type Niche = ClinicTemplateData['niche'];
export const NICHES: { id: Niche; label: string }[] = MULTAN_PRESETS.map(p => ({ id: p.niche, label: p.nicheTitle }));

/** Short keys, same as the old long links (?n=&b=&d=...). */
export interface CompactClinic {
  n?: string; b?: string; d?: string; dt?: string; hl?: string; p?: string; w?: string;
  a?: string; c?: string; tm?: string; f?: string;
}

export const slugify = (s: string) =>
  s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/&/g, ' and ').replace(/['’.]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const toWhatsApp = (phone: string) => {
  let d = (phone || '').replace(/\D/g, '');
  if (d.startsWith('0092')) d = d.slice(2);
  if (d.startsWith('03')) d = '92' + d.slice(1);
  else if (d.length === 10 && d.startsWith('3')) d = '92' + d;
  return d;
};

const NICHE_WORDS: [Niche, RegExp][] = [
  ['ivf', /\bivf\b|test ?tube|infertil|fertility/],
  ['hair', /hair ?transplant|\bfue\b|\bprp\b|hair ?loss|hair ?fall|baldness/],
  ['plastic', /plastic|cosmetic surg|rhinoplast|liposuc|tummy tuck/],
  ['onco', /cancer|onco|tumou?r|chemo/],
  ['nephro', /dialysis|nephro|kidney (care|specialist|center|centre|hospital)|creatinine/],
  ['uro', /urolog|stone|prostate|\buro\b/],
  ['gastro', /gastro|liver|hepat|endoscop|stomach/],
  ['pulmo', /chest|asthma|pulmo|\btb\b|lung|respirat/],
  ['psych', /psychiatr|mental|mind ?care|counsel|psycholog|depress|anxiety|rehab(ilitation)? center for addiction|addiction/],
  ['endo', /endocrin|thyroid|hormone|diabet/],
  ['neuro', /neuro|brain|epilep|stroke|migraine/],
  ['ent', /\bent\b|\bears?\b|\bnose\b|throat|hearing|sinus/],
  ['radiology', /ultrasound|x-?ray|radiolog|imaging|\bct\b|\bmri\b|doppler|scan cent/],
  ['lab', /\blab\b|laborator|diagnostic|collection cent|patholog|blood test/],
  ['pharmacy', /pharma|medical store|chemist|drug store|medicos?\b/],
  ['homeo', /homeo|homoeo/],
  ['nutrition', /diet|nutrition|weight loss|slimming/],
  ['homecare', /home ?(care|nursing)|nursing|elderly|attendant/],
  ['hospital', /hospital|medical complex|emergency/],
  ['skin', /skin|aesthetic|derma|cosmetic|laser clinic/],
  ['eye', /\beye|vision|lasik|optic|ophthal/],
  ['ortho', /ortho(?!dont)|bone|joint|fracture/],
  ['cardio', /cardi|heart/],
  ['pet', /\bvet|\bpet\b|animal/],
  ['physio', /physio|rehab|spine/],
  ['gynae', /gyn|maternity|women|mother/],
  ['peds', /child|peds|paed|pediatric|kids|baby/],
  ['dental', /dent|teeth|tooth|smile|orthodont/],
  ['surgery', /laparoscop|general surg|surgical|hernia|gall ?bladder|piles/],
  ['general', /general|family|clinic|medical|health|physician/],
];

export function detectNiche(text: string): Niche {
  const t = ` ${(text || '').toLowerCase().replace(/[-_]+/g, ' ')} `;
  // "eye hospital" is eye, not a general hospital: check specialties before 'hospital'
  const order = NICHE_WORDS.filter(([id]) => id !== 'hospital');
  for (const [id, re] of order) if (re.test(t)) return id;
  if (NICHE_WORDS.find(([id]) => id === 'hospital')![1].test(t)) return 'hospital';
  return 'dental';
}

/** Full page data from the short keys (missing parts come from the niche preset). */
export function fromCompact(o: CompactClinic): ClinicTemplateData {
  const niche = (NICHES.some(x => x.id === o.n) ? o.n : detectNiche(o.b || '')) as Niche;
  const base = MULTAN_PRESETS.find(p => p.niche === niche) || MULTAN_PRESETS[0];
  const city = o.c || base.city;
  return {
    ...base,
    niche,
    businessName: o.b || base.businessName,
    tagline: o.hl || base.tagline,
    doctorName: o.d || base.doctorName,
    doctorTitle: o.dt || base.doctorTitle,
    phone: o.p || base.phone,
    whatsApp: o.w || (o.p ? toWhatsApp(o.p) : base.whatsApp),
    address: o.a || base.address,
    city,
    timings: o.tm || base.timings,
    consultationFee: o.f || base.consultationFee,
  };
}

/** Reads an old long link (or just its ?query) into short keys. */
export function compactFromLongLink(url: string): CompactClinic | null {
  let q: URLSearchParams;
  try { q = new URL(url.trim()).searchParams; } catch { q = new URLSearchParams(url.trim().replace(/^.*?\?/, '')); }
  const g = (...k: string[]) => { for (const x of k) { const v = q.get(x); if (v && v.trim()) return v.trim(); } return undefined; };
  const o: CompactClinic = {
    n: g('n', 'niche'), b: g('b', 'name', 'businessName'), d: g('d', 'doctor', 'doc'), dt: g('dt', 'degree', 'deg'),
    hl: g('hl', 'tagline', 'heading', 'h', 't'), p: g('p', 'phone'), w: g('w', 'wa', 'whatsApp'),
    a: g('a', 'address', 'addr'), c: g('city'), tm: g('tm', 'timings'), f: g('f', 'fee', 'consultationFee'),
  };
  return o.b || o.d || o.p ? o : null;
}

/** "laser-eye-centre-multan": the clinic name, plus the city when the name does not include it. */
export function slugFor(o: CompactClinic): string {
  const name = slugify(o.b || o.d || 'clinic');
  const city = slugify(o.c || 'Multan');
  return city && !name.split('-').join('-').includes(city) ? `${name}-${city}` : name;
}

// ------------------------------------------------------------------ storage: is.gd
// No account or token needed. Each clinic is an is.gd short link with a fixed
// name (w_<slug>) that points to the full old-style link with all details.
// websitedemos.space/<slug> looks that name up and builds the page from it.
const KEY_MAX = 30;                 // is.gd custom name limit
export const SLUG_MAX = KEY_MAX - 2; // "w_" prefix
const keyFor = (slug: string) => 'w_' + slug.replace(/-/g, '_');

const jsonp = (url: string, timeout = 12000): Promise<any> => new Promise(resolve => {
  const cb = 'wds' + Math.random().toString(36).slice(2);
  const s = document.createElement('script');
  const done = (v: any) => { try { delete (window as any)[cb]; } catch { /* */ } s.remove(); resolve(v); };
  (window as any)[cb] = done;
  s.src = `${url}&callback=${cb}`;
  s.onerror = () => done({ errorcode: -1, errormessage: 'network' });
  document.head.appendChild(s);
  setTimeout(() => done({ errorcode: -2, errormessage: 'timeout' }), timeout);
});

const PARAM_ORDER: (keyof CompactClinic)[] = ['n', 'b', 'd', 'dt', 'hl', 'p', 'w', 'a', 'c', 'tm', 'f'];
export const longLinkFor = (o: CompactClinic) => {
  const q = new URLSearchParams();
  for (const k of PARAM_ORDER) { const v = o[k]; if (v && String(v).trim()) q.set(k === 'c' ? 'city' : k, String(v).trim()); }
  return `${SITE_ORIGIN}/?${q.toString()}`;
};
const compactFromStored = (url: string) => compactFromLongLink(url.replace(/&amp;/g, '&'));

/** Short keys saved under a slug (is.gd), or null. */
export async function fetchCompact(slug: string): Promise<CompactClinic | null> {
  const s = slugify(slug);
  if (!s || s.length > SLUG_MAX) return null;
  const r = await jsonp(`https://is.gd/forward.php?format=json&shorturl=${keyFor(s)}`);
  if (r && typeof r.url === 'string') {
    const o = compactFromStored(r.url);
    if (o) { const c = new URL(r.url.replace(/&amp;/g, '&')).searchParams.get('city'); if (c) o.c = c; }
    return o;
  }
  // older demos saved on the repo's `clients` branch
  try {
    const g = await fetch(`${RAW}${s}.json?t=${Date.now()}`, { cache: 'no-store' });
    return g.ok ? await g.json() : null;
  } catch { return null; }
}

export async function fetchClient(slug: string): Promise<ClinicTemplateData | null> {
  const o = await fetchCompact(slug);
  return o ? fromCompact(o) : null;
}

export const sameClinic = (a: CompactClinic, b: CompactClinic) =>
  JSON.stringify(Object.entries(clean(a)).sort()) === JSON.stringify(Object.entries(clean(b)).sort());

/** Cuts a slug to the is.gd length limit at a word boundary. */
export function fitSlug(slug: string, room = 0): string {
  const max = SLUG_MAX - room;
  if (slug.length <= max) return slug;
  const cut = slug.slice(0, max);
  return cut.includes('-') ? cut.slice(0, cut.lastIndexOf('-')) : cut;
}

export type SaveResult = { slug: string; status: 'new' | 'same' | 'renamed' } | { slug: ''; status: 'error'; error: string };

/**
 * Saves one clinic and returns its slug. Same name already used for a
 * different clinic -> "-2", "-3" ... An identical clinic gets its old link.
 */
export async function saveClinic(data: CompactClinic): Promise<SaveResult> {
  const base = fitSlug(slugFor(data), 3);
  const long = longLinkFor(data);
  for (let i = 1; i <= 30; i++) {
    const slug = i === 1 ? base : `${base}-${i}`;
    const r = await jsonp(`https://is.gd/create.php?format=json&url=${encodeURIComponent(long)}&shorturl=${keyFor(slug)}`);
    if (r && r.shorturl) return { slug, status: i === 1 ? 'new' : 'renamed' };
    if (r && r.errorcode === 2) {                      // name taken: same clinic?
      const old = await fetchCompact(slug);
      if (old && sameClinic(old, data)) return { slug, status: 'same' };
      continue;
    }
    if (r && r.errorcode === 3) { await new Promise(t => setTimeout(t, 4000)); i--; continue; } // rate limit
    return { slug: '', status: 'error', error: (r && r.errormessage) || 'Save nahi hua' };
  }
  return { slug: '', status: 'error', error: 'Is naam ke bohat saare link pehle se bane hue hain' };
}

// links made from this browser (for the "saved" list)
const HIST = 'wds_saved_links';
export const loadHistory = (): { slug: string; name: string; at: number }[] => { try { return JSON.parse(localStorage.getItem(HIST) || '[]'); } catch { return []; } };
export const addHistory = (items: { slug: string; name: string }[]) => {
  const map = new Map(loadHistory().map(h => [h.slug, h]));
  for (const i of items) map.set(i.slug, { ...i, at: Date.now() });
  try { localStorage.setItem(HIST, JSON.stringify([...map.values()].sort((a, b) => b.at - a.at).slice(0, 500))); } catch { /* */ }
};

const clean = (o: CompactClinic) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && String(v).trim() !== '')) as CompactClinic;

/** Picks a free slug: base, base-2, base-3 ... (also unique inside this batch). */
export function uniqueSlug(base: string, taken: Set<string>): string {
  if (!taken.has(base)) return base;
  for (let i = 2; ; i++) if (!taken.has(`${base}-${i}`)) return `${base}-${i}`;
}

export const linkOrigin = () => {
  const h = typeof window !== 'undefined' ? window.location.hostname : '';
  return h === 'localhost' || h === '127.0.0.1' ? window.location.origin : SITE_ORIGIN;
};
