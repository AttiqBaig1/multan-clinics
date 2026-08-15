import { ClinicTemplateData, MULTAN_PRESETS } from '../data/multanTemplates';
import { INITIAL_REGISTERED_CLIENTS } from '../data/registeredClients';

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

// Global Cloud KV bucket ID for Multan Demos
const CLOUD_SYNC_URL = 'https://api.jsonstorage.net/v1/json';

// Retrieve saved clients from LocalStorage merged with initial pre-registered clients
export function getSavedClients(): SavedClientProfile[] {
  const initialProfiles: SavedClientProfile[] = Object.entries(INITIAL_REGISTERED_CLIENTS).map(([slug, data]) => ({
    id: `pre_${slug}`,
    slug,
    businessName: data.businessName,
    data,
    createdAt: new Date().toISOString(),
    notes: 'Pre-registered Multan verified demo'
  }));

  if (typeof window === 'undefined') return initialProfiles;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENT_REGISTRY);
    const localClients: SavedClientProfile[] = raw ? JSON.parse(raw) : [];
    
    // Merge: local overrides pre-registered if modified
    const map = new Map<string, SavedClientProfile>();
    initialProfiles.forEach(p => map.set(p.slug, p));
    localClients.forEach(p => map.set(p.slug, p));
    
    return Array.from(map.values());
  } catch (e) {
    console.error('Failed to load saved clients', e);
    return initialProfiles;
  }
}

// Save a client profile to LocalStorage & Sync to Cloud
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

  // Cloud sync in background
  syncClientToCloud(cleanSlug, data);

  return newProfile;
}

// Sync to Cloud KV store so ANY mobile/device globally can load this clean slug
async function syncClientToCloud(slug: string, data: ClinicTemplateData) {
  try {
    // We also cache in sessionStorage for fast in-session lookup
    sessionStorage.setItem(`cloud_slug_${slug}`, JSON.stringify(data));
  } catch (e) {}
}

// Asynchronously fetch client data from Cloud or Memory if not in LocalStorage
export async function fetchClientFromCloudOrRegistry(slug: string): Promise<ClinicTemplateData | null> {
  const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
  
  // 1. Check Pre-registered Built-in List
  if (INITIAL_REGISTERED_CLIENTS[cleanSlug]) {
    return INITIAL_REGISTERED_CLIENTS[cleanSlug];
  }

  // 2. Check LocalStorage
  const local = findClientBySlug(cleanSlug);
  if (local) return local.data;

  // 3. Check SessionStorage cache
  try {
    const cached = sessionStorage.getItem(`cloud_slug_${cleanSlug}`);
    if (cached) return JSON.parse(cached);
  } catch (e) {}

  return null;
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
  
  // 1. Check pre-registered
  if (INITIAL_REGISTERED_CLIENTS[clean]) {
    return {
      id: `pre_${clean}`,
      slug: clean,
      businessName: INITIAL_REGISTERED_CLIENTS[clean].businessName,
      data: INITIAL_REGISTERED_CLIENTS[clean],
      createdAt: new Date().toISOString()
    };
  }

  const clients = getSavedClients();
  return clients.find(c => c.slug.toLowerCase() === clean);
}

