import React from 'react';
import { DESIGN_NAMES } from './shared';

/** Small floating 1-5 switcher so a client can see the other design options of the same clinic. */
export const DesignSwitcher: React.FC<{ current: number }> = ({ current }) => {
  const href = (n: number | 'options') => {
    const u = new URL(window.location.href);
    if (n === 1) u.searchParams.delete('v'); else u.searchParams.set('v', String(n));
    return u.pathname + u.search + u.hash;
  };
  return (
    <nav className="dsw" aria-label="Design options">
      <style>{CSS}</style>
      <span className="dsw-l">Design</span>
      {[1, 2, 3, 4, 5].map(n => (
        <a key={n} href={href(n)} className={n === current ? 'on' : ''} aria-current={n === current ? 'page' : undefined} title={`${n}. ${DESIGN_NAMES[n]}`} aria-label={`Design ${n}, ${DESIGN_NAMES[n]}`}>{n}</a>
      ))}
      <a href={href('options')} className="all" title="See all 5 side by side" aria-label="See all designs side by side">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
      </a>
    </nav>
  );
};

const CSS = `
.dsw{position:fixed;left:14px;bottom:14px;z-index:9999;display:flex;align-items:center;gap:6px;padding:6px 8px 6px 14px;border-radius:999px;background:rgba(15,23,42,.88);backdrop-filter:blur(10px);box-shadow:0 10px 30px rgba(0,0,0,.3);font-family:Inter,system-ui,sans-serif}
.dsw-l{font-size:11px;font-weight:700;color:#94a3b8;margin-right:4px;letter-spacing:.04em}
.dsw a{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-size:13px;font-weight:800;color:#e2e8f0;text-decoration:none;background:rgba(255,255,255,.08);transition:background .2s,transform .2s}
.dsw a:hover{background:rgba(255,255,255,.2);transform:translateY(-1px)}
.dsw a.on{background:#fbbf24;color:#0f172a}
.dsw a.all{background:transparent;border:1px solid rgba(255,255,255,.25)}
.dsw a:focus-visible{outline:3px solid #fbbf24;outline-offset:2px}
@media(max-width:560px){.dsw{left:8px;bottom:8px;gap:4px;padding:5px 6px 5px 10px}.dsw-l{display:none}.dsw a{width:28px;height:28px}}
@media print{.dsw{display:none}}
`;
