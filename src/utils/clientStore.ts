/**
 * Clean clinic links: websitedemos.space/<slug>
 *
 * Each clinic's details live as a small JSON file on the `clients` branch of
 * this repo (c/<slug>.json). The site reads it from raw.githubusercontent.com,
 * so a new link works within seconds and nothing has to be redeployed.
 * The dashboard (/?dashboard) writes those files with a GitHub token that the
 * owner pastes once; the token stays in that browser only.
 */
import { ClinicTemplateData, MULTAN_PRESETS } from '../data/multanTemplates';

export const OWNER = 'AttiqBaig1';
export const REPO = 'multan-clinics';
export const DATA_BRANCH = 'clients';
export const SITE_ORIGIN = 'https://websitedemos.space';
const RAW = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${DATA_BRANCH}/c/`;
const API = `https://api.github.com/repos/${OWNER}/${REPO}`;

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

export function detectNiche(text: string): Niche {
  const t = (text || '').toLowerCase();
  if (/skin|aesthetic|derma|cosmetic|hair/.test(t)) return 'skin';
  if (/eye|vision|lasik|optic|ophthal/.test(t)) return 'eye';
  if (/ortho|bone|joint|fracture/.test(t)) return 'ortho';
  if (/cardi|heart/.test(t)) return 'cardio';
  if (/vet|pet|animal/.test(t)) return 'pet';
  if (/physio|rehab|spine/.test(t)) return 'physio';
  if (/gyn|maternity|fertility|women/.test(t)) return 'gynae';
  if (/child|peds|paed|pediatric|kids/.test(t)) return 'peds';
  if (/dent|teeth|tooth|smile|orthodont/.test(t)) return 'dental';
  if (/general|family|diabet|medical|health/.test(t)) return 'general';
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

// ------------------------------------------------------------------ read (public)
export async function fetchClient(slug: string): Promise<ClinicTemplateData | null> {
  const s = slugify(slug);
  if (!s) return null;
  try {
    const r = await fetch(`${RAW}${s}.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok) return null;
    return fromCompact(await r.json());
  } catch {
    return null;
  }
}

// ------------------------------------------------------------------ write (dashboard)
const TOKEN_KEY = 'wds_github_token';
export const loadToken = () => { try { return localStorage.getItem(TOKEN_KEY) || ''; } catch { return ''; } };
export const saveToken = (t: string) => { try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch { /* ignore */ } };

async function gh(token: string, path: string, init: RequestInit = {}) {
  const r = await fetch(path.startsWith('http') ? path : API + path, {
    ...init,
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`, 'X-GitHub-Api-Version': '2022-11-28', ...(init.body ? { 'Content-Type': 'application/json' } : {}) },
  });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) {
    const msg = (body && body.message) || r.statusText;
    if (r.status === 401) throw new Error('Token sahi nahi hai ya expire ho gaya hai. Naya token bana kar paste karein.');
    if (r.status === 403 || r.status === 404) throw new Error(`Token ko is repo (${REPO}) par "Contents: Read and write" ki ijazat nahi hai. (${msg})`);
    throw new Error(`GitHub: ${msg}`);
  }
  return body;
}

/** Checks the token can write to the repo. */
export async function verifyToken(token: string): Promise<string> {
  const user = await gh(token, 'https://api.github.com/user').catch(() => null);
  const repo = await gh(token, '');
  if (repo.permissions && repo.permissions.push === false) throw new Error(`Token ko ${REPO} par likhne ki ijazat nahi hai.`);
  return (user && user.login) || OWNER;
}

/** All saved slugs on the data branch. */
export async function listSlugs(token: string): Promise<string[]> {
  const ref = await gh(token, `/git/ref/heads/${DATA_BRANCH}`);
  const tree = await gh(token, `/git/trees/${ref.object.sha}?recursive=1`);
  return (tree.tree as { path: string }[])
    .map(t => t.path).filter(p => p.startsWith('c/') && p.endsWith('.json'))
    .map(p => p.slice(2, -5));
}

/** Saves many clinics in ONE commit. */
export async function saveClients(token: string, items: { slug: string; data: CompactClinic }[]): Promise<void> {
  if (!items.length) return;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const ref = await gh(token, `/git/ref/heads/${DATA_BRANCH}`);
      const commit = await gh(token, `/git/commits/${ref.object.sha}`);
      const tree = await gh(token, '/git/trees', {
        method: 'POST',
        body: JSON.stringify({
          base_tree: commit.tree.sha,
          tree: items.map(i => ({ path: `c/${i.slug}.json`, mode: '100644', type: 'blob', content: JSON.stringify(clean(i.data)) + '\n' })),
        }),
      });
      const next = await gh(token, '/git/commits', {
        method: 'POST',
        body: JSON.stringify({ message: `Demo links: ${items.map(i => i.slug).slice(0, 5).join(', ')}${items.length > 5 ? ` +${items.length - 5} more` : ''}`, tree: tree.sha, parents: [ref.object.sha] }),
      });
      await gh(token, `/git/refs/heads/${DATA_BRANCH}`, { method: 'PATCH', body: JSON.stringify({ sha: next.sha }) });
      return;
    } catch (e: any) {
      // someone else saved at the same moment -> try again on top of it
      if (attempt < 2 && /fast forward|Update is not a fast/i.test(String(e?.message))) continue;
      throw e;
    }
  }
}

/** Raw saved short keys for a slug (or null). */
export async function fetchCompact(slug: string): Promise<CompactClinic | null> {
  try {
    const r = await fetch(`${RAW}${slug}.json?t=${Date.now()}`, { cache: 'no-store' });
    return r.ok ? await r.json() : null;
  } catch { return null; }
}
export const sameClinic = (a: CompactClinic, b: CompactClinic) =>
  JSON.stringify(Object.entries(clean(a)).sort()) === JSON.stringify(Object.entries(clean(b)).sort());

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