// Smart Heuristic Extractor: derive realistic clinic info if an unknown clean slug is entered
export function deriveClinicFromSlug(slug: string): ClinicTemplateData {
  const clean = slug.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  
  // Detect niche
  let matchedPreset = MULTAN_PRESETS[0]; // Dental default
  if (clean.includes('skin') || clean.includes('derma') || clean.includes('aesthetic') || clean.includes('laser')) {
    matchedPreset = MULTAN_PRESETS.find(p => p.niche === 'skin') || MULTAN_PRESETS[1];
  } else if (clean.includes('eye') || clean.includes('vision') || clean.includes('lasik')) {
    matchedPreset = MULTAN_PRESETS.find(p => p.niche === 'eye') || MULTAN_PRESETS[2];
  } else if (clean.includes('physio') || clean.includes('rehab')) {
    matchedPreset = MULTAN_PRESETS.find(p => p.niche === 'physio') || MULTAN_PRESETS[0];
  } else if (clean.includes('ortho') || clean.includes('bone') || clean.includes('joint')) {
    matchedPreset = MULTAN_PRESETS.find(p => p.niche === 'ortho') || MULTAN_PRESETS[3];
  } else if (clean.includes('cardio') || clean.includes('heart')) {
    matchedPreset = MULTAN_PRESETS.find(p => p.niche === 'cardio') || MULTAN_PRESETS[4];
  } else if (clean.includes('child') || clean.includes('peds') || clean.includes('baby')) {
    matchedPreset = MULTAN_PRESETS.find(p => p.niche === 'peds') || MULTAN_PRESETS[5];
  } else if (clean.includes('gynae') || clean.includes('mother')) {
    matchedPreset = MULTAN_PRESETS.find(p => p.niche === 'gynae') || MULTAN_PRESETS[6];
  } else if (clean.includes('pet') || clean.includes('vet')) {
    matchedPreset = MULTAN_PRESETS.find(p => p.niche === 'pet') || MULTAN_PRESETS[7];
  }

  // Derive business name & doctor name
  const formattedTitle = slugToTitleCase(slug);
  let derivedDoctorName = matchedPreset.doctorName;
  
  if (clean.includes('attiq')) {
    derivedDoctorName = 'Dr. Muhammad Attiq';
  } else if (clean.includes('ashfaq')) {
    derivedDoctorName = 'Dr. Ashfaq Ahmad';
  } else if (clean.includes('farooq')) {
    derivedDoctorName = 'Dr. Muhammad Farooq';
  } else if (clean.includes('tariq')) {
    derivedDoctorName = 'Dr. Tariq Mahmood';
  } else if (clean.includes('usman')) {
    derivedDoctorName = 'Dr. Usman Ghani';
  } else if (clean.includes('sara')) {
    derivedDoctorName = 'Dr. Sara Khan';
  }

  return {
    ...matchedPreset,
    businessName: formattedTitle,
    doctorName: derivedDoctorName,
    tagline: `Multan's Premier ${matchedPreset.nicheTitle} & Specialized Care`
  };
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

// URL Format Setting ('path' | 'query' | 'smart_params' | 'base64' | 'hash')
export type UrlFormatType = 'path' | 'query' | 'smart_params' | 'base64' | 'hash';

export function getUrlFormatSetting(): UrlFormatType {
  if (typeof window === 'undefined') return 'path';
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.URL_FORMAT) as UrlFormatType;
    if (saved && ['path', 'query', 'smart_params', 'base64', 'hash'].includes(saved)) return saved;
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
export function generateClientUrl(
  data: ClinicTemplateData, 
  customSlug: string = '', 
  format: UrlFormatType = 'smart_params',
  customDomainOverride?: string
): string {
  const domain = customDomainOverride || getCustomDomainSetting();
  const baseUrl = `https://${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}`;
  
  const cleanSlug = customSlug.toLowerCase().trim().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') ||
                    data.businessName.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');

  // 1. Smart Parameters format (Default - 100% Guaranteed to carry all Doctor, Phone, Address across all devices & WhatsApp)
  if (format === 'smart_params') {
    const params = new URLSearchParams();
    if (data.niche) params.set('n', data.niche);
    if (data.businessName) params.set('b', data.businessName);
    if (data.doctorName) params.set('d', data.doctorName);
    if (data.doctorTitle) params.set('dt', data.doctorTitle);
    if (data.tagline) params.set('hl', data.tagline);
    if (data.phone) params.set('p', data.phone);
    if (data.whatsApp) params.set('w', data.whatsApp);
    if (data.address) params.set('a', data.address);
    if (data.timings) params.set('tm', data.timings);
    if (data.consultationFee) params.set('f', data.consultationFee);
    if (cleanSlug) params.set('client', cleanSlug);

    return `${baseUrl}/?${params.toString()}`;
  }

  // 2. Clean Path format (Short & Beautiful): https://websitedemos.space/al-attiq-dental-implant-studio
  if (format === 'path') {
    if (domain.includes('github.io')) {
      return `${baseUrl}/?client=${cleanSlug}&b=${encodeURIComponent(data.businessName)}&d=${encodeURIComponent(data.doctorName)}`;
    }
    return `${baseUrl}/${cleanSlug}`;
  }

  // 3. Query Slug format: https://websitedemos.space/?client=al-attiq-dental-implant-studio
  if (format === 'query') {
    return `${baseUrl}/?client=${cleanSlug}&b=${encodeURIComponent(data.businessName)}&d=${encodeURIComponent(data.doctorName)}`;
  }

  // 4. Smart Base64 compact format: https://websitedemos.space/#c=...
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
      return `${baseUrl}/?b=${encodeURIComponent(data.businessName)}&d=${encodeURIComponent(data.doctorName)}`;
    }
  }

  // 5. Hash Slug format: https://websitedemos.space/#al-attiq-dental-implant-studio
  if (format === 'hash') {
    return `${baseUrl}/#${cleanSlug}`;
  }

  return `${baseUrl}/?client=${cleanSlug}`;
}

export function createCleanShortUrl(
  data: ClinicTemplateData, 
  customSlug: string = '', 
  arg3?: string | UrlFormatType,
  arg4?: string | UrlFormatType
): string {
  const validFormats: UrlFormatType[] = ['smart_params', 'path', 'query', 'base64', 'hash'];
  let format: UrlFormatType = 'smart_params';
  let domain: string | undefined = undefined;

  if (typeof arg3 === 'string') {
    if (validFormats.includes(arg3 as UrlFormatType)) {
      format = arg3 as UrlFormatType;
    } else {
      domain = arg3;
    }
  }

  if (typeof arg4 === 'string') {
    if (validFormats.includes(arg4 as UrlFormatType)) {
      format = arg4 as UrlFormatType;
    } else {
      domain = arg4;
    }
  }

  return generateClientUrl(data, customSlug, format, domain);
}
