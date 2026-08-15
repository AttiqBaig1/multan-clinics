import { ClinicTemplateData, MULTAN_PRESETS } from '../data/multanTemplates';

export interface SavedClientProfile {
  id: string;
  slug: string;
  businessName: string;
  data: ClinicTemplateData;
  createdAt: string;
  notes?: string;
}

export const STORAGE_KEYS = {
  CLIENT_REGISTRY: 'multan_clients_registry_v2',
  CUSTOM_DOMAIN: 'multan_custom_domain_v2',
  URL_FORMAT: 'multan_url_format_v2',
  ADMIN_PIN: 'multan_admin_pin_v2',
  IS_ADMIN_AUTHENTICATED: 'multan_is_admin_authed_v2'
};

// Retrieve saved clients from LocalStorage
export function getSavedClients(): SavedClientProfile[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENT_REGISTRY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load saved clients', e);
    return [];
  }
}

// Save a client profile to LocalStorage
export function saveClientProfile(slug: string, data: ClinicTemplateData, notes?: string): SavedClientProfile {
  const clients = getSavedClients();
  const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
  
  const existingIdx = clients.findIndex(c => c.slug === cleanSlug);
  
  const newProfile: SavedClientProfile = {
    id: existingIdx >= 0 ? clients[existingIdx].id : `client_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    slug: cleanSlug,
    businessName: data.businessName,
    data,
    createdAt: new Date().toISOString(),
    notes
  };

  if (existingIdx >= 0) {
    clients[existingIdx] = newProfile;
  } else {
    clients.unshift(newProfile);
  }

  try {
    localStorage.setItem(STORAGE_KEYS.CLIENT_REGISTRY, JSON.stringify(clients));
  } catch (e) {
    console.error('Failed to save client registry', e);
  }

  return newProfile;
}

// Delete a client profile
export function deleteClientProfile(id: string): SavedClientProfile[] {
  const clients = getSavedClients().filter(c => c.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.CLIENT_REGISTRY, JSON.stringify(clients));
  } catch (e) {
    console.error('Failed to delete client profile', e);
  }
  return clients;
}

// Find saved client profile by slug
export function findClientBySlug(slug: string): SavedClientProfile | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim().replace(/^\/|\/$/g, '');
  const clients = getSavedClients();
  return clients.find(c => c.slug.toLowerCase() === clean);
}

// Custom Domain Setting
export function getCustomDomainSetting(): string {
  if (typeof window === 'undefined') return 'websitedemos.space';
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_DOMAIN);
    if (saved && saved.trim()) return saved.trim();
  } catch (e) {}
  
  // Default to current window origin if on custom domain or websitedemos.space
  if (window.location.hostname && !window.location.hostname.includes('run.app') && !window.location.hostname.includes('localhost')) {
    return window.location.hostname;
  }
  return 'websitedemos.space';
}

export function setCustomDomainSetting(domain: string): void {
  if (typeof window === 'undefined') return;
  try {
    let clean = domain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    localStorage.setItem(STORAGE_KEYS.CUSTOM_DOMAIN, clean);
  } catch (e) {}
}

// URL Format Setting ('path' | 'query' | 'base64' | 'hash')
export type UrlFormatType = 'path' | 'query' | 'base64' | 'hash' | 'params';

export function getUrlFormatSetting(): UrlFormatType {
  if (typeof window === 'undefined') return 'path';
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.URL_FORMAT) as UrlFormatType;
    if (saved && ['path', 'query', 'base64', 'hash', 'params'].includes(saved)) return saved;
  } catch (e) {}
  return 'path';
}

export function setUrlFormatSetting(format: UrlFormatType): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.URL_FORMAT, format);
  } catch (e) {}
}

// Format human-readable title from slug (e.g. "dr-ashfaq-physio-multan" -> "Dr Ashfaq Physio Multan")
export function slugToTitleCase(slug: string): string {
  if (!slug) return '';
  return slug
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(' ')
    .map(word => {
      if (word.toLowerCase() === 'dr') return 'Dr.';
      if (word.toLowerCase() === 'opd') return 'OPD';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

// Generate URL helper for any client data & format
export function createCleanShortUrl(
  data: ClinicTemplateData,
  customSlug: string,
  domainSetting?: string,
  formatSetting?: UrlFormatType
): string {
  const domain = (domainSetting || getCustomDomainSetting()).replace(/^https?:\/\//, '').replace(/\/$/, '');
  const format = formatSetting || getUrlFormatSetting();
  
  const protocol = (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) 
    ? window.location.protocol + '//' 
    : 'https://';
  
  const baseUrl = `${protocol}${domain}`;
  const cleanSlug = customSlug.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') ||
                    data.businessName.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');

  // 1. Path format: https://customdomain.com/client-slug
  if (format === 'path') {
    // If domain is github.io, use subpath style or ?client= slug for compatibility
    if (domain.includes('github.io')) {
      return `${baseUrl}/?client=${cleanSlug}`;
    }
    return `${baseUrl}/${cleanSlug}`;
  }

  // 2. Query Client format: https://customdomain.com/?client=client-slug
  if (format === 'query') {
    return `${baseUrl}/?client=${cleanSlug}`;
  }

  // 3. Hash Slug format: https://customdomain.com/#client-slug
  if (format === 'hash') {
    return `${baseUrl}/#${cleanSlug}`;
  }

  // 4. Base64 Compact format: https://customdomain.com/#c=...
  if (format === 'base64') {
    const compactObj = {
      n: data.niche,
      b: data.businessName,
      hl: data.tagline,
      d: data.doctorName,
      dt: data.doctorTitle,
      p: data.phone,
      w: data.whatsApp,
      a: data.address,
      tm: data.timings,
      f: data.consultationFee
    };
    try {
      const b64 = btoa(encodeURIComponent(JSON.stringify(compactObj)));
      return `${baseUrl}/#c=${b64}`;
    } catch (e) {
      return `${baseUrl}/?client=${cleanSlug}`;
    }
  }

  // 5. Full Params format: https://customdomain.com/?n=physio&b=...
  const params = new URLSearchParams();
  if (data.niche) params.set('n', data.niche);
  if (data.businessName) params.set('b', data.businessName);
  if (data.tagline) params.set('hl', data.tagline);
  if (data.doctorName) params.set('d', data.doctorName);
  if (data.doctorTitle) params.set('dt', data.doctorTitle);
  if (data.phone) params.set('p', data.phone);
  if (data.whatsApp) params.set('w', data.whatsApp);
  if (data.address) params.set('a', data.address);
  if (data.timings) params.set('tm', data.timings);
  if (data.consultationFee) params.set('f', data.consultationFee);

  return `${baseUrl}/?${params.toString()}`;
}
